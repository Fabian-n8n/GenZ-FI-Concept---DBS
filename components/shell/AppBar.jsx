'use client';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function AppBar({ title, onBack, backHref, right }) {
  const router = useRouter();

  function handleBack() {
    if (onBack) { onBack(); return; }
    if (backHref) { router.push(backHref); return; }
    router.back();
  }

  return (
    <div className="app-bar">
      <button className="icon-btn" onClick={handleBack} aria-label="Back">
        <ChevronLeft size={26} />
      </button>
      <span className="app-bar__title">{title}</span>
      <div style={{ width: 44 }}>{right}</div>
    </div>
  );
}
