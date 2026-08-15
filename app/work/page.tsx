import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { socialMeta } from "@/lib/seo";

const TITLE = "Our Work — erase friction";
const DESC =
  "Websites, tools, and automations we've built — from local service sites to a statewide directory of 7,000+ CPAs.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/work" },
  ...socialMeta({ title: TITLE, description: DESC, path: "/work" }),
};

// Client sites. `note` is the "why it matters" line — what the build made possible.
const SITES = [
  {
    name: "Great White Pressure Washing",
    kind: "Exterior cleaning, Mobile Bay",
    desc: "Eight services across both sides of the bay, each with its own page, plus a before-and-after gallery and a quote form that reaches the owner's phone directly.",
    note: "Adding a service or a new city is an edit, not a rebuild.",
    url: "https://www.greatwhitepressurewashing.com/",
    host: "greatwhitepressurewashing.com",
  },
  {
    name: "The Collins Agency",
    kind: "Independent insurance, Gulf Coast",
    desc: "Six lines of coverage, team bios, and 190+ five-star reviews placed where they actually change minds — all feeding one quote form.",
    note: "A second-generation agency that reads as trustworthy before you call.",
    url: "https://collins-insurance.com/",
    host: "collins-insurance.com",
  },
  {
    name: "Alabama CPA Directory",
    kind: "Statewide directory & matching service",
    desc: "7,139 licensed CPAs and 1,086 firms across 334 Alabama cities, with license lookup and a free matching service.",
    note: "Every city and firm page is generated from data — thousands of pages nobody hand-built.",
    url: "https://www.cpasinalabama.com/",
    host: "cpasinalabama.com",
  },
];

// Internal builds we've opened up to the public.
const TOOLS = [
  {
    name: "Helpful Analytics",
    tagline: "Simple GA4 reporting for marketing agencies",
    desc: "Turns Google Analytics 4 into client-ready reporting, without the digging.",
    url: "https://helpfulanalytics.com/",
    host: "helpfulanalytics.com",
  },
  {
    name: "Track it and Save",
    tagline: "Subscription management & expense tracking",
    desc: "Every recurring charge in one place — including the ones you forgot you were paying for.",
    url: "https://trackitandsave.com/",
    host: "trackitandsave.com",
  },
];

// The flexibility argument, made concrete. Every claim is backed by something
// we've actually shipped — abstract "modern tools" talk convinces nobody.
const UNLOCKS = [
  {
    title: "Pages that build themselves",
    body: "The Alabama CPA Directory has a page for every one of 7,139 CPAs and 334 cities. Nobody typed those. Point the site at a data source and the pages appear — each one a new door in from search.",
  },
  {
    title: "Forms that do more than email you",
    body: "A template form sends a notification. A built form can write to your CRM, alert the team, tag the lead, and start the follow-up before you've finished reading it. The form on this site does exactly that.",
  },
  {
    title: "Reporting you'll actually open",
    body: "Measure what matters to your business instead of what a plugin decided to track. We got tired enough of digging through GA4 that we built our own reporting tool for it.",
  },
  {
    title: "Marketing tools on your own domain",
    body: "Calculators, lookups, quizzes — the pages people bookmark and link to. We've built dozens. One on your site turns a brochure into a reason to come back.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Our Work",
  url: "https://erasefriction.com/work",
  description: DESC,
  about: [
    ...SITES.map((s) => ({ "@type": "WebSite", name: s.name, url: s.url, description: s.kind })),
    ...TOOLS.map((t) => ({
      "@type": "SoftwareApplication",
      name: t.name,
      url: t.url,
      description: t.tagline,
      applicationCategory: "BusinessApplication",
    })),
  ],
};

export default function Work() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <SiteHeader />

      <main id="main">
        <section className="hero work-hero">
          <div className="hero-blob" aria-hidden="true"></div>
          <div className="container">
            <h1 className="hero-headline">Work we&rsquo;ve shipped.</h1>
            <p className="hero-sub">Websites, tools, and the automations behind them.</p>
          </div>
        </section>

        <section className="work-section" id="websites">
          <div className="container">
            <h2 className="section-heading">Websites</h2>
            <p className="section-sub">
              A template site is a brochure. A coded site is something you can build on &mdash; and that difference
              shows up every time you want to try something.
            </p>
            <div className="work-grid">
              {SITES.map((site) => (
                <a className="work-card" key={site.url} href={site.url} target="_blank" rel="noopener">
                  <div className="work-kind">{site.kind}</div>
                  <div className="work-name">{site.name}</div>
                  <p className="work-desc">{site.desc}</p>
                  <p className="work-note">{site.note}</p>
                  <span className="work-visit">
                    {site.host} &rarr;
                    <span className="sr-only"> (opens in a new tab)</span>
                  </span>
                </a>
              ))}
            </div>
            <div className="unlocks">
              <h3 className="unlocks-heading">What that actually buys you</h3>
              <div className="unlocks-grid">
                {UNLOCKS.map((u) => (
                  <div className="unlock" key={u.title}>
                    <h4 className="unlock-title">{u.title}</h4>
                    <p className="unlock-body">{u.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="work-cta-line">
              Thinking about a rebuild? <Link href="/#contact">Tell us what your site can&rsquo;t do &rarr;</Link>
            </p>
          </div>
        </section>

        <section className="work-section work-section-alt" id="tools">
          <div className="container">
            <h2 className="section-heading">Tools we&rsquo;ve built</h2>
            <p className="section-sub">
              We build for ourselves first. When something works, we open it up to everyone.
            </p>
            <div className="tools-grid">
              {TOOLS.map((tool) => (
                <a className="tool-card" key={tool.url} href={tool.url} target="_blank" rel="noopener">
                  <div className="tool-name">{tool.name}</div>
                  <div className="tool-tagline">{tool.tagline}</div>
                  <p className="tool-desc">{tool.desc}</p>
                  <span className="tool-visit">
                    {tool.host} &rarr;
                    <span className="sr-only"> (opens in a new tab)</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="work-section" id="more">
          <div className="container">
            <div className="work-closing">
              <h2 className="section-heading">Not everything we build has a URL.</h2>
              <p className="section-sub">
                Most of our work runs quietly inside other companies — the automations, internal tools, and digital
                employees that move data, answer customers, and process documents while nobody watches. Those we
                can&rsquo;t link to, but we can talk about them.
              </p>
              <div className="work-closing-actions">
                <Link href="/#contact" className="btn btn-primary btn-lg">
                  Tell us your bottleneck &rarr;
                </Link>
                <Link href="/digital-employees" className="btn btn-lg btn-secondary">
                  Hire a digital employee
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
