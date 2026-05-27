-- Migration script untuk mengubah dari bulan_tahun VARCHAR(7) ke tanggal DATE NOT NULL
-- Jalankan script ini di Neon console

-- 1. Add tanggal column ke pemasukan
ALTER TABLE pemasukan ADD COLUMN tanggal DATE;

-- 2. Migrate data dari bulan_tahun ke tanggal (set ke hari pertama bulan)
UPDATE pemasukan 
SET tanggal = (bulan_tahun || '-01')::DATE 
WHERE tanggal IS NULL;

-- 3. Make tanggal NOT NULL
ALTER TABLE pemasukan ALTER COLUMN tanggal SET NOT NULL;

-- 4. Drop bulan_tahun column dari pemasukan
ALTER TABLE pemasukan DROP COLUMN bulan_tahun;

-- 5. Add index untuk tanggal (untuk query performa)
CREATE INDEX idx_pemasukan_tanggal ON pemasukan(tanggal DESC);

-- 6. Add tanggal column ke pengeluaran
ALTER TABLE pengeluaran ADD COLUMN tanggal DATE;

-- 7. Migrate data dari bulan_tahun ke tanggal (set ke hari pertama bulan)
UPDATE pengeluaran 
SET tanggal = (bulan_tahun || '-01')::DATE 
WHERE tanggal IS NULL;

-- 8. Make tanggal NOT NULL
ALTER TABLE pengeluaran ALTER COLUMN tanggal SET NOT NULL;

-- 9. Drop bulan_tahun column dari pengeluaran
ALTER TABLE pengeluaran DROP COLUMN bulan_tahun;

-- 10. Add index untuk tanggal (untuk query performa)
CREATE INDEX idx_pengeluaran_tanggal ON pengeluaran(tanggal DESC);

-- Selesai! Skema database sudah di-update.
-- Struktur final:
-- pemasukan: id, created_at, tanggal DATE NOT NULL, sumber, jumlah
-- pengeluaran: id, created_at, tanggal DATE NOT NULL, kategori, kegiatan, jumlah
