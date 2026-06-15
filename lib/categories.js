// Category definitions matching the handoff prototype
export const CATS = {
  Shopping:       { color: '#3b7be0', ink: '#fff',      label: 'Shopping'       },
  Dining:         { color: '#e05c3b', ink: '#fff',      label: 'Dining'         },
  Insurance:      { color: '#7b3be0', ink: '#fff',      label: 'Insurance'      },
  Transportation: { color: '#1ca65b', ink: '#fff',      label: 'Transportation' },
  Rent:           { color: '#f59300', ink: '#fff',      label: 'Rent'           },
  Investment:     { color: '#14242f', ink: '#fff',      label: 'Investment'     },
};

export const MASTER_CATS = ['Shopping', 'Dining', 'Insurance', 'Rent', 'Transportation', 'Investment'];
export const PICK_OPTIONS = ['Rent', 'Insurance', 'Investment', 'Shopping', 'Dining'];

export const BREAKDOWN_SEGS = [
  { cat: 'Shopping',       pct: 44 },
  { cat: 'Dining',         pct: 28 },
  { cat: 'Insurance',      pct: 18 },
  { cat: 'Transportation', pct: 10 },
];
