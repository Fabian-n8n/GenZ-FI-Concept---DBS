// Transaction data matching Claude Design handoff (screens_categorise.jsx)
export const TXN_GROUPS = [
  {
    date: '10 April 2026',
    today: true,
    items: [
      { id: 'txn1', name: 'SHOPEE PAY PTE LTD',  cat: 'Shopping',          amount: 45.50 },
      { id: 'txn2', name: 'NETFLIX SINGAPORE',    cat: 'Subscriptions',     amount: 19.98 },
    ],
  },
  {
    date: '09 April 2026',
    items: [
      { id: 'txn3', name: 'MONKEYBAR',            cat: 'Dining',            amount: 76.00 },
      { id: 'txn4', name: 'COMFORTDELGRO TAXI',   cat: 'Transportation',    amount: 11.80 },
    ],
  },
  {
    date: '06 April 2026',
    items: [
      { id: 'txn5', name: 'SINGTEL MOBILE',       cat: 'Bills & Utilities', amount: 42.00 },
      { id: 'txn6', name: 'FOODPANDA SINGAPORE',  cat: 'Dining',            amount: 23.90 },
    ],
  },
  {
    date: '28 March 2026',
    items: [
      { id: 'txn7', name: 'TIGER BROKERS',        cat: 'Investment',        amount: 500.00 },
      { id: 'txn8', name: 'GRAB SINGAPORE',       cat: 'Transportation',    amount: 14.60 },
    ],
  },
  {
    date: '12 February 2026',
    items: [
      { id: 'txn9',  name: 'ZARA ION ORCHARD',   cat: 'Shopping',          amount: 129.00 },
      { id: 'txn10', name: 'GV CINEMAS VIVOCITY', cat: 'Entertainment',     amount: 32.00  },
    ],
  },
];

export const RANGE_DAYS = { today: 1, '1m': 3, '3m': 5, range: 5 };

export function fmtMoney(n) {
  return n.toLocaleString('en-SG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Spending budget carried over from the Payday Lock "Spending" pocket
// (Warren Buffett 30% = S$1,260.00). This is the same locked amount the
// breakdown screen measures real spending against — the two features share it.
export const SPENDING_BUDGET = 1260.0;

// Per-category spend this cycle vs the same window last month.
// Amounts sum to S$546.50 — matching the Payday Lock spending tracker — and
// the shares line up with BREAKDOWN_SEGS (32/26/18/13/11).
export const CATEGORY_SPEND = [
  { cat: 'Shopping',          spent: 174.5, last: 198.0 },
  { cat: 'Dining',            spent: 142.0, last: 123.5 },
  { cat: 'Bills & Utilities', spent: 98.0,  last: 95.0  },
  { cat: 'Transportation',    spent: 71.0,  last: 88.0  },
  { cat: 'Subscriptions',     spent: 61.0,  last: 52.0  },
];
