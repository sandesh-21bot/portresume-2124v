# Project file map

This document lists the important files and folders in the repository and a short description of what each does. Use it as a quick reference while working on the project.

## Top-level

- `package.json` — project metadata, scripts (dev/build/preview), and dependency lists.
- `bun.lockb` / `package-lock.json` / yarn lock — lockfiles that pin dependency versions.
- `index.html` — Vite app entry HTML where the React app mounts.
- `postcss.config.js` — PostCSS pipeline configuration (loads Tailwind and autoprefixer).
- `tailwind.config.ts` — Tailwind CSS configuration (content paths, theme extensions, and plugins).
- `vite.config.ts` — Vite dev server and build configuration.
- `README.md` — general project documentation.

## Configuration / TypeScript

- `tsconfig.json` — root TypeScript config referencing app and node configs.
- `tsconfig.app.json` — TypeScript options used for the app build (includes `src`).
- `tsconfig.node.json` — TypeScript options for Node-side tooling if present.

## `src/` — application source

- `main.tsx` — app entry: renders the React tree and wraps global providers.
- `index.css` — global stylesheet where Tailwind base/utilities are imported and global styles live.
- `App.tsx` / `App.css` — top-level app component and extra CSS.

### `src/components/`

- `Hero.tsx` — landing hero component used on the index page.
- `ResumePreview.tsx` — renders the resume preview used by the UI.

#### `resume-layouts/`
- `ArtisticLayout.tsx`, `ClassicLayout.tsx`, `CompactLayout.tsx`, `CreativeLayout.tsx`, `ElegantLayout.tsx`, `GridLayout.tsx`, `MinimalLayout.tsx`, `ModernLayout.tsx`, `ProfessionalLayout.tsx`, `TechLayout.tsx`, `TimelineLayout.tsx` — alternative resume templates/layouts used for preview/print.
- `index.ts` — re-exports available layouts for easier imports.

#### `ui/` (design system primitives and wrappers)
- A set of small composable UI components (Radix + Tailwind wrappers) used across the app. Examples:
  - `button.tsx`, `input.tsx`, `textarea.tsx`, `select.tsx`, `checkbox.tsx`, `radio-group.tsx`, `label.tsx` — form controls.
  - `dialog.tsx`, `popover.tsx`, `dropdown-menu.tsx`, `alert-dialog.tsx` — overlay components.
  - `tabs.tsx`, `accordion.tsx`, `tabs.tsx`, `carousel.tsx`, `pagination.tsx` — navigation and layout helpers.
  - `toaster.tsx`, `toast.tsx`, `sonner.tsx`, `use-toast.ts` — toast notification wiring.
  - `sidebar.tsx`, `menubar.tsx`, `navigation-menu.tsx` — app navigation UI.
  - `skeleton.tsx`, `badge.tsx`, `avatar.tsx`, `tooltip.tsx` — small utilities & visuals.

### `src/hooks/`
- `use-mobile.tsx` — detects mobile viewport/UX preferences and exposes a boolean or utilities.
- `use-toast.ts` — hook to trigger toasts across the UI.

### `src/integrations/supabase/`
- `client.ts` — initializes and exports the Supabase client instance (use across the app).
- `types.ts` — TypeScript types for Supabase rows/responses used by your app.

### `src/lib/`
- `utils.ts` — general helper functions (formatters, small utilities used by pages/components).

### `src/pages/`
- `Index.tsx` — main landing page (app entry route). Contains the resume builder interface with:
  - Template selection
  - Form inputs for personal information
  - Real-time resume preview
  - Download/export options
- `Auth.tsx` — authentication UI (sign in / sign up flows). Handles:
  - Email/password authentication
  - Social login options
  - Password reset flow
  - Account creation
- `Dashboard.tsx` — protected application dashboard page. Features:
  - Saved resume list
  - Resume editing and management
  - Account settings
  - Usage statistics
- `NotFound.tsx` — 404 fallback page with:
  - Friendly error message
  - Navigation links back to main pages
  - Search functionality

### `src/types/`
- `tailwindcss.d.ts` — (present in this repo) a lightweight fallback declaration for the `tailwindcss` module so TypeScript doesn't error if types are not resolvable. It can be removed once tooling and node_modules are resolved and you prefer the package types.

## `supabase/` (serverless + migrations)

- `config.toml` — supabase project config for local functions & tooling.
- `functions/enhance-content/index.ts` — a Supabase Edge Function (serverless code) to enhance content (project specific).
- `migrations/` — SQL migration files (each file is a DB migration snapshot).

## Misc

- `.gitignore` — files and folders excluded from Git.
- `public/` — static assets served by Vite (images, icons, robots.txt).

## Quick dev commands

Use the package manager you prefer — this repo has been used with `yarn` in this workspace.

```powershell
yarn install
yarn dev
```

or with npm:

```powershell
npm install
npm run dev
```

## Notes & suggestions

- If you ever see TypeScript errors complaining about missing module types (for example `Cannot find module 'tailwindcss'`), ensure dependencies are installed and restart the TypeScript server in VS Code. A temporary fallback `.d.ts` file (like `src/types/tailwindcss.d.ts`) can be used but should be removed once proper types resolve.
- `tailwind.config.ts` is typed and used by the build; if tooling complains, consider using `tailwind.config.cjs` for simpler Node resolution in some environments.

---

If you want, I can add more details (example usages, where each UI component is used, or create a smaller `README` section with run/debug instructions). Do you want this file committed as-is or expanded with links to key files?
