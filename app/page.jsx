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
              <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['Lock screen', 'Login', 'Frameworks', 'Lock success', 'Shopee blocked', 'Manage'].map(s => (
                  <span key={s} style={{ fontSize: 11.5, background: 'rgba(255,0,0,0.15)', color: 'rgba(255,80,80,0.9)', borderRadius: 4, padding: '3px 8px', fontWeight: 600 }}>{s}</span>
                ))}
              </div>
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
              <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['Apple Pay', 'DBS App', 'Shopee', 'Category picker', 'Breakdown', 'Edit'].map(s => (
                  <span key={s} style={{ fontSize: 11.5, background: 'rgba(10,110,209,0.2)', color: 'rgba(80,160,255,0.9)', borderRadius: 4, padding: '3px 8px', fontWeight: 600 }}>{s}</span>
                ))}
              </div>
            </div>
          </Link>
        </div>

        <div style={{ marginTop: 36, textAlign: 'center', fontSize: 12.5, color: 'rgba(255,255,255,0.2)', lineHeight: 1.6 }}>
          Prototype for usability testing only · Not a real banking product<br/>
          DBS Bank © 2026
        </div>
      </div>
    </div>
  );
}
