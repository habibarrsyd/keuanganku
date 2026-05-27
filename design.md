# 🎨 DESIGN SYSTEM - Personal Finance Tracker

**Project Name:** Personal Finance Tracker (Web Version)  
**Tone & Vibe:** Clean, Soft, Natural, Intentional, Non-AI Aesthetic.  
**Database:** Neon (PostgreSQL)

---

## 📋 Daftar Isi
1. [Palette Warna](#1-palette-warna)
2. [Typography](#2-typography--layout)
3. [Struktur Folder](#3-struktur-folder-nextjs-app-router)
4. [UX Rules](#4-ux-rules-wajib-diikuti)
5. [Component Guidelines](#5-component-guidelines)

---

## 1. Color Palette (Soft & Natural)

Kita menggunakan warna-warna tanah dan tumbuhan yang cerah namun diredam (muted), memberikan kesan aplikasi finansial yang konvensional, personal, dan tenang.

| Nama | Hex | Fungsi | Tailwind | Notes |
|------|-----|--------|----------|-------|
| **Off-white Hangat** | `#FBFBFA` | Background Utama | `bg-[#FBFBFA]` | Warna background halaman utama |
| **White Pure** | `#FFFFFF` | Card & Content Area | `bg-white` | Background card, form, content container |
| **Sage Green Tua** | `#4A6B5D` | Primary Accent | `bg-[#4A6B5D]` `text-[#4A6B5D]` | Button primary, navbar, headings, logo |
| **Sage Green Muda** | `#E8EFE9` | Secondary Hover | `bg-[#E8EFE9]` `hover:text-[#E8EFE9]` | Hover states, subtle backgrounds, badge |
| **Charcoal Gelap** | `#2D312E` | Teks Utama | `text-[#2D312E]` | Body text, headings, main content |
| **Muted Gray** | `#717672` | Teks Sekunder | `text-[#717672]` | Labels, captions, secondary info, timestamps |
| **Hijau Daun** | `#3B7A57` | Indikator Positif | `text-[#3B7A57]` `bg-[#3B7A57]` | Pemasukan, sisa, success indicator |
| **Terracotta Soft** | `#C86B55` | Indikator Negatif | `text-[#C86B55]` `bg-[#C86B55]` | Pengeluaran, warning, negative indicator |
| **Border Light** | `#E8E8E8` | Divider | `border-[#E8E8E8]` | Garis divider, border card |

---

## 2. Typography & Layout

*   **Font Family:** `Inter` (dari Google Fonts) atau `Geist Sans` (bawaan Next.js).
*   **Font Weights:** Regular 400 (data), Medium 500 (label), SemiBold 600 (judul).
*   **Layouting:**
    *   **Desktop (lg+):** Sidebar minimalis di kiri (width: ~200px, sticky) + Konten utama di kanan.
    *   **Mobile/Tablet (< lg):** Bottom Navigation Bar (height: 80px, fixed bottom) agar jempol mudah menjangkau menu.

### Font Sizes
| Level | Size | Weight | Tailwind | Usage |
|-------|------|--------|----------|-------|
| **H1** | 32px | 700 | `text-3xl font-bold` | Page title |
| **H2** | 24px | 700 | `text-2xl font-bold` | Section title |
| **H3** | 18px | 600 | `text-lg font-semibold` | Subsection |
| **Body Large** | 16px | 400 | `text-base` | Body text default |
| **Body Small** | 14px | 400 | `text-sm` | Secondary text, labels |
| **Caption** | 12px | 400 | `text-xs` | Captions, helper text |

---

## 3. Struktur Folder Next.js (App Router)

Rekomendasi struktur folder yang rapi dan modular:

```
src/
├── app/
│   ├── layout.tsx              # Main layout + Sidebar/BottomNav
│   ├── page.tsx                # Dashboard (Summary + Chart)
│   ├── input/
│   │   └── page.tsx            # Form Input (Toggle Pemasukan/Pengeluaran)
│   ├── riwayat/
│   │   └── page.tsx            # Tabel Riwayat + Delete
│   └── api/                    # Route handlers untuk database queries
│       ├── pemasukan/
│       │   ├── route.ts        # GET, POST pemasukan
│       │   └── [id]/route.ts   # DELETE pemasukan
│       └── pengeluaran/
│           ├── route.ts        # GET, POST pengeluaran
│           └── [id]/route.ts   # DELETE pengeluaran
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   ├── Sidebar.tsx             # Navigasi Desktop
│   ├── BottomNav.tsx           # Navigasi Mobile
│   └── FinancialChart.tsx      # Recharts Donut/Bar Chart
├── lib/
│   ├── db.ts                   # Neon Database Client
│   ├── currency.ts             # Format Rupiah helper
│   └── utils.ts                # Utility functions
└── styles/
    └── globals.css             # Global Tailwind styles
```

---

## 4. UX Rules (WAJIB DIIKUTI)

### 4.1 Live Currency Formatting (Rupiah)
- User input `50000` → Display: `Rp 50.000`
- Implementasi: `formatCurrency(50000)` returns `"Rp 50.000"`
- Update secara **real-time** saat user mengetik
- Simpan nilai numerik ke database **tanpa separator**

### 4.2 Sticky Input Form (Multi-Input Friendly)
- **Bulan & Tahun selector TIDAK reset** setelah user klik "Simpan"
- Tombol "Simpan" hanya clear form fields (sumber/kategori/kegiatan/jumlah), bukan bulan/tahun
- User bisa terus input multiple entries untuk bulan yang sama
- Tombol "Ubah Bulan" terpisah untuk switch periode

### 4.3 Mobile vs Desktop Navigation
- **Desktop (lg+)**:
  - Sidebar fixed di kiri dengan menu: Dashboard, Input, Riwayat
  - Logo/brand di atas sidebar
  - Konten utama dimulai setelah sidebar
  
- **Mobile (< lg)**:
  - Bottom Navigation Bar dengan 3 icons + label: Dashboard, Input, Riwayat
  - Konten full-width di atas bottom nav (padding-bottom untuk clear space)
  - Tab active: indicator warna di bawah icon + text bold

### 4.4 Design Philosophy: JANGAN "AI Vibes"
- ❌ Hindari: Pure dark mode gulita, neon colors, ungu/biru elektrik, gradasi futuristik, glow effects
- ✅ Tetap: Natural, warm, breathable, light theme hanya

### 4.5 Responsiveness Checklist
- ✅ Sidebar/BottomNav adaptive ke breakpoint
- ✅ Card grid responsive (1 col mobile, 2-3 col desktop)
- ✅ Chart responsive (full-width dengan max-width untuk desktop)
- ✅ Form inputs full-width mobile, max-width 600px desktop
- ✅ Touch targets minimum 44px height untuk mobile

---

## 5. Component Guidelines

### Summary Cards (Dashboard)
```
- Title: text-sm text-[#717672]
- Value: text-2xl font-bold text-[#2D312E]
- Border Left: 4px solid [indicator color]
- Example: "Pemasukan: Rp 5.000.000" → border kiri hijau (#3B7A57)
```

### Button Primary (Call-to-Action)
```
- Background: #4A6B5D
- Text: #FFFFFF
- Padding: py-3 px-6
- Border Radius: rounded-lg
- Hover: darken 10% → #3A5A4D
```

### Button Secondary
```
- Background: #E8EFE9
- Text: #4A6B5D
- Padding: py-2.5 px-4
- Border Radius: rounded-md
- Hover: opacity-80
```

### Input Fields
```
- Background: #FFFFFF
- Border: 1px solid #E8E8E8
- Border Radius: rounded-lg
- Padding: py-3 px-3.5
- Focus: border-[#4A6B5D] outline-none
- Placeholder: text-[#717672] opacity-60
```

### Card Container
```
- Background: #FFFFFF
- Border: 1px solid #E8E8E8
- Border Radius: rounded-xl
- Padding: p-4
- Shadow: shadow-sm (soft)
- Hover: shadow increase subtle
```

### Badge / Tag
```
- Background: #E8EFE9
- Text: #4A6B5D
- Padding: py-1 px-3
- Border Radius: rounded-full
- Font: text-xs font-medium
```

---

## 6. Wireframe & User Flow (Halaman Utama)

### A. Dashboard (Halaman Utama)
*   **Top Bar:** Filter Bulan & Tahun (Dropdown horizontal, misal: `[ Mei 2026 ]`).
*   **Summary Cards (3 Kolom):**
    *   Card 1: Total Pemasukan (Indikator: Hijau Daun `#3B7A57`)
    *   Card 2: Total Pengeluaran (Indikator: Terracotta `#C86B55`)
    *   Card 3: Sisa Uang (Background `#E8EFE9`, teks bold)
*   **Main Section:**
    *   Kiri: Donut Chart kategori pengeluaran bulan terpilih
    *   Kanan: Tabel 5-10 transaksi terakhir (Log singkat)

### B. Form Input (Halaman Pencatatan)
*   Centered card dengan form vertikal
*   Toggle switch: Pemasukan / Pengeluaran di atas
*   **Pemasukan fields:** Sumber (Text), Jumlah (Number dengan live formatting Rp)
*   **Pengeluaran fields:** Kategori (Dropdown), Kegiatan (Text), Jumlah (Number)
*   **Bulan/Tahun selector:** Sticky (tidak reset setelah save)
*   **Tombol:** "Simpan Transaksi" (Sage Green, teks putih)

### C. Riwayat / Log Lengkap
*   Tabel komprehensif: semua transaksi bulan terpilih
*   Kolom: Tanggal, Kategori/Sumber, Detail, Jumlah, Action (Delete icon)
*   Delete icon: lucide-react `trash-2` dengan konfirmasi modal
*   Sorting & pagination optional untuk phase 2

---

## 7. Spacing System

Gunakan Tailwind default spacing:
```
xs: gap-1 (4px)
sm: gap-2 (8px)
md: gap-3 (12px)
lg: gap-4 (16px)
xl: gap-6 (24px)
2xl: gap-8 (32px)
```

**Page Padding:**
- Mobile: `px-4 py-6`
- Desktop: `px-8 py-8`

**Between Sections:** `gap-6` atau `mb-6`

---

## ✅ Validation Checklist

Sebelum production:
- [ ] Tidak ada pure dark background
- [ ] Tidak ada neon colors atau glow effects
- [ ] Text contrast ratio ≥ 4.5:1
- [ ] Sidebar/BottomNav switching bekerja di responsive
- [ ] Currency formatting live dan konsisten
- [ ] Input form sticky setelah save
- [ ] Buttons min 44px height untuk mobile
- [ ] Looks good di 375px (mobile), 768px (tablet), 1920px (desktop)

---

**Last Updated:** May 27, 2026  
**Version:** 1.0