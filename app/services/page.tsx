import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import ContactForm from "@/components/ContactForm";
import { socialMeta } from "@/lib/seo";

const TITLE = "Automations, Software, Websites & AI — erase friction";
const DESC =
  "Automations, custom software, websites, search visibility, and digital teammates. What we usually find in a business — and what we build to make it stop.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/services" },
  ...socialMeta({ title: TITLE, description: DESC, path: "/services" }),
};

// Six blocks, one shape: the symptoms someone recognizes, then the thing we
// build about them. Kept as data rather than six copy-pasted sections — a new
// service is an entry here, and the page can't drift out of sync with itself.
type Service = {
  id: string;
  label: string;
  symptoms: string[];
  build: string;
  body: string[];
  proof?: { text: string; href: string; cta: string };
  link?: { href: string; label: string };
  changes: string;
};

const SERVICES: Service[] = [
  {
    id: "automations",
    label: "Automations",
    symptoms: [
      "Someone rebuilds the same report every Monday morning.",
      "Data gets typed into one system, then typed again into another.",
      "A whole process stops when one specific person is on vacation.",
      "You’re paying for five tools that refuse to talk to each other.",
      "Someone’s job includes the phrase “and then I just copy it over.”",
    ],
    build: "automations",
    body: [
      "We map how work actually moves through your business, find the spots where a human is acting as glue between two systems, and remove the human from that job.",
      "Not the person. Just that job.",
    ],
    changes:
      "The Monday report builds itself. The handoff happens whether anyone remembers or not. Your team goes back to the work you actually hired them for.",
  },
  {
    id: "custom-software",
    label: "Custom Software",
    symptoms: [
      "You have a spreadsheet doing a job a spreadsheet was never meant to do.",
      "You pay per-seat for software where you use maybe 10% of it.",
      "Your team has a workaround that everybody knows and nobody wrote down.",
      "You’ve gone looking for software that does this one specific thing. It doesn’t exist.",
      "Onboarding a new hire means teaching them your weird system.",
    ],
    build: "custom software",
    body: [
      "Sometimes there’s no tool to buy, because your business isn’t shaped like everyone else’s. So we build the thing — around how your team already works, not how a SaaS vendor thinks they should.",
    ],
    changes: "The weird system stops being weird. It’s just how the software works now.",
  },
  {
    id: "websites",
    label: "Websites",
    symptoms: [
      "Your site was built in 2019 and nobody’s totally sure who has the login.",
      "Adding one new service page means emailing a developer and waiting.",
      "It takes four seconds to load on a phone.",
      "You’re not sure where the contact form actually goes.",
      "It looks fine. It just doesn’t bring in work.",
    ],
    build: "websites",
    body: [
      "Fast to load, fast to build, and easy for your team to update without calling anyone. Adding a service should be an edit, not a rebuild.",
    ],
    proof: {
      text:
        "Great White Pressure Washing — eight service pages, a before-and-after gallery, and a quote form that reaches the owner’s phone. The Collins Agency — six lines of coverage and 190+ five-star reviews feeding one form.",
      href: "/work",
      cta: "See the builds",
    },
    changes: "The site earns instead of just existing.",
  },
  {
    id: "search",
    label: "Google",
    symptoms: [
      "You rank for your own company name and basically nothing else.",
      "Competitors show up for searches you should be winning.",
      "You wrote a bunch of blog posts. Nothing happened.",
      "Someone told you to “do SEO” and you’re not sure what that meant.",
      "You know people are searching for what you sell. They’re just not finding you.",
    ],
    build: "search visibility",
    body: [
      "Ranking for what your customers actually type — not the keywords that sound impressive in a meeting. Structure, content, and the technical work underneath it.",
    ],
    proof: {
      text:
        "The Alabama CPA Directory — 7,139 licensed CPAs and 1,086 firms across 334 Alabama cities. Thousands of pages, generated from data. Nobody typed them.",
      href: "/work",
      cta: "See the build",
    },
    changes: "You show up where the buying decision starts.",
  },
  {
    id: "ai-answers",
    label: "AI Answers",
    symptoms: [
      "You’ve never once checked what ChatGPT says about your business.",
      "You’ve noticed people describing your industry using answers they got from an AI.",
      "Your competitor gets named in those answers. You don’t.",
      "You keep hearing “AI is changing search” and nobody explains what to actually do.",
    ],
    build: "visibility in AI answers",
    body: [
      "More people are asking an AI what they used to type into Google. Those answers get assembled from websites — and most sites aren’t structured to be read that way.",
      "We fix the structure so yours is.",
    ],
    changes: "When someone asks an AI who does this in your area, your name is in the answer.",
  },
  {
    id: "digital-employees",
    label: "Digital Employees",
    symptoms: [
      "Social media went quiet in March. Everyone’s busy. Nobody owns it.",
      "There’s work that only matters if it happens every day, so it never happens.",
      "Documents pile up waiting for someone to process them.",
      "You’d hire for it, but it’s not a whole job.",
    ],
    build: "digital teammates",
    body: [
      "AI staff that handle the work nobody has time for — processing, routing, monitoring, posting — around the clock.",
    ],
    link: { href: "/digital-employees", label: "Meet the team" },
    changes: "The work that kept sliding to next week stops sliding.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "erase friction",
  url: "https://erasefriction.com",
  telephone: "+1-251-554-5575",
  email: "brooks@erasefriction.com",
  description: DESC,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.label, description: s.changes },
    })),
  },
  mainEntityOfPage: "https://erasefriction.com/services",
};

export default function Services() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <SiteHeader />

      <main id="main">
        <section className="hero sv-hero">
          <div className="hero-blob" aria-hidden="true"></div>
          <div className="container">
            <h1 className="hero-headline">If any of this sounds like your week, we can fix it.</h1>
            <p className="hero-sub">
              Most businesses don&rsquo;t have one big problem. They have eleven small ones that nobody has time to look
              at.
            </p>
            <p className="sv-hero-note">Here&rsquo;s what we usually find &mdash; and what we build to make it stop.</p>
            <div className="hero-cta-group">
              <a href="#contact" className="btn btn-primary btn-lg">
                Tell us what&rsquo;s stuck &rarr;
              </a>
            </div>
          </div>
        </section>

        {SERVICES.map((s, i) => (
          <section className={`sv-block${i % 2 ? " sv-block-alt" : ""}`} id={s.id} key={s.id}>
            <div className="container">
              <div className="sv-grid">
                <div className="sv-symptoms">
                  <h2 className="sv-ask">Sound familiar?</h2>
                  <ul className="sv-list">
                    {s.symptoms.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
                <div className="sv-answer">
                  <p className="sv-eyebrow">What we build</p>
                  <h3 className="sv-build">{s.build}</h3>
                  {s.body.map((p) => (
                    <p className="sv-body" key={p}>
                      {p}
                    </p>
                  ))}
                  {s.proof && (
                    <p className="sv-proof">
                      {s.proof.text}{" "}
                      <Link href={s.proof.href}>{s.proof.cta} &rarr;</Link>
                    </p>
                  )}
                  {s.link && (
                    <p className="sv-link">
                      <Link href={s.link.href}>{s.link.label} &rarr;</Link>
                    </p>
                  )}
                  <p className="sv-changes">
                    <span>What changes</span>
                    {s.changes}
                  </p>
                </div>
              </div>
            </div>
          </section>
        ))}

        <section className="sv-all">
          <div className="container">
            <div className="sv-all-inner">
              <h2 className="section-heading">Most people need more than one.</h2>
              <p>
                That&rsquo;s normal. The automation that saves your team six hours a week and the website that finally
                brings in work are the same problem wearing different clothes: your business is spending effort on
                something it shouldn&rsquo;t have to.
              </p>
              <p className="sv-all-kicker">
                You don&rsquo;t have to figure out which one to start with. That&rsquo;s our job.
              </p>
              <p className="sv-all-more">
                Want the whole thing written out?{" "}
                <Link href="/everything-we-do">See everything we do &rarr;</Link>
              </p>
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="container">
            <div className="contact-inner">
              <div className="contact-intro">
                <h2>What&rsquo;s been on your list the longest?</h2>
                <p>
                  Tell us the one thing. We&rsquo;ll come back within 48 hours with a real assessment &mdash; free.
                </p>
                <p>No sales calls. No commitment. Just a real response.</p>
                <p className="contact-phone">
                  Prefer to talk? Call or text <a href="tel:+12515545575">251-554-5575</a>.
                </p>
              </div>
              <div>
                <ContactForm />
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
