from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List
from datetime import datetime

from app.models import (
    UserRegister, UserLogin, User, Token, UserWithProfile,
    CreatorProfileCreate, CreatorProfile, BrandProfileCreate, BrandProfile,
    CampaignCreate, Campaign, CampaignSubmissionCreate, CampaignSubmission,
    PaymentCreate, Payment, ReviewCreate, Review,
    UserType, CampaignStatus
)
from app.database import db
from app.auth import (
    get_password_hash, verify_password, create_access_token, get_current_user
)

app = FastAPI(title="CreatorTrust API", version="1.0.0")

# Disable CORS. Do not remove this for full-stack development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


@app.get("/healthz")
async def healthz():
    return {"status": "ok"}


@app.post("/api/auth/register", response_model=dict)
async def register(user_data: UserRegister):
    existing_user = db.get_user_by_email(user_data.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    password_hash = get_password_hash(user_data.password)
    user = db.create_user(user_data.email, password_hash, user_data.user_type)
    
    access_token = create_access_token(data={"sub": user["id"]})
    
    return {
        "user": {
            "id": user["id"],
            "email": user["email"],
            "user_type": user["user_type"],
            "created_at": user["created_at"].isoformat(),
            "updated_at": user["updated_at"].isoformat()
        },
        "access_token": access_token,
        "token_type": "bearer"
    }


@app.post("/api/auth/login", response_model=dict)
async def login(user_data: UserLogin):
    user = db.get_user_by_email(user_data.email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    if not verify_password(user_data.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    access_token = create_access_token(data={"sub": user["id"]})
    
    return {
        "user": {
            "id": user["id"],
            "email": user["email"],
            "user_type": user["user_type"],
            "created_at": user["created_at"].isoformat(),
            "updated_at": user["updated_at"].isoformat()
        },
        "access_token": access_token,
        "token_type": "bearer"
    }


@app.get("/api/auth/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    user_type = UserType(current_user["user_type"])
    
    if user_type == UserType.CREATOR:
        profile = db.get_creator_profile_by_user_id(current_user["id"])
    else:
        profile = db.get_brand_profile_by_user_id(current_user["id"])
    
    return {
        "user": {
            "id": current_user["id"],
            "email": current_user["email"],
            "user_type": current_user["user_type"],
            "created_at": current_user["created_at"].isoformat(),
            "updated_at": current_user["updated_at"].isoformat()
        },
        "profile": profile
    }


@app.post("/api/creators/profile", response_model=CreatorProfile)
async def create_or_update_creator_profile(
    profile_data: CreatorProfileCreate,
    current_user: dict = Depends(get_current_user)
):
    if current_user["user_type"] != UserType.CREATOR.value:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only creators can create creator profiles"
        )
    
    existing_profile = db.get_creator_profile_by_user_id(current_user["id"])
    
    if existing_profile:
        profile = db.update_creator_profile(current_user["id"], profile_data.model_dump())
    else:
        profile = db.create_creator_profile(current_user["id"], profile_data.model_dump())
    
    return profile


@app.get("/api/creators/profile/{user_id}", response_model=CreatorProfile)
async def get_creator_profile(user_id: str):
    profile = db.get_creator_profile_by_user_id(user_id)
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Creator profile not found"
        )
    return profile


@app.get("/api/creators/search", response_model=List[CreatorProfile])
async def search_creators(
    niche: Optional[str] = None,
    min_followers: Optional[int] = None,
    platform: Optional[str] = None,
    location: Optional[str] = None
):
    creators = db.search_creators(niche, min_followers, platform, location)
    return creators


@app.get("/api/creators/dashboard")
async def get_creator_dashboard(current_user: dict = Depends(get_current_user)):
    if current_user["user_type"] != UserType.CREATOR.value:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only creators can access creator dashboard"
        )
    
    profile = db.get_creator_profile_by_user_id(current_user["id"])
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Creator profile not found"
        )
    
    campaigns = db.get_campaigns_by_creator(profile["id"])
    payments = db.get_payments_by_user(current_user["id"], UserType.CREATOR)
    
    total_earnings = sum(p["amount"] for p in payments if p["status"] == "released")
    pending_earnings = sum(p["amount"] for p in payments if p["status"] == "escrowed")
    
    return {
        "profile": profile,
        "campaigns": campaigns,
        "total_earnings": total_earnings,
        "pending_earnings": pending_earnings,
        "total_campaigns": len(campaigns),
        "rating": profile.get("rating", 0.0)
    }


@app.post("/api/brands/profile", response_model=BrandProfile)
async def create_or_update_brand_profile(
    profile_data: BrandProfileCreate,
    current_user: dict = Depends(get_current_user)
):
    if current_user["user_type"] != UserType.BRAND.value:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only brands can create brand profiles"
        )
    
    existing_profile = db.get_brand_profile_by_user_id(current_user["id"])
    
    if existing_profile:
        profile = db.update_brand_profile(current_user["id"], profile_data.model_dump())
    else:
        profile = db.create_brand_profile(current_user["id"], profile_data.model_dump())
    
    return profile


@app.get("/api/brands/profile/{user_id}", response_model=BrandProfile)
async def get_brand_profile(user_id: str):
    profile = db.get_brand_profile_by_user_id(user_id)
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Brand profile not found"
        )
    return profile


@app.get("/api/brands/dashboard")
async def get_brand_dashboard(current_user: dict = Depends(get_current_user)):
    if current_user["user_type"] != UserType.BRAND.value:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only brands can access brand dashboard"
        )
    
    profile = db.get_brand_profile_by_user_id(current_user["id"])
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Brand profile not found"
        )
    
    campaigns = db.get_campaigns_by_brand(profile["id"])
    payments = db.get_payments_by_user(current_user["id"], UserType.BRAND)
    
    total_spent = sum(p["amount"] for p in payments if p["status"] == "released")
    pending_amount = sum(p["amount"] for p in payments if p["status"] == "escrowed")
    
    return {
        "profile": profile,
        "campaigns": campaigns,
        "total_spent": total_spent,
        "pending_amount": pending_amount,
        "total_campaigns": len(campaigns),
        "active_campaigns": len([c for c in campaigns if c["status"] in ["open", "assigned", "in_progress"]])
    }


@app.post("/api/campaigns", response_model=Campaign)
async def create_campaign(
    campaign_data: CampaignCreate,
    current_user: dict = Depends(get_current_user)
):
    if current_user["user_type"] != UserType.BRAND.value:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only brands can create campaigns"
        )
    
    profile = db.get_brand_profile_by_user_id(current_user["id"])
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Brand profile not found. Please create a profile first."
        )
    
    campaign = db.create_campaign(profile["id"], campaign_data.model_dump())
    return campaign


@app.get("/api/campaigns", response_model=List[Campaign])
async def list_campaigns(
    status: Optional[str] = None,
    niche: Optional[str] = None,
    budget_min: Optional[float] = None,
    budget_max: Optional[float] = None
):
    campaigns = db.list_campaigns(status, niche, budget_min, budget_max)
    return campaigns


@app.get("/api/campaigns/{campaign_id}")
async def get_campaign(campaign_id: str):
    campaign = db.get_campaign(campaign_id)
    if not campaign:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Campaign not found"
        )
    
    brand = db.get_brand_profile_by_id(campaign["brand_id"])
    
    creator = None
    if campaign.get("creator_id"):
        creator = db.get_creator_profile_by_id(campaign["creator_id"])
    
    submission = db.get_submission_by_campaign(campaign_id)
    
    return {
        "campaign": campaign,
        "brand": brand,
        "creator": creator,
        "submission": submission
    }


@app.put("/api/campaigns/{campaign_id}", response_model=Campaign)
async def update_campaign(
    campaign_id: str,
    campaign_data: dict,
    current_user: dict = Depends(get_current_user)
):
    campaign = db.get_campaign(campaign_id)
    if not campaign:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Campaign not found"
        )
    
    profile = db.get_brand_profile_by_user_id(current_user["id"])
    if not profile or profile["id"] != campaign["brand_id"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to update this campaign"
        )
    
    updated_campaign = db.update_campaign(campaign_id, campaign_data)
    return updated_campaign


@app.post("/api/campaigns/{campaign_id}/apply")
async def apply_to_campaign(
    campaign_id: str,
    current_user: dict = Depends(get_current_user)
):
    if current_user["user_type"] != UserType.CREATOR.value:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only creators can apply to campaigns"
        )
    
    campaign = db.get_campaign(campaign_id)
    if not campaign:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Campaign not found"
        )
    
    if campaign["status"] != CampaignStatus.OPEN.value:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Campaign is not open for applications"
        )
    
    return {"success": True, "message": "Application submitted successfully"}


@app.post("/api/campaigns/{campaign_id}/assign", response_model=Campaign)
async def assign_campaign(
    campaign_id: str,
    data: dict,
    current_user: dict = Depends(get_current_user)
):
    if current_user["user_type"] != UserType.BRAND.value:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only brands can assign campaigns"
        )
    
    campaign = db.get_campaign(campaign_id)
    if not campaign:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Campaign not found"
        )
    
    profile = db.get_brand_profile_by_user_id(current_user["id"])
    if not profile or profile["id"] != campaign["brand_id"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to assign this campaign"
        )
    
    creator_id = data.get("creator_id")
    if not creator_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="creator_id is required"
        )
    
    updated_campaign = db.assign_campaign(campaign_id, creator_id)
    return updated_campaign


@app.post("/api/campaigns/{campaign_id}/submit", response_model=CampaignSubmission)
async def submit_campaign(
    campaign_id: str,
    submission_data: CampaignSubmissionCreate,
    current_user: dict = Depends(get_current_user)
):
    if current_user["user_type"] != UserType.CREATOR.value:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only creators can submit campaigns"
        )
    
    campaign = db.get_campaign(campaign_id)
    if not campaign:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Campaign not found"
        )
    
    profile = db.get_creator_profile_by_user_id(current_user["id"])
    if not profile or campaign.get("creator_id") != profile["id"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not assigned to this campaign"
        )
    
    submission = db.create_submission(campaign_id, submission_data.model_dump())
    return submission


@app.post("/api/campaigns/{campaign_id}/approve")
async def approve_campaign(
    campaign_id: str,
    current_user: dict = Depends(get_current_user)
):
    if current_user["user_type"] != UserType.BRAND.value:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only brands can approve campaigns"
        )
    
    campaign = db.get_campaign(campaign_id)
    if not campaign:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Campaign not found"
        )
    
    profile = db.get_brand_profile_by_user_id(current_user["id"])
    if not profile or profile["id"] != campaign["brand_id"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to approve this campaign"
        )
    
    db.update_campaign(campaign_id, {"status": CampaignStatus.COMPLETED.value})
    
    payment = db.get_payment_by_campaign(campaign_id)
    if payment:
        db.release_payment(payment["id"])
    
    if campaign.get("creator_id"):
        creator = db.get_creator_profile_by_id(campaign["creator_id"])
        if creator:
            creator["total_campaigns"] = creator.get("total_campaigns", 0) + 1
            creator["updated_at"] = datetime.utcnow()
    
    return {
        "success": True,
        "message": "Campaign approved and payment released",
        "campaign": db.get_campaign(campaign_id),
        "payment": payment
    }


@app.post("/api/payments/escrow", response_model=Payment)
async def create_escrow_payment(
    payment_data: PaymentCreate,
    current_user: dict = Depends(get_current_user)
):
    if current_user["user_type"] != UserType.BRAND.value:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only brands can create payments"
        )
    
    campaign = db.get_campaign(payment_data.campaign_id)
    if not campaign:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Campaign not found"
        )
    
    profile = db.get_brand_profile_by_user_id(current_user["id"])
    if not profile or profile["id"] != campaign["brand_id"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to create payment for this campaign"
        )
    
    payment = db.create_payment(payment_data.campaign_id, payment_data.amount)
    
    payment_url = f"https://payment.example.com/pay/{payment['id']}"
    
    return {**payment, "payment_url": payment_url}


@app.post("/api/payments/{payment_id}/release", response_model=Payment)
async def release_payment(
    payment_id: str,
    current_user: dict = Depends(get_current_user)
):
    payment = db.payments.get(payment_id)
    if not payment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Payment not found"
        )
    
    campaign = db.get_campaign(payment["campaign_id"])
    if not campaign:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Campaign not found"
        )
    
    profile = db.get_brand_profile_by_user_id(current_user["id"])
    if not profile or profile["id"] != campaign["brand_id"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to release this payment"
        )
    
    released_payment = db.release_payment(payment_id)
    return released_payment


@app.get("/api/payments/history", response_model=List[Payment])
async def get_payment_history(current_user: dict = Depends(get_current_user)):
    user_type = UserType(current_user["user_type"])
    payments = db.get_payments_by_user(current_user["id"], user_type)
    return payments


@app.post("/api/reviews", response_model=Review)
async def create_review(
    review_data: ReviewCreate,
    current_user: dict = Depends(get_current_user)
):
    if current_user["user_type"] != UserType.BRAND.value:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only brands can create reviews"
        )
    
    campaign = db.get_campaign(review_data.campaign_id)
    if not campaign:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Campaign not found"
        )
    
    brand_profile = db.get_brand_profile_by_user_id(current_user["id"])
    if not brand_profile or brand_profile["id"] != campaign["brand_id"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to review this campaign"
        )
    
    if not campaign.get("creator_id"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Campaign has no assigned creator"
        )
    
    review = db.create_review(
        review_data.campaign_id,
        campaign["creator_id"],
        brand_profile["id"],
        review_data.rating,
        review_data.comment
    )
    
    return review


@app.get("/api/reviews/creator/{creator_id}", response_model=List[Review])
async def get_creator_reviews(creator_id: str):
    reviews = db.get_reviews_by_creator(creator_id)
    return reviews


@app.get("/api/analytics/creator")
async def get_creator_analytics(current_user: dict = Depends(get_current_user)):
    if current_user["user_type"] != UserType.CREATOR.value:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only creators can access creator analytics"
        )
    
    profile = db.get_creator_profile_by_user_id(current_user["id"])
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Creator profile not found"
        )
    
    campaigns = db.get_campaigns_by_creator(profile["id"])
    payments = db.get_payments_by_user(current_user["id"], UserType.CREATOR)
    
    total_earnings = sum(p["amount"] for p in payments if p["status"] == "released")
    campaigns_completed = len([c for c in campaigns if c["status"] == "completed"])
    
    return {
        "total_earnings": total_earnings,
        "campaigns_completed": campaigns_completed,
        "total_campaigns": len(campaigns),
        "avg_rating": profile.get("rating", 0.0),
        "engagement_rate": profile.get("engagement_rate", 0.0)
    }


@app.get("/api/analytics/brand")
async def get_brand_analytics(current_user: dict = Depends(get_current_user)):
    if current_user["user_type"] != UserType.BRAND.value:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only brands can access brand analytics"
        )
    
    profile = db.get_brand_profile_by_user_id(current_user["id"])
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Brand profile not found"
        )
    
    campaigns = db.get_campaigns_by_brand(profile["id"])
    payments = db.get_payments_by_user(current_user["id"], UserType.BRAND)
    
    total_spent = sum(p["amount"] for p in payments if p["status"] == "released")
    campaigns_completed = len([c for c in campaigns if c["status"] == "completed"])
    
    return {
        "total_spent": total_spent,
        "campaigns_created": len(campaigns),
        "campaigns_completed": campaigns_completed,
        "active_campaigns": len([c for c in campaigns if c["status"] in ["open", "assigned", "in_progress"]])
    }


@app.get("/api/analytics/campaign/{campaign_id}")
async def get_campaign_analytics(campaign_id: str):
    campaign = db.get_campaign(campaign_id)
    if not campaign:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Campaign not found"
        )
    
    submission = db.get_submission_by_campaign(campaign_id)
    
    if not submission:
        return {
            "views": 0,
            "likes": 0,
            "comments": 0,
            "engagement_rate": 0.0,
            "status": campaign["status"]
        }
    
    return {
        "views": submission.get("views", 0),
        "likes": submission.get("likes", 0),
        "comments": submission.get("comments", 0),
        "engagement_rate": submission.get("engagement_rate", 0.0),
        "status": campaign["status"]
    }
