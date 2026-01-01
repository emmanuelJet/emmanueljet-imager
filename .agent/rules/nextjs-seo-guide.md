---
trigger: always_on
---

# Next.js 16 SEO & Metadata Standards

This document defines the strict SEO implementation rules using the native Metadata API. 
**Constraint**: Do NOT use `next-seo` or `react-helmet`. Use strictly native `next` APIs.

## 1. Global Metadata Configuration (`layout.tsx`)
- **Base URL**: ALWAYS define `metadataBase` in the root layout to ensure Open Graph images work.
- **Title Template**: Use a template to enforce branding on other pages aside the index page that will promote the website.
- **Keywords**: Populate global keywords relevant to the project.
- **Social Cards**: Ensure all Open Graph and Twitter social cards are fully and properly configured.

## 2. Dynamic Metadata (`page.tsx`)
- **Usage**: For dynamic routes, use `generateMetadata`.
- **Optimization**: If `generateMetadata` and the Page component fetch the same data, Next.js memoizes the request automatically. Do not worry about double-fetching.

## 3. File-Based Metadata (The "Magic Files")
- **Robots**: create `app/robots.ts` (Dynamic generation).
- **Sitemap**: create `app/sitemap.ts` (Dynamic generation).
- **Manifest**: create `app/manifest.ts` (PWA standards).

## 4. Structured Data (JSON-LD)
- **Implementation**: Inject JSON-LD scripts inside the `page.tsx` component.
- **Method**:
  ```tsx
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
  />
  ```
- **Types**: Strictly type the JSON object using Graph or Thing from standard TypeScript interfaces.

## 5. Canonical & Alternates
- **Self-Referencing**: Ensure every page has a canonical URL pointing to itself.
- **Languages**: If we add multi-language support later, `use alternates: { languages: ... }`.