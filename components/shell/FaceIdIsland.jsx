'use client';
// iOS-style Dynamic Island Face ID: a pitch-black rounded tile holding the
// scanning glyph (gentle breathing) that crossfades to a green checkmark on
// success. Shared by the login biometric screen and Apple Pay.

export default function FaceIdIsland({ done = false, size = 132 }) {
  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'grid', placeItems: 'center' }}>
      {/* Scanning state */}
      <img
        src="/assets/logo/faceid-scanning.svg"
        alt="Face ID"
        style={{
          position: 'absolute', width: size, height: 'auto', display: 'block',
          opacity: done ? 0 : 1,
          transition: 'opacity 300ms ease',
          animation: done ? 'none' : 'fidBreathe 1.9s ease-in-out infinite',
        }}
      />

      {/* Success state */}
      <img
        src="/assets/logo/faceid-checked.svg"
        alt="Face ID verified"
        style={{
          position: 'absolute', width: size, height: 'auto', display: 'block',
          opacity: done ? 1 : 0,
          transform: done ? 'scale(1)' : 'scale(0.9)',
          transition: 'opacity 300ms ease, transform 360ms cubic-bezier(0.34, 1.4, 0.64, 1)',
        }}
      />

      <style>{`
        @keyframes fidBreathe { 0%, 100% { transform: scale(0.985); } 50% { transform: scale(1.015); } }
      `}</style>
    </div>
  );
}
