import { AlertCircle } from "lucide-react";
import { motion } from "motion/react";

export default function DisclaimerSection() {
  return (
    <section id="disclaimer" className="section-charcoal py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="flex gap-4 items-start"
        >
          <AlertCircle
            className="w-5 h-5 flex-shrink-0 mt-0.5 opacity-60"
            style={{ color: "oklch(0.78 0.06 75)" }}
          />
          <div>
            <h2
              className="font-display text-base font-semibold mb-3"
              style={{ color: "oklch(0.78 0.06 75)" }}
            >
              Important Disclaimer
            </h2>
            <p
              className="font-body text-sm leading-relaxed"
              style={{ color: "oklch(0.68 0.025 75)" }}
            >
              Eternal Solutions LLC is not an insurance company, insurance
              agent, or attorney. We provide pre-claim consultation and
              documentation services only. Our services are designed to help
              homeowners understand their options before filing a claim. No
              legal or insurance advice is provided. Results may vary.
              Connecting you with a licensed Public Adjuster does not guarantee
              claim approval or any specific outcome. Eternal Solutions LLC
              operates in the Commonwealth of Pennsylvania.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
