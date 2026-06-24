import Link from 'next/link';

// Lock icon — white stroke, 24×24
function IconLock() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
      <circle cx="12" cy="16" r="1.2" fill="#fff" stroke="none" />
    </svg>
  );
}

// Pie-chart / categorise icon — clean 2-slice pie, white stroke 24×24
function IconChart() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v9l6.3 4.5" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <div style={{
      minHeight: '100dvh',
      background: '#111',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      fontFamily: '"Public Sans", sans-serif',
    }}>
      <div style={{ maxWidth: 440, width: '100%' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
          <img src="/assets/logo/dbs-mark-red.png" alt="DBS" style={{ width: 44, height: 44, borderRadius: 11 }} />
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.3px' }}>GenZ FI Concept</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>DBS digibank · Usability Testing</div>
          </div>
        </div>

        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, marginBottom: 32 }}>
          Two financial intelligence features for Singapore Gen Z. Tap a flow to begin the prototype.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Flow 1 */}
          <Link href="/payday" style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 12,
              padding: '20px 20px',
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: 'linear-gradient(135deg,#ff1a1a,#a30000)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <IconLock />
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>Flow 1</div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: '#fff' }}>Payday Interception</div>
                </div>
              </div>
              <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.5)', lineHeight: 1.55 }}>
                Salary notification → DBS login → Framework selection → Savings lock → Manage & opt-out
              </div>
            </div>
          </Link>

          {/* Flow 1B — over-spend scenario */}
          <Link href="/payday/shopee" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '14px 16px', cursor: 'pointer', marginLeft: 16 }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: '#ee4d2d', display: 'grid', placeItems: 'center', flexShrink: 0, fontSize: 16 }}>🛍️</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>Flow 1B</div>
                <div style={{ fontSize: 14.5, fontWeight: 700, color: '#fff' }}>Payday Lock over-spend</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 2, lineHeight: 1.45 }}>Shopee checkout → blocked → switch off the lock</div>
              </div>
              <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round"><path d="M5 9h7M9 5l4 4-4 4" /></svg>
            </div>
          </Link>

          {/* Flow 2 */}
          <Link href="/categorise" style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 12,
              padding: '20px 20px',
              cursor: 'pointer',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: 'linear-gradient(135deg,#0a6ed1,#054a8f)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <IconChart />
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>Flow 2</div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: '#fff' }}>Auto-Categorisation</div>
                </div>
              </div>
              <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.5)', lineHeight: 1.55 }}>
                Apple Pay tap-to-pay · DBS app transaction review · Shopee in-app spend categorisation
              </div>
            </div>
          </Link>
        </div>

        <div style={{ marginTop: 36, textAlign: 'center', fontSize: 12.5, color: 'rgba(255,255,255,0.2)', lineHeight: 1.6 }}>
          Prototype for usability testing only · Not a real banking product<br/>
          PSYKHE Pte Ltd © 2026
        </div>
      </div>
    </div>
  );
}
