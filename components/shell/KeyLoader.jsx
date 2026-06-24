'use client';
// DBS digibank "key" loading indicator: a dark rounded tile with a white key
// glyph that fills from the bottom up, holds, fades, and repeats — matching the
// real DBS app loader. Use <KeyLoadingOverlay/> for a full-screen dimmed loader.
const KEY_D = "M31.1834 38.1473C31.1834 37.0568 32.0571 36.1729 33.1357 36.1729C34.2138 36.1729 35.0881 37.0568 35.0881 38.1473C35.0881 39.2378 34.2143 40.1217 33.1357 40.1217C32.0577 40.1217 31.1834 39.2373 31.1834 38.1473ZM20.7372 22.7081C20.7372 23.9098 21.7014 24.8851 22.8905 24.8851C24.0797 24.8851 25.0433 23.9098 25.0433 22.7081C25.0433 21.5058 24.0791 20.531 22.8905 20.531C21.7014 20.5305 20.7372 21.5058 20.7372 22.7081ZM25.8467 14.9554C25.8467 16.1571 26.8108 17.1325 28 17.1325C29.1892 17.1325 30.1533 16.1571 30.1533 14.9554C30.1533 13.7532 29.1892 12.7784 28 12.7784C26.8108 12.7784 25.8467 13.7532 25.8467 14.9554ZM30.9561 22.7081C30.9561 23.9098 31.9203 24.8851 33.1095 24.8851C34.2986 24.8851 35.2628 23.9098 35.2628 22.7081C35.2628 21.5058 34.2986 20.531 33.1095 20.531C31.9198 20.5305 30.9561 21.5058 30.9561 22.7081ZM22.3892 16.7735C22.2077 16.2006 22.1095 15.5899 22.1095 14.9554C22.1095 11.6664 24.7468 9 28 9C31.2532 9 33.8905 11.6664 33.8905 14.9554C33.8905 15.5899 33.7928 16.2006 33.6114 16.7735C36.6301 17.0309 39 19.5895 39 22.7081C39 25.9977 36.3626 28.663 33.1095 28.663C32.0772 28.663 31.1074 28.3937 30.2633 27.923V41H27.9989C26.7472 40.9921 25.7456 39.9812 25.7367 38.7304V27.9235C24.8931 28.3943 23.9228 28.6635 22.8905 28.6635C19.6374 28.6635 17 25.9977 17 22.7086C17 19.5895 19.3705 17.0309 22.3892 16.7735ZM31.1834 33.2688C31.1834 32.1783 32.0571 31.2955 33.1357 31.2955C34.2138 31.2955 35.0881 32.1783 35.0881 33.2688C35.0881 34.3593 34.2143 35.2432 33.1357 35.2432C32.0577 35.2432 31.1834 34.3593 31.1834 33.2688Z";

// Full key viewBox (with its natural padding) — gives the gentle, continuous
// "slowly loading" fill, rather than an abrupt sweep over a tightly-cropped glyph.
const VB = "0 0 56 57";

export default function KeyLoader({ size = 80, boxBg = '#34383f' }) {
  const inner = size * 0.74;
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.2, background: boxBg,
      display: 'grid', placeItems: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
    }} aria-label="Loading" role="status">
      <div style={{ position: 'relative', width: inner, height: inner }}>
        {/* Faint base key */}
        <svg width={inner} height={inner} viewBox={VB} fill="none" style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
          <path d={KEY_D} fill="rgba(255,255,255,0.3)" />
        </svg>
        {/* White fill — a diagonal front that sweeps bottom-left → top-right
            and loops in ONE direction (translate by exactly one tile = seamless). */}
        <svg width={inner} height={inner} viewBox={VB} fill="none" style={{
          position: 'absolute', inset: 0,
          WebkitMaskImage: 'linear-gradient(45deg, #000 0%, #000 40%, transparent 50%, transparent 90%, #000 100%)',
          maskImage: 'linear-gradient(45deg, #000 0%, #000 40%, transparent 50%, transparent 90%, #000 100%)',
          WebkitMaskSize: '170px 170px', maskSize: '170px 170px',
          WebkitMaskRepeat: 'repeat', maskRepeat: 'repeat',
          animation: 'keyFill 2.1s linear infinite',
        }} aria-hidden="true">
          <path d={KEY_D} fill="#ffffff" />
        </svg>
      </div>
      <style>{`
        @keyframes keyFill {
          from { -webkit-mask-position: 0px 0px;     mask-position: 0px 0px; }
          to   { -webkit-mask-position: 170px -170px; mask-position: 170px -170px; }
        }
      `}</style>
    </div>
  );
}

// Full-screen dimmed loader: centered key tile over a dark overlay.
export function KeyLoadingOverlay({ dim = 0.5, size = 88, zIndex = 80 }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex, display: 'grid', placeItems: 'center', background: `rgba(0,0,0,${dim})` }}>
      <KeyLoader size={size} />
    </div>
  );
}
