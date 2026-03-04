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
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1600x900.jpg')",
        }}
        aria-hidden="true"
      />
      {/* Lighter teal-tinted overlay — just enough to ensure legibility */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "oklch(0.27 0.06 252 / 0.52)" }}
        aria-hidden="true"
      />

      {/* Soft gradient lift at bottom for smooth transition to white nav / next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, oklch(0.27 0.06 252 / 0.15))",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eyebrow pill */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/30 bg-white/15 backdrop-blur-sm">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "oklch(0.75 0.12 185)" }}
            />
            <span className="text-white/90 text-xs font-body tracking-widest uppercase font-medium">
              Pennsylvania Homeowners
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-semibold text-white leading-tight mb-6 max-w-3xl mx-auto">
            Not Sure If You Should File an Insurance Claim?{" "}
            <em
              className="not-italic"
              style={{ color: "oklch(0.88 0.10 185)" }}
            >
              Get a Professional Damage Review First.
            </em>
          </h1>

          {/* Subheadline */}
          <p
            className="font-body text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
            style={{ color: "oklch(0.93 0.01 90)" }}
          >
            We help Pennsylvania homeowners make informed decisions before
            contacting their insurance company.
          </p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button
              size="lg"
              onClick={scrollToForm}
              className="btn-plum text-white font-body font-semibold text-base px-8 py-3.5 rounded-lg h-auto border-0 shadow-lg"
              data-ocid="hero.primary_button"
            >
              Submit Damage for Free Review
            </Button>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("how-it-works");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="font-body text-sm text-white/80 hover:text-white transition-colors flex items-center gap-1.5"
            >
              See how it works
              <svg
                className="w-4 h-4"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-14"
          >
            {["PA Licensed", "No Upfront Fees", "Free Review"].map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: "oklch(0.75 0.12 185)" }}
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
                <span className="text-white/75 text-sm font-body">{badge}</span>
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
          className="w-5 h-8 rounded-full border border-white/25 flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
