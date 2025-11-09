
import * as Icons from "lucide-react";

export interface DiscoverCampaignsScreenProps {
  state?: string;
}

/**
 * States:
 *  - default: Search results with filter sidebar
 *  - filtersActive: Filters applied and sidebar expanded
 */
export default function DiscoverCampaignsScreen({
  state,
}: DiscoverCampaignsScreenProps) {
  const filtersActive = state === "filtersActive";

  return (
    <div className="min-h-screen bg-[#FEF3C7] font-[Open_Sans]">
      {/* Header */}
      <div className="bg-white border-b border-[#FDE68A]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#78350F]">
              Discover Campaigns
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Icons.Search className="absolute left-3 top-3 w-5 h-5 text-[#78350F]/40" />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  className="w-full max-w-xs pl-10 pr-4 py-2 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]"
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
          <div
            className={`w-80 hidden lg:block`}
          >
            <div className="bg-white rounded-xl p-4 md:p-6 border border-[#FDE68A] sticky top-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-[#78350F]">Filters</h3>
                {filtersActive && (
                  <button className="text-sm text-[#EC4899] hover:text-[#FB923C]">
                    Clear all
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Industry Niche */}
                <div>
                  <h4 className="font-semibold text-[#78350F] mb-3">
                    Industry Niche
                  </h4>
                  <div className="space-y-2">
                    {[
                      "Fashion",
                      "Technology",
                      "Travel",
                      "Food & Beverage",
                      "Fitness",
                      "Lifestyle",
                    ].map((niche) => (
                      <label
                        key={niche}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-[#EC4899]"
                        />
                        <span className="text-[#78350F]">{niche}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Budget Range */}
                <div>
                  <h4 className="font-semibold text-[#78350F] mb-3">
                    Budget Range
                  </h4>
                  <div className="space-y-2">
                    {[
                      { label: "Under $500", min: 0, max: 500 },
                      { label: "$500 - $2,000", min: 500, max: 2000 },
                      { label: "$2,000 - $5,000", min: 2000, max: 5000 },
                      { label: "$5,000+", min: 5000, max: 50000 },
                    ].map((range) => (
                      <label
                        key={range.label}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="budget"
                          className="w-4 h-4 text-[#EC4899]"
                          defaultChecked={
                            filtersActive &&
                            range.min === 500 &&
                            range.max === 2000
                          }
                        />
                        <span className="text-[#78350F]">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Platform Requirements */}
                <div>
                  <h4 className="font-semibold text-[#78350F] mb-3">
                    Platform Requirements
                  </h4>
                  <div className="space-y-2">
                    {["Instagram", "TikTok", "YouTube", "X (Twitter)"].map(
                      (platform) => (
                        <label
                          key={platform}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-[#EC4899]"
                            defaultChecked={
                              filtersActive && platform === "Instagram"
                            }
                          />
                          <span className="text-[#78350F]">{platform}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                {/* Deadline */}
                <div>
                  <h4 className="font-semibold text-[#78350F] mb-3">
                    Deadline
                  </h4>
                  <div className="space-y-2">
                    {[
                      { label: "Within 1 week", days: 7 },
                      { label: "Within 2 weeks", days: 14 },
                      { label: "Within 1 month", days: 30 },
                      { label: "No deadline", days: null },
                    ].map((option) => (
                      <label
                        key={option.label}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="deadline"
                          className="w-4 h-4 text-[#EC4899]"
                        />
                        <span className="text-[#78350F]">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Recommended Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#78350F] mb-4">
                Recommended Campaigns
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-r from-[#FB923C]/5 to-[#EC4899]/5 rounded-xl p-4 border border-[#FDE68A]"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src="./images/brand-logo.jpg"
                        className="w-16 h-16 rounded-lg"
                        alt="Brand logo"
                        data-context="Recommended campaign brand logo"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-[#78350F] mb-1">
                          Summer Fashion Collection
                        </h4>
                        <p className="text-sm text-[#78350F]/60 mb-2">
                          Fashion Forward • $1,500
                        </p>
                        <p className="text-sm text-[#78350F]/70 mb-3">
                          Perfect match for your fashion content style
                        </p>
                        <button className="px-4 py-2 bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all">
                          Apply Now
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
                  All Campaigns{" "}
                  {filtersActive && "(18 filtered)"}
                </h3>
                <select className="w-full max-w-xs px-4 py-2 bg-white text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]">
                  <option>Sort by: Most Recent</option>
                  <option>Sort by: Budget (High to Low)</option>
                  <option>Sort by: Deadline</option>
                  <option>Sort by: Best Match</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    brand: "TechGadgets",
                    title: "Tech Product Review Series",
                    industry: "Technology",
                    budget: "$2,000",
                    deadline: "2 weeks",
                    applicants: 12,
                  },
                  {
                    brand: "HealthyEats",
                    title: "Recipe Video Campaign",
                    industry: "Food & Beverage",
                    budget: "$800",
                    deadline: "1 week",
                    applicants: 8,
                  },
                  {
                    brand: "FitLife",
                    title: "Fitness Challenge",
                    industry: "Fitness",
                    budget: "$1,200",
                    deadline: "3 weeks",
                    applicants: 15,
                  },
                  {
                    brand: "Wanderlust",
                    title: "Travel Adventure Series",
                    industry: "Travel",
                    budget: "$3,000",
                    deadline: "1 month",
                    applicants: 23,
                  },
                  {
                    brand: "GlowUp",
                    title: "Beauty Tutorial Campaign",
                    industry: "Beauty",
                    budget: "$1,500",
                    deadline: "2 weeks",
                    applicants: 18,
                  },
                  {
                    brand: "GameZone",
                    title: "Gaming Sponsorship",
                    industry: "Gaming",
                    budget: "$2,500",
                    deadline: "1 week",
                    applicants: 31,
                  },
                ].map((campaign, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl p-4 md:p-6 border border-[#FDE68A] hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <img
                        src="./images/brand-logo.jpg"
                        className="w-12 h-12 rounded-lg"
                        alt="Brand logo"
                        data-context="Campaign brand logo"
                      />
                      <span className="px-2 py-1 bg-[#10B981]/20 text-[#10B981] rounded-full text-xs font-semibold">
                        {campaign.applicants} applied
                      </span>
                    </div>
                    <h4 className="font-semibold text-[#78350F] mb-1">
                      {campaign.title}
                    </h4>
                    <p className="text-sm text-[#78350F]/60 mb-3">
                      {campaign.brand} • {campaign.industry}
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#78350F]/60">Budget</span>
                        <span className="font-semibold text-[#78350F]">
                          {campaign.budget}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#78350F]/60">Deadline</span>
                        <span className="font-semibold text-[#78350F]">
                          {campaign.deadline}
                        </span>
                      </div>
                    </div>
                    <button className="w-full py-2 bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all group-hover:scale-105 transform">
                      Apply Now
                    </button>
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