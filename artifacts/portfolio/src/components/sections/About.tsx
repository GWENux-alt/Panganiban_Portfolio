import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Target, Lightbulb, Award, Download, MapPin, Phone, Mail } from "lucide-react";
import gwenPhoto from "@assets/GWEN_1782097772662.jpeg";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const timeline = [
  {
    year: "2021",
    title: "Started BSIT",
    desc: "Enrolled at Pamantasan ng Cabuyao, beginning my IT journey.",
    color: "hsl(270 60% 60%)",
  },
  {
    year: "2024",
    title: "Warehouse Staff — Lazada",
    desc: "Gained logistics and data management experience at Lazada E-Logistics Philippines.",
    color: "hsl(320 50% 65%)",
  },
  {
    year: "2026",
    title: "IT Intern — Pangan Law Office",
    desc: "Applied technical skills in real-world IT support and system maintenance.",
    color: "hsl(340 55% 65%)",
  },
  {
    year: "2026",
    title: "BSIT Graduate",
    desc: "Graduated with a Bachelor of Science in Information Technology.",
    color: "hsl(270 60% 60%)",
  },
];

const interests = [
  { icon: Heart, label: "UI/UX Design", color: "hsl(340 55% 65%)" },
  { icon: Lightbulb, label: "Innovation", color: "hsl(270 60% 60%)" },
  { icon: Target, label: "Problem Solving", color: "hsl(320 50% 65%)" },
  { icon: Award, label: "Tech Learning", color: "hsl(290 45% 60%)" },
];

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      className="font-black gradient-text"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
    >
      {inView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <CountUp target={target} suffix={suffix} />
        </motion.span>
      ) : "0"}
    </motion.span>
  );
}

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <span ref={ref}>
      {inView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
        >
          <AnimNum target={target} />{suffix}
        </motion.span>
      ) : `0${suffix}`}
    </span>
  );
}

function AnimNum({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.span
      ref={ref}
      initial={0}
      animate={inView ? target : 0}
      transition={{ duration: 2, ease: "easeOut" }}
    >
      {(v: number) => Math.round(v)}
    </motion.span>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute right-0 top-0 w-96 h-96 rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, hsl(270 60% 60%), transparent)" }}
        />
        <div
          className="absolute left-0 bottom-0 w-72 h-72 rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, hsl(320 50% 65%), transparent)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-primary/70 mb-3 font-medium">Who I Am</p>
          <h2
            className="text-4xl md:text-5xl font-black"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="mt-4 mx-auto w-24 h-1 rounded-full" style={{ background: "linear-gradient(90deg, hsl(270 60% 60%), hsl(320 50% 65%))" }} />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: photo + stats */}
          <motion.div
            className="relative"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="relative">
              {/* Decorative bg shape */}
              <div
                className="absolute -top-4 -left-4 w-full h-full rounded-3xl"
                style={{ background: "linear-gradient(135deg, hsl(270 60% 60% / 0.1), hsl(320 50% 65% / 0.1))" }}
              />
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5]" data-testid="about-photo">
                <img
                  src={gwenPhoto}
                  alt="Jezimiel Gwen T. Panganiban"
                  className="w-full h-full object-cover object-top"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, hsl(270 40% 15% / 0.5) 0%, transparent 60%)" }}
                />
              </div>

              {/* Info overlay */}
              <div className="absolute bottom-6 left-6 right-6 glass-card rounded-2xl p-4 border">
                <div className="flex flex-col gap-2">
                  {[
                    { icon: MapPin, text: "Sta. Rosa, Laguna, Philippines" },
                    { icon: Phone, text: "+63 976 253 5242" },
                    { icon: Mail, text: "panganibanjezimielgwen@gmail.com" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-xs text-foreground/80">
                      <Icon size={12} className="text-primary shrink-0" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Stat cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mt-6">
              {[
                { value: 4, suffix: "+", label: "Major Systems", color: "hsl(270 60% 60%)" },
                { value: 3, suffix: "", label: "Certifications", color: "hsl(320 50% 65%)" },
                { value: 5, suffix: "+", label: "Technologies", color: "hsl(340 55% 65%)" },
                { value: 2, suffix: "", label: "Internships", color: "hsl(290 45% 60%)" },
              ].map(({ value, suffix, label, color }) => (
                <div
                  key={label}
                  className="glass-card border rounded-2xl p-4 text-center card-lift"
                  data-testid={`about-stat-${label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="text-2xl font-black mb-1" style={{ color }}>
                    {value}{suffix}
                  </div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: bio + timeline + interests */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {/* Bio */}
            <motion.div variants={itemVariants}>
              <h3
                className="text-2xl font-bold mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                IT Graduate &amp; Aspiring Developer
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I'm <strong className="text-foreground">Jezimiel Gwen T. Panganiban</strong>, a Bachelor of
                  Science in Information Technology graduate from Pamantasan ng Cabuyao. My passion lies in
                  building elegant digital solutions that solve real-world problems.
                </p>
                <p>
                  With hands-on experience in both IT support and web development, I bridge the gap between
                  technical infrastructure and user-facing applications. I thrive in collaborative environments
                  and embrace challenges as opportunities to grow.
                </p>
                <p>
                  My career goal is to become a Full Stack Developer who contributes to meaningful projects
                  while continuously learning and adapting to emerging technologies.
                </p>
              </div>
            </motion.div>

            {/* Interests */}
            <motion.div variants={itemVariants}>
              <h4 className="text-sm tracking-widest uppercase text-muted-foreground mb-4 font-medium">Passions</h4>
              <div className="grid grid-cols-2 gap-3">
                {interests.map(({ icon: Icon, label, color }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border bg-card card-lift"
                    data-testid={`about-interest-${label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}20` }}>
                      <Icon size={16} style={{ color }} />
                    </div>
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div variants={itemVariants}>
              <h4 className="text-sm tracking-widest uppercase text-muted-foreground mb-6 font-medium">Journey</h4>
              <div className="relative">
                <div className="absolute left-3 top-2 bottom-0 w-px" style={{ background: "linear-gradient(180deg, hsl(270 60% 60%), hsl(320 50% 65%), transparent)" }} />
                <div className="space-y-6">
                  {timeline.map(({ year, title, desc, color }, i) => (
                    <motion.div
                      key={i}
                      className="flex gap-6 pl-8 relative"
                      variants={itemVariants}
                      data-testid={`about-timeline-${i}`}
                    >
                      <div
                        className="absolute left-0 top-1.5 w-6 h-6 rounded-full border-2 border-background flex items-center justify-center"
                        style={{ background: color }}
                      >
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                      <div>
                        <div className="text-xs font-mono mb-1" style={{ color }}>{year}</div>
                        <div className="font-semibold text-sm mb-1">{title}</div>
                        <div className="text-xs text-muted-foreground leading-relaxed">{desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Download CV */}
            <motion.div variants={itemVariants}>
              <motion.a
                href="#"
                download
                className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-semibold text-white"
                style={{
                  background: "linear-gradient(135deg, hsl(270 60% 60%), hsl(320 50% 65%))",
                  boxShadow: "0 8px 24px rgba(139,92,180,0.3)",
                }}
                whileHover={{ scale: 1.05, boxShadow: "0 12px 32px rgba(139,92,180,0.45)" }}
                whileTap={{ scale: 0.97 }}
                data-testid="about-download-cv"
              >
                <Download size={16} />
                Download Full CV
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
