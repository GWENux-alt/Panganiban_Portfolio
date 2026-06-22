import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, MapPin, Calendar, CheckCircle2 } from "lucide-react";

const experiences = [
  {
    role: "IT Support Intern / Technical Staff",
    company: "Pangan Law Office",
    period: "January 2026 – April 2026",
    location: "Philippines",
    type: "Internship",
    color: "hsl(270 60% 60%)",
    bg: "hsl(270 60% 60% / 0.08)",
    responsibilities: [
      "Hardware troubleshooting and maintenance",
      "Software installation, configuration, and troubleshooting",
      "Technical support for office staff and management",
      "Database maintenance and data integrity checks",
      "System testing and quality assurance",
      "Website content and structural assistance",
      "Technical documentation and reporting",
      "Data management and secure file handling",
      "Security compliance and policy enforcement",
    ],
  },
  {
    role: "Warehouse Staff",
    company: "Lazada E-Logistics Philippines",
    period: "June 2024 – October 2024",
    location: "Philippines",
    type: "Part-time",
    color: "hsl(320 50% 65%)",
    bg: "hsl(320 50% 65% / 0.08)",
    responsibilities: [
      "Data encoding and database entry management",
      "Warehouse Management System (WMS) operations",
      "Shipment tracking and status monitoring",
      "Inventory monitoring and stock reconciliation",
      "Logistics support and coordination",
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
const itemVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-0 w-80 h-80 rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, hsl(320 50% 65%), transparent)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-primary/70 mb-3 font-medium">Work History</p>
          <h2
            className="text-4xl md:text-5xl font-black"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            My <span className="gradient-text">Experience</span>
          </h2>
          <div className="mt-4 mx-auto w-24 h-1 rounded-full" style={{ background: "linear-gradient(90deg, hsl(270 60% 60%), hsl(320 50% 65%))" }} />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: "linear-gradient(180deg, hsl(270 60% 60% / 0.5), hsl(320 50% 65% / 0.5), transparent)" }} />

          <motion.div
            className="space-y-12"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                className={`relative flex flex-col md:flex-row gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                variants={itemVariants}
                data-testid={`experience-${i}`}
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 z-10">
                  <motion.div
                    className="w-10 h-10 rounded-full border-4 border-background flex items-center justify-center"
                    style={{ background: exp.color, boxShadow: `0 0 20px ${exp.color}50` }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <Briefcase size={16} className="text-white" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className={`flex-1 ${i % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                  <motion.div
                    className="rounded-3xl border bg-card p-6 card-lift shadow-sm"
                    whileHover={{ boxShadow: `0 16px 48px ${exp.color}20` }}
                  >
                    {/* Header */}
                    <div className="flex flex-wrap items-start gap-3 mb-4">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center"
                        style={{ background: exp.bg }}
                      >
                        <Briefcase size={20} style={{ color: exp.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-bold text-base">{exp.role}</h3>
                          <span
                            className="px-2 py-0.5 rounded-full text-xs font-medium"
                            style={{ background: exp.bg, color: exp.color }}
                          >
                            {exp.type}
                          </span>
                        </div>
                        <p className="font-semibold text-sm" style={{ color: exp.color }}>{exp.company}</p>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-4 mb-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin size={12} />
                        {exp.location}
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <div className="space-y-2">
                      {exp.responsibilities.map((r, ri) => (
                        <div key={ri} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 size={14} className="mt-0.5 shrink-0" style={{ color: exp.color }} />
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
