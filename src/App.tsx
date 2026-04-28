import { motion, AnimatePresence, useAnimationFrame } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  Zap,
  Sparkles,
  ArrowRight,
  Play,
  Check,
  ShieldCheck,
  Lock,
  Users,
  Mail,
  Cloud,
  Coins,
  MessageSquare,
  FileText,
  Key
} from "lucide-react";
import LegacyScoreQuiz from "./components/LegacyScoreQuiz";
import SignupModal from "./components/SignupModal";
import ErrorBoundary from "./components/ErrorBoundary";

import afterlyLogo from './assets/afterly-logo.png';
import legacyViz from './assets/legacy-visualization.png';
import investorDeck from './assets/afterly.pdf';
import {
  QuantumVaultIcon,
  MessagesFutureIcon,
  CrisisBinderIcon,
  DigitalWillIcon,
  LegacyScoreIcon,
  QuantumEncryptionIcon,
  ZeroTrustIcon,
  GlobalComplianceIcon,
} from './components/FeatureIcons';

// ─── Animated SVG Background ─────────────────────────────────────────────────
function AnimatedBackground() {
  const t = useRef(0);
  const pathRefs = useRef<SVGPathElement[]>([]);
  const orbRefs = useRef<SVGCircleElement[]>([]);

  useAnimationFrame((_, delta) => {
    t.current += delta * 0.0003;
    const time = t.current;

    // Sinuous flowing lines
    pathRefs.current.forEach((path, i) => {
      if (!path) return;
      const offset = i * (Math.PI / 3);
      const amp = 60 + i * 20;
      const freq = 0.4 + i * 0.08;
      const yBase = 150 + i * 120;
      const pts: string[] = [];
      for (let x = -20; x <= 1060; x += 15) {
        const y = yBase + amp * Math.sin(freq * (x / 200) + time + offset);
        pts.push(`${x},${y}`);
      }
      path.setAttribute("d", `M ${pts.join(" L ")}`);
      path.style.opacity = String(0.08 + 0.04 * Math.sin(time * 0.7 + i));
    });

    // Floating orbs
    orbRefs.current.forEach((circle, i) => {
      if (!circle) return;
      const speed = 0.18 + i * 0.07;
      const rx = 180 + i * 55;
      const ry = 80 + i * 35;
      const cx = 512 + rx * Math.cos(time * speed + (i * Math.PI * 2) / 6);
      const cy = 400 + ry * Math.sin(time * speed * 0.6 + (i * Math.PI * 2) / 6);
      circle.setAttribute("cx", String(cx));
      circle.setAttribute("cy", String(cy));
      const r = 3 + 2.5 * Math.sin(time * 1.2 + i * 1.3);
      circle.setAttribute("r", String(r));
      circle.style.opacity = String(0.25 + 0.2 * Math.sin(time * 0.9 + i));
    });
  });

  return (
    <svg
      viewBox="0 0 1024 800"
      preserveAspectRatio="xMidYMid slice"
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden
    >
      <defs>
        {/* Radial gradient pool at center */}
        <radialGradient id="pool" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
        </radialGradient>
        {/* Stroke gradient for lines */}
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#14b8a6" stopOpacity="0" />
          <stop offset="30%" stopColor="#14b8a6" stopOpacity="0.5" />
          <stop offset="70%" stopColor="#6366f1" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </linearGradient>
        {/* Glow filter for orbs */}
        <filter id="orbGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="lineGlow" x="-5%" y="-100%" width="110%" height="300%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Hexagonal clip / pattern */}
        <pattern id="hexPat" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
          <polygon
            points="30,2 58,17 58,47 30,62 2,47 2,17"
            fill="none"
            stroke="#14b8a6"
            strokeWidth="0.4"
            strokeOpacity="0.12"
          />
        </pattern>
      </defs>

      {/* Hex grid overlay */}
      <rect width="1024" height="800" fill="url(#hexPat)" />

      {/* Central glow pool */}
      <ellipse cx="512" cy="400" rx="520" ry="400" fill="url(#pool)" />

      {/* Sinuous flowing lines */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path
          key={i}
          ref={(el) => { if (el) pathRefs.current[i] = el; }}
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth={1.2 - i * 0.12}
          filter="url(#lineGlow)"
        />
      ))}

      {/* Floating orbs */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <circle
          key={i}
          ref={(el) => { if (el) orbRefs.current[i] = el; }}
          fill={i % 2 === 0 ? "#14b8a6" : "#818cf8"}
          filter="url(#orbGlow)"
        />
      ))}

      {/* Static concentric arcs */}
      {[220, 320, 420].map((r, i) => (
        <circle
          key={r}
          cx="512"
          cy="400"
          r={r}
          fill="none"
          stroke="#14b8a6"
          strokeWidth="0.5"
          strokeOpacity={0.05 - i * 0.012}
          strokeDasharray="4 12"
        />
      ))}
    </svg>
  );
}

// ─── Bubble data ──────────────────────────────────────────────────────────────
const BUBBLES = [
  { tag: "Problem",  text: "Traditional estate planning ignores digital assets", accent: "rose" },
  { tag: "Problem",  text: "Families lose billions in digital assets annually", accent: "rose" },
  { tag: "Problem",  text: "Crypto holders face unique inheritance challenges", accent: "rose" },
  { tag: "Problem",  text: "Social media accounts become digital graveyards", accent: "rose" },
  { tag: "Problem",  text: "Legal frameworks (RUFADAA) are complex & underutilized", accent: "rose" },
  { tag: "$5.6B+",   text: "in unclaimed crypto held by deceased owners", accent: "amber" },
  { tag: "68%",      text: "of Americans have no estate plan whatsoever", accent: "amber" },
  { tag: "90%",      text: "of digital assets not accounted for in wills", accent: "amber" },
  { tag: "6–18 mo",  text: "average time resolving a digital estate", accent: "amber" },
  { tag: "Countless",text: "lost passwords, locked accounts & family disputes", accent: "amber" },
];

// ─── Floating Bubbles (rise from gap between logo and headline) ──────────────
interface SpawnedBubble { id: number; idx: number; x: number; }

function BubbleTicker() {
  const [active, setActive] = useState<SpawnedBubble[]>([]);
  const counter = useRef(0);

  useEffect(() => {
    const spawn = () => {
      const id = counter.current++;
      const idx = Math.floor(Math.random() * BUBBLES.length);
      // Concentrated around the central axis (40% to 60% range)
      const x = 40 + Math.random() * 20; 
      setActive(prev => [...prev, { id, idx, x }]);
      setTimeout(() => setActive(prev => prev.filter(b => b.id !== id)), 10200);
    };

    spawn();
    let t: ReturnType<typeof setTimeout>;
    const schedule = () => {
      t = setTimeout(() => { spawn(); schedule(); }, 3000 + Math.random() * 2000);
    };
    schedule();
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden pointer-events-none select-none" aria-hidden>
      {active.map(({ id, idx, x }) => {
        const b = BUBBLES[idx];
        const isAmber = b.accent === "amber";
        return (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 400, scale: 0.8 }}
            animate={{ opacity: [0, 0.8, 0.4, 0], y: -100, scale: 1 }}
            transition={{ duration: 10, ease: "linear", times: [0, 0.2, 0.6, 1] }}
            style={{ left: `${x}%`, position: "absolute", bottom: 0, x: "-50%" }}
          >
            <div className={`
              px-5 py-3.5 rounded-2xl whitespace-nowrap
              border backdrop-blur-xl shadow-2xl
              ${isAmber
                ? "border-amber-400/20 bg-amber-400/[0.02]"
                : "border-rose-400/20 bg-rose-400/[0.02]"}
            `}>
              {/* Stat / label */}
              <div className={`
                text-sm font-semibold tracking-tight leading-none mb-1
                ${isAmber ? "text-amber-300" : "text-rose-400"}
              `}>
                {isAmber
                  ? <span className="font-mono text-base">{b.tag}</span>
                  : <span className="italic font-serif text-xs uppercase tracking-widest opacity-80">{b.tag}</span>
                }
              </div>
              {/* Body text */}
              <p className="text-[11px] text-gray-400 font-light leading-snug max-w-[160px] whitespace-normal">
                {b.text}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}


// ─── Header ───────────────────────────────────────────────────────────────────
function Header({ onOpenSignup, onNavigate, currentPath }: {
  onOpenSignup: (type: "presale" | "more") => void;
  onNavigate: (path: string) => void;
  currentPath: string;
}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 bg-[#04080f]/60 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Investor Info */}
        <div className="flex-1 hidden md:flex items-center">
          <button
            onClick={() => onNavigate(currentPath === "/investors" ? "/" : "/investors")}
            className="text-[11px] font-bold text-teal-400 hover:text-teal-300 transition-colors uppercase tracking-[0.2em]"
          >
            {currentPath === "/investors" ? "← Back Home" : "Investor Info"}
          </button>
        </div>

        {/* Center: Logo */}
        <div className="flex-shrink-0 flex justify-center items-center">
          <button onClick={() => onNavigate('/')} className="hover:opacity-90 transition-all group px-4">
            <img
              src={afterlyLogo}
              alt="Afterly"
              className="h-12 md:h-14 w-auto transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex-1 flex items-center justify-end gap-6">
          <button className="hidden sm:block text-[11px] font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-[0.2em]">
            Log in
          </button>
          <button
            onClick={() => onOpenSignup('presale')}
            className="px-6 py-2.5 bg-white text-black text-[11px] font-black rounded-lg hover:bg-teal-400 transition-all active:scale-95 uppercase tracking-[0.2em]"
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [signupType, setSignupType] = useState<"presale" | "more">("presale");
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
  };

  const handleOpenSignup = (type: "presale" | "more") => {
    setSignupType(type);
    setIsSignupOpen(true);
  };

  return (
    <ErrorBoundary>
      <main className="bg-[#04080f] text-white min-h-screen flex flex-col overflow-x-hidden relative font-sans selection:bg-teal-500/30">

        {/* SVG animated background */}
        <AnimatedBackground />

        <Header
          onOpenSignup={handleOpenSignup}
          onNavigate={navigate}
          currentPath={currentPath}
        />

        {/* Pages */}
        <AnimatePresence mode="wait">
          {currentPath === "/investors" ? (
            <motion.section
              key="investors"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-28 pb-16 w-full max-w-6xl mx-auto"
            >
              <h1 className="text-5xl md:text-7xl font-extralight tracking-tight mb-3 text-center">
                Investor <em className="italic text-teal-400 not-italic font-light">Deck</em>
              </h1>
              <p className="text-gray-500 mb-10 text-center uppercase tracking-widest text-[10px] font-mono">
                Seed Round · Confidential
              </p>
              <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(20,184,166,0.08)] bg-black/30 backdrop-blur-xl" style={{ height: "75vh" }}>
                <iframe
                  src={`${investorDeck}#toolbar=0&navpanes=0`}
                  className="w-full h-full border-none"
                  title="Afterly Investor Deck"
                />
              </div>
              <button
                onClick={() => handleOpenSignup("more")}
                className="mt-8 px-8 py-3 border border-teal-500/40 text-teal-400 text-xs uppercase tracking-widest rounded-full hover:bg-teal-500/10 transition-colors duration-500 font-mono"
              >
                Request Data Room Access
              </button>
            </motion.section>
          ) : (
            <>
              <motion.section
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-32 pb-16 text-center overflow-hidden"
              >
                {/* ── Badge ── */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 mb-8"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold tracking-[0.15em] text-teal-400 uppercase">
                    Military-Grade. Post-Quantum Secure.
                  </span>
                </motion.div>

                {/* ── Headline ── */}
                <motion.h1
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[12vw] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6.5rem] leading-[0.95] font-medium tracking-tighter mb-6 text-white"
                >
                  Your Legacy.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-500">
                    Protected.
                  </span>
                </motion.h1>

                {/* ── Tagline ── */}
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="text-base md:text-lg text-gray-400 font-light max-w-xl mx-auto mb-10 leading-relaxed tracking-wide"
                >
                  Afterly protects your life's digital footprint — from crypto keys and cloud accounts to messages for loved ones — all secured by military-grade, quantum-resistant encryption.
                </motion.p>

                {/* ── CTA ── */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
                >
                  <button
                    id="get-score-cta"
                    onClick={() => setIsQuizOpen(true)}
                    className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 rounded-xl bg-white text-black transition-transform duration-500 hover:scale-105 active:scale-95 focus:outline-none"
                  >
                    <span className="relative z-10 text-[14px] font-bold tracking-tight">
                      Secure Your Digital Future
                    </span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <button
                    className="flex items-center gap-3 px-10 py-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
                  >
                    <span className="text-[14px] font-medium">See How It Works</span>
                    <Play className="w-3 h-3 fill-current" />
                  </button>
                </motion.div>

                {/* ── Social Proof ── */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-gray-800 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${i + 15}`} alt="User" />
                      </div>
                    ))}
                  </div>
                  <p className="text-[12px] text-gray-500 font-light">
                    Trusted by thousands preparing for <span className="text-gray-300 font-normal">today and tomorrow.</span>
                  </p>
                </motion.div>

                <div className="absolute inset-0 pointer-events-none opacity-40">
                  <BubbleTicker />
                </div>
              </motion.section>

              {/* FEATURES GRID */}
              <section className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 py-32 border-t border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {[
                    {
                      icon: <QuantumVaultIcon size={32} />,
                      title: "Quantum Vault",
                      desc: "Military-grade, post-quantum encryption keeps your digital assets untouchable.",
                      bullets: ["Crypto Keys & Wallets", "Cloud Accounts", "Passwords & 2FA", "Secure Notes"]
                    },
                    {
                      icon: <MessagesFutureIcon size={32} />,
                      title: "Messages for the Future",
                      desc: "Time-locked capsules that keep your voice alive when it matters most.",
                      bullets: ["Video & Audio Messages", "Letters & Notes", "Choose Recipients", "Set Unlock Time"]
                    },
                    {
                      icon: <CrisisBinderIcon size={32} />,
                      title: "Crisis-Proof Binder",
                      desc: "Emergency-ready access to vital documents and data when loved ones need it.",
                      bullets: ["IDs & Documents", "Medical Info", "Financial Records", "Emergency Plans"]
                    },
                    {
                      icon: <DigitalWillIcon size={32} />,
                      title: "Digital Asset Will",
                      desc: "Legally backed coverage for your digital holdings across all platforms.",
                      bullets: ["Social Media", "Domain Names", "Digital Assets", "Legal Validity"]
                    },
                    {
                      icon: <LegacyScoreIcon size={32} />,
                      title: "LegacyScore™",
                      desc: "A 30-second snapshot of your digital preparedness and readiness.",
                      bullets: ["Security Strength", "Account Coverage", "Recovery Ready", "Action Plan"]
                    }
                  ].map((card) => (
                    <div key={card.title} className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 group">
                      <div className="text-teal-400 mb-6 group-hover:scale-110 transition-transform duration-500">
                        {card.icon}
                      </div>
                      <h3 className="text-lg font-medium text-white mb-3 tracking-tight">{card.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed mb-6">
                        {card.desc}
                      </p>
                      <ul className="space-y-2.5">
                        {card.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-center gap-2 text-[12px] text-gray-400">
                            <Check className="w-3 h-3 text-teal-500/60" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* ════════════════════════════════════════
                  VISUALIZATION SECTION
              ════════════════════════════════════════ */}
              <section className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 py-32 grid lg:grid-cols-2 gap-16 items-center border-t border-white/5">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-teal-500 mb-4">Visualization</p>
                  <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 text-white leading-tight">
                    Secure Your<br />
                    <span className="font-serif italic font-light text-gray-400">Digital Future.</span>
                  </h2>
                  <div className="space-y-8 mt-12">
                    {[
                      { icon: <ShieldCheck className="w-5 h-5" />, title: "Military-Grade Security", text: "Post-quantum encryption protects against today's and tomorrow's threats." },
                      { icon: <Lock className="w-5 h-5" />, title: "You're Always in Control", text: "You decide what to store, who to share with, and when they can access it." },
                      { icon: <Users className="w-5 h-5" />, title: "Peace of Mind for You", text: "When life happens, they won't have to navigate the digital world alone." },
                    ].map((item) => (
                      <div key={item.title} className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-teal-400 flex-shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="text-white font-medium text-base mb-1">{item.title}</h4>
                          <p className="text-sm text-gray-500 leading-relaxed">{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative aspect-square rounded-3xl bg-white/[0.01] border border-white/5 flex items-center justify-center p-8 overflow-hidden group">
                  {/* Subtle pulsing glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.05),transparent_70%)] animate-pulse" />

                  {/* Central Hub */}
                  <div className="relative z-20 w-32 h-32 rounded-full bg-black border-4 border-white/10 flex items-center justify-center shadow-[0_0_60px_rgba(20,184,166,0.15)] group-hover:scale-105 transition-transform duration-700">
                    <div className="absolute inset-0 rounded-full border border-teal-500/20 animate-ping opacity-20" />
                    <img src={afterlyLogo} alt="Afterly" className="w-16 opacity-80" />
                  </div>

                  {/* Nodes — Circular Layout */}
                  <div className="absolute inset-0">
                    {[
                      { label: "Email", icon: <Mail size={16} />, angle: 0 },
                      { label: "Cloud", icon: <Cloud size={16} />, angle: 45 },
                      { label: "Crypto", icon: <Coins size={16} />, angle: 90 },
                      { label: "Messages", icon: <MessageSquare size={16} />, angle: 135 },
                      { label: "Vault", icon: <Lock size={16} />, angle: 180 },
                      { label: "Legacy", icon: <Users size={16} />, angle: 225 },
                      { label: "Documents", icon: <FileText size={16} />, angle: 270 },
                      { label: "Passwords", icon: <Key size={16} />, angle: 315 },
                    ].map((node, i) => {
                      const rad = (node.angle * Math.PI) / 180;
                      const dist = 42; // percentage from center
                      const x = 50 + Math.cos(rad) * dist;
                      const y = 50 + Math.sin(rad) * dist;

                      return (
                        <div
                          key={i}
                          className="absolute w-14 h-14 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5"
                          style={{ left: `${x}%`, top: `${y}%` }}
                        >
                          <div className="w-12 h-12 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-teal-400 group-hover:border-teal-500/30 transition-all duration-500 shadow-xl">
                            {node.icon}
                          </div>
                          <span className="text-[9px] uppercase tracking-widest text-gray-500 font-mono">{node.label}</span>
                          {/* Connection Line */}
                          <div
                            className="absolute top-1/2 left-1/2 w-32 h-[1px] bg-gradient-to-r from-teal-500/20 to-transparent origin-left -z-10"
                            style={{ transform: `rotate(${node.angle + 180}deg)` }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* ════════════════════════════════════════
                  SECURITY
              ════════════════════════════════════════ */}
              <section className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 py-24 border-t border-white/5">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-teal-500 mb-4">Security</p>
                <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4 text-white">
                  Security that <span className="font-serif italic font-light text-gray-400">outlasts technology.</span>
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-12 max-w-xl">
                  Afterly employs AES-256 and post-quantum cryptography, multi-factor and biometric authentication, and a Zero Trust architecture — ensuring your information remains secure through generations.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { title: "Quantum-Resistant Encryption", desc: "Future-proof protection against quantum decryption threats using NIST-approved algorithms.", icon: <QuantumEncryptionIcon size={32} /> },
                    { title: "Zero Trust Architecture", desc: "\"Never trust, always verify.\" Every access point is authenticated and encrypted.", icon: <ZeroTrustIcon size={32} /> },
                    { title: "Global Compliance", desc: "Aligned with UFADAA, GDPR, and ISO 27001 for digital inheritance and data protection.", icon: <GlobalComplianceIcon size={32} /> },
                  ].map(({ title, desc, icon }) => (
                    <div key={title} className="p-6 rounded-2xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.05] transition-colors duration-500">
                      <span className="text-teal-400 block mb-3">{icon}</span>
                      <h3 className="text-white font-medium text-sm mb-2">{title}</h3>
                      <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ════════════════════════════════════════
                  PERSONAS
              ════════════════════════════════════════ */}
              <section className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 py-24 border-t border-white/5">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-teal-500 mb-4">Who It's For</p>
                <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-12 text-white">
                  Designed for every type of <span className="font-serif italic font-light text-gray-400">legacy.</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "For Digital Professionals",
                      desc: "Safeguard your crypto keys, login credentials, and digital IP with military-grade encryption and hardware integration.",
                      bullets: ["Protect seed phrases and crypto wallets", "Manage cross-account credentials", "Quantum Vault for irreversible data protection"],
                      color: "from-teal-500/10",
                    },
                    {
                      title: "For Families & Parents",
                      desc: "Bring peace of mind to those you love. Create Messages for the Future and Crisis-Proof Binders so your family can act quickly.",
                      bullets: ["Leave personalized video or voice messages", "Emergency document access for family members", "Guided setup for trusted contacts"],
                      color: "from-violet-500/10",
                    },
                    {
                      title: "For High-Net-Worth Individuals",
                      desc: "A quantum-secure, compliance-ready solution built for complex estates and business holdings.",
                      bullets: ["Comprehensive asset mapping and beneficiary controls", "ISO 27001 and SOC 2 Type II security compliance", "Private estate management integrations"],
                      color: "from-amber-500/10",
                    },
                    {
                      title: "For Tech-Savvy Millennials",
                      desc: "A modern alternative to traditional estate planning — fully digital, privacy-first, and future-proof.",
                      bullets: ["Automated digital inheritance setup", "Simple UX, end-to-end encryption", "Blockchain integration for asset verification"],
                      color: "from-emerald-500/10",
                    },
                  ].map(({ title, desc, bullets, color }) => (
                    <div key={title} className={`p-6 rounded-2xl border border-white/8 bg-gradient-to-br ${color} to-transparent hover:border-white/12 transition-colors duration-500`}>
                      <h3 className="text-white font-medium text-base mb-2">{title}</h3>
                      <p className="text-gray-400 text-xs leading-relaxed mb-4">{desc}</p>
                      <ul className="space-y-1.5">
                        {bullets.map(b => (
                          <li key={b} className="text-xs text-gray-500 flex items-start gap-2">
                            <span className="text-teal-500 mt-0.5 flex-shrink-0">→</span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* ════════════════════════════════════════
                  FINAL CTA
              ════════════════════════════════════════ */}
              <section className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 py-24 border-t border-white/5 text-center">
                <div className="max-w-lg mx-auto">
                  <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4 text-white">
                    Because you are more than your assets —<br />
                    <span className="font-serif italic font-light text-teal-400">you're a legacy.</span>
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed mb-10">
                    Take control of your digital and emotional inheritance today. Afterly makes it simple, secure, and human.
                  </p>
                  <button
                    onClick={() => setIsQuizOpen(true)}
                    className="group relative inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-teal-500 text-black font-bold text-sm uppercase tracking-[0.15em] overflow-hidden hover:scale-105 transition-transform duration-500"
                  >
                    <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                    <Sparkles className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">Start Your Legacy</span>
                  </button>
                </div>
              </section>

              {/* ════════════════════════════════════════
                  FOOTER
              ════════════════════════════════════════ */}
              <footer className="relative z-10 w-full border-t border-white/5 py-8 text-center">
                <p className="text-xs text-gray-600 font-mono">© {new Date().getFullYear()} Afterly. Built to Outlast You.</p>
              </footer>

            </>
          )}
        </AnimatePresence>

        {/* Modals */}
        <LegacyScoreQuiz
          isOpen={isQuizOpen}
          onClose={() => setIsQuizOpen(false)}
          onOpenSignup={(type) => handleOpenSignup(type)}
        />
        <SignupModal
          isOpen={isSignupOpen}
          onClose={() => setIsSignupOpen(false)}
          type={signupType}
        />
      </main>
    </ErrorBoundary>
  );
}
