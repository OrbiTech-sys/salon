import type { MetadataRoute } from "next";
import { salon } from "@/config/salon.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", salon.siteUrl).toString(),
  };
}
