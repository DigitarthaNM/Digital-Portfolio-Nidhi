import image_WhatsApp_Image_2026_05_27_at_21_53_31 from '@/imports/WhatsApp_Image_2026-05-27_at_21.53.31.jpeg'
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Home,
  Briefcase,
  BarChart2,
  Mail,
  ArrowUpRight,
  MapPin,
  TrendingUp,
  Users,
  Layers,
  ChevronRight,
  Globe,
  Award,
  BookOpen,
  ExternalLink,
  CheckCircle2,
  Zap,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

type Tab = "home" | "work" | "stats" | "contact";

const VIOLET = "#7c3aed";
const LIME = "#a3e635";
const SKY = "#38bdf8";
const ORANGE = "#fb923c";
const PINK = "#f472b6";

const serviceData = [
  { s: "SEO", count: 5 },
  { s: "Web", count: 4 },
  { s: "Content", count: 4 },
  { s: "SMM", count: 3 },
  { s: "Ads", count: 2 },
];

const skillsData = [
  { skill: "SEO", value: 90 },
  { skill: "Social Media", value: 85 },
  { skill: "Content", value: 85 },
  { skill: "Lead Gen", value: 82 },
  { skill: "Paid Ads", value: 80 },
  { skill: "Web Design", value: 78 },
];

const industryData = [
  { name: "EdTech", value: 33, color: LIME },
  { name: "E-Commerce", value: 22, color: VIOLET },
  { name: "Travel", value: 17, color: SKY },
  { name: "Media", value: 17, color: PINK },
  { name: "Mfg & Art", value: 11, color: ORANGE },
];

const projects = [
  {
    id: 1,
    client: "Willskill.in",
    sub: "Willskilljunior.com",
    industry: "EdTech",
    services: ["WordPress Design", "SEO", "Content Strategy"],
    desc: "Designed and launched dual-brand education platforms with SEO-optimised architecture for skill-based learning programmes.",
    color: LIME,
    url: "willskill.in",
  },
  {
    id: 2,
    client: "sapiensdrip.com",
    sub: null,
    industry: "E-Commerce",
    services: ["SEO", "Content Marketing", "Social Media"],
    desc: "Boosted organic search visibility and brand storytelling for a fashion e-commerce store through targeted SEO and creative content.",
    color: VIOLET,
    url: "sapiensdrip.com",
  },
  {
    id: 3,
    client: "My Picnics",
    sub: null,
    industry: "Travel & Experiences",
    services: ["Social Media", "Content Creation", "Lead Generation"],
    desc: "Managed social presence and content campaigns to drive bookings and brand awareness for a curated picnic experience brand.",
    color: SKY,
    url: null,
  },
  {
    id: 4,
    client: "ledihatv.com",
    sub: null,
    industry: "Media & Entertainment",
    services: ["Web Design", "Social Media", "SEO"],
    desc: "Built web presence and managed digital outreach for a regional media and entertainment platform.",
    color: PINK,
    url: "ledihatv.com",
  },
  {
    id: 5,
    client: "Ramdevsteelart.com",
    sub: null,
    industry: "Manufacturing & Art",
    services: ["WordPress Design", "Lead Generation", "SEO"],
    desc: "Created a professional website and implemented a lead generation system for a steel art and manufacturing business.",
    color: ORANGE,
    url: "ramdevsteelart.com",
  },
  {
    id: 5,
    client: "Itech Computer Education",
    sub: null,
    industry: "Edtech",
    services: ["WordPress Design", "Lead Generation", "SEO", "Social Media"],
    desc: "Handled Itech Website, Seo, Social Media, Performance Marketing.",
    color: BLUE,
    url: "i-tech.net.in",
  },
];

const digitalSkills = ["SEO", "Social Media Marketing", "Google Ads", "Facebook Ads", "Content Strategy", "Lead Generation"];
const technicalSkills = ["WordPress", "Canva", "Adobe Photoshop (Basic)", "Google Analytics", "Search Console", "Meta Business Suite", "HTML / CSS"];
const softSkills = ["Creative Thinking", "Client Management", "Communication", "Time Management", "Team Leadership"];

function Tag({ label, color }: { label: string; color?: string }) {
  return (
    <span
      className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
      style={{
        color: color ?? "rgba(255,255,255,0.55)",
        borderColor: color ? `${color}40` : "rgba(255,255,255,0.12)",
        background: color ? `${color}12` : "transparent",
      }}
    >
      {label}
    </span>
  );
}

function QuickStat({ icon: Icon, label, value }: { icon: typeof TrendingUp; label: string; value: string }) {
  return (
    <div className="flex-1 rounded-2xl bg-white/5 border border-white/8 p-3 flex flex-col gap-1.5">
      <Icon size={13} className="text-primary" />
      <p className="font-mono text-lg font-semibold text-foreground leading-none">{value}</p>
      <p className="text-[10px] text-muted-foreground leading-tight">{label}</p>
    </div>
  );
}

function HomeScreen() {
  return (
    <div className="px-5 pb-6 space-y-5">
      {/* Profile */}
      <div className="pt-4 flex items-center gap-4">
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2" style={{ borderColor: `${VIOLET}60` }}>
            <img
              src={image_WhatsApp_Image_2026_05_27_at_21_53_31}
              alt="Nidhi Maurya"
              className="w-full h-full object-cover object-center"
              style={{ objectPosition: 'center 20%' }}
            />
          </div>
          <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#0d0d1a]" style={{ background: LIME }} />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold leading-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
            Nidhi Maurya
          </h1>
          <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
            Digital Marketer · Web Developer · SEO Specialist
          </p>
          <div className="flex items-center gap-1 mt-1.5">
            <MapPin size={9} className="text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">India · Freelancer</span>
          </div>
        </div>
        <a
          href="mailto:hello@nidhimaurya.in"
          className="flex-shrink-0 flex items-center gap-1 text-[11px] font-medium px-3 py-1.5 rounded-full border border-white/12 text-foreground/80 hover:border-primary/60 transition-colors"
        >
          Hire <ArrowUpRight size={10} />
        </a>
      </div>

      {/* Bio */}
      <p className="text-sm text-foreground/65 leading-relaxed">
        Passionate and results-driven digital marketing professional helping businesses amplify
        their online presence and drive measurable growth across education, travel, and e-commerce.
      </p>

      {/* Quick stats */}
      <div className="flex gap-2">
        <QuickStat icon={TrendingUp} label="Years Active" value="3+" />
        <QuickStat icon={Users} label="Clients Served" value="6+" />
        <QuickStat icon={Layers} label="Industries" value="4" />
      </div>

      {/* Featured project */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground/90" style={{ fontFamily: "Outfit, sans-serif" }}>
            Featured Project
          </h2>
          <span className="text-[10px] text-muted-foreground">EdTech</span>
        </div>
        <div
          className="rounded-2xl p-4 border"
          style={{
            background: `linear-gradient(135deg, ${LIME}16 0%, ${VIOLET}10 100%)`,
            borderColor: `${LIME}30`,
          }}
        >
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-xs text-muted-foreground">Dual Platform</p>
              <h3 className="text-base font-bold mt-0.5" style={{ fontFamily: "Outfit, sans-serif", color: LIME }}>
                Willskill.in
              </h3>
              <p className="text-[10px] text-muted-foreground">+ Willskilljunior.com</p>
            </div>
            <span className="text-[10px] font-mono px-2 py-1 rounded-full" style={{ background: `${LIME}20`, color: LIME }}>
              Web + SEO
            </span>
          </div>
          <p className="text-xs text-foreground/60 leading-relaxed mb-3">
            Designed and launched dual-brand education platforms with SEO-optimised architecture
            for skill-based learning programmes.
          </p>
          <div className="flex gap-1.5 flex-wrap">
            <Tag label="WordPress" color={LIME} />
            <Tag label="SEO" color={LIME} />
            <Tag label="Content" color={LIME} />
          </div>
        </div>
      </div>

      {/* Expertise */}
      <div>
        <h2 className="text-sm font-semibold text-foreground/90 mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>
          Core Expertise
        </h2>
        <div className="flex flex-wrap gap-2">
          {["SEO Specialist", "Social Media", "Google & Meta Ads", "Content Marketing", "Lead Generation", "WordPress Design", "UI/UX Design"].map((e) => (
            <span key={e} className="text-[11px] px-3 py-1 rounded-full bg-white/5 border border-white/10 text-foreground/65">
              {e}
            </span>
          ))}
        </div>
      </div>

      {/* Certifications strip */}
      <div>
        <h2 className="text-sm font-semibold text-foreground/90 mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>
          Certifications
        </h2>
        <div className="space-y-2">
          {[
            { title: "Diploma in Digital Marketing", issuer: "Professional Institute" },
            { title: "AI Programming in Python", issuer: "Udacity" },
            { title: "Google Analytics Certified", issuer: "Google" },
          ].map(({ title, issuer }) => (
            <div key={title} className="flex items-center gap-3 rounded-xl bg-white/4 border border-white/8 px-3 py-2.5">
              <CheckCircle2 size={14} style={{ color: LIME, flexShrink: 0 }} />
              <div>
                <p className="text-xs font-medium text-foreground/85">{title}</p>
                <p className="text-[10px] text-muted-foreground">{issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WorkScreen() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="px-5 pb-6">
      <div className="pt-4 mb-5">
        <h1 className="text-2xl font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>
          My Work
        </h1>
        <p className="text-xs text-muted-foreground mt-1">6 clients · 5 industries</p>
      </div>

      {/* Projects */}
      <div className="space-y-2.5 mb-6">
        {projects.map((p) => (
          <motion.div
            key={p.id}
            layout
            className="rounded-2xl border overflow-hidden cursor-pointer"
            style={{ borderColor: expanded === p.id ? `${p.color}40` : "rgba(255,255,255,0.08)" }}
            onClick={() => setExpanded(expanded === p.id ? null : p.id)}
          >
            <div
              className="p-4"
              style={{
                background: expanded === p.id
                  ? `linear-gradient(135deg, ${p.color}10 0%, transparent 100%)`
                  : "rgba(255,255,255,0.025)",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ background: `${p.color}18`, color: p.color }}>
                      {p.industry}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold text-foreground/90" style={{ fontFamily: "Outfit, sans-serif" }}>
                      {p.client}
                    </p>
                    {p.sub && (
                      <span className="text-[10px] text-muted-foreground">+ 1 more</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {p.url && (
                    <a
                      href={`https://${p.url}`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-0.5 text-[10px] text-muted-foreground hover:text-foreground/80 transition-colors"
                    >
                      <ExternalLink size={10} />
                    </a>
                  )}
                  <motion.div animate={{ rotate: expanded === p.id ? 90 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronRight size={14} className="text-muted-foreground" />
                  </motion.div>
                </div>
              </div>

              <AnimatePresence>
                {expanded === p.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <p className="text-xs text-foreground/60 leading-relaxed mt-3 mb-3">{p.desc}</p>
                    {p.sub && (
                      <p className="text-[10px] text-muted-foreground mb-2">
                        Also includes: <span style={{ color: p.color }}>{p.sub}</span>
                      </p>
                    )}
                    <div className="flex flex-wrap gap-1.5">
                      {p.services.map((s) => <Tag key={s} label={s} color={p.color} />)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Education */}
      <div>
        <h2 className="text-sm font-semibold text-foreground/90 mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>
          Education
        </h2>
        <div className="space-y-2">
          {[
            { degree: "B.Sc. Biotechnology", institution: "University", year: "Expected 2026", active: true },
            { degree: "HSC — Science (PCB)", institution: "Class 12th · 74%", year: "2021", active: false },
            { degree: "SSC", institution: "Class 10th · 73%", year: "2019", active: false },
          ].map(({ degree, institution, year, active }) => (
            <div key={degree} className="flex items-center gap-3 rounded-xl bg-white/4 border border-white/8 px-3 py-2.5">
              <div
                className="w-1.5 h-8 rounded-full flex-shrink-0"
                style={{ background: active ? VIOLET : "rgba(255,255,255,0.1)" }}
              />
              <div className="flex-1">
                <p className="text-xs font-medium text-foreground/85">{degree}</p>
                <p className="text-[10px] text-muted-foreground">{institution}</p>
              </div>
              <span className="text-[10px] font-mono text-muted-foreground">{year}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const ServiceTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl bg-[#1a1a2e] border border-white/10 px-3 py-2 text-xs shadow-xl">
      <p className="text-muted-foreground mb-0.5 font-mono">{label}</p>
      <p className="font-semibold text-foreground">{payload[0].value} projects</p>
    </div>
  );
};

function StatsScreen() {
  return (
    <div className="px-5 pb-6">
      <div className="pt-4 mb-5">
        <h1 className="text-2xl font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>
          Skills & Stats
        </h1>
        <p className="text-xs text-muted-foreground mt-1">Freelance portfolio overview</p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-2.5 mb-5">
        {[
          { label: "Projects Delivered", value: "6+", color: VIOLET },
          { label: "Industries Served", value: "5", color: LIME },
          { label: "Certifications", value: "3", color: SKY },
          { label: "Years Active", value: "3+", color: ORANGE },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-2xl bg-white/4 border border-white/8 p-3.5">
            <p className="text-[10px] text-muted-foreground mb-1.5">{label}</p>
            <p className="text-2xl font-bold leading-none" style={{ fontFamily: "Outfit, sans-serif", color }}>
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Service bar chart */}
      <div className="rounded-2xl bg-white/4 border border-white/8 p-4 mb-4">
        <p className="text-sm font-semibold text-foreground/90 mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
          Projects by Service
        </p>
        <ResponsiveContainer width="100%" height={130}>
          <BarChart data={serviceData} barCategoryGap="30%">
            <XAxis
              dataKey="s"
              tick={{ fontSize: 9, fill: "#7070a0", fontFamily: "DM Mono, monospace" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide />
            <Tooltip content={<ServiceTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
            <Bar dataKey="count" radius={[5, 5, 0, 0]}>
              {serviceData.map((_, i) => (
                <Cell key={i} fill={[VIOLET, LIME, ORANGE, SKY, PINK][i % 5]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Industry donut */}
      <div className="rounded-2xl bg-white/4 border border-white/8 p-4 mb-4">
        <p className="text-sm font-semibold text-foreground/90 mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
          Industries Served
        </p>
        <div className="flex items-center gap-4">
          <ResponsiveContainer width={100} height={100}>
            <PieChart>
              <Pie
                data={industryData}
                cx={45}
                cy={45}
                innerRadius={28}
                outerRadius={45}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {industryData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex-1 space-y-1.5">
            {industryData.map(({ name, value, color }) => (
              <div key={name} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                <span className="text-[11px] text-foreground/65 flex-1">{name}</span>
                <span className="text-[10px] font-mono text-foreground/80">{value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skills radar */}
      <div className="rounded-2xl bg-white/4 border border-white/8 p-4 mb-4">
        <p className="text-sm font-semibold text-foreground/90 mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>
          Skill Proficiency
        </p>
        <ResponsiveContainer width="100%" height={180}>
          <RadarChart data={skillsData}>
            <PolarGrid stroke="rgba(255,255,255,0.08)" />
            <PolarAngleAxis
              dataKey="skill"
              tick={{ fontSize: 9, fill: "#7070a0", fontFamily: "DM Mono, monospace" }}
            />
            <Radar name="Level" dataKey="value" stroke={VIOLET} fill={VIOLET} fillOpacity={0.22} strokeWidth={1.5} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Technical skills */}
      <div className="rounded-2xl bg-white/4 border border-white/8 p-4">
        <p className="text-sm font-semibold text-foreground/90 mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>
          Tools & Platforms
        </p>
        <div className="flex flex-wrap gap-1.5">
          {technicalSkills.map((t) => (
            <span key={t} className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactScreen() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("hello@nidhimaurya.in");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="px-5 pb-6">
      <div className="pt-4 mb-5">
        <h1 className="text-2xl font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>
          {"Let's Connect"}
        </h1>
        <p className="text-xs text-muted-foreground mt-1">Open to freelance projects</p>
      </div>

      {/* Availability */}
      <div
        className="rounded-2xl p-4 mb-4 border"
        style={{
          background: `linear-gradient(135deg, ${LIME}12 0%, transparent 100%)`,
          borderColor: `${LIME}28`,
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: LIME }} />
          <span className="text-xs font-semibold" style={{ color: LIME }}>Available for Projects</span>
        </div>
        <p className="text-xs text-foreground/55 leading-relaxed">
          Accepting new freelance clients. Specialising in SEO, web design, social media management,
          and full-stack digital marketing strategy.
        </p>
      </div>

      {/* Services offered */}
      <div className="rounded-2xl bg-white/4 border border-white/8 p-4 mb-4">
        <p className="text-sm font-semibold text-foreground/90 mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>
          Services I Offer
        </p>
        <div className="space-y-2">
          {[
            { service: "Search Engine Optimisation (SEO)", icon: TrendingUp, color: VIOLET },
            { service: "Social Media Management", icon: Users, color: LIME },
            { service: "Google Ads & Facebook Ads", icon: Zap, color: SKY },
            { service: "Content Marketing & Strategy", icon: BookOpen, color: ORANGE },
            { service: "WordPress Website Design", icon: Globe, color: PINK },
          ].map(({ service, icon: Icon, color }) => (
            <div key={service} className="flex items-center gap-2.5">
              <Icon size={12} style={{ color, flexShrink: 0 }} />
              <span className="text-xs text-foreground/70">{service}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contact info */}
      <div className="space-y-2.5 mb-5">
        {[
          { label: "Email", value: "hello@nidhimaurya.in", icon: Mail, action: handleCopy, actionLabel: copied ? "Copied!" : "Copy" },
          { label: "Location", value: "India", icon: MapPin, action: null, actionLabel: null },
          { label: "Portfolio", value: "nidhimaurya.in", icon: Globe, action: null, actionLabel: "Visit" },
        ].map(({ label, value, icon: Icon, action, actionLabel }) => (
          <div key={label} className="flex items-center gap-3 rounded-xl bg-white/4 border border-white/8 px-4 py-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${VIOLET}20` }}>
              <Icon size={13} style={{ color: VIOLET }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-muted-foreground">{label}</p>
              <p className="text-sm font-medium text-foreground/85 truncate">{value}</p>
            </div>
            {action && actionLabel && (
              <button
                onClick={action}
                className="text-[11px] px-2.5 py-1 rounded-lg font-medium"
                style={{ background: `${VIOLET}20`, color: VIOLET }}
              >
                {actionLabel}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Social links */}
      <div className="grid grid-cols-2 gap-2.5 mb-5">
        {[
          { platform: "LinkedIn", handle: "Nidhi Maurya", color: "#0a66c2" },
          { platform: "Instagram", handle: "@nidhimaurya", color: "#e1306c" },
          { platform: "Twitter / X", handle: "@nidhimaurya", color: "#1d9bf0" },
          { platform: "WhatsApp", handle: "Contact via WA", color: "#25d366" },
        ].map(({ platform, handle, color }) => (
          <button key={platform} className="rounded-xl border border-white/8 bg-white/4 px-3 py-3 text-left hover:border-white/16 transition-colors">
            <p className="text-[10px] text-muted-foreground mb-0.5">{platform}</p>
            <p className="text-xs font-mono truncate" style={{ color }}>{handle}</p>
          </button>
        ))}
      </div>

      {/* CTA */}
      <button
        className="w-full py-4 rounded-2xl font-semibold text-sm transition-all active:scale-[0.98]"
        style={{
          background: `linear-gradient(135deg, ${VIOLET} 0%, #9333ea 100%)`,
          color: "#fff",
          fontFamily: "Outfit, sans-serif",
        }}
      >
        Get in Touch <ArrowUpRight className="inline w-4 h-4 ml-1" />
      </button>
      <p className="text-center text-[10px] text-muted-foreground/45 mt-3">Typically responds within 24 hours</p>
    </div>
  );
}

const TABS: { id: Tab; icon: typeof Home; label: string }[] = [
  { id: "home", icon: Home, label: "Home" },
  { id: "work", icon: Briefcase, label: "Work" },
  { id: "stats", icon: BarChart2, label: "Skills" },
  { id: "contact", icon: Mail, label: "Contact" },
];

const screenVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 16 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -16 }),
};

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const prevTabRef = useRef<Tab>("home");
  const tabOrder = TABS.map((t) => t.id);
  const direction = tabOrder.indexOf(activeTab) >= tabOrder.indexOf(prevTabRef.current) ? 1 : -1;

  const handleTabChange = (tab: Tab) => {
    prevTabRef.current = activeTab;
    setActiveTab(tab);
  };

  const screenMap: Record<Tab, JSX.Element> = {
    home: <HomeScreen />,
    work: <WorkScreen />,
    stats: <StatsScreen />,
    contact: <ContactScreen />,
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 overflow-auto"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% -10%, #1a0a3e 0%, #07070d 60%)",
        fontFamily: "DM Sans, sans-serif",
      }}
    >
      {/* Ambient glows */}
      <div
        className="fixed top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${VIOLET}16 0%, transparent 70%)`, filter: "blur(50px)" }}
      />
      <div
        className="fixed bottom-1/3 left-1/3 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${LIME}0c 0%, transparent 70%)`, filter: "blur(60px)" }}
      />

      {/* Phone frame */}
      <div
        className="relative flex flex-col overflow-hidden shadow-2xl"
        style={{
          width: 390,
          height: 844,
          borderRadius: 44,
          background: "#0d0d1a",
          border: "1.5px solid rgba(255,255,255,0.1)",
          boxShadow: "0 60px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.08)",
          flexShrink: 0,
        }}
      >
        {/* Status bar */}
        <div className="flex-shrink-0 flex items-center justify-between px-8 pt-3 pb-1">
          <span className="text-[12px] font-semibold text-white/80" style={{ fontFamily: "Outfit, sans-serif" }}>9:41</span>
          <div className="flex items-center gap-1.5">
            <div className="flex items-end gap-0.5 h-3">
              {[3, 5, 7, 9].map((h, i) => (
                <div key={i} className="w-1 rounded-sm" style={{ height: h, background: i < 3 ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.25)" }} />
              ))}
            </div>
            <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
              <path d="M7.5 9.5a1 1 0 110 2 1 1 0 010-2z" fill="rgba(255,255,255,0.85)" />
              <path d="M4.5 7C5.5 5.8 6.8 5 7.5 5s2 .8 3 2" stroke="rgba(255,255,255,0.85)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              <path d="M2 4.5C3.5 2.8 5.4 1.5 7.5 1.5s4 1.3 5.5 3" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            </svg>
            <div className="flex items-center gap-0.5">
              <div className="w-5 h-2.5 rounded-sm border border-white/45 relative">
                <div className="absolute inset-0.5 right-1 rounded-[1px]" style={{ background: "rgba(255,255,255,0.85)" }} />
              </div>
              <div className="w-0.5 h-1.5 rounded-r-sm bg-white/45" />
            </div>
          </div>
        </div>

        {/* Dynamic island */}
        <div className="flex justify-center mb-1">
          <div className="w-28 h-7 rounded-full" style={{ background: "#000" }} />
        </div>

        {/* Screen content */}
        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeTab}
              custom={direction}
              variants={screenVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              {screenMap[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom nav */}
        <div
          className="flex-shrink-0 border-t"
          style={{ background: "rgba(13,13,26,0.97)", borderColor: "rgba(255,255,255,0.07)" }}
        >
          <div className="flex items-center px-2 pt-2 pb-7">
            {TABS.map(({ id, icon: Icon, label }) => {
              const active = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => handleTabChange(id)}
                  className="flex-1 flex flex-col items-center gap-1 py-2 rounded-xl"
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200"
                    style={{ background: active ? `${VIOLET}28` : "transparent" }}
                  >
                    <Icon size={15} style={{ color: active ? VIOLET : "rgba(150,150,190,0.45)", transition: "color 0.2s" }} />
                  </div>
                  <span
                    className="text-[9px] font-medium"
                    style={{ color: active ? VIOLET : "rgba(150,150,190,0.35)", fontFamily: "DM Mono, monospace", transition: "color 0.2s" }}
                  >
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Page footer */}
      <p className="fixed bottom-4 left-0 right-0 text-center text-[10px] font-mono pointer-events-none" style={{ color: "rgba(255,255,255,0.18)" }}>
        Nidhi Maurya · Digital Marketing Portfolio
      </p>
    </div>
  );
}
