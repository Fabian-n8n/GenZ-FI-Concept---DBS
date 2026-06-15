export default function StatusBar({ dark = false, transparent = false }) {
  const color = dark ? '#1a1f24' : '#fff';
  return (
    <div
      className="status-bar"
      style={{
        color,
        background: transparent ? 'transparent' : undefined,
        paddingTop: 56, // account for Dynamic Island
      }}
    >
      <span>9:27</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {/* Signal bars */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill={color}>
          <rect x="0"  y="8"  width="3" height="4" rx="0.5" />
          <rect x="4"  y="5"  width="3" height="7" rx="0.5" />
          <rect x="8"  y="2"  width="3" height="10" rx="0.5" />
          <rect x="12" y="0"  width="3" height="12" rx="0.5" />
          <rect x="16" y="0"  width="1" height="0" rx="0.5" opacity="0" />
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round">
          <path d="M1 4.5C3.7 1.8 8 1.2 11.5 3" opacity="0.4"/>
          <path d="M2.5 6.5C4.5 4.5 7 3.8 10 5"/>
          <path d="M4.5 8.5C5.8 7.2 7.2 6.8 9 7.5"/>
          <circle cx="8" cy="11" r="1" fill={color} stroke="none"/>
        </svg>
        {/* Battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke={color} strokeOpacity="0.35"/>
          <rect x="2" y="2" width="16" height="8" rx="2" fill={color}/>
          <path d="M23 4v4a2 2 0 000-4z" fill={color} opacity="0.4"/>
        </svg>
      </div>
    </div>
  );
}
