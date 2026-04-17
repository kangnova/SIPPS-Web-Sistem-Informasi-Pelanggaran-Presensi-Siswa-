import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  AlertCircle, 
  Printer, 
  Download, 
  Search, 
  ShieldAlert, 
  GraduationCap,
  Bell,
  Mail, 
  MoreVertical, 
  ChevronRight,
  LogOut,
  Home,
  Database,
  Users,
  CheckCircle,
  X,
  History,
  TrendingUp,
  LayoutDashboard
} from 'lucide-react';
import { mockStudents } from '../mocks/db';

const TUDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'administrasi' | 'notifikasi'>('overview');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const thresholdStudents = mockStudents.filter(s => s.points >= 180); 

  const renderOverview = () => (
    <div className="space-y-8">
       {/* Alert Alert */}
       <div className="bg-red-50 border border-red-100 p-4 lg:p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 shadow-sm">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-red-900">Perhatian: {thresholdStudents.length} Siswa Poin Kritis</h3>
              <p className="text-sm text-red-700/80">Segera proses Surat Peringatan (SP) untuk siswa yang telah mencapai ambang batas.</p>
            </div>
          </div>
          <button 
            onClick={() => setActiveTab('administrasi')}
            className="px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-200 text-sm whitespace-nowrap"
          >
            Proses Sekarang
          </button>
       </div>

       {/* Quick Stats */}
       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Total SP Terbit', value: '42', icon: <FileText className="text-blue-600" />, bg: 'bg-blue-50' },
            { title: 'Menunggu Dikirim', value: '5', icon: <Mail className="text-amber-600" />, bg: 'bg-amber-50' },
            { title: 'Siswa SP 3', value: '2', icon: <AlertCircle className="text-red-600" />, bg: 'bg-red-50' },
            { title: 'SP Selesai', value: '128', icon: <CheckCircle className="text-green-600" />, bg: 'bg-green-50' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="premium-card p-4 lg:p-5"
            >
              <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                {stat.icon}
              </div>
              <p className="text-[10px] lg:text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.title}</p>
              <h4 className="text-lg lg:text-2xl font-display font-bold text-slate-800 mt-1">{stat.value}</h4>
            </motion.div>
          ))}
       </div>

       <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Critical List */}
          <section className="xl:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-display font-bold text-slate-800">Pemantauan SP Baru</h2>
              <button onClick={() => setActiveTab('administrasi')} className="text-xs font-bold text-primary-600 hover:underline">Lihat Semua</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {thresholdStudents.slice(0, 4).map((student, idx) => (
                <motion.div 
                  key={student.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="premium-card p-5 lg:p-6 border-l-4 border-l-red-500"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm lg:text-base">{student.name}</h3>
                      <p className="text-[10px] lg:text-xs text-slate-500">{student.class} • {student.nisn}</p>
                    </div>
                    <div className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-1 rounded-lg">
                      {Math.round((student.points / 250) * 100)}% Cap
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between text-[10px] font-bold mb-2">
                      <span className="text-slate-400 uppercase tracking-widest">Akumulasi Poin</span>
                      <span className="text-red-600">{student.points} / 250</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full" 
                        style={{ width: `${(student.points / 250) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-grow flex items-center justify-center gap-2 py-2.5 bg-primary-600 text-white rounded-xl text-xs font-bold hover:bg-primary-700 transition-all shadow-md shadow-primary-200">
                      <Printer className="w-3.5 h-3.5" /> Cetak SP
                    </button>
                    <button className="p-2.5 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 border border-slate-200">
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Activity Feed */}
          <section className="premium-card p-6">
            <h3 className="font-bold text-slate-800 mb-6 font-display">Tugas Terbaru</h3>
            <div className="space-y-6">
              {[
                { label: 'Surat Terkirim', text: 'SP1 Ahmad Fauzi telah dikirim ke Email Ortu.', time: '2 jam lalu', type: 'mail' },
                { label: 'Menunggu Cetak', text: '3 Siswa di kelas XII-RPL-1 belum dicetak SP-nya.', time: '5 jam lalu', type: 'print' },
                { label: 'Pembaruan Sistem', text: 'Reset poin tahunan akan dilakukan dalam 5 hari.', time: '1 hari lalu', type: 'bell' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    item.type === 'mail' ? 'bg-green-50 text-green-600' : 
                    item.type === 'print' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {item.type === 'mail' ? <Mail className="w-5 h-5" /> : 
                     item.type === 'print' ? <Printer className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">{item.label}</p>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.text}</p>
                    <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
       </div>
    </div>
  );

  const renderAdministrasi = () => (
    <div className="space-y-6">
       <div className="premium-card p-0 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div>
                <h2 className="text-xl font-bold text-slate-800">Log Administrasi Surat SP</h2>
                <p className="text-sm text-slate-500 mt-1">Daftar seluruh surat peringatan yang telah diterbitkan sistem.</p>
             </div>
             <div className="flex gap-3">
                <div className="relative">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                   <input type="text" placeholder="Cari Surat/Siswa..." className="pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-600/10 w-full md:w-64" />
                </div>
                <button className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 hover:text-primary-600">
                   <Download className="w-5 h-5" />
                </button>
             </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-left min-w-[700px]">
                <thead className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                   <tr>
                      <th className="px-6 py-4">Nomor Surat</th>
                      <th className="px-6 py-4">Nama Siswa</th>
                      <th className="px-6 py-4">Kategori SP</th>
                      <th className="px-6 py-4">Tanggal Terbit</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Aksi</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                   {[1, 2, 3, 4, 5].map((idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-all">
                         <td className="px-6 py-4 font-mono text-xs text-slate-600 font-bold">421.3/0{idx}5/SP/2024</td>
                         <td className="px-6 py-4 font-bold text-slate-700">Dimas Aditya (X-RPL-1)</td>
                         <td className="px-6 py-4">
                            <span className="px-2 py-1 bg-red-100 text-red-600 rounded-lg text-[10px] font-bold uppercase">SP {idx > 2 ? 3 : 1}</span>
                         </td>
                         <td className="px-6 py-4 text-slate-500">24 Maret 2024</td>
                         <td className="px-6 py-4">
                            <span className="flex items-center gap-2 text-green-600 text-[10px] font-bold uppercase">
                               <CheckCircle className="w-3 h-3" /> Sudah Cetak
                            </span>
                         </td>
                         <td className="px-6 py-4">
                            <button className="text-primary-600 font-bold text-xs hover:underline">Re-Cetak</button>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
       </div>
    </div>
  );

  const renderNotifikasi = () => (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
       <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center text-primary-200">
          <Mail className="w-10 h-10" />
       </div>
       <div>
          <h3 className="text-xl font-bold text-slate-800">Pusat Notifikasi Orang Tua</h3>
          <p className="text-slate-500 max-w-sm mt-2">Fitur integrasi email & WhatsApp untuk pengiriman otomatis notifikasi pelanggaran siswa.</p>
       </div>
       <div className="px-6 py-2 bg-slate-100 text-slate-400 rounded-full text-[10px] font-bold uppercase tracking-widest">Segera Hadir</div>
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
          <span className="text-xl font-display font-bold text-slate-800 tracking-tighter">SIPPS<span className="text-primary-600">.</span></span>
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
                    <p className="text-sm font-bold text-slate-800">Pak Darmanto</p>
                    <p className="text-[10px] text-slate-500 font-medium tracking-wide">Staf Tata Usaha</p>
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
          <span className="text-2xl font-display font-bold text-slate-800 tracking-tighter uppercase">SIPPS<span className="text-primary-600 text-3xl">.</span></span>
        </div>

        <nav className="space-y-3 flex-grow">
          {[
            { id: 'overview', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
            { id: 'administrasi', label: 'Administrasi SP', icon: <FileText className="w-5 h-5" /> },
            { id: 'notifikasi', label: 'Notifikasi Ortu', icon: <Mail className="w-5 h-5" /> },
          ].map((menu) => (
            <button 
              key={menu.id}
              onClick={() => setActiveTab(menu.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl font-bold transition-all ${
                activeTab === menu.id ? 'bg-primary-600 text-white shadow-xl shadow-primary-200' : 'text-slate-400 hover:bg-slate-50 outline-none'
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
            <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 font-bold text-lg">D</div>
            <div className="flex-grow">
              <p className="text-sm font-bold text-slate-800">Pak Darmanto</p>
              <p className="text-xs text-slate-500 font-medium tracking-wide">Kepala Tata Usaha</p>
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
            <span className="text-[10px] font-bold text-primary-600 uppercase tracking-[0.2em] bg-primary-50 px-3 py-1 rounded-full">Administration Control Center</span>
            <h1 className="text-4xl font-display font-bold text-slate-800 mt-4 capitalize">
              {activeTab === 'overview' ? 'TU Dashboard' : activeTab.replace('-', ' ')}
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Selamat datang, Pak Darmanto. Kelola administrasi sekolah hari ini.</p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Cari data administrasi..."
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
            {activeTab === 'administrasi' && renderAdministrasi()}
            {activeTab === 'notifikasi' && renderNotifikasi()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 z-50 lg:hidden px-4 py-2 flex justify-between items-center shadow-2xl">
        {[
          { id: 'overview', label: 'Beranda', icon: <Home className="w-5 h-5" /> },
          { id: 'administrasi', label: 'SP Admin', icon: <FileText className="w-5 h-5" /> },
          { id: 'notifikasi', label: 'Notif', icon: <Mail className="w-5 h-5" /> },
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

export default TUDashboard;
