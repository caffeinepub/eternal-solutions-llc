import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export default function HeroSection() {
  const scrollToForm = () => {
    const el = document.getElementById("intake-form");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      data-ocid="hero.section"
      className="relative min-h-screen flex items-center justify-center"
    >
      {/* Background image with navy overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1600x900.jpg')",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "oklch(0.27 0.06 252 / 0.72)" }}
        aria-hidden="true"
      />

      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 50%, oklch(0.38 0.07 210 / 0.3) 0%, transparent 60%), radial-gradient(circle at 70% 20%, oklch(0.44 0.08 316 / 0.15) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
            <div
              className="w-1.5 h-1.5 rounded-full bg-teal"
              style={{ backgroundColor: "oklch(0.55 0.09 210)" }}
            />
            <span className="text-white/80 text-xs font-body tracking-widest uppercase font-medium">
              Pennsylvania Homeowners
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white leading-tight mb-6 max-w-3xl mx-auto">
            Not Sure If You Should File an Insurance Claim?{" "}
            <span className="italic" style={{ color: "oklch(0.78 0.06 75)" }}>
              Get a Professional Damage Review First.
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="font-body text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
            style={{ color: "oklch(0.88 0.015 75)" }}
          >
            We help Pennsylvania homeowners make informed decisions before
            contacting their insurance company.
          </p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button
              size="lg"
              onClick={scrollToForm}
              className="btn-plum text-white font-body font-medium text-base px-8 py-3.5 rounded-md h-auto border-0 shadow-lg"
              data-ocid="hero.primary_button"
            >
              Submit Damage for Free Review
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-12"
          >
            {["PA Licensed", "No Upfront Fees", "Free Review"].map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: "oklch(0.55 0.09 210)" }}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  role="img"
                  aria-label="Checkmark"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-white/70 text-sm font-body">{badge}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
