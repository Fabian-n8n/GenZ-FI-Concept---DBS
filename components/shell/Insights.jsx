'use client';
// Shared Insights tab content — identical across Flow 1 (payday) and Flow 2 (dbs-app).
// Card 1 → transaction history · Card 2 → Payday Lock summary.
import { useRouter } from 'next/navigation';
import { BarChart2, TrendingUp, ChevronRight } from 'lucide-react';

const cardStyle = {
  width: '100%', textAlign: 'left', cursor: 'pointer',
  background: 'var(--color-surface)', border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-tile)', boxShadow: 'var(--shadow-card)',
  padding: 16, display: 'flex', gap: 14, alignItems: 'center',
  fontFamily: 'var(--font-sans)',
};

export default function Insights() {
  const router = useRouter();
  return (
    <div style={{ paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <button style={cardStyle} onClick={() => router.push('/categorise/dbs-app/history')}>
        <div style={{ width: 40, height: 40, borderRadius: 4, background: 'var(--dbs-red-50)', display: 'grid', placeItems: 'center', color: 'var(--color-brand)', flexShrink: 0 }}>
          <BarChart2 size={22} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>You spent more than usual yesterday</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>SGD 304 above your daily average.</div>
        </div>
        <ChevronRight size={18} color="var(--text-tertiary)" style={{ flexShrink: 0 }} />
      </button>

      <button style={cardStyle} onClick={() => router.push('/payday/manage?fw=warren&locked=1')}>
        <div style={{ width: 40, height: 40, borderRadius: 4, background: 'var(--dbs-green-50)', display: 'grid', placeItems: 'center', color: 'var(--color-positive)', flexShrink: 0 }}>
          <TrendingUp size={22} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>You're on track to save SGD 3,200</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>Your payday plan is working.</div>
        </div>
        <ChevronRight size={18} color="var(--text-tertiary)" style={{ flexShrink: 0 }} />
      </button>
    </div>
  );
}
