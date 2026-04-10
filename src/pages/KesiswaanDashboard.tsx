import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  ShieldAlert, 
  CheckCircle, 
  Search, 
  Filter, 
  MoreVertical,
  GraduationCap,
  LayoutDashboard,
  Database,
  ClipboardCheck,
  Bell
} from 'lucide-react';
import { mockStudents, mockViolations } from '../mocks/db';

const KesiswaanDashboard = () => {
  const stats = [
    { title: 'Total Siswa', value: '1,240', icon: <Users className="w-5 h-5 text-blue-600" />, trend: '+12%', bg: 'bg-blue-50' },
    { title: 'Pelanggaran Hari Ini', value: '14', icon: <ShieldAlert className="w-5 h-5 text-amber-600" />, trend: '-5%', bg: 'bg-amber-50' },
    { title: 'Menunggu Validasi', value: '8', icon: <ClipboardCheck className="w-5 h-5 text-indigo-600" />, trend: 'Stagnan', bg: 'bg-indigo-50' },
    { title: 'Siswa Status Merah', value: '3', icon: <Bell className="w-5 h-5 text-red-600" />, trend: '+2', bg: 'bg-red-50' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 p-8 hidden lg:flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white">
            <GraduationCap className="w-6 h-6" />
          </div>
          <span className="text-2xl font-display font-bold text-slate-800">SIPPS<span className="text-primary-600">.</span></span>
        </div>

        <nav className="space-y-2 flex-grow">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-primary-50 text-primary-600 rounded-xl font-bold transition-all">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl font-semibold transition-all">
            <Database className="w-5 h-5" /> Data Master
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl font-semibold transition-all">
            <ClipboardCheck className="w-5 h-5" /> Validasi Pelanggaran
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl font-semibold transition-all">
            <BarChart3 className="w-5 h-5" /> Laporan Berkala
          </button>
        </nav>

        <div className="mt-auto pt-8 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-200 rounded-full" />
            <div>
              <p className="text-sm font-bold text-slate-800">Andini Putri</p>
              <p className="text-xs text-slate-500">Kesiswaan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-10 overflow-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-display font-bold text-slate-800">Monitoring Kesiswaan</h1>
            <p className="text-slate-500 mt-1">Pantau statistik kedisiplinan siswa secara real-time.</p>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Cari siswa atau NISN..."
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary-100 transition-all text-sm w-64"
              />
            </div>
            <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
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
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {stat.trend}
                </span>
              </div>
              <p className="text-sm font-medium text-slate-500">{stat.title}</p>
              <h3 className="text-2xl font-display font-bold text-slate-800 mt-1">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        {/* Tables Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Top Violators */}
          <div className="xl:col-span-2 premium-card p-0 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Siswa dengan Poin Tertinggi</h3>
              <button className="text-primary-600 text-sm font-bold hover:underline">Lihat Semua</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Siswa</th>
                    <th className="px-6 py-4">Kelas</th>
                    <th className="px-6 py-4">Poin Terakumulasi</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mockStudents.sort((a,b) => b.points - a.points).slice(0, 5).map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center font-bold text-slate-600 text-xs">
                            {student.name.charAt(0)}
                          </div>
                          <span className="font-bold text-slate-700 text-sm">{student.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{student.class}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-bold text-slate-800">{student.points} / 250</span>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${student.points > 200 ? 'bg-red-500' : student.points > 150 ? 'bg-amber-500' : 'bg-primary-500'}`} 
                              style={{ width: `${(student.points / 250) * 100}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${student.points > 200 ? 'bg-red-100 text-red-600' : student.points > 150 ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
                          {student.points > 200 ? 'Bahaya' : student.points > 150 ? 'Waspada' : 'Aman'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-1 text-slate-400 hover:text-slate-600">
                          <MoreVertical className="w-5 h-5" />
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
            <h3 className="font-bold text-slate-800 mb-6">Aktivitas Terbaru</h3>
            <div className="space-y-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex gap-4">
                  <div className="relative">
                    <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    {item !== 4 && <div className="absolute top-10 left-1/2 -translate-x-1/2 w-px h-8 bg-slate-100" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Laporan Divalidasi</p>
                    <p className="text-xs text-slate-500 mt-1">Pelanggaran Ahmad Fauzi (X-RPL-1) telah disetujui oleh Kesiswaan.</p>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-wider">2 jam yang lalu</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 text-sm font-bold text-slate-500 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">
              Semua Aktivitas
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default KesiswaanDashboard;
