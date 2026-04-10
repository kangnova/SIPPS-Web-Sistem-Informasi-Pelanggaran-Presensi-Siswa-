import { Student, ViolationType, ViolationRecord, User } from '../types';

export const mockUsers: User[] = [
  { id: '1', name: 'Pak Guru Budi', username: 'guru', role: 'guru' },
  { id: '2', name: 'Bu Ani (Kesiswaan)', username: 'kesiswaan', role: 'kesiswaan' },
  { id: '3', name: 'Pak Andi (TU)', username: 'tu', role: 'tu' },
];

export const mockStudents: Student[] = [
  { id: 'S1', nisn: '0012345678', name: 'Ahmad Fauzi', class: 'X-RPL-1', points: 15 },
  { id: 'S2', nisn: '0012345679', name: 'Bambang Sudarsono', class: 'X-RPL-1', points: 85 },
  { id: 'S3', nisn: '0012345680', name: 'Citra Kirana', class: 'XI-MM-2', points: 190 },
  { id: 'S4', nisn: '0012345681', name: 'Dedi Kurniawan', class: 'XII-TKJ-1', points: 245 },
];

export const mockViolationTypes: ViolationType[] = [
  { id: 'V1', name: 'Terlambat Masuk Sekolah', points: 5, category: 'ringan' },
  { id: 'V2', name: 'Tidak Memakai Atribut Lengkap', points: 10, category: 'ringan' },
  { id: 'V3', name: 'Bolos Pelajaran', points: 25, category: 'sedang' },
  { id: 'V4', name: 'Merokok di Sekolah', points: 50, category: 'berat' },
  { id: 'V5', name: 'Perkelahian / Tawuran', points: 150, category: 'berat' },
];

export const mockViolations: ViolationRecord[] = [
  {
    id: 'R1',
    studentId: 'S3',
    violationTypeId: 'V4',
    date: '2024-03-20',
    points: 50,
    teacherId: '1',
    status: 'validated'
  },
  {
    id: 'R2',
    studentId: 'S4',
    violationTypeId: 'V3',
    date: '2024-03-21',
    points: 25,
    teacherId: '1',
    status: 'pending'
  }
];
