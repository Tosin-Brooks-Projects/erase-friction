import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import ContactForm from "@/components/ContactForm";
import { socialMeta } from "@/lib/seo";

const TITLE = "Everything We Do — The Complete List | erase friction";
const DESC =
  "The full list of what we build — websites, speed, SEO, AI answers, measurement, automations, custom software, digital employees, training, and continuity. Not a summary.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/everything-we-do" },
  ...socialMeta({ title: TITLE, description: DESC, path: "/everything-we-do" }),
};

/**
 * Every service is its own list item, on purpose. Rendering a section as one
 * bullet-separated line reads about the same to a person and destroys the
 * point of the page — the discrete items are what search and AI answer
 * engines parse. Do not collapse these.
 *
 * `id`s are anchor targets for inbound links from the service pages; keep
 * them stable even if sections get reordered.
 */
type Group = { id: string; title: string; intro?: string; items: string[] };

const GROUPS: Group[] = [
  {
    id: "website-speed",
    title: "Make your website fast",
    intro: "Slow sites lose people before they ever see what you sell.",
    items: [
      "Speed report",
      "Compress images",
      "Strip unused plugins and code",
      "Faster hosting",
      "Fix phone load times",
      "Caching",
      "Fix scripts that block loading",
      "Slow fonts",
      "Database cleanup",
      "Stop the page from jumping while it loads",
      "Broken links",
      "Forms that silently fail",
      "Redirect old URLs",
      "Ongoing monitoring",
    ],
  },
  {
    id: "new-website",
    title: "Build a new website",
    intro: "Adding a service page should be an edit, not a project.",
    items: [
      "Full build",
      "Service pages",
      "Location pages",
      "Before-and-after galleries",
      "Quote forms that reach your phone",
      "Online booking",
      "Take payments",
      "Sell digital products and downloads",
      "Set up subscriptions or recurring billing",
      "Display your reviews",
      "Team and about pages",
      "FAQ pages",
      "Set it up so your team can update it",
      "Move off the old site",
      "Consolidate multiple sites into one",
    ],
  },
  {
    id: "google",
    title: "Get found on Google",
    intro:
      "Ranking for what your customers actually type — not the keywords that sound impressive in a meeting.",
    items: [
      "Audit with a game plan",
      "Keyword research and a 12-month plan",
      "Competitor analysis",
      "Article writing",
      "Refresh old content",
      "Link your pages to each other",
      "Technical fixes and indexing",
      "Google Business Profile",
      "Local directory listings",
      "Review generation",
      "Backlinks",
      "Directory pages built from data — thousands at once",
      "Fix duplicate and thin pages",
      "Monthly tracking and reporting",
    ],
  },
  {
    id: "ai-answers",
    title: "Get named when people ask AI",
    intro:
      "More people are asking an AI what they used to type into Google. Those answers get assembled from websites, and most sites aren’t built to be read that way.",
    items: [
      "See what AI says about you right now",
      "Restructure pages so AI can read them",
      "Answer pages for the questions people actually ask",
      "Correct wrong information about you",
      "Structured data markup",
      "Get into the sources AI pulls from",
      "Track your mentions over time",
    ],
  },
  {
    id: "measurement",
    title: "Know what’s actually working",
    intro: "Half of what businesses waste money on is the stuff they can’t measure.",
    items: [
      "GA4 installed correctly — not the broken version someone pasted in 2021",
      "Search Console verified and connected",
      "Conversion tracking so you know which forms and calls came from where",
      "Call tracking",
      "Filter out your own team’s traffic",
      "Tag Manager cleanup",
      "One dashboard instead of five logins",
      "Where your leads actually come from",
      "Job profitability",
      "Weekly numbers emailed to you automatically",
      "Alerts when traffic or rankings drop",
      "Clean up messy data",
    ],
  },
  {
    id: "automations",
    title: "Stop doing the same thing twice",
    intro:
      "Somewhere in your business, a person is acting as glue between two systems. We remove the person from that job. Not the person — just that job.",
    items: [
      "Map how work actually moves through your business",
      "Reports that build themselves",
      "Move data between systems",
      "Route leads to the right person",
      "Quote to invoice",
      "Appointment reminders",
      "Review requests after a job",
      "Document intake",
      "Sort email and files",
      "New-hire onboarding steps",
      "Timesheets and payroll prep",
      "Inventory alerts",
      "Handoff notifications",
      "Contract and signature routing",
      "Recurring billing",
      "Connect tools that won’t talk to each other",
    ],
  },
  {
    id: "custom-software",
    title: "Build the tool that doesn’t exist",
    intro: "Sometimes there’s nothing to buy, because your business isn’t shaped like everyone else’s.",
    items: [
      "Replace the spreadsheet doing a job it was never meant to do",
      "Job and customer tracker",
      "Quoting calculator",
      "Live dashboard",
      "Scheduling board",
      "Inspection and checklist app",
      "Customer portal",
      "Inventory system",
      "Commission tracking",
      "Training system",
      "Internal search across your own documents",
    ],
  },
  {
    id: "digital-employees",
    title: "Put a digital employee on it",
    intro: "The work that only matters if it happens every day, so it never happens.",
    items: [
      "Social posting",
      "Inbox triage",
      "Document processing",
      "Answer calls and texts",
      "Monitoring and alerts",
      "Data entry",
      "Research",
      "Follow-up sequences",
      "After-hours coverage",
      "Chat on your site",
    ],
  },
  {
    id: "ai-setup",
    title: "Get your team using AI",
    intro: "The tools are cheap. Knowing what to point them at is the hard part.",
    items: [
      "Pick the right tools for what you actually do",
      "Set up accounts and access",
      "Build prompts and templates for work you repeat",
      "Connect AI to your own documents",
      "Custom assistants for specific jobs",
      "A usage policy so nothing sensitive leaks",
      "Ongoing support as the tools change",
    ],
  },
  {
    id: "training",
    title: "Train your people",
    intro: "Nobody automates a job they don’t know can be automated.",
    items: [
      "Half-day workshop for your team",
      "Role-specific training — sales, admin, ops, service",
      "One-on-one sessions for the people who’ll run furthest with it",
      "Recorded walkthroughs they can rewatch",
      "A prompt library built around your actual work",
      "What not to put into an AI tool",
      "Follow-up sessions once they’ve hit real problems",
      "Lunch-and-learn for the whole company",
    ],
  },
  {
    id: "existing-customers",
    title: "Get more out of the customers you already have",
    intro: "The cheapest customer you’ll ever get is one who already bought from you.",
    items: [
      "Email list cleanup",
      "Newsletter setup and sending",
      "Win-back sequences for old customers",
      "Post-job follow-up",
      "Referral asks",
      "Text messaging",
      "Reactivate the list nobody’s emailed in two years",
    ],
  },
  {
    id: "social",
    title: "Social media",
    items: [
      "Content calendar",
      "Posting and scheduling",
      "Automated posting pulled from work you’re already doing",
      "Review and comment monitoring",
      "Profile cleanup and consistency",
      "Turn one thing into many",
    ],
  },
  {
    id: "documentation",
    title: "Write it down so it isn’t in someone’s head",
    intro: "Right now there’s a process that only works because one specific person remembers it.",
    items: [
      "Document how the work actually gets done",
      "Onboarding guides",
      "Recorded walkthroughs",
      "Checklists your team will actually use",
      "Job-specific training",
      "An internal wiki people will really open",
    ],
  },
  {
    id: "continuity",
    title: "Don’t lose everything",
    items: [
      "Backups set up and actually tested",
      "Get your domain and hosting in your name, not your old developer’s",
      "Move accounts out of one person’s inbox",
      "Password management for the team",
      "Basic security hardening",
      "Make sure your contact forms actually deliver",
      "Document who has access to what",
    ],
  },
];

// Minimal on purpose. Emitting a Service entity per line item would be ~140 of
// them, which reads as spam and hurts more than it helps.
const schema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://erasefriction.com/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://erasefriction.com/services" },
    {
      "@type": "ListItem",
      position: 3,
      name: "Everything We Do",
      item: "https://erasefriction.com/everything-we-do",
    },
  ],
};

export default function EverythingWeDo() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <SiteHeader />

      <main id="main">
        <section className="hero ewd-hero">
          <div className="hero-blob" aria-hidden="true"></div>
          <div className="container">
            <h1 className="hero-headline">Everything we do</h1>
            <p className="hero-sub">You don&rsquo;t need all of this. Nobody does.</p>
            <p className="ewd-hero-note">
              But most businesses have more than one thing on the list, and it&rsquo;s usually easier to see it written
              down than to explain it. Scan it. Find the ones that made you wince. That&rsquo;s where we start.
            </p>
            <div className="hero-cta-group">
              <a href="#contact" className="btn btn-primary btn-lg">
                Tell us what&rsquo;s stuck &rarr;
              </a>
            </div>
          </div>
        </section>

        <nav className="ewd-jump" aria-labelledby="jump-heading">
          <div className="container">
            <h2 id="jump-heading" className="ewd-jump-heading">
              Jump to
            </h2>
            <ul className="ewd-jump-list">
              {GROUPS.map((g) => (
                <li key={g.id}>
                  <a href={`#${g.id}`}>{g.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {GROUPS.map((g) => (
          <section className="ewd-group" id={g.id} key={g.id}>
            <div className="container">
              <h2 className="ewd-group-title">{g.title}</h2>
              {g.intro && <p className="ewd-group-intro">{g.intro}</p>}
              <ul className="ewd-list">
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        ))}

        <section className="sv-all" id="most-people">
          <div className="container">
            <div className="sv-all-inner">
              <h2 className="section-heading">Most people need more than one</h2>
              <p>
                That&rsquo;s normal. The automation that saves your team six hours a week and the website that finally
                brings in work are the same problem wearing different clothes: your business is spending effort on
                something it shouldn&rsquo;t have to.
              </p>
              <p className="sv-all-kicker">
                You don&rsquo;t have to figure out which one to start with. That&rsquo;s our job.
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
                  Tell us the one thing. We&rsquo;ll come back within 48 hours with a straight answer &mdash; free.
                </p>
                <p>No pressure, no commitment. Just a real response.</p>
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
