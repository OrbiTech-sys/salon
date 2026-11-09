"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Live "silk" layer drawn over a still image (the still is the poster, so the first frame is identical).
 * One small WebGL pass: a soft sway that moves only the bright hair, a glint that travels across the
 * highlights, a warm light that follows the pointer, and film grain. It is skipped for reduced motion,
 * Save-Data and browsers without WebGL, pauses off screen and in hidden tabs, and is paused by the owner's pause button.
 */

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() { vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform vec2 uOff;
uniform vec2 uSc;
uniform float uTime;
uniform float uIntro;
uniform float uSway;
uniform vec2 uPtr;
uniform float uPtrOn;

float luma(vec3 c) { return dot(c, vec3(0.299, 0.587, 0.114)); }
float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

void main() {
  vec2 uv = vec2(vUv.x, 1.0 - vUv.y);
  vec2 t = uOff + uv * uSc;
  float m = smoothstep(0.05, 0.22, luma(texture2D(uTex, t).rgb));
  float sway = sin(t.y * 9.0 + uTime * 0.42 + t.x * 3.2) * 0.0032 + sin(t.y * 23.0 - uTime * 0.6 + t.x * 5.0) * 0.0011;
  t.x += sway * m * uIntro * uSway;
  vec3 col = texture2D(uTex, t).rgb;
  float l = luma(col);

  // a glint that travels across the highlights, once at the start and again with the pointer
  float d = dot(uv - 0.5, normalize(vec2(0.82, -0.57)));
  float sweep = mix(-0.9, 0.9, clamp((uTime - 0.8) / 3.2, 0.0, 1.0));
  float g = exp(-pow((d - sweep) * 6.0, 2.0)) * step(uTime, 4.4);
  float pg = exp(-pow((d - (uPtr.x - 0.5) * 1.1) * 7.0, 2.0)) * uPtrOn * 0.55;
  col += col * col * (g + pg) * 1.5 * smoothstep(0.18, 0.6, l);

  // warm light under the pointer
  float spot = smoothstep(0.75, 0.0, length((uv - uPtr) * vec2(1.0, 1.1))) * uPtrOn;
  col += vec3(1.0, 0.82, 0.62) * col * spot * 0.22;

  col += (hash(gl_FragCoord.xy + floor(uTime * 14.0)) - 0.5) * 0.028;
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

type Props = {
  src: string;
  position?: string;
  /** 0 to 1: how far bright areas sway. Use 0 for photographs with straight lines. */
  sway?: number;
  paused?: boolean;
  /** Called once the layer is running, so the page can show its pause button. */
  onCapable?: () => void;
};

export function SilkMotion({ src, position = "50% 50%", sway = 1, paused = false, onCapable }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || nav.connection?.saveData) return;
    const gl = canvas.getContext("webgl", { alpha: false, antialias: false, powerPreference: "low-power" });
    if (!gl) return;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(program, name);
    const uOff = u("uOff"), uSc = u("uSc"), uTime = u("uTime"), uIntro = u("uIntro"), uSway = u("uSway"), uPtr = u("uPtr"), uPtrOn = u("uPtrOn");

    const [px, py] = position.split(" ").map((v) => parseFloat(v) / 100);
    gl.uniform1f(uSway, sway);
    let imgW = 1, imgH = 1;
    let size = { w: 0, h: 0 };
    let raf = 0;
    let running = false;
    let visible = true;
    let elapsed = 0;
    let last = 0;
    const ptr = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, on: 0 };
    let ptrTarget = 0;
    let disposed = false;

    const layout = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(2, Math.round(rect.width * dpr));
      const h = Math.max(2, Math.round(rect.height * dpr));
      if (w !== size.w || h !== size.h) {
        size = { w, h };
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      // object-fit: cover with the same object-position as the still image
      const scale = Math.max(w / imgW, h / imgH);
      const sw = w / (imgW * scale), sh = h / (imgH * scale);
      gl.uniform2f(uSc, sw, sh);
      gl.uniform2f(uOff, (1 - sw) * px, (1 - sh) * py);
    };

    const frame = (now: number) => {
      raf = 0;
      if (!running) return;
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      if (!pausedRef.current) elapsed += dt;
      ptr.x += (ptr.tx - ptr.x) * 0.06;
      ptr.y += (ptr.ty - ptr.y) * 0.06;
      ptr.on += (ptrTarget - ptr.on) * 0.05;
      gl.uniform1f(uTime, elapsed);
      gl.uniform1f(uIntro, Math.min(1, elapsed / 2.2));
      gl.uniform2f(uPtr, ptr.x, ptr.y);
      gl.uniform1f(uPtrOn, ptr.on);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || disposed || !visible || document.hidden) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const onPointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      ptr.tx = (event.clientX - rect.left) / rect.width;
      ptr.ty = (event.clientY - rect.top) / rect.height;
      ptrTarget = 1;
    };
    const onLeave = () => {
      ptrTarget = 0;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    const ro = new ResizeObserver(() => layout());
    const onVisibility = () => (document.hidden ? stop() : start());

    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      if (disposed) return;
      imgW = image.naturalWidth;
      imgH = image.naturalHeight;
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.uniform1i(u("uTex"), 0);
      layout();
      ro.observe(canvas);
      io.observe(canvas);
      document.addEventListener("visibilitychange", onVisibility);
      canvas.parentElement?.addEventListener("pointermove", onPointer);
      canvas.parentElement?.addEventListener("pointerleave", onLeave);
      onCapable?.();
      start();
      // draw one frame, then fade the canvas in over the identical still image
      requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
    };
    // wait for idle time so the still image stays the priority for the first paint
    const hasIdle = "requestIdleCallback" in window;
    const timer = hasIdle ? window.requestIdleCallback(() => (image.src = src)) : window.setTimeout(() => (image.src = src), 400);

    return () => {
      disposed = true;
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.parentElement?.removeEventListener("pointermove", onPointer);
      canvas.parentElement?.removeEventListener("pointerleave", onLeave);
      if (hasIdle) window.cancelIdleCallback(timer);
      else window.clearTimeout(timer);
      image.onload = null;
    };
  }, [src, position, sway, onCapable]);

  return <canvas ref={canvasRef} className="silk" data-ready={ready ? "true" : "false"} aria-hidden="true" />;
}
