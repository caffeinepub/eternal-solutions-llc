import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy/95 backdrop-blur-md border-b border-white/10 shadow-md"
          : "bg-navy/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="Eternal Solutions LLC Home"
          >
            <div className="w-9 h-9 rounded-lg bg-plum/80 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-white" strokeWidth={1.5} />
            </div>
            <div>
              <span className="font-display text-white text-base font-semibold leading-none block">
                Eternal Solutions
              </span>
              <span className="text-white/60 text-xs font-body tracking-wide">
                LLC
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            <button
              type="button"
              onClick={() => scrollTo("how-it-works")}
              className="text-white/80 hover:text-white text-sm px-3 py-2 rounded transition-colors font-body"
              data-ocid="nav.link.1"
            >
              How It Works
            </button>
            <button
              type="button"
              onClick={() => scrollTo("why-us")}
              className="text-white/80 hover:text-white text-sm px-3 py-2 rounded transition-colors font-body"
              data-ocid="nav.link.2"
            >
              Why Us
            </button>
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="text-white/80 hover:text-white text-sm px-3 py-2 rounded transition-colors font-body"
              data-ocid="nav.link.3"
            >
              Contact
            </button>
            <Button
              type="button"
              onClick={() => scrollTo("intake-form")}
              className="ml-3 btn-plum text-white text-sm px-4 py-2 rounded-md font-medium font-body border-0 h-9"
              data-ocid="nav.submit_button"
            >
              Submit Claim
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden text-white/80 hover:text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            data-ocid="nav.link.4"
          >
            <div className="w-5 space-y-1.5">
              <span
                className={`block h-0.5 bg-current transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block h-0.5 bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 bg-current transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav
            className="md:hidden border-t border-white/10 py-4 space-y-1"
            aria-label="Mobile navigation"
          >
            {[
              { label: "How It Works", id: "how-it-works" },
              { label: "Why Us", id: "why-us" },
              { label: "Contact", id: "contact" },
            ].map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="w-full text-left text-white/80 hover:text-white text-sm px-3 py-2.5 rounded transition-colors font-body"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2">
              <Button
                type="button"
                onClick={() => scrollTo("intake-form")}
                className="w-full btn-plum text-white font-body border-0"
              >
                Submit Claim
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
