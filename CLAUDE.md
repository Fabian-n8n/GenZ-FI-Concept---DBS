# GenZ FI Concept — DBS

Usability test prototype for two DBS digibank Gen Z financial intelligence features.

## Project context
- **Purpose**: Clickable prototype for moderated usability testing sessions
- **Users**: Singapore Gen Z (22–28), tech-savvy, mobile-first
- **Stack**: Next.js 15 (App Router, static export), Tailwind CSS, Lucide icons
- **Deployed**: Vercel

## Two flows

### Flow 1 — Payday Interception + Savings Pockets + Payday Transfer Lock
Entry: `/payday` (iOS lock screen with salary notification)

| Screen | Route |
|--------|-------|
| Lock screen + notification | `/payday` |
| DBS Login (User ID / PIN) | `/payday/login` |
| Face ID animation | `/payday/faceid` |
| DBS Home + setup drawer | `/payday/home?setup=1` |
| Framework selection | `/payday/frameworks` |
| Theory article | `/payday/frameworks/theory?fw=warren` |
| Allocation preview | `/payday/frameworks/preview?fw=warren` |
| Lock success | `/payday/success?variant=locked&fw=warren` |
| Home locked state | `/payday/home?fw=warren&locked=1` |
| Shopee checkout | `/payday/shopee?locked=1` |
| Payment blocked | `/payday/shopee/blocked` |
| More menu | `/payday/more?fw=warren&locked=1` |
| Manage Payday Lock | `/payday/manage?fw=warren&locked=1` |

URL params that carry state between screens:
- `fw=warren|jpm|custom` — active framework
- `locked=0|1` — whether payday lock is active
- `setup=1` — open the setup drawer on home
- `variant=locked|updated|off` — success screen variant

### Flow 2 — Post-Transaction Auto-Categorisation
Entry: `/categorise` (flow selector)

Sub-flow A — Apple Pay: `/categorise/apple-pay` → biometric → hold → done
Sub-flow B — DBS App: `/categorise/dbs-app` → biometric → home → history → breakdown → transaction → edit-categories
Sub-flow C — Shopee: `/categorise/shopee` → done

## Design tokens
All DBS design tokens are in `app/globals.css` as CSS custom properties on `:root`.
Key values:
- Primary red: `#FF0000` (`--color-brand`)
- Hero gradient: `linear-gradient(160deg, #FF1A1A, #A30000)`
- Font: `Public Sans` (400/500/600/700/800)
- Card radius: `4px` (`--radius-tile`) — DBS standard
- Button radius: `4px`

## Component locations
- Shell: `components/shell/` — PhoneFrame, StatusBar, AppBar, BottomNav
- Primitives: `components/primitives/` — Drawer, Alert, Switch, Donut, TopNotif
- Data: `lib/` — frameworks.js, categories.js, transactions.js

## Development
```bash
npm run dev    # localhost:3000
npm run build  # static export to /out
```
