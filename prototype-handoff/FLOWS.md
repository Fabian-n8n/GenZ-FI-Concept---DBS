# GenZ FI Concept — DBS digibank · Prototype Flow Map

> **What this is:** a clickable prototype for moderated usability testing of two
> DBS digibank Gen Z *financial-intelligence* features. Built in Next.js, deployed
> on Vercel. This document describes every flow and screen so the prototype can be
> understood without running it — e.g. to plan a slide deck.
>
> **Audience of the product:** Singapore Gen Z (22–28), tech-savvy, mobile-first.
> **Live demo:** https://genz-fi-dbs.vercel.app  · access passcode **0000**
> **Screens referenced below live in** `./screens/` (one image per screen).

---

## The two features at a glance

| # | Feature | One-line pitch | Why it matters for Gen Z |
|---|---------|----------------|--------------------------|
| **1** | **Payday Interception + Savings Pockets + Payday Lock** | The moment salary lands, DBS auto-splits it by a chosen framework and *locks* the savings portion until next payday. | Removes the temptation to spend savings; "money you can't see is money you keep." |
| **2** | **Post-Transaction Auto-Categorisation** | Every purchase (Apple Pay, DBS app, Shopee) is auto-tagged into a spending category the moment it happens; users can re-categorise in one tap. | Effortless spend awareness without manual budgeting. |

The two features **interlock**: the Payday Lock sets a *spending budget* for the
cycle, and the auto-categorisation breakdown measures real spending against that
same budget (see Flow 2B → Breakdown).

---

## Landing / flow selector
`/` — `screens/00-landing.png`
Entry hub. Two cards: **Flow 1 (Payday)** and **Flow 2 (Auto-Categorisation)**.
White-outline DBS-style icons. Tapping a flow opens its sub-selector.

---

# FLOW 1 — Payday Interception & Payday Lock

**Selector:** `/payday/flows` — `screens/11-flow1-selector.png`
Two sub-flows, mirroring Flow 2's A/B/C pattern:
- **Flow A — Payday Interception** (the main set-up journey)
- **Flow B — Payday Lock over-spend** (what happens when a purchase would break the lock)

### Flow A — set up the Payday Lock

| Step | Screen | File | What happens |
|------|--------|------|--------------|
| 1 | iOS lock screen + salary notification | `screens/10-payday-lockscreen.png` | "Your salary of S$4,200 has landed." Tapping the notification opens DBS. |
| 2 | DBS login (User ID / PIN) | `screens/12-login.png` | Red **LOG IN** CTA. On tap: **Face ID island** scans → green rotating spheres (verifying) → green check, then a "Live more, Bank less" loader with a key-fill animation. |
| 3 | DBS Home + setup drawer | `screens/13-home-setup-drawer.png` | Home with a bottom drawer inviting "Set up your payday plan." |
| 4 | Framework selection | `screens/14-frameworks.png` | Pick a split framework: Warren Buffett, JP Morgan, or Custom. Each shows a donut of savings / spending / invest. |
| 5 | Theory / learn-more | `screens/15-theory.png` | Explains the chosen rule, why locking matters. (Read-only variant adds a "Change framework" CTA.) |
| 6 | Allocation preview | `screens/16-preview.png` | Shows exactly how the next salary will be split + the amount to be locked. CTA: "Lock my savings." |
| 7 | Lock success | `screens/17-success-locked.png` | Confirmation: savings locked until next payday. |
| 8 | Home — locked state | `screens/18-home-locked.png` | Home now shows a **green** "Payday Lock active" card with locked savings + donut. (When off, the card persists in a grey "Payday Lock off — tap to lock again" state.) |
| 9 | Manage Payday Lock | `screens/19-manage.png` | Two tabs: **Overview** (locked amount, spending-this-cycle tracker, what-is-Payday-Lock) and **Settings** (change framework, toggle the lock on/off). |
| — | More menu | `screens/20-more.png` | DBS "More" tab. QUICK ACCESS includes the **Payday Lock** tile (NEW) beside **Lock with digiVault**. |

### Flow B — Payday Lock over-spend
Entry: `/payday/shopee`

| Step | Screen | File | What happens |
|------|--------|------|--------------|
| 1 | Shopee checkout | `screens/21-flow1b-shopee-checkout.png` | Realistic Shopee checkout (Buldak ramen). The order total would dip into locked savings. |
| 2 | Payment unsuccessful | `screens/22-flow1b-blocked.png` | Generic Shopee "Payment Unsuccessful" screen (no DBS branding on Shopee surfaces). A **DBS push notification** slides in. |
| 3 | Tap notification → DBS | (login sequence) | Notification opens DBS: loader → pre-login → login → Face ID → **Manage Payday Lock**, where the user can switch the lock off to free up funds. |

---

# FLOW 2 — Post-Transaction Auto-Categorisation

**Selector:** `/categorise` — `screens/30-flow2-selector.png`
Three sub-flows showing the same feature across three payment contexts:

### Flow A — Apple Pay (in-store tap)
| Step | Screen | File |
|------|--------|------|
| 1 | Apple Pay checkout / tap | `screens/31-applepay-checkout.png` |
| 2 | Face ID biometric → hold near reader → done | (animation states) |
| 3 | Payment success + auto-categorise banner | `screens/32-applepay-done.png` — a glass notification says the purchase was filed under a category; one tap to change it. |

### Flow B — DBS App review (the core "intelligence" journey)
Login → Face ID → Home → Transaction History → Breakdown → Transaction → Edit categories.

| Step | Screen | File | What happens |
|------|--------|------|--------------|
| 1 | DBS Home | `screens/34-dbsapp-home.png` | Authenticated home. |
| 2 | Transaction History | `screens/35-history.png` | List of recent transactions, each already categorised. |
| 3 | Breakdown — **Spending** tab | `screens/36-breakdown-spending.png` | Donut of spend by category + a **Spending-this-cycle** tracker measured against the **Payday Lock budget** (the two features linked). Total spent changes with the date range: **Today ≈ S$50**, **1 month ≈ S$550**, **3 months ≈ S$2,100**. A subtle amber nudge warns if a category may exceed budget. |
| 4 | Breakdown — **Transactions** tab | `screens/37-breakdown-transactions.png` | Same data as a list; re-categorising any item live-updates the donut, %, and bars. |
| 5 | Transaction detail | `screens/38-transaction-detail.png` | Single transaction with its category. |
| 6 | Edit categories | `screens/39-edit-categories.png` | Pick a new category; the breakdown updates instantly (with a key-fill loading beat for the in-app change). |

### Flow C — Shopee (third-party app)
| Step | Screen | File |
|------|--------|------|
| 1 | Shopee checkout | `screens/40-flow2c-shopee-checkout.png` |
| 2 | Pay → Face ID → payment success | `screens/41-flow2c-done.png` — Shopee success screen with a **glass** DBS categorisation notification (filed under Shopping). |

---

## Signature interactions (good slide moments)
- **Payday interception:** the salary notification → auto-split → *lock* is the hero moment of Feature 1.
- **Face ID Dynamic Island:** scan glyph → green rotating spheres (verifying) → ring + checkmark that springs and strokes itself on (iOS-accurate). Appears on every login + Apple Pay.
- **Key-fill loader:** a DBS key glyph that fills bottom-left→top-right on in-app actions (setting/toggling the lock, changing a category).
- **Features interlock:** Payday Lock's budget is the exact yardstick the categorisation breakdown measures against.
- **Live re-categorisation:** changing a category instantly re-renders the donut, percentages, and the spending bar.

## Design language (for visual consistency on slides)
- **Primary red** `#FF0000`; hero gradient `linear-gradient(160deg,#FF1A1A,#A30000)`.
- **Success green** `#1CA65B` (Payday Lock active, Face ID check).
- **Amber** `#F59300` (subtle budget warnings).
- **Font:** Public Sans. **Card/button radius:** 4px (DBS standard).
- Mobile-first, iOS chrome (status bar, Dynamic Island, bottom tab nav).

## Suggested slide narrative
1. The Gen Z problem (spending savings, no spend awareness).
2. Feature 1 — Payday Lock: intercept → frameworks → lock → manage (Flow A screens).
3. The over-spend guardrail (Flow B).
4. Feature 2 — Auto-categorisation across Apple Pay / DBS app / Shopee.
5. The intelligence layer — breakdown vs. the Payday Lock budget (the interlock).
6. Craft details — Face ID + key-fill micro-interactions.
