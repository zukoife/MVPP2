
import * as Icons from "lucide-react";

export interface SettingsScreenProps {
  state?: string;
}

/**
 * States:
 *  - default: All settings sections visible
 *  - subscriptionUpgrade: Upgrade prompts visible for free tier
 *  - payoutSettings: Payout settings interface for creators
 */
export default function SettingsScreen({ state }: SettingsScreenProps) {
  const showUpgradePrompts = state === "subscriptionUpgrade";
  const showPayoutSettings = state === "payoutSettings";

  const getIcon = (name: keyof typeof Icons): React.ComponentType<React.SVGProps<SVGSVGElement>> => {
    return Icons[name] as React.ComponentType<React.SVGProps<SVGSVGElement>>;
  };

  // Determine active navigation item based on state
  const getActiveNavItem = () => {
    if (showUpgradePrompts) return "Subscription";
    if (showPayoutSettings) return "Payout Settings";
    return "Profile";
  };

  const activeNavItem = getActiveNavItem();

  // Upgrade prompt component to show on sections
  const UpgradePrompt = () => (
    <div className="bg-gradient-to-r from-[#FB923C]/10 to-[#EC4899]/10 rounded-lg p-4 mb-4 border border-[#FDE68A]">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icons.Lock className="w-5 h-5 text-[#EC4899]" />
          <div>
            <div className="font-semibold text-[#78350F]">Pro Feature</div>
            <div className="text-sm text-[#78350F]/60">Upgrade to unlock this section</div>
          </div>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all">
          Upgrade Now
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FEF3C7] font-[Plus_Jakarta_Sans]">
      {/* Header */}
      <div className="bg-white border-b border-[#FDE68A]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#78350F]">Settings</h1>
            <button className="w-10 h-10 bg-gradient-to-r from-[#FB923C] to-[#EC4899] rounded-full flex items-center justify-center text-white">
              <Icons.User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="col-span-1">
            <nav className="bg-white rounded-xl p-4 border border-[#FDE68A] sticky top-4">
              {[
                { icon: "User", label: "Profile" },
                { icon: "Link", label: "Social Integrations" },
                { icon: "Bell", label: "Notifications" },
                { icon: "Shield", label: "Security" },
                { icon: "CreditCard", label: "Subscription" },
                { icon: "DollarSign", label: "Payout Settings" },
              ].map((item, idx) => {
                const NavIcon = getIcon(item.icon as keyof typeof Icons);
                const isActive = item.label === activeNavItem;
                return (
                  <a
                    key={idx}
                    href="#"
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-[#FB923C]/20 to-[#EC4899]/20 text-[#EC4899]"
                        : "text-[#78350F] hover:bg-[#FEF3C7]"
                    }`}
                  >
                    <NavIcon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="col-span-3 space-y-6">
            {/* Profile Section */}
            <div className="bg-white rounded-xl p-6 border border-[#FDE68A]">
              <h2 className="text-xl font-semibold text-[#78350F] mb-6">Profile Information</h2>
              {showUpgradePrompts ? (
                <UpgradePrompt />
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img src="./images/creator-avatar.jpg" className="w-20 h-20 rounded-full" alt="Profile photo" data-context="Settings profile photo" />
                      <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border border-[#FDE68A]">
                        <Icons.Camera className="w-4 h-4 text-[#78350F]" />
                      </button>
                    </div>
                    <div>
                      <button className="px-4 py-2 bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all">
                        Change Photo
                      </button>
                      <button className="px-4 py-2 bg-[#FEF3C7] text-[#78350F] rounded-lg text-sm font-semibold hover:bg-[#FDE68A] transition-all ml-2">
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#78350F] font-semibold mb-2">Full Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]"
                        defaultValue="Sarah Johnson"
                      />
                    </div>
                    <div>
                      <label className="block text-[#78350F] font-semibold mb-2">Email</label>
                      <input
                        type="email"
                        className="w-full px-4 py-2 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]"
                        defaultValue="sarah@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#78350F] font-semibold mb-2">Bio</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-2 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]"
                      defaultValue="Creating authentic content around sustainable fashion..."
                    />
                  </div>
                  <button className="px-6 py-2 bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all">
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            {/* Social Integrations */}
            <div className="bg-white rounded-xl p-6 border border-[#FDE68A]">
              <h2 className="text-xl font-semibold text-[#78350F] mb-6">Social Integrations</h2>
              {showUpgradePrompts ? (
                <UpgradePrompt />
              ) : (
                <div className="space-y-4">
                  {[
                    { platform: "Instagram", connected: true, followers: "45.2K" },
                    { platform: "TikTok", connected: true, followers: "128.5K" },
                    { platform: "YouTube", connected: false, followers: "-" },
                    { platform: "X (Twitter)", connected: true, followers: "8.3K" },
                  ].map((social, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-[#FEF3C7] rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#FB923C] to-[#EC4899] rounded-lg flex items-center justify-center">
                          <Icons.Link className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-[#78350F]">{social.platform}</div>
                          <div className="text-sm text-[#78350F]/60">
                            {social.connected ? `${social.followers} followers` : "Not connected"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {social.connected && (
                          <button className="px-3 py-1 bg-white text-[#78350F] rounded-lg text-sm font-semibold hover:bg-[#FDE68A] transition-all">
                            <Icons.RefreshCw className="w-4 h-4 inline mr-1" />
                            Refresh
                          </button>
                        )}
                        <button
                          className={`px-3 py-1 rounded-lg text-sm font-semibold transition-all ${
                            social.connected
                              ? "bg-white text-[#78350F] hover:bg-[#FDE68A]"
                              : "bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white hover:shadow-lg hover:shadow-pink-300/50"
                          }`}
                        >
                          {social.connected ? "Disconnect" : "Connect"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-xl p-6 border border-[#FDE68A]">
              <h2 className="text-xl font-semibold text-[#78350F] mb-6">Notification Preferences</h2>
              {showUpgradePrompts ? (
                <UpgradePrompt />
              ) : (
                <div className="space-y-4">
                  {[
                    { label: "New campaign applications", enabled: true },
                    { label: "Campaign updates", enabled: true },
                    { label: "Payment notifications", enabled: true },
                    { label: "New messages", enabled: false },
                    { label: "Weekly performance summary", enabled: true },
                    { label: "Marketing emails", enabled: false },
                  ].map((notification, idx) => (
                    <label key={idx} className="flex items-center justify-between cursor-pointer">
                      <span className="text-[#78350F]">{notification.label}</span>
                      <div className="relative">
                        <input
                          type="checkbox"
                          className="sr-only"
                          defaultChecked={notification.enabled}
                        />
                        <div className={`w-12 h-6 rounded-full transition-colors ${
                          notification.enabled ? "bg-gradient-to-r from-[#FB923C] to-[#EC4899]" : "bg-[#FDE68A]"
                        }`}>
                          <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                            notification.enabled ? "translate-x-6" : "translate-x-0.5"
                          }`}></div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Security */}
            <div className="bg-white rounded-xl p-6 border border-[#FDE68A]">
              <h2 className="text-xl font-semibold text-[#78350F] mb-6">Security</h2>
              {showUpgradePrompts ? (
                <UpgradePrompt />
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[#78350F] font-semibold mb-2">Change Password</label>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="password"
                        className="w-full px-4 py-2 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]"
                        placeholder="New password"
                      />
                      <input
                        type="password"
                        className="w-full px-4 py-2 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]"
                        placeholder="Confirm password"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#FEF3C7] rounded-lg">
                    <div>
                      <div className="font-semibold text-[#78350F]">Two-Factor Authentication</div>
                      <div className="text-sm text-[#78350F]/60">Add an extra layer of security to your account</div>
                    </div>
                    <button className="px-4 py-2 bg-white text-[#78350F] rounded-lg text-sm font-semibold hover:bg-[#FDE68A] transition-all">
                      Enable
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Subscription */}
            <div className="bg-white rounded-xl p-6 border border-[#FDE68A]">
              <h2 className="text-xl font-semibold text-[#78350F] mb-6">Subscription</h2>
              {showUpgradePrompts ? (
                <div className="bg-gradient-to-r from-[#FB923C]/10 to-[#EC4899]/10 rounded-lg p-6 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-bold text-[#78350F] mb-1">Free Plan</div>
                      <div className="text-sm text-[#78350F]/60">3 applications/month</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#78350F]">$0</div>
                      <div className="text-sm text-[#78350F]/60">/month</div>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-[#78350F]/60">
                      <Icons.X className="w-4 h-4 text-red-500 mr-2" />
                      Unlimited campaign applications
                    </div>
                    <div className="flex items-center text-sm text-[#78350F]/60">
                      <Icons.X className="w-4 h-4 text-red-500 mr-2" />
                      Advanced analytics
                    </div>
                    <div className="flex items-center text-sm text-[#78350F]/60">
                      <Icons.Check className="w-4 h-4 text-[#10B981] mr-2" />
                      Basic profile features
                    </div>
                  </div>
                  <button className="w-full py-2 bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all">
                    Upgrade to Pro
                  </button>
                </div>
              ) : (
                <div className="bg-[#FEF3C7] rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-bold text-[#78350F] mb-1">Pro Plan</div>
                      <div className="text-sm text-[#78350F]/60">Unlimited applications</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#78350F]">$60</div>
                      <div className="text-sm text-[#78350F]/60">/month</div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-white text-[#78350F] rounded-lg text-sm font-semibold hover:bg-[#FDE68A] transition-all">
                    Manage Subscription
                  </button>
                </div>
              )}
            </div>

            {/* Payout Settings */}
            {showPayoutSettings && (
              <div className="bg-white rounded-xl p-6 border border-[#FDE68A]">
                <h2 className="text-xl font-semibold text-[#78350F] mb-6">Payout Settings</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-[#FEF3C7] rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                          <Icons.DollarSign className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-[#78350F]">PayPal</div>
                          <div className="text-sm text-[#78350F]/60">sarah@example.com</div>
                        </div>
                      </div>
                      <button className="px-3 py-1 bg-white text-[#78350F] rounded-lg text-sm font-semibold hover:bg-[#FDE68A] transition-all">
                        Edit
                      </button>
                    </div>
                  </div>
                  <div className="p-4 bg-[#FEF3C7] rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                          <Icons.CreditCard className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-[#78350F]">Bank Account</div>
                          <div className="text-sm text-[#78350F]/60">****1234</div>
                        </div>
                      </div>
                      <button className="px-3 py-1 bg-white text-[#78350F] rounded-lg text-sm font-semibold hover:bg-[#FDE68A] transition-all">
                        Edit
                      </button>
                    </div>
                  </div>
                  <button className="w-full py-2 bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all">
                    Add Payment Method
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}