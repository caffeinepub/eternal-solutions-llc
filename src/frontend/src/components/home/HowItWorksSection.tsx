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
      className="section-cream py-20 lg:py-28"
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
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-navy mb-4">
            How It Works
          </h2>
          <div
            className="w-16 h-0.5 mx-auto"
            style={{ backgroundColor: "oklch(0.38 0.07 210)" }}
          />
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connector line (desktop) */}
          <div
            className="hidden md:block absolute top-14 left-1/3 right-1/3 h-0.5 opacity-20"
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
                className="relative flex flex-col items-center text-center group"
              >
                {/* Step badge + icon */}
                <div className="relative mb-6">
                  <div
                    className="w-28 h-28 rounded-2xl flex flex-col items-center justify-center shadow-card relative overflow-hidden"
                    style={{ backgroundColor: "oklch(0.27 0.06 252)" }}
                  >
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 0%, oklch(0.38 0.07 210 / 0.6), transparent 70%)",
                      }}
                    />
                    <Icon
                      className="w-7 h-7 text-white relative z-10 mb-1"
                      strokeWidth={1.5}
                    />
                    <span
                      className="font-display text-xs font-semibold relative z-10"
                      style={{ color: "oklch(0.55 0.09 210)" }}
                    >
                      {step.number}
                    </span>
                  </div>
                  {/* Step number badge */}
                  <div
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold font-body shadow"
                    style={{ backgroundColor: "oklch(0.38 0.07 210)" }}
                  >
                    {index + 1}
                  </div>
                </div>

                <h3
                  className="font-display text-xl font-semibold mb-3 leading-tight"
                  style={{ color: "oklch(0.27 0.06 252)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="font-body text-sm leading-relaxed max-w-xs"
                  style={{ color: "oklch(0.40 0.03 270)" }}
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
