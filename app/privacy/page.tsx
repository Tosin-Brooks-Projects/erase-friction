import type { Metadata } from "next";
import LegalShell from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "Privacy Policy — erase friction",
  description:
    "How erase friction collects, uses, stores, and protects the information you share through erasefriction.com.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <LegalShell title="Privacy Policy" updated="27 July 2026">
      <div className="lede">
        <p style={{ marginBottom: 0 }}>
          <strong>The short version:</strong> we collect what you type into our forms so we can reply to you or send
          you the checklist you asked for. We don&rsquo;t sell it, we don&rsquo;t advertise to you, and we don&rsquo;t
          track you around the internet. Email <a href="mailto:brooks@erasefriction.com">brooks@erasefriction.com</a>{" "}
          and we&rsquo;ll delete your data.
        </p>
      </div>

      <h2>Who we are</h2>
      <p>
        erase friction (&ldquo;we&rdquo;, &ldquo;us&rdquo;) builds custom software, workflow automations, and AI
        solutions. This policy covers <a href="https://erasefriction.com">erasefriction.com</a>.
      </p>
      <p>
        Questions, requests, or complaints: <a href="mailto:brooks@erasefriction.com">brooks@erasefriction.com</a> or{" "}
        <a href="tel:+12515545575">251-554-5575</a>.
      </p>

      <h2>What we collect</h2>
      <h3>Information you give us</h3>
      <p>
        When you submit the contact form, we receive what you entered: your name, email address, your description of
        your biggest bottleneck, the tools involved, and your timeline. Please don&rsquo;t put confidential business
        information, credentials, or personal data about other people into that form &mdash; a short description is
        enough for us to respond.
      </p>
      <p>
        When you request our free checklist, we receive your name and email address, and we email the checklist to
        that address.
      </p>

      <h3>Information collected automatically</h3>
      <p>
        Our host records standard server logs (IP address, browser type, pages requested, timestamps) as part of
        serving and protecting the site. Your IP address is also stored alongside your form submission for spam
        prevention.
      </p>

      <h3>Cookies &amp; analytics</h3>
      <p>
        We use Google Analytics to see which pages are visited and whether our forms get used. It sets cookies (such
        as <code>_ga</code>) to tell visitors apart and collects usage data like pages viewed, device type, and
        approximate location. We use it for site statistics only &mdash; no advertising features, no remarketing, and
        we don&rsquo;t send it your name or email. You can block analytics cookies with your browser settings or an ad
        blocker; the site works fine without them.
      </p>

      <h2>Why we use it</h2>
      <ul>
        <li>
          <strong>To reply to you.</strong> That is the entire purpose of the contact form.
        </li>
        <li>
          <strong>To follow up</strong> about the specific inquiry you sent us.
        </li>
        <li>
          <strong>To send you the checklist and occasional emails</strong> if you requested it &mdash; automation
          tips, and now and then an offer from us. Every email includes a way to unsubscribe, and opting out stops
          them for good. We never share the list.
        </li>
        <li>
          <strong>To keep the site working</strong> and block spam and abuse.
        </li>
      </ul>
      <p>
        We do not sell, rent, or trade your information. Submitting the contact form does not add you to any marketing
        list, and we do not use your submissions to train AI models.
      </p>

      <h2>Who we share it with</h2>
      <p>We use the following service providers. Each receives only what it needs to do its job.</p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Provider</th>
              <th>What it handles</th>
              <th>Their policy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Vercel</td>
              <td>Website hosting, form processing, server logs</td>
              <td>
                <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
                  Privacy policy
                </a>
              </td>
            </tr>
            <tr>
              <td>Resend</td>
              <td>Sends the checklist email and our lead notifications</td>
              <td>
                <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
                  Privacy policy
                </a>
              </td>
            </tr>
            <tr>
              <td>Google</td>
              <td>
                Fonts served to your browser; Google Sheets stores form submissions (contact and checklist); Google
                Analytics collects site-usage statistics
              </td>
              <td>
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                  Privacy policy
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Loading Google Fonts means Google receives your IP address. We otherwise disclose your information only if
        required by law, or if we are ever involved in a merger or sale &mdash; in which case this policy travels with
        the data.
      </p>

      <h2>How long we keep it</h2>
      <p>
        Form submissions are kept for as long as we may reasonably need them to serve you, and no longer than{" "}
        <strong>24 months</strong> after our last contact &mdash; unless you become a client, in which case records are
        kept as long as needed for the engagement and our legal and accounting obligations. Server logs are retained on
        our host&rsquo;s standard schedule.
      </p>

      <h2>Your choices</h2>
      <p>You can ask us to:</p>
      <ul>
        <li>tell you what information we hold about you,</li>
        <li>correct anything inaccurate,</li>
        <li>delete it, or</li>
        <li>stop contacting you.</li>
      </ul>
      <p>
        Email <a href="mailto:brooks@erasefriction.com">brooks@erasefriction.com</a> and we&rsquo;ll action it within
        30 days. There is no charge and we won&rsquo;t ask you why. Depending on where you live, you may have
        additional rights under laws such as the GDPR or CCPA; we&rsquo;ll honour those requests the same way. We do
        not sell personal information as those laws define it.
      </p>

      <h2>Security</h2>
      <p>
        The site is served over HTTPS, and access to submissions is limited to the two of us. No system is perfectly
        secure, so please don&rsquo;t send us sensitive information &mdash; financial details, government ID numbers,
        health information, or passwords &mdash; through the contact form. We will never ask you for a password.
      </p>

      <h2>Children</h2>
      <p>
        This site is aimed at businesses and is not intended for anyone under 16. We don&rsquo;t knowingly collect
        information from children. If you believe we have, contact us and we&rsquo;ll delete it.
      </p>

      <h2>International visitors</h2>
      <p>
        We operate in the United States, and our service providers store data there. If you contact us from elsewhere,
        you understand your information will be transferred to and processed in the US.
      </p>

      <h2>Changes</h2>
      <p>
        If we change this policy we&rsquo;ll update the date at the top. Material changes will be noted here rather
        than made quietly.
      </p>
    </LegalShell>
  );
}
