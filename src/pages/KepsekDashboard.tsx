import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  Calendar, 
  Download, 
  Filter,
  LogOut,
  LayoutDashboard,
  FileText,
  BarChart3,
  School,
  Search,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockStudents, mockUsers } from '../mocks/db';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const KepsekDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [timeFilter, setTimeFilter] = useState('bulanan');
  const currentUser = JSON.parse(localStorage.getItem('user') || '{"name": "Kepala Sekolah"}');

  const stats = [
    { label: 'Total Siswa', value: '1,240', icon: Users, color: 'bg-indigo-500', trend: '+2% dibanding bln lalu' },
    { label: 'Pelanggaran Baru', value: '42', icon: AlertTriangle, color: 'bg-amber-500', trend: '-15% perbaikan' },
    { label: 'Tercatat Hadir', value: '98.2%', icon: CheckCircle, color: 'bg-emerald-500', trend: 'Sangat Baik' },
    { label: 'Indeks Disiplin', value: '8.4', icon: TrendingUp, color: 'bg-purple-500', trend: 'Meningkat' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(18);
    doc.text('Laporan Kedisiplinan Siswa - SIPPS', 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Dicetak pada: ${new Date().toLocaleDateString('id-ID')}`, 14, 30);
    doc.text(`Oleh: ${currentUser.name}`, 14, 38);

    // Table
    const tableData = mockStudents
      .sort((a, b) => b.points - a.points)
      .map(s => [s.name, s.class, s.nisn, s.points.toString()]);

    autoTable(doc, {
      startY: 45,
      head: [['Nama Siswa', 'Kelas', 'NISN', 'Poin Pelanggaran']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [79, 70, 229] }, // Indigo 600
    });

    doc.save(`Laporan_SIPPS_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 p-6 hidden lg:flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <School className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">SIPPS <span className="text-indigo-600">Pro</span></span>
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem icon={LayoutDashboard} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          <NavItem icon={FileText} label="Laporan Detail" active={activeTab === 'reports'} onClick={() => setActiveTab('reports')} />
          <NavItem icon={BarChart3} label="Statistik" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 mt-auto font-medium"
        >
          <LogOut className="w-5 h-5" />
          Keluar Sistem
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8">
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard Kepala Sekolah</h1>
            <p className="text-slate-500 mt-1">Selamat datang kembali, {currentUser.name}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200">
              {['Harian', 'Mingguan', 'Bulanan'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeFilter(t.toLowerCase())}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    timeFilter === t.toLowerCase() 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <button 
              onClick={exportPDF}
              className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-3 rounded-xl hover:bg-slate-50 transition-all font-bold text-slate-700 shadow-sm"
            >
              <Download className="w-5 h-5 text-indigo-600" />
              <span className="hidden sm:inline">Export PDF</span>
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`${stat.color} p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="text-white w-6 h-6" />
                </div>
                <div className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded-lg text-xs font-bold">
                  Aktif
                </div>
              </div>
              <h3 className="text-slate-500 font-medium">{stat.label}</h3>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-bold text-slate-900">{stat.value}</span>
              </div>
              <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-emerald-500" />
                {stat.trend}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold font-display text-slate-800">Distribusi Pelanggaran</h3>
                <Filter className="w-5 h-5 text-slate-400 cursor-pointer" />
              </div>
              
              <div className="h-64 flex items-end justify-between gap-4">
                {[45, 80, 55, 90, 30, 60, 75].map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-3">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${val}%` }}
                      transition={{ delay: 0.5 + (idx * 0.1), duration: 1 }}
                      className={`w-full max-w-[40px] rounded-t-xl transition-all ${
                        idx === 3 ? 'bg-indigo-600 shadow-lg shadow-indigo-100' : 'bg-indigo-100'
                      }`}
                    />
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'][idx]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Table */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                <h3 className="text-xl font-bold font-display text-slate-800">Siswa dengan Poin Tinggi</h3>
                <button className="text-indigo-600 text-sm font-bold hover:underline">Lihat Semua</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 text-slate-400 text-[11px] uppercase tracking-wider">
                      <th className="px-8 py-4 font-bold">Nama Siswa</th>
                      <th className="px-6 py-4 font-bold">Kelas</th>
                      <th className="px-6 py-4 font-bold">Total Poin</th>
                      <th className="px-6 py-4 font-bold">Status</th>
                      <th className="px-8 py-4 font-bold text-right text-transparent">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-slate-600">
                    {mockStudents.sort((a,b) => b.points - a.points).slice(0, 4).map((student) => (
                      <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
                              {student.name.charAt(0)}
                            </div>
                            <span className="font-bold text-slate-800">{student.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-sm">{student.class}</td>
                        <td className="px-6 py-5">
                          <span className={`font-bold ${student.points > 100 ? 'text-red-500' : 'text-amber-500'}`}>
                            {student.points} pts
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            student.points > 200 ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                          }`}>
                            {student.points > 200 ? 'Kritis' : 'Peringatan'}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-indigo-50 rounded-lg">
                            <ChevronRight className="w-5 h-5 text-indigo-600" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column - Activity & Quick Info */}
          <div className="space-y-8">
            <div className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-100 group">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">Pemberitahuan Sistem</h3>
                <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
                  Ada 12 laporan pelanggaran yang memerlukan validasi dari Bagian Kesiswaan hari ini.
                </p>
                <button className="w-full bg-white text-indigo-600 font-bold py-3 rounded-xl shadow-lg shadow-indigo-900/10 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Lihat Validasi
                </button>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center justify-between">
                Aktifitas Terbaru
                <Calendar className="w-5 h-5 text-slate-400" />
              </h3>
              <div className="space-y-6">
                <ActivityItem 
                  title="Presensi Kelas X-RPL-1 Selesai" 
                  time="10 Menit lalu"
                  desc="Guru Piket: Budi Santoso"
                />
                <ActivityItem 
                  title="Input Pelanggaran Baru" 
                  time="45 Menit lalu"
                  desc="Siswa: Bambang Sudarsono (50 Poin)"
                />
                <ActivityItem 
                  title="Siswa Melewati Batas SP1" 
                  time="2 Jam lalu"
                  desc="Siswa: Citra Kirana - Segera tindak lanjuti"
                  critical
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 p-3.5 rounded-2xl transition-all duration-200 font-semibold ${
      active 
      ? 'bg-indigo-50 text-indigo-700' 
      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
    }`}
  >
    <Icon className={`w-5 h-5 ${active ? 'text-indigo-600' : 'text-slate-400'}`} />
    {label}
  </button>
);

const ActivityItem = ({ title, time, desc, critical }: { title: string, time: string, desc: string, critical?: boolean }) => (
  <div className="relative pl-6 pb-6 border-l-2 border-slate-50 last:border-0 last:pb-0">
    <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white shadow-sm ${critical ? 'bg-red-500' : 'bg-indigo-500'}`} />
    <h4 className="text-sm font-bold text-slate-800">{title}</h4>
    <p className="text-[10px] text-slate-400 font-medium mb-1 uppercase tracking-wider">{time}</p>
    <p className="text-xs text-slate-500">{desc}</p>
  </div>
);

export default KepsekDashboard;
