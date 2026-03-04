import { Mail, Phone } from "lucide-react";
import { motion } from "motion/react";
import { SiFacebook, SiInstagram, SiTiktok } from "react-icons/si";

export default function ContactSection() {
  return (
    <section
      id="contact"
      data-ocid="contact.section"
      className="py-20 lg:py-28"
      style={{ backgroundColor: "oklch(0.97 0.012 80)" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p
            className="font-body text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: "oklch(0.38 0.07 210)" }}
          >
            Get In Touch
          </p>
          <h2
            className="font-display text-3xl sm:text-4xl font-semibold mb-4"
            style={{ color: "oklch(0.27 0.06 252)" }}
          >
            Contact Us
          </h2>
          <div className="accent-bar mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
          {/* Email */}
          <motion.a
            href="mailto:info@eternalsolutionspa.com"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 p-5 rounded-xl bg-white border transition-shadow hover:shadow-md group"
            style={{ borderColor: "oklch(0.90 0.012 240)" }}
            data-ocid="contact.link"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "oklch(0.94 0.028 210)" }}
            >
              <Mail
                className="w-5 h-5"
                style={{ color: "oklch(0.38 0.07 210)" }}
                strokeWidth={1.5}
              />
            </div>
            <div>
              <p
                className="font-body text-xs mb-0.5 uppercase tracking-wide"
                style={{ color: "oklch(0.55 0.04 255)" }}
              >
                Email
              </p>
              <p
                className="font-body text-sm font-medium group-hover:underline"
                style={{ color: "oklch(0.27 0.06 252)" }}
              >
                info@eternalsolutionspa.com
              </p>
            </div>
          </motion.a>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-4 p-5 rounded-xl bg-white border"
            style={{ borderColor: "oklch(0.90 0.012 240)" }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "oklch(0.94 0.028 210)" }}
            >
              <Phone
                className="w-5 h-5"
                style={{ color: "oklch(0.38 0.07 210)" }}
                strokeWidth={1.5}
              />
            </div>
            <div>
              <p
                className="font-body text-xs mb-0.5 uppercase tracking-wide"
                style={{ color: "oklch(0.55 0.04 255)" }}
              >
                Phone
              </p>
              <p
                className="font-body text-sm font-medium"
                style={{ color: "oklch(0.27 0.06 252)" }}
              >
                Contact us by phone
              </p>
            </div>
          </motion.div>
        </div>

        {/* Social media */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-4"
        >
          <p
            className="font-body text-sm mr-2"
            style={{ color: "oklch(0.45 0.04 255)" }}
          >
            Follow Us:
          </p>
          {[
            { icon: SiTiktok, label: "TikTok", href: "#" },
            { icon: SiFacebook, label: "Facebook", href: "#" },
            { icon: SiInstagram, label: "Instagram", href: "#" },
          ].map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="w-10 h-10 rounded-lg border flex items-center justify-center transition-all hover:scale-105"
              style={{
                borderColor: "oklch(0.90 0.012 240)",
                backgroundColor: "oklch(0.99 0.003 90)",
                color: "oklch(0.38 0.07 210)",
              }}
              data-ocid="contact.link"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
