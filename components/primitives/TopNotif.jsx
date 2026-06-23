'use client';

import { motion } from 'framer-motion';

export default function TopNotif({ title, text, onClick }) {
  return (
    <>
      {/* Blurred scrim behind the notification for readability */}
      <motion.div
        className="top-notif-scrim"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
      />
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
      <div style={{ width: 42, height: 42, borderRadius: 11, background: '#000', display: 'grid', placeItems: 'center', flexShrink: 0, boxShadow: '0 2px 6px rgba(0,0,0,0.18)' }}>
        <img src="/assets/logo/dbs-mark-red.png" alt="DBS" style={{ width: 27, height: 27, display: 'block' }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="top-notif__title">{title}</div>
        <div className="top-notif__text">{text}</div>
      </div>
      </motion.div>
    </>
  );
}
