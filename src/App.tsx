import { motion, AnimatePresence, useAnimationFrame } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Zap, Sparkles } from "lucide-react";
import LegacyScoreQuiz from "./components/LegacyScoreQuiz";
import SignupModal from "./components/SignupModal";
import ErrorBoundary from "./components/ErrorBoundary";

import afterlyLogo from './assets/afterly-logo.png';
import legacyViz from './assets/legacy-visualization.png';
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
      const x = 5 + Math.random() * 90; // Wider horizontal spread
      setActive(prev => [...prev, { id, idx, x }]);
      setTimeout(() => setActive(prev => prev.filter(b => b.id !== id)), 8200);
    };

    spawn();
    // stagger spawns: new bubble every 2.5–4 s for slower pace
    let t: ReturnType<typeof setTimeout>;
    const schedule = () => {
      t = setTimeout(() => { spawn(); schedule(); }, 2500 + Math.random() * 1500);
    };
    schedule();
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full h-40 overflow-hidden pointer-events-none select-none" aria-hidden>
      {active.map(({ id, idx, x }) => {
        const b = BUBBLES[idx];
        const isAmber = b.accent === "amber";
        return (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 140 }}
            animate={{ opacity: [0, 0.95, 0.95, 0], y: -180 }}
            transition={{ duration: 8, ease: "easeOut", times: [0, 0.15, 0.85, 1] }}
            style={{ left: `${x}%`, position: "absolute", bottom: 0, x: "-50%" }}
          >
            <div className={`
              px-4 py-3 rounded-2xl whitespace-nowrap
              border backdrop-blur-md shadow-lg
              ${isAmber
                ? "border-amber-400/20 bg-amber-400/[0.03]"
                : "border-rose-400/20 bg-rose-400/[0.03]"}
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

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-40 px-8 md:px-14 py-6 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs uppercase tracking-[0.25em] text-teal-500/70 font-mono"
          >
            afterly
          </motion.div>
          <motion.button
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => navigate(currentPath === "/investors" ? "/" : "/investors")}
            className="text-xs uppercase tracking-[0.2em] text-gray-500 hover:text-teal-400 transition-colors duration-500 font-mono"
          >
            {currentPath === "/investors" ? "← back" : "Investor Deck"}
          </motion.button>
        </nav>

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
                  src="/afterly.pdf#toolbar=0&navpanes=0"
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
                className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-20 pb-10 text-center overflow-hidden"
              >
                {/* ── Logo ── */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative mb-4"
                >
                  <div className="absolute inset-0 rounded-full bg-teal-500/10 blur-[50px] scale-[1.6] pointer-events-none" />
                  <motion.img
                    src={afterlyLogo}
                    alt="Afterly"
                    className="relative w-[min(58vw,300px)] md:w-[260px] lg:w-[300px] h-auto mx-auto drop-shadow-[0_0_40px_rgba(20,184,166,0.3)]"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>

                {/* ── Bubble Ticker — fills the gap between logo and headline ── */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full mb-5 mt-3"
                >
                  <BubbleTicker />
                </motion.div>

                {/* ── Headline ── */}
                <motion.h1
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[10vw] sm:text-[3.8rem] md:text-[4.5rem] lg:text-[5rem] leading-[0.9] font-medium tracking-tighter mb-4 text-white"
                >
                  Your{" "}
                  <span className="font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-500">
                    Legacy.
                  </span>
                  <br />Secured.
                </motion.h1>

                {/* ── Tagline ── */}
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="text-sm md:text-base text-gray-400 font-light max-w-sm mx-auto mb-8 leading-relaxed tracking-wide"
                >
                  The quantum-resistant digital legacy operating system.
                </motion.p>

                {/* ── CTA ── */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center gap-4"
                >
                  <button
                    id="get-score-cta"
                    onClick={() => setIsQuizOpen(true)}
                    className="group relative inline-flex items-center justify-center gap-2 px-9 py-3.5 rounded-full bg-white text-black overflow-hidden transition-transform duration-500 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                  >
                    <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                    <Zap className="w-3.5 h-3.5 relative z-10" />
                    <span className="relative z-10 text-xs uppercase tracking-[0.18em] font-bold">
                      Get Your Score
                    </span>
                  </button>

                  <span className="text-[10px] uppercase tracking-[0.22em] text-gray-600 font-mono">
                    60 seconds · free
                  </span>

                  <button
                    onClick={() => handleOpenSignup("more")}
                    className="text-[11px] text-gray-500 hover:text-teal-400 underline underline-offset-4 decoration-gray-700 hover:decoration-teal-400/50 transition-all duration-500 font-mono uppercase tracking-widest"
                  >
                    Find Out More
                  </button>
                </motion.div>
              </motion.section>

              {/* ════════════════════════════════════════
                  FEATURES — Everything organized.
              ════════════════════════════════════════ */}
              <section className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-32 grid md:grid-cols-2 gap-16 items-center border-t border-white/5">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-teal-500 mb-4">Features</p>
                  <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-5 text-white leading-tight">
                    Everything organized.<br />
                    <span className="font-serif italic font-light text-gray-400">Nothing overlooked.</span>
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
                    Afterly protects your life's digital footprint — from crypto keys and cloud accounts to messages for loved ones — all secured by military-grade, quantum-resistant encryption.
                  </p>
                  <ul className="space-y-4">
                    {[
                      { icon: <QuantumVaultIcon    size={28} />, title: "Quantum Vault",         desc: "Military-grade, post-quantum protection for your digital assets." },
                      { icon: <MessagesFutureIcon  size={28} />, title: "Messages for the Future", desc: "Time-locked capsules that keep your voice alive when it matters most." },
                      { icon: <CrisisBinderIcon    size={28} />, title: "Crisis-Proof Binder",    desc: "Emergency-ready access to vital documents and data." },
                      { icon: <DigitalWillIcon     size={28} />, title: "Digital Asset Will",     desc: "Legally backed coverage for your digital holdings across platforms." },
                      { icon: <LegacyScoreIcon     size={28} />, title: "LegacyScore™",           desc: "A 30-second snapshot of your digital preparedness." },
                    ].map(({ icon, title, desc }) => (
                      <li key={title} className="flex items-start gap-3 group">
                        <span className="text-teal-400 mt-0.5 flex-shrink-0">{icon}</span>
                        <span className="text-sm text-gray-300 leading-relaxed">
                          <strong className="text-white font-medium">{title}</strong>
                          <span className="text-gray-500"> — </span>
                          {desc}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl overflow-hidden border border-white/8 bg-black/40 aspect-[4/3] flex items-center justify-center relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                  <img
                    src={legacyViz}
                    alt="Digital Legacy Visualization"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-6 left-6 z-20">
                    <p className="text-[10px] text-teal-400 font-mono uppercase tracking-[0.2em] mb-1">Visualization</p>
                    <p className="text-white text-sm font-medium tracking-tight">Secure Your Digital Future</p>
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
