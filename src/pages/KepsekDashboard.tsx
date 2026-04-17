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
  ChevronRight,
  Bell,
  ArrowRight,
  ShieldCheck,
  TrendingDown,
  PieChart,
  Home,
  GraduationCap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockStudents } from '../mocks/db';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const KepsekDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'reports' | 'analytics'>('overview');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [timeFilter, setTimeFilter] = useState('bulanan');
  const [searchQuery, setSearchQuery] = useState('');
  
  const currentUser = { name: "Dr. H. Mulyadi, M.Pd", role: "Kepala Sekolah" };

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

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="premium-card p-4 lg:p-6 group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.color} p-2.5 rounded-xl group-hover:scale-110 transition-transform`}>
                <stat.icon className="text-white w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <div className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-lg text-[10px] font-bold">
                Aktif
              </div>
            </div>
            <h3 className="text-slate-500 font-medium text-xs lg:text-sm">{stat.label}</h3>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl lg:text-3xl font-bold text-slate-900">{stat.value}</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-500" />
              {stat.trend}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="premium-card p-6 lg:p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold font-display text-slate-800 tracking-tight">Performa Kedisiplinan</h3>
                <p className="text-xs text-slate-500 mt-1">Estimasi distribusi pelanggaran per hari minggu ini.</p>
              </div>
              <Filter className="w-5 h-5 text-slate-400 cursor-pointer" />
            </div>
            
            <div className="h-64 flex items-end justify-between gap-2 lg:gap-4 mt-12">
              {[45, 80, 55, 90, 30, 60, 75].map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-3">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${val}%` }}
                    transition={{ delay: 0.5 + (idx * 0.1), duration: 1 }}
                    className={`w-full max-w-[40px] rounded-t-xl transition-all ${
                      idx === 3 ? 'bg-indigo-600 shadow-lg shadow-indigo-100' : 'bg-indigo-200/50 hover:bg-indigo-300'
                    }`}
                  />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                    {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'][idx]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Students Preview */}
          <div className="premium-card p-0 overflow-hidden">
            <div className="p-6 lg:p-8 border-b border-slate-50 flex justify-between items-center">
              <h3 className="text-lg font-bold font-display text-slate-800">Pelanggaran Tertinggi</h3>
              <button 
                onClick={() => setActiveTab('reports')}
                className="text-indigo-600 text-xs font-bold hover:underline"
              >
                Lihat Semua
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                  <tr>
                    <th className="px-8 py-4">Siswa</th>
                    <th className="px-6 py-4">Total Poin</th>
                    <th className="px-8 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-slate-600">
                  {mockStudents.sort((a,b) => b.points - a.points).slice(0, 3).map((student) => (
                    <tr key={student.id} className="hover:bg-indigo-50/30 transition-colors group">
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-sm">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-sm">{student.name}</p>
                            <p className="text-[10px] text-slate-500 font-medium">{student.class}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-sm font-bold ${student.points > 100 ? 'text-red-500' : 'text-amber-500'}`}>
                          {student.points} pts
                        </span>
                      </td>
                      <td className="px-8 py-4 text-right">
                        <button className="p-2 hover:bg-indigo-50 rounded-lg transition-colors">
                          <ChevronRight className="w-4 h-4 text-indigo-400 group-hover:text-indigo-600 transition-colors" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column - Secondary Info */}
        <div className="space-y-8">
          <div className="bg-indigo-600 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-100 group">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Validasi Kesiswaan</h3>
              <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
                Ada 12 laporan pelanggaran baru yang telah divalidasi oleh Bagian Kesiswaan hari ini.
              </p>
              <button className="w-full bg-white text-indigo-600 font-bold py-3 rounded-2xl shadow-lg shadow-indigo-900/10 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-sm">
                <FileText className="w-4 h-4" />
                Review Laporan
              </button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
          </div>

          <div className="premium-card p-6 lg:p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-slate-800 font-display">Aktifitas Kedisiplinan</h3>
              <Calendar className="w-4 h-4 text-slate-400" />
            </div>
            <div className="space-y-6">
              <ActivityItem 
                title="Presensi Kelas X-RPL-1" 
                time="10 Menit lalu"
                desc="Dilaporkan oleh Pak Budi (Guru Piket)"
              />
              <ActivityItem 
                title="Siswa Melampaui 150 Poin" 
                time="45 Menit lalu"
                desc="Ahmad Fauzi (XI-TKJ-2) - Segera terbitkan SP"
                critical
              />
              <ActivityItem 
                title="12 Surat SP Diterbitkan" 
                time="2 Jam lalu"
                desc="Telah diproses oleh Bagian Tata Usaha"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="premium-card p-0 overflow-hidden">
        <div className="p-6 lg:p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800 font-display">Laporan Kedisiplinan Siswa</h2>
            <p className="text-sm text-slate-500 mt-1">Daftar akumulasi poin siswa untuk pemantauan strategis.</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Cari Siswa..." 
                className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-indigo-600/5 transition-all w-full md:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              onClick={exportPDF}
              className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-all font-bold text-sm shadow-lg shadow-indigo-100"
            >
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead className="bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              <tr>
                <th className="px-8 py-4">Nama Siswa</th>
                <th className="px-6 py-4">NISN</th>
                <th className="px-6 py-4">Kelas</th>
                <th className="px-6 py-4">Total Poin</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-8 py-4 text-right">Opsi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {mockStudents
                .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs uppercase">
                        {student.name.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-800">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-slate-500 font-mono text-xs tracking-tight">{student.nisn}</td>
                  <td className="px-6 py-5 font-medium text-slate-700">{student.class}</td>
                  <td className="px-6 py-5 font-bold text-indigo-600">{student.points} pts</td>
                  <td className="px-6 py-5">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${
                      student.points > 200 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                    }`}>
                      {student.points > 200 ? 'Kritis' : 'Normal'}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-indigo-600 font-bold text-xs hover:underline">Detail</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-8">
      <div className="premium-card p-8">
         <div className="flex items-center justify-between mb-12">
            <div>
               <h2 className="text-xl font-bold text-slate-800 font-display">Analitik Perilaku Siswa</h2>
               <p className="text-sm text-slate-500 mt-1">Struktur data pelanggaran berdasarkan kategori tahun ini.</p>
            </div>
            <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
               {['Harian', 'Mingguan', 'Bulanan', 'Tahunan'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimeFilter(t.toLowerCase())}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                      timeFilter === t.toLowerCase() 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    {t}
                  </button>
               ))}
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
               <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Kategori Terpopuler</h3>
               {[
                  { label: 'Keterlambatan', value: 45, color: 'bg-indigo-500' },
                  { label: 'Atribut Sekolah', value: 25, color: 'bg-blue-500' },
                  { label: 'Perilaku/Etika', value: 20, color: 'bg-purple-500' },
                  { label: 'Lainnya', value: 10, color: 'bg-slate-300' },
               ].map((item, i) => (
                  <div key={i} className="space-y-2">
                     <div className="flex justify-between text-xs font-bold text-slate-700">
                        <span>{item.label}</span>
                        <span>{item.value}%</span>
                     </div>
                     <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${item.value}%` }}
                           className={`h-full ${item.color}`}
                        />
                     </div>
                  </div>
               ))}
            </div>
            <div className="flex flex-col items-center justify-center border-l border-slate-100 pl-12">
               <div className="w-48 h-48 rounded-full border-[12px] border-indigo-600 flex flex-col items-center justify-center text-indigo-600">
                  <span className="text-4xl font-bold">92%</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Index</span>
               </div>
               <p className="text-sm text-slate-500 text-center mt-6 max-w-[200px]">Index Kedisiplinan Sekolah meningkat <strong>4.2%</strong> bulan ini.</p>
            </div>
         </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50 pb-24 lg:pb-0 font-sans">
      {/* Mobile Top Header */}
      <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 z-50 lg:hidden px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <School className="w-5 h-5" />
          </div>
          <span className="text-xl font-display font-bold text-slate-800 tracking-tighter">SIPPS<span className="text-indigo-600">.</span></span>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center border border-slate-100 shadow-sm overflow-hidden"
          >
            <div className="w-full h-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">M</div>
          </button>
          
          <AnimatePresence>
            {showUserMenu && (
              <>
                <div className="fixed inset-0 z-40 bg-black/5" onClick={() => setShowUserMenu(false)} />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="absolute right-0 mt-3 w-56 bg-white rounded-[1.5rem] shadow-2xl border border-slate-100 z-50 overflow-hidden"
                >
                  <div className="p-5 bg-slate-50/50 border-b border-slate-100">
                    <p className="text-sm font-bold text-slate-800 leading-tight">Dr. H. Mulyadi, M.Pd</p>
                    <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mt-1">Kepala Sekolah</p>
                  </div>
                  <div className="p-2">
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
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
      <aside className="w-72 bg-white border-r border-slate-100 p-8 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-200">
            <GraduationCap className="w-7 h-7" />
          </div>
          <span className="text-2xl font-display font-bold text-slate-800 tracking-tighter uppercase">SIPPS<span className="text-indigo-600 text-3xl">.</span></span>
        </div>

        <nav className="space-y-3 flex-grow">
          {[
            { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-5 h-5" /> },
            { id: 'reports', label: 'Laporan Detail', icon: <FileText className="w-5 h-5" /> },
            { id: 'analytics', label: 'Analitik Data', icon: <BarChart3 className="w-5 h-5" /> },
          ].map((menu) => (
            <button 
              key={menu.id}
              onClick={() => setActiveTab(menu.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl font-bold transition-all duration-300 ${
                activeTab === menu.id 
                ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' 
                : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
              }`}
            >
              <div className={activeTab === menu.id ? 'text-white' : 'text-slate-400'}>
                {menu.icon}
              </div>
              {menu.label}
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
                className="absolute bottom-full left-0 mb-4 w-full bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-slate-50">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Akun Eksekutif</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Keluar
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div 
            className={`flex items-center gap-4 group cursor-pointer p-3 rounded-2xl transition-all ${showUserMenu ? 'bg-slate-50' : 'hover:bg-slate-50'}`} 
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="w-11 h-11 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 font-bold text-lg">M</div>
            <div className="flex-grow overflow-hidden">
              <p className="text-sm font-bold text-slate-800 truncate">Dr. Mulyadi</p>
              <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase truncate">Kepala Sekolah</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow pt-24 lg:pt-12 px-6 lg:px-12 overflow-x-hidden">
        {/* Header Desktop */}
        <div className="hidden lg:flex justify-between items-end mb-12">
          <div>
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em] bg-indigo-50 px-3 py-1 rounded-full">Executive Control Center</span>
            <h1 className="text-4xl font-display font-bold text-slate-900 mt-4 capitalize tracking-tight">
              {activeTab === 'overview' ? 'Dashboard Monitoring' : activeTab.replace('-', ' ')}
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Laporan ringkas kedisiplinan siswa SMK Negeri 1 SIPPS.</p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Pencarian cepat..."
                className="pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-600/5 transition-all text-sm w-72 shadow-sm font-medium"
              />
            </div>
            <button className="relative w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-sm">
              <Bell className="w-6 h-6" />
              <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 border-2 border-white rounded-full shadow-sm"></div>
            </button>
          </div>
        </div>

        {/* Dynamic Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'reports' && renderReports()}
            {activeTab === 'analytics' && renderAnalytics()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t border-slate-100 z-50 lg:hidden px-4 py-2 flex justify-between items-center shadow-2xl shadow-indigo-900/10">
        {[
          { id: 'overview', label: 'Monitor', icon: <PieChart className="w-5 h-5" /> },
          { id: 'reports', label: 'Laporan', icon: <FileText className="w-5 h-5" /> },
          { id: 'analytics', label: 'Analitik', icon: <BarChart3 className="w-5 h-5" /> },
        ].map(menu => (
          <button
            key={menu.id}
            onClick={() => setActiveTab(menu.id as any)}
            className={`flex flex-col items-center gap-1.5 px-3 py-2 rounded-2xl transition-all ${
              activeTab === menu.id ? 'text-indigo-600 scale-105 active:scale-95' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div className={activeTab === menu.id ? 'text-indigo-600' : 'text-slate-400'}>
              {menu.icon}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider">{menu.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

const ActivityItem = ({ title, time, desc, critical }: { title: string, time: string, desc: string, critical?: boolean }) => (
  <div className="relative pl-6 pb-6 border-l-2 border-slate-50 last:border-0 last:pb-0">
    <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white shadow-sm ${critical ? 'bg-red-500' : 'bg-indigo-500'}`} />
    <h4 className="text-sm font-bold text-slate-800">{title}</h4>
    <p className="text-[10px] text-slate-400 font-medium mb-1 uppercase tracking-wider">{time}</p>
    <p className="text-xs text-slate-500">{desc}</p>
  </div>
);

export default KepsekDashboard;
