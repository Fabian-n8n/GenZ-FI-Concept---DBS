'use client';
import { Home, LayoutGrid } from 'lucide-react';

/* DBS-style custom glyphs — matched to the real digibank tab bar */
function PayTransferIcon({ size = 24, strokeWidth = 2, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
      {/* circulating transfer arrows */}
      <path d="M3.5 8.5A8 8 0 0 1 18 6.2" />
      <path d="M18 3.2v3h-3" />
      <path d="M20.5 15.5A8 8 0 0 1 6 17.8" />
      <path d="M6 20.8v-3h3" />
      {/* dollar */}
      <path d="M12 8v8" />
      <path d="M14 9.6c-.5-.6-1.2-.9-2-.9-1.1 0-2 .7-2 1.6 0 1 .9 1.3 2 1.5s2 .6 2 1.6c0 .9-.9 1.6-2 1.6-.8 0-1.5-.3-2-.9" />
    </svg>
  );
}

function DigiWealthIcon({ size = 24, strokeWidth = 2, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
      {/* axes */}
      <path d="M4 4v15a1 1 0 0 0 1 1h15" />
      {/* trending line */}
      <path d="M7.5 15l3.2-3.6 2.8 2.6L20 8" />
      {/* arrow head */}
      <path d="M16.5 8H20v3.4" />
    </svg>
  );
}

const TABS = [
  { id: 'home',   label: 'Home',           Icon: Home },
  { id: 'pay',    label: 'Pay & Transfer', Icon: PayTransferIcon },
  { id: 'wealth', label: 'digiWealth',     Icon: DigiWealthIcon },
  { id: 'more',   label: 'More',           Icon: LayoutGrid },
];

export default function BottomNav({ active = 'home', onNav, baseHref = '' }) {
  return (
    <nav className="bottom-nav">
      {TABS.map(({ id, label, Icon }) => (
        <button
          key={id}
          className={`bottom-nav__item${active === id ? ' active' : ''}`}
          onClick={() => onNav?.(id)}
        >
          <Icon size={22} strokeWidth={active === id ? 2.2 : 1.8} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
