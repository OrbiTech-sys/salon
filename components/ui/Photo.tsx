import Image from "next/image";
import type { Photo as PhotoType } from "@/config/types";

type Props = {
  photo: PhotoType;
  sizes: string;
  /** Marks the largest above-the-fold image: preloaded, fetched with high priority, never lazy. */
  priority?: boolean;
  className?: string;
  /** Overrides the photo's own object-position. */
  position?: string;
  /** Purely decorative images get an empty alt so screen readers skip them. */
  decorative?: boolean;
  /** Starts loading at once even below the fold. For images that are revealed with a clip, which lazy loading would never reach. */
  eager?: boolean;
};

/**
 * A photograph that fills its parent. The parent owns the size (aspect-ratio or height) and clips the crop.
 * Alt text, focal point and credit come from the configuration.
 */
export function Photo({ photo, sizes, priority = false, className, position, decorative = false, eager = false }: Props) {
  return (
    <Image
      src={photo.src}
      alt={decorative ? "" : photo.alt}
      fill
      sizes={sizes}
      className={className}
      style={{ objectFit: "cover", objectPosition: position ?? photo.position ?? "50% 50%" }}
      preload={priority}
      fetchPriority={priority ? "high" : undefined}
      loading={eager && !priority ? "eager" : undefined}
    />
  );
}
