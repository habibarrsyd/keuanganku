# 🚀 Quick Start Guide

Personal Finance Tracker PWA - Get started in minutes!

## Prerequisites

- Node.js 18+ 
- npm 9+
- Neon PostgreSQL account
- (Optional) Vercel account for deployment

## 1. Clone/Setup Project

```bash
cd keuangan
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Setup Database

### Get your DATABASE_URL from Neon:
1. Go to: https://console.neon.tech
2. Copy connection string
3. Create `.env.local`:

```bash
# .env.local
DATABASE_URL=postgresql://username:password@host/database?sslmode=require
```

### Create Database Tables

If tables don't exist yet, run this SQL in Neon:

```sql
-- Pemasukan (Income)
CREATE TABLE IF NOT EXISTS pemasukan (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW(),
  tanggal DATE NOT NULL,
  sumber VARCHAR(255) NOT NULL,
  jumlah NUMERIC NOT NULL,
  UNIQUE(tanggal, sumber)
);

-- Pengeluaran (Expenses)
CREATE TABLE IF NOT EXISTS pengeluaran (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW(),
  tanggal DATE NOT NULL,
  kategori VARCHAR(100) NOT NULL,
  kegiatan VARCHAR(255) NOT NULL,
  jumlah NUMERIC NOT NULL
);

-- Create indexes for performance
CREATE INDEX idx_pemasukan_tanggal ON pemasukan(tanggal);
CREATE INDEX idx_pengeluaran_tanggal ON pengeluaran(tanggal);
```

## 4. Start Development Server

```bash
npm run dev
```

Open: http://localhost:3000

## 5. Features Available

✅ Dashboard - View summary & charts
✅ Input - Record income & expenses
✅ History - View all transactions
✅ Categories - Track by category
✅ Daily Spending - See daily breakdown
✅ Monthly Comparison - Compare months
✅ Top Categories - View top spending
✅ Weekly Breakdown - Weekly summary
✅ Year-to-Date - Annual tracking
✅ Export - Download as CSV
✅ Expense Alerts - Get notifications

## 6. Create Your First Transaction

1. Go to "Input Keuangan"
2. Choose "Pemasukan" or "Pengeluaran"
3. Enter date, amount, and category
4. Click "Simpan"

## 7. View Dashboard

1. Go to "Dashboard"
2. Select month with the dropdown
3. View all charts and summaries

## 8. Build for Production

```bash
npm run build
npm start
```

## 9. Deploy to Vercel (Optional)

```bash
npm i -g vercel
vercel --prod --env DATABASE_URL=your_connection_string
```

See PWA_DEPLOYMENT_GUIDE.md for detailed instructions.

## 🔒 Environment Variables

```
DATABASE_URL - Required for production
NODE_ENV     - Optional, defaults to development
```

## 📱 Install as PWA

Once deployed:
1. Android: Tap menu (⋮) → "Install app"
2. iOS: Tap Share → "Add to Home Screen"

## 🐛 Troubleshooting

**"Cannot find module @neondatabase/serverless"**
```bash
npm install
```

**"Database connection timeout"**
- Check DATABASE_URL is correct
- Verify Neon database is active
- Check network connection

**"Port 3000 already in use"**
```bash
npm run dev -- -p 3001
```

**"Service worker not registering"**
- Clear browser cache
- Try incognito/private mode
- Check manifest.json exists

## 📚 Project Structure

```
src/
  app/
    page.tsx          - Dashboard
    input/            - Transaction input
    riwayat/          - Transaction history
    api/              - API routes
  components/         - Reusable components
  lib/
    db.ts            - Database functions
    currency.ts      - Formatting utilities
  styles/            - Global styles
public/              - Static files & PWA assets
```

## 🎯 Next Steps

1. ✅ Setup & run locally
2. ✅ Add your transactions
3. ✅ Explore all features
4. ✅ Deploy to Vercel
5. ✅ Install on phone

## 💡 Tips

- Bookmark the app for quick access
- Use keyboard shortcuts (if available)
- Export your data regularly
- Check monthly summaries

Enjoy tracking your finances! 💰
