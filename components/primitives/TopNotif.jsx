'use client';

export default function TopNotif({ title, text, onClick }) {
  return (
    <div className="top-notif" onClick={onClick} role="button">
      <img src="/assets/logo/dbs-mark-red.png" alt="DBS" style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="top-notif__title">{title}</div>
        <div className="top-notif__text">{text}</div>
      </div>
    </div>
  );
}
