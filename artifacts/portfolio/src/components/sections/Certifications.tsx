import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, ExternalLink, CheckCircle2 } from "lucide-react";

const certifications = [
  {
    title: "Google Analytics Certification",
    issuer: "Google",
    platform: "Google Skillshop",
    year: "2025",
    color: "hsl(270 60% 60%)",
    bg: "hsl(270 60% 60% / 0.08)",
    description: "Certified in Google Analytics fundamentals, data analysis, and reporting to measure and optimize digital performance.",
    skills: ["Web Analytics", "Data Analysis", "Reporting", "KPI Tracking"],
    logo: "G",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    title: "Google AI-Powered Shopping Ads",
    issuer: "Google",
    platform: "Google Skillshop",
    year: "2025",
    color: "hsl(320 50% 65%)",
    bg: "hsl(320 50% 65% / 0.08)",
    description: "Certified in leveraging AI-driven tools for Shopping Ads campaigns, product optimization, and conversion strategies.",
    skills: ["AI Marketing", "Shopping Campaigns", "Conversion Optimization", "Product Feed"],
    logo: "G",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    title: "Google Ads Apps Certification",
    issuer: "Google",
    platform: "Google Skillshop",
    year: "2025",
    color: "hsl(340 55% 65%)",
    bg: "hsl(340 55% 65% / 0.08)",
    description: "Certified in Google App campaigns, mobile app promotion strategies, and performance measurement for app growth.",
    skills: ["App Campaigns", "Mobile Marketing", "App Analytics", "User Acquisition"],
    logo: "G",
    gradient: "from-red-400 to-rose-500",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent, hsl(270 40% 97% / 0.6) 50%, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-primary/70 mb-3 font-medium">Credentials</p>
          <h2
            className="text-4xl md:text-5xl font-black"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            My <span className="gradient-text">Certifications</span>
          </h2>
          <div className="mt-4 mx-auto w-24 h-1 rounded-full" style={{ background: "linear-gradient(90deg, hsl(270 60% 60%), hsl(320 50% 65%))" }} />
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            Industry-recognized certifications demonstrating expertise in digital marketing and analytics.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              className="rounded-3xl border bg-card overflow-hidden card-lift shadow-sm"
              variants={itemVariants}
              whileHover={{ boxShadow: `0 20px 60px ${cert.color}25` }}
              data-testid={`certification-${i}`}
            >
              {/* Top gradient bar */}
              <div className={`relative h-32 bg-gradient-to-br ${cert.gradient} flex items-center justify-center overflow-hidden`}>
                {/* Decorative circles */}
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white/10" />
                <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-white/5" />

                <motion.div
                  className="relative z-10 flex flex-col items-center gap-2"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Award size={28} className="text-white" />
                  </div>
                </motion.div>

                {/* Year badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/20 backdrop-blur-sm text-xs font-medium text-white">
                  {cert.year}
                </div>
              </div>

              <div className="p-6">
                {/* Issuer */}
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-black text-white"
                    style={{ background: cert.color }}
                  >
                    {cert.logo}
                  </div>
                  <span className="text-xs text-muted-foreground">{cert.platform}</span>
                  <CheckCircle2 size={12} style={{ color: cert.color }} className="ml-auto" />
                </div>

                <h3 className="font-bold text-base mb-2 leading-tight">{cert.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">{cert.description}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md text-xs font-medium"
                      style={{ background: cert.bg, color: cert.color }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <motion.a
                  href="#"
                  className="flex items-center gap-2 text-xs font-medium transition-colors"
                  style={{ color: cert.color }}
                  whileHover={{ x: 3 }}
                >
                  View Certificate <ExternalLink size={10} />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
