# Product Requirements Document (PRD) - SIPPS
**Sistem Informasi Pelanggaran & Presensi Siswa**

## 1. Pendahuluan
Aplikasi berbasis web yang mendigitalisasi pencatatan kehadiran dan pelanggaran siswa, serta mengotomatisasi pemantauan poin kedisiplinan untuk penerbitan surat peringatan.

## 2. Tujuan Utama
- Memudahkan Guru Piket mencatat absensi dan pelanggaran secara real-time melalui smartphone.
- Mengotomatisasi penghitungan poin pelanggaran siswa.
- Memberikan peringatan dini kepada TU saat siswa mendekati ambang batas poin (75%).

## 3. User Personas dan Fitur Utama
### 3.1 Guru Piket (Mobile Focused)
- Input Absensi: pilih kelas dan pilih status kehadiran (Alpha, Sakit, Izin, Hadir).
- Input Pelanggaran: cari siswa, pilih jenis pelanggaran, dan upload bukti foto (opsional).

### 3.2 Bagian Kesiswaan (Dashboard Focused)
- Master Data: kelola data siswa, kelas, dan bobot poin pelanggaran.
- Validasi: review dan konfirmasi laporan pelanggaran dari Guru Piket.
- Rekapitulasi: lihat statistik pelanggaran per kelas atau per periode.

### 3.3 Bagian Tata Usaha (TU)
- Monitoring Poin: daftar siswa dengan poin ≥ 75% dari batas maksimal.
- Generasi Dokumen: cetak otomatis PDF Surat Peringatan (SP) dengan data siswa terisi.

## 4. Spesifikasi Teknis
- Frontend: React.js dengan TypeScript.
- Styling: Tailwind CSS untuk layout responsif.
- State Management: React Query atau Redux Toolkit.
- Ikon: Lucide React atau Heroicons.
- UI Components: Shadcn/UI atau Mantine untuk tabel dan form.

## 5. Aturan Bisnis (Business Rules)
1. Perhitungan poin: setiap pelanggaran memiliki bobot poin tetap dan poin terakumulasi selama satu tahun ajaran.
2. Threshold Surat Peringatan:
   - Skor < 75%: status Hijau (aman).
   - Skor 75% - 89%: status Kuning (peringatan / SP 1).
   - Skor ≥ 90%: status Merah (SP 2 atau panggilan orang tua).
3. Absensi: siswa yang Alpha (A) dapat dikenakan poin pelanggaran otomatis (misal 5 poin/hari) sesuai kebijakan sekolah.

## 6. Roadmap Pengembangan
- V1: dashboard, input absensi, input pelanggaran, dan rekap poin.
- V2: integrasi WhatsApp Gateway untuk notifikasi otomatis ke orang tua.
- V3: fitur reward poin untuk prestasi siswa sebagai pengurang poin pelanggaran.

## 7. Rekomendasi Implementasi React + TypeScript
- Responsivitas: gunakan pendekatan Mobile First untuk pengalaman pengguna guru piket.
- Komponen ramah sentuhan: gunakan Toggle Group, Large Checkbox, atau input yang mudah dioperasikan di ponsel.
- Type Safety: buat folder `types/` untuk mendefinisikan interface data.

Contoh interface TypeScript:

```ts
interface Student {
  id: string;
  name: string;
  currentPoints: number;
  maxPoints: number; // misalnya 250
}
```

- PDF Generation: untuk bagian TU, gunakan library seperti `@react-pdf/renderer` atau `jspdf` agar proses cetak surat peringatan bisa dilakukan langsung di browser tanpa backend berat.
