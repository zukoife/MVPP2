import React from "react";
import * as Icons from "lucide-react";

export interface CreateCampaignScreenProps {
  state: string;
}

/**
 * States:
 *  - default: Full campaign creation form visible
 *  - otherNicheSelected: Custom niche input field visible
 */
export default function CreateCampaignScreen({ state }: CreateCampaignScreenProps) {
  const showCustomNiche = state === "otherNicheSelected";

  return (
    <div className="min-h-screen bg-[#FEF3C7] font-[Plus_Jakarta_Sans]">
      {/* Header */}
      <div className="bg-white border-b border-[#FDE68A]">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="text-[#78350F] hover:text-[#EC4899]">
                <Icons.ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-[#78350F]">Create Campaign</h1>
                <p className="text-[#78350F]/60">Set up your new brand collaboration</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="px-6 py-2 bg-[#FEF3C7] text-[#78350F] rounded-lg font-semibold hover:bg-[#FDE68A] transition-all">
                Save as Draft
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all">
                Publish Campaign
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-[#FDE68A]">
          <form className="space-y-6">
            {/* Campaign Title */}
            <div>
              <label className="block text-[#78350F] font-semibold mb-2">
                Campaign Title
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]"
                placeholder="e.g., Summer Fashion Collection Launch"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-[#78350F] font-semibold mb-2">
                Description
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]"
                placeholder="Describe your campaign goals, brand voice, and what you're looking for in creators..."
              />
            </div>

            {/* Budget */}
            <div>
              <label className="block text-[#78350F] font-semibold mb-2">
                Budget ($)
              </label>
              <input
                type="number"
                className="w-full px-4 py-3 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]"
                placeholder="1500"
              />
              <p className="text-sm text-[#78350F]/60 mt-1">
                This amount will be held in escrow until deliverables are approved
              </p>
            </div>

            {/* Deliverables */}
            <div>
              <label className="block text-[#78350F] font-semibold mb-2">
                Deliverables
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]"
                placeholder="• 3 Instagram posts with product tags&#10;• 1 YouTube video (3-5 minutes)&#10;• 5 Instagram Stories with swipe-up links"
              />
              <div className="mt-2 text-sm text-[#78350F]/60">
                Suggested formats:
                <div className="flex flex-wrap gap-2 mt-1">
                  {["Instagram Posts", "Stories", "YouTube Video", "TikTok", "Blog Post", "Twitter Thread"].map((format) => (
                    <button
                      key={format}
                      type="button"
                      className="px-3 py-1 bg-white text-[#78350F] rounded-full border border-[#FDE68A] text-xs hover:bg-[#FEF3C7] transition-all"
                    >
                      + {format}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-[#78350F] font-semibold mb-2">
                Deadline
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]"
              />
            </div>

            {/* Niche Selection */}
            <div>
              <label className="block text-[#78350F] font-semibold mb-2">
                Industry Niche
              </label>
              <select className="w-full px-4 py-3 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]">
                <option>Select a niche...</option>
                <option>Fashion & Beauty</option>
                <option>Technology</option>
                <option>Travel</option>
                <option>Food & Beverage</option>
                <option>Fitness & Health</option>
                <option>Lifestyle</option>
                <option>Gaming</option>
                <option>Other</option>
              </select>
              {showCustomNiche && (
                <input
                  type="text"
                  className="w-full mt-6 px-4 py-3 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]"
                  placeholder="Enter your custom niche..."
                />
              )}
            </div>

            {/* Platform Requirements */}
            <div>
              <label className="block text-[#78350F] font-semibold mb-2">
                Platform Requirements
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { platform: "Instagram", icon: "Instagram" },
                  { platform: "TikTok", icon: "Music" },
                  { platform: "YouTube", icon: "Youtube" },
                  { platform: "X (Twitter)", icon: "Twitter" },
                ].map((item) => {
                  const PlatformIcon = Icons[item.icon as keyof typeof Icons] as React.ComponentType<React.SVGProps<SVGSVGElement>>;
                  return (
                    <label key={item.platform} className="flex items-center space-x-3 p-3 bg-[#FEF3C7] rounded-lg cursor-pointer hover:bg-[#FDE68A] transition-all">
                      <input type="checkbox" className="w-4 h-4 text-[#EC4899]" />
                      <PlatformIcon className="w-5 h-5 text-[#78350F]" />
                      <span className="text-[#78350F]">{item.platform}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Additional Requirements */}
            <div>
              <label className="block text-[#78350F] font-semibold mb-2">
                Additional Requirements (Optional)
              </label>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input type="checkbox" className="w-4 h-4 text-[#EC4899]" />
                  <label className="text-[#78350F]">Minimum follower count</label>
                  <input
                    type="number"
                    className="w-24 px-3 py-1 bg-white text-[#78350F] rounded border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]"
                    placeholder="10000"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <input type="checkbox" className="w-4 h-4 text-[#EC4899]" />
                  <label className="text-[#78350F]">Minimum engagement rate</label>
                  <input
                    type="number"
                    className="w-24 px-3 py-1 bg-white text-[#78350F] rounded border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]"
                    placeholder="5"
                    step="0.1"
                  />
                  <span className="text-[#78350F]/60">%</span>
                </div>
                <div className="flex items-center space-x-3">
                  <input type="checkbox" className="w-4 h-4 text-[#EC4899]" />
                  <label className="text-[#78350F]">Verified creators only</label>
                </div>
              </div>
            </div>

            {/* Campaign Assets */}
            <div>
              <label className="block text-[#78350F] font-semibold mb-2">
                Campaign Assets (Optional)
              </label>
              <div className="border-2 border-dashed border-[#FDE68A] rounded-lg p-6 text-center hover:border-[#EC4899] transition-all cursor-pointer">
                <Icons.Paperclip className="w-8 h-8 text-[#78350F]/40 mx-auto mb-2" />
                <p className="text-[#78350F]/60">Upload brand guidelines, product images, or other assets</p>
                <p className="text-xs text-[#78350F]/40 mt-1">PDF, PNG, JPG up to 20MB</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}