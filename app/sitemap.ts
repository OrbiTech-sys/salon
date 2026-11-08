import type { MetadataRoute } from "next";
import { salon } from "@/config/salon.config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: new URL("/", salon.siteUrl).toString(), changeFrequency: "monthly", priority: 1 }];
}
