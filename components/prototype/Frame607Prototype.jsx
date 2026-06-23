'use client';

import { useState } from 'react';

const topTabs = [
  'Summary',
  'Documents',
  'Collateral',
  'Repricing request',
  'Facility',
  'Pricing deviation',
  'Ratio & rules',
  'Customer acceptance re-pricing',
  'Special clause detail',
];

const innerTabs = [
  { label: 'Property details', active: true },
  { label: 'Valuations' },
  { label: 'CPF' },
  { label: 'Existing HDB concessionary loan details' },
  { label: 'CPF housing withdrawal details' },
];

export default function Frame607Prototype() {
  const [manualOverwrite, setManualOverwrite] = useState(false);
  const [leaseOverwrite, setLeaseOverwrite] = useState(false);
  const [fields, setFields] = useState({
    postalCode: '847627',
    block: '-',
    level: '-',
    unit: '-',
    streetOne: '215 Jalan kampong chantak',
    streetTwo: '-',
    streetThree: '215 Jalan kampong chantak',
    streetFour: '-',
    remainingLease: '-',
  });

  return (
    <main style={{
      minHeight: '100dvh',
      background: '#eef1f4',
      padding: 8,
      fontFamily: 'var(--font-sans)',
      color: '#24313b',
      overflow: 'auto',
    }}>
      <div style={{
        minHeight: 'calc(100dvh - 16px)',
        background: '#fff',
        border: '1px solid #d9dee5',
        borderRadius: 4,
        boxShadow: '0 1px 2px rgba(15, 23, 42, 0.05)',
        overflow: 'hidden',
      }}>
        <TopBar />

        <div style={{
          padding: '12px 18px 18px',
          borderBottom: '1px solid #dfe4ea',
          background: '#fff',
        }}>
          <HeaderMeta />
          <TabRow />
        </div>

        <div style={{ padding: 18, background: '#fff' }}>
          <SectionCard
            manualOverwrite={manualOverwrite}
            leaseOverwrite={leaseOverwrite}
            fields={fields}
            setFields={setFields}
            onToggleManualOverwrite={() => setManualOverwrite(v => !v)}
            onToggleLeaseOverwrite={() => setLeaseOverwrite(v => !v)}
          />
        </div>
      </div>
    </main>
  );
}

function TopBar() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      padding: '10px 16px 8px 14px',
      borderBottom: '1px solid #dfe4ea',
      background: '#f8fafc',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
        <button style={ghostBtn} aria-label="Back">
          <BackIcon />
        </button>
        <div style={{
          fontSize: 15,
          fontWeight: 500,
          color: '#1f2a33',
          whiteSpace: 'nowrap',
        }}>
          Repricing loan application # 202500001
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <button style={{
          ...topActionBtn,
          color: '#c0c8cf',
          background: '#eef2f6',
          borderColor: '#eef2f6',
          cursor: 'default',
        }}>
          Start AI assessment
        </button>
        <button style={topActionBtn}>Memo</button>
        <button style={topIconBtn} aria-label="More">
          <EllipsisIcon />
        </button>
      </div>
    </div>
  );
}

function HeaderMeta() {
  return (
    <div style={{ display: 'grid', gap: 6, marginBottom: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <MetaText>Offline</MetaText>
        <MetaText>STP</MetaText>
        <MetaText>MA: Ethan Lee</MetaText>
        <MetaText>CIN: S1234567X / 00</MetaText>
        <span style={pillStyle}>Caution</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
        <MetaText>01-3451154-1</MetaText>
        <MetaText>01-5431154-6</MetaText>
        <MetaText>01-6771154-2</MetaText>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <MetaText>Landed</MetaText>
        <MetaText>123 MARINE PARADE ROAD #09-453 S639543</MetaText>
      </div>
    </div>
  );
}

function TabRow() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      paddingTop: 2,
      paddingBottom: 7,
      borderBottom: '4px solid #d0d5dd',
      overflowX: 'auto',
      whiteSpace: 'nowrap',
      scrollbarWidth: 'none',
    }}>
      {topTabs.map((tab, index) => {
        const active = tab === 'Collateral';
        return (
          <div key={tab} style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <span style={{
              fontSize: 12.5,
              color: active ? '#1f2a33' : '#5f6b76',
              fontWeight: active ? 500 : 400,
              paddingBottom: 4,
              borderBottom: active ? '2px solid #d33f2b' : '2px solid transparent',
            }}>
              {tab}
            </span>
            {index < topTabs.length - 1 ? <Dot /> : null}
          </div>
        );
      })}
    </div>
  );
}

function SectionCard({
  manualOverwrite,
  leaseOverwrite,
  fields,
  setFields,
  onToggleManualOverwrite,
  onToggleLeaseOverwrite,
}) {
  const editable = manualOverwrite;
  const leaseEditable = leaseOverwrite;

  return (
    <div style={{
      border: '1px solid #e4e8ed',
      borderRadius: 4,
      overflow: 'hidden',
      background: '#fff',
    }}>
      <div style={{
        padding: '12px 16px 10px',
        borderBottom: '1px solid #eef1f4',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 16,
      }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#22303a', marginBottom: 2 }}>Subject property</div>
          <div style={{ fontSize: 13, color: '#7b8790' }}>Add the text to describe here</div>
        </div>
        <button style={ghostBtn} aria-label="Collapse">
          <ChevronUpIcon />
        </button>
      </div>

      <div style={{ padding: '14px 16px 16px' }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
          {innerTabs.map(tab => (
            <button
              key={tab.label}
              style={{
                height: 23,
                padding: '0 10px',
                borderRadius: 3,
                border: tab.active ? '1px solid #6e7a86' : '1px solid #cfd6de',
                background: tab.active ? '#6e7a86' : '#fff',
                color: tab.active ? '#fff' : '#55616b',
                fontSize: 12,
                lineHeight: 1,
                cursor: 'default',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ fontSize: 14, fontWeight: 500, color: '#33404a', marginBottom: 12 }}>Collateral</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 18 }}>
          <LabelValue label="Property Address" value="50 BAYSHORE ROAD #16-90 SINGAPORE 469977" />
          <LabelValue label="Use of property" value="Investment" />
        </div>

        <Divider />

        <div style={{ marginTop: 20, marginBottom: 12, fontSize: 14, fontWeight: 600, color: '#33404a' }}>
          Existing property details
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10, marginBottom: 14, maxWidth: 320 }}>
          <Field
            label="Existing file ref (borrower arrangement with the property address)"
            value="-"
            disabled={!editable}
            editable={editable}
            onChange={() => {}}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16, marginBottom: 10 }}>
          <Field label="Property status" value="Select" select disabled={!editable} editable={editable} onChange={() => {}} />
          <Field label="Property description" value="Select" select disabled={!editable} editable={editable} onChange={() => {}} />
          <Field label="Land tenure" value="Select" select disabled={!editable} editable={editable} onChange={() => {}} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10, marginBottom: 18, maxWidth: 250 }}>
          <Field
            label="Leasehold commencing from year"
            value="2022"
            disabled={!editable}
            editable={editable}
            onChange={() => {}}
          />
        </div>

        <Box>
          <CheckRow label="Manual Overwrite" checked={manualOverwrite} onChange={onToggleManualOverwrite} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16, marginTop: 20 }}>
            <Field
              label="Postal / Zip Code"
              value={fields.postalCode}
              disabled={!editable}
              editable={editable}
              onChange={(next) => setFields(prev => ({ ...prev, postalCode: next }))}
            />
            <Field
              label="Block"
              value={fields.block}
              disabled={!editable}
              editable={editable}
              onChange={(next) => setFields(prev => ({ ...prev, block: next }))}
            />
            <Field
              label="Level"
              value={fields.level}
              disabled={!editable}
              editable={editable}
              onChange={(next) => setFields(prev => ({ ...prev, level: next }))}
            />
          </div>

          <div style={{ marginTop: 8, fontSize: 10.5, color: '#7a8791' }}>Address found</div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16, marginTop: 8 }}>
            <Field
              label="Unit"
              value={fields.unit}
              disabled={!editable}
              editable={editable}
              onChange={(next) => setFields(prev => ({ ...prev, unit: next }))}
            />
            <Field
              label="Street Name"
              value={fields.streetOne}
              disabled={!editable}
              editable={editable}
              onChange={(next) => setFields(prev => ({ ...prev, streetOne: next }))}
            />
            <Field
              label="Street Name"
              value={fields.streetTwo}
              disabled={!editable}
              editable={editable}
              onChange={(next) => setFields(prev => ({ ...prev, streetTwo: next }))}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16, marginTop: 8 }}>
            <Field
              label="Street Name"
              value={fields.streetThree}
              disabled={!editable}
              editable={editable}
              onChange={(next) => setFields(prev => ({ ...prev, streetThree: next }))}
            />
            <Field
              label="Street Name"
              value={fields.streetFour}
              disabled={!editable}
              editable={editable}
              onChange={(next) => setFields(prev => ({ ...prev, streetFour: next }))}
            />
            <div />
          </div>
        </Box>

        <Box style={{ marginTop: 18 }}>
          <CheckRow label="Manual Overwrite" checked={leaseOverwrite} onChange={onToggleLeaseOverwrite} />
          <div style={{ marginTop: 20, maxWidth: 248 }}>
            <Field
              label="Remaining lease period"
              value={fields.remainingLease}
              disabled={!leaseEditable}
              editable={leaseEditable}
              onChange={(next) => setFields(prev => ({ ...prev, remainingLease: next }))}
            />
          </div>
        </Box>

        <button style={outlineChipBtn}>Existing facility for LTV computation</button>

        <Divider style={{ marginTop: 14, marginBottom: 18 }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button style={saveBtn}>Save</button>
          <button style={closeBtn}>Close</button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, select = false, disabled = false, editable = false, onChange = () => {} }) {
  return (
    <label style={{ display: 'grid', gap: 4 }}>
      <span style={{ fontSize: 11, lineHeight: 1.2, color: '#58636d' }}>{label}</span>
      {select ? (
        <div style={{
          height: 24,
          border: '1px solid #cfd6de',
          borderRadius: 2,
          background: '#fff',
          padding: '0 9px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 12.5,
          color: '#39444d',
        }}>
          <span>{value}</span>
          <ChevronDownIcon />
          </div>
      ) : (
        <input
          value={value}
          readOnly={!editable}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          style={{
            height: 24,
            border: '1px solid #cfd6de',
            borderRadius: 2,
            background: disabled ? '#eef3f7' : '#fff',
            padding: '0 9px',
            fontSize: 12.5,
            color: '#39444d',
            outline: 'none',
            width: '100%',
          }}
        />
      )}
    </label>
  );
}

function LabelValue({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: '#59646d', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 13.5, color: '#24313b' }}>{value}</div>
    </div>
  );
}

function Box({ children, style }) {
  return (
    <div style={{
      border: '1px solid #e2e7ed',
      borderRadius: 4,
      padding: '16px 14px 14px',
      ...style,
    }}>
      {children}
    </div>
  );
}

function CheckRow({ label, checked = false, onChange = () => {} }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#2f3c46', cursor: 'pointer' }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{ width: 13, height: 13, margin: 0, accentColor: '#ff4d4d' }}
      />
      <span>{label}</span>
    </label>
  );
}

function Divider({ style }) {
  return <div style={{ height: 1, background: '#eef1f4', ...style }} />;
}

function MetaText({ children }) {
  return <span style={{ fontSize: 12, color: '#4b5761' }}>{children}</span>;
}

function Dot() {
  return <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#d93b2d', display: 'inline-block' }} />;
}

const ghostBtn = {
  width: 28,
  height: 28,
  border: 'none',
  background: 'transparent',
  padding: 0,
  display: 'grid',
  placeItems: 'center',
  cursor: 'default',
  color: '#7c8791',
};

const topActionBtn = {
  height: 26,
  padding: '0 10px',
  border: '1px solid #cfd6de',
  borderRadius: 2,
  background: '#fff',
  color: '#5a6670',
  fontSize: 12,
  cursor: 'default',
};

const topIconBtn = {
  width: 26,
  height: 26,
  border: '1px solid #cfd6de',
  borderRadius: 2,
  background: '#fff',
  display: 'grid',
  placeItems: 'center',
  cursor: 'default',
  color: '#5a6670',
};

const pillStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  height: 18,
  padding: '0 8px',
  borderRadius: 999,
  background: '#fde9e7',
  color: '#c54f45',
  fontSize: 11,
  fontWeight: 600,
};

const outlineChipBtn = {
  marginTop: 14,
  height: 24,
  padding: '0 10px',
  border: '1px solid #cfd6de',
  borderRadius: 3,
  background: '#fff',
  color: '#45515b',
  fontSize: 11.5,
  cursor: 'default',
};

const saveBtn = {
  height: 30,
  minWidth: 45,
  padding: '0 12px',
  border: '1px solid #ea4c4c',
  borderRadius: 2,
  background: '#ff4d4d',
  color: '#fff',
  fontSize: 12,
  fontWeight: 600,
  cursor: 'default',
};

const closeBtn = {
  height: 30,
  minWidth: 45,
  padding: '0 12px',
  border: '1px solid #cfd6de',
  borderRadius: 2,
  background: '#fff',
  color: '#3f4a53',
  fontSize: 12,
  fontWeight: 500,
  cursor: 'default',
};

function BackIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M7.8 2.2L4 6l3.8 3.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronUpIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2.2 7.4L6 3.6l3.8 3.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M2 3.6L5 6.6L8 3.6" stroke="#8a96a0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EllipsisIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <circle cx="6" cy="2.25" r="1" fill="currentColor" />
      <circle cx="6" cy="6" r="1" fill="currentColor" />
      <circle cx="6" cy="9.75" r="1" fill="currentColor" />
    </svg>
  );
}
