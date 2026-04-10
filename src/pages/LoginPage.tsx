import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, GraduationCap, AlertCircle, Loader2 } from 'lucide-react';
import { mockUsers } from '../mocks/db';

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const roleParam = searchParams.get('role');

  const [username, setUsername] = useState(roleParam || '');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      const user = mockUsers.find(u => u.username === username);
      if (user) {
        // In a real app, we'd store a token
        localStorage.setItem('user', JSON.stringify(user));
        navigate(`/${user.role}`);
      } else {
        setError('Username atau password salah. Coba gunakan: guru, kesiswaan, atau tu');
        setIsLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 relative overflow-hidden">
      {/* Bg Gradient */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary-100/30 blur-[100px] rounded-full" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-2xl shadow-lg shadow-primary-200 mb-4">
            <GraduationCap className="text-white w-8 h-8" />
          </div>
          <h2 className="text-3xl font-display font-bold text-slate-800">Selamat Datang</h2>
          <p className="text-slate-500 mt-2">Silakan masuk ke akun SIPPS Anda</p>
        </div>

        <div className="premium-card p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username (guru/kesiswaan/tu)"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                required
              />
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-3 text-sm"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full btn-primary h-14 rounded-xl flex items-center justify-center gap-2 text-lg font-bold disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  Masuk Sekarang
                  <LogIn className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              Lupa password? <span className="text-primary-600 font-bold cursor-pointer hover:underline">Hubungi Admin IT</span>
            </p>
          </div>
        </div>

        <p className="text-center mt-8 text-slate-400 text-sm">
          &copy; 2024 SIPPS - Sistem Informasi Pelanggaran & Presensi
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
