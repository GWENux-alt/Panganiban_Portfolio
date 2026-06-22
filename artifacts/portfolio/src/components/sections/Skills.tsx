import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const skillCategories = [
  {
    category: "Programming Languages",
    color: "hsl(270 60% 60%)",
    bg: "hsl(270 60% 60% / 0.08)",
    icon: "💻",
    skills: [
      { name: "JavaScript", level: 80 },
      { name: "Python", level: 72 },
      { name: "Java", level: 70 },
      { name: "PHP", level: 75 },
      { name: "C++", level: 65 },
    ],
  },
  {
    category: "Frontend Development",
    color: "hsl(320 50% 65%)",
    bg: "hsl(320 50% 65% / 0.08)",
    icon: "🎨",
    skills: [
      { name: "HTML/CSS", level: 90 },
      { name: "React", level: 78 },
      { name: "Next.js", level: 70 },
      { name: "Tailwind CSS", level: 82 },
    ],
  },
  {
    category: "Backend Development",
    color: "hsl(290 45% 60%)",
    bg: "hsl(290 45% 60% / 0.08)",
    icon: "⚙️",
    skills: [
      { name: "Node.js", level: 72 },
      { name: "Express.js", level: 70 },
      { name: "Laravel", level: 65 },
      { name: "PHP Backend", level: 73 },
    ],
  },
  {
    category: "Database",
    color: "hsl(340 55% 65%)",
    bg: "hsl(340 55% 65% / 0.08)",
    icon: "🗄️",
    skills: [
      { name: "MySQL", level: 78 },
      { name: "MongoDB", level: 68 },
      { name: "Firebase", level: 65 },
    ],
  },
  {
    category: "Tools & Platforms",
    color: "hsl(250 50% 65%)",
    bg: "hsl(250 50% 65% / 0.08)",
    icon: "🔧",
    skills: [
      { name: "Git / GitHub", level: 80 },
      { name: "VS Code", level: 90 },
      { name: "Figma", level: 68 },
      { name: "Postman", level: 72 },
      { name: "Microsoft Office", level: 85 },
    ],
  },
  {
    category: "IT & Support Skills",
    color: "hsl(200 55% 60%)",
    bg: "hsl(200 55% 60% / 0.08)",
    icon: "🛠️",
    skills: [
      { name: "Troubleshooting", level: 88 },
      { name: "Networking", level: 75 },
      { name: "Technical Support", level: 85 },
      { name: "System Analysis", level: 78 },
      { name: "Problem Solving", level: 90 },
    ],
  },
];

interface SkillBarProps {
  name: string;
  level: number;
  color: string;
  inView: boolean;
  delay: number;
}

function SkillBar({ name, level, color, inView, delay }: SkillBarProps) {
  return (
    <div data-testid={`skill-${name.toLowerCase().replace(/[\s/]+/g, '-')}`}>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-xs font-mono text-muted-foreground">{level}%</span>
      </div>
      <div className="skill-bar">
        <motion.div
          className="skill-bar-fill"
          style={{ background: `linear-gradient(90deg, ${color}, ${color.replace('60%)', '75%)')})` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay }}
        />
      </div>
    </div>
  );
}

const softSkills = [
  "Communication", "Teamwork", "Adaptability", "Critical Thinking",
  "Time Management", "Leadership", "Creativity", "Attention to Detail",
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, transparent, hsl(270 40% 97% / 0.6) 50%, transparent)",
        }}
      />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, hsl(270 60% 60%), transparent)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-primary/70 mb-3 font-medium">What I Know</p>
          <h2
            className="text-4xl md:text-5xl font-black"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="mt-4 mx-auto w-24 h-1 rounded-full" style={{ background: "linear-gradient(90deg, hsl(270 60% 60%), hsl(320 50% 65%))" }} />
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            A diverse toolkit built through academic learning, hands-on projects, and real-world experience.
          </p>
        </motion.div>

        {/* Skill category grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {skillCategories.map((cat) => (
            <motion.div
              key={cat.category}
              variants={itemVariants}
              className="rounded-3xl border bg-card p-6 card-lift cursor-default"
              style={{
                boxShadow: hoveredCat === cat.category ? `0 16px 48px ${cat.color}25` : undefined,
              }}
              onMouseEnter={() => setHoveredCat(cat.category)}
              onMouseLeave={() => setHoveredCat(null)}
              data-testid={`skill-category-${cat.category.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: cat.bg }}
                >
                  {cat.icon}
                </div>
                <h3 className="font-bold text-sm">{cat.category}</h3>
              </div>

              {/* Skill bars */}
              <div className="space-y-4">
                {cat.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    {...skill}
                    color={cat.color}
                    inView={inView}
                    delay={0.2 + si * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Soft skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-center text-sm tracking-widest uppercase text-muted-foreground mb-6 font-medium">
            Soft Skills
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {softSkills.map((skill, i) => (
              <motion.span
                key={skill}
                className="px-4 py-2 rounded-full text-sm font-medium border transition-all cursor-default"
                style={{ borderColor: "hsl(270 60% 60% / 0.2)" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.06, type: "spring" }}
                whileHover={{
                  scale: 1.08,
                  background: "linear-gradient(135deg, hsl(270 60% 60%), hsl(320 50% 65%))",
                  color: "white",
                  borderColor: "transparent",
                }}
                data-testid={`soft-skill-${skill.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
