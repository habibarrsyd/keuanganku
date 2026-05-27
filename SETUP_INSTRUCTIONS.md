# 🚀 SETUP INSTRUCTIONS - Personal Finance Tracker

Panduan lengkap step-by-step untuk setup aplikasi dari 0.

---

## ⚠️ PENTING: SEBELUM JALANKAN

Pastikan sudah:
1. ✅ `npm install` selesai
2. ✅ Akun Neon (signup gratis di [neon.tech](https://neon.tech))
3. ✅ File `.env.local` sudah ada dan berisi `DATABASE_URL`

---

## 📋 LANGKAH-LANGKAH SETUP

### 1. Setup Neon Database

**A. Buat Project di Neon**
1. Login ke [console.neon.tech](https://console.neon.tech)
2. Klik "Create a new project"
3. Isi nama project: "keuangan-tracker" (atau nama apapun)
4. Pilih region terdekat (misal: Singapore)
5. Klik "Create project"

**B. Ambil Connection String**
1. Di Neon console, klik project yang baru dibuat
2. Tab "Connection strings"
3. Copy URL yang format: `postgresql://[user]:[password]@[host]/[database]?sslmode=require`
4. **Jangan share ke publik!**

**C. Setup `.env.local`**
```bash
# File: .env.local
DATABASE_URL=postgresql://[user]:[password]@[host]/[database]?sslmode=require
NODE_ENV=development
```

Contoh isi yang benar:
```
DATABASE_URL=postgresql://neondb_owner:xxxxxxxxxxxx@ep-silent-breeze-12345.us-east-1.neon.tech/neondb?sslmode=require
NODE_ENV=development
```

### 2. Create Database Tables

Ada 2 cara:

#### Cara A: Via Neon Console (Paling Mudah)
1. Di Neon console, buka "SQL Editor"
2. Copy-paste isi file `DATABASE_SETUP.sql` (ada di root project)
3. Jalankan query
4. Klik "Execute" atau tekan `Ctrl+Enter`
5. Tunggu sampai success

#### Cara B: Via Terminal (Jika punya psql)
```bash
psql [DATABASE_URL] -f DATABASE_SETUP.sql
```

---

## 🏃 JALANKAN APLIKASI

### Development Mode
```bash
npm run dev
```

Output yang benar:
```
> next dev

  ▲ Next.js 15.0.0
  - Local:        http://localhost:3000
  
✓ Ready in 1200ms
```

Buka browser: [http://localhost:3000](http://localhost:3000)

### Production Mode
```bash
npm run build
npm start
```

---

## ✅ TEST CHECKLIST

Setelah aplikasi jalan, test fitur ini:

### Dashboard (/)
- [ ] Halaman load tanpa error
- [ ] Month selector berfungsi
- [ ] Summary cards menampilkan "Rp 0" (belum ada data)
- [ ] Chart kosong (normal, belum ada data)
- [ ] Recent transactions kosong

### Input (/input)
- [ ] Halaman load tanpa error
- [ ] Toggle Pemasukan / Pengeluaran works
- [ ] Ketik jumlah → live preview Rupiah muncul
- [ ] Month selector sticky (tidak reset setelah save)
- [ ] Submit → success message muncul
- [ ] Data masuk ke database

### Riwayat (/riwayat)
- [ ] Halaman load tanpa error
- [ ] Tabel menampilkan transaksi yang baru diinput
- [ ] Delete button works + modal confirmation
- [ ] Transaksi terhapus dari database

---

## 🐛 TROUBLESHOOTING

### Error: "DATABASE_URL is not set"
**Solusi:**
- Pastikan file `.env.local` ada di root project
- Cek isi `.env.local` sudah benar (bukan `.env.example`)
- Restart dev server: `npm run dev`

### Error: "ECONNREFUSED" atau "connect ENOENT"
**Solusi:**
- Pastikan DATABASE_URL benar
- Test connection: `psql [DATABASE_URL] -c "SELECT 1"`
- Cek Neon project aktif
- Cek IP address Anda tidak di-block (Neon default allow all)

### Error: "relation \"pemasukan\" does not exist"
**Solusi:**
- Tabel belum dibuat!
- Jalankan SQL dari `DATABASE_SETUP.sql` di Neon Console
- Atau gunakan psql: `psql [DATABASE_URL] -f DATABASE_SETUP.sql`

### Dashboard/Pages blank atau error
**Solusi:**
- Buka browser console (F12)
- Lihat error message
- Cek `.env.local` sudah benar
- Cek tabel sudah dibuat

### "npm install" gagal
**Solusi:**
```bash
# Clear npm cache
npm cache clean --force

# Install ulang
npm install
```

---

## 📱 TESTING FITUR DI BROWSER

### Buka DevTools (F12)

**1. Check Network Tab**
- Pergi ke Dashboard
- Buka DevTools → Network
- Lihat response dari `/api/pemasukan` dan `/api/pengeluaran`
- Harus return `200` atau `201`

**2. Check Console Tab**
- Lihat ada error merah?
- Jika ada, baca message-nya
- Screenshot error dan share untuk debugging

**3. Test Input Form**
- Pergi ke `/input`
- Pilih "Pemasukan"
- Isi Sumber: "Gajian"
- Isi Jumlah: "5000000"
- Lihat preview Rp 5.000.000 muncul
- Klik "Simpan"
- Lihat success message

**4. Check Dashboard**
- Pergi ke Dashboard `/`
- Lihat Summary card "Pemasukan" jadi "Rp 5.000.000"
- Lihat transaksi di list

**5. Test Delete**
- Pergi ke `/riwayat`
- Klik tombol delete (icon sampah)
- Modal confirmation muncul
- Klik "Hapus"
- Data terhapus

---

## 🎨 VERIFIKASI DESIGN

Saat jalan, pastikan:

### Colors
- Background halaman: Off-white (`#FBFBFA`)
- Cards: Putih (`#FFFFFF`)
- Primary button: Sage Green (`#4A6B5D`)
- Sidebar/BottomNav: Responsif

### Responsive
- Buka di mobile (375px) → BottomNav visible, Sidebar hidden
- Buka di tablet (768px) → BottomNav visible
- Buka di desktop (1920px) → Sidebar visible, BottomNav hidden

### No AI Vibes
- Tidak ada dark mode gelap
- Tidak ada neon colors atau glow effects
- Warna natural dan tenang ✓

---

## 📞 QUICK REFERENCE

| Fitur | URL |
|-------|-----|
| Dashboard | http://localhost:3000 |
| Input Form | http://localhost:3000/input |
| Riwayat | http://localhost:3000/riwayat |

| API | Method | URL |
|-----|--------|-----|
| Get pemasukan | GET | /api/pemasukan?bulan_tahun=2026-05 |
| Create pemasukan | POST | /api/pemasukan |
| Delete pemasukan | DELETE | /api/pemasukan/[id] |
| Get pengeluaran | GET | /api/pengeluaran?bulan_tahun=2026-05 |
| Create pengeluaran | POST | /api/pengeluaran |
| Delete pengeluaran | DELETE | /api/pengeluaran/[id] |

---

## ✅ SEMUA SETUP SELESAI!

Jika semua langkah sudah done dan testing OK, aplikasi sudah siap digunakan! 🎉

Untuk development lanjutan, lihat:
- `DESIGN.md` - Design system
- `README.md` - Project overview
- `src/lib/db.ts` - Database functions

---

**Last Updated:** May 27, 2026
