export type Role = 'guru' | 'kesiswaan' | 'tu' | 'admin';

export interface User {
  id: string;
  name: string;
  role: Role;
  username: string;
}

export interface Student {
  id: string;
  nisn: string;
  name: string;
  class: string;
  points: number;
}

export interface ViolationType {
  id: string;
  name: string;
  points: number;
  category: 'ringan' | 'sedang' | 'berat';
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: 'hadir' | 'izin' | 'sakit' | 'alpha';
  teacherId: string;
}

export interface ViolationRecord {
  id: string;
  studentId: string;
  violationTypeId: string;
  date: string;
  points: number;
  evidenceUrl?: string;
  teacherId: string;
  status: 'pending' | 'validated' | 'rejected';
}
