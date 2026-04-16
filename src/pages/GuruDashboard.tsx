import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  AlertTriangle, 
  ChevronRight, 
  Plus, 
  Search, 
  Camera as CameraIcon, 
  Upload, 
  CheckCircle2, 
  ChevronLeft,
  ChevronDown,
  X,
  Home,
  BarChart3,
  PieChart,
  Calendar,
  ClipboardList,
  UserCheck,
  TrendingUp
} from 'lucide-react';
import { mockStudents, mockViolationTypes, mockViolations } from '../mocks/db';
import CameraCapture from '../components/CameraCapture';

const GuruDashboard = () => {
  const [activeTab, setActiveTab] = useState<'presensi' | 'pelanggaran'>('presensi');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [success, setSuccess] = useState(false);

  // New states for mass attendance
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, 'alpha' | 'izin' | 'sakit'>>({});
  const [openSection, setOpenSection] = useState<'alpha' | 'izin' | 'sakit' | null>(null);

  // Form states
  const [absensiStatus, setAbsensiStatus] = useState<'hadir' | 'izin' | 'sakit' | 'alpha'>('hadir');
  const [selectedViolation, setSelectedViolation] = useState('');
  const [customViolationType, setCustomViolationType] = useState('');

  // View States
  const [currentView, setCurrentView] = useState<'input' | 'reports'>('input');
  const [reportPeriod, setReportPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  // Get unique classes
  const classes = Array.from(new Set(mockStudents.map(s => s.class)));

  const filteredStudents = mockStudents.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.nisn.includes(searchQuery);
    
    if (selectedClass) {
      return s.class === selectedClass && matchesSearch;
    }
    
    return matchesSearch;
  });

  const stats = {
    alpha: Object.values(attendanceRecords).filter(s => s === 'alpha').length,
    izin: Object.values(attendanceRecords).filter(s => s === 'izin').length,
    sakit: Object.values(attendanceRecords).filter(s => s === 'sakit').length,
    hadir: filteredStudents.length - Object.keys(attendanceRecords).length
  };

  const handleBulkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    // In a real app, we would send attendanceRecords to the API here.
    // Students not in attendanceRecords are considered 'hadir'.
    console.log('Saving attendance for class:', selectedClass, attendanceRecords);
    
    setTimeout(() => {
      setSuccess(false);
      setSelectedClass(null);
      setAttendanceRecords({});
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setSelectedStudent(null);
      setCapturedImage(null);
      setSelectedViolation('');
      setCustomViolationType('');
    }, 2000);
  };

  const currentStudent = mockStudents.find(s => s.id === selectedStudent);

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <header className="bg-white px-6 pt-12 pb-6 border-b border-slate-200">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">G</div>
            <div>
              <h1 className="text-xl font-display font-bold text-slate-800">Guru Piket</h1>
              <p className="text-xs text-slate-500 font-medium">SMA Negeri 1 Jaya</p>
            </div>
          </div>
          <button className="p-2 bg-slate-100 rounded-full">
            <Users className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-slate-100 rounded-xl">
          <button 
            onClick={() => setActiveTab('presensi')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm transition-all ${activeTab === 'presensi' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500'}`}
          >
            <Users className="w-4 h-4" />
            Presensi
          </button>
          <button 
            onClick={() => setActiveTab('pelanggaran')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm transition-all ${activeTab === 'pelanggaran' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500'}`}
          >
            <AlertTriangle className="w-4 h-4" />
            Pelanggaran
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <AnimatePresence mode="wait">
          {currentView === 'input' ? (
            <motion.div
              key="input-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AnimatePresence mode="wait">
          {activeTab === 'presensi' ? (
            !selectedClass ? (
              <motion.div 
                key="class-list-presensi"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="premium-card p-6 bg-white">
                  <h2 className="text-lg font-bold text-slate-800 mb-4">Pilih Kelas (Presensi)</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {classes.map(cls => (
                      <button 
                        key={cls}
                        onClick={() => setSelectedClass(cls)}
                        className="p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-primary-300 hover:bg-primary-50 transition-all group"
                      >
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary-600 font-bold shadow-sm group-hover:scale-110 transition-transform">
                          {cls.split('-')[0]}
                        </div>
                        <span className="font-bold text-slate-700">{cls}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="student-bulk-list"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <button 
                    onClick={() => setSelectedClass(null)}
                    className="flex items-center gap-2 text-slate-500 font-bold text-sm"
                  >
                    <ChevronLeft className="w-5 h-5" /> Ganti Kelas
                  </button>
                  <div className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-bold">
                    Kelas {selectedClass}
                  </div>
                </div>

                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Cari siswa..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none shadow-sm"
                  />
                </div>

                <form onSubmit={handleBulkSubmit} className="space-y-4 pb-24">
                  {/* Summary Bar */}
                  <div className="p-4 bg-green-50 border border-green-200 rounded-2xl flex justify-between items-center shadow-sm">
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-bold text-green-700">Estimasi Hadir</span>
                    </div>
                    <span className="text-xl font-bold text-green-600">{stats.hadir} <span className="text-xs">Siswa</span></span>
                  </div>

                  {/* Categories */}
                  {(['sakit', 'izin', 'alpha'] as const).map(status => (
                    <div key={status} className="premium-card bg-white border border-slate-200 overflow-hidden">
                        {/* Header */}
                        <button 
                           type="button"
                           onClick={() => setOpenSection(openSection === status ? null : status)}
                           className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition-colors"
                        >
                           <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${
                                status === 'sakit' ? 'bg-blue-50 text-blue-600' :
                                status === 'izin' ? 'bg-amber-50 text-amber-600' :
                                'bg-red-50 text-red-600'
                              }`}>
                                {status === 'sakit' ? 'S' : status === 'izin' ? 'I' : 'A'}
                              </div>
                              <div className="text-left">
                                <h3 className="font-bold text-slate-800 capitalize">{status}</h3>
                                <p className="text-xs text-slate-400 font-medium">{stats[status]} Terpilih</p>
                              </div>
                           </div>
                           <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openSection === status ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Selected Names Summary */}
                        {Object.keys(attendanceRecords).filter(id => attendanceRecords[id] === status).length > 0 && (
                          <div className="px-5 pb-4 flex flex-wrap gap-2">
                            {Object.keys(attendanceRecords)
                              .filter(id => attendanceRecords[id] === status)
                              .map(id => {
                                const s = mockStudents.find(student => student.id === id);
                                return (
                                  <span key={id} className={`px-3 py-1 rounded-full text-[10px] font-bold border flex items-center gap-2 ${
                                    status === 'sakit' ? 'bg-blue-50 border-blue-200 text-blue-700' :
                                    status === 'izin' ? 'bg-amber-50 border-amber-200 text-amber-700' :
                                    'bg-red-50 border-red-200 text-red-700'
                                  }`}>
                                    {s?.name}
                                    <button 
                                       type="button"
                                       onClick={(e) => {
                                         e.stopPropagation();
                                         setAttendanceRecords(prev => {
                                           const next = {...prev};
                                           delete next[id];
                                           return next;
                                         });
                                       }}
                                       className="hover:text-slate-900"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </span>
                                )
                              })}
                          </div>
                        )}

                        {/* Accordion Content (Selection List) */}
                        <AnimatePresence>
                          {openSection === status && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="border-t border-slate-100 bg-slate-50/50 overflow-hidden"
                            >
                              <div className="p-4 space-y-2 max-h-[300px] overflow-y-auto">
                                {filteredStudents.map(student => {
                                  const currentStatus = attendanceRecords[student.id];
                                  const isDisabled = currentStatus && currentStatus !== status;
                                  return (
                                    <button
                                      key={student.id}
                                      type="button"
                                      disabled={isDisabled}
                                      onClick={() => {
                                        setAttendanceRecords(prev => {
                                          const next = { ...prev };
                                          if (next[student.id] === status) {
                                            delete next[student.id];
                                          } else {
                                            next[student.id] = status;
                                          }
                                          return next;
                                        });
                                      }}
                                      className={`w-full p-3 rounded-xl flex items-center justify-between text-left transition-all border ${
                                        attendanceRecords[student.id] === status
                                          ? status === 'sakit' ? 'bg-blue-600 border-blue-600 text-white shadow-lg' :
                                            status === 'izin' ? 'bg-amber-500 border-amber-500 text-white shadow-lg' :
                                            'bg-red-600 border-red-600 text-white shadow-lg'
                                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                                      } ${isDisabled ? 'opacity-30 grayscale cursor-not-allowed' : ''}`}
                                    >
                                      <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                                          attendanceRecords[student.id] === status ? 'bg-white/20' : 'bg-slate-100 text-slate-400'
                                        }`}>
                                          {student.name.charAt(0)}
                                        </div>
                                        <div>
                                          <p className="text-sm font-bold">{student.name}</p>
                                          <p className={`text-[10px] ${attendanceRecords[student.id] === status ? 'text-white/70' : 'text-slate-400'}`}>
                                            NISN: {student.nisn}
                                          </p>
                                        </div>
                                      </div>
                                      {attendanceRecords[student.id] === status && <CheckCircle2 className="w-5 h-5" />}
                                    </button>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                    </div>
                  ))}

                  <button 
                    type="submit"
                    disabled={success}
                    className="fixed bottom-24 left-6 right-6 btn-primary h-16 rounded-2xl text-lg font-bold flex items-center justify-center gap-3 shadow-xl shadow-primary-200 z-40"
                  >
                    {success ? (
                      <>
                        <CheckCircle2 className="w-6 h-6" /> Berhasil Tersimpan
                      </>
                    ) : (
                      'Simpan Presensi'
                    )}
                  </button>
                </form>
              </motion.div>
            )
          ) : (
            !selectedClass ? (
              <motion.div 
                key="class-list-pelanggaran"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="premium-card p-6 bg-white">
                  <h2 className="text-lg font-bold text-slate-800 mb-4">Pilih Kelas (Pelanggaran)</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {classes.map(cls => (
                      <button 
                        key={cls}
                        onClick={() => setSelectedClass(cls)}
                        className="p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-primary-300 hover:bg-primary-50 transition-all group"
                      >
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary-600 font-bold shadow-sm group-hover:scale-110 transition-transform">
                          {cls.split('-')[0]}
                        </div>
                        <span className="font-bold text-slate-700">{cls}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : !selectedStudent ? (
              <motion.div 
                key="violation-list"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <button 
                    onClick={() => setSelectedClass(null)}
                    className="flex items-center gap-2 text-slate-500 font-bold text-sm"
                  >
                    <ChevronLeft className="w-5 h-5" /> Ganti Kelas
                  </button>
                  <div className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-bold">
                    Kelas {selectedClass}
                  </div>
                </div>

                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Cari nama atau NISN siswa..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none shadow-sm"
                  />
                </div>

                <div className="space-y-3">
                  <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider px-2">Daftar Siswa</h2>
                  {filteredStudents.map(student => (
                    <button 
                      key={student.id}
                      onClick={() => setSelectedStudent(student.id)}
                      className="w-full p-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-between hover:border-primary-300 transition-all text-left shadow-sm group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${student.points > 200 ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-600'}`}>
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800">{student.name}</h3>
                          <p className="text-xs text-slate-500">{student.class} • Poin: {student.points}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary-500 transition-colors" />
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="violation-form"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-6"
              >
                <button 
                  onClick={() => setSelectedStudent(null)}
                  className="flex items-center gap-2 text-slate-500 font-bold text-sm mb-4"
                >
                  <ChevronLeft className="w-5 h-5" /> Kembali ke Daftar
                </button>

                <div className="premium-card p-6 bg-primary-600 text-white border-none overflow-hidden relative">
                  <Users className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10 rotate-12" />
                  <h3 className="text-lg font-bold">Input Pelanggaran</h3>
                  <p className="text-white/80 text-sm mt-1">{currentStudent?.name} ({currentStudent?.class})</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 pb-20">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="block text-sm font-bold text-slate-700">Jenis Pelanggaran</label>
                      <select 
                        value={selectedViolation}
                        onChange={(e) => setSelectedViolation(e.target.value)}
                        className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none"
                        required
                      >
                        <option value="">Pilih Pelanggaran</option>
                        {mockViolationTypes.map(v => (
                          <option key={v.id} value={v.id}>{v.name} ({v.points} Poin)</option>
                        ))}
                        <option value="other">--- Lainnya (Input Manual) ---</option>
                      </select>
                    </div>

                    {selectedViolation === 'other' && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-3"
                      >
                        <label className="block text-sm font-bold text-slate-700">Sebutkan Pelanggaran</label>
                        <textarea 
                          value={customViolationType}
                          onChange={(e) => setCustomViolationType(e.target.value)}
                          placeholder="Tuliskan jenis pelanggaran di sini..."
                          className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none min-h-[100px]"
                          required
                        />
                      </motion.div>
                    )}

                    <div className="space-y-3">
                      <label className="block text-sm font-bold text-slate-700">Bukti Foto (Wajib)</label>
                      {capturedImage ? (
                        <div className="relative rounded-2xl overflow-hidden border-2 border-primary-500 aspect-video">
                          <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
                          <button 
                            type="button"
                            onClick={() => setCapturedImage(null)}
                            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full shadow-lg"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-3">
                          <button 
                            type="button"
                            onClick={() => setShowCamera(true)}
                            className="flex flex-col items-center justify-center gap-3 p-6 bg-white border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:border-primary-300 hover:text-primary-500 transition-all"
                          >
                            <CameraIcon className="w-10 h-10" />
                            <span className="text-xs font-bold uppercase tracking-wider">Kamera</span>
                          </button>
                          <label className="flex flex-col items-center justify-center gap-3 p-6 bg-white border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:border-primary-300 hover:text-primary-500 transition-all cursor-pointer">
                            <Upload className="w-10 h-10" />
                            <span className="text-xs font-bold uppercase tracking-wider">Upload</span>
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => setCapturedImage(reader.result as string);
                                reader.readAsDataURL(file);
                              }
                            }} />
                          </label>
                        </div>
                      )}
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={success}
                    className="w-full btn-primary h-16 rounded-2xl text-lg font-bold flex items-center justify-center gap-3 shadow-xl shadow-primary-200"
                  >
                    {success ? (
                      <>
                        <CheckCircle2 className="w-6 h-6" /> Berhasil Tersimpan
                      </>
                    ) : (
                      'Simpan Laporan'
                    )}
                  </button>
                </form>
                  </motion.div>
                ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="reports-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8 pb-32"
          >
            {/* Report Header & Toggle */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center shadow-sm">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-slate-800">Laporan Statistik</h2>
                  <p className="text-sm text-slate-500 font-medium">Monitoring Presensi & Pelanggaran</p>
                </div>
              </div>

              <div className="flex p-1 bg-slate-100 rounded-xl">
                {(['daily', 'weekly', 'monthly'] as const).map((period) => (
                  <button 
                    key={period}
                    onClick={() => setReportPeriod(period)}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${reportPeriod === period ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500'}`}
                  >
                    {period === 'daily' ? 'Harian' : period === 'weekly' ? 'Mingguan' : 'Bulanan'}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              {(() => {
                let globalTotal = 0;
                let globalAlpha = 0;
                let globalIzinSakit = 0;
                
                classes.forEach(cls => {
                  globalTotal += mockStudents.filter(s => s.class === cls).length;
                  globalAlpha += cls.length % 2 === 0 ? 1 : 0;
                  globalIzinSakit += (cls.length % 3 === 0 ? 1 : 0) + (cls.includes('A') ? 0 : 1);
                });

                const globalPresent = globalTotal - (globalAlpha + globalIzinSakit);
                const attendanceRate = ((globalPresent / globalTotal) * 100).toFixed(1);

                return (
                  <>
                    <div className="premium-card p-5 bg-white border-l-4 border-l-green-500 shadow-lg shadow-green-500/5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
                          <UserCheck className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hadir</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-slate-800">{globalPresent}</span>
                        <span className="text-[10px] text-slate-400 font-bold">Siswa</span>
                      </div>
                      <div className="mt-2 flex items-center gap-1 text-green-600">
                        <TrendingUp className="w-3 h-3" />
                        <span className="text-[10px] font-bold">{attendanceRate}% Kehadiran</span>
                      </div>
                    </div>

                    <div className="premium-card p-5 bg-white border-l-4 border-l-red-500 shadow-lg shadow-red-500/5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-red-50 text-red-600 rounded-lg flex items-center justify-center">
                          <Users className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Alpha</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-slate-800">{globalAlpha}</span>
                        <span className="text-[10px] text-slate-400 font-bold">Siswa</span>
                      </div>
                      <div className="mt-2 text-[10px] text-slate-400 font-medium">
                        Total {reportPeriod === 'daily' ? 'hari ini' : 'periode ini'}
                      </div>
                    </div>

                    <div className="premium-card p-5 bg-white border-l-4 border-l-amber-500 shadow-lg shadow-amber-500/5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">I / S</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-slate-800">{globalIzinSakit}</span>
                        <span className="text-[10px] text-slate-400 font-bold">Izin/Sakit</span>
                      </div>
                    </div>

                    <div className="premium-card p-5 bg-white border-l-4 border-l-primary-600 shadow-lg shadow-primary-600/5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-primary-50 text-primary-600 rounded-lg flex items-center justify-center">
                          <AlertTriangle className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Melanggar</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-slate-800">{mockViolations.length}</span>
                        <span className="text-[10px] text-slate-400 font-bold">Kasus</span>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>

            {/* Class Breakdown Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-primary-500" />
                  Rincian Per Kelas
                </h3>
                <button className="text-xs font-bold text-primary-600 hover:underline">Lihat Semua</button>
              </div>

              <div className="space-y-4">
                {classes.map((cls) => {
                  const studentsInClass = mockStudents.filter(s => s.class === cls);
                  const totalCount = studentsInClass.length;
                  // Simulation logic for a realistic report view
                  const alphaCount = cls.length % 2 === 0 ? 1 : 0;
                  const izinCount = cls.length % 3 === 0 ? 1 : 0;
                  const sakitCount = cls.includes('A') ? 0 : 1;
                  const presentCount = totalCount - (alphaCount + izinCount + sakitCount);

                  return (
                    <div key={cls} className="premium-card bg-white p-5 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center font-bold text-primary-600 shadow-sm border border-slate-100">
                             {cls.split('-')[1] || cls.split('-')[0]}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800">{cls}</h4>
                            <p className="text-[10px] text-slate-400 font-bold">{totalCount} Siswa Terdaftar</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">Hadir</span>
                          <p className="font-bold text-green-600 text-sm">{presentCount}/{totalCount}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                          <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Alpha</span>
                          <span className="text-sm font-bold text-red-600">{alphaCount}</span>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                          <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Izin</span>
                          <span className="text-sm font-bold text-amber-600">{izinCount}</span>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                          <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Sakit</span>
                          <span className="text-sm font-bold text-blue-600">{sakitCount}</span>
                        </div>
                      </div>

                    {/* Detail Pelanggaran Di Kelas Ini */}
                    <div className="mt-2 pt-2 border-t border-slate-50">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Detail Pelanggaran Siswa:</p>
                      <div className="space-y-2">
                        {mockViolations.filter(v => mockStudents.find(s => s.id === v.studentId)?.class === cls).length > 0 ? (
                          mockViolations
                            .filter(v => mockStudents.find(s => s.id === v.studentId)?.class === cls)
                            .map(v => {
                              const s = mockStudents.find(student => student.id === v.studentId);
                              const vt = mockViolationTypes.find(type => type.id === v.violationTypeId);
                              return (
                                <div key={v.id} className="flex items-center justify-between bg-red-50/50 p-2 rounded-lg border border-red-100">
                                  <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 bg-red-100 text-red-600 rounded flex items-center justify-center text-[8px] font-bold">P</div>
                                    <div>
                                      <p className="text-[10px] font-bold text-slate-800">{s?.name}</p>
                                      <p className="text-[8px] text-red-600 font-medium">{vt?.name || 'Lainnya'}</p>
                                    </div>
                                  </div>
                                  <span className="text-[8px] font-bold text-slate-400 bg-white px-1.5 py-0.5 rounded-full border border-slate-100 italic">Valid</span>
                                </div>
                              );
                            })
                        ) : (
                          <p className="text-[10px] text-slate-300 italic text-center py-2">Tidak ada pelanggaran tercatat</p>
                        )}
                      </div>
                    </div>
                  </div>
                )})}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </main>

      {/* Floating Action Menu (Mobile Placeholder) */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 px-10 py-4 flex justify-between items-center z-50 shadow-2xl">
        <button 
          onClick={() => setCurrentView('input')}
          className={`flex flex-col items-center gap-1 transition-all ${currentView === 'input' ? 'text-primary-600 scale-110' : 'text-slate-400'}`}
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase">Beranda</span>
        </button>
        
        <div className="relative">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-14 h-14 bg-primary-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-primary-200 border-4 border-slate-50 hover:scale-110 active:scale-95 transition-all">
            <Plus className="w-8 h-8" />
          </div>
        </div>

        <button 
          onClick={() => setCurrentView('reports')}
          className={`flex flex-col items-center gap-1 transition-all ${currentView === 'reports' ? 'text-primary-600 scale-110' : 'text-slate-400'}`}
        >
          <PieChart className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase">Laporan</span>
        </button>
      </nav>

      {/* Camera Overlay */}
      {showCamera && (
        <CameraCapture 
          onCapture={(img) => setCapturedImage(img)}
          onClose={() => setShowCamera(false)}
        />
      )}
    </div>
  );
};

export default GuruDashboard;
