import profileImg from "@/imports/WhatsApp_Image_2026-05-27_at_21.53.31.jpeg";
import { useState, useRef, useEffect, createContext, useContext } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "motion/react";
import {
  Menu, X, MapPin, Mail, Phone, Globe, ArrowUpRight, ExternalLink,
  TrendingUp, Users, BookOpen, CheckCircle2, Zap, ChevronDown,
  Copy, Check, Award, Sparkles, Sun, Moon,
} from "lucide-react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";

// ─── Theme System ─────────────────────────────────────────────────────────────

interface C {
  bg: string; bgGrad: string; card: string;
  primary: string; secondary: string; accent: string; green: string;
  text: string; muted: string; border: string;
}

const DK: C = {
  bg: "#050c1a",
  bgGrad: "radial-gradient(ellipse 120% 70% at 50% -10%, #0c1c48 0%, #050c1a 60%)",
  card: "rgba(8,16,46,0.78)",
  primary: "#38bdf8",   // sky blue
  secondary: "#a855f7", // purple
  accent: "#f472b6",    // pink
  green: "#34d399",
  text: "#e2e8ff",
  muted: "#5b6a8a",
  border: "rgba(148,163,200,0.09)",
};

const LT: C = {
  bg: "#f0f6ff",
  bgGrad: "radial-gradient(ellipse 120% 70% at 50% -10%, #bfdbfe 0%, #f0f6ff 60%)",
  card: "rgba(255,255,255,0.92)",
  primary: "#2563eb",   // blue
  secondary: "#7c3aed", // violet
  accent: "#db2777",    // pink
  green: "#059669",
  text: "#0f172a",
  muted: "#64748b",
  border: "rgba(15,23,42,0.08)",
};

const Ctx = createContext<{ c: C; isDark: boolean; toggle: () => void }>({ c: DK, isDark: true, toggle: () => {} });
const useT = () => useContext(Ctx);

// ─── Project color palette (works both modes) ─────────────────────────────────
const G = "#4ade80", I = "#818cf8", SK = "#38bdf8", PK = "#f472b6", OR = "#fb923c";

// ─── Data ─────────────────────────────────────────────────────────────────────

const serviceData = [
  { s: "SEO", count: 5 }, { s: "Web", count: 4 },
  { s: "Content", count: 4 }, { s: "SMM", count: 3 }, { s: "Ads", count: 2 },
];
const skillsData = [
  { skill: "SEO", value: 90 }, { skill: "Social Media", value: 85 },
  { skill: "Content", value: 85 }, { skill: "Lead Gen", value: 82 },
  { skill: "Paid Ads", value: 80 }, { skill: "Web Design", value: 78 },
];
const industryData = [
  { name: "EdTech", value: 33, color: G }, { name: "E-Commerce", value: 22, color: I },
  { name: "Travel", value: 17, color: SK }, { name: "Media", value: 17, color: PK },
  { name: "Mfg & Art", value: 11, color: OR },
];
const projects = [
  { id: 1, client: "Willskill.in", sub: "Willskilljunior.com", industry: "EdTech",
    services: ["WordPress Design", "SEO", "Content Strategy"],
    desc: "Designed and launched dual-brand education platforms with SEO-optimised architecture for skill-based learning programmes.", color: G, url: "willskill.in" },
  { id: 2, client: "sapiensdrip.com", sub: null, industry: "E-Commerce",
    services: ["SEO", "Content Marketing", "Social Media"],
    desc: "Boosted organic search visibility and brand storytelling for a fashion e-commerce store through targeted SEO and creative content.", color: I, url: "sapiensdrip.com" },
  { id: 3, client: "My Picnics", sub: null, industry: "Travel & Experiences",
    services: ["Social Media", "Content Creation", "Lead Generation"],
    desc: "Managed social presence and content campaigns to drive bookings and brand awareness for a curated picnic experience brand.", color: SK, url: null },
  { id: 4, client: "ledihatv.com", sub: null, industry: "Media & Entertainment",
    services: ["Web Design", "Social Media", "SEO"],
    desc: "Built web presence and managed digital outreach for a regional media and entertainment platform.", color: PK, url: "ledihatv.com" },
  { id: 5, client: "Ramdevsteelart.com", sub: null, industry: "Manufacturing & Art",
    services: ["WordPress Design", "Lead Generation", "SEO"],
    desc: "Created a professional website and implemented lead generation for a steel art and manufacturing business.", color: OR, url: "ramdevsteelart.com" },
];
const digitalSkills = ["SEO", "Social Media Marketing", "Google Ads", "Facebook Ads", "Content Strategy", "Lead Generation"];
const technicalSkills = ["WordPress", "Canva", "Adobe Photoshop", "Google Analytics", "Search Console", "Meta Business Suite", "HTML / CSS"];
const softSkills = ["Creative Thinking", "Client Management", "Communication", "Time Management", "Team Leadership"];

// ─── Animated Cursor ──────────────────────────────────────────────────────────

function Cursor() {
  const { c, isDark } = useT();
  const [pos, setPos] = useState({ x: -300, y: -300 });
  const [hov, setHov] = useState(false);
  const [clk, setClk] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia?.("(pointer: coarse)").matches) return;
    const mv = (e: MouseEvent) => { setPos({ x: e.clientX, y: e.clientY }); setReady(true); };
    const ov = (e: MouseEvent) => setHov(!!(e.target as Element).closest("a,button,[role=button],input,textarea"));
    const dn = () => setClk(true);
    const up = () => setClk(false);
    document.addEventListener("mousemove", mv);
    document.addEventListener("mouseover", ov);
    document.addEventListener("mousedown", dn);
    document.addEventListener("mouseup", up);
    document.documentElement.style.cursor = "none";
    return () => {
      document.removeEventListener("mousemove", mv);
      document.removeEventListener("mouseover", ov);
      document.removeEventListener("mousedown", dn);
      document.removeEventListener("mouseup", up);
      document.documentElement.style.cursor = "";
    };
  }, []);

  if (!ready) return null;
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{ zIndex: 99999, background: c.primary, width: 8, height: 8, mixBlendMode: isDark ? "screen" : "normal" }}
        animate={{ x: pos.x - 4, y: pos.y - 4, scale: clk ? 0.4 : hov ? 1.8 : 1 }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none border-2"
        style={{ zIndex: 99998, borderColor: c.primary }}
        animate={{
          x: pos.x - (hov ? 22 : 15),
          y: pos.y - (hov ? 22 : 15),
          width: hov ? 44 : 30,
          height: hov ? 44 : 30,
          opacity: clk ? 0.2 : hov ? 0.9 : 0.5,
          scale: clk ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 160, damping: 20, mass: 0.6 }}
      />
      {hov && (
        <motion.div
          className="fixed top-0 left-0 rounded-full pointer-events-none"
          style={{ zIndex: 99997, background: c.primary, width: 4, height: 4, opacity: 0.3 }}
          animate={{ x: pos.x - 2, y: pos.y - 2 }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
        />
      )}
    </>
  );
}

// ─── Canvas Particles ─────────────────────────────────────────────────────────

function Particles() {
  const { c, isDark } = useT();
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    type Pt = { x: number; y: number; vx: number; vy: number; r: number; op: number; col: string };
    const cols = [c.primary, c.secondary, c.accent];
    const pts: Pt[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.5 + 0.4,
      op: Math.random() * (isDark ? 0.5 : 0.2) + 0.05,
      col: cols[Math.floor(Math.random() * 3)],
    }));

    let id: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        const alpha = Math.round(p.op * 255).toString(16).padStart(2, "0");
        ctx.fillStyle = p.col + alpha;
        ctx.fill();
      });
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, [isDark, c.primary, c.secondary, c.accent]);

  return <canvas ref={ref} className="fixed inset-0 z-0 pointer-events-none" />;
}

// ─── Background ───────────────────────────────────────────────────────────────

function Background() {
  const { c, isDark } = useT();
  const op = isDark ? "1c" : "0e";
  const blobs = [
    { x: "8%",  y: "10%", s: 650, col: c.primary,   dur: 22, d: 0  },
    { x: "88%", y: "6%",  s: 480, col: c.secondary, dur: 28, d: 4  },
    { x: "68%", y: "70%", s: 540, col: c.primary,   dur: 20, d: 8  },
    { x: "4%",  y: "80%", s: 400, col: c.green,     dur: 26, d: 2  },
    { x: "48%", y: "42%", s: 360, col: c.accent,    dur: 24, d: 11 },
    { x: "94%", y: "52%", s: 420, col: c.secondary, dur: 32, d: 6  },
  ];
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0" style={{ background: c.bgGrad }} />
      {blobs.map((b, i) => (
        <motion.div key={i} className="absolute rounded-full"
          style={{
            left: b.x, top: b.y, width: b.s, height: b.s,
            background: `radial-gradient(circle, ${b.col}${op} 0%, transparent 70%)`,
            filter: "blur(90px)", transform: "translate(-50%, -50%)",
          }}
          animate={{ x: [0, 55, -35, 22, 0], y: [0, -45, 55, -22, 0], scale: [1, 1.14, 0.9, 1.07, 1] }}
          transition={{ duration: b.dur, repeat: Infinity, delay: b.d, ease: "easeInOut" }}
        />
      ))}
      {/* Dot grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle, ${c.primary}20 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
        opacity: isDark ? 0.28 : 0.1,
        maskImage: "radial-gradient(ellipse 100% 80% at 50% 0%, black 20%, transparent 75%)",
      }} />
      {/* Scan lines (dark only) */}
      {isDark && (
        <div className="absolute inset-0 opacity-[0.018]" style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, white 3px, white 4px)",
          backgroundSize: "100% 8px",
        }} />
      )}
    </div>
  );
}

// ─── Shared ───────────────────────────────────────────────────────────────────

function Reveal({ children, delay = 0, className = "", style }: {
  children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className} style={style}>
      {children}
    </motion.div>
  );
}

function SectionHead({ label, title, sub, align = "center" }: {
  label: string; title: string; sub?: string; align?: "center" | "left";
}) {
  const { c } = useT();
  const ct = align === "center";
  return (
    <Reveal className={`mb-14 ${ct ? "text-center" : ""}`}>
      <div className={`flex items-center gap-2 mb-3 ${ct ? "justify-center" : ""}`}>
        <span className="w-6 h-px" style={{ background: c.primary }} />
        <span className="text-[11px] font-mono tracking-widest uppercase" style={{ color: c.primary }}>{label}</span>
        <span className="w-6 h-px" style={{ background: c.primary }} />
      </div>
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight"
        style={{ fontFamily: "Outfit, sans-serif", color: c.text }}>
        {title}
      </h2>
      {sub && <p className={`text-base mt-4 leading-relaxed ${ct ? "max-w-2xl mx-auto" : "max-w-xl"}`} style={{ color: c.muted }}>{sub}</p>}
    </Reveal>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Nav({ active }: { active: string }) {
  const { c, isDark, toggle } = useT();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [{ label: "About", id: "about" }, { label: "Work", id: "work" }, { label: "Skills", id: "skills" }, { label: "Contact", id: "contact" }];
  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };

  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-50"
      animate={{
        backgroundColor: scrolled ? (isDark ? "rgba(5,12,26,0.92)" : "rgba(240,246,255,0.94)") : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "blur(0px)",
      }}
      style={{ borderBottom: scrolled ? `1px solid ${c.border}` : "none" }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between">
        <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-xl font-extrabold select-none" style={{ fontFamily: "Outfit, sans-serif" }}>
          <span style={{ color: c.primary }}>NM</span><span style={{ color: c.accent }}>.</span>
        </motion.button>

        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <button key={l.id} onClick={() => go(l.id)}
              className="text-sm font-medium transition-colors duration-200 relative"
              style={{ color: active === l.id ? c.text : c.muted }}>
              {l.label}
              {active === l.id && (
                <motion.span layoutId="nl" className="absolute -bottom-1 left-0 right-0 h-px"
                  style={{ background: c.primary }} />
              )}
            </button>
          ))}

          {/* Theme toggle */}
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            onClick={toggle}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)", border: `1px solid ${c.border}` }}
            title="Toggle light/dark mode">
            <AnimatePresence mode="wait">
              {isDark
                ? <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.22 }}><Sun size={15} style={{ color: c.primary }} /></motion.div>
                : <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.22 }}><Moon size={15} style={{ color: c.primary }} /></motion.div>
              }
            </AnimatePresence>
          </motion.button>

          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => go("contact")}
            className="text-sm px-5 py-2.5 rounded-full font-semibold"
            style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.secondary})`, color: "white", boxShadow: `0 0 22px ${c.primary}45` }}>
            Hire Me
          </motion.button>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button onClick={toggle} className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)" }}>
            {isDark ? <Sun size={13} style={{ color: c.primary }} /> : <Moon size={13} style={{ color: c.primary }} />}
          </button>
          <button style={{ color: c.muted }} onClick={() => setOpen(v => !v)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ borderTop: `1px solid ${c.border}`, background: isDark ? "rgba(5,12,26,0.97)" : "rgba(240,246,255,0.97)" }}>
            <div className="px-5 py-4 flex flex-col gap-1">
              {links.map(l => (
                <button key={l.id} onClick={() => go(l.id)}
                  className="text-sm font-medium text-left py-3 px-3 rounded-xl"
                  style={{ color: active === l.id ? c.primary : c.muted, background: active === l.id ? `${c.primary}12` : "transparent" }}>
                  {l.label}
                </button>
              ))}
              <button onClick={() => go("contact")}
                className="mt-3 self-start text-sm px-6 py-3 rounded-full font-semibold"
                style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.secondary})`, color: "white" }}>
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

const ROLES = ["Digital Marketer", "Web Developer", "SEO Specialist", "Content Strategist"];

function Hero() {
  const { c, isDark } = useT();
  const [ri, setRi] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const hy = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const ho = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setRi(i => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={heroRef} id="hero" className="relative min-h-screen flex items-center pt-24 pb-20 px-6 overflow-hidden">
      <motion.div style={{ y: hy, opacity: ho }} className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-14 md:gap-16">

          {/* Left: content */}
          <div className="md:order-1 flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full border mb-7"
              style={{ borderColor: `${c.green}40`, background: `${c.green}0d` }}>
              <Sparkles size={11} style={{ color: c.green }} />
              <span className="text-xs font-mono" style={{ color: c.green }}>Available for freelance projects</span>
              <motion.span className="w-1.5 h-1.5 rounded-full ml-0.5" style={{ background: c.green }}
                animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4"
              style={{ fontFamily: "Outfit, sans-serif", lineHeight: 1.05, color: c.text }}>
              Nidhi{" "}
              <span style={{
                background: `linear-gradient(135deg, ${c.primary} 0%, ${c.secondary} 55%, ${c.accent} 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                Maurya
              </span>
            </motion.h1>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
              className="h-10 flex items-center justify-center md:justify-start mb-5">
              <AnimatePresence mode="wait">
                <motion.span key={ri}
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.38 }}
                  className="text-lg md:text-xl font-semibold px-5 py-1.5 rounded-full"
                  style={{ fontFamily: "Outfit, sans-serif", color: c.primary, background: `${c.primary}14`, border: `1px solid ${c.primary}30` }}>
                  {ROLES[ri]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              className="text-base md:text-lg leading-relaxed max-w-lg mb-7" style={{ color: c.muted }}>
              Results-driven digital marketing professional helping businesses amplify their online
              presence and drive measurable growth across education, travel, e-commerce, and beyond.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.42 }}
              className="flex items-center justify-center md:justify-start gap-2 mb-8">
              <MapPin size={12} style={{ color: c.muted }} />
              <span className="text-sm" style={{ color: c.muted }}>India · Remote Available</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center md:items-start gap-4">
              <motion.a whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
                href="mailto:digitartha.nidhi918@gmail.com"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm"
                style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.secondary})`, color: "white", fontFamily: "Outfit, sans-serif", boxShadow: `0 0 38px ${c.primary}50` }}>
                Hire Me <ArrowUpRight size={15} />
              </motion.a>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm border"
                style={{ borderColor: c.border, color: c.muted, fontFamily: "Outfit, sans-serif" }}>
                View My Work
              </motion.button>
            </motion.div>
          </div>

          {/* Right: profile image */}
          <div className="md:order-2 flex-shrink-0 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.75, x: 24 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Slow-rotating outer ring */}
              <motion.div className="absolute -inset-5 rounded-[2.5rem] opacity-25"
                style={{ border: `1.5px solid ${c.primary}` }}
                animate={{ rotate: 360 }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} />
              {/* Dashed middle ring */}
              <motion.div className="absolute -inset-9 rounded-[3rem] opacity-12"
                style={{ border: `1px dashed ${c.secondary}` }}
                animate={{ rotate: -360 }} transition={{ duration: 45, repeat: Infinity, ease: "linear" }} />

              {/* Image */}
              <div className="relative w-60 h-[300px] md:w-72 md:h-[340px] rounded-[2rem] overflow-hidden"
                style={{ border: `2px solid ${c.primary}60`, boxShadow: `0 0 60px ${c.primary}35, 0 0 120px ${c.primary}15` }}>
                <img src={profileImg} alt="Nidhi Maurya"
                  className="w-full h-full object-cover object-top"
                  style={{ objectPosition: "50% 12%" }} />
                <div className="absolute bottom-0 left-0 right-0 h-28"
                  style={{ background: `linear-gradient(to top, ${c.bg}cc, transparent)` }} />
                {/* Name overlay */}
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <p className="text-sm font-bold" style={{ color: c.text, fontFamily: "Outfit, sans-serif", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
                    Nidhi Maurya
                  </p>
                  <p className="text-[10px] font-mono" style={{ color: c.primary }}>Digital Marketer</p>
                </div>
              </div>

              {/* Floating chips */}
              <motion.div className="absolute -left-14 top-10 px-3 py-1.5 rounded-xl border text-xs font-mono whitespace-nowrap"
                style={{ background: c.card, borderColor: `${G}40`, color: G, backdropFilter: "blur(12px)" }}
                animate={{ y: [0, -7, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}>
                ✦ 6+ Clients
              </motion.div>
              <motion.div className="absolute -right-12 top-5 px-3 py-1.5 rounded-xl border text-xs font-mono whitespace-nowrap"
                style={{ background: c.card, borderColor: `${c.accent}40`, color: c.accent, backdropFilter: "blur(12px)" }}
                animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
                ✦ SEO Expert
              </motion.div>
              <motion.div className="absolute -right-10 bottom-16 px-3 py-1.5 rounded-xl border text-xs font-mono whitespace-nowrap"
                style={{ background: c.card, borderColor: `${c.secondary}40`, color: c.secondary, backdropFilter: "blur(12px)" }}
                animate={{ y: [0, 6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
                ✦ 3+ Years
              </motion.div>

              {/* Available badge */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-xl border flex items-center gap-2 whitespace-nowrap"
                style={{ background: c.card, borderColor: `${c.green}35`, backdropFilter: "blur(12px)" }}>
                <motion.span className="w-2 h-2 rounded-full" style={{ background: c.green }}
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }} />
                <span className="text-xs font-mono" style={{ color: c.green }}>Available for hire</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
          className="flex flex-col items-center gap-2 mt-24">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase" style={{ color: c.muted, opacity: 0.4 }}>scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}>
            <ChevronDown size={15} style={{ color: c.muted, opacity: 0.3 }} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────

function Stats() {
  const { c, isDark } = useT();
  const stats = [
    { v: "3+", l: "Years Active",      col: c.primary   },
    { v: "6+", l: "Clients Served",    col: c.secondary },
    { v: "5",  l: "Industries",        col: c.accent    },
    { v: "3",  l: "Certifications",    col: G           },
    { v: "5",  l: "Projects Done",     col: OR          },
  ];
  return (
    <section id="about" className="border-y" style={{ borderColor: c.border }}>
      <div className="py-12" style={{ background: isDark ? `${c.primary}06` : `${c.primary}04` }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {stats.map(({ v, l, col }, i) => (
              <Reveal key={l} delay={i * 0.08} className="flex flex-col items-center text-center">
                <motion.p className="text-5xl md:text-6xl font-extrabold leading-none"
                  style={{ fontFamily: "Outfit, sans-serif", color: col }}
                  initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}>
                  {v}
                </motion.p>
                <p className="text-[11px] font-mono mt-2 uppercase tracking-wider" style={{ color: c.muted }}>{l}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Work ─────────────────────────────────────────────────────────────────────

function Work() {
  const { c } = useT();
  const [hov, setHov] = useState<number | null>(null);
  return (
    <section id="work" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHead label="Portfolio" title="Selected Work"
          sub="Five client projects spanning education, fashion, travel, media, and manufacturing — each with measurable digital results." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <motion.div
                className="relative rounded-2xl border overflow-hidden flex flex-col h-full"
                style={{ background: c.card, borderColor: c.border, backdropFilter: "blur(16px)" }}
                whileHover={{ y: -7, borderColor: `${p.color}55`, boxShadow: `0 28px 64px ${p.color}1c, 0 0 0 1px ${p.color}22` }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                onHoverStart={() => setHov(p.id)} onHoverEnd={() => setHov(null)}>
                <motion.div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }}
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: hov === p.id ? 1 : 0 }} transition={{ duration: 0.35 }} />
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full"
                      style={{ background: `${p.color}18`, color: p.color }}>{p.industry}</span>
                    {p.url && (
                      <a href={`https://${p.url}`} target="_blank" rel="noreferrer"
                        className="transition-colors" style={{ color: c.muted + "55" }}>
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                  <motion.h3 className="text-lg font-bold mb-1" style={{ fontFamily: "Outfit, sans-serif" }}
                    animate={{ color: hov === p.id ? p.color : c.text }} transition={{ duration: 0.25 }}>
                    {p.client}
                  </motion.h3>
                  {p.sub && <p className="text-xs mb-2" style={{ color: c.muted }}>+ {p.sub}</p>}
                  <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: c.muted }}>{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {p.services.map(s => (
                      <span key={s} className="text-[10px] font-mono px-2 py-1 rounded-full border"
                        style={{ color: p.color, borderColor: `${p.color}35`, background: `${p.color}09` }}>{s}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────

function Skills() {
  const { c, isDark } = useT();
  const cardStyle = { background: c.card, borderColor: c.border, backdropFilter: "blur(16px)" };
  const gridStroke = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const barTrack = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";

  const ChartTip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="rounded-xl px-3 py-2 text-xs shadow-xl border" style={{ background: isDark ? "#0e1635" : "#fff", borderColor: c.border }}>
        <p className="font-mono mb-0.5" style={{ color: c.muted }}>{label}</p>
        <p className="font-semibold" style={{ color: c.text }}>{payload[0].value} projects</p>
      </div>
    );
  };

  return (
    <section id="skills" className="py-28 px-6"
      style={{ background: isDark ? `linear-gradient(180deg, transparent 0%, ${c.primary}05 50%, transparent 100%)` : `linear-gradient(180deg, transparent 0%, ${c.primary}04 50%, transparent 100%)` }}>
      <div className="max-w-6xl mx-auto">
        <SectionHead label="Expertise" title="Skills & Stats"
          sub="A data-driven overview of my marketing expertise, tools, and project portfolio distribution." />

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { l: "Projects Delivered", v: "6+", col: c.primary   },
            { l: "Industries Served",  v: "5",  col: c.secondary },
            { l: "Certifications",     v: "3",  col: c.accent    },
            { l: "Years Active",       v: "3+", col: OR          },
          ].map(({ l, v, col }, i) => (
            <Reveal key={l} delay={i * 0.08}>
              <motion.div className="rounded-2xl border p-5" style={cardStyle}
                whileHover={{ borderColor: `${col}45`, boxShadow: `0 0 30px ${col}12` }} transition={{ duration: 0.3 }}>
                <p className="text-xs font-mono mb-2" style={{ color: c.muted }}>{l}</p>
                <p className="text-4xl font-extrabold" style={{ fontFamily: "Outfit, sans-serif", color: col }}>{v}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Charts row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <Reveal>
            <div className="rounded-2xl border p-6 h-full" style={cardStyle}>
              <p className="text-sm font-semibold mb-5" style={{ fontFamily: "Outfit, sans-serif", color: c.text }}>Projects by Service</p>
              <ResponsiveContainer width="100%" height={190}>
                <BarChart data={serviceData} barCategoryGap="38%">
                  <XAxis dataKey="s" tick={{ fontSize: 10, fill: c.muted, fontFamily: "DM Mono, monospace" }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip content={<ChartTip />} cursor={{ fill: "rgba(255,255,255,0.025)" }} />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                    {serviceData.map((_, i) => <Cell key={i} fill={[c.primary, G, OR, c.secondary, c.accent][i % 5]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl border p-6 h-full" style={cardStyle}>
              <p className="text-sm font-semibold mb-5" style={{ fontFamily: "Outfit, sans-serif", color: c.text }}>Industries Served</p>
              <div className="flex items-center gap-5">
                <div className="flex-shrink-0">
                  <PieChart width={130} height={130}>
                    <Pie data={industryData} cx={60} cy={60} innerRadius={36} outerRadius={60} paddingAngle={3} dataKey="value" strokeWidth={0}>
                      {industryData.map(e => <Cell key={e.name} fill={e.color} />)}
                    </Pie>
                  </PieChart>
                </div>
                <div className="flex-1 space-y-2.5">
                  {industryData.map(({ name, value, color }) => (
                    <div key={name} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                      <span className="text-xs flex-1" style={{ color: c.muted }}>{name}</span>
                      <span className="text-[11px] font-mono" style={{ color: c.text }}>{value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Charts row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <Reveal delay={0.1}>
            <div className="rounded-2xl border p-6 h-full" style={cardStyle}>
              <p className="text-sm font-semibold mb-2" style={{ fontFamily: "Outfit, sans-serif", color: c.text }}>Skill Proficiency</p>
              <ResponsiveContainer width="100%" height={240}>
                <RadarChart data={skillsData}>
                  <PolarGrid stroke={gridStroke} />
                  <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10, fill: c.muted, fontFamily: "DM Mono, monospace" }} />
                  <Radar name="Level" dataKey="value" stroke={c.primary} fill={c.primary} fillOpacity={0.18} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="rounded-2xl border p-6 h-full flex flex-col gap-4" style={cardStyle}>
              <p className="text-sm font-semibold" style={{ fontFamily: "Outfit, sans-serif", color: c.text }}>Skill Levels</p>
              {skillsData.map(({ skill, value }, i) => (
                <div key={skill}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-xs" style={{ color: c.muted }}>{skill}</span>
                    <span className="text-[11px] font-mono" style={{ color: c.muted }}>{value}%</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: barTrack }}>
                    <motion.div className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${c.primary}, ${c.secondary})` }}
                      initial={{ width: 0 }} whileInView={{ width: `${value}%` }} viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.09, ease: "easeOut" }} />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Tools + Soft Skills */}
        <Reveal>
          <div className="rounded-2xl border p-6" style={cardStyle}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold mb-4" style={{ fontFamily: "Outfit, sans-serif", color: c.text }}>Tools & Platforms</p>
                <div className="flex flex-wrap gap-2">
                  {technicalSkills.map((t, i) => (
                    <motion.span key={t}
                      initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }} whileHover={{ scale: 1.06 }}
                      className="text-[11px] font-mono px-3 py-1.5 rounded-full border cursor-default"
                      style={{ borderColor: c.border, color: c.muted, background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}>
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold mb-4" style={{ fontFamily: "Outfit, sans-serif", color: c.text }}>Soft Skills</p>
                <div className="flex flex-wrap gap-2">
                  {softSkills.map((s, i) => (
                    <motion.span key={s}
                      initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }} whileHover={{ scale: 1.06 }}
                      className="text-[11px] px-3 py-1.5 rounded-full border cursor-default"
                      style={{ borderColor: `${c.secondary}30`, color: c.secondary, background: `${c.secondary}0a` }}>
                      {s}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Education ────────────────────────────────────────────────────────────────

function Education() {
  const { c } = useT();
  const cs = { background: c.card, borderColor: c.border, backdropFilter: "blur(16px)" };
  return (
    <section className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHead label="Background" title="Education & Certifications" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Reveal>
            <div className="rounded-2xl border p-7 h-full" style={cs}>
              <h3 className="text-sm font-semibold mb-7 flex items-center gap-2.5" style={{ fontFamily: "Outfit, sans-serif", color: c.text }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${c.primary}20` }}>
                  <BookOpen size={13} style={{ color: c.primary }} />
                </div>
                Education
              </h3>
              <div className="relative pl-6">
                <div className="absolute left-0 top-1 bottom-1 w-px" style={{ background: c.border }} />
                <div className="space-y-7">
                  {[
                    { d: "B.Sc. Biotechnology", i: "University", y: "Expected 2026", a: true },
                    { d: "HSC — Science (PCB)", i: "Class 12th · 74%", y: "2021", a: false },
                    { d: "SSC", i: "Class 10th · 73%", y: "2019", a: false },
                  ].map(({ d, i, y, a }, idx) => (
                    <Reveal key={d} delay={idx * 0.1}>
                      <div className="relative">
                        <div className="absolute -left-6 top-1 w-3 h-3 rounded-full border-2"
                          style={{ background: a ? c.primary : "transparent", borderColor: a ? c.primary : c.border, transform: "translateX(-50%)", boxShadow: a ? `0 0 10px ${c.primary}60` : "none" }} />
                        <p className="text-sm font-semibold" style={{ color: c.text }}>{d}</p>
                        <p className="text-xs mt-0.5" style={{ color: c.muted }}>{i}</p>
                        <p className="text-[11px] font-mono mt-1" style={{ color: a ? c.primary : c.muted + "55" }}>{y}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border p-7 h-full flex flex-col" style={cs}>
              <h3 className="text-sm font-semibold mb-7 flex items-center gap-2.5" style={{ fontFamily: "Outfit, sans-serif", color: c.text }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${c.accent}18` }}>
                  <Award size={13} style={{ color: c.accent }} />
                </div>
                Certifications
              </h3>
              <div className="space-y-5 mb-6">
                {[
                  { t: "Diploma in Digital Marketing", iss: "Professional Institute", col: c.primary },
                  { t: "AI Programming in Python",     iss: "Udacity",               col: c.secondary },
                  { t: "Google Analytics Certified",   iss: "Google",                col: G },
                ].map(({ t, iss, col }, i) => (
                  <motion.div key={t}
                    initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }} className="flex items-start gap-3">
                    <CheckCircle2 size={16} style={{ color: col, flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <p className="text-sm font-medium" style={{ color: c.text }}>{t}</p>
                      <p className="text-xs mt-0.5" style={{ color: c.muted }}>{iss}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="pt-5 border-t mt-auto" style={{ borderColor: c.border }}>
                <p className="text-[11px] font-mono mb-3 uppercase tracking-wider" style={{ color: c.muted }}>Digital Expertise</p>
                <div className="flex flex-wrap gap-1.5">
                  {digitalSkills.map(s => (
                    <span key={s} className="text-[10px] px-2.5 py-1 rounded-full"
                      style={{ background: `${c.primary}12`, color: c.primary, border: `1px solid ${c.primary}22` }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function Contact() {
  const { c, isDark } = useT();
  const [copied, setCopied] = useState<"email" | "phone" | null>(null);
  const cp = (val: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(val);
    setCopied(type);
    setTimeout(() => setCopied(null), 2200);
  };
  const cs = { background: c.card, borderColor: c.border, backdropFilter: "blur(16px)" };

  return (
    <section id="contact" className="py-28 px-6 relative"
      style={{ background: isDark ? `linear-gradient(180deg, transparent 0%, ${c.primary}07 50%, transparent 100%)` : `linear-gradient(180deg, transparent 0%, ${c.primary}05 50%, transparent 100%)` }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${c.primary}08 0%, transparent 70%)` }} />
      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHead label="Contact" title="Let's Work Together"
          sub="Open to freelance projects. Specialising in SEO, web design, social media management, and full-stack digital marketing strategy." />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Reveal>
            <div className="rounded-2xl p-7 border h-full flex flex-col"
              style={{ background: `linear-gradient(145deg, ${c.green}0e 0%, transparent 100%)`, borderColor: `${c.green}22` }}>
              <div className="flex items-center gap-2.5 mb-4">
                <motion.span className="w-2.5 h-2.5 rounded-full" style={{ background: c.green }}
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                <span className="text-sm font-semibold" style={{ color: c.green }}>Available for Projects</span>
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: c.muted }}>
                Accepting new freelance clients. Ready to help you grow your digital presence with data-driven strategies and creative execution.
              </p>
              <div className="space-y-3 mt-auto">
                {[
                  { icon: TrendingUp, label: "SEO & Search Marketing",     color: c.primary   },
                  { icon: Users,      label: "Social Media Management",    color: c.secondary },
                  { icon: Zap,        label: "Google & Facebook Ads",      color: SK          },
                  { icon: Globe,      label: "WordPress Web Design",       color: OR          },
                  { icon: BookOpen,   label: "Content Marketing Strategy", color: c.accent    },
                ].map(({ icon: Icon, label, color }, i) => (
                  <motion.div key={label} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="flex items-center gap-2.5">
                    <Icon size={13} style={{ color, flexShrink: 0 }} />
                    <span className="text-sm" style={{ color: c.muted }}>{label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-3 h-full">
              {/* Email */}
              <div className="flex items-center gap-4 rounded-2xl border px-5 py-4" style={cs}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${c.primary}20` }}>
                  <Mail size={15} style={{ color: c.primary }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-mono" style={{ color: c.muted }}>Email</p>
                  <p className="text-sm font-medium truncate" style={{ color: c.text }}>digitartha.nidhi918@gmail.com</p>
                </div>
                <motion.button whileTap={{ scale: 0.9 }}
                  onClick={() => cp("digitartha.nidhi918@gmail.com", "email")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium flex-shrink-0"
                  style={{ background: `${c.primary}20`, color: c.primary }}>
                  <AnimatePresence mode="wait">
                    {copied === "email"
                      ? <motion.span key="y" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1"><Check size={10} /> Copied</motion.span>
                      : <motion.span key="n" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1"><Copy size={10} /> Copy</motion.span>}
                  </AnimatePresence>
                </motion.button>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4 rounded-2xl border px-5 py-4" style={cs}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${c.secondary}20` }}>
                  <Phone size={15} style={{ color: c.secondary }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-mono" style={{ color: c.muted }}>Phone / WhatsApp</p>
                  <p className="text-sm font-medium" style={{ color: c.text }}>+91 78808 03049</p>
                </div>
                <motion.button whileTap={{ scale: 0.9 }}
                  onClick={() => cp("7880803049", "phone")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium flex-shrink-0"
                  style={{ background: `${c.secondary}20`, color: c.secondary }}>
                  <AnimatePresence mode="wait">
                    {copied === "phone"
                      ? <motion.span key="y" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1"><Check size={10} /> Copied</motion.span>
                      : <motion.span key="n" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1"><Copy size={10} /> Copy</motion.span>}
                  </AnimatePresence>
                </motion.button>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4 rounded-2xl border px-5 py-4" style={cs}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${G}18` }}>
                  <MapPin size={15} style={{ color: G }} />
                </div>
                <div>
                  <p className="text-[10px] font-mono" style={{ color: c.muted }}>Location</p>
                  <p className="text-sm font-medium" style={{ color: c.text }}>India · Remote Available</p>
                </div>
              </div>

              {/* Social */}
              <div className="grid grid-cols-2 gap-3 flex-1">
                {[
                  { p: "LinkedIn",    col: "#0a66c2" },
                  { p: "Instagram",   col: "#e1306c" },
                  { p: "Twitter / X", col: "#1d9bf0" },
                  { p: "WhatsApp",    col: "#25d366" },
                ].map(({ p, col }) => (
                  <motion.button key={p}
                    whileHover={{ scale: 1.03, borderColor: `${col}60` }} whileTap={{ scale: 0.97 }}
                    className="rounded-xl border px-4 py-3.5 text-left"
                    style={{ ...cs }}>
                    <p className="text-xs font-semibold" style={{ fontFamily: "Outfit, sans-serif", color: col }}>{p}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="text-center">
          <motion.a href="mailto:digitartha.nidhi918@gmail.com"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2.5 px-12 py-4 rounded-full font-bold text-base"
            style={{
              background: `linear-gradient(135deg, ${c.primary}, ${c.secondary})`,
              color: "white", fontFamily: "Outfit, sans-serif",
              boxShadow: `0 0 55px ${c.primary}45, 0 0 110px ${c.primary}18`,
            }}>
            Get in Touch <ArrowUpRight size={18} />
          </motion.a>
          <p className="text-xs mt-3 font-mono" style={{ color: c.muted, opacity: 0.5 }}>Typically responds within 24 hours</p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const { c } = useT();
  return (
    <footer className="border-t py-8 px-6" style={{ borderColor: c.border }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xl font-extrabold" style={{ fontFamily: "Outfit, sans-serif" }}>
          <span style={{ color: c.primary }}>NM</span><span style={{ color: c.accent }}>.</span>
        </p>
        <p className="text-xs font-mono" style={{ color: c.muted, opacity: 0.45 }}>
          © {new Date().getFullYear()} Nidhi Maurya · Digital Marketing Portfolio
        </p>
        <motion.button whileHover={{ scale: 1.05 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-xs font-mono" style={{ color: c.muted, opacity: 0.5 }}>
          Back to top ↑
        </motion.button>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [active, setActive] = useState("hero");
  const c = isDark ? DK : LT;

  // Sync Tailwind CSS variables for bg-background etc.
  useEffect(() => {
    const r = document.documentElement;
    if (isDark) {
      r.style.setProperty("--background", "#050c1a");
      r.style.setProperty("--foreground", "#e2e8ff");
      r.style.setProperty("--card", "rgba(8,16,46,0.78)");
      r.style.setProperty("--muted-foreground", "#5b6a8a");
      r.style.setProperty("--border", "rgba(148,163,200,0.09)");
      r.style.setProperty("--primary", "#38bdf8");
    } else {
      r.style.setProperty("--background", "#f0f6ff");
      r.style.setProperty("--foreground", "#0f172a");
      r.style.setProperty("--card", "rgba(255,255,255,0.92)");
      r.style.setProperty("--muted-foreground", "#64748b");
      r.style.setProperty("--border", "rgba(15,23,42,0.08)");
      r.style.setProperty("--primary", "#2563eb");
    }
  }, [isDark]);

  useEffect(() => {
    const fn = () => {
      const ids = ["hero", "about", "work", "skills", "contact"];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const { top, bottom } = el.getBoundingClientRect();
          if (top <= 130 && bottom >= 130) { setActive(id); break; }
        }
      }
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <Ctx.Provider value={{ c, isDark, toggle: () => setIsDark(d => !d) }}>
      <div className="relative min-h-screen" style={{ background: c.bg, color: c.text, fontFamily: "DM Sans, sans-serif" }}>
        <Background />
        <Particles />
        <Cursor />
        <Nav active={active} />
        <main className="relative z-10">
          <Hero />
          <Stats />
          <Work />
          <Skills />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </Ctx.Provider>
  );
}
