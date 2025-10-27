import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function CreatorProfile() {
  const { profile, refreshUser, logout } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    niche: '',
    location: '',
    instagram_handle: '',
    youtube_handle: '',
    tiktok_handle: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        bio: profile.bio || '',
        niche: profile.niche || '',
        location: profile.location || '',
        instagram_handle: profile.instagram_handle || '',
        youtube_handle: profile.youtube_handle || '',
        tiktok_handle: profile.tiktok_handle || '',
      });
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      await api.createCreatorProfile(formData);
      await refreshUser();
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold" style={{ color: '#6C63FF' }}>CreatorTrust</h1>
          <div className="flex gap-4">
            <Button onClick={() => navigate('/dashboard')} variant="outline">Dashboard</Button>
            <Button onClick={logout} variant="outline">Logout</Button>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Creator Profile</CardTitle>
            <CardDescription>Complete your profile to start receiving campaign opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="bg-green-50 text-green-600 p-3 rounded-md text-sm">
                  Profile saved successfully! Redirecting...
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name *
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="bio" className="text-sm font-medium">
                  Bio *
                </label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell brands about yourself..."
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="niche" className="text-sm font-medium">
                    Niche *
                  </label>
                  <Input
                    id="niche"
                    value={formData.niche}
                    onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                    placeholder="e.g., Fashion, Tech, Lifestyle"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="location" className="text-sm font-medium">
                    Location *
                  </label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Lagos, Nigeria"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Social Media Handles</h3>
                
                <div className="space-y-2">
                  <label htmlFor="instagram" className="text-sm font-medium">
                    Instagram Handle
                  </label>
                  <Input
                    id="instagram"
                    value={formData.instagram_handle}
                    onChange={(e) => setFormData({ ...formData, instagram_handle: e.target.value })}
                    placeholder="@yourusername"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="youtube" className="text-sm font-medium">
                    YouTube Handle
                  </label>
                  <Input
                    id="youtube"
                    value={formData.youtube_handle}
                    onChange={(e) => setFormData({ ...formData, youtube_handle: e.target.value })}
                    placeholder="@yourchannel"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="tiktok" className="text-sm font-medium">
                    TikTok Handle
                  </label>
                  <Input
                    id="tiktok"
                    value={formData.tiktok_handle}
                    onChange={(e) => setFormData({ ...formData, tiktok_handle: e.target.value })}
                    placeholder="@yourusername"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
                style={{ backgroundColor: '#6C63FF' }}
              >
                {loading ? 'Saving...' : 'Save Profile'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
