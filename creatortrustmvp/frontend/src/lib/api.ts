const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface User {
  id: string;
  email: string;
  user_type: 'creator' | 'brand';
  created_at: string;
  updated_at: string;
}

export interface CreatorProfile {
  id: string;
  user_id: string;
  name: string;
  bio: string;
  niche: string;
  location: string;
  instagram_handle?: string;
  youtube_handle?: string;
  tiktok_handle?: string;
  followers_instagram: number;
  followers_youtube: number;
  followers_tiktok: number;
  engagement_rate: number;
  subscription_tier: string;
  rating: number;
  total_campaigns: number;
  created_at: string;
  updated_at: string;
}

export interface BrandProfile {
  id: string;
  user_id: string;
  company_name: string;
  industry: string;
  website?: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Campaign {
  id: string;
  brand_id: string;
  creator_id?: string;
  title: string;
  description: string;
  budget: number;
  platforms: string[];
  duration_days: number;
  status: string;
  niche: string;
  min_followers: number;
  content_requirements: string;
  created_at: string;
  updated_at: string;
  deadline: string;
}

export interface Payment {
  id: string;
  campaign_id: string;
  amount: number;
  status: string;
  payment_reference: string;
  created_at: string;
  released_at?: string;
}

export interface Review {
  id: string;
  campaign_id: string;
  creator_id: string;
  brand_id: string;
  rating: number;
  comment: string;
  created_at: string;
}

class ApiClient {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('token');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || response.statusText);
    }

    return response.json();
  }

  async register(email: string, password: string, user_type: 'creator' | 'brand') {
    const data = await this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, user_type }),
    });
    this.setToken(data.access_token);
    return data;
  }

  async login(email: string, password: string) {
    const data = await this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.setToken(data.access_token);
    return data;
  }

  async getMe() {
    return this.request('/api/auth/me');
  }

  async createCreatorProfile(profile: Partial<CreatorProfile>) {
    return this.request('/api/creators/profile', {
      method: 'POST',
      body: JSON.stringify(profile),
    });
  }

  async getCreatorProfile(userId: string) {
    return this.request(`/api/creators/profile/${userId}`);
  }

  async searchCreators(params: Record<string, any>) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/api/creators/search?${query}`);
  }

  async getCreatorDashboard() {
    return this.request('/api/creators/dashboard');
  }

  async createBrandProfile(profile: Partial<BrandProfile>) {
    return this.request('/api/brands/profile', {
      method: 'POST',
      body: JSON.stringify(profile),
    });
  }

  async getBrandProfile(userId: string) {
    return this.request(`/api/brands/profile/${userId}`);
  }

  async getBrandDashboard() {
    return this.request('/api/brands/dashboard');
  }

  async createCampaign(campaign: Partial<Campaign>) {
    return this.request('/api/campaigns', {
      method: 'POST',
      body: JSON.stringify(campaign),
    });
  }

  async getCampaigns(params?: Record<string, any>) {
    const query = params ? new URLSearchParams(params).toString() : '';
    return this.request(`/api/campaigns${query ? `?${query}` : ''}`);
  }

  async getCampaign(campaignId: string) {
    return this.request(`/api/campaigns/${campaignId}`);
  }

  async applyCampaign(campaignId: string) {
    return this.request(`/api/campaigns/${campaignId}/apply`, {
      method: 'POST',
    });
  }

  async assignCampaign(campaignId: string, creatorId: string) {
    return this.request(`/api/campaigns/${campaignId}/assign`, {
      method: 'POST',
      body: JSON.stringify({ creator_id: creatorId }),
    });
  }

  async submitCampaign(campaignId: string, contentLinks: string[], notes: string) {
    return this.request(`/api/campaigns/${campaignId}/submit`, {
      method: 'POST',
      body: JSON.stringify({ content_links: contentLinks, notes }),
    });
  }

  async approveCampaign(campaignId: string) {
    return this.request(`/api/campaigns/${campaignId}/approve`, {
      method: 'POST',
    });
  }

  async createEscrowPayment(campaignId: string, amount: number) {
    return this.request('/api/payments/escrow', {
      method: 'POST',
      body: JSON.stringify({ campaign_id: campaignId, amount }),
    });
  }

  async getPaymentHistory() {
    return this.request('/api/payments/history');
  }

  async createReview(campaignId: string, rating: number, comment: string) {
    return this.request('/api/reviews', {
      method: 'POST',
      body: JSON.stringify({ campaign_id: campaignId, rating, comment }),
    });
  }

  async getCreatorReviews(creatorId: string) {
    return this.request(`/api/reviews/creator/${creatorId}`);
  }

  async getCreatorAnalytics() {
    return this.request('/api/analytics/creator');
  }

  async getBrandAnalytics() {
    return this.request('/api/analytics/brand');
  }

  async getCampaignAnalytics(campaignId: string) {
    return this.request(`/api/analytics/campaign/${campaignId}`);
  }
}

export const api = new ApiClient();
