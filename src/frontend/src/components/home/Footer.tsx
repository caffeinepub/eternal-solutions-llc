import { Link } from "@tanstack/react-router";
import { Shield } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="py-10 border-t"
      style={{
        backgroundColor: "oklch(0.27 0.06 252)",
        borderColor: "oklch(0.32 0.05 252)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center"
              style={{ backgroundColor: "oklch(0.38 0.07 210)" }}
            >
              <Shield className="w-4 h-4 text-white" strokeWidth={1.5} />
            </div>
            <span
              className="font-display text-sm font-semibold"
              style={{ color: "oklch(0.90 0.01 90)" }}
            >
              Eternal Solutions LLC
            </span>
          </div>

          {/* Copyright */}
          <p
            className="font-body text-xs text-center"
            style={{ color: "oklch(0.62 0.03 240)" }}
          >
            © {year} Eternal Solutions LLC. All rights reserved. | Pennsylvania
          </p>

          {/* Legal links */}
          <div className="flex items-center gap-4">
            <Link
              to="/privacy"
              className="font-body text-xs transition-colors hover:opacity-80"
              style={{ color: "oklch(0.62 0.03 240)" }}
              data-ocid="footer.link.1"
            >
              Privacy Policy
            </Link>
            <span style={{ color: "oklch(0.45 0.02 252)" }}>·</span>
            <Link
              to="/terms"
              className="font-body text-xs transition-colors hover:opacity-80"
              style={{ color: "oklch(0.62 0.03 240)" }}
              data-ocid="footer.link.2"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>

        <div
          className="mt-6 pt-6 border-t text-center"
          style={{ borderColor: "oklch(0.32 0.05 252)" }}
        >
          <p
            className="font-body text-xs"
            style={{ color: "oklch(0.48 0.025 252)" }}
          >
            © {year}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
