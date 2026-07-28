import type { Metadata } from "next";
import Script from "next/script";
import { socialMeta } from "@/lib/seo";
import "./globals.css";

const HOME_TITLE = "erase friction — Custom Software, Automation & AI Solutions";
const HOME_DESC =
  "erase friction builds custom software, workflow automations, and AI solutions that eliminate the manual work dragging your team down.";

// Site-wide defaults — any page that doesn't set its own inherits these, so a
// shared link always renders a card instead of a bare URL.
export const metadata: Metadata = {
  metadataBase: new URL("https://erasefriction.com"),
  icons: { icon: { url: "/favicon.svg", type: "image/svg+xml" } },
  ...socialMeta({ title: HOME_TITLE, description: HOME_DESC, path: "/" }),
};

const GA_ID = "G-V6HBH3FB5B";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');`}
        </Script>
      </body>
    </html>
  );
}
