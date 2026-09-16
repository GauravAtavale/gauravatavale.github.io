# Restyled to match goyalpramod.github.io

This repo now uses the same theme approach as Pramod's blog: **Minima + Bootstrap + a custom `assets/main.scss`**, his exact layouts/scripts, adapted to your identity and content.

## What to do
Unzip over your local clone (replace everything except `.git`), then:

    git add -A
    git commit -m "Restyle to match goyalpramod theme"
    git push

GitHub Pages will build it. To preview locally you need Ruby + Bundler:

    bundle install
    bundle exec jekyll serve

## Key files
- `assets/main.scss` — Pramod's full stylesheet (dark mode, cards, TOC drawer, portrait hero, share/back-to-top). Compiles to `/assets/main.css`. All colors live in the `:root` / `[data-theme="dark"]` blocks near the top — edit there to retheme.
- `_layouts/default.html` — page shell: fonts (Lora/Nunito), Font Awesome, Bootstrap, dark-mode + TOC + back-to-top + copy-code scripts.
- `_layouts/home.html` — two-column hero (bio + portrait) and the "Latest Post" card.
- `_layouts/post.html` — featured image, TOC drawer, share buttons, **Giscus** comments (your existing repo IDs), back-to-top.
- `_layouts/page.html` — About.
- `blog.md` / `projects.md` — card grids over your `posts` / `projects` collections.
- `_includes/head.html header.html footer.html toc.html` — head/nav/footer/TOC.
- `assets/scripts/*.js` — Pramod's dark-mode, toc, backToTop, copyCode (verbatim).

## What I changed vs Pramod's original
- **Dropped** Firebase voting, Google Analytics, D3/Chart.js (you don't need those services).
- **Comments**: kept your working **Giscus** setup instead of his Utterances.
- **Nav**: Blog / Projects / About (his was Blog / Thoughts / Projects / CV).
- **Identity/socials**: driven by `_config.yml` (`author.name`, `github_username`, etc.).
- **Collections**: your `posts` + a `projects` collection (his used `blogs`/`thoughts`/`notes`).

## Still on you
- Replace `assets/images/me.jpg` with your own photo (currently Pramod's placeholder — swap it!).
- Set `twitter_username` / `linkedin_username` in `_config.yml` (blank = hidden).
- Set your real `email`.
- Add posts to `_posts/` and projects to `_projects/`. Add `image:` front matter to get a featured image + card thumbnail; add `tags: [...]` for category chips.
- Math: use `$$...$$` (display) or `$...$` (inline) — MathJax is wired in.

## Note
I couldn't run a live `jekyll build` here (the sandbox blocks rubygems.org), but every file is adapted from Pramod's already-deployed, working templates, and all Liquid/YAML/asset references validate. If GitHub Pages reports a build error, it'll almost certainly be a missing gem — make sure the Actions build (or Pages "Build with Jekyll") picks up the Gemfile.
