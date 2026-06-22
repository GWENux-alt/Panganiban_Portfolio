import { motion } from "framer-motion";
import { Github, Linkedin, Facebook, Mail, Phone, MapPin, Heart, ArrowUp } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com", color: "hover:text-foreground" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com", color: "hover:text-blue-400" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com", color: "hover:text-blue-500" },
  { icon: Mail, label: "Email", href: "mailto:panganibanjezimielgwen@gmail.com", color: "hover:text-rose-400" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-border">
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, transparent, hsl(270 40% 97% / 0.4))",
        }}
      />
      <div className="dark:hidden absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent, hsl(270 30% 97% / 0.5))" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold"
                style={{ background: "linear-gradient(135deg, hsl(270 60% 60%), hsl(320 50% 65%))" }}
              >
                G
              </div>
              <span
                className="text-xl font-black gradient-text"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Gwen Panganiban
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-xs">
              Information Technology Graduate passionate about building innovative digital solutions and
              delivering exceptional user experiences.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, label, href, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-xl border border-border bg-card flex items-center justify-center text-muted-foreground transition-colors ${color}`}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  data-testid={`footer-social-${label.toLowerCase()}`}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold tracking-widest uppercase text-muted-foreground mb-5">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <motion.button
                    onClick={() => scrollTo(href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group"
                    whileHover={{ x: 4 }}
                    data-testid={`footer-link-${label.toLowerCase()}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors shrink-0" />
                    {label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-bold tracking-widest uppercase text-muted-foreground mb-5">Contact</h4>
            <div className="space-y-3">
              {[
                { icon: Mail, text: "panganibanjezimielgwen@gmail.com", href: "mailto:panganibanjezimielgwen@gmail.com" },
                { icon: Phone, text: "+63 976 253 5242", href: "tel:+639762535242" },
                { icon: MapPin, text: "Sta. Rosa, Laguna, Philippines", href: "#" },
              ].map(({ icon: Icon, text, href }) => (
                <a
                  key={text}
                  href={href}
                  className="flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                  data-testid={`footer-contact-${Icon.displayName || 'info'}`}
                >
                  <Icon size={14} className="mt-0.5 shrink-0 text-primary/60 group-hover:text-primary transition-colors" />
                  <span className="break-all">{text}</span>
                </a>
              ))}
            </div>

            <motion.a
              href="#"
              download
              className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{
                background: "linear-gradient(135deg, hsl(270 60% 60%), hsl(320 50% 65%))",
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(139,92,180,0.3)" }}
              whileTap={{ scale: 0.97 }}
              data-testid="footer-resume"
            >
              Download Resume
            </motion.a>
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} Jezimiel Gwen T. Panganiban. All rights reserved.{" "}
            <span className="inline-flex items-center gap-1">
              Built with <Heart size={10} className="text-rose-400" fill="currentColor" /> and passion.
            </span>
          </p>

          <motion.button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-xl border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            data-testid="footer-scroll-top"
          >
            <ArrowUp size={15} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
