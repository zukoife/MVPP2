import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

export default function CampaignDetail() {
  const { id } = useParams<{ id: string }>();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [contentLinks, setContentLinks] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    loadCampaign();
  }, [id]);

  const loadCampaign = async () => {
    try {
      const data = await api.getCampaign(id!);
      setCampaign(data);
    } catch (error) {
      console.error('Failed to load campaign:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    setSubmitting(true);
    try {
      await api.applyCampaign(id!);
      alert('Application submitted successfully!');
      loadCampaign();
    } catch (error: any) {
      alert(error.message || 'Failed to apply');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitContent = async () => {
    if (!contentLinks.trim()) {
      alert('Please provide content links');
      return;
    }

    setSubmitting(true);
    try {
      const links = contentLinks.split('\n').filter(l => l.trim());
      await api.submitCampaign(id!, links, notes);
      alert('Content submitted successfully!');
      loadCampaign();
      setContentLinks('');
      setNotes('');
    } catch (error: any) {
      alert(error.message || 'Failed to submit content');
    } finally {
      setSubmitting(false);
    }
  };

  const handleApprove = async () => {
    setSubmitting(true);
    try {
      await api.approveCampaign(id!);
      alert('Campaign approved and payment released!');
      loadCampaign();
    } catch (error: any) {
      alert(error.message || 'Failed to approve campaign');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!campaign) {
    return <div className="flex items-center justify-center min-h-screen">Campaign not found</div>;
  }

  const isCreator = user?.user_type === 'creator';
  const isBrand = user?.user_type === 'brand';
  const isAssignedCreator = campaign.campaign.creator_id && campaign.creator?.user_id === user?.id;
  const isCampaignOwner = campaign.brand?.user_id === user?.id;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold" style={{ color: '#6C63FF' }}>CreatorTrust</h1>
            <div className="flex gap-4">
              <Button onClick={() => navigate('/dashboard')} variant="outline">Dashboard</Button>
              <Button onClick={() => navigate('/campaigns')} variant="outline">All Campaigns</Button>
              <Button onClick={logout} variant="outline">Logout</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl mb-2">{campaign.campaign.title}</CardTitle>
                <CardDescription className="text-lg">{campaign.campaign.niche}</CardDescription>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                campaign.campaign.status === 'completed' ? 'bg-green-100 text-green-800' :
                campaign.campaign.status === 'open' ? 'bg-blue-100 text-blue-800' :
                campaign.campaign.status === 'submitted' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {campaign.campaign.status}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{campaign.campaign.description}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Budget</p>
                <p className="text-xl font-bold">₦{campaign.campaign.budget.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="text-xl font-bold">{campaign.campaign.duration_days} days</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Min Followers</p>
                <p className="text-xl font-bold">{campaign.campaign.min_followers.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Platforms</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {campaign.campaign.platforms.map((platform: string) => (
                    <span key={platform} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Content Requirements</h3>
              <p className="text-gray-600">{campaign.campaign.content_requirements}</p>
            </div>

            {campaign.brand && (
              <div>
                <h3 className="font-semibold mb-2">Brand</h3>
                <p className="text-gray-600">{campaign.brand.company_name}</p>
                <p className="text-sm text-gray-500">{campaign.brand.industry}</p>
              </div>
            )}

            {campaign.creator && (
              <div>
                <h3 className="font-semibold mb-2">Assigned Creator</h3>
                <p className="text-gray-600">{campaign.creator.name}</p>
                <p className="text-sm text-gray-500">{campaign.creator.niche} • {campaign.creator.location}</p>
              </div>
            )}

            {isCreator && campaign.campaign.status === 'open' && (
              <Button
                onClick={handleApply}
                disabled={submitting}
                className="w-full"
                style={{ backgroundColor: '#6C63FF' }}
              >
                {submitting ? 'Applying...' : 'Apply for This Campaign'}
              </Button>
            )}

            {isAssignedCreator && campaign.campaign.status === 'assigned' && (
              <Card>
                <CardHeader>
                  <CardTitle>Submit Your Content</CardTitle>
                  <CardDescription>Provide links to your campaign content</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Content Links (one per line)</label>
                    <Textarea
                      value={contentLinks}
                      onChange={(e) => setContentLinks(e.target.value)}
                      placeholder="https://instagram.com/p/..."
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Notes</label>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any additional information..."
                      rows={3}
                    />
                  </div>
                  <Button
                    onClick={handleSubmitContent}
                    disabled={submitting}
                    className="w-full"
                    style={{ backgroundColor: '#6C63FF' }}
                  >
                    {submitting ? 'Submitting...' : 'Submit Content'}
                  </Button>
                </CardContent>
              </Card>
            )}

            {campaign.submission && (
              <Card>
                <CardHeader>
                  <CardTitle>Submitted Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <p className="text-sm font-medium mb-2">Content Links:</p>
                    {campaign.submission.content_links.map((link: string, idx: number) => (
                      <a
                        key={idx}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-600 hover:underline text-sm"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                  {campaign.submission.notes && (
                    <div>
                      <p className="text-sm font-medium mb-1">Notes:</p>
                      <p className="text-gray-600 text-sm">{campaign.submission.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {isCampaignOwner && campaign.campaign.status === 'submitted' && (
              <Button
                onClick={handleApprove}
                disabled={submitting}
                className="w-full"
                style={{ backgroundColor: '#6C63FF' }}
              >
                {submitting ? 'Approving...' : 'Approve & Release Payment'}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
