'use client';
// DBS digibank "key" loading indicator. The grey key glyph fills with brand red
// from the bottom up, holds, then fades and repeats — mimicking the real DBS app
// loader. `card` draws the white rounded tile behind it (for dark backgrounds).
const KEY_D = "M31.1834 38.1473C31.1834 37.0568 32.0571 36.1729 33.1357 36.1729C34.2138 36.1729 35.0881 37.0568 35.0881 38.1473C35.0881 39.2378 34.2143 40.1217 33.1357 40.1217C32.0577 40.1217 31.1834 39.2373 31.1834 38.1473ZM20.7372 22.7081C20.7372 23.9098 21.7014 24.8851 22.8905 24.8851C24.0797 24.8851 25.0433 23.9098 25.0433 22.7081C25.0433 21.5058 24.0791 20.531 22.8905 20.531C21.7014 20.5305 20.7372 21.5058 20.7372 22.7081ZM25.8467 14.9554C25.8467 16.1571 26.8108 17.1325 28 17.1325C29.1892 17.1325 30.1533 16.1571 30.1533 14.9554C30.1533 13.7532 29.1892 12.7784 28 12.7784C26.8108 12.7784 25.8467 13.7532 25.8467 14.9554ZM30.9561 22.7081C30.9561 23.9098 31.9203 24.8851 33.1095 24.8851C34.2986 24.8851 35.2628 23.9098 35.2628 22.7081C35.2628 21.5058 34.2986 20.531 33.1095 20.531C31.9198 20.5305 30.9561 21.5058 30.9561 22.7081ZM22.3892 16.7735C22.2077 16.2006 22.1095 15.5899 22.1095 14.9554C22.1095 11.6664 24.7468 9 28 9C31.2532 9 33.8905 11.6664 33.8905 14.9554C33.8905 15.5899 33.7928 16.2006 33.6114 16.7735C36.6301 17.0309 39 19.5895 39 22.7081C39 25.9977 36.3626 28.663 33.1095 28.663C32.0772 28.663 31.1074 28.3937 30.2633 27.923V41H27.9989C26.7472 40.9921 25.7456 39.9812 25.7367 38.7304V27.9235C24.8931 28.3943 23.9228 28.6635 22.8905 28.6635C19.6374 28.6635 17 25.9977 17 22.7086C17 19.5895 19.3705 17.0309 22.3892 16.7735ZM31.1834 33.2688C31.1834 32.1783 32.0571 31.2955 33.1357 31.2955C34.2138 31.2955 35.0881 32.1783 35.0881 33.2688C35.0881 34.3593 34.2143 35.2432 33.1357 35.2432C32.0577 35.2432 31.1834 34.3593 31.1834 33.2688Z";

export default function KeyLoader({ size = 56, card = true, base = '#cfd5da', fill = '#e60000' }) {
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }} aria-label="Loading" role="status">
      {card && (
        <div style={{
          position: 'absolute', inset: 0, borderRadius: size * 0.16, background: '#fff',
          boxShadow: '0 4px 14px rgba(0,0,0,0.22), 0 0 0 0.5px rgba(0,0,0,0.05)',
        }} />
      )}
      {/* Grey base key */}
      <svg width={size} height={size} viewBox="0 0 56 57" fill="none" style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
        <path d={KEY_D} fill={base} />
      </svg>
      {/* Red fill, swept from bottom to top on a loop */}
      <svg width={size} height={size} viewBox="0 0 56 57" fill="none" style={{ position: 'absolute', inset: 0, animation: 'keyFill 1.6s cubic-bezier(0.65,0,0.35,1) infinite' }} aria-hidden="true">
        <path d={KEY_D} fill={fill} />
      </svg>
      <style>{`
        @keyframes keyFill {
          0%   { clip-path: inset(100% 0 0 0); opacity: 1; }
          55%  { clip-path: inset(0 0 0 0);   opacity: 1; }
          78%  { clip-path: inset(0 0 0 0);   opacity: 1; }
          100% { clip-path: inset(0 0 0 0);   opacity: 0; }
        }
      `}</style>
    </div>
  );
}
