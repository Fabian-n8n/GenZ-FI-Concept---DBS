// Category line icons — 1.5–1.8px stroke, rounded caps/joins, 24×24 grid.
// Ported directly from Claude Design handoff (screens_applepay.jsx › CatIcon).

const s = { strokeLinecap: 'round', strokeLinejoin: 'round' };

export default function CatIcon({ cat, size = 22 }) {
  const sw = size <= 20 ? '1.6' : '1.8';

  const paths = {
    Dining: (
      <>
        {/* steaming bowls */}
        <path d="M4.5 11h15a7.5 7.5 0 01-15 0z" />
        <path d="M9 4c-1 1-1 2 0 3M12 3.4c-1 1.1-1 2.2 0 3.3M15 4c-1 1-1 2 0 3" />
      </>
    ),
    Shopping: (
      <>
        {/* shopping bag */}
        <path d="M6 2l-1.5 4h15L18 2" />
        <rect x="3" y="6" width="18" height="15" rx="2" />
        <path d="M9 6v3a3 3 0 006 0V6" />
      </>
    ),
    Grocery: (
      <>
        {/* shopping cart */}
        <path d="M3 4h2l2.2 11.2a1.5 1.5 0 001.5 1.2h7.6a1.5 1.5 0 001.5-1.15L20 8.5H6.2" />
        <circle cx="9.5" cy="20" r="1.3" fill="currentColor" stroke="none" />
        <circle cx="17" cy="20" r="1.3" fill="currentColor" stroke="none" />
      </>
    ),
    Transportation: (
      <>
        {/* bus */}
        <path d="M5.2 13l1.5-5.1A2.2 2.2 0 018.8 6.3h6.4a2.2 2.2 0 012.1 1.6L18.8 13M5 13h14v4.2H5z" />
        <circle cx="8.5" cy="17.2" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="15.5" cy="17.2" r="1.4" fill="currentColor" stroke="none" />
      </>
    ),
    Subscriptions: (
      <>
        {/* cycle/repeat arrows */}
        <path d="M5 9a7 7 0 0111.5-3L19 8" />
        <path d="M19 3.5V8h-4.5" />
        <path d="M19 15a7 7 0 01-11.5 3L5 16" />
        <path d="M5 20.5V16h4.5" />
      </>
    ),
    Entertainment: (
      <>
        {/* ticket */}
        <path d="M4 8.5a2 2 0 012-2h12a2 2 0 012 2v1.2a1.6 1.6 0 000 3.1v1.7a2 2 0 01-2 2H6a2 2 0 01-2-2v-1.7a1.6 1.6 0 000-3.1z" />
        <path d="M14 6.7v10.6" strokeDasharray="1.4 2" />
      </>
    ),
    'Bills & Utilities': (
      <>
        {/* receipt/invoice */}
        <path d="M5 3h14v16l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5L5 19V3z" />
        <path d="M9 8h6M9 12h6M9 16h3" />
      </>
    ),
    Investment: (
      <>
        {/* trending chart */}
        <polyline points="3 17 9 11 13 15 21 7" />
        <polyline points="15 7 21 7 21 13" />
      </>
    ),
    Insurance: (
      <>
        {/* shield */}
        <path d="M12 2l8 3v5c0 5-3.5 9.7-8 11C7.5 19.7 4 15 4 10V5l8-3z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
    Rent: (
      <>
        {/* home */}
        <path d="M3 11l9-8 9 8" />
        <path d="M5 9.5V21h5v-5h4v5h5V9.5" />
      </>
    ),
  };

  const inner = paths[cat];
  if (!inner) return null;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={sw} {...s}
      style={{ display: 'block' }}>
      {inner}
    </svg>
  );
}
