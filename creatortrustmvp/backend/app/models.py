from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr
from enum import Enum


class UserType(str, Enum):
    CREATOR = "creator"
    BRAND = "brand"


class CampaignStatus(str, Enum):
    OPEN = "open"
    ASSIGNED = "assigned"
    IN_PROGRESS = "in_progress"
    SUBMITTED = "submitted"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


class PaymentStatus(str, Enum):
    PENDING = "pending"
    ESCROWED = "escrowed"
    RELEASED = "released"
    REFUNDED = "refunded"


class SubscriptionTier(str, Enum):
    FREE = "free"
    PRO = "pro"
    PREMIUM = "premium"


class UserRegister(BaseModel):
    email: EmailStr
    password: str
    user_type: UserType


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class User(BaseModel):
    id: str
    email: str
    user_type: UserType
    created_at: datetime
    updated_at: datetime


class CreatorProfileCreate(BaseModel):
    name: str
    bio: str
    niche: str
    location: str
    instagram_handle: Optional[str] = None
    youtube_handle: Optional[str] = None
    tiktok_handle: Optional[str] = None


class CreatorProfile(BaseModel):
    id: str
    user_id: str
    name: str
    bio: str
    niche: str
    location: str
    instagram_handle: Optional[str] = None
    youtube_handle: Optional[str] = None
    tiktok_handle: Optional[str] = None
    followers_instagram: int = 0
    followers_youtube: int = 0
    followers_tiktok: int = 0
    engagement_rate: float = 0.0
    subscription_tier: SubscriptionTier = SubscriptionTier.FREE
    rating: float = 0.0
    total_campaigns: int = 0
    created_at: datetime
    updated_at: datetime


class BrandProfileCreate(BaseModel):
    company_name: str
    industry: str
    website: Optional[str] = None
    description: str


class BrandProfile(BaseModel):
    id: str
    user_id: str
    company_name: str
    industry: str
    website: Optional[str] = None
    description: str
    created_at: datetime
    updated_at: datetime


class CampaignCreate(BaseModel):
    title: str
    description: str
    budget: float
    platforms: List[str]
    duration_days: int
    niche: str
    min_followers: int
    content_requirements: str


class Campaign(BaseModel):
    id: str
    brand_id: str
    creator_id: Optional[str] = None
    title: str
    description: str
    budget: float
    platforms: List[str]
    duration_days: int
    status: CampaignStatus
    niche: str
    min_followers: int
    content_requirements: str
    created_at: datetime
    updated_at: datetime
    deadline: datetime


class CampaignSubmissionCreate(BaseModel):
    content_links: List[str]
    notes: str


class CampaignSubmission(BaseModel):
    id: str
    campaign_id: str
    content_links: List[str]
    notes: str
    submitted_at: datetime
    views: int = 0
    likes: int = 0
    comments: int = 0
    engagement_rate: float = 0.0


class PaymentCreate(BaseModel):
    campaign_id: str
    amount: float


class Payment(BaseModel):
    id: str
    campaign_id: str
    amount: float
    status: PaymentStatus
    payment_reference: str
    created_at: datetime
    released_at: Optional[datetime] = None


class ReviewCreate(BaseModel):
    campaign_id: str
    rating: int
    comment: str


class Review(BaseModel):
    id: str
    campaign_id: str
    creator_id: str
    brand_id: str
    rating: int
    comment: str
    created_at: datetime


class Token(BaseModel):
    access_token: str
    token_type: str


class UserWithProfile(BaseModel):
    user: User
    profile: Optional[CreatorProfile | BrandProfile] = None
