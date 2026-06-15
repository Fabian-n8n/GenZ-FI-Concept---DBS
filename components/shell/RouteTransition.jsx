'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const DURATION = 0.25;
const EASE = [0.22, 1, 0.36, 1];

function getDirection() {
  if (typeof window === 'undefined') return 1;
  return window.__routeDirection === -1 ? -1 : 1;
}

export function setNextRouteDirection(direction = 1) {
  if (typeof window !== 'undefined') {
    window.__routeDirection = direction < 0 ? -1 : 1;
  }
}

export default function RouteTransition({ children }) {
  const pathname = usePathname();
  const direction = getDirection();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.__routeDirection = 1;
    }
  }, [pathname]);

  return (
    <AnimatePresence mode="sync" initial={false}>
      <motion.div
        key={pathname}
        custom={direction}
        initial={{ x: direction > 0 ? 28 : -28 }}
        animate={{ x: 0 }}
        exit={{ x: direction > 0 ? -20 : 20 }}
        transition={{ duration: DURATION, ease: EASE }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          minHeight: '100dvh',
          background: 'var(--color-bg)',
          overflow: 'hidden',
          willChange: 'transform',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
