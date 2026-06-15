'use client';

export default function PhoneFrame({ children, lightStatus = false }) {
  return (
    <div className="phone-stage">
      <div
        style={{
          width: 393,
          height: 852,
          borderRadius: 54,
          background: '#000',
          boxShadow: '0 0 0 1px #333, 0 32px 80px rgba(0,0,0,0.7), inset 0 0 0 1px #444',
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        {/* Dynamic Island */}
        <div style={{
          position: 'absolute',
          top: 12,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 126,
          height: 37,
          background: '#000',
          borderRadius: 20,
          zIndex: 100,
        }} />

        {/* Screen content */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 54,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {children}
        </div>

        {/* Side buttons (decorative) */}
        <div style={{ position: 'absolute', left: -3, top: 120, width: 3, height: 36, background: '#2a2a2a', borderRadius: '2px 0 0 2px' }} />
        <div style={{ position: 'absolute', left: -3, top: 170, width: 3, height: 64, background: '#2a2a2a', borderRadius: '2px 0 0 2px' }} />
        <div style={{ position: 'absolute', left: -3, top: 246, width: 3, height: 64, background: '#2a2a2a', borderRadius: '2px 0 0 2px' }} />
        <div style={{ position: 'absolute', right: -3, top: 180, width: 3, height: 90, background: '#2a2a2a', borderRadius: '0 2px 2px 0' }} />

        {/* Home bar */}
        <div style={{
          position: 'absolute',
          bottom: 8,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 134,
          height: 5,
          background: lightStatus ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)',
          borderRadius: 3,
          zIndex: 100,
        }} />
      </div>
    </div>
  );
}
