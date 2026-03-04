import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    title: "Pennsylvania Licensed",
    description:
      "We operate exclusively within Pennsylvania and understand the state's insurance regulations and claim processes.",
  },
  {
    title: "Professional Policy Review",
    description:
      "Our team carefully reviews your policy documentation to identify coverage applicable to your specific damage.",
  },
  {
    title: "No Upfront Fees",
    description:
      "Our pre-claim review service is free. Public Adjuster fees are contingency-based — paid only from your claim settlement.",
  },
  {
    title: "Structured & Transparent Process",
    description:
      "You receive clear communication at every step — no surprises, no uncertainty about where your case stands.",
  },
  {
    title: "Ongoing Client Support",
    description:
      "From initial review through final settlement, we remain available to answer questions and guide you forward.",
  },
];

export default function WhyUsSection() {
  return (
    <section
      id="why-us"
      data-ocid="why_us.section"
      className="section-navy py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: header */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="font-body text-sm font-semibold tracking-widest uppercase mb-3"
              style={{ color: "oklch(0.55 0.09 210)" }}
            >
              Our Commitment
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6 leading-tight">
              Why Work With Us
            </h2>
            <div
              className="w-16 h-0.5 mb-6"
              style={{ backgroundColor: "oklch(0.38 0.07 210)" }}
            />
            <p
              className="font-body text-base leading-relaxed"
              style={{ color: "oklch(0.80 0.02 75)" }}
            >
              Eternal Solutions LLC was founded on the belief that Pennsylvania
              homeowners deserve professional guidance before making one of the
              most important financial decisions following property damage.
            </p>
            <div className="mt-8 p-5 rounded-xl border border-white/10 bg-white/5">
              <p
                className="font-body text-sm italic leading-relaxed"
                style={{ color: "oklch(0.78 0.06 75)" }}
              >
                "We don't work for the insurance company. We work for you —
                helping you understand your options before you commit to a
                claim."
              </p>
            </div>
          </motion.div>

          {/* Right: features list */}
          <div className="space-y-5">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 transition-colors"
              >
                <CheckCircle2
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
                  style={{ color: "oklch(0.55 0.09 210)" }}
                  strokeWidth={2}
                />
                <div>
                  <h3 className="font-body font-semibold text-white text-sm mb-1">
                    {feature.title}
                  </h3>
                  <p
                    className="font-body text-sm leading-relaxed"
                    style={{ color: "oklch(0.72 0.025 75)" }}
                  >
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
