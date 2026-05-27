# Personal Finance Tracker

Aplikasi web untuk mencatat dan mengelola keuangan pribadi menggunakan Next.js, Tailwind CSS, dan Neon PostgreSQL.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
```bash
cp .env.example .env.local
```

Edit `.env.local` dan isi `DATABASE_URL` dengan connection string dari Neon:
```
DATABASE_URL=postgresql://[user]:[password]@[host]/[database]?sslmode=require
```

### 3. Create Database Tables
Jalankan query SQL di Neon Console:

**Table: pemasukan**
```sql
CREATE TABLE pemasukan (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW(),
  bulan_tahun VARCHAR(7) NOT NULL,
  sumber TEXT NOT NULL,
  jumlah NUMERIC NOT NULL
);
CREATE INDEX idx_pemasukan_bulan ON pemasukan(bulan_tahun);
```

**Table: pengeluaran**
```sql
CREATE TABLE pengeluaran (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW(),
  bulan_tahun VARCHAR(7) NOT NULL,
  kategori TEXT NOT NULL,
  kegiatan TEXT NOT NULL,
  jumlah NUMERIC NOT NULL
);
CREATE INDEX idx_pengeluaran_bulan ON pengeluaran(bulan_tahun);
```

### 4. Run Development Server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 📚 Documentation

- **[DESIGN.md](./DESIGN.md)** - Design system, color palette, UX rules
- **[SETUP.md](./SETUP.md)** - Detailed setup guide & troubleshooting

## 📂 Project Structure

```
src/
├── app/              # Next.js pages
├── components/       # React components
├── lib/
│   ├── db.ts        # Neon database client
│   ├── currency.ts  # Currency formatting helpers
│   └── utils.ts     # Utility functions
└── styles/
    └── globals.css  # Global Tailwind styles
```

## 🛠️ Available Scripts

```bash
npm run dev        # Development server
npm run build      # Production build
npm start          # Start production server
npm run lint       # ESLint
npm run type-check # TypeScript check
```

## 🎨 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 3
- **Database:** Neon (PostgreSQL)
- **Client:** @vercel/postgres
- **Charts:** Recharts
- **Icons:** Lucide React
- **Language:** TypeScript

## 📝 License

Private project
