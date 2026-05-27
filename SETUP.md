# Personal Finance Tracker - Setup Guide

Panduan lengkap setup dan development Personal Finance Tracker dengan Next.js, Tailwind CSS, dan Neon Database.

---

## 📋 Prerequisites

Pastikan sudah install:
- **Node.js** >= 18.x (download dari [nodejs.org](https://nodejs.org))
- **npm** atau **pnpm** package manager
- **Git** untuk version control
- Akun **Neon** dengan database PostgreSQL (setup di [neon.tech](https://neon.tech))

---

## 🚀 Quick Start

### 1. Clone/Setup Project
```bash
cd keuangan
npm install
# atau jika menggunakan pnpm
pnpm install
```

### 2. Konfigurasi Environment Variables
```bash
# Copy file .env.example ke .env.local
cp .env.example .env.local
```

Kemudian edit `.env.local` dan isi `DATABASE_URL`:
```
DATABASE_URL=postgresql://[user]:[password]@[host]/[database]?sslmode=require
```

**Cara mendapatkan CONNECTION_STRING dari Neon:**
1. Login ke [console.neon.tech](https://console.neon.tech)
2. Buka project kamu
3. Klik tab "Connection string"
4. Copy URL PostgreSQL yang berformat: `postgresql://[user]:[password]@[host]/[database]?sslmode=require`

### 3. Setup Database (Neon)
Pastikan sudah membuat 2 tabel di Neon Console atau via query:

#### Tabel `pemasukan`
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

#### Tabel `pengeluaran`
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

### 4. Install Dependencies
```bash
npm install
# Dependencies yang akan diinstall:
# - next (React framework)
# - react & react-dom
# - tailwindcss (styling)
# - @vercel/postgres (database client)
# - recharts (charts/visualization)
# - lucide-react (icons)
# - date-fns (date handling)
```

### 5. Run Development Server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## 📂 Project Structure

```
keuangan/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Main layout + Sidebar/BottomNav
│   │   ├── page.tsx                # Dashboard
│   │   ├── input/
│   │   │   └── page.tsx            # Form Input
│   │   ├── riwayat/
│   │   │   └── page.tsx            # Transaction Log
│   │   └── api/                    # API routes
│   │       ├── pemasukan/
│   │       │   ├── route.ts        # GET, POST pemasukan
│   │       │   └── [id]/route.ts   # DELETE pemasukan
│   │       └── pengeluaran/
│   │           ├── route.ts        # GET, POST pengeluaran
│   │           └── [id]/route.ts   # DELETE pengeluaran
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Modal.tsx
│   │   ├── Sidebar.tsx
│   │   ├── BottomNav.tsx
│   │   └── FinancialChart.tsx
│   ├── lib/
│   │   ├── db.ts                   # Neon database client
│   │   ├── currency.ts             # Currency formatting helpers
│   │   └── utils.ts                # Utility functions
│   └── styles/
│       └── globals.css             # Global Tailwind styles
├── public/                         # Static assets
├── DESIGN.md                       # Design system documentation
├── .env.example                    # Environment template
├── .env.local                      # Local environment (git-ignored)
├── package.json
├── tailwind.config.ts              # Tailwind configuration
├── tsconfig.json                   # TypeScript config
└── next.config.ts                  # Next.js config
```

---

## 🛠️ Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint

# Format code (jika setup Prettier)
npm run format
```

---

## 🎨 Design & Color System

Lihat [DESIGN.md](./DESIGN.md) untuk panduan lengkap:
- Palette warna (#FBFBFA, #4A6B5D, #3B7A57, #C86B55, dsb)
- Typography & spacing
- Component guidelines
- UX rules

---

## 📚 Database Queries

Library `@vercel/postgres` sudah di-setup di `src/lib/db.ts`. Contoh usage:

### Get Dashboard Summary
```typescript
import { db } from '@/lib/db';

const summary = await db.getDashboardSummary('2026-05');
// Returns: { totalPemasukan, totalPengeluaran, sisa }
```

### Get Transactions by Month
```typescript
const pemasukan = await db.getPemasukanByBulan('2026-05');
const pengeluaran = await db.getPengeluaranByBulan('2026-05');
```

### Create New Entry
```typescript
await db.createPemasukan('2026-05', 'Gajian', 5000000);
await db.createPengeluaran('2026-05', 'Makanan', 'Makan siang', 50000);
```

### Delete Entry
```typescript
await db.deletePemasukan(1);
await db.deletePengeluaran(1);
```

Lihat selengkapnya di `src/lib/db.ts`.

---

## 💱 Currency Formatting

Helper functions sudah tersedia di `src/lib/currency.ts`:

```typescript
import { formatCurrency, parseCurrency } from '@/lib/currency';

// Format number to Rupiah
formatCurrency(50000); // "Rp 50.000"

// Parse Rupiah input to number
parseCurrency("Rp 50.000"); // 50000

// Format date
formatDate(new Date()); // "27 Mei 2026"

// Format month-year
formatBulanTahun('2026-05'); // "Mei 2026"

// Generate month options for dropdown
generateMonthOptions(12); // Array of last 12 months
```

---

## 🎯 Development Roadmap

### Phase 1: Core Structure (Current)
- ✅ DESIGN.md dengan color palette & UX rules
- ✅ Database client setup (Neon)
- ✅ Folder structure & file organization
- ✅ Helper functions (currency formatting)

### Phase 2: UI Components
- [ ] Layout wrapper (Sidebar + BottomNav)
- [ ] Button, Card, Input, Modal components
- [ ] Navigation responsive

### Phase 3: Pages
- [ ] Dashboard dengan summary cards
- [ ] Donut chart untuk kategori pengeluaran
- [ ] Form Input dengan toggle pemasukan/pengeluaran
- [ ] Form sticky input (bulan/tahun tidak reset)
- [ ] Riwayat/transaction log table

### Phase 4: API Routes
- [ ] GET, POST, DELETE routes untuk pemasukan
- [ ] GET, POST, DELETE routes untuk pengeluaran
- [ ] Error handling & validation

### Phase 5: Polish
- [ ] Mobile responsiveness testing
- [ ] Performance optimization
- [ ] Accessibility (a11y) checks
- [ ] Browser compatibility

---

## 🐛 Troubleshooting

### DATABASE_URL tidak ketemu
**Error:** `Error: POSTGRES_PRISMA_URL not found`

**Solusi:**
1. Pastikan file `.env.local` sudah ada di root project
2. Cek isi `.env.local` sudah berisi `DATABASE_URL`
3. Restart development server dengan `npm run dev`

### Cannot find module '@vercel/postgres'
**Error:** `Module not found: '@vercel/postgres'`

**Solusi:**
```bash
npm install @vercel/postgres
```

### Connection refused ke Neon
**Error:** `ECONNREFUSED 127.0.0.1:5432`

**Solusi:**
1. Pastikan Neon project aktif & database sudah dibuat
2. Cek connection string di `.env.local` benar
3. Pastikan IP address Anda tidak di-block (Neon default allow all)
4. Test connection: `psql [DATABASE_URL]`

---

## 📖 Next Steps

1. **Baca DESIGN.md** untuk memahami color palette & UX rules
2. **Setup database** dengan query di section 3 di atas
3. **Mulai buat components** sesuai Phase 2 di roadmap
4. **Test API routes** di Postman/Thunder Client

---

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Neon PostgreSQL](https://neon.tech/docs)
- [Recharts](https://recharts.org/)
- [Lucide React Icons](https://lucide.dev/)

---

**Created:** May 27, 2026  
**Last Updated:** May 27, 2026
