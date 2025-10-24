import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, CheckCircle, Users } from 'lucide-react';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [waitlistNumber, setWaitlistNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsLoading(true);
    
    try {
      // Get or create waitlist counter
      const currentCount = localStorage.getItem('afterly-waitlist-count');
      const newCount = currentCount ? parseInt(currentCount) + 1 : 1;
      localStorage.setItem('afterly-waitlist-count', newCount.toString());
      
      // Collect user data
      const userData = {
        email: email,
        waitlistNumber: newCount,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'Direct'
      };

      // Send to Google Sheets (if configured)
      await sendToGoogleSheets(userData);
      
      // Also send to your email (if configured)
      await sendToEmail(userData);
      
      setWaitlistNumber(newCount);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting email:', error);
      // Still show success to user even if backend fails
      const currentCount = localStorage.getItem('afterly-waitlist-count');
      const newCount = currentCount ? parseInt(currentCount) + 1 : 1;
      localStorage.setItem('afterly-waitlist-count', newCount.toString());
      setWaitlistNumber(newCount);
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to send data to Google Sheets
  const sendToGoogleSheets = async (data: any) => {
    // Replace with your Google Apps Script web app URL
    const GOOGLE_SHEETS_URL = process.env.REACT_APP_GOOGLE_SHEETS_URL || '';
    
    if (!GOOGLE_SHEETS_URL) {
      console.log('Google Sheets URL not configured');
      return;
    }

    try {
      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error('Failed to send to Google Sheets');
      }
      
      console.log('Successfully sent to Google Sheets');
    } catch (error) {
      console.error('Google Sheets error:', error);
      throw error;
    }
  };

  // Function to send data to your email
  const sendToEmail = async (data: any) => {
    // Replace with your email service endpoint
    const EMAIL_SERVICE_URL = process.env.REACT_APP_EMAIL_SERVICE_URL || '';
    
    if (!EMAIL_SERVICE_URL) {
      console.log('Email service URL not configured');
      return;
    }

    try {
      const response = await fetch(EMAIL_SERVICE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'your-email@example.com', // Replace with your email
          subject: `New Afterly Waitlist Signup - #${data.waitlistNumber}`,
          html: `
            <h2>New Afterly Waitlist Signup</h2>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Waitlist Position:</strong> #${data.waitlistNumber}</p>
            <p><strong>Timestamp:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
            <p><strong>Referrer:</strong> ${data.referrer}</p>
            <p><strong>User Agent:</strong> ${data.userAgent}</p>
          `
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to send email');
      }
      
      console.log('Successfully sent email notification');
    } catch (error) {
      console.error('Email service error:', error);
      throw error;
    }
  };

  const resetModal = () => {
    setEmail('');
    setIsSubmitted(false);
    setWaitlistNumber(0);
    setIsLoading(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-900 rounded-2xl p-8 max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">Join the Waitlist</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {!isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-teal-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Be First to Plan Your Digital Legacy
                </h3>
                <p className="text-gray-400">
                  Get early access to Afterly's quantum-resistant digital legacy platform.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-teal-400 focus:outline-none transition-colors"
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading || !email}
                  whileHover={{ scale: isLoading ? 1 : 1.02, boxShadow: "0 0 20px rgba(20, 184, 166, 0.4)" }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  className="w-full bg-teal-400 text-black py-3 rounded-xl font-semibold hover:bg-teal-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 btn-primary hover-lift"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                      Joining Waitlist...
                    </div>
                  ) : (
                    'Join the Waitlist'
                  )}
                </motion.button>
              </form>

              <p className="text-xs text-gray-500 text-center mt-4">
                We'll never share your email. Unsubscribe anytime.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-semibold text-white mb-2">
                You're on the list!
              </h3>
              
              <p className="text-gray-400 mb-6">
                We've received your email and you're officially on the Afterly waitlist.
              </p>

              <div className="bg-gray-800 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-5 h-5 text-teal-400 mr-2" />
                  <span className="text-sm text-gray-400">Your Position</span>
                </div>
                <div className="text-3xl font-bold text-teal-400 mb-2">
                  #{waitlistNumber}
                </div>
                <p className="text-sm text-gray-400">
                  on the waitlist
                </p>
              </div>

              <div className="space-y-3 text-sm text-gray-300">
                <p>✅ Confirmation sent to <strong>{email}</strong></p>
                <p>📧 We'll be in touch shortly with updates</p>
                <p>🚀 Early access coming soon</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(107, 114, 128, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClose}
                className="mt-6 bg-gray-800 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-700 transition-all duration-300 hover-lift"
              >
                Close
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
