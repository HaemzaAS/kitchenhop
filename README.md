# KitchenHop — Kitchen Rental Marketplace (MVP)

A simplified MVP of [kitchenhop.de](https://kitchenhop.de): a marketplace connecting **chefs** with **professional kitchens** available for rent by the hour. Built as a 24-hour technical evaluation for HOPn.

**🌍 Live demo:** https://kitchenhop-production-yqsuzr.laravel.cloud

## Demo credentials

| Role | Email | Password |
|---|---|---|
| Admin | `admin@kitchenhop.demo` | `password` |
| Kitchen Owner | `owner@kitchenhop.demo` | `password` |
| Chef | `chef@kitchenhop.demo` | `password` |

## Features

**Chefs** can browse all kitchens (with city filter and search), view kitchen details with photo galleries, request bookings (date + start/end time) with live price preview, and cancel their own pending requests.

**Kitchen Owners** can create, edit and delete their kitchens, upload photos, and approve or reject incoming booking requests for their own kitchens only.

**Admins** get a dashboard with platform statistics (users, kitchens, bookings, approved revenue) and full tables of all users, kitchens and bookings.

**Everyone** gets a role-aware dashboard, and the public landing page shows featured kitchens with live platform stats.

Booking statuses: `pending → approved / rejected` (owner) or `pending → cancelled` (chef). The **total price is always computed server-side** (`hours × hourly_price`); the client-side preview is UX only. Overlap protection runs twice: a chef cannot request a slot overlapping an approved booking, and an owner cannot approve a request that overlaps an already-approved one (no double-booking).

## Tech stack

- **Backend:** Laravel 12 (PHP 8.3), MySQL 8
- **Frontend:** React 19 + TypeScript via Inertia.js (official Laravel React starter kit), Tailwind CSS, shadcn/ui
- **Auth:** Laravel's built-in session auth with a `role` column (`chef` / `owner` / `admin`)
- **Hosting:** Laravel Cloud (free tier) + managed MySQL, region eu-central-1

## Architecture overview

```
app/
├── Http/Controllers/
│   ├── KitchenController.php    # browse/detail (all users) + CRUD (owners)
│   ├── BookingController.php    # request/cancel (chefs), approve/reject (owners)
│   ├── AdminController.php      # platform overview (admins)
│   └── DashboardController.php  # role-aware dashboard data
├── Http/Middleware/EnsureUserHasRole.php   # route-level role gate ("role:owner" etc.)
├── Policies/
│   ├── KitchenPolicy.php        # only the owner may update/delete a kitchen
│   └── BookingPolicy.php        # chef may cancel own; kitchen owner may decide
└── Models/  User, Kitchen, KitchenImage, Booking
```

**Database:** `users` (with role) → `kitchens` (owner FK) → `kitchen_images` (kitchen FK) and `bookings` (chef FK + kitchen FK, date, start/end time, computed hours + total_price, status enum). Foreign keys cascade on delete. See `database/migrations/` for the full schema and `database/kitchenhop_export.sql` for a ready-made dump.

**Routing:** RESTful resource-style routes served through Inertia (controllers return page props over standard HTTP verbs — GET/POST/PUT/PATCH/DELETE). A public read-only JSON API is additionally exposed at `GET /api/v1/kitchens` (supports `?city=` and `?search=`) and `GET /api/v1/kitchens/{id}`.

**Frontend:** Inertia pages in `resources/js/pages/` (kitchens, chef/bookings, owner/kitchens, owner/bookings, admin), shared UI in `resources/js/components/`, all typed via `resources/js/types/index.ts`.

## Local installation

Requirements: PHP ≥ 8.2, Composer, Node ≥ 20, MySQL 8.

```bash
git clone https://github.com/haemza8soussi/kitchenhop.git
cd kitchenhop

composer install
npm install

cp .env.example .env
php artisan key:generate
```

Edit `.env` and set the database block:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=kitchenhop
DB_USERNAME=root
DB_PASSWORD=
```

Then:

```bash
mysql -u root -e "CREATE DATABASE kitchenhop;"
php artisan migrate --seed
php artisan storage:link
composer run dev
```

Open http://localhost:8000 and log in with any demo account above. The seeder creates 22 users, 22 kitchens (with bundled photos) and 25 bookings across all statuses. Alternatively, import `database/kitchenhop_export.sql` instead of running migrations.

## Security considerations

- Passwords hashed (bcrypt); auth via Laravel's session guard with CSRF protection on every mutating request
- Role checks at **two layers**: route middleware (`role:owner`, `role:admin`, …) and per-record policies (an owner can only touch *their* kitchens/requests)
- Nobody can register as admin — the role is only created by the seeder, and registration validates `role in:chef,owner`
- Booking price computed server-side; client values are never trusted
- All input validated server-side (dates must be today or later, end time after start time, image type/size limits)
- Mass-assignment protection via `$fillable` on all models

## Assumptions made

- Only **pending** bookings can be approved, rejected or cancelled; approved bookings are final (no cancellation flow for approved bookings in this MVP)
- Overlapping *pending* requests are allowed (owners choose between competing requests); double-approval is blocked
- Prices are in EUR; hours can be fractional (e.g. 09:00–13:30 = 4.5 h)
- Kitchen photos: uploaded files use Laravel's public disk. On the hosting free tier this disk is **ephemeral** — files uploaded at runtime can disappear after a redeploy. Seeded photos are bundled in the repo (`public/images/kitchens/`) and always work. In production this would move to S3/R2 via Laravel's filesystem config (no code change)
- Admin is a read-only overview in this MVP (no user/kitchen moderation actions)
- Laravel 12 is used via the official React starter kit (the kit's current stable pin); the code is compatible with the Laravel 13 upgrade path

## AI tools used

This project was built with **Claude (Anthropic)** as an AI pair programmer, used for: project planning and time-boxing, generating boilerplate (controllers, policies, React pages), debugging deployment issues, and reviewing security considerations. All AI-generated code was reviewed, tested end-to-end (local + live), and committed incrementally by me — the git history reflects the actual build order. Environment setup, testing, deployment operations and all product decisions were done manually.
