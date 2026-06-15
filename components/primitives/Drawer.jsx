'use client';

export default function Drawer({ children, onClose }) {
  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer" onClick={e => e.stopPropagation()}>
        <div className="drawer__handle" />
        {children}
      </div>
    </div>
  );
}
