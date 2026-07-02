# Portfolio Full-Stack Project

This project is a modern portfolio website built with:
- Next.js for the frontend
- Express.js for the backend API
- Prisma + PostgreSQL for content storage
- TypeScript across the app

## Run locally

```bash
npm install
npm run dev
```

The frontend will run on http://localhost:3000 and the backend API on http://localhost:5000.

## Deploy to Vercel

1. Push this project to GitHub.
2. Import the repository in Vercel.
3. Set the build command to `npm run build`.
4. Set the output directory to `.next`.
5. Add the environment variable `DATABASE_URL` with your Prisma Postgres connection string.

## Notes

- The admin route is not yet protected, as requested.
- The portfolio content is ready to be connected to a database and admin UI next.
