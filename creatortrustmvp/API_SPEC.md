# CreatorTrust MVP - API Specification

## Data Models

### User
```python
{
    "id": str (UUID),
    "email": str,
    "password_hash": str,
    "user_type": str ("creator" | "brand"),
    "created_at": datetime,
    "updated_at": datetime
}
```

### CreatorProfile
```python
{
    "id": str (UUID),
    "user_id": str (FK to User),
    "name": str,
    "bio": str,
    "niche": str,
    "location": str,
    "instagram_handle": str (optional),
    "youtube_handle": str (optional),
    "tiktok_handle": str (optional),
    "followers_instagram": int,
    "followers_youtube": int,
    "followers_tiktok": int,
    "engagement_rate": float,
    "subscription_tier": str ("free" | "pro" | "premium"),
    "rating": float (0-5),
    "total_campaigns": int,
    "created_at": datetime,
    "updated_at": datetime
}
```

### BrandProfile
```python
{
    "id": str (UUID),
    "user_id": str (FK to User),
    "company_name": str,
    "industry": str,
    "website": str (optional),
    "description": str,
    "created_at": datetime,
    "updated_at": datetime
}
```

### Campaign
```python
{
    "id": str (UUID),
    "brand_id": str (FK to BrandProfile),
    "creator_id": str (FK to CreatorProfile, optional),
    "title": str,
    "description": str,
    "budget": float,
    "platforms": list[str] (["instagram", "youtube", "tiktok"]),
    "duration_days": int,
    "status": str ("open" | "assigned" | "in_progress" | "submitted" | "completed" | "cancelled"),
    "niche": str,
    "min_followers": int,
    "content_requirements": str,
    "created_at": datetime,
    "updated_at": datetime,
    "deadline": datetime
}
```

### CampaignSubmission
```python
{
    "id": str (UUID),
    "campaign_id": str (FK to Campaign),
    "content_links": list[str],
    "notes": str,
    "submitted_at": datetime,
    "views": int,
    "likes": int,
    "comments": int,
    "engagement_rate": float
}
```

### Payment
```python
{
    "id": str (UUID),
    "campaign_id": str (FK to Campaign),
    "amount": float,
    "status": str ("pending" | "escrowed" | "released" | "refunded"),
    "payment_reference": str,
    "created_at": datetime,
    "released_at": datetime (optional)
}
```

### Review
```python
{
    "id": str (UUID),
    "campaign_id": str (FK to Campaign),
    "creator_id": str (FK to CreatorProfile),
    "brand_id": str (FK to BrandProfile),
    "rating": int (1-5),
    "comment": str,
    "created_at": datetime
}
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user (creator or brand)
  - Body: `{email, password, user_type}`
  - Returns: `{user, token}`

- `POST /api/auth/login` - Login user
  - Body: `{email, password}`
  - Returns: `{user, token}`

- `GET /api/auth/me` - Get current user
  - Headers: `Authorization: Bearer {token}`
  - Returns: `{user, profile}`

### Creator Profile
- `POST /api/creators/profile` - Create/update creator profile
  - Body: `{name, bio, niche, location, social_handles...}`
  - Returns: `{profile}`

- `GET /api/creators/profile/{user_id}` - Get creator profile
  - Returns: `{profile}`

- `GET /api/creators/search` - Search creators
  - Query: `?niche=&min_followers=&platform=&location=`
  - Returns: `{creators: []}`

- `GET /api/creators/dashboard` - Get creator dashboard data
  - Returns: `{campaigns, earnings, stats}`

### Brand Profile
- `POST /api/brands/profile` - Create/update brand profile
  - Body: `{company_name, industry, website, description}`
  - Returns: `{profile}`

- `GET /api/brands/profile/{user_id}` - Get brand profile
  - Returns: `{profile}`

- `GET /api/brands/dashboard` - Get brand dashboard data
  - Returns: `{campaigns, analytics}`

### Campaigns
- `POST /api/campaigns` - Create new campaign
  - Body: `{title, description, budget, platforms, duration_days, niche, min_followers, content_requirements}`
  - Returns: `{campaign}`

- `GET /api/campaigns` - List campaigns
  - Query: `?status=&niche=&budget_min=&budget_max=`
  - Returns: `{campaigns: []}`

- `GET /api/campaigns/{campaign_id}` - Get campaign details
  - Returns: `{campaign, brand, creator?}`

- `PUT /api/campaigns/{campaign_id}` - Update campaign
  - Body: `{...fields to update}`
  - Returns: `{campaign}`

- `POST /api/campaigns/{campaign_id}/apply` - Creator applies to campaign
  - Returns: `{success}`

- `POST /api/campaigns/{campaign_id}/assign` - Brand assigns campaign to creator
  - Body: `{creator_id}`
  - Returns: `{campaign}`

- `POST /api/campaigns/{campaign_id}/submit` - Creator submits campaign content
  - Body: `{content_links, notes}`
  - Returns: `{submission}`

- `POST /api/campaigns/{campaign_id}/approve` - Brand approves submission
  - Returns: `{campaign, payment}`

### Payments
- `POST /api/payments/escrow` - Create escrow payment
  - Body: `{campaign_id, amount}`
  - Returns: `{payment, payment_url}`

- `POST /api/payments/{payment_id}/release` - Release escrowed funds
  - Returns: `{payment}`

- `GET /api/payments/history` - Get payment history
  - Returns: `{payments: []}`

### Reviews
- `POST /api/reviews` - Create review
  - Body: `{campaign_id, rating, comment}`
  - Returns: `{review}`

- `GET /api/reviews/creator/{creator_id}` - Get creator reviews
  - Returns: `{reviews: []}`

### Analytics
- `GET /api/analytics/creator` - Get creator analytics
  - Returns: `{total_earnings, campaigns_completed, avg_rating, engagement_stats}`

- `GET /api/analytics/brand` - Get brand analytics
  - Returns: `{total_spent, campaigns_created, avg_campaign_performance}`

- `GET /api/analytics/campaign/{campaign_id}` - Get campaign analytics
  - Returns: `{views, likes, comments, engagement_rate, roi}`

### Social Media Integration (Future)
- `POST /api/social/instagram/connect` - Connect Instagram account
- `POST /api/social/youtube/connect` - Connect YouTube account
- `POST /api/social/tiktok/connect` - Connect TikTok account
- `GET /api/social/stats` - Get live social media stats
