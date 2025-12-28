---
trigger: always_on
description: This rule explains Next.js conventions and best practices for fullstack development.
---

# Next.js Rules

This document defines the strict technical constraints for the Next.js 16 workspace. The Agent must strictly adhere to these rules to ensure build stability and code quality.

## 1. TypeScript Enforcement (tsconfig)
- **Strict Mode:** ALWAYS write code assuming `"strict": true` is enabled.
- **No Implicit Any:** NEVER leave a variable type implicit if it infers to `any`. Define types explicitly.
- **Strict Null Checks:** Do not assume values exist. Use Optional Chaining (`user?.profile?.id`) and Nullish Coalescing (`??`) rather than force-unwrapping (`!`).
- **Path Aliases:** ALWAYS use the `@/` alias for imports.
  - *Correct:* `import Button from '@/components/ui/button'`
  - *Incorrect:* `import Button from '../../components/ui/button'`
- **DOM Lib:** When using browser APIs (window, document), ensure they are wrapped in a `useEffect` or strict environment check, as Next.js renders on the server first.

## 2. ESLint Standards (Flat Config)
- **Arrow Functions:** Use Arrow Functions for ALL components.
  - `const MyComponent = () => { ... }`
- **Imports:**
  - Sort imports: Built-in > External > Internal (@/).
  - Use `import type` for all interfaces/types.
- **Strings:** Use Single Quotes (`'`) generally. Use Backticks (`` ` ``) for template literals.
  -JSX Attributes: STRICTLY use Single Quotes.
- **React:**
  - No `React.FC` types (they are deprecated/unnecessary).
  - No `defaultProps` (use default arguments in the function signature).
- **Prohibited:**
  - `console.log` (Use a proper logger or remove before committing).
  - `any` type (Use `unknown` or define the shape).
  - `TODO` comments (Fix it now or don't write it).

## 3. Native Implementation Standards (No External Libs)
- **HTTP Requests:**
  - STRICTLY use native `fetch`.
  - Create a custom `fetchClient` utility in `@/lib/fetch-client.ts` if interceptors are needed.
- **State Management:**
  - Do NOT use Redux, Zustand, or Recoil.
  - Use React Context + `useReducer` for complex state.
  - Use URL Search Params for shareable state.
- **Form Handling:**
  - Do NOT use `react-hook-form` or `formik` for simple forms.
  - Use native `<form action={serverAction}>` and `FormData`.
  - Use `useActionState` (React 19) for form validation feedback.
- **Utilities:**
  - Write your own helper functions in `@/lib/utils.ts`.
  - *Example:* Instead of `clsx`, write: `export const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');`

## 4. Next.js 16 Patterns
- Server Components should be `async function`.
- Use `"use server"` at the top of action files.
- When passing data from Server to Client, ensure it is serializable (Dates -> Strings/Numbers).
- Use the App Router structure with `page.tsx` files in route directories.
- Client components must be explicitly marked with `'use client'` at the top of the file.
- Use kebab-case for directory names (e.g., `components/auth-form`) and PascalCase for component files.
- Prefer named exports over default exports, i.e. `export function Button() { /* ... */ }` instead of `export default function Button() { /* ... */ }`.
- Minimize `'use client'` directives:
  - Keep most components as React Server Components (RSC)
  - Only use client components when you need interactivity and wrap in `Suspense` with fallback UI
  - Create small client component wrappers around interactive elements
- Avoid unnecessary `useState` and `useEffect` when possible:
  - Use server components for data fetching
  - Use React Server Actions for form handling
  - Use URL search params for shareable state
- Use `nuqs` for URL search param state management
- Performance"
  - Use `next/image` for all media.
  - strictly use `import type` when importing TypeScript interfaces.