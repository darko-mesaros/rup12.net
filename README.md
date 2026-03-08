# rup12.net - blog stack

Personal blog by repo! Here be shenanigans! Live at **[rup12.net](https://rup12.net)** 🚀

---

## Stack

| Layer | Technology |
|---|---|
| Framework | [Astro](https://astro.build) v5 (static output) |
| Styling | Tailwind CSS v4 |
| Hosting | Cloudflare Workers (via Wrangler) |
| Read tracking | Cloudflare KV (`PAGE_VIEWS` namespace) |
| Syntax highlighting | rehype-pretty-code |
| RSS / Sitemap | `@astrojs/rss`, `@astrojs/sitemap` |

---

## Architecture

This is a **Cloudflare Worker**, not Cloudflare Pages. That distinction matters:

- Astro builds to `dist/` with `output: 'static'`
- `wrangler.jsonc` is the source of truth for deployment config
- The worker entrypoint is `public/_worker.js`, Astro copies it to `dist/` at build time
- `public/.assetsignore` contains `_worker.js` to prevent it being served as a static asset
- Static assets are served via `env.ASSETS.fetch(request)` passthrough in the worker

### Worker responsibilities (`public/_worker.js`)

- `POST /api/track`: silent read counter (writes to KV, filters bots, deduplicates per session via `sessionStorage`)
- `GET /dashboard`: basic-auth protected page view dashboard (reads from KV, sorted by count)
- Everything else: passes through to static assets

---

## Features

- **Retro modes**: every post has an 80s (plain `.txt`) and 90s (raw `.html`) version, generated via [`goback`](https://github.com/darko-mesaros/tools) and served from `public/80s/` and `public/90s/`
- **Reading time**: calculated at build time via a remark plugin
- **RSS feed**: at `/rss.xml`
- **Sitemap**: auto-generated
- **SEO/AEO**: canonical URLs, JSON-LD `BlogPosting` schema, Open Graph tags, Twitter card tags
- **llms.txt**: structured content index for LLM/AI crawlers, generated via [`elelem`](https://github.com/darko-mesaros/tools)
- **301 redirects**: handles legacy no-trailing-slash URLs for already-indexed posts
- **Resume page**: at `/resume` with 4 switchable themes: default, IE5, NES, Teletext

---

## Local Development

```bash
npm install
npm run dev        # dev server at localhost:4321
npm run build      # type-check + build to dist/
```

---

## Deployment

Deploys automatically on push to `main` via Cloudflare's Git integration.

Manual deploy:
```bash
npm run build
npx wrangler deploy
```

> **Note to self:** Always update `compatibility_date` in `wrangler.jsonc` when deploying after a long gap.

---

## New Post

Use the `just` recipe to scaffold a new post with frontmatter:

```bash
just new-post my-post-slug
```

This creates a `src/pages/posts/my-post-slug.md` with the standard frontmatter template based off previous posts. I should likely keep this updated if the front matter changes.

---

## Retro Versions - sure why not

This is a work in progress, but I build local tools (you can find them [here](https://github.com/darko-mesaros/tools)) that convert my markdowns in to 90s and 80s looking websites. It's flaky at best, but it's an experiment.

Regenerate the 80s/90s static versions of all posts.
```bash
just retro
```

## Hello our AI overlords

Regenerate `llms.txt`:

```bash
just llms
```

---

## Read Tracking

Article views are tracked silently via a Cloudflare KV namespace (`PAGE_VIEWS`). The counter fires once per tab session (using `sessionStorage`) and drops bot traffic.

```bash
# List all tracked posts
npx wrangler kv key list --binding PAGE_VIEWS --remote

# Get count for a specific post
npx wrangler kv key get "views:<slug>" --binding PAGE_VIEWS --remote
```

The dashboard is at `/dashboard` (basic auth required).

---

## License

[MIT](LICENSE)
