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
  X
} from 'lucide-react';
import { mockStudents, mockViolationTypes } from '../mocks/db';
import CameraCapture from '../components/CameraCapture';

const GuruDashboard = () => {
  const [activeTab, setActiveTab] = useState<'presensi' | 'pelanggaran'>('presensi');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [success, setSuccess] = useState(false);

  // Form states
  const [absensiStatus, setAbsensiStatus] = useState<'hadir' | 'izin' | 'sakit' | 'alpha'>('hadir');
  const [selectedViolation, setSelectedViolation] = useState('');

  const filteredStudents = mockStudents.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.nisn.includes(searchQuery)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setSelectedStudent(null);
      setCapturedImage(null);
      setSelectedViolation('');
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
          {!selectedStudent ? (
            <motion.div 
              key="list"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-4"
            >
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
              key="form"
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
                <h3 className="text-lg font-bold">Input {activeTab === 'presensi' ? 'Absensi' : 'Pelanggaran'}</h3>
                <p className="text-white/80 text-sm mt-1">{currentStudent?.name} ({currentStudent?.class})</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 pb-20">
                {activeTab === 'presensi' ? (
                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-slate-700">Status Kehadiran</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['hadir', 'izin', 'sakit', 'alpha'].map(status => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setAbsensiStatus(status as any)}
                          className={`py-4 rounded-2xl font-bold capitalize transition-all border-2 ${absensiStatus === status ? 'bg-primary-50 border-primary-500 text-primary-600 shadow-md' : 'bg-white border-slate-100 text-slate-500'}`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
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
                      </select>
                    </div>

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
                )}

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
          )}
        </AnimatePresence>
      </main>

      {/* Floating Action Menu (Mobile Placeholder) */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 px-8 py-4 flex justify-between items-center z-50">
        <button className="flex flex-col items-center gap-1 text-primary-600">
          <CheckCircle2 className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase">Beranda</span>
        </button>
        <div className="w-14 h-14 bg-primary-600 rounded-full flex items-center justify-center text-white -mt-12 shadow-xl shadow-primary-200 border-4 border-slate-50">
          <Plus className="w-8 h-8" />
        </div>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <AlertTriangle className="w-6 h-6" />
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
