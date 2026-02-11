# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **OneBusAway developer documentation site** (https://developer.onebusaway.org), built with [Bridgetown](https://www.bridgetownrb.com/) ~1.3.4, a Ruby-based static site generator. It uses ERB templates, Tailwind CSS, and esbuild for frontend bundling.

## Prerequisites

- Ruby 3.4.1 (see `.ruby-version`)
- Node.js >= 12
- Yarn

## Commands

```bash
# Install dependencies
bundle install
yarn install

# Development server (hot-reloads on changes)
bin/bridgetown start

# Production build (clean + frontend build + site build)
rake deploy

# Test build
rake test

# Clean output directory
rake clean

# Build frontend only (minified)
yarn esbuild

# Build frontend in watch/dev mode
yarn esbuild-dev
```

Note: `bridgetown.config.yml` is NOT hot-reloaded — restart the server after editing it.

## Architecture

### Content & Templates

- **Content** lives in `src/` as Markdown (`.md`) and ERB (`.erb`) files with YAML front matter
- **Layouts** in `src/_layouts/`: `default.erb` (main shell with sidebar nav), `page.erb` (prose wrapper), `post.erb`, `rest_api.erb` (API docs with JSON editor)
- **Components** in `src/_components/`: paired `.rb` + `.erb` files (e.g., `navigation_section`)
- **Partials** in `src/_partials/`: reusable template fragments (head, footer, navbar, etc.)
- **Data files** in `src/_data/`:
  - `site_metadata.yml` — site-wide variables accessed as `site.metadata.*` (title, email, `oba_version`)
  - `rest_api.json` — defines all REST API methods and response elements, drives the API reference section
  - `application_modules.json` — OBA module download URLs, uses `{{OBA_VERSION}}` placeholder

### API Documentation Pattern

REST API docs under `src/api/where/methods/` and `src/api/where/elements/` use the `rest_api` layout. This layout renders the title, description, and sample request URL from front matter, and embeds a JSON editor showing example responses from `src/api/example_responses/`.

### Frontend

- **Tailwind CSS** with JIT mode, dark mode via selector strategy (`dark:` prefix, localStorage-driven)
- **esbuild** bundles `frontend/javascript/index.js` and processes `frontend/styles/index.css` through PostCSS
- **Custom typography** defined in `typography.js` (extends Tailwind typography plugin)
- **Alpine.js** used for lightweight interactivity (theme switching)
- Tailwind scans `src/**/*.{html,md,liquid,erb,serb,rb}` for class usage

### Plugins

Custom Bridgetown plugins in `plugins/builders/`:
- `helpers.rb` — adds `equal_paths` helper for navigation URL comparison
- `tailwind_jit.rb` — watches files and triggers Tailwind JIT refresh

### URL Structure

Uses `permalink: pretty` — files map to clean URLs (e.g., `src/guides/quickstart-guide.md` → `/guides/quickstart-guide/`).

## Deployment

Pushes to `main` trigger a Render deploy webhook via GitHub Actions (`.github/workflows/ci.yml`). The site is hosted as a static site on Render.
