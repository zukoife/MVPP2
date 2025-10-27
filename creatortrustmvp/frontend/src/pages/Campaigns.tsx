import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api, Campaign } from '../lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function Campaigns() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchNiche, setSearchNiche] = useState('');

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      const data = await api.getCampaigns({ status: 'open' });
      setCampaigns(data);
    } catch (error) {
      console.error('Failed to load campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (searchNiche) params.niche = searchNiche;
      const data = await api.getCampaigns(params);
      setCampaigns(data);
    } catch (error) {
      console.error('Failed to search campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold" style={{ color: '#6C63FF' }}>CreatorTrust</h1>
            <div className="flex gap-4">
              <Button onClick={() => navigate('/dashboard')} variant="outline">Dashboard</Button>
              <Button onClick={logout} variant="outline">Logout</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Browse Campaigns</h2>
          <div className="flex gap-4">
            <Input
              placeholder="Search by niche..."
              value={searchNiche}
              onChange={(e) => setSearchNiche(e.target.value)}
              className="max-w-md"
            />
            <Button onClick={handleSearch} style={{ backgroundColor: '#6C63FF' }}>
              Search
            </Button>
            <Button onClick={loadCampaigns} variant="outline">
              Clear
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading campaigns...</div>
        ) : campaigns.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-gray-500">No campaigns found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <Card
                key={campaign.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/campaigns/${campaign.id}`)}
              >
                <CardHeader>
                  <CardTitle className="text-xl">{campaign.title}</CardTitle>
                  <CardDescription>{campaign.niche}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {campaign.description}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Budget:</span>
                      <span className="font-semibold">₦{campaign.budget.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Duration:</span>
                      <span className="font-semibold">{campaign.duration_days} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Min Followers:</span>
                      <span className="font-semibold">{campaign.min_followers.toLocaleString()}</span>
                    </div>
                    <div className="mt-3">
                      <span className="text-gray-500">Platforms: </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {campaign.platforms.map((platform) => (
                          <span
                            key={platform}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                          >
                            {platform}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
