@AGENTS.md
# WCAG Accessibility Dashboard - Project Architecture

## Project Overview

This project is a professional scientific dashboard for WCAG accessibility analysis.

The application visualizes:

* WCAG violations
* accessibility severity
* clustering and PCA
* machine learning metrics
* association rules
* accessibility insights

The project must be production-ready, scalable, accessible and maintainable.

---

# Stack

Mandatory stack:

* Next.js 15 App Router
* TypeScript
* Material UI (MUI)
* Recharts
* PapaParse

---

# Architecture Rules

## App Router

Use App Router only.

Do not use Pages Router.

---

# Rendering Strategy

## Server Components

Prefer Server Components whenever possible.

Use Server Components for:

* layouts
* static data loading
* dashboards with no interactivity
* JSON parsing
* CSV preprocessing

## Client Components

Use Client Components ONLY when necessary.

Use "use client" only for:

* charts
* interactive tables
* filters
* tooltips
* hover interactions

Avoid unnecessary client rendering.

---

# Data Loading

All files are located in:

public/data/

CSV files must be loaded through reusable utility functions.

Create:

* typed parsers
* reusable loaders
* validation helpers

Avoid duplicated parsing logic.

---

# Security Rules

Never use:

* dangerouslySetInnerHTML
* eval
* dynamic script injection

Do not expose sensitive environment variables.

No external APIs should be required.

All dashboard data is local/static.

---

# Accessibility Requirements

Accessibility is mandatory.

Follow:

* semantic HTML
* keyboard navigation
* proper aria labels
* accessible chart descriptions
* color contrast compliance

The dashboard itself must follow WCAG best practices.

---

# UI Rules

Use Material UI professionally.

Requirements:

* responsive layout
* accessible sidebar
* consistent spacing
* reusable cards
* loading skeletons
* empty states
* modern dashboard aesthetic

Avoid visual clutter.

---

# Code Quality

Requirements:

* modular architecture
* reusable components
* typed interfaces
* no duplicated code
* feature-based organization
* clean naming conventions

---

# Performance

Requirements:

* memoize expensive calculations
* avoid unnecessary rerenders
* lazy load heavy components when necessary
* keep bundle size optimized

---

# Folder Organization

Use this structure:

src/
app/
components/
features/
lib/
hooks/
types/

---

# Charts

Use Recharts only.

All charts must:

* be responsive
* have tooltips
* have legends
* support dark mode
* support accessibility

---

# Tables

Use Material UI DataGrid for large datasets.

---

# Styling

Use:

* Material UI components
* sx prop when appropriate
* theme customization

Avoid inline CSS unless necessary.

---

# Dashboard Goals

The final dashboard must:

* look professional
* be portfolio-ready
* support deployment on Vercel
* scale for future datasets
* support future API integration

---
