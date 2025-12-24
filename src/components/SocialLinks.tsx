'use client';

import { motion } from 'framer-motion';
import {
  FiInstagram,
  FiMessageCircle,
  FiMail,
  FiLinkedin,
} from 'react-icons/fi';
import { SiPinterest } from 'react-icons/si';

interface SocialLinksProps {
  variant?: 'footer' | 'navbar' | 'inline';
  size?: 'sm' | 'md' | 'lg';
}

export default function SocialLinks({ variant = 'footer', size = 'md' }: SocialLinksProps) {
  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/_sg_architects?igsh=MXh4OXA3NWZiYjFqZw==',
      icon: FiInstagram,
      color: '#E4405F',
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/YOUR_NUMBER_HERE',
      icon: FiMessageCircle,
      color: '#25D366',
    },
    {
      name: 'Email',
      url: 'mailto:YOUR_EMAIL_HERE@sgarchitects.com',
      icon: FiMail,
      color: '#EA4335',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/YOUR_LINKEDIN_HERE',
      icon: FiLinkedin,
      color: '#0077B5',
    },
    {
      name: 'Pinterest',
      url: 'https://pinterest.com/YOUR_PINTEREST_HERE',
      icon: SiPinterest,
      color: '#E60023',
    },
  ];

  const sizeMap = {
    sm: { icon: 18, gap: 'gap-3' },
    md: { icon: 24, gap: 'gap-4' },
    lg: { icon: 32, gap: 'gap-6' },
  };

  const currentSize = sizeMap[size];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      className={`flex ${currentSize.gap} flex-wrap justify-${variant === 'navbar' ? 'end' : variant === 'inline' ? 'start' : 'start'}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <motion.a
            key={social.name}
            href={social.url}
            target={social.name === 'Email' ? undefined : '_blank'}
            rel={social.name === 'Email' ? undefined : 'noopener noreferrer'}
            variants={itemVariants}
            whileHover={{
              scale: 1.2,
              color: social.color,
            }}
            whileTap={{ scale: 0.95 }}
            className={`text-luxury-grey-light hover:text-luxury-accent transition-colors duration-300 ${
              variant === 'footer' ? 'text-sm' : 'text-base'
            }`}
            title={social.name}
          >
            <Icon size={currentSize.icon} />
          </motion.a>
        );
      })}
    </motion.div>
  );
}
