import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import GuruDashboard from './pages/GuruDashboard';
import KesiswaanDashboard from './pages/KesiswaanDashboard';
import TUDashboard from './pages/TUDashboard';
import KepsekDashboard from './pages/KepsekDashboard';

import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/guru" element={<GuruDashboard />} />
          <Route path="/kesiswaan" element={<KesiswaanDashboard />} />
          <Route path="/tu" element={<TUDashboard />} />
          <Route path="/kepsek" element={<KepsekDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
