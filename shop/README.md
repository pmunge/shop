# Shop

Angular 18 ecommerce frontend with SSR support, admin dashboards, and a brown-toned UI theme. This repo includes both client and server build targets and can run locally or via Docker.

## Tech Stack
- Angular 18 (standalone components)
- Angular Material + Bootstrap
- Font Awesome
- SSR via `@angular/ssr`
- Node/Express for SSR hosting

## Key Features
- Public storefront (home, products, cart, checkout)
- Auth flows (login/register/reset)
- Admin dashboard (users/admins/products/orders)
- Responsive UI with themed components

## Project Structure
- `src/app/modules/home` – landing page sections
- `src/app/modules/products` – product listing
- `src/app/modules/user-dashboard` – cart/checkout/orders
- `src/app/modules/admin-dashboard` – admin panels
- `src/app/services` – API services + interceptors
- `src/envs` – environment config
- `src/styles.scss` – global styles + theme tokens

## Environment
- `src/envs/env.ts` – admin API base (default: `http://localhost:8081/api/admin`)
- `src/envs/env.development.ts` – public API base
- `src/proxy.conf.json` – local API proxy for `/api`

If you run locally and your backend is elsewhere, update `env.ts` / `env.development.ts`.

## Local Development
```bash
npm install
npm run start
```
Default dev server: `http://localhost:4200`

## Build
```bash
npm run build
```

## SSR Serve (after build)
```bash
npm run serve:ssr:shop
```

## Docker
```bash
docker compose up --build
```
App will be available on port `4000`.

## Useful Scripts
- `npm run start` – dev server
- `npm run build` – production build
- `npm run watch` – build + watch
- `npm run test` – unit tests
- `npm run serve:ssr:shop` – serve SSR output

## Notes
- This project uses Angular SSR. Any direct `localStorage` access must be guarded for server rendering.
- Production build budgets are defined in `angular.json` and may require adjustment as styles grow.

---

If you want a more detailed README (API docs, screenshots, or architecture), tell me what to include.
