import { Link } from "@tanstack/react-router";
import { ArrowLeft, Shield } from "lucide-react";

function Section({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2
        className="font-display text-xl font-semibold mb-4"
        style={{ color: "oklch(0.27 0.06 252)" }}
      >
        {title}
      </h2>
      <div
        className="space-y-3 font-body text-sm leading-relaxed"
        style={{ color: "oklch(0.35 0.04 270)" }}
      >
        {children}
      </div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header bar */}
      <header className="bg-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors font-body text-sm"
            data-ocid="nav.link.1"
            aria-label="Back to home"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2 ml-auto">
            <div className="w-7 h-7 rounded-md bg-plum/70 flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" strokeWidth={1.5} />
            </div>
            <span className="font-display text-white text-sm font-semibold">
              Eternal Solutions LLC
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        {/* Title */}
        <div className="mb-10">
          <h1
            className="font-display text-3xl sm:text-4xl font-semibold mb-2"
            style={{ color: "oklch(0.27 0.06 252)" }}
          >
            Terms & Conditions
          </h1>
          <p
            className="font-body text-sm"
            style={{ color: "oklch(0.55 0.03 270)" }}
          >
            Last updated: March 2026
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-6 sm:p-10">
          <Section title="Agreement to Terms">
            <p>
              By accessing or using the website and services provided by Eternal
              Solutions LLC ("Company," "we," "our," or "us"), you agree to be
              bound by these Terms & Conditions. If you do not agree, please do
              not use our services.
            </p>
          </Section>

          <Section title="Description of Services">
            <p>
              Eternal Solutions LLC provides pre-claim consultation and
              documentation services to Pennsylvania homeowners. Our services
              include:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>
                Reviewing homeowner-submitted photographs, videos, and written
                descriptions of property damage.
              </li>
              <li>
                Evaluating whether reported damage may warrant the filing of an
                insurance claim.
              </li>
              <li>
                Connecting qualified homeowners with licensed Pennsylvania
                Public Adjusters for professional claim representation.
              </li>
            </ul>
            <p>
              <strong>
                Our services do not constitute legal advice, insurance advice,
                or any form of licensed professional services other than
                pre-claim consultation.
              </strong>{" "}
              Eternal Solutions LLC is not an insurance company, insurance
              agent, insurance broker, or attorney.
            </p>
          </Section>

          <Section title="No Guarantee of Outcomes">
            <p>
              Eternal Solutions LLC makes no representations, warranties, or
              guarantees regarding the outcome of any insurance claim.
              Connecting you with a licensed Public Adjuster does not guarantee:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>That your insurance claim will be approved.</li>
              <li>That you will receive any specific settlement amount.</li>
              <li>
                That your insurer will agree with any assessment provided.
              </li>
            </ul>
            <p>
              Results vary based on individual policy terms, insurer
              determinations, and the nature and extent of damage. Past results
              do not guarantee future outcomes.
            </p>
          </Section>

          <Section title="User Responsibilities">
            <p>By using our services, you agree to:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>
                Provide accurate, complete, and truthful information in your
                intake form and any communications with us.
              </li>
              <li>
                Not submit fraudulent, misleading, or fabricated information,
                photographs, or videos regarding property damage.
              </li>
              <li>
                Understand that submitting false or misleading information to us
                or to a Public Adjuster may constitute insurance fraud, which is
                a criminal offense under Pennsylvania law.
              </li>
              <li>
                Be the property owner or an authorized representative of the
                property described in your submission.
              </li>
              <li>
                Use our services for lawful purposes only and in compliance with
                all applicable laws and regulations.
              </li>
            </ul>
          </Section>

          <Section title="Fees">
            <p>
              The pre-claim consultation and review service provided by Eternal
              Solutions LLC is offered at no upfront cost to the homeowner. If
              your claim is connected to a licensed Public Adjuster, that
              adjuster may charge contingency fees based on your final claim
              settlement, as permitted under Pennsylvania law. Any such fees
              will be clearly disclosed by the Public Adjuster prior to
              engagement.
            </p>
          </Section>

          <Section title="Intellectual Property">
            <p>
              All content on this website, including but not limited to text,
              graphics, logos, and design elements, is the property of Eternal
              Solutions LLC and is protected by applicable intellectual property
              laws. You may not reproduce, distribute, or create derivative
              works without our express written permission.
            </p>
          </Section>

          <Section title="Disclaimer of Warranties">
            <p>
              Our services are provided on an "as is" and "as available" basis
              without warranties of any kind, express or implied, including but
              not limited to warranties of merchantability, fitness for a
              particular purpose, or non-infringement. We do not warrant that
              our services will be uninterrupted, error-free, or free of harmful
              components.
            </p>
          </Section>

          <Section title="Limitation of Liability">
            <p>
              To the fullest extent permitted by applicable law, Eternal
              Solutions LLC and its members, officers, employees, and agents
              shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages, including but not limited to
              loss of profits, loss of data, loss of goodwill, or business
              interruption, arising from your use of our services or inability
              to use them.
            </p>
            <p>
              In no event shall our total liability exceed the amount paid by
              you to Eternal Solutions LLC in connection with the services that
              gave rise to the claim, or one hundred dollars ($100), whichever
              is greater.
            </p>
          </Section>

          <Section title="Indemnification">
            <p>
              You agree to indemnify, defend, and hold harmless Eternal
              Solutions LLC and its affiliates, officers, agents, and employees
              from and against any claims, liabilities, damages, judgments,
              losses, costs, and expenses (including reasonable attorneys' fees)
              arising from your use of our services, your violation of these
              Terms, or your submission of inaccurate or fraudulent information.
            </p>
          </Section>

          <Section title="Governing Law and Jurisdiction">
            <p>
              These Terms & Conditions shall be governed by and construed in
              accordance with the laws of the Commonwealth of Pennsylvania,
              without regard to its conflict of law provisions. Any disputes
              arising under these Terms shall be subject to the exclusive
              jurisdiction of the state and federal courts located in
              Pennsylvania.
            </p>
          </Section>

          <Section title="Modifications to Terms">
            <p>
              We reserve the right to modify these Terms & Conditions at any
              time. Updated terms will be posted on this page with a revised
              "Last Updated" date. Your continued use of our services following
              any changes constitutes your acceptance of the revised terms.
            </p>
          </Section>

          <Section title="Severability">
            <p>
              If any provision of these Terms is found to be invalid, illegal,
              or unenforceable, the remaining provisions shall continue in full
              force and effect.
            </p>
          </Section>

          <Section title="Contact Us">
            <p>
              If you have any questions about these Terms & Conditions, please
              contact us:
            </p>
            <p>
              <strong>Eternal Solutions LLC</strong>
              <br />
              Email:{" "}
              <a
                href="mailto:info@eternalsolutionspa.com"
                className="underline"
                style={{ color: "oklch(0.38 0.07 210)" }}
              >
                info@eternalsolutionspa.com
              </a>
              <br />
              Commonwealth of Pennsylvania
            </p>
          </Section>
        </div>
      </main>

      <footer className="bg-navy py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p
            className="font-body text-xs"
            style={{ color: "oklch(0.55 0.025 75)" }}
          >
            © {new Date().getFullYear()} Eternal Solutions LLC. All rights
            reserved. | Pennsylvania
          </p>
        </div>
      </footer>
    </div>
  );
}
