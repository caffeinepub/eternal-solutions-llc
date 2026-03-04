import { AlertCircle } from "lucide-react";
import { motion } from "motion/react";

export default function DisclaimerSection() {
  return (
    <section
      id="disclaimer"
      className="py-12"
      style={{ backgroundColor: "oklch(0.94 0.012 240)" }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="flex gap-4 items-start p-5 rounded-xl border bg-white"
          style={{ borderColor: "oklch(0.88 0.015 240)" }}
        >
          <AlertCircle
            className="w-5 h-5 flex-shrink-0 mt-0.5"
            style={{ color: "oklch(0.55 0.07 55)" }}
          />
          <div>
            <h2
              className="font-display text-base font-semibold mb-2"
              style={{ color: "oklch(0.35 0.05 55)" }}
            >
              Important Disclaimer
            </h2>
            <p
              className="font-body text-sm leading-relaxed"
              style={{ color: "oklch(0.45 0.03 255)" }}
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
