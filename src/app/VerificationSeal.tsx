// src/app/VerificationSeal.tsx
'use client'

import { motion } from 'framer-motion'

type SealProps = {
  status: 'verified' | 'fraud';
};

// The change is on the line below this comment
const sealVariants = {
  hidden: { scale: 0, rotate: -90 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 260, damping: 20 },
  },
} as const; // <--- ADD 'as const' HERE

export const VerificationSeal = ({ status }: SealProps) => {
  const isVerified = status === 'verified';
  const color = isVerified ? 'var(--verified-color)' : 'var(--fraud-color)';
  const text = isVerified ? 'Verified' : 'Fraud Alert';

  return (
    <motion.div
      variants={sealVariants}
      initial="hidden"
      animate="visible"
      style={{
        width: 150,
        height: 150,
        borderRadius: '50%',
        border: `4px solid ${color}`,
        color: color,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        fontFamily: 'var(--font-poppins)',
        fontWeight: '700',
        textTransform: 'uppercase',
        margin: '2rem auto 0',
      }}
    >
      <span style={{ fontSize: '2rem', lineHeight: '1' }}>
        {isVerified ? '✓' : '✗'}
      </span>
      {text}
    </motion.div>
  );
};