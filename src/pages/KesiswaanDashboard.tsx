import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  ShieldAlert, 
  CheckCircle, 
  Search, 
  Filter, 
  MoreVertical,
  GraduationCap,
  Database,
  ClipboardCheck,
  Bell,
  LogOut,
  Home,
  ChevronRight,
  TrendingUp,
  X
} from 'lucide-react';
import { mockStudents, mockViolations, mockViolationTypes } from '../mocks/db';

const KesiswaanDashboard = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'data-master' | 'validasi' | 'laporan'>('dashboard');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModal, setActiveModal] = useState<'riwayat' | 'tinjau' | 'validasi' | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [selectedViolationId, setSelectedViolationId] = useState<string | null>(null);
  const navigate = useNavigate();

  const renderRiwayatContent = () => {
    const student = mockStudents.find(s => s.id === selectedStudentId);
    const violations = mockViolations.filter(v => v.studentId === selectedStudentId);

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 font-bold text-2xl">
            {student?.name.charAt(0)}
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-800">{student?.name}</h4>
            <div className="flex gap-3 mt-1.5">
              <span className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold uppercase">
                <Users className="w-3 h-3" /> {student?.class}
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 bg-primary-100 text-primary-600 rounded-lg text-[10px] font-bold uppercase">
                <TrendingUp className="w-3 h-3" /> {student?.points} Poin
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-8 before:w-0.5 before:bg-slate-100">
          {violations.map((v) => {
            const vt = mockViolationTypes.find(type => type.id === v.violationTypeId);
            return (
              <div key={v.id} className="relative pl-12">
                <div className="absolute left-0 top-1 w-10 h-10 bg-white border-2 border-slate-100 rounded-2xl flex items-center justify-center z-10 shadow-sm">
                  <ShieldAlert className="w-5 h-5 text-red-500" />
                </div>
                <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-primary-100 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-3 py-1 bg-slate-50 text-slate-500 rounded-full text-[9px] font-bold uppercase tracking-wider">{v.date || 'Desember 2023'}</span>
                    <span className="px-2 py-0.5 bg-red-50 text-red-600 rounded text-[10px] font-bold tracking-tighter">+{vt?.points || 15} Poin</span>
                  </div>
                  <h5 className="font-bold text-slate-800 text-sm">{vt?.name || 'Pelanggaran Kedisiplinan'}</h5>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">Dilaporkan oleh: <span className="font-bold">Guru Piket</span></p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderTinjauContent = () => {
    const violation = mockViolations.find(v => v.id === selectedViolationId);
    const student = mockStudents.find(s => s.id === violation?.studentId);
    const vt = mockViolationTypes.find(type => type.id === violation?.violationTypeId);

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-3">Informasi Siswa</span>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 font-bold">
                  {student?.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{student?.name}</p>
                  <p className="text-xs text-slate-500">{student?.class} • {student?.nisn}</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-3">Detail Laporan</span>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs text-slate-500">Pelanggaran</span>
                  <span className="text-xs font-bold text-slate-800">{vt?.name || 'Bolos Pelajaran'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-500">Bobot Poin</span>
                  <span className="text-xs font-bold text-red-600">+{vt?.points || 25} Poin</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-500">Tanggal</span>
                  <span className="text-xs font-bold text-slate-800">20 Maret 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-500">Pelapor</span>
                  <span className="text-xs font-bold text-slate-800">Guru Budi Santoso</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm flex-grow h-full min-h-[200px] flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-3">Bukti Foto</span>
              <div className="flex-grow bg-slate-100 rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center group relative">
                <div className="absolute inset-0 bg-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <ShieldAlert className="w-12 h-12 text-slate-300 group-hover:scale-110 transition-transform" />
                <span className="absolute bottom-4 text-[10px] font-bold text-slate-400">Preview Gambar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderValidasiContent = () => {
    const violation = mockViolations.find(v => v.id === selectedViolationId);
    const student = mockStudents.find(s => s.id === violation?.studentId);

    return (
      <div className="flex flex-col items-center py-6 text-center">
        <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 mb-6 relative">
          <div className="absolute inset-0 bg-primary-200 rounded-full animate-ping opacity-20" />
          <ClipboardCheck className="w-10 h-10 relative z-10" />
        </div>
        <h4 className="text-xl font-bold text-slate-800 mb-2">Konfirmasi Validasi</h4>
        <p className="text-slate-500 text-sm max-w-sm">
          Apakah Anda yakin ingin memvalidasi laporan pelanggaran untuk <span className="font-bold text-slate-800">{student?.name}</span>? 
          Tindakan ini akan secara otomatis menambah poin pelanggaran siswa tersebut.
        </p>
      </div>
    );
  };

  const renderModals = () => (
    <AnimatePresence>
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-6 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModal(null)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  {activeModal === 'riwayat' && 'Riwayat Pelanggaran'}
                  {activeModal === 'tinjau' && 'Tinjau Detail Laporan'}
                  {activeModal === 'validasi' && 'Validasi Laporan'}
                </h3>
                <p className="text-sm text-slate-400 font-medium">
                  {activeModal === 'riwayat' && 'Memantau track record kedisiplinan siswa.'}
                  {activeModal === 'tinjau' && 'Verifikasi bukti dan kebenaran laporan.'}
                  {activeModal === 'validasi' && 'Pemrosesan skor poin kedalam sistem.'}
                </p>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-grow bg-slate-50/20">
              {activeModal === 'riwayat' && renderRiwayatContent()}
              {activeModal === 'tinjau' && renderTinjauContent()}
              {activeModal === 'validasi' && renderValidasiContent()}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-100 bg-white flex justify-end gap-4">
              <button 
                onClick={() => setActiveModal(null)}
                className="px-6 py-2.5 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition-all text-xs lg:text-sm"
              >
                {activeModal === 'validasi' ? 'Batal' : 'Tutup'}
              </button>
              {activeModal === 'validasi' && (
                <button 
                  onClick={() => {
                    setActiveModal(null);
                  }}
                  className="px-8 py-2.5 bg-primary-600 text-white font-bold rounded-xl shadow-lg shadow-primary-200 hover:bg-primary-700 transition-all text-sm"
                >
                  Setujui & Validasi
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  const stats = [
    { title: 'Total Siswa', value: '1,240', icon: <Users className="w-5 h-5 text-blue-600" />, trend: '+12%', bg: 'bg-blue-50' },
    { title: 'Pelanggaran Hari Ini', value: '14', icon: <ShieldAlert className="w-5 h-5 text-amber-600" />, trend: '-5%', bg: 'bg-amber-50' },
    { title: 'Menunggu Validasi', value: '8', icon: <ClipboardCheck className="w-5 h-5 text-indigo-600" />, trend: 'Stagnan', bg: 'bg-indigo-50' },
    { title: 'Siswa Status Merah', value: '3', icon: <Bell className="w-5 h-5 text-red-600" />, trend: '+2', bg: 'bg-red-50' },
  ];

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="premium-card p-4 lg:p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`w-10 h-10 lg:w-12 lg:h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                {stat.icon}
              </div>
              <span className={`text-[10px] lg:text-xs font-bold px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-xs lg:text-sm font-medium text-slate-500">{stat.title}</p>
            <h3 className="text-lg lg:text-2xl font-display font-bold text-slate-800 mt-1">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Tables & Feed Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Top Violators */}
        <div className="xl:col-span-2 premium-card p-0 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Siswa dengan Poin Terbanyak</h3>
            <button className="text-primary-600 text-sm font-bold hover:underline" onClick={() => setActiveTab('data-master')}>Lihat Semua</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-[10px] lg:text-xs font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 whitespace-nowrap">Siswa</th>
                  <th className="px-6 py-4 whitespace-nowrap">Kelas</th>
                  <th className="px-6 py-4 whitespace-nowrap">Poin</th>
                  <th className="px-6 py-4 whitespace-nowrap">Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockStudents.sort((a,b) => b.points - a.points).slice(0, 5).map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-[10px]">
                          {student.name.charAt(0)}
                        </div>
                        <span className="font-bold text-slate-700 text-xs lg:text-sm whitespace-nowrap">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs lg:text-sm text-slate-600 whitespace-nowrap">{student.class}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 min-w-[100px]">
                        <span className="text-xs lg:text-sm font-bold text-slate-800">{student.points} / 250</span>
                        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${student.points > 200 ? 'bg-red-500' : student.points > 150 ? 'bg-amber-500' : 'bg-primary-500'}`} 
                            style={{ width: `${(student.points / 250) * 100}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-[9px] lg:text-[10px] font-bold uppercase ${student.points > 200 ? 'bg-red-100 text-red-600' : student.points > 150 ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
                        {student.points > 200 ? 'Bahaya' : student.points > 150 ? 'Waspada' : 'Aman'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-1 text-slate-400 hover:text-slate-600">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="premium-card p-6">
          <h3 className="font-bold text-slate-800 mb-6 font-display">Log Aktivitas</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex gap-4">
                <div className="relative">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item % 2 === 0 ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'}`}>
                    {item % 2 === 0 ? <ClipboardCheck className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
                  </div>
                  {item !== 4 && <div className="absolute top-10 left-1/2 -translate-x-1/2 w-px h-8 bg-slate-100" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{item % 2 === 0 ? 'Pelanggaran Divalidasi' : 'Peringatan Sistem'}</p>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {item % 2 === 0 
                      ? 'Laporan dari Guru Budi telah divalidasi dan poin telah ditambahkan.' 
                      : 'Siswa Bambang Sudarsono (X-RPL-1) mendekati ambang batas poin.'}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-2 font-bold tracking-widest uppercase">{item * 2} jam yang lalu</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 text-xs font-bold text-slate-500 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all uppercase tracking-widest">
            Lihat Semua Aktivitas
          </button>
        </div>
      </div>
    </div>
  );

  const renderDataMaster = () => (
    <div className="space-y-6">
      <div className="premium-card p-6 bg-white">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Manajemen Data Siswa</h3>
            <p className="text-sm text-slate-500 mt-1">Daftar seluruh siswa dan akumulasi poin kedisiplinan.</p>
          </div>
          <div className="w-full lg:w-auto flex gap-3">
             <div className="relative flex-grow lg:flex-grow-0">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
               <input 
                 type="text"
                 placeholder="Cari Siswa..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full lg:w-64 pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all"
               />
             </div>
             <button className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 hover:text-primary-600 transition-colors">
               <Filter className="w-5 h-5" />
             </button>
          </div>
        </div>

        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Nama Siswa</th>
                <th className="px-6 py-4 text-center">NISN</th>
                <th className="px-6 py-4 text-center">Kelas</th>
                <th className="px-6 py-4 text-center">Total Poin</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockStudents
                .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map(student => (
                <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 font-bold text-slate-700 text-sm">
                      <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center text-xs">
                        {student.name.charAt(0)}
                      </div>
                      {student.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 text-center">{student.nisn}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 text-center font-medium">{student.class}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800 text-center">{student.points}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                      student.points > 200 ? 'bg-red-100 text-red-600' : 
                      student.points > 100 ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'
                    }`}>
                      {student.points > 200 ? 'Drop Out' : student.points > 100 ? 'Peringatan' : 'Baik'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => {
                        setSelectedStudentId(student.id);
                        setActiveModal('riwayat');
                      }}
                      className="text-primary-600 font-bold text-xs hover:underline"
                    >
                      Riwayat
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

  const renderValidasi = () => (
    <div className="space-y-6">
      <div className="premium-card p-6 bg-white overflow-hidden">
        <div className="mb-8">
          <h3 className="text-xl font-bold text-slate-800">Validasi Laporan Pelanggaran</h3>
          <p className="text-sm text-slate-500 mt-1">Konfirmasi laporan dari Guru Piket untuk diperbarui ke poin siswa.</p>
        </div>

        <div className="space-y-4">
          {mockViolations.filter(v => v.status === 'pending').length > 0 ? (
            mockViolations.filter(v => v.status === 'pending').map(v => {
              const student = mockStudents.find(s => s.id === v.studentId);
              return (
                <motion.div 
                  key={v.id} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-amber-500">
                      <ShieldAlert className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{student?.name} <span className="text-xs text-slate-400 ml-2">({student?.class})</span></h4>
                      <p className="text-sm text-slate-600 mt-1">Jenis: <span className="font-semibold">Bolos Pelajaran</span></p>
                      <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-wider">Dilaporkan oleh: Guru Budi • 20 Mar 2024</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => {
                        setSelectedViolationId(v.id);
                        setActiveModal('tinjau');
                      }}
                      className="flex-1 md:flex-none px-6 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-100 transition-all"
                    >
                      Tinjau
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedViolationId(v.id);
                        setActiveModal('validasi');
                      }}
                      className="flex-1 md:flex-none px-6 py-2 bg-primary-600 text-white rounded-xl text-sm font-bold hover:bg-primary-700 shadow-lg shadow-primary-200 transition-all"
                    >
                      Validasi
                    </button>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="py-20 text-center space-y-4">
               <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                 <ClipboardCheck className="w-10 h-10" />
               </div>
               <p className="text-slate-400 font-medium italic">Tidak ada laporan yang menunggu validasi.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderLaporan = () => (
    <div className="space-y-6">
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="premium-card p-6 bg-white min-h-[300px] flex flex-col items-center justify-center space-y-4">
            <BarChart3 className="w-16 h-16 text-primary-100" />
            <h4 className="font-bold text-slate-800">Tren Pelanggaran Mingguan</h4>
            <p className="text-xs text-slate-400 italic">Integrasi grafik akan segera hadir...</p>
          </div>
          <div className="premium-card p-6 bg-white min-h-[300px] flex flex-col items-center justify-center space-y-4">
            <TrendingUp className="w-16 h-16 text-green-100" />
            <h4 className="font-bold text-slate-800">Tingkat Kedisiplinan Siswa</h4>
            <p className="text-xs text-slate-400 italic">Integrasi grafik akan segera hadir...</p>
          </div>
       </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50 pb-24 lg:pb-0">
      {/* Mobile Top Header */}
      <header className="fixed top-0 left-0 w-full bg-white border-b border-slate-200 z-50 lg:hidden px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="text-xl font-display font-bold text-slate-800">SIPPS<span className="text-primary-600">.</span></span>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200"
          >
            <Users className="w-5 h-5 text-slate-600" />
          </button>
          
          <AnimatePresence>
            {showUserMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 overflow-hidden"
                >
                  <div className="p-4 border-b border-slate-50">
                    <p className="text-sm font-bold text-slate-800">Andini Putri</p>
                    <p className="text-[10px] text-slate-500 font-medium">Bagian Kesiswaan</p>
                  </div>
                  <div className="p-1">
                    <button 
                      onClick={() => navigate('/')}
                      className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Keluar
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 p-8 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary-200">
            <GraduationCap className="w-7 h-7" />
          </div>
          <span className="text-2xl font-display font-bold text-slate-800 uppercase tracking-tighter">SIPPS<span className="text-primary-600 text-3xl">.</span></span>
        </div>

        <nav className="space-y-3 flex-grow">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
            { id: 'data-master', label: 'Data Master', icon: <Database className="w-5 h-5" /> },
            { id: 'validasi', label: 'Validasi', icon: <ClipboardCheck className="w-5 h-5" /> },
            { id: 'laporan', label: 'Laporan', icon: <BarChart3 className="w-5 h-5" /> },
          ].map((menu) => (
            <button 
              key={menu.id}
              onClick={() => setActiveTab(menu.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl font-bold transition-all ${
                activeTab === menu.id ? 'bg-primary-600 text-white shadow-xl shadow-primary-200' : 'text-slate-400 hover:bg-slate-50'
              }`}
            >
              {menu.icon} {menu.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-slate-100 relative">
          <AnimatePresence>
            {showUserMenu && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-full left-0 mb-4 w-full bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50"
              >
                <button 
                  onClick={() => navigate('/')}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Keluar
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div 
            className={`flex items-center gap-4 group cursor-pointer p-2 rounded-2xl transition-all ${showUserMenu ? 'bg-slate-50' : 'hover:bg-slate-50'}`} 
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 font-bold text-lg">A</div>
            <div className="flex-grow">
              <p className="text-sm font-bold text-slate-800">Andini Putri</p>
              <p className="text-xs text-slate-500 font-medium tracking-wide">Staf Kesiswaan</p>
            </div>
            <MoreVertical className={`w-4 h-4 text-slate-400 transition-transform ${showUserMenu ? 'rotate-90' : ''}`} />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow pt-24 lg:pt-12 px-6 lg:px-12 overflow-x-hidden">
        {/* Header Desktop */}
        <div className="hidden lg:flex justify-between items-end mb-12">
          <div>
            <span className="text-[10px] font-bold text-primary-600 uppercase tracking-[0.2em] bg-primary-50 px-3 py-1 rounded-full">Kesiswaan Control Center</span>
            <h1 className="text-4xl font-display font-bold text-slate-800 mt-4 capitalize">
              {activeTab.replace('-', ' ')}
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Selamat datang kembali, Andini. Berikut pantauan hari ini.</p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Pencarian cepat..."
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
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'data-master' && renderDataMaster()}
            {activeTab === 'validasi' && renderValidasi()}
            {activeTab === 'laporan' && renderLaporan()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Modals Container */}
      {renderModals()}

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 z-50 lg:hidden px-4 py-2 flex justify-between items-center shadow-2xl">
        {[
          { id: 'dashboard', label: 'Beranda', icon: <Home className="w-5 h-5" /> },
          { id: 'data-master', label: 'Data', icon: <Database className="w-5 h-5" /> },
          { id: 'validasi', label: 'Validasi', icon: <ClipboardCheck className="w-5 h-5" /> },
          { id: 'laporan', label: 'Laporan', icon: <BarChart3 className="w-5 h-5" /> },
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

export default KesiswaanDashboard;
