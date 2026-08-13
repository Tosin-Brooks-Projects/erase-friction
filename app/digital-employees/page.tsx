import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import HireForm from "@/components/HireForm";
import { socialMeta } from "@/lib/seo";

const TITLE = "Hire a Digital Employee — erase friction";
const DESC =
  "Onboard a digital employee: graduate-level work for near human minimum wage, always on, with no interviews, no paperwork and no two-week notice.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/digital-employees" },
  ...socialMeta({ title: TITLE, description: DESC, path: "/digital-employees" }),
};

// Persona portraits are AI-generated (thispersondoesnotexist) — no real people.
// The badge on every card keeps the disclosure explicit; the bios do it with a wink.
const TEAM = [
  {
    img: "/de-avery.webp",
    name: "Avery",
    role: "Operations & Admin",
    bio: "Files, formats, reconciles, and has never once misplaced a receipt. Idea of a great Friday: an inbox at zero.",
  },
  {
    img: "/de-sam.webp",
    name: "Sam",
    role: "Customer Support",
    bio: "Answers the 3 a.m. “where is my order?” email at 3 a.m. Escalates the genuinely hard ones to you.",
  },
  {
    img: "/de-jordan.webp",
    name: "Jordan",
    role: "Sales Development",
    bio: "Researches every lead, personalizes every follow-up, and holds zero grudges about being left on read.",
  },
  {
    img: "/de-quinn.webp",
    name: "Quinn",
    role: "Research & Content",
    bio: "Reads 400 page industry reports cover to cover and calls it a good Tuesday. Cites sources without being asked.",
  },
  {
    img: "/de-riley.webp",
    name: "Riley",
    role: "Marketing",
    bio: "Publishes on schedule through every holiday. Hobbies include A/B tests and quietly judging your subject lines.",
  },
];

const COMPARE: [string, string, string][] = [
  ["Starts", "Six weeks, after interviews", "This week"],
  ["True cost", "Salary plus 30 percent in taxes and benefits", "Near human minimum wage"],
  ["Hours", "40 a week, minus vacation and holidays", "Always on, weekends included"],
  ["Ramp time", "3 to 6 months", "Days to weeks"],
  ["Sick days", "Sometimes on launch day", "Never had one"],
  ["Turnover", "Moves on in two years, taking what they know", "Never quits, forgets nothing"],
  ["Paperwork", "Tax forms, payroll, benefits, handbook", "One onboarding call"],
  ["Midnight message", "Rude", "Answered in seconds"],
  ["Parting ways", "Severance, hard feelings, paperwork", "Cancel anytime"],
];

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Digital Employees",
  provider: { "@type": "ProfessionalService", name: "erase friction", url: "https://erasefriction.com" },
  url: "https://erasefriction.com/digital-employees",
  description: DESC,
  serviceType: "AI Digital Employee Staffing",
};

export default function DigitalEmployees() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <SiteHeader />

      <main id="main">
        <section className="hero de-hero">
          <div className="hero-blob" aria-hidden="true"></div>
          <div className="container">
            <span className="badge">New: Digital Employees</span>
            <h1 className="hero-headline">Your next hire isn&rsquo;t human.</h1>
            <p className="hero-sub">Graduate-level work. Near human minimum wage. Always on.</p>
            <div className="hero-cta-group">
              <a href="#hire" className="btn btn-primary btn-lg">
                Build my digital employee &rarr;
              </a>
              <p className="hero-micro-copy">Tell us the role and you&rsquo;ll have a plan within 48 hours.</p>
            </div>
          </div>
        </section>

        <section className="de-pain">
          <div className="container">
            <h2 className="section-heading">Hiring is the most expensive thing you do.</h2>
            <p className="section-sub">Typical numbers for one US hire, before they produce anything.</p>
            <div className="de-stats">
              <div className="de-stat">
                <div className="de-stat-num">6 weeks</div>
                <div className="de-stat-label">to fill an open seat</div>
              </div>
              <div className="de-stat">
                <div className="de-stat-num">30%</div>
                <div className="de-stat-label">added in taxes and benefits</div>
              </div>
              <div className="de-stat">
                <div className="de-stat-num">3 to 6 months</div>
                <div className="de-stat-label">before a new hire is at full speed</div>
              </div>
              <div className="de-stat">
                <div className="de-stat-num">2 years</div>
                <div className="de-stat-label">until they move on, taking what they know</div>
              </div>
            </div>
          </div>
        </section>

        <section className="de-compare">
          <div className="container">
            <h2 className="section-heading">The math has changed.</h2>
            <div className="compare-wrap">
              <table className="compare">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Human employee</th>
                    <th scope="col" className="compare-digital">
                      Digital employee
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map(([label, human, digital]) => (
                    <tr key={label}>
                      <th scope="row">{label}</th>
                      <td>{human}</td>
                      <td className="compare-digital">{digital}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="de-team">
          <div className="container">
            <h2 className="section-heading">Meet the team you could hire this week.</h2>
            <p className="section-sub">
              Real personas, zero humans, and we&rsquo;re not pretending otherwise. Brief them, give them
              feedback, ping them at midnight. Treat them exactly like teammates. They just happen to be software.
            </p>
            <div className="de-team-grid">
              {TEAM.map((m) => (
                <div className="de-card" key={m.name}>
                  <img
                    src={m.img}
                    alt={`${m.name}, ${m.role} — persona portrait (AI-generated image)`}
                    className="team-photo"
                    width={110}
                    height={110}
                    loading="lazy"
                  />
                  <span className="de-badge">100% digital</span>
                  <div className="de-name">{m.name}</div>
                  <div className="de-role">{m.role}</div>
                  <p className="de-bio">{m.bio}</p>
                </div>
              ))}
              <a className="de-card de-card-cta" href="#hire">
                <span className="de-badge">Your opening here</span>
                <div className="de-name">Someone else?</div>
                <p className="de-bio">
                  If the work happens on a screen, we can probably staff it. Describe the role and we&rsquo;ll design
                  the teammate.
                </p>
                <span className="de-card-cta-link">Describe the role &rarr;</span>
              </a>
            </div>
          </div>
        </section>

        <section className="process de-process">
          <div className="container">
            <h2 className="section-heading">Onboarding, minus the onboarding</h2>
            <div className="process-steps">
              <div className="step-card">
                <div className="step-number">1</div>
                <h3 className="card-title">Describe the role</h3>
                <p className="card-desc">
                  Tell us what you&rsquo;d hand a new hire: the tasks, the tools, what &ldquo;done right&rdquo; looks
                  like. No job posting required.
                </p>
              </div>
              <div className="step-card">
                <div className="step-number">2</div>
                <h3 className="card-title">We build and onboard</h3>
                <p className="card-desc">
                  We assemble your digital employee, wire them into your tools (email, Slack, CRM, spreadsheets)
                  and train them on your way of working.
                </p>
              </div>
              <div className="step-card">
                <div className="step-number">3</div>
                <h3 className="card-title">You manage, they work</h3>
                <p className="card-desc">
                  Assign work, review output, give feedback, like any teammate. They get better every week. Not
                  working out? Cancel. No exit interview.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="de-honest">
          <div className="container">
            <h2 className="section-heading">What a digital employee is not</h2>
            <p className="section-sub">Worth knowing before you hire one. It builds trust and saves us both a call.</p>
            <div className="de-honest-grid">
              <div className="de-honest-item">
                <h3>Not a judgment-free zone</h3>
                <p>Decisions with real stakes go to a human for approval. That is by design, not a limitation.</p>
              </div>
              <div className="de-honest-item">
                <h3>Not for licensed work</h3>
                <p>Legal, medical and financial advice stay with licensed professionals. Your digital employee prepares the work and a human decides.</p>
              </div>
              <div className="de-honest-item">
                <h3>Not magic</h3>
                <p>The first weeks include feedback and tuning, like any new hire. Unlike any new hire, the fixes are permanent.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="de-promo">
          <div className="container de-promo-inner">
            <div>
              <h2>New: hire a digital employee</h2>
              <p>Graduate-level work for near human minimum wage, onboarded in days, always on.</p>
            </div>
            <a href="#hire" className="btn btn-white btn-lg">
              Build my digital employee &rarr;
            </a>
          </div>
        </section>

        <section className="de-faq">
          <div className="container">
            <h2 className="section-heading">Questions everyone asks</h2>
            <div className="faq">
              <details>
                <summary>How is this different from a ChatGPT subscription?</summary>
                <p>
                  A license is a tool your team has to learn and drive. A digital employee is managed output: we build
                  the workflows, connect the tools, monitor the work, and keep improving it. You talk to a teammate,
                  not a text box.
                </p>
              </details>
              <details>
                <summary>What does one cost?</summary>
                <p>
                  It depends on the role, but here&rsquo;s the anchor: near human minimum wage, with no payroll taxes,
                  benefits, equipment or vacation stacked on top. You&rsquo;ll get an exact number with your plan,
                  within 48 hours.
                </p>
              </details>
              <details>
                <summary>What about our data?</summary>
                <p>
                  Your digital employee touches only the systems you grant, under credentials you control and can
                  revoke at any time. We put the boundaries in writing before anything connects.
                </p>
              </details>
              <details>
                <summary>What happens when it gets something wrong?</summary>
                <p>
                  The same thing that happens with a human, minus the awkward conversation: you flag it, we fix it, and
                  the fix sticks. Anything high-stakes requires human approval before it goes out the door.
                </p>
              </details>
              <details>
                <summary>My role isn&rsquo;t on the list.</summary>
                <p>
                  The list is just the greatest hits. If the work happens at a computer, describe it and we&rsquo;ll
                  tell you within 48 hours whether a digital employee can do it, and what that would look like.
                </p>
              </details>
            </div>
          </div>
        </section>

        <section className="contact de-hire" id="hire">
          <div className="container">
            <div className="de-hire-inner">
              <h2 className="section-heading">Ready to meet your first digital employee?</h2>
              <p className="section-sub">
                Tell us the role. Within 48 hours you&rsquo;ll get a plan: what they&rsquo;d do, how they&rsquo;d plug
                into your tools, and what they&rsquo;d cost.
              </p>
              <HireForm />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
