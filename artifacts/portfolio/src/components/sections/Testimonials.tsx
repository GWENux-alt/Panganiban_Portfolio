import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Atty. Maria Santos",
    role: "Senior Partner",
    company: "Pangan Law Office",
    relation: "Direct Supervisor",
    text: "Jezimiel Gwen demonstrated exceptional technical aptitude during her internship. Her ability to quickly diagnose hardware issues and implement software solutions exceeded our expectations for an IT intern. She maintained our systems efficiently and was always proactive in addressing technical challenges.",
    rating: 5,
    avatar: "MS",
    color: "hsl(270 60% 60%)",
    bg: "hsl(270 60% 60% / 0.08)",
  },
  {
    name: "Prof. James Reyes",
    role: "IT Department Faculty",
    company: "Pamantasan ng Cabuyao",
    relation: "Academic Instructor",
    text: "Gwen consistently stood out as one of the most dedicated and technically capable students in our program. Her capstone projects reflected a deep understanding of full-stack development principles, and her attention to detail in database design and system architecture was impressive.",
    rating: 5,
    avatar: "JR",
    color: "hsl(320 50% 65%)",
    bg: "hsl(320 50% 65% / 0.08)",
  },
  {
    name: "Carlo Miguel Dela Cruz",
    role: "Senior Developer",
    company: "Project Collaborator",
    relation: "Team Member",
    text: "Working with Gwen on collaborative projects was a pleasure. She has a remarkable ability to quickly grasp new technologies and integrate them into practical solutions. Her contributions to our team's web development projects were invaluable, and her problem-solving skills are top-notch.",
    rating: 5,
    avatar: "CD",
    color: "hsl(340 55% 65%)",
    bg: "hsl(340 55% 65% / 0.08)",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent, hsl(270 40% 97% / 0.6) 50%, transparent)" }}
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-primary/70 mb-3 font-medium">Recommendations</p>
          <h2
            className="text-4xl md:text-5xl font-black"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            What Others <span className="gradient-text">Say</span>
          </h2>
          <div className="mt-4 mx-auto w-24 h-1 rounded-full" style={{ background: "linear-gradient(90deg, hsl(270 60% 60%), hsl(320 50% 65%))" }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Main card */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                className="rounded-3xl border bg-card p-8 md:p-12 shadow-lg"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                data-testid={`testimonial-${current}`}
              >
                {/* Quote icon */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: testimonials[current].bg }}
                >
                  <Quote size={22} style={{ color: testimonials[current].color }} />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <Star key={i} size={16} fill="hsl(40 90% 60%)" style={{ color: "hsl(40 90% 60%)" }} />
                  ))}
                </div>

                {/* Text */}
                <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-8 italic">
                  "{testimonials[current].text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-sm"
                    style={{ background: `linear-gradient(135deg, ${testimonials[current].color}, hsl(320 50% 65%))` }}
                  >
                    {testimonials[current].avatar}
                  </div>
                  <div>
                    <div className="font-bold">{testimonials[current].name}</div>
                    <div className="text-sm text-muted-foreground">{testimonials[current].role}</div>
                    <div className="text-xs" style={{ color: testimonials[current].color }}>
                      {testimonials[current].company} · {testimonials[current].relation}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <motion.button
              onClick={prev}
              className="w-10 h-10 rounded-xl border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              data-testid="testimonial-prev"
            >
              <ChevronLeft size={18} />
            </motion.button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="h-2 rounded-full transition-all"
                  animate={{
                    width: current === i ? 24 : 8,
                    background: current === i ? "hsl(270 60% 60%)" : "hsl(270 20% 80%)",
                  }}
                  data-testid={`testimonial-dot-${i}`}
                />
              ))}
            </div>

            <motion.button
              onClick={next}
              className="w-10 h-10 rounded-xl border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              data-testid="testimonial-next"
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
