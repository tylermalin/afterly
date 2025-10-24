import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  Shield,
  Key,
  Heart,
  FileText,
  Clock,
  Cpu,
  Users,
  Briefcase,
  Sparkles,
  ArrowUp,
  Star,
  Zap,
} from "lucide-react";
import LegacyScoreQuiz from "./components/LegacyScoreQuiz";
import SignupModal from "./components/SignupModal";
import ErrorBoundary from "./components/ErrorBoundary";

// Public assets - use direct paths since they're in public folder
const afterlyLogo = '/afterly-logo.png';
const digitalVisual = '/digital-legacy-visual.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const stagger = {
  show: { transition: { staggerChildren: 0.2 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const rotateIn = {
  hidden: { opacity: 0, rotate: -10 },
  show: { opacity: 1, rotate: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function App() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, delay: number}>>([]);
  
  // Debug image URLs
  console.log('Afterly Logo URL:', afterlyLogo);
  console.log('Digital Visual URL:', digitalVisual);
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 100], [1, 0]);

  // Generate particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  // Show scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ErrorBoundary>
      <main className="bg-black text-white min-h-screen flex flex-col overflow-x-hidden relative">
      {/* Particle Background */}
      <div className="particles fixed inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 6,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Hero Section with Logo */}
      <motion.section 
        style={{ opacity }}
        className="flex flex-col items-center justify-center text-center px-6 py-24 bg-gradient-to-b from-gray-900 to-black relative"
      >
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="max-w-3xl"
        >
          {/* Logo */}
          <motion.div variants={scaleIn} className="mb-8">
            <motion.img 
              src={afterlyLogo} 
              alt="Afterly Logo" 
              className="h-32 md:h-40 lg:h-48 xl:h-56 w-auto mx-auto animate-float"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
              onError={(e) => {
                console.error('Logo failed to load:', e);
                e.currentTarget.style.display = 'none';
              }}
            />
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl font-semibold tracking-tight mb-6 gradient-text"
          >
            Built to Outlast You.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-gray-300 mb-8"
          >
            Afterly is the quantum-resistant digital legacy operating system —
            helping you organize, protect, and transfer your digital and
            physical assets with confidence and clarity.
          </motion.p>
          <motion.div variants={fadeUp} className="flex gap-4 justify-center flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 255, 255, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsQuizOpen(true)}
              className="bg-white text-black px-6 py-3 rounded-2xl font-medium hover:bg-gray-200 transition-all duration-300 btn-primary hover-lift"
            >
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Get Your LegacyScore™
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsSignupOpen(true)}
              className="border border-white px-6 py-3 rounded-2xl font-medium hover:bg-white hover:text-black transition-all duration-300 hover-lift glass"
            >
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                Learn More
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Core Features */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-12 px-6 md:px-20 py-24 bg-gray-950"
      >
        <motion.div variants={slideInLeft}>
          <h2 className="text-3xl font-semibold mb-4 gradient-text">
            Everything organized. Nothing overlooked.
          </h2>
          <p className="text-gray-400 mb-6">
            Afterly protects your life's digital footprint — from crypto keys
            and cloud accounts to messages for loved ones — all secured by
            military-grade, quantum-resistant encryption.
          </p>
          <motion.ul variants={stagger} className="space-y-4">
            {[
              {
                icon: Shield,
                title: "Quantum Vault",
                desc: "Military-grade, post-quantum protection for your digital assets.",
              },
              {
                icon: Heart,
                title: "Messages for the Future",
                desc: "Time-locked capsules that keep your voice alive when it matters most.",
              },
              {
                icon: FileText,
                title: "Crisis-Proof Binder",
                desc: "Emergency-ready access to vital documents and data.",
              },
              {
                icon: Key,
                title: "Digital Asset Will",
                desc: "Legally backed coverage for your digital holdings across platforms.",
              },
              {
                icon: Clock,
                title: "LegacyScore™",
                desc: "A 30-second snapshot of your digital preparedness.",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.li
                key={i}
                variants={fadeUp}
                className="flex items-start gap-3"
              >
                <Icon className="text-teal-400 w-6 h-6 flex-shrink-0" />
                <span className="text-gray-300">
                  <strong className="text-white">{title}</strong> — {desc}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div 
          variants={slideInRight} 
          className="rounded-2xl overflow-hidden shadow-xl hover-lift"
          whileHover={{ scale: 1.02 }}
        >
          <motion.img
            src={digitalVisual}
            alt="Digital Legacy Visualization - Secure Your Digital Future"
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onError={(e) => {
              console.error('Digital legacy image failed to load:', e);
              e.currentTarget.style.display = 'none';
            }}
          />
        </motion.div>
      </motion.section>

      {/* Security & Compliance */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="px-6 md:px-20 py-24 bg-black border-t border-gray-800"
      >
        <motion.h2 variants={fadeUp} className="text-3xl font-semibold mb-6">
          Security that outlasts technology.
        </motion.h2>
        <motion.p variants={fadeUp} className="text-gray-400 mb-8 max-w-2xl">
          Afterly employs AES-256 and post-quantum cryptography, multi-factor
          and biometric authentication, and a Zero Trust architecture — ensuring
          your information remains secure through generations.
        </motion.p>
        <motion.div variants={stagger} className="grid md:grid-cols-3 gap-8 text-gray-300">
          {[
            {
              title: "Quantum-Resistant Encryption",
              desc: "Future-proof protection against quantum decryption threats using NIST-approved algorithms.",
            },
            {
              title: "Zero Trust Architecture",
              desc: "\"Never trust, always verify.\" Every access point is authenticated and encrypted.",
            },
            {
              title: "Global Compliance",
              desc: "Aligned with UFADAA, GDPR, and ISO 27001 for digital inheritance and data protection.",
            },
          ].map(({ title, desc }, i) => (
            <motion.div key={i} variants={fadeUp}>
              <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
              <p className="text-gray-400">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Persona Sections */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="px-6 md:px-20 py-24 bg-gray-950 border-t border-gray-800"
      >
        <motion.h2
          variants={fadeUp}
          className="text-4xl font-semibold text-center mb-16"
        >
          Designed for Every Type of Legacy.
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16">
          {[
            {
              icon: Cpu,
              title: "For Digital Professionals",
              desc: "Safeguard your crypto keys, login credentials, and digital IP with military-grade encryption and hardware integration.",
              bullets: [
                "Protect seed phrases and crypto wallets",
                "Manage cross-account credentials",
                "Quantum Vault for irreversible data protection",
              ],
            },
            {
              icon: Users,
              title: "For Families & Parents",
              desc: "Bring peace of mind to those you love. Create Messages for the Future and Crisis-Proof Binders so your family can act quickly and feel supported.",
              bullets: [
                "Leave personalized video or voice messages",
                "Emergency document access for family members",
                "Guided setup for trusted contacts",
              ],
            },
            {
              icon: Briefcase,
              title: "For High-Net-Worth Individuals",
              desc: "A quantum-secure, compliance-ready solution built for complex estates and business holdings.",
              bullets: [
                "Comprehensive asset mapping and beneficiary controls",
                "ISO 27001 and SOC 2 Type II security compliance",
                "Private estate management integrations",
              ],
            },
            {
              icon: Sparkles,
              title: "For Tech-Savvy Millennials",
              desc: "A modern alternative to traditional estate planning — fully digital, privacy-first, and future-proof.",
              bullets: [
                "Automated digital inheritance setup",
                "Simple UX, end-to-end encryption",
                "Blockchain integration for asset verification",
              ],
            },
          ].map(({ icon: Icon, title, desc, bullets }, i) => (
            <motion.div key={i} variants={fadeUp}>
              <Icon className="text-teal-400 w-8 h-8 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-400 mb-4">{desc}</p>
              <ul className="text-gray-400 list-disc pl-6 space-y-1">
                {bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-center py-24 px-6 bg-gradient-to-t from-gray-900 to-black"
      >
        <motion.h2 variants={fadeUp} className="text-4xl font-semibold mb-4">
          Because you are more than your assets — you're a legacy.
        </motion.h2>
        <motion.p variants={fadeUp} className="text-gray-400 mb-8">
          Take control of your digital and emotional inheritance today. Afterly
          makes it simple, secure, and human.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(20, 184, 166, 0.5)" }}
          whileTap={{ scale: 0.98 }}
          variants={fadeUp}
          onClick={() => setIsSignupOpen(true)}
          className="bg-teal-400 text-black px-8 py-3 rounded-2xl font-semibold hover:bg-teal-300 transition-all duration-300 btn-primary hover-lift animate-glow"
        >
          <span className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Start Your Legacy
          </span>
        </motion.button>
      </motion.section>

      {/* Footer */}
      <footer className="text-center py-12 text-gray-500 border-t border-gray-800">
        <p>&copy; {new Date().getFullYear()} Afterly. Built to Outlast You.</p>
      </footer>

      {/* LegacyScore Quiz Modal */}
      <LegacyScoreQuiz 
        isOpen={isQuizOpen} 
        onClose={() => setIsQuizOpen(false)}
        onOpenSignup={() => setIsSignupOpen(true)}
      />

      {/* Signup Modal */}
      <SignupModal 
        isOpen={isSignupOpen} 
        onClose={() => setIsSignupOpen(false)} 
      />

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(20, 184, 166, 0.5)" }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-teal-400 text-black p-3 rounded-full shadow-lg hover:bg-teal-300 transition-all duration-300 z-40"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
      </main>
    </ErrorBoundary>
  );
}
