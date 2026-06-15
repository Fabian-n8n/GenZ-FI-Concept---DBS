export const TXN_GROUPS = [
  {
    date: '10 April 2026',
    today: true,
    items: [
      { id: 'txn1', name: 'SHOPEE PAY PTE LTD',  cat: 'Shopping',       amount: 45.50 },
      { id: 'txn2', name: "WATSON'S SINGAPORE",   cat: 'Shopping',       amount: 15.40 },
    ],
  },
  {
    date: '09 April 2026',
    items: [
      { id: 'txn3', name: 'MONKEYBAR',            cat: 'Dining',         amount: 76.00 },
      { id: 'txn4', name: 'COMFORTDELGRO TAXI',   cat: 'Transportation', amount: 11.80 },
    ],
  },
  {
    date: '06 April 2026',
    items: [
      { id: 'txn5', name: 'NTUC FAIRPRICE',       cat: 'Shopping',       amount: 62.30 },
      { id: 'txn6', name: 'FOODPANDA SINGAPORE',  cat: 'Dining',         amount: 23.90 },
    ],
  },
  {
    date: '28 March 2026',
    items: [
      { id: 'txn7', name: 'GREAT EASTERN LIFE',   cat: 'Insurance',      amount: 188.00 },
      { id: 'txn8', name: 'GRAB SINGAPORE',       cat: 'Transportation', amount: 14.60 },
    ],
  },
  {
    date: '12 February 2026',
    items: [
      { id: 'txn9',  name: 'ZARA ION ORCHARD',       cat: 'Shopping',   amount: 129.00 },
      { id: 'txn10', name: 'PRUDENTIAL ASSURANCE',    cat: 'Insurance',  amount: 96.50  },
    ],
  },
];

export const RANGE_DAYS = { today: 1, '1m': 3, '3m': 5, range: 5 };

export function fmtMoney(n) {
  return n.toLocaleString('en-SG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
