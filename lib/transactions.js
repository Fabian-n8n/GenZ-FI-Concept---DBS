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
// 1-month set — end-of-cycle spending that has crept up close to the locked
// Payday Lock budget (S$1,260). Totals S$1,185.00 (~94% used) so the usability
// scenario reads as "nearly at the limit before payday." Category sums:
// Shopping 340 · Dining 285 · Bills 190 · Transport 140 · Subs 120 · Grocery 110.
export const BREAKDOWN_TXNS = [
  { id: 'b1',  date: '10 April 2026', today: true, name: 'SHOPEE PAY PTE LTD',  cat: 'Shopping',          amount: 45.5  },
  { id: 'b2',  date: '10 April 2026', today: true, name: 'NETFLIX SINGAPORE',   cat: 'Subscriptions',     amount: 19.98 },
  { id: 'b3',  date: '10 April 2026', today: true, name: 'FOODPANDA SINGAPORE', cat: 'Dining',            amount: 52.3  },
  { id: 'b4',  date: '10 April 2026', today: true, name: 'FAIRPRICE FINEST',    cat: 'Grocery',           amount: 48.2  },
  { id: 'b5',  date: '09 April 2026', name: 'ZARA ION ORCHARD',     cat: 'Shopping',          amount: 129.0 },
  { id: 'b6',  date: '09 April 2026', name: 'MONKEYBAR',            cat: 'Dining',            amount: 76.0  },
  { id: 'b7',  date: '09 April 2026', name: 'GRAB SINGAPORE',       cat: 'Transportation',    amount: 44.6  },
  { id: 'b8',  date: '06 April 2026', name: 'SP GROUP UTILITIES',   cat: 'Bills & Utilities', amount: 56.0  },
  { id: 'b9',  date: '06 April 2026', name: 'SINGTEL MOBILE',       cat: 'Bills & Utilities', amount: 42.0  },
  { id: 'b10', date: '06 April 2026', name: 'SWEE CHOON TIM SUM',   cat: 'Dining',            amount: 42.1  },
  { id: 'b11', date: '06 April 2026', name: 'DISNEY+ SINGAPORE',    cat: 'Subscriptions',     amount: 25.0  },
  { id: 'b12', date: '03 April 2026', name: 'UNIQLO ORCHARD',       cat: 'Shopping',          amount: 89.9  },
  { id: 'b13', date: '03 April 2026', name: 'STARHUB BROADBAND',    cat: 'Bills & Utilities', amount: 49.9  },
  { id: 'b14', date: '03 April 2026', name: 'SIMPLYGO TRANSIT',     cat: 'Transportation',    amount: 35.0  },
  { id: 'b15', date: '03 April 2026', name: 'COLD STORAGE',         cat: 'Grocery',           amount: 35.5  },
  { id: 'b16', date: '30 March 2026', name: 'DIN TAI FUNG',         cat: 'Dining',            amount: 58.0  },
  { id: 'b17', date: '30 March 2026', name: 'CITY GAS',             cat: 'Bills & Utilities', amount: 42.1  },
  { id: 'b18', date: '30 March 2026', name: 'YOUTUBE PREMIUM',      cat: 'Subscriptions',     amount: 18.98 },
  { id: 'b19', date: '27 March 2026', name: 'LAZADA SG',            cat: 'Shopping',          amount: 75.6  },
  { id: 'b20', date: '27 March 2026', name: 'COMFORTDELGRO TAXI',   cat: 'Transportation',    amount: 34.0  },
  { id: 'b21', date: '27 March 2026', name: 'SHENG SIONG',          cat: 'Grocery',           amount: 26.3  },
  { id: 'b22', date: '22 March 2026', name: 'PUTIEN RESTAURANT',    cat: 'Dining',            amount: 56.6  },
  { id: 'b23', date: '22 March 2026', name: 'ADOBE CREATIVE CLOUD', cat: 'Subscriptions',     amount: 40.02 },
  { id: 'b24', date: '22 March 2026', name: 'GRAB SINGAPORE',       cat: 'Transportation',    amount: 26.4  },
  { id: 'b25', date: '22 March 2026', name: 'ICLOUD+ STORAGE',      cat: 'Subscriptions',     amount: 16.02 },
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
// Feb–Mar 2026. Totals S$3,518.90 (~93% of the 3-cycle S$3,780 budget), so the
// 3-month view also reads as nearly at the limit for the end-of-cycle scenario.
export const BREAKDOWN_TXNS_3M = [
  ...BREAKDOWN_TXNS,
  { id: 'b26', date: '28 February 2026', name: 'TIGER BROKERS',       cat: 'Investment',        amount: 500.0 },
  { id: 'b27', date: '12 February 2026', name: 'TIGER BROKERS',       cat: 'Investment',        amount: 300.0 },
  { id: 'b28', date: '10 March 2026',    name: 'APPLE STORE ORCHARD', cat: 'Shopping',          amount: 158.0 },
  { id: 'b29', date: '05 March 2026',    name: 'COURTS MEGASTORE',    cat: 'Shopping',          amount: 245.0 },
  { id: 'b30', date: '02 March 2026',    name: 'HARVEY NORMAN',       cat: 'Shopping',          amount: 215.0 },
  { id: 'b31', date: '20 February 2026', name: 'IKEA TAMPINES',       cat: 'Shopping',          amount: 189.0 },
  { id: 'b32', date: '15 February 2026', name: 'AMAZON SG',           cat: 'Shopping',          amount: 112.4 },
  { id: 'b33', date: '08 March 2026',    name: 'DIN TAI FUNG',        cat: 'Dining',            amount: 64.5  },
  { id: 'b34', date: '25 February 2026', name: 'PUTIEN RESTAURANT',   cat: 'Dining',            amount: 78.0  },
  { id: 'b35', date: '18 February 2026', name: 'FOODPANDA SINGAPORE', cat: 'Dining',            amount: 45.6  },
  { id: 'b36', date: '03 March 2026',    name: 'SP GROUP UTILITIES',  cat: 'Bills & Utilities', amount: 78.0  },
  { id: 'b37', date: '22 February 2026', name: 'STARHUB BROADBAND',   cat: 'Bills & Utilities', amount: 49.9  },
  { id: 'b38', date: '07 March 2026',    name: 'GRAB SINGAPORE',      cat: 'Transportation',    amount: 38.2  },
  { id: 'b39', date: '16 February 2026', name: 'SIMPLYGO TRANSIT',    cat: 'Transportation',    amount: 42.0  },
  { id: 'b40', date: '06 March 2026',    name: 'COLD STORAGE',        cat: 'Grocery',           amount: 55.3  },
  { id: 'b41', date: '19 February 2026', name: 'SHENG SIONG',         cat: 'Grocery',           amount: 62.0  },
  { id: 'b42', date: '12 February 2026', name: 'FAIRPRICE FINEST',    cat: 'Grocery',           amount: 38.0  },
  { id: 'b43', date: '14 March 2026',    name: 'GV CINEMAS VIVOCITY', cat: 'Entertainment',     amount: 32.0  },
  { id: 'b44', date: '11 February 2026', name: 'NETFLIX SINGAPORE',   cat: 'Subscriptions',     amount: 19.98 },
  { id: 'b45', date: '09 February 2026', name: 'SPOTIFY PREMIUM',     cat: 'Subscriptions',     amount: 11.02 },
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
  Shopping:            386.0,
  Dining:              248.0,
  'Bills & Utilities': 184.0,
  Transportation:      173.0,
  Subscriptions:       103.0,
  Entertainment:       40.0,
  Investment:          480.0,
  Grocery:             91.0,
};
