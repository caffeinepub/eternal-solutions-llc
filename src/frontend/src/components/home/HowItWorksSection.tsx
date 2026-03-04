import { Search, Upload, UserCheck } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Submit Your Damage",
    description:
      "Upload photos, videos, and basic information about your property damage through our secure intake form.",
  },
  {
    number: "02",
    icon: Search,
    title: "We Review Your Claim",
    description:
      "We evaluate your damage and policy details to determine if filing makes sense for your specific situation.",
  },
  {
    number: "03",
    icon: UserCheck,
    title: "Licensed Public Adjuster Representation",
    description:
      "If your claim qualifies, you will be connected with a licensed Pennsylvania Public Adjuster for inspection and negotiation.",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      data-ocid="how_it_works.section"
      className="py-20 lg:py-28"
      style={{ backgroundColor: "oklch(0.97 0.012 80)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p
            className="font-body text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: "oklch(0.38 0.07 210)" }}
          >
            Our Process
          </p>
          <h2
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4"
            style={{ color: "oklch(0.27 0.06 252)" }}
          >
            How It Works
          </h2>
          <div className="accent-bar mx-auto" />
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
          {/* Connector line (desktop) */}
          <div
            className="hidden md:block absolute top-12 left-[calc(33%+3rem)] right-[calc(33%+3rem)] h-px opacity-30"
            style={{ backgroundColor: "oklch(0.38 0.07 210)" }}
            aria-hidden="true"
          />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                data-ocid={`how_it_works.item.${index + 1}`}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative flex flex-col items-center text-center bg-white rounded-2xl p-8 shadow-sm border"
                style={{ borderColor: "oklch(0.90 0.012 240)" }}
              >
                {/* Step number badge */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold font-body shadow-sm"
                  style={{ backgroundColor: "oklch(0.44 0.08 316)" }}
                >
                  {index + 1}
                </div>

                {/* Icon circle */}
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: "oklch(0.94 0.028 210)" }}
                >
                  <Icon
                    className="w-8 h-8"
                    style={{ color: "oklch(0.38 0.07 210)" }}
                    strokeWidth={1.5}
                  />
                </div>

                <h3
                  className="font-display text-xl font-semibold mb-3 leading-snug"
                  style={{ color: "oklch(0.27 0.06 252)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: "oklch(0.45 0.03 255)" }}
                >
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
