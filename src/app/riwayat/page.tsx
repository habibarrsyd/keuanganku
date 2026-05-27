'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, getCurrentMonthYear, generateMonthOptions, formatDate } from '@/lib/currency';

interface Transaction {
  id: number;
  type: 'pemasukan' | 'pengeluaran';
  kategori: string;
  kegiatan?: string;
  jumlah: number;
  created_at: string;
}

export default function RiwayatPage() {
  const [bulanTahun, setBulanTahun] = useState(getCurrentMonthYear());
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    id?: number;
    type?: 'pemasukan' | 'pengeluaran';
    loading?: boolean;
  }>({ isOpen: false });

  const monthOptions = generateMonthOptions(12);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch both pemasukan and pengeluaran
      const [pemasukanRes, pengeluaranRes] = await Promise.all([
        fetch(`/api/pemasukan?bulan_tahun=${bulanTahun}`),
        fetch(`/api/pengeluaran?bulan_tahun=${bulanTahun}`),
      ]);

      const pemasukanData = await pemasukanRes.json();
      const pengeluaranData = await pengeluaranRes.json();

      // Combine and sort by date
      const combined = [
        ...((pemasukanData.data || []).map((item: any) => ({
          ...item,
          type: 'pemasukan',
          kegiatan: '',
        }))),
        ...((pengeluaranData.data || []).map((item: any) => ({
          ...item,
          type: 'pengeluaran',
        }))),
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      setTransactions(combined);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError('Gagal memuat riwayat. Pastikan database sudah terhubung.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [bulanTahun]);

  const handleDelete = async () => {
    if (!deleteModal.id || !deleteModal.type) return;

    try {
      setDeleteModal({ ...deleteModal, loading: true });

      const response = await fetch(
        `/api/${deleteModal.type}/${deleteModal.id}`,
        { method: 'DELETE' }
      );

      if (!response.ok) {
        throw new Error('Gagal menghapus transaksi');
      }

      // Refresh data
      await fetchTransactions();
      setDeleteModal({ isOpen: false });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBFBFA] py-8">
        <div className="container-max">
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-text-muted mt-4">Memuat data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FBFBFA] py-8 pb-24 lg:pb-8">
      <div className="container-max">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-dark mb-4">Riwayat Transaksi</h1>
          
          {/* Month Selector */}
          <Select
            value={bulanTahun}
            onChange={(e) => setBulanTahun(e.target.value)}
            options={monthOptions}
            className="w-full lg:w-64"
          />
        </div>

        {error && (
          <div className="mb-6 p-4 bg-[#FFEBEE] text-negative rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Semua Transaksi</CardTitle>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-text-muted">Tidak ada transaksi untuk bulan ini</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border-light">
                      <th className="text-left py-3 px-4 font-semibold text-text-dark">Tanggal</th>
                      <th className="text-left py-3 px-4 font-semibold text-text-dark">Tipe</th>
                      <th className="text-left py-3 px-4 font-semibold text-text-dark">Kategori/Sumber</th>
                      <th className="text-left py-3 px-4 font-semibold text-text-dark">Keterangan</th>
                      <th className="text-right py-3 px-4 font-semibold text-text-dark">Jumlah</th>
                      <th className="text-center py-3 px-4 font-semibold text-text-dark">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx) => (
                      <tr key={`${tx.type}-${tx.id}`} className="border-b border-border-light hover:bg-[#F9F9F9]">
                        <td className="py-3 px-4 text-text-muted">
                          {formatDate(tx.created_at)}
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={tx.type === 'pemasukan' ? 'success' : 'danger'}>
                            {tx.type === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran'}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 font-semibold text-text-dark">
                          {tx.kategori}
                        </td>
                        <td className="py-3 px-4 text-text-muted">
                          {tx.kegiatan || '-'}
                        </td>
                        <td className="py-3 px-4 text-right font-bold">
                          <span className={tx.type === 'pemasukan' ? 'text-positive' : 'text-negative'}>
                            {tx.type === 'pemasukan' ? '+' : '-'}{formatCurrency(tx.jumlah)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() =>
                              setDeleteModal({
                                isOpen: true,
                                id: tx.id,
                                type: tx.type,
                                loading: false,
                              })
                            }
                            className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-[#FFEBEE] text-negative transition-colors"
                            title="Hapus transaksi"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-9l-1 1H5v2h14V4z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false })}
        title="Hapus Transaksi"
        description="Apakah Anda yakin ingin menghapus transaksi ini? Aksi ini tidak dapat dibatalkan."
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setDeleteModal({ isOpen: false })}
            >
              Batal
            </Button>
            <Button
              variant="danger"
              loading={deleteModal.loading}
              onClick={handleDelete}
            >
              Hapus
            </Button>
          </>
        }
      />
    </main>
  );
}
