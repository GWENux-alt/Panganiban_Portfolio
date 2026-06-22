import { useRef, useState, useEffect } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { GraduationCap, Code2, Award, Briefcase, HeartHandshake } from "lucide-react";

const stats = [
  {
    icon: GraduationCap,
    value: "BSIT",
    label: "Graduate",
    sublabel: "Pamantasan ng Cabuyao, 2026",
    color: "hsl(270 60% 60%)",
    bg: "hsl(270 60% 60% / 0.08)",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: Code2,
    value: "4+",
    label: "Major Systems",
    sublabel: "Built from scratch",
    color: "hsl(320 50% 65%)",
    bg: "hsl(320 50% 65% / 0.08)",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    icon: Award,
    value: "3",
    label: "Certifications",
    sublabel: "Google Skillshop",
    color: "hsl(340 55% 65%)",
    bg: "hsl(340 55% 65% / 0.08)",
    gradient: "from-red-400 to-rose-500",
  },
  {
    icon: Briefcase,
    value: "2",
    label: "Work Experiences",
    sublabel: "Industry exposure",
    color: "hsl(290 45% 60%)",
    bg: "hsl(290 45% 60% / 0.08)",
    gradient: "from-purple-500 to-indigo-600",
  },
  {
    icon: HeartHandshake,
    value: "20+",
    label: "Technologies",
    sublabel: "Languages & tools",
    color: "hsl(200 55% 60%)",
    bg: "hsl(200 55% 60% / 0.08)",
    gradient: "from-cyan-400 to-blue-500",
  },
];

function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const isNumeric = /^\d/.test(value);
  const numPart = parseInt(value);
  const suffix = value.replace(/^\d+/, "");
  const count = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView || !isNumeric) return;
    const controls = animate(count, numPart, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(String(Math.round(v))),
    });
    return controls.stop;
  }, [inView, numPart, isNumeric, count]);

  return (
    <span ref={ref} className="font-black" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        {isNumeric ? `${display}${suffix}` : value}
      </motion.span>
    </span>
  );
}

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(ellipse, hsl(270 60% 60%), transparent)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-primary/70 mb-3 font-medium">Milestones</p>
          <h2
            className="text-4xl md:text-5xl font-black"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            My <span className="gradient-text">Achievements</span>
          </h2>
          <div className="mt-4 mx-auto w-24 h-1 rounded-full" style={{ background: "linear-gradient(90deg, hsl(270 60% 60%), hsl(320 50% 65%))" }} />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map(({ icon: Icon, value, label, sublabel, color, bg, gradient }, i) => (
            <motion.div
              key={label}
              className="relative rounded-3xl border bg-card p-6 text-center card-lift overflow-hidden"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5, type: "spring" }}
              whileHover={{ boxShadow: `0 20px 60px ${color}30` }}
              data-testid={`achievement-${i}`}
            >
              {/* Top gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`} />

              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: bg }}
              >
                <Icon size={22} style={{ color }} />
              </div>

              <div className="text-3xl md:text-4xl mb-1" style={{ color }}>
                <AnimatedNumber value={value} />
              </div>
              <div className="font-bold text-sm mb-1">{label}</div>
              <div className="text-xs text-muted-foreground leading-tight">{sublabel}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
