'use client';

export default function Alert({ title, text, actions = [] }) {
  return (
    <div className="alert-backdrop">
      <div className="alert">
        <div className="alert__body">
          <div className="alert__title">{title}</div>
          <div className="alert__text">{text}</div>
        </div>
        <div className="alert__actions">
          {actions.map((a, i) => (
            <button
              key={i}
              className={`alert__action${a.strong ? ' strong' : ''}${a.danger ? ' danger' : ''}`}
              onClick={a.onClick}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
