import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import ContactForm from "@/components/ContactForm";
import ChecklistForm from "@/components/ChecklistForm";

export const metadata: Metadata = {
  title: "erase friction — Custom Software, Automation & AI Solutions",
  description:
    "erase friction builds custom software, workflow automations, and AI solutions that eliminate the manual work dragging your team down.",
  alternates: { canonical: "/" },
  // openGraph/twitter come from the root layout — the defaults already describe
  // this page, so overriding here would only risk them drifting apart.
};

// One entry per teammate. Everyone carries a badge: the digital teammates have
// human personas by design, so who's who has to be stated outright rather than
// left to the picture.
const TEAM = [
  {
    name: "Brooks Conkle",
    title: "Operations & Strategy",
    img: "/brooks.webp",
    href: "https://www.linkedin.com/in/brooksconkle/",
  },
  { name: "Tosin Alli", title: "Engineering & AI", img: "/tosin.webp" },
  { name: "Riley", title: "Marketing", img: "/de-riley.webp", digital: true },
  { name: "Avery", title: "Operations & Admin", img: "/de-avery.webp", digital: true },
  { name: "Jordan", title: "Sales Development", img: "/de-jordan.webp", digital: true },
  { name: "Jenn Sanders", title: "Social Media", img: "/de-jenn.webp", digital: true },
];

// Friction costs twice: the hours it eats inside, and the customers it loses
// outside. Both halves get named here — a visitor whose pain is a dead website
// has to see themselves on this page or they never reach the form.
const PROBLEM_GROUPS = [
  {
    label: "Inside — the work that eats the day",
    items: [
      {
        title: "Manual Hand-offs",
        desc: "Moving data from a CRM to a spreadsheet to a project tool, every single day.",
        icon: (
          <>
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </>
        ),
      },
      {
        title: "Document Overload",
        desc: "Spending hours processing PDFs, extracting data, and filing it away manually.",
        icon: (
          <>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </>
        ),
      },
      {
        title: "Disjointed Systems",
        desc: "Using 5 different SaaS tools that refuse to talk to each other properly.",
        icon: (
          <>
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
            <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
            <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </>
        ),
      },
    ],
  },
  {
    label: "Outside — the work that never gets done",
    items: [
      {
        title: "A Website That Doesn’t Earn",
        desc: "It looks fine. It ranks nowhere, and the form stays empty.",
        icon: (
          <>
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </>
        ),
      },
      {
        title: "Social That Went Quiet",
        desc: "Last post: March. Everyone’s busy. Nobody owns it.",
        icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>,
      },
      {
        title: "Blog Posts With No Plan",
        desc: "Written when someone has a spare hour, about whatever came to mind. So they do nothing.",
        icon: (
          <>
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </>
        ),
      },
    ],
  },
];

// Proof, lifted from /work. Deliberately not links — sending someone off-site
// from the homepage costs more than it proves. The section's one link goes to
// /work, which is where the outbound links already live.
const PROOF = [
  {
    name: "Great White Pressure Washing",
    desc: "Eight service pages, a before-and-after gallery, and a quote form that reaches the owner’s phone.",
    note: "Adding a service is an edit, not a rebuild.",
  },
  {
    name: "The Collins Agency",
    desc: "Six lines of coverage and 190+ five-star reviews, all feeding one quote form.",
    note: "Reads as trustworthy before you pick up the phone.",
  },
  {
    name: "Alabama CPA Directory",
    desc: "7,139 licensed CPAs and 1,086 firms across 334 Alabama cities, with license lookup and free matching.",
    note: "Thousands of pages, generated from data. Nobody typed them.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "erase friction",
  url: "https://erasefriction.com",
  logo: "https://erasefriction.com/logo.png",
  telephone: "+1-251-554-5575",
  email: "brooks@erasefriction.com",
  description:
    "erase friction builds custom software, workflow automations, and AI solutions that eliminate the manual work dragging your team down.",
  founder: [
    { "@type": "Person", name: "Brooks Conkle", sameAs: "https://www.linkedin.com/in/brooksconkle/" },
    { "@type": "Person", name: "Tosin Alli" },
  ],
  serviceType: ["Custom Software Development", "Workflow Automation", "AI Solutions"],
  // The portfolio (and its SoftwareApplication entries) now lives on /work.
  mainEntityOfPage: "https://erasefriction.com/work",
};

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <SiteHeader />

      <main id="main">
        <section className="hero">
          <div className="hero-blob" aria-hidden="true"></div>
          <div className="container">
            <h1 className="hero-headline">
              Your team is doing work
              <br />a machine should do.
            </h1>
            <p className="hero-sub">
              Double your output. <em>Not your headcount.</em>
            </p>
            <div className="hero-cta-group">
              <a href="#contact" className="btn btn-primary btn-lg">
                Tell us what&rsquo;s stuck &rarr;
              </a>
              <p className="hero-micro-copy">Takes 2 minutes. We&rsquo;ll respond within 48 hours.</p>
              <p className="hero-checklist-link">
                <a href="#checklist">Not ready? Grab the free Money-Leak Checklist &rarr;</a>
              </p>
            </div>
          </div>
        </section>

        <section className="problem" id="problem">
          <div className="container">
            <h2 className="section-heading">Friction shows up in two places.</h2>
            <p className="section-sub">
              One eats the hours you have. The other costs you the work you never won.
            </p>
            {PROBLEM_GROUPS.map((group) => (
              <div className="problem-group" key={group.label}>
                <p className="problem-group-label">{group.label}</p>
                <div className="problem-grid">
                  {group.items.map((item) => (
                    <div className="problem-item" key={item.title}>
                      <div className="problem-icon">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          {item.icon}
                        </svg>
                      </div>
                      <div className="problem-text">
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="services" id="services">
          <div className="container">
            <h2 className="section-heading">Three ways we erase it</h2>
            <div className="services-grid">
              <div className="service-card">
                <div className="card-icon-wrap" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="7"></circle>
                    <line x1="21" y1="21" x2="16" y2="16"></line>
                  </svg>
                </div>
                <p className="card-cat">Websites &amp; Content</p>
                <h3 className="card-title">Get found. Get the call.</h3>
                <p className="card-desc">
                  Sites built to rank and convert, and the content that keeps feeding them. Not a brochure &mdash; a
                  machine that brings in work.
                </p>
              </div>
              <div className="service-card">
                <div className="card-icon-wrap" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="17 1 21 5 17 9"></polyline>
                    <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                    <polyline points="7 23 3 19 7 15"></polyline>
                    <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
                  </svg>
                </div>
                <p className="card-cat">Custom Software &amp; Automation</p>
                <h3 className="card-title">Kill the busywork.</h3>
                <p className="card-desc">
                  Connect your tools, kill the copy-paste. Built around how your team already works &mdash; not how a
                  SaaS vendor thinks you should.
                </p>
              </div>
              <div className="service-card">
                <div className="card-icon-wrap" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"></path>
                  </svg>
                </div>
                <p className="card-cat">AI Solutions</p>
                <h3 className="card-title">Hire a digital teammate.</h3>
                <p className="card-desc">
                  AI staff that handle the work nobody has time for &mdash; document processing, smart routing,
                  monitoring, posting &mdash; around the clock.
                </p>
                <p className="card-link">
                  <Link href="/digital-employees">Meet the team &rarr;</Link>
                </p>
              </div>
            </div>
            <p className="work-cta-line">
              <Link href="/services">See what we actually fix &rarr;</Link>
            </p>
          </div>
        </section>

        <section className="proof" id="proof">
          <div className="container">
            <h2 className="section-heading">We&rsquo;ve already built this.</h2>
            <p className="section-sub">Three of them. Real businesses, live right now.</p>
            <div className="services-grid">
              {PROOF.map((item) => (
                <div className="service-card" key={item.name}>
                  <h3 className="card-title">{item.name}</h3>
                  <p className="card-desc">{item.desc}</p>
                  <p className="work-note">{item.note}</p>
                </div>
              ))}
            </div>
            <p className="work-cta-line">
              <Link href="/work">See everything we&rsquo;ve built &rarr;</Link>
            </p>
          </div>
        </section>

        <section className="process" id="process">
          <div className="container">
            <h2 className="section-heading">From stuck to fixed in three steps</h2>
            <div className="process-steps">
              <div className="step-card">
                <div className="step-number">1</div>
                <h3 className="card-title">We find where it&rsquo;s leaking</h3>
                <p className="card-desc">
                  We map how work actually moves through your business &mdash; and where time, money, and leads fall out
                  of it.
                </p>
              </div>
              <div className="step-card">
                <div className="step-number">2</div>
                <h3 className="card-title">We show you the fix, and what it&rsquo;s worth</h3>
                <p className="card-desc">
                  A specific build &mdash; automation, software, site, or all three &mdash; with an estimate of what it
                  returns.
                </p>
              </div>
              <div className="step-card">
                <div className="step-number">3</div>
                <h3 className="card-title">We build it and hand it over</h3>
                <p className="card-desc">We ship it, train your team, and make sure it sticks.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about" id="about">
          <div className="container">
            <div className="about-content">
              <h2>Our Team</h2>
              <p>
                Brooks spent 17 years building and scaling businesses. He&rsquo;s felt the exact pain we fix &mdash; the
                endless manual handoffs, the tools that almost talk to each other, the hours burned on work that should
                be automatic, and the marketing that stays on next month&rsquo;s list.
              </p>
              <p>
                Tosin is the engineer who builds what solves it. AI systems, custom backend infrastructure, and
                production-grade software &mdash; shipped from scratch.
              </p>
              <p>
                And our AI agents? They handle the work that never sleeps &mdash; monitoring, processing, routing, and
                executing around the clock while your team focuses on what actually requires a human.
              </p>
              <div className="team-grid">
                {TEAM.map((m) => {
                  const photo = (
                    <img
                      src={m.img}
                      alt={m.digital ? `${m.name} — digital teammate (AI-generated portrait)` : m.name}
                      className="team-photo"
                      width={110}
                      height={110}
                      loading="lazy"
                    />
                  );
                  return (
                    <div className="team-member" key={m.name}>
                      {m.href ? (
                        <a href={m.href} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} on LinkedIn`}>
                          {photo}
                        </a>
                      ) : (
                        photo
                      )}
                      <div className="team-member-name">{m.name}</div>
                      <span className={`team-badge${m.digital ? "" : " team-badge-human"}`}>
                        {m.digital ? "100% digital" : "100% human"}
                      </span>
                      <div className="team-member-title">{m.title}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="checklist" id="checklist">
          <div className="container">
            <div className="checklist-inner">
              <h2>Not ready to talk? Start here.</h2>
              <p>
                Get our free Money-Leak Checklist &mdash; the 5 places your business is quietly losing money, and the
                fix for each. We&rsquo;ll send it to your email inbox.
              </p>
              <ChecklistForm />
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
