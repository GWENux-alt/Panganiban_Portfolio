import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, BookOpen, Award } from "lucide-react";

const areas = [
  "Programming & Software Development",
  "Networking & Communications",
  "Database Management",
  "Web Development",
  "Systems Analysis & Design",
  "Technical Support & IT Infrastructure",
];

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-1/2 w-96 h-96 rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, hsl(270 60% 60%), transparent)" }} />
      </div>

      <div className="max-w-5xl mx-auto px-6" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-primary/70 mb-3 font-medium">Academic Background</p>
          <h2
            className="text-4xl md:text-5xl font-black"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            My <span className="gradient-text">Education</span>
          </h2>
          <div className="mt-4 mx-auto w-24 h-1 rounded-full" style={{ background: "linear-gradient(90deg, hsl(270 60% 60%), hsl(320 50% 65%))" }} />
        </motion.div>

        <motion.div
          className="rounded-3xl border bg-card overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          data-testid="education-card"
        >
          {/* Header bar */}
          <div
            className="h-2 w-full"
            style={{ background: "linear-gradient(90deg, hsl(270 60% 60%), hsl(320 50% 65%), hsl(340 55% 65%))" }}
          />

          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Icon side */}
              <div className="flex flex-col items-center gap-4 md:w-48 shrink-0">
                <motion.div
                  className="w-24 h-24 rounded-3xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, hsl(270 60% 60%), hsl(320 50% 65%))",
                    boxShadow: "0 16px 48px rgba(139,92,180,0.3)",
                  }}
                  animate={{ rotate: [0, 2, -2, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <GraduationCap size={40} className="text-white" />
                </motion.div>
                <div
                  className="px-3 py-1.5 rounded-full text-xs font-semibold text-white"
                  style={{ background: "linear-gradient(135deg, hsl(270 60% 60%), hsl(320 50% 65%))" }}
                >
                  2021 – 2026
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-sm font-medium mb-1" style={{ color: "hsl(270 60% 55%)" }}>
                  Pamantasan ng Cabuyao
                </p>
                <h3
                  className="text-2xl md:text-3xl font-black mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Bachelor of Science in
                  <br />
                  <span className="gradient-text">Information Technology</span>
                </h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  Completed a comprehensive four-year program covering foundational and advanced topics in
                  computing, networks, databases, and software engineering with focus on practical application.
                </p>

                <div className="grid sm:grid-cols-2 gap-3">
                  {areas.map((area, i) => (
                    <motion.div
                      key={area}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/60"
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                      data-testid={`education-area-${i}`}
                    >
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: "hsl(270 60% 60% / 0.15)" }}>
                        <BookOpen size={12} style={{ color: "hsl(270 60% 55%)" }} />
                      </div>
                      <span className="text-sm">{area}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-3 px-4 py-3 rounded-xl border border-dashed"
                  style={{ borderColor: "hsl(270 60% 60% / 0.3)" }}>
                  <Award size={16} style={{ color: "hsl(270 60% 55%)" }} />
                  <span className="text-sm text-muted-foreground">
                    Graduated <strong className="text-foreground">2026</strong> — BSIT Graduate
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
