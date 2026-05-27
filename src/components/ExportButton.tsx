'use client';

import { useState } from 'react';

interface ExportButtonProps {
  bulanTahun: string;
}

export default function ExportButton({ bulanTahun }: ExportButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleExportCSV = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/export/csv?bulanTahun=${bulanTahun}`);

      if (!response.ok) {
        throw new Error('Failed to export CSV');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `laporan-${bulanTahun}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting CSV:', error);
      alert('Gagal mengexport laporan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleExportCSV}
      disabled={loading}
      className="btn-secondary"
    >
      {loading ? '📥 Mengexport...' : '📥 Export CSV'}
    </button>
  );
}
