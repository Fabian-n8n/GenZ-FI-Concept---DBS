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
      { pct: 60, color: '#22C9A3' },
      { pct: 30, color: '#FF7A5C' },
      { pct: 10, color: '#8A8FF0' },
    ],
    rows: [
      { color: '#22C9A3', name: 'Savings',  pct: '60%', desc: 'Locked away until your next payday',  amount: 'S$3,200.00' },
      { color: '#FF7A5C', name: 'Spending', pct: '30%', desc: 'Available to spend day to day',       amount: 'S$1,260.00' },
      { color: '#8A8FF0', name: 'Invest',   pct: '10%', desc: 'Grows in your investment pocket',     amount: 'S$420.00'   },
    ],
    theory: {
      source: 'Inspired by Warren Buffett · Berkshire Hathaway',
      readTime: '4 min read',
      quote: 'Do not save what is left after spending, but spend what is left after saving.',
      quoteBy: 'Warren Buffett',
      sections: [
        {
          h: 'Pay yourself first',
          p: 'Most people spend first and try to save whatever survives the month — which is usually very little. Buffett flips the order: your savings come off the top, automatically, before a single dollar is spent. Payday Lock does exactly that — the moment your salary lands, 60% moves into a locked pocket and out of reach, so the temptation to dip in is gone before it ever starts.',
        },
        {
          h: 'Why a high savings rate wins',
          p: 'Buffett built his fortune on two rules: never lose money, and never interrupt compounding. For a young earner the savings rate — not the investment return — is the biggest lever you actually control. Putting away 60% now, while your fixed costs are still low, front-loads years of compounding that a higher return later can rarely catch up to. The 10% invested slice plants the long-term seed; the 30% keeps everyday life comfortable.',
        },
        {
          h: 'Who it suits',
          p: 'Best for disciplined savers and new earners with low commitments who want the strongest possible head start. If most of your pay already goes to rent and essentials, a gentler split — JP Morgan or a custom one — may be more realistic to stick to.',
        },
      ],
    },
  },
  {
    id: 'jpm',
    name: 'JP Morgan',
    tag: 'Framework 2',
    by: 'Balanced growth',
    split: '45% savings · 35% spending · 20% invest',
    blurb: 'A growth-tilted split — a solid buffer saved, a little more to live on, and double the investing for long-term compounding.',
    lockAmount: 'S$1,890.00',
    lockAmtNum: 1890,
    segments: [
      { pct: 45, color: '#22C9A3' },
      { pct: 35, color: '#FF7A5C' },
      { pct: 20, color: '#8A8FF0' },
    ],
    rows: [
      { color: '#22C9A3', name: 'Savings',  pct: '45%', desc: 'Locked away until your next payday',  amount: 'S$1,890.00' },
      { color: '#FF7A5C', name: 'Spending', pct: '35%', desc: 'Available to spend day to day',       amount: 'S$1,470.00' },
      { color: '#8A8FF0', name: 'Invest',   pct: '20%', desc: 'Grows in your investment pocket',     amount: 'S$840.00'   },
    ],
    theory: {
      source: 'Inspired by J.P. Morgan Asset Management',
      readTime: '4 min read',
      quote: 'Time in the market beats timing the market.',
      quoteBy: 'J.P. Morgan Asset Management',
      sections: [
        {
          h: 'Balanced, tilted to growth',
          p: 'This split keeps a healthy 45% buffer in locked savings but channels a larger 20% into investing — double the Buffett plan — while a 35% spending band gives a little more day-to-day breathing room. It is built for people who already have a small safety net and now want their money working, not just sitting.',
        },
        {
          h: 'The cost of waiting',
          p: 'J.P. Morgan Asset Management\'s long-run research is blunt about one thing: the steepest cost in investing is the cost of waiting. Their analysis shows that missing just a handful of the market\'s best days — which tend to cluster right after the worst ones — can cut a portfolio\'s return roughly in half. The lesson is to stay invested. By committing 20% every payday you dollar-cost-average in automatically and let time, not timing, do the work.',
        },
        {
          h: 'Who it suits',
          p: 'Best for earners who already have a starter emergency fund, are comfortable investing more for long-term growth, and value a slightly larger spending allowance over squeezing out the maximum savings rate.',
        },
      ],
    },
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
      { pct: 40, color: '#22C9A3' },
      { pct: 40, color: '#FF7A5C' },
      { pct: 20, color: '#8A8FF0' },
    ],
    rows: [
      { color: '#22C9A3', name: 'Savings',  pct: '40%', desc: 'Locked away until your next payday',  amount: 'S$1,680.00' },
      { color: '#FF7A5C', name: 'Spending', pct: '40%', desc: 'Available to spend day to day',       amount: 'S$1,680.00' },
      { color: '#8A8FF0', name: 'Invest',   pct: '20%', desc: 'Grows in your investment pocket',     amount: 'S$840.00'   },
    ],
    theory: {
      source: 'Your own plan',
      readTime: '2 min read',
      quote: 'The best budget is the one you\'ll actually keep.',
      quoteBy: null,
      sections: [
        {
          h: 'Built around your life',
          p: 'No textbook rule fits everyone — rent in Singapore, study loans, family support and personal goals all pull the numbers around. Start from a balanced 40/40/20 and drag the sliders until the split matches how you actually live.',
        },
        {
          h: 'Why flexibility matters',
          p: 'A plan you abandon in week two saves nothing. The research behind every framework agrees on one point: consistency beats precision. Pick a savings rate you can hold every single payday, then nudge it up a little each time your income grows.',
        },
        {
          h: 'Who it suits',
          p: 'Anyone whose situation doesn\'t fit a standard rule, or who wants to fine-tune the split as their income and commitments change over time.',
        },
      ],
    },
  },
];

export function fwById(id) {
  return FRAMEWORKS.find(f => f.id === id) || FRAMEWORKS[0];
}

export const INCOME = 'S$4,200';
export const INCOME_NUM = 4200;
