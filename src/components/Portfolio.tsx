import { lazy, Suspense, useEffect, useState, type FormEvent, type ReactNode } from "react";
import { ClientOnly } from "@tanstack/react-router";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Award,
  Check,
  Code2,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Rocket,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { makeEmailDraft, navigation, projects, skills } from "@/lib/portfolio";
import { BootSequence, SpaceEffects } from "./SpaceEffects";

const Universe = lazy(() => import("./Universe"));
const titles = [
  "AI Engineer",
  "Full Stack Developer",
  "ML Engineer",
  "Backend Developer",
  "Creator",
  "Builder",
];

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 180, damping: 22 });
  const rotateY = useSpring(ry, { stiffness: 180, damping: 22 });
  return (
    <motion.article
      className={`tilt-card ${className}`}
      style={{ rotateX, rotateY }}
      onPointerMove={(e) => {
        if (reduced || e.pointerType === "touch") return;
        const box = e.currentTarget.getBoundingClientRect();
        rx.set((-(e.clientY - box.top - box.height / 2) / box.height) * 7);
        ry.set(((e.clientX - box.left - box.width / 2) / box.width) * 7);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      whileHover={reduced ? {} : { y: -5 }}
    >
      {children}
    </motion.article>
  );
}

function Navigation() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const scroll = () => {
      setScrolled(window.scrollY > 40);
      const current = navigation
        .filter((n) => {
          const el = document.getElementById(n.id);
          return el && el.getBoundingClientRect().top < window.innerHeight * 0.4;
        })
        .at(-1);
      if (current) setActive(current.id);
    };
    window.addEventListener("scroll", scroll, { passive: true });
    scroll();
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  return (
    <header className={`nav-shell ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <a className="brand" href="#home" aria-label="Hritik home">
          <span className="brand-mark">
            <Sparkles size={17} strokeWidth={1.4} />
          </span>
          hritik<span className="brand-dot">.</span>
        </a>
        <nav className={`nav-links ${open ? "open" : ""}`} aria-label="Main navigation">
          {navigation.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={active === n.id ? "active" : ""}
              aria-current={active === n.id ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <Button variant="nav" asChild>
            <a href="#contact">
              Let’s talk <ArrowUpRight size={13} />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="mobile-menu-control"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const [title, setTitle] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const timer = setInterval(() => setTitle((t) => (t + 1) % titles.length), 3200);
    return () => clearInterval(timer);
  }, [reduced]);
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <ClientOnly fallback={null}>
        <Suspense fallback={null}>
          <Universe />
        </Suspense>
      </ClientOnly>
      <div className="wrap hero-inner">
        <Reveal className="hero-copy">
          <div className="eyebrow">
            <span className="status-dot" /> A CURIOUS MIND. AN INFINITE UNIVERSE.
          </div>
          <h1 id="hero-title">
            Hritik
            <br />
            <span>Mishra.</span>
          </h1>
          <div className="role-line">
            <AnimatePresence mode="wait">
              <motion.span
                key={title}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {titles[title]}
              </motion.span>
            </AnimatePresence>
          </div>
          <p className="hero-description">
            Exploring the intersection of code, intelligence, and possibility. Learning today.
            Building what’s next.
          </p>
          <div className="hero-actions">
            <Button variant="mission" asChild>
              <a href="#projects">
                View projects <ArrowUpRight />
              </a>
            </Button>
            <Button variant="glass" asChild>
              <a href="#contact">
                Contact me <ArrowRight />
              </a>
            </Button>
          </div>
          <a className="resume-link" href="mailto:hritik4160@gmail.com?subject=Resume%20request">
            <Download size={12} /> Request resume
          </a>
          <div className="hero-socials">
            <a
              href="https://github.com/hritik4160-oss"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <Github size={17} />
            </a>
            <a
              href="https://www.linkedin.com/in/hritik-mishra-b60a38348"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={17} />
            </a>
            <a href="mailto:hritik4160@gmail.com" aria-label="Email Hritik">
              <Mail size={17} />
            </a>
          </div>
        </Reveal>
      </div>
      <div className="core-label mono">
        <span className="status-dot" /> NEURAL CORE / ONLINE
      </div>
      <div className="core-coordinate mono">
        <span>CORE.HM — 01</span>
        <span>INTELLIGENCE IN MOTION</span>
      </div>
      <div className="orbit-index" aria-hidden="true">
        {Array.from({ length: 6 }, (_, i) => (
          <i key={i} />
        ))}
      </div>
      <div className="wrap hero-bottom">
        <span className="mono">26.9124° N &nbsp; 75.7873° E / JAIPUR, INDIA</span>
        <a href="#about" className="scroll-cue mono">
          <ArrowDown size={14} /> SCROLL TO EXPLORE
        </a>
        <span className="mono">PORTFOLIO / 2026</span>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section" id="about">
      <div className="wrap about-layout">
        <Reveal className="about-copy">
          <div className="section-kicker">01 / THE HUMAN BEHIND THE CODE</div>
          <h2>
            Driven by curiosity.
            <br />
            Built for <span>possibility.</span>
          </h2>
          <p>
            Hi, I’m Hritik Mishra — a passionate and curious learner exploring technology and
            developing new skills.
          </p>
          <p>
            I love web development, solving problems, and turning new ideas into hands-on projects.
            My goal is simple: keep learning, grow my skills, and create meaningful work that I can
            be proud of.
          </p>
          <p className="quote">
            “SEVA PARMO DHARMA”{" "}
            <span className="text-muted-foreground">/ MY GUIDING PRINCIPLE</span>
          </p>
        </Reveal>
        <Reveal>
          <div className="education-panel">
            <div className="panel-top">
              <span className="mono">EDUCATION / CURRENT ORBIT</span>
              <GraduationCap size={20} />
            </div>
            <h3>JECRC University</h3>
            <p>B.Tech in Computer Science</p>
            <div className="eyebrow">
              <span className="status-dot" /> SECOND YEAR · JAIPUR, RAJASTHAN
            </div>
            <div className="stat-row">
              <div>
                <strong>9.2</strong>
                <span>CGPA</span>
              </div>
              <div>
                <strong>02</strong>
                <span>YEAR OF STUDY</span>
              </div>
              <div>
                <strong>Top 6</strong>
                <span>HACKATHON PRELIMS</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Skills() {
  const [selected, setSelected] = useState(1);
  const reduced = useReducedMotion();
  const skill = skills[selected];
  if (!skill) return null;
  return (
    <section className="section" id="skills">
      <div className="wrap">
        <Reveal>
          <div className="section-head">
            <div>
              <div className="section-kicker">02 / MY TECH CONSTELLATION</div>
              <h2>
                A universe of <span>skills.</span>
              </h2>
            </div>
            <p className="section-intro">
              Different technologies. Connected by one thing:
              <br />
              an endless desire to understand and create.
            </p>
          </div>
        </Reveal>
        <div className="skill-system">
          {skills.map((s, i) => (
            <Reveal key={s.name} className="skill-planet">
              <motion.div
                animate={reduced ? {} : { y: [0, -7, 0] }}
                transition={{
                  duration: 5 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
              >
                <Button
                  variant="ghost"
                  className="planet-control"
                  aria-label={`Explore ${s.name}`}
                  aria-pressed={selected === i}
                  onClick={() => setSelected(i)}
                  onMouseEnter={() => setSelected(i)}
                >
                  <span className="planet-orbit" />
                  <span className={`planet planet-${s.tone}`}>{s.name}</span>
                </Button>
              </motion.div>
              <h3>{s.name}</h3>
              <p>{s.label}</p>
            </Reveal>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            className="skill-detail"
            key={skill.name}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div>
              <span className="mono">IN FOCUS / {skill.name.toUpperCase()}</span>
              <h3>{skill.label}</h3>
              <p>Experience: actively learning</p>
            </div>
            <p>
              {skill.description}
              <br />
              {skill.stack}
            </p>
            <div>
              <span className="mono">PROJECT CONNECTION</span>
              <p>{skill.projects}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function Projects() {
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(null);
  return (
    <section className="section dark-section" id="projects">
      <div className="wrap">
        <Reveal>
          <div className="section-head">
            <div>
              <div className="section-kicker">03 / SELECTED MISSIONS</div>
              <h2>Ideas, brought into orbit.</h2>
            </div>
            <Button variant="glass" asChild>
              <a href="https://github.com/hritik4160-oss" target="_blank" rel="noreferrer">
                Explore GitHub <ArrowUpRight />
              </a>
            </Button>
          </div>
        </Reveal>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <Reveal key={p.id}>
              <TiltCard className="project-card">
                <div className="project-art">
                  {i === 0 ? (
                    <>
                      <div className="featured-badge">
                        <Sparkles size={11} /> FEATURED MISSION
                      </div>
                      <div className="art-orbit" />
                      <div className="art-orbit second" />
                      <motion.div
                        className="challenge-art"
                        animate={reduced ? {} : { y: [0, -5, 0] }}
                        transition={{ duration: 6, repeat: Infinity }}
                      >
                        100<span>DAYS OF CONSISTENCY</span>
                      </motion.div>
                    </>
                  ) : (
                    <motion.div className="code-preview" whileHover={{ rotate: 0 }}>
                      <div className="code-dots">
                        <i />
                        <i />
                        <i />
                      </div>
                      <pre>
                        <span>&lt;!-- a little about me --&gt;</span>
                        {"\n"}&lt;h1&gt;Hello, I’m Hritik.&lt;/h1&gt;{"\n"}&lt;p&gt;Learner.
                        Creator. Builder.&lt;/p&gt;{"\n"}
                        <span>&lt;section id="possibilities"&gt;</span>
                        {"\n"} Let’s create something.{"\n"}
                        <span>&lt;/section&gt;</span>
                      </pre>
                    </motion.div>
                  )}
                </div>
                <div className="project-body">
                  <div className="project-top mono">
                    <span>{p.category}</span>
                    <span>MISSION / {p.number}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <div className="tags">
                    {p.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={p.github} target="_blank" rel="noreferrer">
                      <Github size={14} /> Source code <ArrowUpRight size={12} />
                    </a>
                    <Button variant="glass" onClick={() => setSelected(p)}>
                      Details <ArrowRight />
                    </Button>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
        <Dialog
          open={Boolean(selected)}
          onOpenChange={(open) => {
            if (!open) setSelected(null);
          }}
        >
          <DialogContent className="project-dialog">
            <DialogHeader>
              <span className="section-kicker">MISSION / {selected?.number}</span>
              <DialogTitle>{selected?.name}</DialogTitle>
              <DialogDescription>{selected?.description}</DialogDescription>
            </DialogHeader>
            <div className="tags">
              {selected?.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <p>Explore the source code and follow the learning journey on GitHub.</p>
            <Button variant="mission" asChild>
              <a href={selected?.github} target="_blank" rel="noreferrer">
                <Github /> Open repository <ArrowUpRight />
              </a>
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section className="section dark-section" id="journey">
      <div className="wrap journey-layout">
        <Reveal>
          <div className="section-kicker">04 / THE FLIGHT LOG</div>
          <h2>
            Every step.
            <br />A new trajectory.
          </h2>
          <p className="section-intro">
            Not a finished story. A journey of learning, experimenting, and getting a little better
            every day.
          </p>
        </Reveal>
        <div className="timeline">
          <Reveal className="timeline-item">
            <span className="mono">CURRENT MISSION</span>
            <h3>Computer Science at JECRC</h3>
            <p>
              Second-year B.Tech student exploring programming, web development, and the
              possibilities of technology. Current CGPA: 9.2.
            </p>
          </Reveal>
          <Reveal className="timeline-item">
            <span className="mono">2026 / A MILESTONE</span>
            <h3>Top 6 · Hackathon Prelims</h3>
            <p>
              Turning curiosity into action. A top-six placement in the 2026 preliminary hackathon
              round.
            </p>
          </Reveal>
          <Reveal className="timeline-item">
            <span className="mono">ONGOING / THE DAILY PRACTICE</span>
            <h3>100 Days of LeetCode</h3>
            <p>
              Building consistency through hands-on problem solving and documenting the journey one
              question at a time.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section className="section dark-section" id="certifications">
      <div className="wrap">
        <Reveal>
          <div className="section-kicker">05 / MILESTONES UNLOCKED</div>
          <h2>Small wins. Lasting momentum.</h2>
        </Reveal>
        <div className="cert-grid">
          <Reveal>
            <TiltCard className="cert-card">
              <Award className="cert-icon" size={35} strokeWidth={1.2} />
              <div>
                <span className="mono">ACHIEVEMENT / 2026</span>
                <h3>Hackathon · Top 6</h3>
                <p>Preliminary round · 2026</p>
              </div>
            </TiltCard>
          </Reveal>
          <Reveal>
            <TiltCard className="cert-card">
              <Code2 className="cert-icon" size={35} strokeWidth={1.2} />
              <div>
                <span className="mono">CERTIFICATION</span>
                <h3>Data Science</h3>
                <p>A new perspective on data and discovery.</p>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [launched, setLaunched] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    window.location.href = makeEmailDraft(
      String(form.get("name")),
      String(form.get("email")),
      String(form.get("message")),
    );
    setLaunched(true);
  };
  return (
    <section className="section dark-section" id="contact">
      <div className="wrap contact-layout">
        <Reveal>
          <div className="section-kicker">06 / MISSION CONTROL</div>
          <h2>
            The next great idea
            <br />
            starts with <span>hello.</span>
          </h2>
          <p className="section-intro">
            A project, an opportunity, or just a conversation.
            <br />
            I’d love to hear what you have in mind.
          </p>
          <div className="contact-links">
            <a href="mailto:hritik4160@gmail.com">
              <Mail size={17} />
              hritik4160@gmail.com <ArrowUpRight size={13} />
            </a>
            <a href="tel:9752273718">
              <Phone size={17} />
              9752273718
            </a>
            <p>
              <MapPin size={17} />
              Jaipur, Rajasthan, India
            </p>
          </div>
        </Reveal>
        <Reveal>
          <form className="contact-form" onSubmit={submit}>
            <label htmlFor="name">YOUR NAME</label>
            <Input
              id="name"
              name="name"
              placeholder="How should I call you?"
              required
              autoComplete="name"
              maxLength={120}
            />
            <label htmlFor="email">EMAIL ADDRESS</label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@your-universe.com"
              required
              autoComplete="email"
              maxLength={254}
            />
            <label htmlFor="message">YOUR MESSAGE</label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell me about your next mission…"
              required
              maxLength={4000}
            />
            <Button variant="mission" type="submit">
              <motion.span
                key={String(launched)}
                animate={launched ? { y: [0, -20, 0], opacity: [1, 0, 1] } : {}}
              >
                {launched ? <Check size={15} /> : <Rocket size={15} />}
              </motion.span>
              {launched ? "Email draft ready" : "Launch message"}
              <ArrowUpRight />
            </Button>
            <p className="form-note" role="status">
              {launched
                ? "Continue in your email app to send your message."
                : "Opens your email app with your message ready to send."}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export default function Portfolio() {
  return (
    <div className="portfolio">
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <BootSequence />
      <SpaceEffects />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Certifications />
        <Contact />
      </main>
      <footer className="footer dark-section">
        <div className="wrap footer-inner">
          <a className="brand" href="#home">
            hritik<span className="brand-dot">.</span>
          </a>
          <span className="mono">© 2026 HRITIK MKISHRA. BUILT WITH CURIOSITY.</span>
          <div className="footer-social">
            <a
              href="https://github.com/hritik4160-oss"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/hritik-mishra-b60a38348"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a href="#home" aria-label="Back to top">
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
