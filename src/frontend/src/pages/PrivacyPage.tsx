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

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p
            className="font-body text-sm"
            style={{ color: "oklch(0.55 0.03 270)" }}
          >
            Last updated: March 2026
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-6 sm:p-10">
          <Section title="Introduction">
            <p>
              Eternal Solutions LLC ("we," "our," or "us") is committed to
              protecting the privacy of the homeowners who use our services.
              This Privacy Policy explains how we collect, use, store, and share
              your personal information when you interact with our website and
              submit a pre-claim intake form.
            </p>
            <p>
              By using our website or submitting your information, you agree to
              the practices described in this Privacy Policy.
            </p>
          </Section>

          <Section title="Information We Collect">
            <p>
              When you complete our Pre-Claim Intake Form, we collect the
              following categories of information:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>
                <strong>Contact Information:</strong> Full name, phone number,
                email address, and property address.
              </li>
              <li>
                <strong>Insurance Information:</strong> Name of your insurance
                company, policy number (if provided), and property type.
              </li>
              <li>
                <strong>Damage Information:</strong> Date of loss, cause of
                loss, and a written description of property damage.
              </li>
              <li>
                <strong>Uploaded Files:</strong> Photographs and video
                recordings of alleged property damage that you voluntarily
                upload.
              </li>
              <li>
                <strong>Communication Preferences:</strong> Your preferred
                method of contact (phone, email, or text).
              </li>
            </ul>
            <p>
              We may also collect technical information automatically when you
              visit our website, such as IP address, browser type, and page
              visit data, for operational and security purposes.
            </p>
          </Section>

          <Section title="How We Use Your Information">
            <p>
              We use the information you provide for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>
                To review and evaluate whether your property damage may qualify
                for an insurance claim.
              </li>
              <li>
                To contact you regarding the results of your pre-claim review.
              </li>
              <li>
                To connect you with a licensed Pennsylvania Public Adjuster if
                your damage qualifies for claim representation.
              </li>
              <li>
                To respond to your inquiries and provide ongoing client support.
              </li>
              <li>
                To comply with applicable laws, regulations, and legal
                obligations.
              </li>
            </ul>
          </Section>

          <Section title="How We Share Your Information">
            <p>
              We do not sell, rent, or trade your personal information to third
              parties for marketing purposes.
            </p>
            <p>
              We may share your information in the following limited
              circumstances:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>
                <strong>Licensed Public Adjusters:</strong> If your claim is
                determined to qualify for representation, we will share your
                intake information with a licensed Pennsylvania Public Adjuster
                who will contact you for further assessment.
              </li>
              <li>
                <strong>Service Providers:</strong> We may share information
                with trusted technology providers who help us operate our
                website and store your data securely, subject to confidentiality
                obligations.
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may disclose your
                information if required by law, court order, or government
                authority.
              </li>
            </ul>
          </Section>

          <Section title="Data Retention">
            <p>
              We retain your intake submission information for as long as
              necessary to fulfill the purposes outlined in this policy or as
              required by law. If you request deletion of your information, we
              will make commercially reasonable efforts to honor that request,
              subject to any legal or regulatory obligations to retain records.
            </p>
          </Section>

          <Section title="Data Security">
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              disclosure, alteration, or destruction. This includes secure
              transmission protocols for data in transit and access controls for
              data at rest.
            </p>
            <p>
              However, no method of electronic transmission or storage is 100%
              secure. We cannot guarantee absolute security of your data and
              encourage you to contact us immediately if you suspect
              unauthorized use of your information.
            </p>
          </Section>

          <Section title="Your Rights">
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>
                Request access to the personal information we hold about you.
              </li>
              <li>
                Request correction of inaccurate or incomplete information.
              </li>
              <li>
                Request deletion of your personal information, subject to
                applicable legal obligations.
              </li>
              <li>
                Withdraw consent for communications at any time by contacting us
                directly.
              </li>
            </ul>
          </Section>

          <Section title="Children's Privacy">
            <p>
              Our services are not directed to individuals under the age of 18.
              We do not knowingly collect personal information from minors. If
              you believe we have inadvertently collected information from a
              minor, please contact us immediately.
            </p>
          </Section>

          <Section title="Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with a revised "Last Updated" date.
              Your continued use of our website or services after such changes
              constitutes acceptance of the updated policy.
            </p>
          </Section>

          <Section title="Contact Us">
            <p>
              If you have any questions, concerns, or requests regarding this
              Privacy Policy or our data practices, please contact us at:
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
