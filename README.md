# Next.js + Better Auth + MongoDB

A small authentication starter built with Next.js, [Better Auth](https://www.better-auth.com/), and MongoDB. It includes email/password registration, sign-in, session handling, a protected dashboard, and sign-out.

## Features

- Create an account with a name, email address, and password
- Sign in with email and password
- Persist and read the current session
- Protect `/dashboard` on the server
- Sign out and return to the sign-in page
- Store users, accounts, and sessions in MongoDB

> This project currently supports email/password authentication only. OAuth providers such as Google are not configured.

## How it works

```text
Browser
  |
  +-- Sign up / sign in pages --> Better Auth client
  |                                 |
  |                                 v
  |                      /api/auth/[...all]
  |                                 |
  |                                 v
  |                        Better Auth server
  |                                 |
  |                                 v
  +-- Protected dashboard <----- MongoDB
```

The route handler passes Better Auth requests to the server configuration. The `proxy.ts` file checks for a session before requests reach `/dashboard`.

## Prerequisites

- Node.js 20 or later
- npm
- A running MongoDB instance (local MongoDB or MongoDB Atlas)

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env.local` file in the project root:

   ```env
   MONGODB_URI=mongodb://localhost:27017/authsetup
   BETTER_AUTH_SECRET=replace-with-a-long-random-secret
   BETTER_AUTH_URL=http://localhost:3000
   ```

   Use a long, unique secret in real environments. Do not commit `.env.local`.

3. Start MongoDB, then run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000), then visit:

   - [http://localhost:3000/sign-up](http://localhost:3000/sign-up) to create an account
   - [http://localhost:3000/sign-in](http://localhost:3000/sign-in) to sign in
   - [http://localhost:3000/dashboard](http://localhost:3000/dashboard) to view the protected page

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server after building |
| `npm run lint` | Run ESLint |

## Project structure

```text
app/
|-- api/auth/[...all]/route.ts  # Better Auth API handler
|-- dashboard/page.tsx          # Protected dashboard and sign-out
|-- sign-in/page.tsx            # Email/password sign-in form
|-- sign-up/page.tsx            # Account-creation form
|-- page.tsx                    # Home page
\-- proxy.ts                    # Redirects unauthenticated dashboard requests
lib/
|-- auth.ts                     # Better Auth server configuration
|-- auth-client.ts              # Client-side Better Auth instance
\-- mongodb.ts                  # MongoDB connection
```

## Authentication flow

1. A user registers from `/sign-up` or signs in from `/sign-in`.
2. The client sends the request through Better Auth's React client.
3. The catch-all API route handles the request with the Better Auth server.
4. Better Auth stores the relevant records in MongoDB and creates a session.
5. Requests to `/dashboard` are checked in `app/proxy.ts`; unauthenticated visitors are redirected to `/sign-in`.
6. The dashboard reads the session client-side and can sign the user out.

## Troubleshooting

- **`MONGODB_URI is not defined`** - add `MONGODB_URI` to `.env.local` and restart the dev server.
- **Cannot connect to MongoDB** - ensure the MongoDB service is running and that the connection string is correct.
- **Redirected to sign-in from the dashboard** - sign in first, and confirm cookies are allowed for `localhost:3000`.

## Tech stack

- Next.js 16
- React 19
- Better Auth
- MongoDB
- TypeScript
- Tailwind CSS
