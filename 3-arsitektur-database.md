# Arsitektur Database (Relational Schema)

Skema ini dirancang untuk mendukung sistem absensi, pelanggaran, dan penerbitan Surat Peringatan (SP). Karena implementasi menggunakan TypeScript, setiap tabel sebaiknya direpresentasikan dengan interface yang ketat.

## Tabel Utama

| Tabel | Deskripsi | Field Utama |
|---|---|---|
| `Users` | Akun untuk Guru Piket, Bagian Kesiswaan, dan TU | `id`, `username`, `password`, `role` (`admin`, `teacher`, `staff`) |
| `Students` | Data induk siswa | `id`, `nisn`, `nama`, `kelas`, `id_orangtua`, `total_poin_akumulasi` |
| `Attendance` | Data kehadiran harian siswa | `id`, `id_siswa`, `status` (`A`, `S`, `I`, `H`), `tanggal`, `keterangan` |
| `Violation_Types` | Master data jenis pelanggaran dan bobot poin | `id`, `nama_pelanggaran`, `kategori` (`ringan`, `sedang`, `berat`), `poin` |
| `Student_Violations` | Transaksi pelanggaran siswa | `id`, `id_siswa`, `id_violation_type`, `id_guru`, `tanggal`, `bukti_foto` |
| `Warning_Letters` | Log penerbitan Surat Peringatan | `id`, `id_siswa`, `jenis_sp` (`1`, `2`, `3`), `tanggal_terbit`, `status_dikirim` |

## Relasi Utama

- `Students.id` → `Attendance.id_siswa`
- `Students.id` → `Student_Violations.id_siswa`
- `Violation_Types.id` → `Student_Violations.id_violation_type`
- `Users.id` → `Student_Violations.id_guru`
- `Students.id` → `Warning_Letters.id_siswa`

## Catatan Struktur

- `Users.role` menentukan hak akses fungsi pada sistem.
- `Students.total_poin_akumulasi` dihitung dari transaksi pelanggaran dan digunakan untuk mengevaluasi ambang batas SP.
- `Attendance.status` bisa berupa:
  - `A` = Alfa
  - `S` = Sakit
  - `I` = Izin
  - `H` = Hadir
- `Warning_Letters.jenis_sp` menandakan tingkat Surat Peringatan.
- `status_dikirim` menandakan apakah SP sudah dikirimkan ke pihak terkait.
