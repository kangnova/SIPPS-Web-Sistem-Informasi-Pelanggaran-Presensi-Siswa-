import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  Settings, 
  Database, 
  ShieldCheck, 
  UserPlus, 
  Building2, 
  AlertCircle,
  Search,
  Filter,
  MoreVertical,
  LogOut,
  Home,
  ChevronRight,
  TrendingUp,
  X,
  UserCheck,
  ClipboardList,
  Mail,
  Smartphone,
  Server,
  Bell,
  Trash2,
  Edit2,
  Plus
} from 'lucide-react';
import { mockStudents as initialStudents, mockUsers, mockViolationTypes } from '../mocks/db';
import { Student } from '../types';

const AdminDashboard = () => {
  // Data States
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'students' | 'classes' | 'violations' | 'settings'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClassFilter, setSelectedClassFilter] = useState('');
  
  // Modal States
  const [modals, setModals] = useState<{
    type: 'addStudent' | 'editStudent' | 'deleteStudent' | 'addClass' | 'editClass' | 'deleteClass' | 'classDetail' | null;
    open: boolean;
    data: any;
  }>({ type: null, open: false, data: null });

  const navigate = useNavigate();

  // Derived Data
  const classes = useMemo(() => Array.from(new Set(students.map(s => s.class))), [students]);

  const filteredStudents = useMemo(() => students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.nisn.includes(searchQuery);
    const matchesClass = selectedClassFilter === '' || s.class === selectedClassFilter;
    return matchesSearch && matchesClass;
  }), [students, searchQuery, selectedClassFilter]);

  const stats = [
    { title: 'Total Pengguna', value: mockUsers.length, icon: <Users className="w-5 h-5 text-blue-600" />, bg: 'bg-blue-50' },
    { title: 'Total Siswa', value: students.length, icon: <UserCheck className="w-5 h-5 text-emerald-600" />, bg: 'bg-emerald-50' },
    { title: 'Jenis Pelanggaran', value: mockViolationTypes.length, icon: <ClipboardList className="w-5 h-5 text-amber-600" />, bg: 'bg-amber-50' },
    { title: 'Uptime Sistem', value: '99.9%', icon: <Server className="w-5 h-5 text-indigo-600" />, bg: 'bg-indigo-50' },
  ];

  // Handlers
  const handleOpenModal = (type: typeof modals.type, data: any = null) => {
    setModals({ type, open: true, data });
  };

  const handleCloseModal = () => {
    setModals({ ...modals, open: false });
    // Cleanup data after animation
    setTimeout(() => setModals({ type: null, open: false, data: null }), 300);
  };

  const saveStudent = (studentData: any) => {
    if (modals.type === 'addStudent') {
      const newStudent = {
        ...studentData,
        id: `S${Date.now()}`,
        points: parseInt(studentData.points || 0)
      };
      setStudents([...students, newStudent]);
    } else if (modals.type === 'editStudent') {
      setStudents(students.map(s => s.id === modals.data.id ? { ...s, ...studentData, points: parseInt(studentData.points) } : s));
    }
    handleCloseModal();
  };

  const deleteStudent = (id: string) => {
    setStudents(students.filter(s => s.id !== id));
    handleCloseModal();
  };

  const saveClass = (oldName: string | null, newName: string) => {
    if (!oldName) {
      // Add Class basically means adding a placeholder or just refreshing the UI if students are added
      // we'll simulate by creating a dummy student in that class if needed, or just let users know it's a "logical" class
      // For this mock, we can just alert since classes are derived from students
      alert(`Kelas ${newName} berhasil dibuat. Tambahkan siswa ke kelas ini untuk melihatnya di daftar.`);
    } else {
      // Update class name for all students in that class
      setStudents(students.map(s => s.class === oldName ? { ...s, class: newName } : s));
    }
    handleCloseModal();
  };

  const deleteClass = (className: string) => {
    setStudents(students.filter(s => s.class !== className));
    handleCloseModal();
  };

  // UI Components
  const Modal = ({ children, title, variant = 'primary' }: { children: React.ReactNode, title: string, variant?: 'primary' | 'danger' }) => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-800 font-display">{title}</h3>
          <button onClick={handleCloseModal} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>
        <div className="p-8">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="premium-card p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                {stat.icon}
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live</span>
            </div>
            <p className="text-sm font-medium text-slate-500">{stat.title}</p>
            <h3 className="text-2xl font-display font-bold text-slate-800 mt-1">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          {/* Quick Actions */}
          <section className="premium-card p-8">
            <h3 className="text-xl font-bold text-slate-800 mb-6 font-display">Aksi Cepat Manajemen</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button 
                onClick={() => setActiveTab('users')}
                className="flex flex-col items-center gap-3 p-6 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-primary-50 hover:border-primary-100 transition-all group"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <UserPlus className="w-6 h-6 text-primary-600" />
                </div>
                <span className="text-sm font-bold text-slate-700">Tambah Akun</span>
              </button>
              <button 
                onClick={() => handleOpenModal('addClass')}
                className="flex flex-col items-center gap-3 p-6 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-emerald-50 hover:border-emerald-100 transition-all group"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <Building2 className="w-6 h-6 text-emerald-600" />
                </div>
                <span className="text-sm font-bold text-slate-700">Tambah Kelas</span>
              </button>
              <button 
                onClick={() => setActiveTab('violations')}
                className="flex flex-col items-center gap-3 p-6 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-amber-50 hover:border-amber-100 transition-all group"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <Settings className="w-6 h-6 text-amber-600" />
                </div>
                <span className="text-sm font-bold text-slate-700">Konfigurasi Poin</span>
              </button>
            </div>
          </section>

          {/* System Logs Preview */}
          <section className="premium-card p-0 overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white">
              <h3 className="font-bold text-slate-800 font-display">Log Aktivitas Sistem</h3>
              <button className="text-xs font-bold text-primary-600 hover:underline">Download Report</button>
            </div>
            <div className="p-6 space-y-6">
              {[
                { label: 'Security', text: 'Login berhasil dari IP 192.168.1.1 (Admin)', time: '2 menit yang lalu' },
                { label: 'Data', text: 'Siswa baru ditambahkan ke kelas X-RPL-1 oleh TU', time: '15 menit yang lalu' },
                { label: 'System', text: 'Auto-backup database berhasil diselesaikan', time: '1 jam yang lalu' },
              ].map((log, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-2 h-2 mt-2 bg-primary-500 rounded-full" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{log.label}</span>
                      <span className="text-[10px] text-slate-300">•</span>
                      <span className="text-[10px] text-slate-400 font-medium">{log.time}</span>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">{log.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Integration Status */}
        <div className="space-y-6">
          <section className="premium-card p-8 bg-indigo-600 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Smartphone className="w-5 h-5" /> Status Integrasi
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white/10 rounded-xl">
                  <span className="text-sm font-medium">WhatsApp API</span>
                  <span className="px-2 py-0.5 bg-emerald-400 text-[10px] font-bold text-white rounded-full">Connected</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/10 rounded-xl">
                  <span className="text-sm font-medium">Email Server</span>
                  <span className="px-2 py-0.5 bg-emerald-400 text-[10px] font-bold text-white rounded-full">Active</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/10 rounded-xl">
                  <span className="text-sm font-medium">Cloud Storage</span>
                  <span className="px-2 py-0.5 bg-amber-400 text-[10px] font-bold text-white rounded-full">85% Full</span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
          </section>

          <section className="premium-card p-8">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" /> System Alerts
            </h3>
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl text-amber-800 text-xs font-medium leading-relaxed">
              Ada 5 Siswa dengan status poin melampaui batas (200+) yang belum diproses oleh Tata Usaha. Segera ingatkan petugas terkait.
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="premium-card p-6 bg-white overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Manajemen Pengguna</h3>
            <p className="text-sm text-slate-500 mt-1">Kelola hak akses dan akun petugas SIPPS.</p>
          </div>
          <button className="w-full md:w-auto px-6 py-3 bg-primary-600 text-white font-bold rounded-xl shadow-lg shadow-primary-200 hover:bg-primary-700 transition-all text-sm flex items-center justify-center gap-2">
            <UserPlus className="w-4 h-4" /> Tambah Akun Baru
          </button>
        </div>

        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-left min-w-[700px]">
            <thead className="bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              <tr>
                <th className="px-8 py-4">Nama Petugas</th>
                <th className="px-6 py-4">Username</th>
                <th className="px-6 py-4">Peran (Role)</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-8 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {mockUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                        {user.name.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-800">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-mono text-xs">{user.username}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-600' :
                      user.role === 'guru' ? 'bg-blue-100 text-blue-600' :
                      user.role === 'kesiswaan' ? 'bg-indigo-100 text-indigo-600' :
                      user.role === 'tu' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                    }`}>
                      {user.role === 'kepsek' ? 'Kepala Sekolah' : user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-emerald-500 font-bold text-[10px] uppercase">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      Aktif
                    </div>
                  </td>
                  <td className="px-8 py-4 text-center">
                    <button className="p-2 text-slate-400 hover:text-slate-600">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="space-y-6">
      <div className="premium-card p-6 bg-white overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Database Siswa</h3>
            <p className="text-sm text-slate-500 mt-1">Kelola data seluruh siswa beserta akumulasi poin mereka.</p>
          </div>
          <div className="w-full md:w-auto flex flex-wrap gap-3">
             <button 
               onClick={() => handleOpenModal('addStudent')}
               className="px-6 py-2.5 bg-primary-600 text-white font-bold rounded-xl shadow-lg shadow-primary-200 hover:bg-primary-700 transition-all text-xs flex items-center gap-2"
             >
                <Plus className="w-4 h-4" /> Tambah Siswa
             </button>
             <div className="relative flex-grow md:flex-grow-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Cari Nama/NISN..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-48 pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                />
             </div>
             <select 
               value={selectedClassFilter}
               onChange={(e) => setSelectedClassFilter(e.target.value)}
               className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 outline-none"
             >
                <option value="">Semua Kelas</option>
                {classes.map(c => <option key={c} value={c}>{c}</option>)}
             </select>
          </div>
        </div>

        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-left min-w-[800px]">
            <thead className="bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              <tr>
                <th className="px-8 py-4">Nama Siswa</th>
                <th className="px-6 py-4">NISN</th>
                <th className="px-6 py-4 text-center">Kelas</th>
                <th className="px-6 py-4 text-center">Poin</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-8 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                          {student.name.charAt(0)}
                        </div>
                        <span className="font-bold text-slate-800">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-mono text-xs tracking-tighter">{student.nisn}</td>
                    <td className="px-6 py-4 text-center font-medium text-slate-600">{student.class}</td>
                    <td className="px-6 py-4 text-center">
                       <span className={`font-bold ${student.points > 200 ? 'text-red-600' : student.points > 100 ? 'text-amber-600' : 'text-primary-600'}`}>
                         {student.points} pts
                       </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded-lg text-[9px] font-bold uppercase ${
                        student.points > 200 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                      }`}>
                        {student.points > 200 ? 'Critical' : 'Safe'}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => handleOpenModal('editStudent', student)}
                          className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleOpenModal('deleteStudent', student)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-8 py-12 text-center text-slate-400 italic">Data siswa tidak ditemukan...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderClasses = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Manajemen Kelas</h3>
          <p className="text-sm text-slate-500 mt-1">Daftar kelas aktif dan ringkasan populasi siswa.</p>
        </div>
        <button 
          onClick={() => handleOpenModal('addClass')}
          className="px-6 py-3 bg-primary-600 text-white font-bold rounded-xl shadow-lg shadow-primary-200 hover:bg-primary-700 transition-all text-sm"
        >
          Tambah Kelas Baru
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls, idx) => {
          const studentCount = students.filter(s => s.class === cls).length;
          const classStudents = students.filter(s => s.class === cls);
          const avgPoints = studentCount > 0 
            ? Math.round(classStudents.reduce((a, b) => a + b.points, 0) / studentCount)
            : 0;
          
          return (
            <motion.div 
              key={cls}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="premium-card p-6 border-l-4 border-l-primary-500 group relative"
            >
              <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button 
                   onClick={(e) => { e.stopPropagation(); handleOpenModal('editClass', cls); }}
                   className="p-2 bg-white text-slate-400 hover:text-primary-600 rounded-lg shadow-sm border border-slate-100"
                 >
                   <Edit2 className="w-4 h-4" />
                 </button>
                 <button 
                   onClick={(e) => { e.stopPropagation(); handleOpenModal('deleteClass', cls); }}
                   className="p-2 bg-white text-slate-400 hover:text-red-600 rounded-lg shadow-sm border border-slate-100"
                 >
                   <Trash2 className="w-4 h-4" />
                 </button>
              </div>

              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 font-bold text-xl shadow-sm">
                  {cls.split('-')[0]}
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Populasi</span>
                  <span className="text-lg font-bold text-slate-800">{studentCount} Siswa</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Nama Kelas</span>
                  <span className="font-bold text-slate-800 italic">{cls}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                   <span className="text-slate-500 font-medium">Rata-rata Poin</span>
                   <span className={`font-bold ${avgPoints > 50 ? 'text-amber-600' : 'text-emerald-600'}`}>{avgPoints} pts</span>
                </div>
                <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                   <button 
                     onClick={() => handleOpenModal('classDetail', { name: cls, students: classStudents })}
                     className="text-[10px] font-bold text-primary-600 hover:underline flex items-center gap-1 group"
                   >
                      Detail Kelas <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                   </button>
                   <span className="text-[10px] text-slate-300 font-bold">SMK NEGERI 1</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const renderViolations = () => (
    <div className="space-y-6">
      <div className="premium-card p-6 bg-white overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Daftar Jenis Pelanggaran</h3>
            <p className="text-sm text-slate-500 mt-1">Konfigurasi bobot poin untuk setiap kategori tindakan.</p>
          </div>
          <button className="w-full md:w-auto px-6 py-3 bg-primary-600 text-white font-bold rounded-xl shadow-lg shadow-primary-200 hover:bg-primary-700 transition-all text-sm">
            Tambah Kategori
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockViolationTypes.map((v) => (
            <div key={v.id} className="p-5 border border-slate-100 rounded-2xl flex items-center justify-between hover:border-primary-100 transition-all bg-slate-50/30">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                  v.category === 'berat' ? 'bg-red-50 text-red-600' :
                  v.category === 'sedang' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                }`}>
                  {v.points}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{v.name}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Kategori: {v.category}</p>
                </div>
              </div>
              <button className="text-primary-600 font-bold text-xs hover:underline">Edit</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50 pb-24 lg:pb-0 relative">
      <AnimatePresence>
        {modals.open && (
          <Modal title={
            modals.type === 'addStudent' ? 'Tambah Siswa Baru' :
            modals.type === 'editStudent' ? 'Edit Data Siswa' :
            modals.type === 'deleteStudent' ? 'Konfirmasi Hapus' :
            modals.type === 'addClass' ? 'Tambah Kelas Baru' :
            modals.type === 'editClass' ? 'Edit Nama Kelas' :
            modals.type === 'deleteClass' ? 'Konfirmasi Hapus Kelas' :
            'Detail Kelas'
          } variant={modals.type?.includes('delete') ? 'danger' : 'primary'}>
            
            {/* Modal Body Logic */}
            {(modals.type === 'addStudent' || modals.type === 'editStudent') && (
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                saveStudent({
                  name: formData.get('name'),
                  nisn: formData.get('nisn'),
                  class: formData.get('class'),
                  points: formData.get('points'),
                });
              }} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Nama Lengkap</label>
                  <input name="name" defaultValue={modals.data?.name} required className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">NISN</label>
                    <input name="nisn" defaultValue={modals.data?.nisn} required className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Poin</label>
                    <input name="points" type="number" defaultValue={modals.data?.points || 0} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Kelas</label>
                  <select name="class" defaultValue={modals.data?.class || classes[0]} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-primary-500">
                    {classes.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={handleCloseModal} className="flex-grow py-3 bg-slate-100 text-slate-600 font-bold rounded-xl">Batal</button>
                  <button type="submit" className="flex-grow py-3 bg-primary-600 text-white font-bold rounded-xl shadow-lg shadow-primary-200">Simpan Data</button>
                </div>
              </form>
            )}

            {modals.type === 'deleteStudent' && (
              <div className="text-center">
                <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Trash2 className="w-8 h-8" />
                </div>
                <p className="text-slate-600 mb-8">Apakah Anda yakin ingin menghapus data siswa <b>{modals.data.name}</b>? Tindakan ini tidak dapat dibatalkan.</p>
                <div className="flex gap-3">
                  <button onClick={handleCloseModal} className="flex-grow py-3 bg-slate-100 text-slate-600 font-bold rounded-xl">Batal</button>
                  <button onClick={() => deleteStudent(modals.data.id)} className="flex-grow py-3 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-200">Ya, Hapus</button>
                </div>
              </div>
            )}

            {(modals.type === 'addClass' || modals.type === 'editClass') && (
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                saveClass(modals.type === 'editClass' ? modals.data : null, formData.get('className') as string);
              }} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Nama Kelas</label>
                  <input name="className" defaultValue={modals.type === 'editClass' ? modals.data : ''} placeholder="Contoh: XII-RPL-1" required className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={handleCloseModal} className="flex-grow py-3 bg-slate-100 text-slate-600 font-bold rounded-xl">Batal</button>
                  <button type="submit" className="flex-grow py-3 bg-primary-600 text-white font-bold rounded-xl shadow-lg shadow-primary-200">Simpan Kelas</button>
                </div>
              </form>
            )}

            {modals.type === 'deleteClass' && (
              <div className="text-center">
                <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Trash2 className="w-8 h-8" />
                </div>
                <p className="text-slate-600 mb-8">Hapus semua data yang berkaitan dengan kelas <b>{modals.data}</b>? Semua siswa di kelas ini juga akan terpengaruh.</p>
                <div className="flex gap-3">
                  <button onClick={handleCloseModal} className="flex-grow py-3 bg-slate-100 text-slate-600 font-bold rounded-xl">Batal</button>
                  <button onClick={() => deleteClass(modals.data)} className="flex-grow py-3 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-200">Ya, Hapus Kelas</button>
                </div>
              </div>
            )}

            {modals.type === 'classDetail' && (
              <div className="space-y-6">
                 <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">
                    <div>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Informasi Kelas</p>
                       <h4 className="text-xl font-bold text-slate-800">{modals.data.name}</h4>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Siswa</p>
                       <h4 className="text-xl font-bold text-primary-600">{modals.data.students.length}</h4>
                    </div>
                 </div>
                 <div className="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar space-y-3">
                    {modals.data.students.map((s: any) => (
                      <div key={s.id} className="p-3 border border-slate-100 rounded-xl flex justify-between items-center">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-[10px] font-bold text-slate-500">{s.name.charAt(0)}</div>
                            <span className="text-sm font-bold text-slate-700">{s.name}</span>
                         </div>
                         <span className="text-xs font-bold text-primary-600">{s.points} pts</span>
                      </div>
                    ))}
                    {modals.data.students.length === 0 && <p className="text-center py-8 text-slate-400 italic text-sm">Belum ada siswa di kelas ini.</p>}
                 </div>
                 <button onClick={handleCloseModal} className="w-full py-3 bg-primary-600 text-white font-bold rounded-xl">Tutup</button>
              </div>
            )}

          </Modal>
        )}
      </AnimatePresence>

      {/* Mobile Top Header */}
      <header className="fixed top-0 left-0 w-full bg-white border-b border-slate-200 z-50 lg:hidden px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="text-xl font-display font-bold text-slate-800 tracking-tighter">SIPPS<span className="text-primary-600">.</span>Admin</span>
        </div>
        <button onClick={() => navigate('/')} className="p-2 text-slate-400"><LogOut className="w-5 h-5" /></button>
      </header>

      {/* Desktop Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 p-8 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary-200">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <span className="text-2xl font-display font-bold text-slate-800 tracking-tighter uppercase whitespace-wrap">SIPPS<span className="text-primary-600 text-3xl">.</span>ADM</span>
        </div>

        <nav className="space-y-3 flex-grow overflow-y-auto pr-2 custom-scrollbar">
          {[
            { id: 'overview', label: 'Monitor Sistem', icon: <BarChart3 className="w-5 h-5" /> },
            { id: 'users', label: 'Kelola Pengguna', icon: <Users className="w-5 h-5" /> },
            { id: 'students', label: 'Data Siswa', icon: <UserCheck className="w-5 h-5" /> },
            { id: 'classes', label: 'Data Kelas', icon: <Building2 className="w-5 h-5" /> },
            { id: 'violations', label: 'Kategori Poin', icon: <ClipboardList className="w-5 h-5" /> },
            { id: 'settings', label: 'Admin Settings', icon: <Settings className="w-5 h-5" /> },
          ].map((menu) => (
            <button 
              key={menu.id}
              onClick={() => setActiveTab(menu.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl font-bold transition-all ${
                activeTab === menu.id ? 'bg-primary-600 text-white shadow-xl shadow-primary-200' : 'text-slate-400 hover:bg-slate-50'
              }`}
            >
              <div className="shrink-0">{menu.icon}</div>
              <span className="truncate">{menu.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-slate-100 flex items-center gap-4 p-2">
            <div className="w-11 h-11 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 font-bold text-lg">A</div>
            <div className="flex-grow overflow-hidden">
              <p className="text-sm font-bold text-slate-800 truncate">Super Admin</p>
              <button onClick={() => navigate('/')} className="text-[10px] text-red-500 font-bold tracking-widest uppercase flex items-center gap-1 hover:underline">
                <LogOut className="w-3 h-3" /> Logout
              </button>
            </div>
          </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow pt-24 lg:pt-12 px-6 lg:px-12 overflow-x-hidden">
        {/* Header Desktop */}
        <div className="hidden lg:flex justify-between items-end mb-12">
          <div>
            <span className="text-[10px] font-bold text-primary-600 uppercase tracking-[0.2em] bg-primary-50 px-3 py-1 rounded-full">System & Infrastructure Control</span>
            <h1 className="text-4xl font-display font-bold text-slate-900 mt-4 capitalize tracking-tighter">
              {activeTab === 'overview' ? 'Super Admin Dashboard' : activeTab.replace('-', ' ')}
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Selamat datang, Administrator. Sistem beroperasi secara normal.</p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Pencarian sistem..."
                className="pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-primary-600/5 transition-all text-sm w-80 shadow-sm font-medium"
              />
            </div>
            <button className="relative w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-500 hover:text-primary-600 hover:border-primary-100 transition-all shadow-sm">
              <Bell className="w-6 h-6" />
              <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></div>
            </button>
          </div>
        </div>

        {/* Dynamic Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'users' && renderUsers()}
            {activeTab === 'students' && renderStudents()}
            {activeTab === 'classes' && renderClasses()}
            {activeTab === 'violations' && renderViolations()}
            {activeTab === 'settings' && (
              <div className="py-24 text-center space-y-4 premium-card">
                 <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                   <Settings className="w-10 h-10 animate-spin-slow" />
                 </div>
                 <h4 className="font-bold text-slate-800">Fitur "{activeTab}" Segera Hadir</h4>
                 <p className="text-slate-400 text-sm max-w-sm mx-auto">Modul manajemen database tingkat lanjut sedang dalam tahap konfigurasi akhir.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 z-50 lg:hidden px-4 py-2 flex justify-between items-center shadow-2xl">
        {[
          { id: 'overview', label: 'Home', icon: <BarChart3 className="w-5 h-5" /> },
          { id: 'users', label: 'Users', icon: <Users className="w-5 h-5" /> },
          { id: 'violations', label: 'Points', icon: <ClipboardList className="w-5 h-5" /> },
          { id: 'settings', label: 'Admin', icon: <Settings className="w-5 h-5" /> },
        ].map(menu => (
          <button
            key={menu.id}
            onClick={() => setActiveTab(menu.id as any)}
            className={`flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
              activeTab === menu.id ? 'text-primary-600 scale-110 active:scale-95' : 'text-slate-400'
            }`}
          >
            {menu.icon}
            <span className="text-[10px] font-bold uppercase tracking-tighter">{menu.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default AdminDashboard;
