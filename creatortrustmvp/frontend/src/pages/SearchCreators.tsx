import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api, CreatorProfile } from '../lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Star, Instagram, Youtube } from 'lucide-react';

export default function SearchCreators() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [creators, setCreators] = useState<CreatorProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    niche: '',
    location: '',
    min_followers: '',
  });

  useEffect(() => {
    loadCreators();
  }, []);

  const loadCreators = async () => {
    setLoading(true);
    try {
      const data = await api.searchCreators({});
      setCreators(data);
    } catch (error) {
      console.error('Failed to load creators:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (searchParams.niche) params.niche = searchParams.niche;
      if (searchParams.location) params.location = searchParams.location;
      if (searchParams.min_followers) params.min_followers = parseInt(searchParams.min_followers);
      const data = await api.searchCreators(params);
      setCreators(data);
    } catch (error) {
      console.error('Failed to search creators:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTotalFollowers = (creator: CreatorProfile) => {
    return creator.followers_instagram + creator.followers_youtube + creator.followers_tiktok;
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
          <h2 className="text-3xl font-bold mb-4">Find Creators</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Input
                  placeholder="Niche (e.g., Fashion)"
                  value={searchParams.niche}
                  onChange={(e) => setSearchParams({ ...searchParams, niche: e.target.value })}
                />
                <Input
                  placeholder="Location (e.g., Lagos)"
                  value={searchParams.location}
                  onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
                />
                <Input
                  type="number"
                  placeholder="Min Followers"
                  value={searchParams.min_followers}
                  onChange={(e) => setSearchParams({ ...searchParams, min_followers: e.target.value })}
                />
                <div className="flex gap-2">
                  <Button onClick={handleSearch} style={{ backgroundColor: '#6C63FF' }} className="flex-1">
                    Search
                  </Button>
                  <Button onClick={loadCreators} variant="outline">
                    Clear
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading creators...</div>
        ) : creators.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-gray-500">No creators found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creators.map((creator) => (
              <Card key={creator.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{creator.name}</CardTitle>
                      <CardDescription>{creator.niche}</CardDescription>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{creator.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm line-clamp-3">{creator.bio}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Location:</span>
                      <span className="font-medium">{creator.location}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Total Followers:</span>
                      <span className="font-medium">{getTotalFollowers(creator).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Engagement Rate:</span>
                      <span className="font-medium">{creator.engagement_rate.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Campaigns:</span>
                      <span className="font-medium">{creator.total_campaigns}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Social Media:</p>
                    <div className="flex flex-wrap gap-2">
                      {creator.instagram_handle && (
                        <div className="flex items-center gap-1 text-xs bg-pink-50 text-pink-700 px-2 py-1 rounded">
                          <Instagram className="h-3 w-3" />
                          <span>{creator.followers_instagram.toLocaleString()}</span>
                        </div>
                      )}
                      {creator.youtube_handle && (
                        <div className="flex items-center gap-1 text-xs bg-red-50 text-red-700 px-2 py-1 rounded">
                          <Youtube className="h-3 w-3" />
                          <span>{creator.followers_youtube.toLocaleString()}</span>
                        </div>
                      )}
                      {creator.tiktok_handle && (
                        <div className="flex items-center gap-1 text-xs bg-gray-50 text-gray-700 px-2 py-1 rounded">
                          <span>TikTok</span>
                          <span>{creator.followers_tiktok.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      creator.subscription_tier === 'premium' ? 'bg-purple-100 text-purple-800' :
                      creator.subscription_tier === 'pro' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {creator.subscription_tier.toUpperCase()}
                    </span>
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
