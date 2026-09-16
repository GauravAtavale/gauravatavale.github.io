# How to apply this to gauravatavale.github.io

## 1. Replace these existing files
Copy these over the current files at the same path in the repo:

- `_config.yml`
- `_layouts/default.html`
- `_layouts/page.html`
- `about.markdown`
- `blog.markdown`
- `projects.markdown`
- `_posts/2025-10-20-reinforce-algorithm.markdown` (fixes the broken equation)
- `index.markdown`

## 2. Add these new files
These don't exist in the current repo yet:

- `_layouts/home.html`
- `_layouts/post.html`
- `_layouts/list.html`
- `_includes/post-card.html`
- `_includes/toc.html`
- `_includes/share-buttons.html`
- `assets/css/style.css`
- `assets/js/theme-toggle.js`
- `assets/js/toc.js`
- `_projects/personal-blog.markdown` (sample entry so /projects/ isn't empty — edit or replace with your real projects)

## 3. Delete these (redundant/unused, left over from earlier iterations)
- `index2.html`
- `project.md` (duplicate of `projects.markdown`)
- Check whether `_blogs/` is actually referenced anywhere — if not, delete it too. It isn't used by anything in this update.

## 4. Fill in your details
- Add a real photo at `assets/images/me.jpg` (or change the path in `_config.yml` under `author.image`)
- Set `author.twitter` / `author.linkedin` in `_config.yml` (leave blank to hide those footer links)
- Update the placeholder `#` links in `about.markdown`
- Update `author.email` in `_config.yml`

## 5. Going forward
- New blog posts: same as before, drop a file in `_posts/` named `YYYY-MM-DD-title.markdown`. Add `tags: [tag1, tag2]` and `excerpt: "..."` to the front matter to get tag pills and a proper card excerpt.
- New projects: add a file to `_projects/` (no date needed in the filename, just `date:` in the front matter) — it'll automatically appear on `/projects/` using the same card layout.
- Math: write LaTeX using `$$ ... $$` for display equations or `\\( ... \\)` for inline math. Avoid raw `|` characters outside of math — if you need "given" or absolute-value bars, use `\mid` or `\vert` inside the math instead, since a literal `|` at the start of a line makes Kramdown think it's a markdown table.
- Long posts (10+ headings) automatically get a table of contents — no extra work needed, it's generated client-side from your `##`/`###` headings.

## Notes on how this was built
- No new Jekyll plugins beyond what you already had (`jekyll-feed`, `jekyll-seo-tag`) — the table of contents is generated in the browser via `assets/js/toc.js`, not a Ruby plugin, so this works whether GitHub Pages builds your site the classic way or via a GitHub Actions workflow.
- Dark mode is a plain CSS-variables + `localStorage` toggle — no framework.
- Math rendering uses MathJax v3 loaded from a CDN, triggered by `kramdown: math_engine: mathjax` in `_config.yml`.
