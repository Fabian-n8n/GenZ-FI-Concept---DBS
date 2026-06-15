export const FRAMEWORKS = [
  {
    id: 'warren',
    name: 'Warren Buffett',
    tag: 'Framework 1',
    by: 'Pay yourself first',
    split: '60% savings · 30% spending · 10% invest',
    blurb: 'Save first, spend what\'s left. A discipline-first split that pays your future self before anyone else.',
    lockAmount: 'S$3,200.00',
    lockAmtNum: 3200,
    segments: [
      { pct: 60, color: '#B11226' },
      { pct: 30, color: '#EC5567' },
      { pct: 10, color: '#F9C7CD' },
    ],
    rows: [
      { color: '#B11226', name: 'Savings',  pct: '60%', desc: 'Locked away until your next payday',  amount: 'S$3,200.00' },
      { color: '#EC5567', name: 'Spending', pct: '30%', desc: 'Available to spend day to day',       amount: 'S$1,260.00' },
      { color: '#F9C7CD', name: 'Invest',   pct: '10%', desc: 'Grows in your investment pocket',     amount: 'S$420.00'   },
    ],
  },
  {
    id: 'jpm',
    name: 'JP Morgan',
    tag: 'Framework 2',
    by: 'The balanced 50-30-20',
    split: '50% savings · 30% spending · 20% invest',
    blurb: 'A steady middle path — half put away, a third to live on, the rest invested for growth.',
    lockAmount: 'S$2,100.00',
    lockAmtNum: 2100,
    segments: [
      { pct: 50, color: '#B11226' },
      { pct: 30, color: '#EC5567' },
      { pct: 20, color: '#F9C7CD' },
    ],
    rows: [
      { color: '#B11226', name: 'Savings',  pct: '50%', desc: 'Locked away until your next payday',  amount: 'S$2,100.00' },
      { color: '#EC5567', name: 'Spending', pct: '30%', desc: 'Available to spend day to day',       amount: 'S$1,260.00' },
      { color: '#F9C7CD', name: 'Invest',   pct: '20%', desc: 'Grows in your investment pocket',     amount: 'S$840.00'   },
    ],
  },
  {
    id: 'custom',
    name: 'Custom',
    tag: 'Your own',
    by: 'Build your own split',
    split: '40% savings · 40% spending · 20% invest',
    blurb: 'Drag the sliders and design a split that fits exactly how you live.',
    lockAmount: 'S$1,680.00',
    lockAmtNum: 1680,
    segments: [
      { pct: 40, color: '#B11226' },
      { pct: 40, color: '#EC5567' },
      { pct: 20, color: '#F9C7CD' },
    ],
    rows: [
      { color: '#B11226', name: 'Savings',  pct: '40%', desc: 'Locked away until your next payday',  amount: 'S$1,680.00' },
      { color: '#EC5567', name: 'Spending', pct: '40%', desc: 'Available to spend day to day',       amount: 'S$1,680.00' },
      { color: '#F9C7CD', name: 'Invest',   pct: '20%', desc: 'Grows in your investment pocket',     amount: 'S$840.00'   },
    ],
  },
];

export function fwById(id) {
  return FRAMEWORKS.find(f => f.id === id) || FRAMEWORKS[0];
}

export const INCOME = 'S$4,200';
export const INCOME_NUM = 4200;
