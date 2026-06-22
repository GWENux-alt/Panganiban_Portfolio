import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Send, Check, Loader2 } from "lucide-react";

const contactInfo = [
  { icon: Mail, label: "Email", value: "panganibanjezimielgwen@gmail.com", href: "mailto:panganibanjezimielgwen@gmail.com", color: "hsl(270 60% 60%)" },
  { icon: Phone, label: "Phone", value: "+63 976 253 5242", href: "tel:+639762535242", color: "hsl(320 50% 65%)" },
  { icon: MapPin, label: "Location", value: "Sta. Rosa, Laguna, Philippines", href: "#", color: "hsl(340 55% 65%)" },
];

type FormState = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formState, setFormState] = useState<FormState>("idle");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email address";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.trim().length < 20) e.message = "Message must be at least 20 characters";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setFormState("loading");

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1800));
    setFormState("success");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    setTimeout(() => setFormState("idle"), 4000);
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => { const n = { ...er }; delete n[field]; return n; });
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl border bg-background text-sm transition-all outline-none focus:ring-2 focus:ring-primary/30 ${
      errors[field] ? "border-destructive" : "border-border hover:border-primary/50 focus:border-primary"
    }`;

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(ellipse, hsl(270 60% 60%), transparent)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-primary/70 mb-3 font-medium">Get In Touch</p>
          <h2
            className="text-4xl md:text-5xl font-black"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Contact <span className="gradient-text">Me</span>
          </h2>
          <div className="mt-4 mx-auto w-24 h-1 rounded-full" style={{ background: "linear-gradient(90deg, hsl(270 60% 60%), hsl(320 50% 65%))" }} />
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            Ready to bring your ideas to life? I'd love to hear about your projects and opportunities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left info */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Let's Connect
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Whether you have a project in mind, a job opportunity, or just want to say hello — my inbox
                is always open. I'll get back to you as soon as possible.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map(({ icon: Icon, label, value, href, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 p-4 rounded-2xl border bg-card card-lift group"
                  whileHover={{ x: 4, boxShadow: `0 8px 24px ${color}20` }}
                  data-testid={`contact-info-${label.toLowerCase()}`}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${color}15` }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">{label}</div>
                    <div className="text-sm font-medium break-all">{value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Availability indicator */}
            <div className="p-4 rounded-2xl border bg-card">
              <div className="flex items-center gap-3 mb-2">
                <motion.div
                  className="w-2.5 h-2.5 rounded-full bg-green-400"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm font-medium">Currently Available</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Open to full-time positions, internships, and freelance opportunities in IT and Web Development.
              </p>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border bg-card p-8 shadow-sm"
              noValidate
            >
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Full Name *</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange("name")}
                    className={inputClass("name")}
                    data-testid="contact-name"
                  />
                  {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Email Address *</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange("email")}
                    className={inputClass("email")}
                    data-testid="contact-email"
                  />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Phone (optional)</label>
                  <input
                    type="tel"
                    placeholder="+63 9XX XXX XXXX"
                    value={form.phone}
                    onChange={handleChange("phone")}
                    className={inputClass("phone")}
                    data-testid="contact-phone"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Subject *</label>
                  <select
                    value={form.subject}
                    onChange={handleChange("subject")}
                    className={inputClass("subject")}
                    data-testid="contact-subject"
                  >
                    <option value="">Select a subject</option>
                    <option value="job-opportunity">Job Opportunity</option>
                    <option value="freelance-project">Freelance Project</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="internship">Internship</option>
                    <option value="general-inquiry">General Inquiry</option>
                  </select>
                  {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject}</p>}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Message *</label>
                <textarea
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  value={form.message}
                  onChange={handleChange("message")}
                  className={`${inputClass("message")} resize-none`}
                  data-testid="contact-message"
                />
                <div className="flex justify-between mt-1">
                  {errors.message
                    ? <p className="text-xs text-destructive">{errors.message}</p>
                    : <span />}
                  <span className="text-xs text-muted-foreground">{form.message.length}/500</span>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={formState === "loading" || formState === "success"}
                className="w-full py-3.5 rounded-2xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-80"
                style={{
                  background: formState === "success"
                    ? "hsl(140 60% 50%)"
                    : "linear-gradient(135deg, hsl(270 60% 60%), hsl(320 50% 65%))",
                  boxShadow: "0 8px 24px rgba(139,92,180,0.3)",
                }}
                whileHover={formState === "idle" ? { scale: 1.02, boxShadow: "0 12px 32px rgba(139,92,180,0.45)" } : {}}
                whileTap={formState === "idle" ? { scale: 0.98 } : {}}
                data-testid="contact-submit"
              >
                {formState === "loading" && <Loader2 size={16} className="animate-spin" />}
                {formState === "success" && <Check size={16} />}
                {formState === "idle" && <Send size={16} />}
                {formState === "loading" && "Sending..."}
                {formState === "success" && "Message Sent!"}
                {formState === "idle" && "Send Message"}
                {formState === "error" && "Try Again"}
              </motion.button>

              {formState === "success" && (
                <motion.p
                  className="text-center text-sm text-green-600 dark:text-green-400 mt-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Thank you! I'll get back to you shortly.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
