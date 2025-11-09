
import * as Icons from "lucide-react";

export interface DiscoverCreatorsScreenProps {
  state?: string;
}

/**
 * States:
 *  - default: Search results with filter sidebar
 *  - filtersOpen: Filters expanded and applied
 */
export default function DiscoverCreatorsScreen({ state }: DiscoverCreatorsScreenProps) {
  const filtersActive = state === "filtersOpen";

  const getIcon = (name: keyof typeof Icons): React.ComponentType<React.SVGProps<SVGSVGElement>> => {
    return Icons[name] as React.ComponentType<React.SVGProps<SVGSVGElement>>;
  };

  return (
    <div className="min-h-screen bg-[#FEF3C7] font-[Plus_Jakarta_Sans]">
      {/* Header */}
      <div className="bg-white border-b border-[#FDE68A]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#78350F]">Discover Creators</h1>
            <div className="flex items-center space-x-4">
              <div className="relative w-full max-w-xs">
                <Icons.Search className="absolute left-3 top-3 w-5 h-5 text-[#78350F]/40" />
                <input
                  type="text"
                  placeholder="Search creators..."
                  className="w-full pl-10 pr-4 py-2 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]"
                />
              </div>
              <button className="w-10 h-10 bg-gradient-to-r from-[#FB923C] to-[#EC4899] rounded-full flex items-center justify-center text-white">
                <Icons.User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <div className={`w-80 ${filtersActive ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl p-4 md:p-6 border border-[#FDE68A] sticky top-0">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-[#78350F]">Filters</h3>
                {filtersActive && (
                  <button className="px-3 py-1 text-sm text-[#EC4899] hover:text-[#FB923C]">
                    Clear all
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Niche */}
                <div>
                  <h4 className="font-semibold text-[#78350F] mb-3">Niche</h4>
                  <div className="space-y-2">
                    {["Beauty", "Fashion", "Technology", "Travel", "Food", "Fitness", "Lifestyle"].map((niche) => (
                      <label key={niche} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-[#EC4899]"
                          defaultChecked={filtersActive && niche === "Beauty"}
                        />
                        <span className="text-[#78350F]">{niche}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Follower Count */}
                <div>
                  <h4 className="font-semibold text-[#78350F] mb-3">Follower Count</h4>
                  <div className="space-y-2">
                    {[
                      { label: "Under 10K", min: 0, max: 10000 },
                      { label: "10K - 50K", min: 10000, max: 50000 },
                      { label: "50K - 100K", min: 50000, max: 100000 },
                      { label: "100K+", min: 100000, max: 1000000 },
                    ].map((range) => (
                      <label key={range.label} className="flex items-center space-x-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="followers" 
                          className="w-4 h-4 text-[#EC4899]"
                          defaultChecked={filtersActive && range.label === "50K - 100K"}
                        />
                        <span className="text-[#78350F]">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Platform */}
                <div>
                  <h4 className="font-semibold text-[#78350F] mb-3">Platform</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { platform: "Instagram", icon: "Instagram" },
                      { platform: "TikTok", icon: "Music" },
                      { platform: "YouTube", icon: "Youtube" },
                      { platform: "X (Twitter)", icon: "Twitter" },
                    ].map((item) => {
                      const PlatformIcon = getIcon(item.icon as keyof typeof Icons);
                      return (
                        <label key={item.platform} className="flex items-center space-x-2 p-2 bg-[#FEF3C7] rounded cursor-pointer hover:bg-[#FDE68A] transition-all">
                          <input 
                            type="checkbox" 
                            className="w-4 h-4 text-[#EC4899]"
                            defaultChecked={filtersActive && item.platform === "Instagram"}
                          />
                          <PlatformIcon className="w-4 h-4 text-[#78350F]" />
                          <span className="text-[#78350F] text-sm">{item.platform}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h4 className="font-semibold text-[#78350F] mb-3">Minimum Rating</h4>
                  <select 
                    className="w-full px-3 py-2 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]"
                    defaultValue={filtersActive ? "4 stars & up" : "Any rating"}
                  >
                    <option>Any rating</option>
                    <option>4 stars & up</option>
                    <option>4.5 stars & up</option>
                    <option>5 stars only</option>
                  </select>
                </div>

                {/* Engagement Rate */}
                <div>
                  <h4 className="font-semibold text-[#78350F] mb-3">Engagement Rate</h4>
                  <div className="space-y-2">
                    {[
                      { label: "Under 3%", min: 0, max: 3 },
                      { label: "3% - 5%", min: 3, max: 5 },
                      { label: "5% - 8%", min: 5, max: 8 },
                      { label: "8%+", min: 8, max: 100 },
                    ].map((range) => (
                      <label key={range.label} className="flex items-center space-x-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="engagement" 
                          className="w-4 h-4 text-[#EC4899]"
                          defaultChecked={filtersActive && range.label === "5% - 8%"}
                        />
                        <span className="text-[#78350F]">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 mt-0 lg:mt-0">
            {/* Recommended Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#78350F] mb-4">Recommended For You</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                  <div key={i} className="bg-gradient-to-r from-[#FB923C]/5 to-[#EC4899]/5 rounded-xl p-4 border border-[#FDE68A]">
                    <div className="flex items-start space-x-4">
                      <img src="./images/creator-avatar.jpg" className="w-16 h-16 rounded-full" alt="Creator profile" data-context="Recommended creator avatar" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-[#78350F]">Sarah Johnson</h4>
                          <Icons.CheckCircle className="w-4 h-4 text-[#10B981]" />
                        </div>
                        <p className="text-sm text-[#78350F]/60 mb-2">Fashion & Lifestyle • 45.2K followers</p>
                        <p className="text-sm text-[#78350F]/70 mb-3">Perfect match for your beauty campaigns</p>
                        <button className="px-4 py-2 bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all">
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Search Results */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-[#78350F]">
                  Search Results {filtersActive && "(24 filtered)"}
                </h3>
                <select className="px-4 py-2 bg-white text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]">
                  <option>Sort by: Most Relevant</option>
                  <option>Sort by: Followers</option>
                  <option>Sort by: Engagement</option>
                  <option>Sort by: Rating</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: "Emma Wilson", niche: "Fashion", followers: "89.5K", engagement: "9.1%", rating: 4.9, verified: true },
                  { name: "Mike Chen", niche: "Travel", followers: "32.1K", engagement: "6.2%", rating: 4.7, verified: true },
                  { name: "Lisa Anderson", niche: "Beauty", followers: "156.2K", engagement: "8.4%", rating: 4.8, verified: true },
                  { name: "David Kim", niche: "Tech", followers: "67.8K", engagement: "7.3%", rating: 4.6, verified: false },
                  { name: "Sophie Turner", niche: "Lifestyle", followers: "23.4K", engagement: "5.9%", rating: 4.5, verified: false },
                  { name: "Alex Rivera", niche: "Fitness", followers: "41.7K", engagement: "8.1%", rating: 4.9, verified: true },
                ].map((creator, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4 md:p-6 border border-[#FDE68A] hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <img src="./images/creator-avatar.jpg" className="w-12 h-12 rounded-full" alt="Creator avatar" data-context="Creator profile picture in card" />
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-[#78350F]">{creator.name}</h4>
                            {creator.verified && (
                              <Icons.CheckCircle className="w-4 h-4 text-[#10B981]" />
                            )}
                          </div>
                          <p className="text-sm text-[#78350F]/60">{creator.niche}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#78350F]/60">Followers</span>
                        <span className="font-semibold text-[#78350F]">{creator.followers}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#78350F]/60">Engagement</span>
                        <span className="font-semibold text-[#78350F]">{creator.engagement}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#78350F]/60">Rating</span>
                        <div className="flex items-center space-x-1">
                          <Icons.Star className="w-4 h-4 text-[#F59E0B] fill-current" />
                          <span className="font-semibold text-[#78350F]">{creator.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex-1 py-2 bg-[#FEF3C7] text-[#78350F] rounded-lg text-sm font-semibold hover:bg-[#FDE68A] transition-all">
                        View Profile
                      </button>
                      <button className="flex-1 py-2 bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all">
                        Invite
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center space-x-2 mt-8">
                <button className="p-2 text-[#78350F]/60 hover:text-[#78350F]">
                  <Icons.ChevronLeft className="w-5 h-5" />
                </button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                      page === 1
                        ? "bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white"
                        : "text-[#78350F] hover:bg-[#FEF3C7]"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="p-2 text-[#78350F]/60 hover:text-[#78350F]">
                  <Icons.ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}