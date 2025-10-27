import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api, Campaign } from '../lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Briefcase, TrendingUp, Users } from 'lucide-react';

export default function BrandDashboard() {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await api.getBrandDashboard();
      setDashboardData(data);
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold" style={{ color: '#6C63FF' }}>CreatorTrust</h1>
            <Button onClick={logout} variant="outline">Logout</Button>
          </div>
        </nav>
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Welcome to CreatorTrust!</h2>
          <p className="text-gray-600 mb-8">Please complete your profile to get started</p>
          <Button onClick={() => navigate('/profile')} style={{ backgroundColor: '#6C63FF' }}>
            Complete Profile
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold" style={{ color: '#6C63FF' }}>CreatorTrust</h1>
            <div className="flex gap-4">
              <Button onClick={() => navigate('/profile')} variant="outline">Profile</Button>
              <Button onClick={() => navigate('/creators/search')} variant="outline">Find Creators</Button>
              <Button onClick={() => navigate('/campaigns/create')} style={{ backgroundColor: '#6C63FF' }}>
                Create Campaign
              </Button>
              <Button onClick={logout} variant="outline">Logout</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {dashboardData?.profile?.company_name}!</h2>
          <p className="text-gray-600">Here's your brand dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦{dashboardData?.total_spent?.toLocaleString() || 0}</div>
              <p className="text-xs text-muted-foreground">
                ₦{dashboardData?.pending_amount?.toLocaleString() || 0} in escrow
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData?.total_campaigns || 0}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData?.active_campaigns || 0}</div>
              <p className="text-xs text-muted-foreground">In progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Creators Worked With</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(dashboardData?.campaigns?.filter((c: Campaign) => c.creator_id).map((c: Campaign) => c.creator_id)).size || 0}
              </div>
              <p className="text-xs text-muted-foreground">Unique creators</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>My Campaigns</CardTitle>
            <CardDescription>Your active and completed campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            {dashboardData?.campaigns?.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No campaigns yet</p>
                <Button onClick={() => navigate('/campaigns/create')} style={{ backgroundColor: '#6C63FF' }}>
                  Create Your First Campaign
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {dashboardData?.campaigns?.map((campaign: Campaign) => (
                  <div
                    key={campaign.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => navigate(`/campaigns/${campaign.id}`)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{campaign.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        campaign.status === 'completed' ? 'bg-green-100 text-green-800' :
                        campaign.status === 'open' ? 'bg-blue-100 text-blue-800' :
                        campaign.status === 'submitted' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{campaign.description}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Budget: ₦{campaign.budget.toLocaleString()}</span>
                      <span className="text-gray-500">Platforms: {campaign.platforms.join(', ')}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
