# Task Management Dashboard

A task management dashboard built with Next.js, TypeScript, and Redux Toolkit. Users can log in, create and manage tasks, filter and search through them, and switch between light and dark mode.

## Installation

Clone the repo and install dependencies:

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`. You will be redirected to the login page automatically.

## Logging In

There is no real authentication. Enter any valid email and a password with at least 6 characters and you will be logged in. The session is stored in a cookie and persisted across page refreshes via Redux Persist.

## Environment Variables

No environment variables are required. The app uses Next.js Route Handlers as a mock backend with an in-memory data store.

## Project Structure

```
src/
  app/                        Next.js pages and API routes
    api/tasks/                GET, POST /api/tasks
    api/tasks/[id]/           PUT, DELETE /api/tasks/:id
    login/                    Login page
    tasks/                    Task list page
    tasks/[id]/               Task detail page

  components/
    common/                   Shared UI — SummaryCard, EmptyState, ConfirmDialog
    layout/                   DashboardLayout, PageTransition
    ui/                       shadcn components

  features/
    auth/                     authSlice — login and logout state
    dashboard/                Dashboard page with summary stats
    tasks/                    Task list, detail, form, filters, skeleton
    ui/                       uiSlice — search, filters, sort, selected task

  hooks/                      useDebounce, useIsMobile
  lib/                        animations, validations, auth-cookies, utils
  services/                   RTK Query API (tasksApi)
  store/                      Redux store, StoreProvider
  types/                      Shared TypeScript types
```

## Libraries Used

Next.js 16 with the App Router(Page router) for routing and API routes.

  Redux Toolkit for auth state, UI state (filters, search, selected task), and RTK Query for all API calls. Redux Persist keeps the auth session and filter preferences across refreshes. The API cache is intentionally not persisted.

  shadcn/ui   for all UI components. This version uses Base UI under the hood instead of Radix, so the `render` prop pattern is used instead of `asChild`.

  Framer Motion   for page transitions, staggered card animations on the dashboard, row enter and exit animations on the task table, and hover effects.

  react-hook-form + Zod   for form handling and validation on both the login form and the task form.

  next-themes   for dark and light mode. The selected theme is persisted automatically via localStorage.

## Assumptions

Tasks are stored in memory on the server. Because Next.js serverless functions do not share state between invocations in production, the in-memory store is only reliable in development where the server is a single long-running process. Connecting a real database would be the next step before deploying.

The authentication is entirely mocked. Any valid email and password combination works. The only thing being stored is the email address — there are no passwords, tokens, or sessions on the server side.

Filters (status, priority, sort order, search query) are applied client-side after fetching all tasks from the API. This is fine for the current data size and keeps the API simple.

## Known Limitations

The in-memory task store resets every time the development server restarts. This is expected given the mock backend setup.

The delete confirmation dialog and the edit sheet both open on the detail page and the task list independently — there is no shared modal state between the two views.

Dark mode relies on the `class` strategy from next-themes, so a brief flash of the default theme can occasionally appear on hard refresh before the theme is read from localStorage. Adding `suppressHydrationWarning` to the `html` element minimizes this but does not eliminate it entirely.
