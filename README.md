# Gaurav's Blog

A modern, clean blog built with Jekyll, inspired by minimal design principles.

## Features

- 🎨 Clean, modern design
- 📱 Responsive layout
- ⚡ Fast loading
- 📝 Easy content management
- 🔍 SEO optimized

## Content Management

### Creating a New Post

Use the automated script to create new posts:

```bash
./scripts/new-post.sh "Your Post Title"
```

This will:
- Create a new post file with the current date
- Generate a filename from your title
- Include proper front matter
- Provide a template to get you started

### Manual Post Creation

1. Create a new file in `_posts/` directory
2. Name it: `YYYY-MM-DD-title.markdown`
3. Include the required front matter:

```yaml
---
layout: post
title: "Your Post Title"
date: YYYY-MM-DD HH:MM:SS -0400
categories: [category1, category2]
excerpt: "Brief description for blog listing"
---
```

### Post Structure

Each post should include:
- **Title**: Clear, descriptive title
- **Date**: Publication date
- **Categories**: Relevant tags
- **Excerpt**: Brief description (appears in blog listing)
- **Content**: Your main content in Markdown

## Development

### Local Development

1. Install dependencies:
```bash
bundle install
```

2. Start the development server:
```bash
bundle exec jekyll serve
```

3. Open http://localhost:4000 in your browser

### Building for Production

```bash
bundle exec jekyll build
```

## Customization

### Styling
- Edit `_layouts/default.html` for main styles
- All styles are inline for simplicity

### Layout
- `_layouts/default.html` - Main layout
- `_layouts/home.html` - Home page layout
- `_layouts/post.html` - Individual post layout
- `_layouts/page.html` - Static page layout

### Navigation
Update the navigation links in `_layouts/default.html`:

```html
<ul class="nav-links">
    <li><a href="/">Blog</a></li>
    <li><a href="/about/">About</a></li>
    <li><a href="/projects/">Projects</a></li>
</ul>
```

## Deployment

This blog is designed to work with GitHub Pages. Simply push your changes to the main branch and GitHub Pages will automatically build and deploy your site.

## Content Guidelines

### Writing Tips
- Keep titles clear and descriptive
- Write engaging excerpts
- Use proper markdown formatting
- Include relevant categories
- Add code examples when relevant

### Categories
Suggested categories:
- `ai` - Artificial Intelligence topics
- `technology` - General technology
- `tutorial` - How-to guides
- `thoughts` - Personal reflections
- `projects` - Project updates

## Support

For questions or issues, please open an issue on the repository or contact me directly.

---

*Happy blogging!* 🚀
