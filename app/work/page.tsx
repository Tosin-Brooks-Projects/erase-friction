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
    desc: "Eight services, each with its own page, a before-and-after gallery, and a quote form that reaches the owner's phone.",
    note: "Adding a service or a new city is an edit, not a rebuild.",
    img: "/great-white.webp",
    url: "https://www.greatwhitepressurewashing.com/",
    host: "greatwhitepressurewashing.com",
  },
  {
    name: "The Collins Agency",
    kind: "Independent insurance, Gulf Coast",
    desc: "Six lines of coverage, team bios, and 190+ five-star reviews — all feeding one quote form.",
    note: "Reads as trustworthy before you pick up the phone.",
    img: "/collins-agency.webp",
    url: "https://collins-insurance.com/",
    host: "collins-insurance.com",
  },
  {
    name: "Alabama CPA Directory",
    kind: "Statewide directory & matching service",
    desc: "7,139 licensed CPAs and 1,086 firms across 334 Alabama cities, with license lookup and a free matching service.",
    note: "Thousands of pages, generated from data. Nobody typed them.",
    img: "/alabama-cpas.webp",
    url: "https://www.cpasinalabama.com/",
    host: "cpasinalabama.com",
  },
];

// Internal builds we've opened up to the public. `img` is optional — the cards
// render fine without a screenshot, so a new tool can go up before one exists.
type Tool = { name: string; tagline: string; desc: string; url: string; host: string; img?: string };

const TOOLS: Tool[] = [
  {
    name: "Helpful Analytics",
    tagline: "Simple GA4 reporting for marketing agencies",
    desc: "Turns Google Analytics 4 into client-ready reporting, without the digging.",
    img: "/helpful-analytics.webp",
    url: "https://helpfulanalytics.com/",
    host: "helpfulanalytics.com",
  },
  {
    name: "Track it and Save",
    tagline: "Subscription management & expense tracking",
    desc: "Every recurring charge in one place — including the ones you forgot you were paying for.",
    img: "/track-it-and-save.webp",
    url: "https://trackitandsave.com/",
    host: "trackitandsave.com",
  },
  {
    name: "Email of Introduction",
    tagline: "Make the intro without writing it",
    desc: "Point it at two LinkedIn profiles. Get three intro emails you can send as-is. Free.",
    img: "/email-of-introduction.webp",
    url: "https://www.emailofintroduction.com/",
    host: "emailofintroduction.com",
  },
  {
    name: "Easy Voice Recorder",
    tagline: "Record a voice message, share a link",
    desc: "Hit record, get a link. No account, no app install, works on any device. Free.",
    img: "/easy-voice-recorder.webp",
    url: "https://www.easyvoicerecorderapp.com/",
    host: "easyvoicerecorderapp.com",
  },
];

// The flexibility argument, made concrete. Every claim is backed by something
// we've actually shipped — abstract "modern tools" talk convinces nobody.
// `body` takes JSX so a claim can link to the proof.
const UNLOCKS: { title: string; body: React.ReactNode }[] = [
  {
    title: "Pages that build themselves",
    body: "Point the site at a data source and the pages appear — each one a new door in from search.",
  },
  {
    title: "Forms that do more than email you",
    body: "A built form can write to your CRM, alert the team, tag the lead, and start the follow-up before you've read it. This site's form does.",
  },
  {
    title: "Reporting you'll actually open",
    body: (
      <>
        Measure what matters to your business, not what a plugin decided to track. We got tired enough of GA4 that we{" "}
        <a href="https://helpfulanalytics.com/" target="_blank" rel="noopener">
          built our own
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        .
      </>
    ),
  },
  {
    title: "Marketing tools on your own domain",
    body: "Calculators, lookups, quizzes — the pages people bookmark and link to. One turns a brochure into a reason to come back.",
  },
];

// Automations running in our own business. Deliberately outcome-first: what it
// does for us, not which tools are wired together. These are examples of what's
// possible, not a menu — client builds start from their workflow, not ours.
const AUTOMATIONS = [
  {
    title: "A link in Slack becomes a draft article",
    body: "Drop a URL in a channel. It comes back researched, written up, and waiting in WordPress as a draft.",
  },
  {
    title: "A voice memo becomes a published post",
    body: "Record a thought while walking. It's transcribed and posted to LinkedIn and Facebook before you're back.",
  },
  {
    title: "An assistant we message like a coworker",
    body: "We message Hermes from Telegram or Slack — ask a question, hand off a task, from anywhere.",
  },
  {
    title: "A CRM that keeps itself current",
    body: "Contacts update themselves, and Monday brings a report of who to follow up with. We update the CRM by chatting with Claude instead of opening it.",
  },
  {
    title: "Search data, summarized twice a month",
    body: "A report lands in the inbox with what changed and what it means. No dashboard visit.",
  },
  {
    title: "An inbox that files itself",
    body: "Eight labels sort mail automatically. A weekly sweep rescues anything important from spam, then clears the rest.",
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
            <p className="hero-sub">Client sites, our own tools, and the automations we run internally.</p>
          </div>
        </section>

        <section className="work-section" id="websites">
          <div className="container">
            <h2 className="section-heading">Websites</h2>
            <p className="section-sub">
A template site is a brochure. A coded site is something you can build on.
            </p>
            <div className="work-grid">
              {SITES.map((site) => (
                <a className="work-card" key={site.url} href={site.url} target="_blank" rel="noopener">
                  <img
                    className="card-shot"
                    src={site.img}
                    alt={`Screenshot: ${site.name} homepage`}
                    width={800}
                    height={420}
                    loading="lazy"
                  />
                  <div className="card-body">
                    <div className="work-kind">{site.kind}</div>
                    <div className="work-name">{site.name}</div>
                    <p className="work-desc">{site.desc}</p>
                    <p className="work-note">{site.note}</p>
                    <span className="work-visit">
                      {site.host} &rarr;
                      <span className="sr-only"> (opens in a new tab)</span>
                    </span>
                  </div>
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
              We build for ourselves first. When something turns out useful, we share it.
            </p>
            <div className="tools-grid">
              {TOOLS.map((tool) => (
                <a className="tool-card" key={tool.url} href={tool.url} target="_blank" rel="noopener">
                  {tool.img && (
                    <img
                      className="card-shot"
                      src={tool.img}
                      alt={`Screenshot: ${tool.name}`}
                      width={800}
                      height={420}
                      loading="lazy"
                    />
                  )}
                  <div className="card-body">
                    <div className="tool-name">{tool.name}</div>
                    <div className="tool-tagline">{tool.tagline}</div>
                    <p className="tool-desc">{tool.desc}</p>
                    <span className="tool-visit">
                      {tool.host} &rarr;
                      <span className="sr-only"> (opens in a new tab)</span>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="work-section" id="automations">
          <div className="container">
            <h2 className="section-heading">Automations we run ourselves</h2>
            <p className="section-sub">
These run in our own business every day &mdash; a sense of what&rsquo;s possible, not a menu.
            </p>
            <div className="unlocks-grid automations-grid">
              {AUTOMATIONS.map((a) => (
                <div className="unlock" key={a.title}>
                  <h3 className="unlock-title">{a.title}</h3>
                  <p className="unlock-body">{a.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="work-section work-section-alt" id="more">
          <div className="container">
            <div className="work-closing">
              <h2 className="section-heading">Yours won&rsquo;t look like ours.</h2>
              <p className="section-sub">
Every build starts from the thing eating your team&rsquo;s week &mdash; the handoff nobody likes, the report rebuilt every Monday, the same questions answered again. Tell us yours.
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
