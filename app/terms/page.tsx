import type { Metadata } from "next";
import LegalShell from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "Terms of Service — erase friction",
  description:
    "The terms that govern your use of erasefriction.com, including our contact form, content ownership, and limits of liability.",
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  return (
    <LegalShell title="Terms of Service" updated="24 July 2026">
      <div className="lede">
        <p style={{ marginBottom: 0 }}>
          <strong>The short version:</strong> this site describes what we do and lets you get in touch. Nothing here is
          a contract to build anything &mdash; that comes later, in a signed agreement. Use the site honestly and
          we&rsquo;ll get along fine.
        </p>
      </div>

      <h2>1. Agreement</h2>
      <p>
        These terms govern your use of <a href="https://erasefriction.com">erasefriction.com</a> (the
        &ldquo;Site&rdquo;), operated by erase friction (&ldquo;we&rdquo;, &ldquo;us&rdquo;). By using the Site you
        agree to them. If you don&rsquo;t, please don&rsquo;t use the Site.
      </p>

      <h2>2. What this Site is</h2>
      <p>
        The Site is informational. It describes our services and gives you a way to contact us. Nothing on it is an
        offer, a quote, a guarantee of availability, or a commitment to perform work.
      </p>

      <h2>3. Contacting us doesn&rsquo;t create an engagement</h2>
      <p>
        Submitting the contact form starts a conversation, nothing more. We aim to respond within 48 hours, but that is
        a goal rather than a promise, and we may decline any inquiry for any reason. A client relationship exists only
        once both sides sign a separate written agreement describing the scope, price, and timeline of the work. Where
        that agreement conflicts with these terms, that agreement governs.
      </p>

      <h2>4. What you send us</h2>
      <p>You&rsquo;re responsible for what you submit. By using the contact form you confirm that:</p>
      <ul>
        <li>the information you provide is accurate,</li>
        <li>you have the right to share it with us, and</li>
        <li>you are not sending confidential material, credentials, or personal data about other people.</li>
      </ul>
      <p>
        Anything you send us that isn&rsquo;t covered by a signed confidentiality agreement is treated as
        non-confidential. If you need to share something sensitive, tell us and we&rsquo;ll put an NDA in place first.
        How we handle what you send is described in our <a href="/privacy">Privacy Policy</a>.
      </p>

      <h2>5. Acceptable use</h2>
      <p>
        Don&rsquo;t use the Site to break the law, submit false or automated form entries, send malware, scrape it at a
        volume that degrades it for others, attempt to gain unauthorised access, or copy it for a competing service.
      </p>

      <h2>6. Our content</h2>
      <p>
        The Site&rsquo;s text, design, graphics, logos, and code are owned by us or our licensors and protected by
        copyright and trademark law. You may view and share links to the Site. You may not reproduce, republish, or
        create derivative works from its content without our written permission. The &ldquo;erase friction&rdquo; name
        and logo are our marks.
      </p>

      <h2>7. Third-party links</h2>
      <p>
        The Site links to third-party sites (LinkedIn, for example). We don&rsquo;t control them and aren&rsquo;t
        responsible for their content, practices, or policies.
      </p>

      <h2>8. No warranty</h2>
      <p>
        The Site is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;, without warranties of any kind,
        express or implied, including implied warranties of merchantability, fitness for a particular purpose, and
        non-infringement. We do not warrant that the Site will be uninterrupted, error-free, or secure, or that any
        content on it is accurate or current. Descriptions of past results or time savings are illustrative and are not
        a prediction of what you would achieve.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, we are not liable for any indirect, incidental, special, consequential,
        or punitive damages, or any loss of profits, revenue, data, or business, arising out of your use of the Site
        &mdash; even if we&rsquo;ve been advised such damages are possible. Our total liability for any claim relating
        to the Site is limited to one hundred US dollars ($100).
      </p>
      <p>Some jurisdictions don&rsquo;t allow certain limitations, so parts of this section may not apply to you.</p>

      <h2>10. Indemnity</h2>
      <p>
        You agree to indemnify and hold us harmless from any claim, loss, or expense (including reasonable legal fees)
        arising from your misuse of the Site or your breach of these terms.
      </p>

      <h2>11. Changes</h2>
      <p>
        We may update these terms. The date at the top shows when they last changed, and continuing to use the Site
        after a change means you accept the revised version.
      </p>

      <h2>12. Governing law</h2>
      <p>
        These terms are governed by the laws of the State of Alabama, USA, without regard to its conflict-of-law rules.
        Any dispute relating to the Site will be brought exclusively in the state or federal courts located in Mobile
        County, Alabama, and you consent to their jurisdiction.
      </p>

      <h2>13. General</h2>
      <p>
        If any provision is found unenforceable, the rest stays in effect. Our failure to enforce a provision
        isn&rsquo;t a waiver of it. These terms, together with the <a href="/privacy">Privacy Policy</a>, are the
        entire agreement between us regarding the Site.
      </p>

      <h2>14. Contact</h2>
      <p>
        Questions about these terms: <a href="mailto:brooks@erasefriction.com">brooks@erasefriction.com</a> or{" "}
        <a href="tel:+12515545575">251-554-5575</a>.
      </p>
    </LegalShell>
  );
}
