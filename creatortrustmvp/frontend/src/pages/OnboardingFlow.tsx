
import * as Icons from "lucide-react";

export interface OnboardingFlowScreenProps {
  state?: string;
}

/**
 * States:
 *  - default: Step 1 - Profile Setup
 *  - socialIntegration: Step 2 - Social Integration
 *  - nicheSelection: Step 3 - Niche Selection
 *  - contentSamples: Step 4 - Content Samples Upload
 *  - tutorial: Step 5 - Interactive Tutorial
 *  - completionScreen: Completion Screen
 */
export default function OnboardingFlowScreen({ state }: OnboardingFlowScreenProps) {
  const currentStep = state === "default" ? 1 : 
                     state === "socialIntegration" ? 2 :
                     state === "nicheSelection" ? 3 :
                     state === "contentSamples" ? 4 :
                     state === "tutorial" ? 5 : 6;

  const getStepTitle = () => {
    switch(currentStep) {
      case 1: return "Profile Setup";
      case 2: return "Social Integration";
      case 3: return "Niche Selection";
      case 4: return "Content Samples";
      case 5: return "Interactive Tutorial";
      case 6: return "You're All Set!";
      default: return "";
    }
  };

  const getStepDescription = () => {
    switch(currentStep) {
      case 1: return "Let's start with your basic profile information";
      case 2: return "Connect your social media accounts";
      case 3: return "Select your primary content niche";
      case 4: return "Upload your best content samples";
      case 5: return "Learn how to use Lynkkey effectively";
      case 6: return "Your profile is ready to start collaborating";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-[#FEF3C7] font-[Plus_Jakarta_Sans]">
      {/* Progress Bar - Hidden on completion screen */}
      {currentStep !== 6 && (
        <div className="bg-white border-b border-[#FDE68A] px-6 py-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-[Space_Grotesk] font-bold bg-gradient-to-r from-[#FB923C] to-[#EC4899] bg-clip-text text-transparent">
                Lynkkey Onboarding
              </h1>
              <span className="text-sm text-[#78350F]/60">Step {currentStep} of 5</span>
            </div>
            <div className="w-full bg-[#FEF3C7] rounded-full h-2">
              <div
                className="bg-gradient-to-r from-[#FB923C] to-[#EC4899] h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((currentStep / 5) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#78350F] mb-2">
            {getStepTitle()}
          </h2>
          <p className="text-[#78350F]/60">
            {getStepDescription()}
          </p>
        </div>

        {/* Step 1: Profile Setup */}
        {currentStep === 1 && (
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-[#FDE68A]">
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-r from-[#FB923C] to-[#EC4899] rounded-full flex items-center justify-center">
                    <Icons.Camera className="w-8 h-8 text-white" />
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border border-[#FDE68A]">
                    <Icons.Pencil className="w-4 h-4 text-[#78350F]" />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-[#78350F] font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-[#78350F] font-semibold mb-2">
                  Bio
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]"
                  placeholder="Tell brands about yourself and your content style..."
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button className="px-6 py-3 bg-[#FEF3C7] text-[#78350F] rounded-lg font-semibold hover:bg-[#FDE68A] transition-all">
                  Skip for now
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all">
                  Next Step
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Social Integration */}
        {currentStep === 2 && (
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-[#FDE68A]">
            <div className="space-y-4">
              <div className="flex justify-end mb-4">
                <button className="flex items-center space-x-2 px-4 py-2 bg-[#FEF3C7] text-[#78350F] rounded-lg font-semibold hover:bg-[#FDE68A] transition-all">
                  <Icons.RefreshCw className="w-4 h-4" />
                  <span>Refresh</span>
                </button>
              </div>
              {[
                { platform: "Instagram", icon: "Instagram", color: "from-purple-500 to-pink-500", connected: true, followers: "45.2K" },
                { platform: "TikTok", icon: "Music", color: "from-gray-800 to-black", connected: false, followers: "-" },
                { platform: "YouTube", icon: "Youtube", color: "from-red-500 to-red-600", connected: true, followers: "12.8K" },
                { platform: "X (Twitter)", icon: "Twitter", color: "from-blue-400 to-blue-500", connected: false, followers: "-" }
              ].map((social, idx) => {
                const SocialIcon = Icons[social.icon as keyof typeof Icons] as React.ComponentType<React.SVGProps<SVGSVGElement>>;
                return (
                  <div key={idx} className="flex items-center justify-between p-4 bg-[#FEF3C7] rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${social.color} rounded-lg flex items-center justify-center`}>
                        <SocialIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-[#78350F]">{social.platform}</div>
                        <div className="text-sm text-[#78350F]/60">
                          {social.connected ? `${social.followers} followers` : "Not connected"}
                        </div>
                      </div>
                    </div>
                    <button
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        social.connected
                          ? "bg-white text-[#78350F] border border-[#FDE68A] hover:bg-[#FEF3C7]"
                          : "bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white hover:shadow-lg hover:shadow-pink-300/50"
                      }`}
                    >
                      {social.connected ? "Disconnect" : "Connect"}
                    </button>
                  </div>
                );
              })}
              <div className="flex justify-end space-x-3 pt-4">
                <button className="px-6 py-3 bg-[#FEF3C7] text-[#78350F] rounded-lg font-semibold hover:bg-[#FDE68A] transition-all">
                  Back
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all">
                  Next Step
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Niche Selection */}
        {currentStep === 3 && (
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-[#FDE68A]">
            <div className="space-y-6">
              <div>
                <label className="block text-[#78350F] font-semibold mb-2">
                  Primary Niche
                </label>
                <select className="w-full px-4 py-3 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]">
                  <option>Select your niche...</option>
                  <option>Fashion & Beauty</option>
                  <option>Technology</option>
                  <option>Travel</option>
                  <option>Food & Cooking</option>
                  <option>Fitness & Health</option>
                  <option>Lifestyle</option>
                  <option>Gaming</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="hidden" data-show-when-niche="other">
                <label className="block text-[#78350F] font-semibold mb-2">
                  Custom Niche
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]"
                  placeholder="Enter your custom niche..."
                />
              </div>
              <div>
                <label className="block text-[#78350F] font-semibold mb-2">
                  Secondary Niches (Optional)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {["Fashion", "Tech", "Travel", "Food", "Fitness", "Lifestyle", "Gaming", "Art"].map((niche) => (
                    <label key={niche} className="flex items-center space-x-2 p-3 bg-[#FEF3C7] rounded-lg cursor-pointer hover:bg-[#FDE68A] transition-all">
                      <input type="checkbox" className="w-4 h-4 text-[#EC4899]" />
                      <span className="text-[#78350F]">{niche}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button className="px-6 py-3 bg-[#FEF3C7] text-[#78350F] rounded-lg font-semibold hover:bg-[#FDE68A] transition-all">
                  Back
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all">
                  Next Step
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Content Samples */}
        {currentStep === 4 && (
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-[#FDE68A]">
            <div className="space-y-6">
              <div className="border-2 border-dashed border-[#FDE68A] rounded-lg p-8 text-center hover:border-[#EC4899] transition-all cursor-pointer">
                <Icons.Upload className="w-12 h-12 text-[#78350F]/40 mx-auto mb-2" />
                <p className="text-[#78350F] font-semibold mb-1">Upload Content Samples</p>
                <p className="text-sm text-[#78350F]/60">Add your best work to showcase your style</p>
                <p className="text-xs text-[#78350F]/40 mt-2">PNG, JPG, MP4 up to 50MB</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="relative group">
                    <div className="aspect-square bg-[#FEF3C7] rounded-lg overflow-hidden">
                      <img src="./images/content-sample.jpg" className="w-full h-full object-cover" alt="Content sample" data-context="Sample content image" />
                    </div>
                    <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                      <Icons.X className="w-4 h-4 text-[#78350F]" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex justify-end space-x-3">
                <button className="px-6 py-3 bg-[#FEF3C7] text-[#78350F] rounded-lg font-semibold hover:bg-[#FDE68A] transition-all">
                  Back
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all">
                  Next Step
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Interactive Tutorial */}
        {currentStep === 5 && (
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-[#FDE68A]">
            <div className="space-y-6">
              <div className="relative bg-[#FEF3C7] rounded-lg p-6">
                <div className="absolute top-2 right-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#FB923C] to-[#EC4899] rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
                    1
                  </div>
                </div>
                <h3 className="font-bold text-[#78350F] mb-2">Discover Campaigns</h3>
                <p className="text-[#78350F]/70 mb-4">
                  Browse through available campaigns and apply to those that match your style
                </p>
                <div className="bg-white rounded-lg p-3">
                  <div className="flex items-center space-x-3">
                    <Icons.Search className="w-5 h-5 text-[#78350F]/40" />
                    <span className="text-[#78350F]/60">Search and filter campaigns...</span>
                  </div>
                </div>
              </div>
              <div className="relative bg-[#FEF3C7] rounded-lg p-6">
                <div className="absolute top-2 right-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#FB923C] to-[#EC4899] rounded-full flex items-center justify-center text-white text-xs font-bold">
                    2
                  </div>
                </div>
                <h3 className="font-bold text-[#78350F] mb-2">Track Your Progress</h3>
                <p className="text-[#78350F]/70 mb-4">
                  Monitor your campaign performance and earnings from the dashboard
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-white rounded p-2 text-center">
                    <div className="text-lg font-bold text-[#78350F]">$0</div>
                    <div className="text-xs text-[#78350F]/60">Earnings</div>
                  </div>
                  <div className="bg-white rounded p-2 text-center">
                    <div className="text-lg font-bold text-[#78350F]">0</div>
                    <div className="text-xs text-[#78350F]/60">Campaigns</div>
                  </div>
                  <div className="bg-white rounded p-2 text-center">
                    <div className="text-lg font-bold text-[#78350F]">0%</div>
                    <div className="text-xs text-[#78350F]/60">Engagement</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button className="px-6 py-3 bg-[#FEF3C7] text-[#78350F] rounded-lg font-semibold hover:bg-[#FDE68A] transition-all">
                  Skip Tutorial
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all">
                  Complete Setup
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Completion Screen */}
        {currentStep === 6 && (
          <div className="text-center">
            <div className="bg-white rounded-2xl p-12 shadow-xl border border-[#FDE68A]">
              <div className="w-20 h-20 bg-gradient-to-r from-[#FB923C] to-[#EC4899] rounded-full flex items-center justify-center mx-auto mb-6">
                <Icons.Check className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-[#78350F] mb-4">
                You're All Set!
              </h2>
              <p className="text-[#78350F]/60 mb-8 max-w-md mx-auto">
                Your profile is complete and ready. Start discovering amazing campaigns and collaborate with brands you love.
              </p>
              <button className="px-8 py-4 bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all">
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}