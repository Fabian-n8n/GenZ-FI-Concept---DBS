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

// Source-of-truth transactions for the breakdown screen. The donut, legend,
// per-category rows and the spending bar are all DERIVED from these, so
// recategorising a transaction live updates every visualisation.
// 1-month set across Dining, Shopping, Grocery, Transport, Bills, Subscriptions.
// Recategorising any item live-updates the donut, %, bars and tracker.
export const BREAKDOWN_TXNS = [
  { id: 'b1',  date: '10 April 2026', today: true, name: 'SHOPEE PAY PTE LTD',  cat: 'Shopping',          amount: 45.5  },
  { id: 'b2',  date: '10 April 2026', today: true, name: 'NETFLIX SINGAPORE',   cat: 'Subscriptions',     amount: 19.98 },
  { id: 'b3',  date: '10 April 2026', today: true, name: 'FOODPANDA SINGAPORE', cat: 'Dining',            amount: 23.9  },
  { id: 'b4',  date: '09 April 2026', name: 'ZARA ION ORCHARD',    cat: 'Shopping',          amount: 129.0 },
  { id: 'b5',  date: '09 April 2026', name: 'MONKEYBAR',           cat: 'Dining',            amount: 76.0  },
  { id: 'b6',  date: '09 April 2026', name: 'GRAB SINGAPORE',      cat: 'Transportation',    amount: 14.6  },
  { id: 'b7',  date: '06 April 2026', name: 'SP GROUP UTILITIES',  cat: 'Bills & Utilities', amount: 56.0  },
  { id: 'b8',  date: '06 April 2026', name: 'SINGTEL MOBILE',      cat: 'Bills & Utilities', amount: 42.0  },
  { id: 'b9',  date: '06 April 2026', name: 'SWEE CHOON TIM SUM',  cat: 'Dining',            amount: 42.1  },
  { id: 'b10', date: '06 April 2026', name: 'SPOTIFY PREMIUM',     cat: 'Subscriptions',     amount: 11.02 },
  { id: 'b11', date: '03 April 2026', name: 'SIMPLYGO TRANSIT',    cat: 'Transportation',    amount: 44.6  },
  { id: 'b12', date: '03 April 2026', name: 'DISNEY+ SINGAPORE',   cat: 'Subscriptions',     amount: 25.0  },
  { id: 'b13', date: '03 April 2026', name: 'COMFORTDELGRO TAXI',  cat: 'Transportation',    amount: 11.8  },
  { id: 'b14', date: '03 April 2026', name: 'ICLOUD+ STORAGE',     cat: 'Subscriptions',     amount: 5.0   },
  { id: 'b27', date: '09 April 2026', name: 'FAIRPRICE FINEST',    cat: 'Grocery',           amount: 48.2  },
];

// "Today" set — a single light day of spending (totals S$50.25), so the
// breakdown reads realistically when the user filters to just today.
export const BREAKDOWN_TXNS_TODAY = [
  { id: 't1', date: '10 April 2026', today: true, name: 'SHOPEE PAY PTE LTD', cat: 'Shopping',       amount: 29.35 },
  { id: 't2', date: '10 April 2026', today: true, name: 'GRAB SINGAPORE',     cat: 'Transportation', amount: 14.6  },
  { id: 't3', date: '10 April 2026', today: true, name: 'KOPITIAM',           cat: 'Dining',         amount: 6.3   },
  { id: 't4', date: '10 April 2026', today: true, name: 'FAIRPRICE EXPRESS',  cat: 'Grocery',        amount: 12.4  },
];

// "Last 3 months" set — the 1-month transactions plus older history across
// Feb–Mar 2026. Totals S$2,107.58, so the 3-month view shows a 2k+ figure.
export const BREAKDOWN_TXNS_3M = [
  ...BREAKDOWN_TXNS,
  { id: 'b15', date: '28 March 2026',    name: 'TIGER BROKERS',       cat: 'Investment',        amount: 500.0 },
  { id: 'b16', date: '26 March 2026',    name: 'APPLE STORE ORCHARD', cat: 'Shopping',          amount: 158.0 },
  { id: 'b17', date: '22 March 2026',    name: 'AMAZON SG',           cat: 'Shopping',          amount: 112.4 },
  { id: 'b18', date: '18 March 2026',    name: 'MONKEYBAR',           cat: 'Dining',            amount: 58.0  },
  { id: 'b19', date: '14 March 2026',    name: 'GV CINEMAS VIVOCITY', cat: 'Entertainment',     amount: 32.0  },
  { id: 'b20', date: '10 March 2026',    name: 'SP GROUP UTILITIES',  cat: 'Bills & Utilities', amount: 78.0  },
  { id: 'b21', date: '05 March 2026',    name: 'UNIQLO BUGIS',        cat: 'Shopping',          amount: 89.9  },
  { id: 'b22', date: '25 February 2026', name: 'TIGER BROKERS',       cat: 'Investment',        amount: 300.0 },
  { id: 'b23', date: '18 February 2026', name: 'GRAB SINGAPORE',      cat: 'Transportation',    amount: 38.2  },
  { id: 'b24', date: '12 February 2026', name: 'ZARA ION ORCHARD',    cat: 'Shopping',          amount: 129.0 },
  { id: 'b25', date: '10 February 2026', name: 'FOODPANDA SINGAPORE', cat: 'Dining',            amount: 45.6  },
  { id: 'b26', date: '05 February 2026', name: 'NETFLIX SINGAPORE',   cat: 'Subscriptions',     amount: 19.98 },
  { id: 'b28', date: '20 March 2026',    name: 'COLD STORAGE',        cat: 'Grocery',           amount: 55.3  },
];

// Breakdown source data per selected range. 1-month is the canonical set that
// matches the Payday Lock tracker; today/3m give realistic smaller/larger totals.
export function txnsForRange(range) {
  if (range === 'today') return BREAKDOWN_TXNS_TODAY;
  if (range === '3m') return BREAKDOWN_TXNS_3M;
  return BREAKDOWN_TXNS;
}

// The spending budget is the monthly Payday Lock pocket; the 3-month view
// measures against three cycles so the bar stays coherent (no overflow).
export function budgetForRange(range) {
  return range === '3m' ? SPENDING_BUDGET * 3 : SPENDING_BUDGET;
}

// Same window last month, per category — fixed historical baseline used for the
// "vs last month" comparison. Stays constant as the user recategorises.
export const LAST_MONTH = {
  Shopping:            198.0,
  Dining:              123.5,
  'Bills & Utilities': 95.0,
  Transportation:      88.0,
  Subscriptions:       52.0,
  Entertainment:       40.0,
  Investment:          480.0,
  Grocery:             40.0,
};
