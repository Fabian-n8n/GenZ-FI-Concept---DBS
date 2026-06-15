'use client';

import { motion } from 'framer-motion';

export default function TopNotif({ title, text, onClick }) {
  return (
    <motion.div
      className="top-notif"
      onClick={onClick}
      role="button"
      tabIndex={0}
      initial={{ y: -14, opacity: 0, scale: 0.98 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: -10, opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      <img src="/assets/logo/dbs-mark-red.png" alt="DBS" style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="top-notif__title">{title}</div>
        <div className="top-notif__text">{text}</div>
      </div>
    </motion.div>
  );
}
