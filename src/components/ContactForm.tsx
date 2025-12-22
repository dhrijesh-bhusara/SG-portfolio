'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, scaleIn } from './Animations';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    }
  };

  return (
    <div>
      <AnimatePresence mode="wait">
        {submitStatus === 'success' ? (
          <motion.div
            key="success"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="text-center py-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-luxury-accent/20 mb-6">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                stroke="currentColor"
                className="text-luxury-accent"
              >
                <path d="M8 16 L14 22 L24 10" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="text-h3 mb-4 text-luxury-beige-light">Thank You</h3>
            <p className="text-body-lg text-luxury-grey-light mb-8">
              We&apos;ve received your message and will be in touch soon.
            </p>
            <button
              onClick={() => setSubmitStatus('idle')}
              className="px-6 py-3 border border-luxury-beige-light text-luxury-beige-light hover:bg-luxury-beige-light hover:text-luxury-charcoal transition-all duration-300"
            >
              Send Another Message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm uppercase tracking-wider mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-luxury-charcoal-light border ${
                  errors.name ? 'border-red-500' : 'border-luxury-grey'
                } text-luxury-off-white focus:border-luxury-accent focus:outline-none transition-colors`}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                suppressHydrationWarning
              />
              {errors.name && (
                <p id="name-error" className="text-red-400 text-sm mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm uppercase tracking-wider mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-luxury-charcoal-light border ${
                  errors.email ? 'border-red-500' : 'border-luxury-grey'
                } text-luxury-off-white focus:border-luxury-accent focus:outline-none transition-colors`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                suppressHydrationWarning
              />
              {errors.email && (
                <p id="email-error" className="text-red-400 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm uppercase tracking-wider mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className={`w-full px-4 py-3 bg-luxury-charcoal-light border ${
                  errors.message ? 'border-red-500' : 'border-luxury-grey'
                } text-luxury-off-white focus:border-luxury-accent focus:outline-none transition-colors resize-none`}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
                suppressHydrationWarning
              />
              {errors.message && (
                <p id="message-error" className="text-red-400 text-sm mt-1">
                  {errors.message}
                </p>
              )}
            </div>

            {submitStatus === 'error' && (
              <p className="text-red-400 text-sm">
                There was an error submitting your message. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-luxury-accent text-luxury-black font-medium tracking-wide hover:bg-luxury-beige transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-luxury-accent focus:ring-offset-2 focus:ring-offset-luxury-charcoal"
              suppressHydrationWarning
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
