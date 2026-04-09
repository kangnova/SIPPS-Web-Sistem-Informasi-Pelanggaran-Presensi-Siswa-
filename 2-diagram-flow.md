# Diagram Alur Sistem

Diagram berikut menggambarkan proses utama dalam sistem, mulai dari login user hingga penerbitan Surat Peringatan (SP) dan laporan.

```mermaid
graph TD
    A[Mulai] --> B{Login User}
    B -- Guru Piket --> C[Input Absensi & Pelanggaran]
    B -- Kesiswaan --> D[Kelola Data & Validasi Pelanggaran]
    B -- TU --> E[Cek Threshold Poin & Terbitkan SP]

    C --> F[Database]
    D --> F

    F --> G{Poin Siswa >= 75%?}
    G -- Ya --> H[Notifikasi ke TU & Kesiswaan]
    G -- Tidak --> I[Update Rekapitulasi]

    H --> J[Terbitkan Surat Peringatan / Pemberitahuan]
    J --> K[Laporan ke Orang Tua & Kepsek]
    I --> K
```

## Keterangan alur

- Guru Piket: memasukkan absensi harian dan pelanggaran.
- Bagian Kesiswaan: mengelola data pelanggaran dan memvalidasi entri.
- Bagian TU: mengecek ambang poin dan memulai proses SP.
- Jika poin siswa mencapai 75% atau lebih, sistem memberi notifikasi dan menerbitkan Surat Peringatan.
- Hasil akhirnya adalah laporan untuk Orang Tua dan Kepala Sekolah.