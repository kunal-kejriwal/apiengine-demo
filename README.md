Here's the full README.md — copy and paste:

```markdown
# APIEngine Demo

A live demo app showcasing the **[APIEngine React SDK](https://www.npmjs.com/package/@apiengine/react-sdk)** — drop-in React components for auth, protected routes, and live data forms backed by [APIEngine](https://theapiengine.com).

Built with React 19 + Vite. Every page in this app is wired up using SDK primitives — no hand-rolled auth, no custom form plumbing.

## What's inside

- **JWT Auth** — login, signup, silent token refresh
- **Email Verification** — 6-digit code flow
- **`<ProtectedRoute>`** — guard any route, redirect guests
- **`<AppNavbar>` / `<AppHero>`** — auth-aware UI that adapts to guest vs logged-in state
- **Blueprint Mode** — undefined routes render a guided scaffold instead of a blank 404
- **Live Data Forms** — `<JsonDbForm>`, `<CustomObjectForm>`, `<StandardObjectForm>` push records straight to your APIEngine backend

## Quick start

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Configuration

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=https://api.theapiengine.com
VITE_API_KEY=your-api-key
VITE_APP_NAME=My App
VITE_DOCS_URL=
VITE_DASHBOARD_URL=
```

Get your API key from the [APIEngine dashboard](https://theapiengine.com).

## Links

- **React SDK on npm** — https://www.npmjs.com/package/@apiengine/react-sdk
- **APIEngine** — https://theapiengine.com

## Scripts

| Command           | What it does                |
| ----------------- | --------------------------- |
| `npm run dev`     | Start Vite dev server (HMR) |
| `npm run build`   | Production build            |
| `npm run preview` | Preview the production build |
| `npm run lint`    | Run ESLint                  |
```
