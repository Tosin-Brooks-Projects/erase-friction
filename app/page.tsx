import type { Metadata } from "next";
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
                Tell us your bottleneck &rarr;
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
            <h2 className="section-heading">Your best people are doing busywork.</h2>
            <p className="section-sub">These three problems cost teams 10+ hours a week. Every week.</p>
            <div className="problem-grid">
              <div className="problem-item">
                <div className="problem-icon">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                </div>
                <div className="problem-text">
                  <h3>Manual Hand-offs</h3>
                  <p>Moving data from a CRM to a spreadsheet to a project tool, every single day.</p>
                </div>
              </div>
              <div className="problem-item">
                <div className="problem-icon">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <div className="problem-text">
                  <h3>Document Overload</h3>
                  <p>Spending hours processing PDFs, extracting data, and filing it away manually.</p>
                </div>
              </div>
              <div className="problem-item">
                <div className="problem-icon">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                    <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                    <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                </div>
                <div className="problem-text">
                  <h3>Disjointed Systems</h3>
                  <p>Using 5 different SaaS tools that refuse to talk to each other properly.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="services" id="services">
          <div className="container">
            <h2 className="section-heading">Three ways we kill busywork</h2>
            <div className="services-grid">
              <div className="service-card">
                <div className="card-icon-wrap" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                </div>
                <h3 className="card-title">Custom Software</h3>
                <p className="card-desc">Built around how your team works &mdash; not how a SaaS vendor thinks you should.</p>
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
                <h3 className="card-title">Workflow Automations</h3>
                <p className="card-desc">
                  Connect your tools. Kill the copy-paste. Your team stops doing handoffs and starts doing real work.
                </p>
              </div>
              <div className="service-card">
                <div className="card-icon-wrap" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"></path>
                  </svg>
                </div>
                <h3 className="card-title">AI Solutions</h3>
                <p className="card-desc">
                  Practical AI that earns its keep &mdash; document processing, smart routing, and internal assistants
                  deployed where they actually matter.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="process" id="process">
          <div className="container">
            <h2 className="section-heading">From bottleneck to fixed in three steps</h2>
            <div className="process-steps">
              <div className="step-card">
                <div className="step-number">1</div>
                <h3 className="card-title">Discovery Audit</h3>
                <p className="card-desc">
                  We map out your current workflows and identify exactly where you are losing time and money to manual
                  operations.
                </p>
              </div>
              <div className="step-card">
                <div className="step-number">2</div>
                <h3 className="card-title">Solution Design</h3>
                <p className="card-desc">
                  We propose a custom-built automation, app, or AI tool to solve the problem, complete with an ROI
                  estimate.
                </p>
              </div>
              <div className="step-card">
                <div className="step-number">3</div>
                <h3 className="card-title">Build &amp; Deploy</h3>
                <p className="card-desc">
                  We develop the solution, train your team, and ensure it seamlessly integrates into your daily
                  operations.
                </p>
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
                be automatic.
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
                <div className="team-member">
                  <a
                    href="https://www.linkedin.com/in/brooksconkle/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Brooks Conkle on LinkedIn"
                  >
                    <img src="/Brooks.webp" alt="Brooks Conkle" className="team-photo" width={110} height={110} loading="lazy" />
                  </a>
                  <div className="team-member-name">Brooks Conkle</div>
                  <div className="team-member-title">Operations &amp; Strategy</div>
                </div>
                <div className="team-member">
                  <img src="/Tosin.webp" alt="Tosin Alli" className="team-photo" width={110} height={110} loading="lazy" />
                  <div className="team-member-name">Tosin Alli</div>
                  <div className="team-member-title">Engineering &amp; AI</div>
                </div>
                <div className="team-member">
                  <img src="/Kea.webp" alt="Kea" className="team-photo" width={110} height={110} loading="lazy" />
                  <div className="team-member-name">Kea</div>
                  <div className="team-member-title">He&rsquo;s always on. Never calls in sick.</div>
                </div>
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
                AI fix for each. We&rsquo;ll send it to your email inbox.
              </p>
              <ChecklistForm />
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="container">
            <div className="contact-inner">
              <div className="contact-intro">
                <h2>Your competitors are automating. Are you?</h2>
                <p>
                  Tell us your biggest bottleneck. We&rsquo;ll come back within 48 hours with a real assessment &mdash;
                  no pitch, no fluff.
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
