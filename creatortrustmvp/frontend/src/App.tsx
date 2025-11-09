import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import LandingPage from './pages/LandingPage';
import OnboardingFlow from './pages/OnboardingFlow';
import CreatorDashboard from './pages/CreatorDashboard';
import BrandDashboard from './pages/BrandDashboard';
import CreatorProfile from './pages/CreatorProfile';
import BrandProfile from './pages/BrandProfile';
import DiscoverCampaigns from './pages/DiscoverCampaigns';
import DiscoverCreators from './pages/DiscoverCreators';
import CampaignDetail from './pages/CampaignDetail';
import CreateCampaign from './pages/CreateCampaign';
import ApplyToCampaign from './pages/ApplyToCampaign';
import Payments from './pages/Payments';
import Settings from './pages/Settings';
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
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      
      <Route path="/onboarding" element={<PrivateRoute><OnboardingFlow /></PrivateRoute>} />
      
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
      
      <Route path="/campaigns" element={<PrivateRoute><DiscoverCampaigns /></PrivateRoute>} />
      <Route path="/campaigns/:id" element={<PrivateRoute><CampaignDetail /></PrivateRoute>} />
      <Route path="/campaigns/:id/apply" element={<PrivateRoute><ApplyToCampaign /></PrivateRoute>} />
      <Route path="/campaigns/create" element={<PrivateRoute><CreateCampaign /></PrivateRoute>} />
      
      <Route path="/creators" element={<PrivateRoute><DiscoverCreators /></PrivateRoute>} />
      
      <Route path="/payments" element={<PrivateRoute><Payments /></PrivateRoute>} />
      <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
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
