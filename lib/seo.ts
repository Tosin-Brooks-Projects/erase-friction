import type { Metadata } from "next";

export const OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "erase friction — Your team is doing work a machine should do.",
};

export const SITE_NAME = "erase friction";

/**
 * Next.js REPLACES the openGraph/twitter objects when a page defines its own,
 * so every page that wants a page-specific title or url has to restate the
 * shared bits. This keeps that in one place.
 */
export function socialMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      url: path,
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
