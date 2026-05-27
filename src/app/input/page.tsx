'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { formatCurrency, parseCurrency } from '@/lib/currency';

const PENGELUARAN_CATEGORIES = [
  { value: 'Makanan', label: 'Makanan' },
  { value: 'Transportasi', label: 'Transportasi' },
  { value: 'Bulanan', label: 'Bulanan' },
  { value: 'Hiburan', label: 'Hiburan' },
  { value: 'Belanja', label: 'Belanja' },
  { value: 'Kesehatan', label: 'Kesehatan' },
  { value: 'Pendidikan', label: 'Pendidikan' },
  { value: 'Lainnya', label: 'Lainnya' },
];

// Get today's date in YYYY-MM-DD format
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

export default function InputPage() {
  const [type, setType] = useState<'pemasukan' | 'pengeluaran'>('pemasukan');
  const [tanggal, setTanggal] = useState(getTodayDate());
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form fields
  const [sumber, setSumber] = useState('');
  const [kategori, setKategori] = useState('Makanan');
  const [kegiatan, setKegiatan] = useState('');
  const [jumlah, setJumlah] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      setLoading(true);

      if (!tanggal) {
        setError('Tanggal harus diisi');
        return;
      }

      const jumlahNumber = parseInt(jumlah);
      if (!jumlah || jumlahNumber <= 0) {
        setError('Jumlah harus lebih dari 0');
        return;
      }

      const endpoint = type === 'pemasukan' ? '/api/pemasukan' : '/api/pengeluaran';
      const payload =
        type === 'pemasukan'
          ? {
              tanggal,
              sumber,
              jumlah: jumlahNumber,
            }
          : {
              tanggal,
              kategori,
              kegiatan,
              jumlah: jumlahNumber,
            };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Gagal menyimpan data');
      }

      setSuccess(true);
      // Clear only form fields, keep date/type sticky
      setSumber('');
      setKegiatan('');
      setJumlah('');
      setKategori('Makanan');

      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FBFBFA] py-8 pb-24 lg:pb-8">
      <div className="container-max max-w-2xl">
        <h1 className="text-3xl font-bold text-text-dark mb-8">Input Transaksi</h1>

        <Card>
          <CardHeader>
            <CardTitle>Catat Transaksi Baru</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Success Message */}
              {success && (
                <div className="p-4 bg-[#E8F5E9] text-positive rounded-lg text-sm">
                  ✓ Transaksi berhasil disimpan
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-[#FFEBEE] text-negative rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Type Toggle */}
              <div>
                <label className="block text-sm font-medium text-text-dark mb-3">
                  Jenis Transaksi
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setType('pemasukan')}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                      type === 'pemasukan'
                        ? 'bg-positive text-white'
                        : 'bg-[#F5F5F5] text-text-dark hover:bg-[#E8E8E8]'
                    }`}
                  >
                    Pemasukan
                  </button>
                  <button
                    type="button"
                    onClick={() => setType('pengeluaran')}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                      type === 'pengeluaran'
                        ? 'bg-negative text-white'
                        : 'bg-[#F5F5F5] text-text-dark hover:bg-[#E8E8E8]'
                    }`}
                  >
                    Pengeluaran
                  </button>
                </div>
              </div>

              {/* Date Picker - Sticky */}
              <div>
                <label className="block text-sm font-medium text-text-dark mb-2">
                  Tanggal Transaksi
                </label>
                <input
                  type="date"
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text-dark"
                />
              </div>

              {/* Pemasukan Fields */}
              {type === 'pemasukan' && (
                <>
                  <Input
                    label="Sumber Pemasukan"
                    placeholder="Misal: Gajian, Bonus, dll"
                    value={sumber}
                    onChange={(e) => setSumber(e.target.value)}
                    required
                  />
                </>
              )}

              {/* Pengeluaran Fields */}
              {type === 'pengeluaran' && (
                <>
                  <Select
                    label="Kategori"
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                    options={PENGELUARAN_CATEGORIES}
                  />
                  <Input
                    label="Detail Kegiatan"
                    placeholder="Misal: Makan siang di warung, Bensin motor, dll"
                    value={kegiatan}
                    onChange={(e) => setKegiatan(e.target.value)}
                    required
                  />
                </>
              )}

              {/* Jumlah dengan Live Preview */}
              <div>
                <Input
                  label="Jumlah (Rp)"
                  type="text"
                  placeholder="Masukkan jumlah (contoh: 34000)"
                  value={jumlah}
                  onChange={(e) => {
                    // Hanya accept angka
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    setJumlah(value);
                  }}
                  required
                />
                {jumlah && (
                  <div className="mt-2 p-3 bg-primary-light rounded-lg">
                    <p className="text-sm text-text-muted mb-1">Preview:</p>
                    <p className="text-xl font-bold text-primary">
                      {formatCurrency(parseInt(jumlah) || 0)}
                    </p>
                  </div>
                )}
              </div>
            </form>
          </CardContent>

          <CardFooter>
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => {
                setSumber('');
                setKegiatan('');
                setJumlah('');
                setKategori('Makanan');
              }}
            >
              Reset
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              loading={loading}
              onClick={handleSubmit}
            >
              Simpan Transaksi
            </Button>
          </CardFooter>
        </Card>

        <p className="text-center text-text-muted text-sm mt-6">
          💡 Bulan/Tahun akan tetap sama saat Anda simpan, memudahkan multi-input
        </p>
      </div>
    </main>
  );
}
