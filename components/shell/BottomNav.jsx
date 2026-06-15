'use client';
import Link from 'next/link';
import { Home, Grid, Send, CreditCard, MoreHorizontal } from 'lucide-react';

const TABS = [
  { id: 'home',     label: 'Home',     Icon: Home },
  { id: 'pay',      label: 'Pay',      Icon: Send },
  { id: 'invest',   label: 'Invest',   Icon: Grid },
  { id: 'cards',    label: 'Cards',    Icon: CreditCard },
  { id: 'more',     label: 'More',     Icon: MoreHorizontal },
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
