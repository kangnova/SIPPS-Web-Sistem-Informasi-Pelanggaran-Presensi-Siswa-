import { motion } from 'framer-motion';
import { ShieldCheck, Users, FileText, ArrowRight, GraduationCap, School, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const roles = [
    {
      title: 'Guru Piket',
      description: 'Input absensi & pelanggaran harian siswa secara real-time.',
      icon: <Users className="w-8 h-8 text-primary-600" />,
      link: '/login?role=guru',
      color: 'bg-primary-50'
    },
    {
      title: 'Kesiswaan',
      description: 'Manajemen data master, validasi laporan, dan rekapitulasi poin.',
      icon: <FileText className="w-8 h-8 text-indigo-600" />,
      link: '/login?role=kesiswaan',
      color: 'bg-indigo-50'
    },
    {
      title: 'Tata Usaha',
      description: 'Monitoring ambang batas poin dan generasi surat peringatan.',
      icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
      link: '/login?role=tu',
      color: 'bg-blue-50'
    },
    {
      title: 'Kepala Sekolah',
      description: 'Pantau statistik kedisiplinan sekolah dan tren grafik perilaku siswa.',
      icon: <School className="w-8 h-8 text-indigo-600" />,
      link: '/login?role=kepsek',
      color: 'bg-indigo-50'
    },
    {
      title: 'Administrator',
      description: 'Kelola user, data master siswa/guru, dan konfigurasi sistem.',
      icon: <Database className="w-8 h-8 text-slate-600" />,
      link: '/login?role=admin',
      color: 'bg-slate-50'
    }
  ];


  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-200/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-200/20 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 container mx-auto px-6 py-12 flex flex-col items-center">
        {/* Header/Logo */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-200">
            <GraduationCap className="text-white w-7 h-7" />
          </div>
          <h1 className="text-3xl font-display font-bold text-slate-800 tracking-tight">
            SIPPS<span className="text-primary-600">.</span>
          </h1>
        </motion.div>

        {/* Hero Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-3xl mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-5xl md:text-6xl font-display font-extrabold text-slate-900 mb-6 leading-tight">
            Digitalisasi Kedisiplinan <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Untuk Masa Depan Siswa</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-slate-600 leading-relaxed mb-10 px-4">
            Sistem Informasi Pelanggaran & Presensi Siswa yang cerdas, cepat, dan transparan. 
            Membantu sekolah mewujudkan lingkungan belajar yang lebih tertib.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
            <Link to="/login" className="px-8 py-4 bg-primary-600 text-white rounded-2xl font-bold text-lg hover:bg-primary-700 shadow-xl shadow-primary-200 transition-all flex items-center gap-2 group">
              Mulai Sekarang
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all shadow-sm">
              Pelajari Fitur
            </button>
          </motion.div>
        </motion.div>

        {/* Role Selection Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl"
        >
          {roles.map((role, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="premium-card p-8 group cursor-pointer h-full flex flex-col"
            >
              <div className={`w-16 h-16 ${role.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {role.icon}
              </div>
              <h3 className="text-2xl font-display font-bold text-slate-800 mb-3">{role.title}</h3>
              <p className="text-slate-500 mb-8 flex-grow leading-relaxed">
                {role.description}
              </p>
              <Link to={role.link} className="inline-flex items-center gap-2 text-primary-600 font-bold group-hover:gap-3 transition-all">
                Masuk sebagai {role.title}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer info */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-24 text-slate-400 text-sm font-medium flex items-center gap-2"
        >
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Sistem Online & Terintegrasi
        </motion.div>
      </main>
    </div>
  );
};

export default LandingPage;
