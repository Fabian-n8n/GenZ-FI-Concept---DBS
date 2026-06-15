'use client';

import { motion } from 'framer-motion';

export default function Switch({ on, onChange }) {
  return (
    <motion.button
      role="switch"
      aria-checked={on}
      onClick={() => onChange?.(!on)}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.1 }}
      style={{
        width: 51,
        height: 31,
        borderRadius: 999,
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        background: on ? 'var(--color-brand)' : 'var(--dbs-gray-300)',
        position: 'relative',
        flex: 'none',
      }}
    >
      <motion.span
        animate={{ left: on ? 22 : 2 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          top: 2,
          width: 27,
          height: 27,
          borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
        }}
      />
    </motion.button>
  );
}
