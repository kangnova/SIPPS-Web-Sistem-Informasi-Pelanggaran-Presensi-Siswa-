import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import GuruDashboard from './pages/GuruDashboard';
import KesiswaanDashboard from './pages/KesiswaanDashboard';
import TUDashboard from './pages/TUDashboard';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
