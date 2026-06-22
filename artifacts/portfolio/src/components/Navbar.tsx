import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X, Download } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Update active section
      const sections = navItems.map((item) => item.href.slice(1));
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div
          className={`transition-all duration-500 ${
            scrolled
              ? "mx-4 mt-3 rounded-2xl glass-card shadow-lg border"
              : "border-b border-transparent"
          }`}
          style={
            scrolled
              ? {}
              : { background: "transparent" }
          }
        >
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <motion.button
              onClick={() => scrollTo("#home")}
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.02 }}
              data-testid="nav-logo"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                style={{
                  background: "linear-gradient(135deg, hsl(270 60% 60%), hsl(320 50% 65%))",
                }}
              >
                G
              </div>
              <span
                className="font-bold text-lg hidden sm:block"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  background: "linear-gradient(135deg, hsl(270 60% 55%), hsl(320 50% 60%))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Gwen.
              </span>
            </motion.button>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                    activeSection === item.href.slice(1)
                      ? "text-primary"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-testid={`nav-${item.label.toLowerCase()}`}
                >
                  {activeSection === item.href.slice(1) && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: "linear-gradient(135deg, hsl(270 60% 60% / 0.1), hsl(320 50% 65% / 0.1))",
                      }}
                      transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
                    />
                  )}
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Resume download */}
              <motion.a
                href="#"
                download
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all"
                style={{
                  background: "linear-gradient(135deg, hsl(270 60% 60%), hsl(320 50% 65%))",
                }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(139,92,180,0.4)" }}
                whileTap={{ scale: 0.95 }}
                data-testid="nav-resume"
              >
                <Download size={14} />
                Resume
              </motion.a>

              {/* Theme toggle */}
              <motion.button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-xl flex items-center justify-center border border-border bg-background/50 text-foreground/70 hover:text-foreground transition-colors"
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                data-testid="nav-theme-toggle"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme}
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>

              {/* Mobile menu toggle */}
              <motion.button
                className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center border border-border bg-background/50"
                onClick={() => setMobileOpen(!mobileOpen)}
                whileTap={{ scale: 0.9 }}
                data-testid="nav-mobile-menu"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="absolute top-20 left-4 right-4 rounded-2xl glass-card border shadow-xl p-4"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", bounce: 0.3 }}
            >
              {navItems.map((item, i) => (
                <motion.button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeSection === item.href.slice(1)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:bg-muted"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </motion.button>
              ))}
              <div className="mt-3 pt-3 border-t border-border">
                <motion.a
                  href="#"
                  download
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white"
                  style={{
                    background: "linear-gradient(135deg, hsl(270 60% 60%), hsl(320 50% 65%))",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                >
                  <Download size={14} />
                  Download Resume
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
