import { Mail, Phone } from "lucide-react";
import { motion } from "motion/react";
import { SiFacebook, SiInstagram, SiTiktok } from "react-icons/si";

export default function ContactSection() {
  return (
    <section
      id="contact"
      data-ocid="contact.section"
      className="section-teal py-20 lg:py-28"
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
            style={{ color: "oklch(0.78 0.04 210)" }}
          >
            Get In Touch
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white mb-4">
            Contact Us
          </h2>
          <div
            className="w-16 h-0.5 mx-auto"
            style={{ backgroundColor: "oklch(0.78 0.04 210)" }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
          {/* Email */}
          <motion.a
            href="mailto:info@eternalsolutionspa.com"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 p-5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/15 transition-colors group"
            data-ocid="contact.link"
          >
            <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-white" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-body text-xs text-white/60 mb-0.5 uppercase tracking-wide">
                Email
              </p>
              <p className="font-body text-sm text-white font-medium group-hover:underline">
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
            className="flex items-center gap-4 p-5 rounded-xl border border-white/20 bg-white/10"
          >
            <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-white" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-body text-xs text-white/60 mb-0.5 uppercase tracking-wide">
                Phone
              </p>
              <p className="font-body text-sm text-white font-medium">
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
            style={{ color: "oklch(0.78 0.04 210)" }}
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
              className="w-10 h-10 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
              data-ocid="contact.link"
            >
              <Icon className="w-5 h-5 text-white" />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
