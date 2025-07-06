# 🚲 PedalPoint API

PedalPoint API is a robust Bike Servicing Management backend built with Node.js, Express.js, TypeScript, Prisma ORM, and PostgreSQL.
It provides endpoints to manage bike service bookings, track service history, and handle customer & workshop data efficiently.

---

## 🌐 Live Backend

[https://pedalpoint-api.vercel.app/](https://pedalpoint-api.vercel.app/)

---

## 🛠 Tech Stack

- [Node.js](https://nodejs.org/) — JavaScript runtime
- [Express.js](https://expressjs.com/) — Web framework
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript
- [Prisma ORM](https://www.prisma.io/) — Database ORM
- [PostgreSQL](https://www.postgresql.org/) — Relational database

---

## 🚀 Setup Guide

### Prerequisites
- Node.js >= v22.17.0
- PostgreSQL >= v17.5

### Installation

```bash
# Clone the repository
git clone https://github.com/thecodermehedi/pedalpoint-api.git
cd pedalpoint-api

# Install dependencies
bun i
````

### Environment Variables

Create `.env.development.local` or `.env.production.local` file in the root directory:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE?schema=public"
```

### Run Migrations

```bash
bun db:migrate
```

### Start the Server

```bash
# Development
bun dev
```
---

## ✨ Key Features

- ✅ Manage bike service bookings (create, update, cancel)
- ✅ Track service history for each bike & customer
- ✅ Manage customer & workshop data
- ✅ Secure RESTful endpoints
- ✅ Type-safe database queries with Prisma
- ✅ Scalable & maintainable architecture

---
