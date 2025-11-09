
import * as Icons from "lucide-react";

export interface CreatorProfileScreenProps {
  state?: string;
}

/**
 * States:
 *  - default: Public profile view
 *  - ownProfile: Edit mode with refresh follower count option
 *  - brandView: Brand view with invite action
 */
export default function CreatorProfileScreen({ state }: CreatorProfileScreenProps) {
  const isOwnProfile = state === "ownProfile";
  const isBrandView = state === "brandView";

  const getIcon = (name: keyof typeof Icons): React.ComponentType<React.SVGProps<SVGSVGElement>> => {
    return Icons[name] as React.ComponentType<React.SVGProps<SVGSVGElement>>;
  };

  return (
    <div className="min-h-screen bg-[#FEF3C7] font-[Plus_Jakarta_Sans]">
      {/* Header */}
      <div className="bg-white border-b border-[#FCD34D]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="text-[#78350F] hover:text-[#EC4899]">
                <Icons.ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold text-[#78350F]">Creator Profile</h1>
            </div>
            <div className="flex items-center space-x-4">
              {isOwnProfile && (
                <button className="px-4 py-2 bg-white text-[#78350F] rounded-lg border border-[#FCD34D] hover:bg-[#FEF3C7] transition-all">
                  <Icons.Edit className="w-4 h-4 mr-2 inline" />
                  Edit Profile
                </button>
              )}
              {isBrandView && (
                <button className="px-6 py-2 bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all">
                  Invite to Campaign
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Banner and Profile Info */}
        <div className="bg-white rounded-2xl shadow-xl border border-[#FCD34D] overflow-hidden mb-8">
          <div className="h-48 bg-gradient-to-r from-[#FB923C] to-[#EC4899] relative">
            <img src="./images/profile-banner.jpg" className="w-full h-full object-cover opacity-50" alt="Profile banner" data-context="Creator profile banner image" />
            {isOwnProfile && (
              <button className="absolute top-4 right-4 px-3 py-1 bg-gray-900/80 backdrop-blur text-white rounded-lg text-sm hover:bg-gray-900/90 transition-all">
                <Icons.Camera className="w-4 h-4 mr-1 inline" />
                Change Banner
              </button>
            )}
          </div>
          <div className="px-8 pb-8">
            <div className="flex items-end -mt-12 mb-6">
              <div className="relative">
                <img src="./images/creator-avatar.jpg" className="w-32 h-32 rounded-full border-4 border-white" alt="Creator profile" data-context="Large creator profile photo" />
                {isOwnProfile && (
                  <button className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border border-[#FCD34D]">
                    <Icons.Camera className="w-4 h-4 text-[#78350F]" />
                  </button>
                )}
                <div className="absolute -bottom-2 -right-8">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#FB923C] to-[#EC4899] rounded-full flex items-center justify-center">
                    <Icons.CheckCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="ml-6 flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-3xl font-bold text-[#78350F]">Sarah Johnson</h2>
                  <span className="px-3 py-1 bg-[#10B981]/20 text-[#10B981] rounded-full text-sm font-semibold">
                    Verified Creator
                  </span>
                </div>
                <p className="text-[#78350F]/60 mb-4">
                  Fashion & Lifestyle Content Creator | Sustainable Fashion Advocate | NYC
                </p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Icons.MapPin className="w-4 h-4 text-[#78350F]/40" />
                    <span className="text-[#78350F]/60">New York, USA</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icons.Calendar className="w-4 h-4 text-[#78350F]/40" />
                    <span className="text-[#78350F]/60">Joined March 2023</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Stats */}
            <div className="grid grid-cols-4 gap-6 mb-6">
              {[
                { platform: "Instagram", icon: "Instagram", followers: "45.2K", gradient: "from-purple-500 to-pink-500" },
                { platform: "TikTok", icon: "Music", followers: "128.5K", gradient: "from-gray-800 to-black" },
                { platform: "YouTube", icon: "Youtube", followers: "12.8K", gradient: "from-red-500 to-red-600" },
                { platform: "X (Twitter)", icon: "Twitter", followers: "8.3K", gradient: "from-blue-400 to-blue-500" },
              ].map((social) => {
                const SocialIcon = getIcon(social.icon as keyof typeof Icons);
                return (
                  <div key={social.platform} className="bg-[#FEF3C7] rounded-lg p-4">
                    <div className={`w-10 h-10 bg-gradient-to-r ${social.gradient} rounded-lg flex items-center justify-center mb-2`}>
                      <SocialIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-[#78350F]">{social.followers}</div>
                    <div className="text-sm text-[#78350F]/60">{social.platform}</div>
                    {isOwnProfile && (
                      <button className="mt-2 px-2 py-1 text-xs text-[#EC4899] hover:text-[#FB923C] bg-white/50 rounded hover:bg-white/70 transition-all">
                        <Icons.RefreshCw className="w-3 h-3 inline mr-1" />
                        Refresh
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bio */}
            <div className="mb-6">
              <h3 className="font-semibold text-[#78350F] mb-2">About</h3>
              <p className="text-[#78350F]/70 leading-relaxed">
                Creating authentic content around sustainable fashion, beauty, and lifestyle. 
                Partnered with 50+ brands including Fashion Forward, EcoStyle, and BeautyCo. 
                Passionate about promoting conscious consumerism and helping brands tell their story 
                through creative visual storytelling. Open to collaborations that align with my values 
                of sustainability and authenticity.
              </p>
            </div>

            {/* Tags */}
            <div>
              <h3 className="font-semibold text-[#78350F] mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {["Fashion", "Sustainability", "Beauty", "Lifestyle", "Travel", "Wellness"].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-gradient-to-r from-[#FB923C]/20 to-[#EC4899]/20 text-[#EC4899] rounded-full text-sm font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Gallery */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-[#FCD34D] mb-8">
          <h3 className="text-xl font-semibold text-[#78350F] mb-6">Content Samples</h3>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="relative group cursor-pointer">
                <div className="aspect-square bg-[#FEF3C7] rounded-lg overflow-hidden">
                  <img src="./images/content-sample.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt="Content sample" data-context="Creator content sample image" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                  <div className="absolute bottom-2 left-2 text-white text-xs">
                    <div className="flex items-center space-x-1">
                      <Icons.Heart className="w-3 h-3" />
                      <span>2.3K</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-[#FCD34D]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-[#78350F]">Reviews</h3>
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Icons.Star key={i} className="w-5 h-5 text-[#F59E0B] fill-current" />
                ))}
              </div>
              <span className="font-bold text-[#78350F]">4.9</span>
              <span className="text-[#78350F]/60">(48 reviews)</span>
            </div>
          </div>
          <div className="space-y-4">
            {[
              {
                brand: "Fashion Forward",
                rating: 5,
                review: "Sarah exceeded our expectations! Her content was professional, creative, and delivered on time. Highly recommend!",
                date: "2 weeks ago",
              },
              {
                brand: "EcoStyle",
                rating: 5,
                review: "Amazing collaboration. Sarah truly understands sustainable fashion and communicated our brand values perfectly.",
                date: "1 month ago",
              },
              {
                brand: "BeautyCo",
                rating: 4,
                review: "Great work! Sarah's engagement rates were impressive and the content quality was excellent.",
                date: "2 months ago",
              },
            ].map((review, idx) => (
              <div key={idx} className="border-b border-[#FCD34D]/30 pb-4 last:border-0">
                <div className="flex items-start space-x-4">
                  <img src="./images/brand-logo.jpg" className="w-10 h-10 rounded-lg" alt="Brand logo" data-context="Reviewing brand logo" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-semibold text-[#78350F]">{review.brand}</div>
                      <div className="text-sm text-[#78350F]/60">{review.date}</div>
                    </div>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Icons.Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? "text-[#F59E0B] fill-current" : "text-[#FDE68A]"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-[#78350F]/70">{review.review}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}