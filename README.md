This is a Next.js project for an online ordering website (Epic Pizza & Pasta).

## Project progress (milestone status)

Summary based on repository inspection (files & endpoints):

- Milestone 1 — Foundational setup & UI/UX: DONE
	- Evidence: Next.js app structure, Tailwind config, layout and pages in `src/app`.
- Milestone 2 — Dynamic menu & checkout: DONE
	- Evidence: `src/app/menu/page.tsx` (fetch `/api/menu-items`), `src/app/api/menu-items/route.ts`, `src/data/menuData.ts`, `src/context/CartContext.tsx`, `src/app/checkout/page.tsx`, `src/app/api/orders/route.ts`, `src/models/MenuItem.ts`, `src/models/Order.ts`.
- Milestone 3 — Payment gateway & delivery distance: NOT IMPLEMENTED
	- No payment provider integration (Omise/Stripe/PromptPay) or Google Maps distance calculation found.
- Milestone 4 — Order automation (email / Google Sheets / kitchen printing): PARTIAL
	- Orders are saved to MongoDB. No Gmail/Sheets/Xprinter automation found in code.
- Milestone 5 — Live deployment & handover: NOT YET
	- App is ready for deploy for core features, but payment & automations should be added before full production launch.

Estimated progress: ~60% (Milestones 1+2 complete, order storage implemented, automations and payments pending).

## Quick developer setup

1. Install and run locally:

```powershell
npm install
npm run dev
```

2. Required environment variables (create `.env.local`):

```text
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/<db>?retryWrites=true&w=majority
JWT_SECRET=changeme
# Optional
FORCE_PUBLIC_DNS=true
```

3. Seeding (optional):

```powershell
npm run seed
# or to destroy seed data
npm run seed:destroy
```

## Recommended deployment options

Short recommendation:

- Vercel — Best if you want the smoothest experience for Next.js (built-in optimizations, image / edge features). Use with MongoDB Atlas.
- Render — Good choice if you want more control over Node process, background workers, and a predictable price model. Works well for this app.
- If you need to integrate local printers (Xprinter) directly, consider hybrid: cloud app + local print-bridge (Raspberry Pi) or use PrintNode/relay service.

Notes for Render/Vercel deployment:

- Ensure `MONGODB_URI` and `JWT_SECRET` are set in the platform's environment variables.
- Build command: `npm ci && npm run build` (or `npm run build`) and Start command: `npm run start` for serverful deployment.
- Set Node version explicitly (add `"engines": { "node": ">=18" }` to `package.json` if needed).

## Next recommended engineering steps (high priority)

1. Integrate a payment gateway and server-side webhook for payment confirmation (Stripe, Omise, or a PromptPay QR flow).
2. Add delivery fee calculation: implement Google Maps Distance Matrix or server-side geocoding + haversine fallback.
3. Implement order automation: email notifications (nodemailer/Gmail API), Google Sheets logging (Sheets API), and a print-bridge for Xprinter.
4. Add basic tests and smoke checks for `/api/menu-items` and `/api/orders`.

## Minimal env-vars checklist for production

- MONGODB_URI
- JWT_SECRET
- PAYMENT_API_KEY (if payment added)
- GOOGLE_MAPS_API_KEY (if distance calc added)

## How I verified

- Inspected `src/app/menu`, `src/app/checkout`, `src/app/api/*` routes, `src/models/*`, and `src/context/*` to confirm implemented features.

---

If you want, I can now:

- Add a short `DEPLOY.md` with step-by-step Render and Vercel instructions.
- Create skeleton code for payment webhook + Google Maps distance calculator.
- Add README section showing exact env var names and example Render service config.

Tell me which of the three actions above you want next and I will implement it.
