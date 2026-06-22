import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, X, Code2, ChevronRight, Monitor } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Vigilare",
    subtitle: "Security & Surveillance System",
    category: "Full Stack",
    tags: ["React", "Node.js", "MongoDB"],
    color: "hsl(270 60% 60%)",
    bg: "hsl(270 60% 60% / 0.08)",
    gradient: "from-violet-500 to-purple-700",
    overview: "A comprehensive web-based security and surveillance management system designed to monitor, track, and manage security operations efficiently.",
    problem: "Organizations struggle with fragmented security systems, making it difficult to monitor multiple areas simultaneously and maintain security logs.",
    solution: "Vigilare provides a unified platform for real-time monitoring, alert management, and comprehensive security reporting in one intuitive interface.",
    features: ["Real-time monitoring dashboard", "Alert and incident management", "User role-based access control", "Comprehensive audit logs", "Report generation"],
    tech: ["React", "Node.js", "MongoDB", "Express.js", "Tailwind CSS"],
    achievements: "Successfully implemented for organizational security management with real-time capabilities.",
    emoji: "🛡️",
  },
  {
    id: 2,
    title: "Resort Management System",
    subtitle: "Web-Based Resort Operations",
    category: "Full Stack",
    tags: ["PHP", "MySQL", "Laravel"],
    color: "hsl(320 50% 65%)",
    bg: "hsl(320 50% 65% / 0.08)",
    gradient: "from-pink-500 to-rose-600",
    overview: "A complete web-based resort management system handling reservations, guest management, room availability, and billing operations.",
    problem: "Resort management required manual processes for bookings, guest tracking, and billing, leading to errors and inefficiencies.",
    solution: "Developed a fully integrated digital platform that streamlines the entire resort operation from guest check-in to checkout and billing.",
    features: ["Online reservation system", "Room availability management", "Guest profile tracking", "Billing and payment processing", "Reports and analytics"],
    tech: ["PHP", "Laravel", "MySQL", "Bootstrap", "JavaScript"],
    achievements: "Reduced booking errors by digitizing the reservation process and providing real-time availability updates.",
    emoji: "🏖️",
  },
  {
    id: 3,
    title: "Patient Records System",
    subtitle: "Healthcare Records Management",
    category: "Full Stack",
    tags: ["PHP", "MySQL", "Bootstrap"],
    color: "hsl(340 55% 65%)",
    bg: "hsl(340 55% 65% / 0.08)",
    gradient: "from-red-400 to-rose-600",
    overview: "A secure and efficient patient records management system built for healthcare facilities to maintain digital medical records.",
    problem: "Healthcare providers maintained paper-based patient records, causing delays in record retrieval and increasing risk of data loss.",
    solution: "Created a digital records management system ensuring secure, organized, and instantly accessible patient information for healthcare professionals.",
    features: ["Patient registration and profiles", "Medical history tracking", "Appointment scheduling", "Prescription management", "Secure data storage"],
    tech: ["PHP", "MySQL", "Bootstrap", "JavaScript", "TCPDF"],
    achievements: "Improved patient data accessibility and reduced administrative time significantly in healthcare operations.",
    emoji: "🏥",
  },
  {
    id: 4,
    title: "Cashify",
    subtitle: "Digital Payment & Finance App",
    category: "Mobile/Web",
    tags: ["React", "Firebase", "Node.js"],
    color: "hsl(290 45% 60%)",
    bg: "hsl(290 45% 60% / 0.08)",
    gradient: "from-purple-500 to-indigo-600",
    overview: "A modern digital payment and personal finance management application that simplifies money transfers, expense tracking, and financial planning.",
    problem: "Users lacked a unified platform to manage digital payments, track expenses, and plan personal finances in one place.",
    solution: "Cashify delivers a seamless financial management experience with real-time transaction tracking, budget planning, and secure payment processing.",
    features: ["Digital wallet management", "Real-time expense tracking", "Budget planning tools", "Transaction history", "Financial insights dashboard"],
    tech: ["React", "Firebase", "Node.js", "Express.js", "Chart.js"],
    achievements: "Designed with a focus on user experience, enabling users to manage finances with ease and clarity.",
    emoji: "💰",
  },
];

const filters = ["All", "Full Stack", "Mobile/Web"];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent, hsl(270 40% 97% / 0.5) 50%, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-primary/70 mb-3 font-medium">My Work</p>
          <h2
            className="text-4xl md:text-5xl font-black"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="mt-4 mx-auto w-24 h-1 rounded-full" style={{ background: "linear-gradient(90deg, hsl(270 60% 60%), hsl(320 50% 65%))" }} />
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            A selection of projects demonstrating my full-stack development capabilities.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          {filters.map((f) => (
            <motion.button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === f
                  ? "text-white shadow-lg"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
              style={
                activeFilter === f
                  ? { background: "linear-gradient(135deg, hsl(270 60% 60%), hsl(320 50% 65%))" }
                  : {}
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-testid={`project-filter-${f.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {f}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-3xl border bg-card overflow-hidden card-lift cursor-pointer group shadow-sm"
                onClick={() => setSelectedProject(project)}
                whileHover={{ boxShadow: `0 20px 60px ${project.color}20` }}
                data-testid={`project-card-${project.id}`}
              >
                {/* Card visual */}
                <div
                  className={`relative h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
                >
                  <motion.div
                    className="text-7xl"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {project.emoji}
                  </motion.div>
                  {/* Decorative shapes */}
                  <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/10" />
                  <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-white/5" />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-sm text-xs font-medium text-white">
                    {project.category}
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <motion.div
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium"
                      initial={{ y: 10, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                    >
                      <Monitor size={16} /> View Details
                    </motion.div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{project.subtitle}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                    {project.overview}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium"
                        style={{ background: project.bg, color: project.color }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      className="flex items-center gap-1.5 text-xs font-medium transition-colors"
                      style={{ color: project.color }}
                      onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }}
                    >
                      View Details <ChevronRight size={12} />
                    </button>
                    <a
                      href="#"
                      className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={12} /> GitHub
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={12} /> Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            />
            <motion.div
              className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-card border shadow-2xl"
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", bounce: 0.3 }}
            >
              {/* Modal header visual */}
              <div className={`relative h-48 bg-gradient-to-br ${selectedProject.gradient} flex items-center justify-center`}>
                <div className="text-6xl">{selectedProject.emoji}</div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/40 transition-colors"
                  data-testid="project-modal-close"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-8">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="text-2xl font-black" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {selectedProject.title}
                  </h3>
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{ background: selectedProject.bg, color: selectedProject.color }}>
                    {selectedProject.category}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mb-6">{selectedProject.subtitle}</p>

                {[
                  { label: "Overview", content: selectedProject.overview },
                  { label: "Problem", content: selectedProject.problem },
                  { label: "Solution", content: selectedProject.solution },
                ].map(({ label, content }) => (
                  <div key={label} className="mb-5">
                    <h4 className="text-xs tracking-widest uppercase font-medium text-muted-foreground mb-2">{label}</h4>
                    <p className="text-sm text-foreground/80 leading-relaxed">{content}</p>
                  </div>
                ))}

                <div className="mb-5">
                  <h4 className="text-xs tracking-widest uppercase font-medium text-muted-foreground mb-3">Key Features</h4>
                  <div className="space-y-2">
                    {selectedProject.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: selectedProject.color }} />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-xs tracking-widest uppercase font-medium text-muted-foreground mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <span key={t} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                        style={{ background: selectedProject.bg, color: selectedProject.color }}>
                        <Code2 size={10} /> {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <a href="#"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white"
                    style={{ background: `linear-gradient(135deg, ${selectedProject.color}, hsl(320 50% 65%))` }}>
                    <Github size={14} /> GitHub
                  </a>
                  <a href="#"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border border-border hover:bg-muted transition-colors">
                    <ExternalLink size={14} /> Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
