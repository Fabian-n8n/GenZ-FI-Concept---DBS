'use client';
// iOS-style Dynamic Island Face ID: scanning glyph (with soft green aura +
// gentle breathing) that morphs to a green checkmark + "Face ID" on success.
// Shared by the login biometric loading screen and Apple Pay.

export default function FaceIdIsland({ done = false, size = 132 }) {
  const scanW = size;
  const checkW = Math.round(size * 0.64);
  const aura = Math.round(size * 0.79);

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'grid', placeItems: 'center' }}>
      {/* Green scanning aura */}
      <div style={{
        position: 'absolute', width: aura, height: aura, borderRadius: 32,
        background: 'radial-gradient(circle, rgba(48,209,88,0.5) 0%, rgba(48,209,88,0.14) 45%, transparent 72%)',
        filter: 'blur(10px)',
        opacity: done ? 0 : 1,
        animation: done ? 'none' : 'fidGlow 1.5s ease-in-out infinite',
        transition: 'opacity 350ms ease',
      }} />

      {/* Scanning state */}
      <img
        src="/assets/logo/faceid-scanning.svg"
        alt="Face ID"
        style={{
          position: 'absolute', width: scanW, height: 'auto', display: 'block',
          opacity: done ? 0 : 1,
          animation: done ? 'none' : 'fidBreathe 1.5s ease-in-out infinite',
          transition: 'opacity 280ms ease',
        }}
      />

      {/* Success state */}
      <img
        src="/assets/logo/faceid-checked.svg"
        alt="Face ID verified"
        style={{
          position: 'absolute', width: checkW, height: 'auto', display: 'block', borderRadius: 22,
          opacity: done ? 1 : 0,
          transform: done ? 'scale(1)' : 'scale(0.88)',
          transition: 'opacity 280ms ease, transform 280ms ease',
        }}
      />

      <style>{`
        @keyframes fidBreathe { 0%,100%{ transform: scale(0.97); } 50%{ transform: scale(1.03); } }
        @keyframes fidGlow    { 0%,100%{ opacity: 0.4; }  50%{ opacity: 0.9; } }
      `}</style>
    </div>
  );
}
