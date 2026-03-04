import { Link } from "@tanstack/react-router";
import { Shield } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy py-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-plum/70 flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" strokeWidth={1.5} />
            </div>
            <span className="font-display text-white text-sm font-semibold">
              Eternal Solutions LLC
            </span>
          </div>

          {/* Copyright */}
          <p
            className="font-body text-xs text-center"
            style={{ color: "oklch(0.65 0.025 75)" }}
          >
            © {year} Eternal Solutions LLC. All rights reserved. | Pennsylvania
          </p>

          {/* Legal links */}
          <div className="flex items-center gap-4">
            <Link
              to="/privacy"
              className="font-body text-xs hover:text-white/80 transition-colors"
              style={{ color: "oklch(0.65 0.025 75)" }}
              data-ocid="footer.link.1"
            >
              Privacy Policy
            </Link>
            <span style={{ color: "oklch(0.45 0.02 75)" }}>·</span>
            <Link
              to="/terms"
              className="font-body text-xs hover:text-white/80 transition-colors"
              style={{ color: "oklch(0.65 0.025 75)" }}
              data-ocid="footer.link.2"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/5 text-center">
          <p
            className="font-body text-xs"
            style={{ color: "oklch(0.50 0.02 75)" }}
          >
            © {year}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/60 transition-colors underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
