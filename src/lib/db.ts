/**
 * Neon Database Client
 * 
 * Terhubung ke Neon PostgreSQL menggunakan library pg
 * Environment Variables yang diperlukan:
 * - DATABASE_URL: Connection string dari Neon Console
 * 
 * Format: postgresql://user:password@host/database?sslmode=require
 */

import { Pool } from '@neondatabase/serverless';

// Create a connection pool
let pool: Pool | null = null;

function getPool() {
  if (!pool) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set');
    }
    pool = new Pool({ 
      connectionString: process.env.DATABASE_URL,
      max: 10, // reduced from 20 untuk serverless
      min: 1,
      idleTimeoutMillis: 60000, // increased from 30000
      connectionTimeoutMillis: 10000, // increased from 2000
      statement_timeout: 30000, // add statement timeout
      query_timeout: 30000, // add query timeout
    });

    // Handle pool errors
    pool.on('error', (err) => {
      console.error('Pool error:', err);
    });
  }
  return pool;
}

// Retry helper
async function queryWithRetry(text: string, params?: any[], retries: number = 3): Promise<any> {
  let lastError;
  
  for (let i = 0; i < retries; i++) {
    try {
      const p = getPool();
      const result = await p.query(text, params);
      return result;
    } catch (err) {
      lastError = err;
      console.error(`Query attempt ${i + 1} failed:`, err);
      
      // Exponential backoff before retry
      if (i < retries - 1) {
        const delay = Math.pow(2, i) * 100; // 100ms, 200ms, 400ms
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
}

async function query(text: string, params?: any[]) {
  return queryWithRetry(text, params);
}

/**
 * Query helper untuk Neon Database
 * Gunakan parameterized queries untuk security dan auto-escaping
 */
    export const db = {
  /**
   * Get all pemasukan untuk bulan tertentu (format: YYYY-MM)
   */
  async getPemasukanByBulan(bulanTahun: string) {
    try {
      const result = await query(
        `SELECT id, created_at, tanggal, sumber, jumlah 
         FROM pemasukan 
         WHERE DATE_TRUNC('month', tanggal)::date = ($1 || '-01')::date 
         ORDER BY tanggal DESC`,
        [bulanTahun]
      );
      return result.rows;
    } catch (error) {
      console.error('Error fetching pemasukan:', error);
      throw error;
    }
  },

  /**
   * Get total pemasukan untuk bulan tertentu (format: YYYY-MM)
   */
  async getTotalPemasukanByBulan(bulanTahun: string) {
    try {
      const result = await query(
        `SELECT COALESCE(SUM(jumlah), 0) as total 
         FROM pemasukan 
         WHERE DATE_TRUNC('month', tanggal)::date = ($1 || '-01')::date`,
        [bulanTahun]
      );
      return result.rows[0]?.total || 0;
    } catch (error) {
      console.error('Error calculating total pemasukan:', error);
      throw error;
    }
  },

  /**
   * Create new pemasukan entry
   */
  async createPemasukan(tanggal: string, sumber: string, jumlah: number) {
    try {
      const result = await query(
        `INSERT INTO pemasukan (tanggal, sumber, jumlah, created_at) 
         VALUES ($1::date, $2, $3, NOW()) 
         RETURNING id, created_at, tanggal, sumber, jumlah`,
        [tanggal, sumber, jumlah]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error creating pemasukan:', error);
      throw error;
    }
  },

  /**
   * Delete pemasukan by ID
   */
  async deletePemasukan(id: number) {
    try {
      const result = await query(
        'DELETE FROM pemasukan WHERE id = $1 RETURNING id',
        [id]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error deleting pemasukan:', error);
      throw error;
    }
  },

  /**
   * Get all pengeluaran untuk bulan tertentu (format: YYYY-MM)
   */
  async getPengeluaranByBulan(bulanTahun: string) {
    try {
      const result = await query(
        `SELECT id, created_at, tanggal, kategori, kegiatan, jumlah 
         FROM pengeluaran 
         WHERE DATE_TRUNC('month', tanggal)::date = ($1 || '-01')::date 
         ORDER BY tanggal DESC`,
        [bulanTahun]
      );
      return result.rows;
    } catch (error) {
      console.error('Error fetching pengeluaran:', error);
      throw error;
    }
  },

  /**
   * Get total pengeluaran untuk bulan tertentu (format: YYYY-MM)
   */
  async getTotalPengeluaranByBulan(bulanTahun: string) {
    try {
      const result = await query(
        `SELECT COALESCE(SUM(jumlah), 0) as total 
         FROM pengeluaran 
         WHERE DATE_TRUNC('month', tanggal)::date = ($1 || '-01')::date`,
        [bulanTahun]
      );
      return result.rows[0]?.total || 0;
    } catch (error) {
      console.error('Error calculating total pengeluaran:', error);
      throw error;
    }
  },

  /**
   * Get pengeluaran breakdown by kategori untuk bulan tertentu (format: YYYY-MM)
   * Berguna untuk pie/donut chart
   */
  async getPengeluaranByKategori(bulanTahun: string) {
    try {
      const result = await query(
        `SELECT kategori, COALESCE(SUM(jumlah), 0) as total 
         FROM pengeluaran 
         WHERE DATE_TRUNC('month', tanggal)::date = ($1 || '-01')::date 
         GROUP BY kategori 
         ORDER BY total DESC`,
        [bulanTahun]
      );
      return result.rows;
    } catch (error) {
      console.error('Error fetching pengeluaran by kategori:', error);
      throw error;
    }
  },

  /**
   * Create new pengeluaran entry
   */
  async createPengeluaran(
    tanggal: string,
    kategori: string,
    kegiatan: string,
    jumlah: number
  ) {
    try {
      const result = await query(
        `INSERT INTO pengeluaran (tanggal, kategori, kegiatan, jumlah, created_at) 
         VALUES ($1::date, $2, $3, $4, NOW()) 
         RETURNING id, created_at, tanggal, kategori, kegiatan, jumlah`,
        [tanggal, kategori, kegiatan, jumlah]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error creating pengeluaran:', error);
      throw error;
    }
  },

  /**
   * Delete pengeluaran by ID
   */
  async deletePengeluaran(id: number) {
    try {
      const result = await query(
        'DELETE FROM pengeluaran WHERE id = $1 RETURNING id',
        [id]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error deleting pengeluaran:', error);
      throw error;
    }
  },

  /**
   * Get summary dashboard untuk bulan tertentu
   * Returns: total pemasukan, total pengeluaran, sisa
   */
  async getDashboardSummary(bulanTahun: string) {
    try {
      const [totalPemasukan, totalPengeluaran] = await Promise.all([
        this.getTotalPemasukanByBulan(bulanTahun),
        this.getTotalPengeluaranByBulan(bulanTahun),
      ]);

      return {
        totalPemasukan: Number(totalPemasukan),
        totalPengeluaran: Number(totalPengeluaran),
        sisa: Number(totalPemasukan) - Number(totalPengeluaran),
      };
    } catch (error) {
      console.error('Error fetching dashboard summary:', error);
      throw error;
    }
  },

  /**
   * Get recent transactions (pemasukan + pengeluaran) untuk bulan tertentu (format: YYYY-MM)
   * Limit: default 10 entries
   */
  async getRecentTransactions(bulanTahun: string, limit: number = 10) {
    try {
      const pemasukanResult = await query(
        `SELECT id, created_at, tanggal, 'pemasukan' as type, sumber as kategori, '' as kegiatan, jumlah 
         FROM pemasukan 
         WHERE DATE_TRUNC('month', tanggal)::date = ($1 || '-01')::date`,
        [bulanTahun]
      );

      const pengeluaranResult = await query(
        `SELECT id, created_at, tanggal, 'pengeluaran' as type, kategori, kegiatan, jumlah 
         FROM pengeluaran 
         WHERE DATE_TRUNC('month', tanggal)::date = ($1 || '-01')::date`,
        [bulanTahun]
      );

      const combined = [...pemasukanResult.rows, ...pengeluaranResult.rows];
      combined.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      return combined.slice(0, limit);
    } catch (error) {
      console.error('Error fetching recent transactions:', error);
      throw error;
    }
  },

  /**
   * Get daily spending untuk bulan tertentu (format: YYYY-MM)
   * Returns: array of {tanggal, total} untuk chart
   */
  async getDailySpending(bulanTahun: string) {
    try {
      // Query pengeluaran langsung
      const result = await query(
        `SELECT 
           tanggal::text,
           COALESCE(SUM(jumlah), 0)::numeric as total 
         FROM pengeluaran 
         WHERE TO_CHAR(tanggal, 'YYYY-MM') = $1
         GROUP BY tanggal::text
         ORDER BY tanggal ASC`,
        [bulanTahun]
      );

      if (!result.rows || result.rows.length === 0) {
        return [];
      }

      // Return langsung dari database
      return result.rows.map((row: any) => ({
        tanggal: row.tanggal,
        total: Number(row.total),
      }));
    } catch (error) {
      console.error('Error fetching daily spending:', error);
      throw error;
    }
  },

  /**
   * Get monthly comparison data untuk 2 bulan
   */
  async getMonthlyComparison(month1: string, month2: string) {
    try {
      const result = await query(
        `SELECT 
           TO_CHAR(tanggal, 'YYYY-MM') as bulan,
           COALESCE(SUM(jumlah), 0)::numeric as total 
         FROM pengeluaran 
         WHERE TO_CHAR(tanggal, 'YYYY-MM') IN ($1, $2)
         GROUP BY TO_CHAR(tanggal, 'YYYY-MM')
         ORDER BY bulan ASC`,
        [month1, month2]
      );
      return result.rows.map((row: any) => ({
        bulan: row.bulan,
        total: Number(row.total),
      }));
    } catch (error) {
      console.error('Error fetching monthly comparison:', error);
      throw error;
    }
  },

  /**
   * Get top spending categories untuk bulan tertentu
   */
  async getTopSpendingCategories(bulanTahun: string, limit: number = 3) {
    try {
      const result = await query(
        `SELECT 
           kategori,
           COALESCE(SUM(jumlah), 0)::numeric as total,
           COUNT(*) as transaksi 
         FROM pengeluaran 
         WHERE TO_CHAR(tanggal, 'YYYY-MM') = $1
         GROUP BY kategori 
         ORDER BY total DESC
         LIMIT $2`,
        [bulanTahun, limit]
      );
      return result.rows.map((row: any) => ({
        kategori: row.kategori,
        total: Number(row.total),
        transaksi: row.transaksi,
      }));
    } catch (error) {
      console.error('Error fetching top categories:', error);
      throw error;
    }
  },

  /**
   * Get category spending trend over multiple months
   */
  async getCategoryTrends(kategori: string, months: number = 6) {
    try {
      const result = await query(
        `SELECT 
           TO_CHAR(tanggal, 'YYYY-MM') as bulan,
           COALESCE(SUM(jumlah), 0)::numeric as total 
         FROM pengeluaran 
         WHERE kategori = $1 
           AND tanggal >= CURRENT_DATE - INTERVAL '1 month' * $2
         GROUP BY TO_CHAR(tanggal, 'YYYY-MM')
         ORDER BY bulan ASC`,
        [kategori, months]
      );
      return result.rows.map((row: any) => ({
        bulan: row.bulan,
        total: Number(row.total),
      }));
    } catch (error) {
      console.error('Error fetching category trends:', error);
      throw error;
    }
  },

  /**
   * Get weekly spending breakdown untuk bulan tertentu
   */
  async getWeeklySpending(bulanTahun: string) {
    try {
      const result = await query(
        `SELECT 
           CONCAT('Week ', EXTRACT(WEEK FROM tanggal)::integer) as minggu,
           EXTRACT(WEEK FROM tanggal)::integer as week_num,
           COALESCE(SUM(jumlah), 0)::numeric as total 
         FROM pengeluaran 
         WHERE TO_CHAR(tanggal, 'YYYY-MM') = $1
         GROUP BY EXTRACT(WEEK FROM tanggal)
         ORDER BY week_num ASC`,
        [bulanTahun]
      );
      return result.rows.map((row: any) => ({
        minggu: row.minggu,
        total: Number(row.total),
      }));
    } catch (error) {
      console.error('Error fetching weekly spending:', error);
      throw error;
    }
  },

  /**
   * Get year-to-date summary untuk tahun tertentu
   */
  async getYearToDateSummary(tahun: string) {
    try {
      const [pemasukanResult, pengeluaranResult] = await Promise.all([
        query(
          `SELECT COALESCE(SUM(jumlah), 0)::numeric as total 
           FROM pemasukan 
           WHERE EXTRACT(YEAR FROM tanggal) = CAST($1 as integer)`,
          [tahun]
        ),
        query(
          `SELECT COALESCE(SUM(jumlah), 0)::numeric as total 
           FROM pengeluaran 
           WHERE EXTRACT(YEAR FROM tanggal) = CAST($1 as integer)`,
          [tahun]
        ),
      ]);

      const totalPemasukan = Number(pemasukanResult.rows[0]?.total || 0);
      const totalPengeluaran = Number(pengeluaranResult.rows[0]?.total || 0);

      return {
        totalPemasukan,
        totalPengeluaran,
        sisa: totalPemasukan - totalPengeluaran,
      };
    } catch (error) {
      console.error('Error fetching year-to-date summary:', error);
      throw error;
    }
  },

  /**
   * Get average daily spending untuk bulan tertentu
   */
  async getAverageDailySpending(bulanTahun: string) {
    try {
      const result = await query(
        `SELECT 
           COALESCE(AVG(daily_total), 0)::numeric as average,
           COALESCE(MAX(daily_total), 0)::numeric as max_daily,
           COALESCE(MIN(daily_total), 0)::numeric as min_daily
         FROM (
           SELECT SUM(jumlah) as daily_total
           FROM pengeluaran
           WHERE TO_CHAR(tanggal, 'YYYY-MM') = $1
           GROUP BY tanggal
         ) daily_stats`,
        [bulanTahun]
      );
      return {
        average: Number(result.rows[0]?.average || 0),
        max_daily: Number(result.rows[0]?.max_daily || 0),
        min_daily: Number(result.rows[0]?.min_daily || 0),
      };
    } catch (error) {
      console.error('Error fetching average daily spending:', error);
      throw error;
    }
  },

  /**
   * Get all pengeluaran dengan kategori breakdown untuk export
   */
  async getAllPengeluaranForExport(bulanTahun: string) {
    try {
      const result = await query(
        `SELECT 
           tanggal,
           kategori,
           kegiatan,
           jumlah
         FROM pengeluaran 
         WHERE TO_CHAR(tanggal, 'YYYY-MM') = $1
         ORDER BY tanggal DESC`,
        [bulanTahun]
      );
      return result.rows;
    } catch (error) {
      console.error('Error fetching pengeluaran for export:', error);
      throw error;
    }
  },
};

export default db;
