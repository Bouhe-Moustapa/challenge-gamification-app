# Nuit Arena - Gamification Platform

A modern, gamified challenge platform built for the **Nuit de l'Info** hackathon. Track team progress, earn badges, and compete on the leaderboard in real-time.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC)

---

## Features

- **Real-time Leaderboard** - Track team rankings and scores live
- **Gamification System** - Earn badges, points, and level up
- **Admin Dashboard** - Manage users, teams, challenges, and badges
- **Role-Based Access Control** - Admin, Jury, and User roles
- **Accessibility Compliant** - WCAG AA standards
- **Responsive Design** - Works on desktop and mobile

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **PostgreSQL** | Database (via Neon) |
| **Prisma** | ORM for database access |
| **NextAuth.js v5** | Authentication |
| **Tailwind CSS** | Styling |
| **Lucide React** | Icons |
| **Framer Motion** | Animations |

---

## Project Structure

```
frontend/
├── app/
│   ├── admin/          # Admin dashboard pages
│   ├── api/            # API routes (NextAuth)
│   ├── dashboard/      # User dashboard
│   ├── jury/           # Jury panel
│   ├── leaderboard/    # Public leaderboard
│   ├── login/          # Authentication page
│   ├── team/[id]/      # Team detail pages
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── providers.tsx   # Session provider
├── components/         # Reusable UI components
├── lib/                # Utilities and database client
├── prisma/
│   ├── schema.prisma   # Database schema
│   └── seed.ts         # Initial data seeding
├── types/              # TypeScript definitions
└── public/             # Static assets
```

---

## Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn**
- **PostgreSQL** database (we recommend [Neon](https://neon.tech))

### 1. Clone the Repository

```bash
git clone <repository-url>
cd challenge-gamification-app/frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the `frontend` directory:

```env
# Database
DATABASE_URL="postgresql://username:password@host:5432/database?sslmode=require"

# NextAuth
AUTH_SECRET="your-secret-key-here"
AUTH_URL="http://localhost:3000"
```

> **Generate AUTH_SECRET**: Run `npx auth secret` or use `openssl rand -base64 32`

### 4. Database Setup

```bash
# Push schema to database
npm run db:push

# Seed initial data (creates admin user, badges, challenges)
npm run db:seed
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Default Admin Credentials

After seeding the database, use these credentials to log in:

| Field | Value |
|-------|-------|
| **Email** | `admin@example.com` |
| **Password** | `admin123` |

> ⚠️ **Important**: Change these credentials in production!

---

## User Roles

| Role | Permissions |
|------|-------------|
| **ADMIN** | Full access: manage users, teams, challenges, badges, settings |
| **JURY** | Evaluate team submissions, assign scores |
| **USER** | View dashboard, participate in challenges |

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push Prisma schema to database |
| `npm run db:seed` | Seed database with initial data |

---

## API Routes

| Route | Description |
|-------|-------------|
| `/api/auth/[...nextauth]` | NextAuth.js authentication endpoints |

---

## Pages Overview

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Landing page |
| `/login` | Public | Authentication page |
| `/leaderboard` | Public | Team rankings |
| `/dashboard` | Authenticated | User dashboard |
| `/team/[id]` | Authenticated | Team details |
| `/admin` | Admin only | Admin dashboard |
| `/admin/users` | Admin only | User management |
| `/admin/teams` | Admin only | Team management |
| `/admin/challenges` | Admin only | Challenge management |
| `/admin/badges` | Admin only | Badge management |
| `/jury` | Jury/Admin | Jury evaluation panel |

---

## Deployment

### Option 1: Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set the **Root Directory** to `frontend`
   - Add environment variables:
     - `DATABASE_URL`
     - `AUTH_SECRET`
     - `AUTH_URL` (your production URL, e.g., `https://your-app.vercel.app`)

3. **Run Database Migrations**
   After deployment, run in Vercel terminal or locally:
   ```bash
   npx prisma db push
   npx tsx prisma/seed.ts
   ```

### Option 2: Netlify

1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Base directory: `frontend`

2. **Environment Variables**
   Add the same variables as Vercel in Netlify dashboard.

### Option 3: Docker

Create a `Dockerfile` in the `frontend` directory:

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t nuit-arena .
docker run -p 3000:3000 --env-file .env nuit-arena
```

### Option 4: Self-Hosted (PM2)

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Install PM2**
   ```bash
   npm install -g pm2
   ```

3. **Start with PM2**
   ```bash
   pm2 start npm --name "nuit-arena" -- start
   pm2 save
   pm2 startup
   ```

---

## Production Checklist

- [ ] Change default admin password
- [ ] Set secure `AUTH_SECRET`
- [ ] Configure proper `AUTH_URL` for production domain
- [ ] Enable HTTPS
- [ ] Set up database backups
- [ ] Configure rate limiting
- [ ] Set up monitoring (e.g., Sentry, LogRocket)

---

## Troubleshooting

### Login not working
1. Verify `AUTH_SECRET` is set in `.env`
2. Check database connection with `node check-admin.js`
3. Ensure the admin user exists: run `npm run db:seed`

### Database connection errors
1. Verify `DATABASE_URL` format
2. Check if database is accessible
3. Run `npx prisma db push` to sync schema
4. **Note**: If using Neon Free Tier, the database pauses after inactivity. It will wake up automatically upon the first request (which might fail initially).

### Font Download Failures
- If you see "Failed to download Geist from Google Fonts", check your internet connection. The app will fallback to system fonts automatically.

### Build errors
1. Clear cache: `rm -rf .next node_modules/.cache`
2. Reinstall dependencies: `rm -rf node_modules && npm install`

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## License

This project is licensed under the MIT License.

---

## Support

For issues or questions, please open a GitHub issue or contact the development team.

**Built with ❤️ for the Nuit de l'Info**
