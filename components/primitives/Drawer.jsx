'use client';

import { motion } from 'framer-motion';

export default function Drawer({ children, onClose, onBackdrop }) {
  const handleClose = onClose || onBackdrop;

  return (
    <motion.div
      className="drawer-backdrop"
      onClick={handleClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="drawer"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="drawer__handle" />
        {children}
      </motion.div>
    </motion.div>
  );
}
