import { motion } from 'framer-motion';
import { 
  FileText, 
  AlertCircle, 
  Printer, 
  Download, 
  Search, 
  ShieldAlert, 
  GraduationCap,
  LayoutDashboard,
  Bell,
  Mail,
  MoreVertical,
  ChevronRight
} from 'lucide-react';
import { mockStudents } from '../mocks/db';

const TUDashboard = () => {
  const thresholdStudents = mockStudents.filter(s => s.points >= 180); // 187.5 is 75% of 250

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar (Minimal) */}
      <aside className="w-20 lg:w-72 bg-white border-r border-slate-200 p-6 lg:p-8 flex flex-col">
        <div className="flex items-center gap-3 mb-10 overflow-hidden">
          <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <span className="text-2xl font-display font-bold text-slate-800 hidden lg:inline">SIPPS<span className="text-primary-600">.</span></span>
        </div>

        <nav className="space-y-2 flex-grow">
          <button className="w-full flex items-center justify-center lg:justify-start gap-3 px-4 py-3 bg-primary-50 text-primary-600 rounded-xl font-bold transition-all">
            <LayoutDashboard className="w-5 h-5" /> <span className="hidden lg:inline">Overview</span>
          </button>
          <button className="w-full flex items-center justify-center lg:justify-start gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl font-semibold transition-all">
            <FileText className="w-5 h-5" /> <span className="hidden lg:inline">Administrasi SP</span>
          </button>
          <button className="w-full flex items-center justify-center lg:justify-start gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl font-semibold transition-all">
            <Mail className="w-5 h-5" /> <span className="hidden lg:inline">Notifikasi Ortu</span>
          </button>
        </nav>

        <div className="mt-auto pt-8 border-t border-slate-100 flex justify-center lg:justify-start">
           <div className="w-10 h-10 bg-slate-200 rounded-full" />
           <div className="ml-3 hidden lg:block">
              <p className="text-sm font-bold text-slate-800">Bpk. Darmanto</p>
              <p className="text-xs text-slate-500">Tata Usaha</p>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 lg:p-10">
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-display font-bold text-slate-800">Administrasi & TU</h1>
            <p className="text-slate-500 mt-1">Kelola pembuatan surat peringatan dan pemantauan poin kritis.</p>
          </div>
          <div className="bg-red-50 border border-red-100 p-3 rounded-xl flex items-center gap-3">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-red-700">
              Ada {thresholdStudents.length} siswa perlu tindakan (SP)
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8">
          {/* Critical Alerts Students */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-display font-bold text-slate-800">Daftar Poin Kritis (≥ 75%)</h2>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Cari..."
                    className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg outline-none w-48 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {thresholdStudents.map((student, idx) => (
                <motion.div 
                  key={student.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="premium-card p-6 border-l-4 border-l-red-500"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-slate-800">{student.name}</h3>
                      <p className="text-xs text-slate-500">{student.class} • {student.nisn}</p>
                    </div>
                    <div className="bg-red-50 text-red-600 text-xs font-bold px-2 py-1 rounded">
                      {Math.round((student.points / 250) * 100)}% Cap
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-slate-400 uppercase tracking-wider">Akumulasi Poin</span>
                      <span className="text-red-600">{student.points} / 250</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full" 
                        style={{ width: `${(student.points / 250) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-xl text-sm font-bold hover:bg-primary-700 transition-all shadow-md shadow-primary-200">
                      <Printer className="w-4 h-4" /> Cetak SP
                    </button>
                    <button className="p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 border border-slate-200">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Table for Regular Monitoring */}
          <section className="premium-card p-0">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="font-bold text-slate-800">Riwayat Penomoran Surat SP</h2>
              <button className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary-600 transition-all">
                Filter <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase">
                  <tr>
                    <th className="px-6 py-4">No. Surat</th>
                    <th className="px-6 py-4">Tgl Terbit</th>
                    <th className="px-6 py-4">Siswa</th>
                    <th className="px-6 py-4">Tipe SP</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[1, 2, 3].map((row) => (
                    <tr key={row} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 text-sm font-mono text-slate-600">421.3/0{row}5/SP/2024</td>
                      <td className="px-6 py-4 text-sm text-slate-500">22 Mar 2024</td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-slate-700">Dedi Kurniawan</span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">SP 2 (Panggilan)</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 text-green-600 text-[10px] font-bold uppercase">
                          <CheckCircle className="w-3 h-3" /> Dikirim
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-1 text-slate-400 hover:text-slate-600">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>

      {/* Background decoration */}
      <div className="fixed top-0 right-0 -z-10 w-64 h-64 bg-primary-100/20 blur-[100px] rounded-full" />
    </div>
  );
};

const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

export default TUDashboard;
