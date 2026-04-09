# Alur Sistem (System Workflow)

Sistem ini melibatkan beberapa aktor dengan hak akses berbeda:

- **Guru Piket**
  - Melakukan input absensi harian.
  - Mencatat pelanggaran yang ditemukan di lapangan.

- **Bagian Kesiswaan**
  - Memvalidasi data.
  - Mengelola daftar jenis pelanggaran dan bobot poin.
  - Melihat rekapitulasi poin siswa.

- **Bagian TU**
  - Memantau threshold (ambang batas) poin.
  - Jika poin ≥ 75%, sistem memberikan notifikasi untuk cetak Surat Peringatan (SP).

- **Kepala Sekolah**
  - Menerima laporan periodik melalui dashboard.

- **Orang Tua (Opsional/Viewer)**
  - Menerima notifikasi.
  - Melihat riwayat anak.
