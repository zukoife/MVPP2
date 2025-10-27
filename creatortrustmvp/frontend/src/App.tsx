import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatorDashboard from './pages/CreatorDashboard';
import BrandDashboard from './pages/BrandDashboard';
import CreatorProfile from './pages/CreatorProfile';
import BrandProfile from './pages/BrandProfile';
import Campaigns from './pages/Campaigns';
import CampaignDetail from './pages/CampaignDetail';
import CreateCampaign from './pages/CreateCampaign';
import SearchCreators from './pages/SearchCreators';
import './App.css';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  return user ? <>{children}</> : <Navigate to="/login" />;
}

function AppRoutes() {
  const { user } = useAuth();
  
  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
      
      <Route path="/dashboard" element={
        <PrivateRoute>
          {user?.user_type === 'creator' ? <CreatorDashboard /> : <BrandDashboard />}
        </PrivateRoute>
      } />
      
      <Route path="/profile" element={
        <PrivateRoute>
          {user?.user_type === 'creator' ? <CreatorProfile /> : <BrandProfile />}
        </PrivateRoute>
      } />
      
      <Route path="/campaigns" element={<PrivateRoute><Campaigns /></PrivateRoute>} />
      <Route path="/campaigns/:id" element={<PrivateRoute><CampaignDetail /></PrivateRoute>} />
      <Route path="/campaigns/create" element={<PrivateRoute><CreateCampaign /></PrivateRoute>} />
      <Route path="/creators/search" element={<PrivateRoute><SearchCreators /></PrivateRoute>} />
      
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App
