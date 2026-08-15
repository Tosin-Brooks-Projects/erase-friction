import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Ported from netlify.toml. GA needs script-src (loader), connect-src (beacons,
// incl. regional endpoints via wildcard), and img-src (pixel fallback) — without
// the connect-src entries GA fails silently. 'unsafe-eval' is dev-only (React
// Fast Refresh needs it; production must not have it).
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https://*.google-analytics.com https://*.googletagmanager.com",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=(), interest-cohort=()",
          },
          { key: "Content-Security-Policy", value: csp },
        ],
      },
      {
        // The checklist PDF must stay publicly fetchable (delivery emails link to
        // it), but noindex keeps search engines from bypassing the email gate.
        source: "/ai-automation-checklist.pdf",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
      {
        // These filenames aren't content-hashed, so a year-long immutable cache
        // means replacing a photo never reaches anyone who already loaded it —
        // it silently served a stale headshot for a full deploy cycle. Short
        // freshness plus stale-while-revalidate keeps it fast and lets updates
        // land. Rename the file too when a change has to be seen immediately.
        source: "/:file*(webp|svg|png|jpg)",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=604800" }],
      },
    ];
  },
};

export default nextConfig;
