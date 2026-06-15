'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import StatusBar from '@/components/shell/StatusBar';
import AppBar from '@/components/shell/AppBar';
import Donut from '@/components/primitives/Donut';
import Switch from '@/components/primitives/Switch';
import Alert from '@/components/primitives/Alert';
import { Check, ChevronRight, HelpCircle } from 'lucide-react';
import { fwById } from '@/lib/frameworks';

function ManageContent() {
  const router = useRouter();
  const params = useSearchParams();
  const fwId = params.get('fw') || 'warren';
  const locked = params.get('locked') !== '0';
  const fw = fwById(fwId);
  const [showAlert, setShowAlert] = useState(false);

  return (
    <div className="screen screen--white" style={{ position: 'relative' }}>
      <StatusBar dark />
      <AppBar title="Payday Lock" onBack={() => router.push(`/payday/more?fw=${fwId}&locked=${locked ? 1 : 0}`)} />

      <div className="scroll" style={{ padding: '12px 20px 24px' }}>
        {/* Locked amount card */}
        <div className="card" style={{ padding: '22px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-tertiary)' }}>Currently locked</div>
          <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-0.5px', fontVariantNumeric: 'tabular-nums', marginTop: 2 }}>{fw.lockAmount}</div>
          <div style={{ margin: '16px 0 14px', display: 'flex', justifyContent: 'center' }}>
            <Donut segments={fw.segments} size={138} />
          </div>
          <span className="chip chip--ok"><Check size={13} /> Active · unlocks 27 Jul 2026</span>
        </div>

        {/* Active framework */}
        <div className="overline" style={{ margin: '24px 0 10px' }}>Active framework</div>
        <div className="card" style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 15.5, fontWeight: 700 }}>{fw.tag} · {fw.name}</div>
            <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 3 }}>{fw.split}</div>
          </div>
          <button
            onClick={() => router.push(`/payday/frameworks?mode=change&current=${fwId}`)}
            style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--color-brand)', fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-sans)', display: 'inline-flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            Change <ChevronRight size={15} />
          </button>
        </div>

        {/* Toggle */}
        <div className="card" style={{ padding: 16, marginTop: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15.5, fontWeight: 700 }}>Payday Lock</div>
            <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 2 }}>Auto-lock savings every payday</div>
          </div>
          <Switch on={locked} onChange={() => setShowAlert(true)} />
        </div>

        {/* Info banner */}
        <div style={{ marginTop: 16, display: 'flex', gap: 10, background: 'var(--dbs-red-50)', borderRadius: 4, padding: '14px 16px' }}>
          <HelpCircle size={18} color="var(--color-brand)" style={{ flexShrink: 0, marginTop: 1 }} />
          <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--dbs-gray-700)' }}>
            Changes apply from your <strong>next payday</strong>. Your current lock stays active until <strong>27 July</strong>.
          </div>
        </div>

        <p style={{ fontSize: 12.5, color: 'var(--text-tertiary)', lineHeight: 1.5, marginTop: 16, textAlign: 'center' }}>
          Switching framework or turning off Payday Lock needs Face ID confirmation.
        </p>
      </div>

      {showAlert && (
        <Alert
          title="Turn off Payday Lock?"
          text="Your locked SGD 3,200.00 will return to your spending balance. You'll confirm with Face ID next."
          actions={[
            { label: 'Cancel', onClick: () => setShowAlert(false) },
            { label: 'Turn off', danger: true, onClick: () => { setShowAlert(false); router.push(`/payday/success?variant=off&fw=${fwId}`); } },
          ]}
        />
      )}
    </div>
  );
}

export default function ManagePage() {
  return (
    <Suspense fallback={<div className="screen" />}>
      <ManageContent />
    </Suspense>
  );
}
