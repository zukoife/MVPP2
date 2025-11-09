
import * as Icons from "lucide-react";

export interface BrandProfileScreenProps {
  state?: string;
}

/**
 * States:
 *  - default: Public brand profile view
 *  - ownProfile: Edit mode with edit profile button
 */
export default function BrandProfileScreen({ state }: BrandProfileScreenProps) {
  const isOwnProfile = state === "ownProfile";

  const getIcon = (name: keyof typeof Icons): React.ComponentType<React.SVGProps<SVGSVGElement>> => {
    return Icons[name] as React.ComponentType<React.SVGProps<SVGSVGElement>>;
  };

  return (
    <div className="min-h-screen bg-[#FEF3C7] font-[Plus_Jakarta_Sans]">
      {/* Header */}
      <div className="bg-white border-b border-[#FDE68A]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="text-[#78350F] hover:text-[#EC4899]">
                <Icons.ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold text-[#78350F]">Brand Profile</h1>
            </div>
            <div className="flex items-center space-x-4">
              {isOwnProfile && (
                <button className="px-4 py-2 bg-white text-[#78350F] rounded-lg border border-[#FDE68A] hover:bg-[#FEF3C7] transition-all">
                  <Icons.Edit className="w-4 h-4 mr-2 inline" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Banner and Profile Info */}
        <div className="bg-white rounded-2xl shadow-xl border border-[#FDE68A] overflow-hidden mb-8">
          <div className="h-48 bg-gradient-to-r from-[#FB923C] to-[#EC4899] relative">
            <img src="./images/brand-banner.jpg" className="w-full h-full object-cover opacity-50" alt="Brand banner" data-context="Brand profile banner image" />
            {isOwnProfile && (
              <button className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur text-white rounded-lg text-sm hover:bg-black/60 transition-all">
                <Icons.Camera className="w-4 h-4 mr-1 inline" />
                Change Banner
              </button>
            )}
          </div>
          <div className="px-8 pb-8">
            <div className="flex items-end -mt-12 mb-6">
              <div className="relative">
                <img src="./images/brand-logo.jpg" className="w-32 h-32 rounded-xl border-4 border-white" alt="Brand logo" data-context="Large brand profile logo" />
                {isOwnProfile && (
                  <button className="absolute bottom-3 right-3 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border border-[#FDE68A]">
                    <Icons.Camera className="w-4 h-4 text-[#78350F]" />
                  </button>
                )}
                <div className="absolute -bottom-2 -right-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#FB923C] to-[#EC4899] rounded-full flex items-center justify-center">
                    <Icons.CheckCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="ml-6 flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-3xl font-bold text-[#78350F]">Fashion Forward</h2>
                  <span className="px-3 py-1 bg-[#10B981]/20 text-[#10B981] rounded-full text-sm font-semibold">
                    Verified Brand
                  </span>
                </div>
                <p className="text-[#78350F]/60 mb-4">
                  Leading Sustainable Fashion Brand | Eco-Friendly Collections | Global Retailer
                </p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Icons.Globe className="w-4 h-4 text-[#78350F]/40" />
                    <a href="#" className="text-[#EC4899] hover:text-[#FB923C]">
                      www.fashionforward.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icons.Calendar className="w-4 h-4 text-[#78350F]/40" />
                    <span className="text-[#78350F]/60">Since 2015</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-4 gap-6 mb-6">
              {[
                { platform: "Instagram", icon: "Instagram", handle: "@fashionforward", gradient: "from-purple-500 to-pink-500" },
                { platform: "Facebook", icon: "Facebook", handle: "Fashion Forward", gradient: "from-blue-500 to-blue-600" },
                { platform: "LinkedIn", icon: "Linkedin", handle: "Fashion Forward Inc.", gradient: "from-blue-600 to-blue-700" },
                { platform: "YouTube", icon: "Youtube", handle: "Fashion Forward", gradient: "from-red-500 to-red-600" },
              ].map((social) => {
                const SocialIcon = getIcon(social.icon as keyof typeof Icons);
                return (
                  <div key={social.platform} className="bg-[#FEF3C7] rounded-lg p-4">
                    <div className={`w-10 h-10 bg-gradient-to-r ${social.gradient} rounded-lg flex items-center justify-center mb-2`}>
                      <SocialIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-sm font-semibold text-[#78350F]">{social.handle}</div>
                    <div className="text-xs text-[#78350F]/60">{social.platform}</div>
                  </div>
                );
              })}
            </div>

            {/* About */}
            <div className="mb-6">
              <h3 className="font-semibold text-[#78350F] mb-2">About</h3>
              <p className="text-[#78350F]/70 leading-relaxed">
                Fashion Forward is a pioneering sustainable fashion brand dedicated to creating 
                beautiful, eco-friendly clothing that doesn't compromise on style or ethics. 
                Our mission is to revolutionize the fashion industry by proving that sustainability 
                and luxury can coexist. We work with talented creators who share our vision of a 
                more sustainable future in fashion.
              </p>
            </div>

            {/* Brand Values */}
            <div>
              <h3 className="font-semibold text-[#78350F] mb-2">Brand Values</h3>
              <div className="flex flex-wrap gap-2">
                {["Sustainability", "Ethical Production", "Innovation", "Quality", "Transparency", "Inclusivity"].map((value) => (
                  <span key={value} className="px-3 py-1 bg-gradient-to-r from-[#FB923C]/20 to-[#EC4899]/20 text-[#EC4899] rounded-full text-sm font-semibold">
                    {value}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Campaign Highlights */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-[#FDE68A] mb-8">
          <h3 className="text-xl font-semibold text-[#78350F] mb-6">Recent Campaigns</h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { title: "Summer Collection 2024", creators: 24, status: "Active" },
              { title: "Eco-Friendly Line Launch", creators: 18, status: "Completed" },
              { title: "Winter Essentials", creators: 15, status: "Planning" },
            ].map((campaign, idx) => (
              <div key={idx} className="bg-[#FEF3C7] rounded-lg p-4">
                <h4 className="font-semibold text-[#78350F] mb-2">{campaign.title}</h4>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#78350F]/60">Creators</span>
                  <span className="font-semibold text-[#78350F]">{campaign.creators}</span>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    campaign.status === "Active"
                      ? "bg-[#10B981]/20 text-[#10B981]"
                      : campaign.status === "Completed"
                      ? "bg-[#78350F]/20 text-[#78350F]"
                      : "bg-[#F59E0B]/20 text-[#F59E0B]"
                  }`}
                >
                  {campaign.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-[#FDE68A]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-[#78350F]">Creator Reviews</h3>
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Icons.Star key={i} className="w-5 h-5 text-[#F59E0B] fill-current" />
                ))}
              </div>
              <span className="font-bold text-[#78350F]">4.8</span>
              <span className="text-[#78350F]/60">(124 reviews)</span>
            </div>
          </div>
          <div className="space-y-4">
            {[
              {
                creator: "Sarah Johnson",
                rating: 5,
                review: "Amazing brand to work with! They value creativity and provide clear guidelines. Payments are always on time.",
                date: "1 week ago",
              },
              {
                creator: "Mike Chen",
                rating: 5,
                review: "Fashion Forward truly cares about sustainability and it shows in their campaigns. Great communication throughout.",
                date: "2 weeks ago",
              },
              {
                creator: "Emma Wilson",
                rating: 4,
                review: "Professional team with a clear vision. The campaign brief was detailed and easy to follow.",
                date: "1 month ago",
              },
            ].map((review, idx) => (
              <div key={idx} className="border-b border-[#FDE68A]/30 pb-4 last:border-0">
                <div className="flex items-start space-x-4">
                  <img src="./images/creator-avatar.jpg" className="w-10 h-10 rounded-full" alt="Creator avatar" data-context="Reviewing creator avatar" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-semibold text-[#78350F]">{review.creator}</div>
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