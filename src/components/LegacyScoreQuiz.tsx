import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface Question {
  id: string;
  category: string;
  text: string;
  options: {
    text: string;
    points: number;
  }[];
}

const questions: Question[] = [
  {
    id: 'q1',
    category: 'Digital Asset Organization',
    text: 'Do you maintain an updated list of your digital assets (e.g., crypto wallets, cloud accounts, domains, etc.)?',
    options: [
      { text: 'Yes, it\'s complete and updated regularly', points: 20 },
      { text: 'Somewhat, but it\'s incomplete', points: 10 },
      { text: 'No, I haven\'t started', points: 0 }
    ]
  },
  {
    id: 'q2',
    category: 'Digital Asset Organization',
    text: 'Are your digital files and credentials stored in a secure, centralized location?',
    options: [
      { text: 'Yes — in an encrypted vault or password manager', points: 20 },
      { text: 'Partially — scattered across accounts', points: 10 },
      { text: 'No — unorganized or offline only', points: 0 }
    ]
  },
  {
    id: 'q3',
    category: 'Security & Access',
    text: 'How do you secure access to your key accounts and devices?',
    options: [
      { text: 'Multi-factor + biometric authentication', points: 20 },
      { text: 'Passwords only', points: 10 },
      { text: 'Minimal or no protection', points: 0 }
    ]
  },
  {
    id: 'q4',
    category: 'Security & Access',
    text: 'Are your crypto keys, wallets, or sensitive data stored with post-quantum or hardware-level security?',
    options: [
      { text: 'Yes — quantum/hardware-level protection', points: 20 },
      { text: 'Basic encryption', points: 10 },
      { text: 'Unsure or none', points: 0 }
    ]
  },
  {
    id: 'q5',
    category: 'Legal Readiness',
    text: 'Do your estate documents (will, trust, power of attorney) explicitly cover your digital assets?',
    options: [
      { text: 'Yes — reviewed and current', points: 15 },
      { text: 'Somewhat — included but outdated', points: 8 },
      { text: 'No — not yet addressed', points: 0 }
    ]
  },
  {
    id: 'q6',
    category: 'Legal Readiness',
    text: 'Have you designated digital beneficiaries or executors?',
    options: [
      { text: 'Yes — with legal documentation', points: 15 },
      { text: 'Verbal or informal plan only', points: 8 },
      { text: 'No plan in place', points: 0 }
    ]
  },
  {
    id: 'q7',
    category: 'Family Communication',
    text: 'Have you discussed or documented how to access your key accounts or assets with family or trusted contacts?',
    options: [
      { text: 'Yes — they know exactly what to do', points: 15 },
      { text: 'Partially — we\'ve talked but not documented', points: 8 },
      { text: 'No — not yet', points: 0 }
    ]
  },
  {
    id: 'q8',
    category: 'Family Communication',
    text: 'Do you have time-locked or event-triggered messages prepared for loved ones?',
    options: [
      { text: 'Yes — I\'ve recorded messages', points: 15 },
      { text: 'Not yet, but I plan to', points: 8 },
      { text: 'No', points: 0 }
    ]
  },
  {
    id: 'q9',
    category: 'Emergency Preparedness',
    text: 'If something happened tomorrow, could someone access your key information within 48 hours?',
    options: [
      { text: 'Yes — via a crisis binder or plan', points: 15 },
      { text: 'Possibly — it would take effort', points: 8 },
      { text: 'No — they\'d struggle to find it', points: 0 }
    ]
  },
  {
    id: 'q10',
    category: 'Emotional Legacy',
    text: 'Have you left written, audio, or video messages for family to receive in the future?',
    options: [
      { text: 'Yes — securely stored and scheduled', points: 15 },
      { text: 'Not yet — but I intend to', points: 8 },
      { text: 'No — haven\'t thought about it', points: 0 }
    ]
  }
];

interface LegacyScoreQuizProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSignup: () => void;
}

export default function LegacyScoreQuiz({ isOpen, onClose, onOpenSignup }: LegacyScoreQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (questionId: string, points: number) => {
    const newAnswers = { ...answers, [questionId]: points };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      calculateScore(newAnswers);
    }
  };

  const calculateScore = (allAnswers: Record<string, number>) => {
    const totalScore = Object.values(allAnswers).reduce((sum, points) => sum + points, 0);
    setScore(totalScore);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Prepared';
    if (score >= 50) return 'Developing';
    return 'At Risk';
  };

  const getScoreDescription = (score: number) => {
    if (score >= 80) return 'Your legacy is protected and future-ready.';
    if (score >= 50) return 'You\'re on the right path — tighten your digital security and sharing systems.';
    return 'Important gaps remain — your loved ones may struggle to access your key assets.';
  };

  const getRecommendations = (score: number) => {
    if (score >= 80) {
      return {
        quickWins: [
          'Maintain your current security practices',
          'Consider advanced quantum-resistant features'
        ],
        nextLevel: [
          'Explore Afterly\'s premium features',
          'Share your success with family'
        ]
      };
    } else if (score >= 50) {
      return {
        quickWins: [
          'Consolidate your passwords into a single encrypted vault',
          'Create one "Crisis-Proof Binder" with key access info'
        ],
        nextLevel: [
          'Add digital clauses to your estate plan',
          'Record a short Message for the Future for each key contact'
        ]
      };
    } else {
      return {
        quickWins: [
          'Start with a basic digital asset inventory',
          'Set up a simple password manager'
        ],
        nextLevel: [
          'Create your first digital legacy plan',
          'Begin conversations with family about digital access'
        ]
      };
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-900 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">LegacyScore™ Assessment</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {!showResults ? (
            <>
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-teal-400 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Question */}
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-4">
                  <span className="text-teal-400 text-sm font-medium">
                    {questions[currentQuestion].category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-6">
                  {questions[currentQuestion].text}
                </h3>

                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(questions[currentQuestion].id, option.points)}
                      className="w-full text-left p-4 bg-gray-800 hover:bg-gray-700 rounded-xl border border-gray-700 hover:border-teal-400 transition-all duration-200"
                    >
                      <span className="text-white">{option.text}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </>
          ) : (
            /* Results */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              {/* Score Display */}
              <div className="mb-8">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#374151"
                      strokeWidth="8"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#14b8a6"
                      strokeWidth="8"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: "0 251" }}
                      animate={{ strokeDasharray: `${(score / 100) * 251} 251` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-3xl font-bold ${getScoreColor(score)}`}>
                      {score}
                    </span>
                  </div>
                </div>
                
                <h3 className={`text-2xl font-semibold ${getScoreColor(score)} mb-2`}>
                  {getScoreLabel(score)}
                </h3>
                <p className="text-gray-400 mb-8">
                  {getScoreDescription(score)}
                </p>
              </div>

              {/* Recommendations */}
              <div className="text-left mb-8">
                <h4 className="text-xl font-semibold text-white mb-4">Your Personalized Plan</h4>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-green-400 font-medium mb-3 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Quick Wins
                    </h5>
                    <ul className="space-y-2 text-gray-300">
                      {getRecommendations(score).quickWins.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-400 mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-teal-400 font-medium mb-3 flex items-center">
                      <ArrowRight className="w-5 h-5 mr-2" />
                      Next Level Actions
                    </h5>
                    <ul className="space-y-2 text-gray-300">
                      {getRecommendations(score).nextLevel.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-teal-400 mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={resetQuiz}
                  className="flex items-center justify-center px-6 py-3 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-800 transition-colors"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retake Assessment
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onClose();
                    onOpenSignup();
                  }}
                  className="bg-teal-400 text-black px-8 py-3 rounded-xl font-semibold hover:bg-teal-300 transition-colors"
                >
                  Start Your Legacy with Afterly
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
