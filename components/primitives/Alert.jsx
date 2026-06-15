'use client';

import { motion } from 'framer-motion';

export default function Alert({ title, text, actions = [] }) {
  return (
    <motion.div
      className="alert-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="alert"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="alert__body">
          <div className="alert__title">{title}</div>
          <div className="alert__text">{text}</div>
        </div>
        <div className="alert__actions">
          {actions.map((a, i) => (
            <button
              key={i}
              className={`alert__action${a.strong ? ' strong' : ''}${a.danger ? ' danger' : ''}`}
              onClick={a.onClick}
            >
              {a.label}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
