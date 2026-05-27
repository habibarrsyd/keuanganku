-- Personal Finance Tracker - Database Setup Script
-- Jalankan query ini di Neon Console untuk setup database

-- Create pemasukan table
CREATE TABLE pemasukan (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW(),
  bulan_tahun VARCHAR(7) NOT NULL,
  sumber TEXT NOT NULL,
  jumlah NUMERIC NOT NULL
);

-- Create index untuk faster queries by bulan_tahun
CREATE INDEX idx_pemasukan_bulan ON pemasukan(bulan_tahun);

-- Create pengeluaran table
CREATE TABLE pengeluaran (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW(),
  bulan_tahun VARCHAR(7) NOT NULL,
  kategori TEXT NOT NULL,
  kegiatan TEXT NOT NULL,
  jumlah NUMERIC NOT NULL
);

-- Create index untuk faster queries by bulan_tahun
CREATE INDEX idx_pengeluaran_bulan ON pengeluaran(bulan_tahun);

-- Done!
-- Anda sekarang bisa menggunakan aplikasi dengan database yang sudah ready.
