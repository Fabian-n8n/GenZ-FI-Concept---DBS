// Category definitions — exact palette from Claude Design handoff (screens_applepay.jsx)
export const CATS = {
  Dining:              { color: '#FFC24B', ink: '#6B4500' },
  Shopping:            { color: '#FF7A5C', ink: '#fff'    },
  Grocery:             { color: '#46B450', ink: '#fff'    },
  Transportation:      { color: '#22C9A3', ink: '#fff'    },
  Subscriptions:       { color: '#8A8FF0', ink: '#fff'    },
  Entertainment:       { color: '#B06BE0', ink: '#fff'    },
  'Bills & Utilities': { color: '#4F8EF7', ink: '#fff'    },
  Investment:          { color: '#F0495C', ink: '#fff'    },
  // Manual-add only
  Insurance:           { color: '#2BB6C4', ink: '#fff'    },
  Rent:                { color: '#E08A2B', ink: '#fff'    },
};

export const MASTER_CATS  = ['Dining', 'Shopping', 'Grocery', 'Transportation', 'Subscriptions', 'Entertainment', 'Bills & Utilities', 'Investment'];
export const ADDABLE_CATS = ['Insurance', 'Rent'];
export const PICK_OPTIONS = MASTER_CATS;

export const BREAKDOWN_SEGS = [
  { cat: 'Shopping',        pct: 32 },
  { cat: 'Dining',          pct: 26 },
  { cat: 'Bills & Utilities', pct: 18 },
  { cat: 'Transportation',  pct: 13 },
  { cat: 'Subscriptions',   pct: 11 },
];
