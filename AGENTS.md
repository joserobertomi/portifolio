<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## CI/CD and deployment

- GitHub Actions runs the `CI` workflow (`npm run lint` and `npm run build`) for
  pull requests targeting `main` and pushes to `main`.
- The `main` branch is protected: merge pull requests only after the required
  `Lint and build` status check succeeds.
- Vercel is connected to this repository. A push to any non-`main` branch
  creates a Preview Deployment; a merge or push to `main` deploys production
  automatically.
- Production URLs: `https://www.joserobertomi.com` (canonical) and
  `https://joserobertomi.com` (permanent redirect to `www`).
- Do not commit `.vercel` or environment files. Manage production secrets in
  the Vercel project settings.
