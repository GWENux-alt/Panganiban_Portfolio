import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Github, Linkedin, Facebook, Mail, ChevronDown, Sparkles, Code2, Globe, Cpu } from "lucide-react";
import gwenPhoto from "@assets/GWEN_1782097772662.jpeg";

const roles = [
  "Full Stack Developer",
  "Web Developer",
  "IT Support Specialist",
  "Problem Solver",
  "Tech Enthusiast",
];

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com", color: "hover:text-foreground" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com", color: "hover:text-blue-400" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com", color: "hover:text-blue-500" },
  { icon: Mail, label: "Email", href: "mailto:panganibanjezimielgwen@gmail.com", color: "hover:text-rose-400" },
];

const floatingIcons = [
  { Icon: Code2, size: 20, x: "10%", y: "20%", delay: 0 },
  { Icon: Globe, size: 18, x: "85%", y: "15%", delay: 0.5 },
  { Icon: Cpu, size: 22, x: "8%", y: "70%", delay: 1 },
  { Icon: Sparkles, size: 16, x: "88%", y: "65%", delay: 1.5 },
  { Icon: Code2, size: 14, x: "75%", y: "85%", delay: 2 },
];

function TypingText({ roles }: { roles: string[] }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex, roles]);

  return (
    <span className="inline-flex items-center gap-1">
      <span
        className="shimmer-text font-bold"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {displayed}
      </span>
      <span
        className="inline-block w-0.5 h-7 md:h-9 animate-pulse ml-0.5"
        style={{
          background: "linear-gradient(180deg, hsl(270 60% 60%), hsl(320 50% 65%))",
          borderRadius: 2,
        }}
      />
    </span>
  );
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    interface Particle {
      x: number; y: number; vx: number; vy: number;
      size: number; alpha: number; color: string;
    }

    const colors = [
      "rgba(139,92,180,",
      "rgba(219,112,147,",
      "rgba(180,130,210,",
    ];

    const particles: Particle[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
      });
      // Connect nearby particles
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(139,92,180,${0.06 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      raf = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", handleResize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 20);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 20);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, hsl(300 30% 98%) 0%, hsl(270 40% 96%) 50%, hsl(320 30% 97%) 100%)",
      }}
    >
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, hsl(270 60% 70%) 0%, transparent 70%)",
            x: springX,
            y: springY,
          }}
        />
        <motion.div
          className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, hsl(320 50% 70%) 0%, transparent 70%)",
            x: springX,
            y: springY,
          }}
        />
        <div
          className="absolute top-[20%] left-[50%] w-[300px] h-[300px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, hsl(340 55% 70%) 0%, transparent 70%)",
          }}
        />
        <ParticleCanvas />
      </div>

      {/* Floating tech icons */}
      {floatingIcons.map(({ Icon, size, x, y, delay }, i) => (
        <motion.div
          key={i}
          className="absolute hidden md:flex items-center justify-center w-10 h-10 rounded-xl glass-card border pointer-events-none"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 + delay, type: "spring" }}
        >
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay }}
          >
            <Icon size={size} className="text-primary/70" />
          </motion.div>
        </motion.div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 text-sm"
              style={{
                background: "linear-gradient(135deg, hsl(270 60% 60% / 0.08), hsl(320 50% 65% / 0.08))",
                borderColor: "hsl(270 60% 60% / 0.2)",
                color: "hsl(270 55% 50%)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              data-testid="hero-badge"
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-green-400"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              Available for Opportunities
            </motion.div>

            {/* Hello */}
            <motion.p
              className="text-lg text-muted-foreground mb-2 font-medium"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              Hello, I'm
            </motion.p>

            {/* Name */}
            <motion.h1
              className="text-4xl md:text-5xl xl:text-6xl font-black mb-3 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 80 }}
              data-testid="hero-name"
            >
              <span className="gradient-text">Jezimiel Gwen</span>
              <br />
              <span className="text-foreground text-3xl md:text-4xl xl:text-5xl">T. Panganiban</span>
            </motion.h1>

            {/* Role */}
            <motion.div
              className="flex items-center gap-3 mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="h-[2px] w-8 rounded-full bg-gradient-to-r from-primary to-accent" />
              <div className="text-xl md:text-2xl text-foreground/80 h-9 md:h-10 flex items-center" data-testid="hero-role">
                <TypingText roles={roles} />
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              data-testid="hero-description"
            >
              I am a passionate Information Technology graduate dedicated to building innovative digital
              solutions through web development, technical support, and continuous learning. I enjoy
              transforming ideas into practical systems that improve efficiency and user experience.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-3 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                onClick={scrollToProjects}
                className="px-6 py-3 rounded-2xl text-sm font-semibold text-white shadow-lg transition-all"
                style={{
                  background: "linear-gradient(135deg, hsl(270 60% 60%), hsl(320 50% 65%))",
                  boxShadow: "0 8px 24px rgba(139,92,180,0.35)",
                }}
                whileHover={{ scale: 1.05, boxShadow: "0 12px 32px rgba(139,92,180,0.5)" }}
                whileTap={{ scale: 0.97 }}
                data-testid="hero-view-projects"
              >
                View Projects
              </motion.button>

              <motion.button
                onClick={scrollToContact}
                className="px-6 py-3 rounded-2xl text-sm font-semibold border-2 transition-all"
                style={{
                  borderColor: "hsl(270 60% 60%)",
                  color: "hsl(270 60% 55%)",
                  background: "transparent",
                }}
                whileHover={{ scale: 1.05, background: "hsl(270 60% 60% / 0.08)" }}
                whileTap={{ scale: 0.97 }}
                data-testid="hero-hire-me"
              >
                Hire Me
              </motion.button>

              <motion.a
                href="#"
                download
                className="px-6 py-3 rounded-2xl text-sm font-semibold bg-muted text-foreground/80 hover:bg-muted/80 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                data-testid="hero-download-resume"
              >
                Download CV
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <span className="text-xs text-muted-foreground tracking-widest uppercase">Connect</span>
              <div className="h-px w-8 bg-border" />
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, label, href, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-9 h-9 rounded-xl flex items-center justify-center border border-border bg-background/60 text-muted-foreground transition-all ${color}`}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    data-testid={`hero-social-${label.toLowerCase()}`}
                  >
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Photo + floating stats */}
          <div className="relative flex justify-center">
            {/* Background glow */}
            <div
              className="absolute inset-0 rounded-full opacity-30 blur-3xl"
              style={{
                background: "radial-gradient(circle, hsl(270 60% 70%) 0%, hsl(320 50% 70%) 100%)",
                transform: "scale(0.85)",
              }}
            />

            {/* Photo container */}
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 80 }}
              style={{ x: springX, y: springY }}
            >
              {/* Decorative ring */}
              <motion.div
                className="absolute inset-[-16px] rounded-full border-2 border-dashed opacity-30"
                style={{ borderColor: "hsl(270 60% 60%)" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-[-32px] rounded-full border border-dashed opacity-15"
                style={{ borderColor: "hsl(320 50% 65%)" }}
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />

              {/* Photo */}
              <div
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden animate-pulse-glow"
                style={{
                  border: "4px solid transparent",
                  background: "linear-gradient(white, white) padding-box, linear-gradient(135deg, hsl(270 60% 60%), hsl(320 50% 65%)) border-box",
                }}
                data-testid="hero-photo"
              >
                <img
                  src={gwenPhoto}
                  alt="Jezimiel Gwen T. Panganiban"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Floating stat cards */}
              <motion.div
                className="absolute -left-12 top-8 glass-card border rounded-2xl px-4 py-3 shadow-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 }}
                data-testid="hero-stat-projects"
              >
                <div className="text-xl font-black gradient-text">4+</div>
                <div className="text-xs text-muted-foreground">Major Projects</div>
              </motion.div>

              <motion.div
                className="absolute -right-8 top-8 glass-card border rounded-2xl px-4 py-3 shadow-lg"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                data-testid="hero-stat-certs"
              >
                <div className="text-xl font-black gradient-text">3</div>
                <div className="text-xs text-muted-foreground">Certifications</div>
              </motion.div>

              <motion.div
                className="absolute -left-8 bottom-8 glass-card border rounded-2xl px-4 py-3 shadow-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 }}
                data-testid="hero-stat-exp"
              >
                <div className="text-xl font-black gradient-text">IT</div>
                <div className="text-xs text-muted-foreground">Graduate</div>
              </motion.div>

              <motion.div
                className="absolute -right-10 bottom-12 glass-card border rounded-2xl px-4 py-3 shadow-lg"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 }}
                data-testid="hero-stat-skills"
              >
                <div className="text-xl font-black gradient-text">20+</div>
                <div className="text-xs text-muted-foreground">Tech Skills</div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          data-testid="hero-scroll-indicator"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
