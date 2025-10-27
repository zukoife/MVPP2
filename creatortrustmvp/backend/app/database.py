"""
In-memory database for MVP
Data will be lost when the server restarts
"""
from datetime import datetime, timedelta
from typing import Dict, List, Optional
import uuid
from app.models import (
    User, CreatorProfile, BrandProfile, Campaign, 
    CampaignSubmission, Payment, Review,
    UserType, CampaignStatus, PaymentStatus, SubscriptionTier
)


class Database:
    def __init__(self):
        self.users: Dict[str, dict] = {}
        self.creator_profiles: Dict[str, dict] = {}
        self.brand_profiles: Dict[str, dict] = {}
        self.campaigns: Dict[str, dict] = {}
        self.submissions: Dict[str, dict] = {}
        self.payments: Dict[str, dict] = {}
        self.reviews: Dict[str, dict] = {}
        
        self.users_by_email: Dict[str, str] = {}
        self.profiles_by_user_id: Dict[str, str] = {}
        self.campaigns_by_brand: Dict[str, List[str]] = {}
        self.campaigns_by_creator: Dict[str, List[str]] = {}
        self.reviews_by_creator: Dict[str, List[str]] = {}
        
    def create_user(self, email: str, password_hash: str, user_type: UserType) -> dict:
        user_id = str(uuid.uuid4())
        now = datetime.utcnow()
        user = {
            "id": user_id,
            "email": email,
            "password_hash": password_hash,
            "user_type": user_type.value,
            "created_at": now,
            "updated_at": now
        }
        self.users[user_id] = user
        self.users_by_email[email] = user_id
        return user
    
    def get_user_by_email(self, email: str) -> Optional[dict]:
        user_id = self.users_by_email.get(email)
        if user_id:
            return self.users.get(user_id)
        return None
    
    def get_user_by_id(self, user_id: str) -> Optional[dict]:
        return self.users.get(user_id)
    
    def create_creator_profile(self, user_id: str, data: dict) -> dict:
        profile_id = str(uuid.uuid4())
        now = datetime.utcnow()
        profile = {
            "id": profile_id,
            "user_id": user_id,
            **data,
            "followers_instagram": 0,
            "followers_youtube": 0,
            "followers_tiktok": 0,
            "engagement_rate": 0.0,
            "subscription_tier": SubscriptionTier.FREE.value,
            "rating": 0.0,
            "total_campaigns": 0,
            "created_at": now,
            "updated_at": now
        }
        self.creator_profiles[profile_id] = profile
        self.profiles_by_user_id[user_id] = profile_id
        return profile
    
    def update_creator_profile(self, user_id: str, data: dict) -> Optional[dict]:
        profile_id = self.profiles_by_user_id.get(user_id)
        if profile_id and profile_id in self.creator_profiles:
            profile = self.creator_profiles[profile_id]
            profile.update(data)
            profile["updated_at"] = datetime.utcnow()
            return profile
        return None
    
    def get_creator_profile_by_user_id(self, user_id: str) -> Optional[dict]:
        profile_id = self.profiles_by_user_id.get(user_id)
        if profile_id:
            return self.creator_profiles.get(profile_id)
        return None
    
    def get_creator_profile_by_id(self, profile_id: str) -> Optional[dict]:
        return self.creator_profiles.get(profile_id)
    
    def search_creators(self, niche: Optional[str] = None, min_followers: Optional[int] = None, 
                       platform: Optional[str] = None, location: Optional[str] = None) -> List[dict]:
        results = []
        for profile in self.creator_profiles.values():
            if niche and profile.get("niche", "").lower() != niche.lower():
                continue
            if location and profile.get("location", "").lower() != location.lower():
                continue
            if min_followers:
                total_followers = (profile.get("followers_instagram", 0) + 
                                 profile.get("followers_youtube", 0) + 
                                 profile.get("followers_tiktok", 0))
                if total_followers < min_followers:
                    continue
            results.append(profile)
        return results
    
    def create_brand_profile(self, user_id: str, data: dict) -> dict:
        profile_id = str(uuid.uuid4())
        now = datetime.utcnow()
        profile = {
            "id": profile_id,
            "user_id": user_id,
            **data,
            "created_at": now,
            "updated_at": now
        }
        self.brand_profiles[profile_id] = profile
        self.profiles_by_user_id[user_id] = profile_id
        return profile
    
    def update_brand_profile(self, user_id: str, data: dict) -> Optional[dict]:
        profile_id = self.profiles_by_user_id.get(user_id)
        if profile_id and profile_id in self.brand_profiles:
            profile = self.brand_profiles[profile_id]
            profile.update(data)
            profile["updated_at"] = datetime.utcnow()
            return profile
        return None
    
    def get_brand_profile_by_user_id(self, user_id: str) -> Optional[dict]:
        profile_id = self.profiles_by_user_id.get(user_id)
        if profile_id:
            return self.brand_profiles.get(profile_id)
        return None
    
    def get_brand_profile_by_id(self, profile_id: str) -> Optional[dict]:
        return self.brand_profiles.get(profile_id)
    
    def create_campaign(self, brand_id: str, data: dict) -> dict:
        campaign_id = str(uuid.uuid4())
        now = datetime.utcnow()
        deadline = now + timedelta(days=data["duration_days"])
        campaign = {
            "id": campaign_id,
            "brand_id": brand_id,
            "creator_id": None,
            **data,
            "status": CampaignStatus.OPEN.value,
            "created_at": now,
            "updated_at": now,
            "deadline": deadline
        }
        self.campaigns[campaign_id] = campaign
        if brand_id not in self.campaigns_by_brand:
            self.campaigns_by_brand[brand_id] = []
        self.campaigns_by_brand[brand_id].append(campaign_id)
        return campaign
    
    def get_campaign(self, campaign_id: str) -> Optional[dict]:
        return self.campaigns.get(campaign_id)
    
    def update_campaign(self, campaign_id: str, data: dict) -> Optional[dict]:
        if campaign_id in self.campaigns:
            campaign = self.campaigns[campaign_id]
            campaign.update(data)
            campaign["updated_at"] = datetime.utcnow()
            return campaign
        return None
    
    def list_campaigns(self, status: Optional[str] = None, niche: Optional[str] = None,
                      budget_min: Optional[float] = None, budget_max: Optional[float] = None) -> List[dict]:
        results = []
        for campaign in self.campaigns.values():
            if status and campaign.get("status") != status:
                continue
            if niche and campaign.get("niche", "").lower() != niche.lower():
                continue
            if budget_min and campaign.get("budget", 0) < budget_min:
                continue
            if budget_max and campaign.get("budget", 0) > budget_max:
                continue
            results.append(campaign)
        return results
    
    def get_campaigns_by_brand(self, brand_id: str) -> List[dict]:
        campaign_ids = self.campaigns_by_brand.get(brand_id, [])
        return [self.campaigns[cid] for cid in campaign_ids if cid in self.campaigns]
    
    def get_campaigns_by_creator(self, creator_id: str) -> List[dict]:
        campaign_ids = self.campaigns_by_creator.get(creator_id, [])
        return [self.campaigns[cid] for cid in campaign_ids if cid in self.campaigns]
    
    def assign_campaign(self, campaign_id: str, creator_id: str) -> Optional[dict]:
        if campaign_id in self.campaigns:
            campaign = self.campaigns[campaign_id]
            campaign["creator_id"] = creator_id
            campaign["status"] = CampaignStatus.ASSIGNED.value
            campaign["updated_at"] = datetime.utcnow()
            
            if creator_id not in self.campaigns_by_creator:
                self.campaigns_by_creator[creator_id] = []
            self.campaigns_by_creator[creator_id].append(campaign_id)
            return campaign
        return None
    
    def create_submission(self, campaign_id: str, data: dict) -> dict:
        submission_id = str(uuid.uuid4())
        now = datetime.utcnow()
        submission = {
            "id": submission_id,
            "campaign_id": campaign_id,
            **data,
            "submitted_at": now,
            "views": 0,
            "likes": 0,
            "comments": 0,
            "engagement_rate": 0.0
        }
        self.submissions[submission_id] = submission
        
        if campaign_id in self.campaigns:
            self.campaigns[campaign_id]["status"] = CampaignStatus.SUBMITTED.value
            self.campaigns[campaign_id]["updated_at"] = now
        
        return submission
    
    def get_submission_by_campaign(self, campaign_id: str) -> Optional[dict]:
        for submission in self.submissions.values():
            if submission["campaign_id"] == campaign_id:
                return submission
        return None
    
    def create_payment(self, campaign_id: str, amount: float) -> dict:
        payment_id = str(uuid.uuid4())
        now = datetime.utcnow()
        payment = {
            "id": payment_id,
            "campaign_id": campaign_id,
            "amount": amount,
            "status": PaymentStatus.ESCROWED.value,
            "payment_reference": f"PAY-{payment_id[:8]}",
            "created_at": now,
            "released_at": None
        }
        self.payments[payment_id] = payment
        return payment
    
    def release_payment(self, payment_id: str) -> Optional[dict]:
        if payment_id in self.payments:
            payment = self.payments[payment_id]
            payment["status"] = PaymentStatus.RELEASED.value
            payment["released_at"] = datetime.utcnow()
            return payment
        return None
    
    def get_payment_by_campaign(self, campaign_id: str) -> Optional[dict]:
        for payment in self.payments.values():
            if payment["campaign_id"] == campaign_id:
                return payment
        return None
    
    def get_payments_by_user(self, user_id: str, user_type: UserType) -> List[dict]:
        results = []
        for payment in self.payments.values():
            campaign = self.campaigns.get(payment["campaign_id"])
            if not campaign:
                continue
            
            if user_type == UserType.BRAND:
                brand_profile = self.get_brand_profile_by_user_id(user_id)
                if brand_profile and campaign["brand_id"] == brand_profile["id"]:
                    results.append(payment)
            elif user_type == UserType.CREATOR:
                creator_profile = self.get_creator_profile_by_user_id(user_id)
                if creator_profile and campaign.get("creator_id") == creator_profile["id"]:
                    results.append(payment)
        
        return results
    
    def create_review(self, campaign_id: str, creator_id: str, brand_id: str, rating: int, comment: str) -> dict:
        review_id = str(uuid.uuid4())
        now = datetime.utcnow()
        review = {
            "id": review_id,
            "campaign_id": campaign_id,
            "creator_id": creator_id,
            "brand_id": brand_id,
            "rating": rating,
            "comment": comment,
            "created_at": now
        }
        self.reviews[review_id] = review
        
        if creator_id not in self.reviews_by_creator:
            self.reviews_by_creator[creator_id] = []
        self.reviews_by_creator[creator_id].append(review_id)
        
        self._update_creator_rating(creator_id)
        
        return review
    
    def _update_creator_rating(self, creator_id: str):
        review_ids = self.reviews_by_creator.get(creator_id, [])
        if not review_ids:
            return
        
        total_rating = sum(self.reviews[rid]["rating"] for rid in review_ids if rid in self.reviews)
        avg_rating = total_rating / len(review_ids)
        
        profile = self.get_creator_profile_by_id(creator_id)
        if profile:
            profile["rating"] = round(avg_rating, 2)
            profile["updated_at"] = datetime.utcnow()
    
    def get_reviews_by_creator(self, creator_id: str) -> List[dict]:
        review_ids = self.reviews_by_creator.get(creator_id, [])
        return [self.reviews[rid] for rid in review_ids if rid in self.reviews]


db = Database()
