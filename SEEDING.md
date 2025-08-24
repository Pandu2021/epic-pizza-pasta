Seeding guide

Usage
- Create `.env.local` with `MONGODB_URI=...` (or set `SEED_MONGODB_URI` to override for seeding only).
- Run:
  - `npm run seed` to import data
  - `npm run seed:destroy` to delete data

Troubleshooting
- DNS ETIMEOUT on `*.mongodb.net`:
  - Ensure internet connectivity and that your MongoDB Atlas IP Access List allows your IP.
  - If behind restrictive DNS/IPv6, the seeder forces IPv4 and increases `serverSelectionTimeoutMS`.
  - You can also test by setting `SEED_MONGODB_URI` to a direct connection string (non-SRV) if available.
