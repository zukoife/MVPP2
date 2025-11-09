
import * as Icons from "lucide-react";

export interface BrandDashboardScreenProps {
  state?: string;
}

/**
 * States:
 *  - default: Dashboard with performance cards and campaigns table
 */
export default function BrandDashboardScreen() {
  const getIcon = (name: keyof typeof Icons): React.ComponentType<React.SVGProps<SVGSVGElement>> => {
    return Icons[name] as React.ComponentType<React.SVGProps<SVGSVGElement>>;
  };

  return (
    <div className="min-h-screen bg-[#FEF3C7] font-[Plus_Jakarta_Sans]">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-[#FDE68A] p-6 z-40">
        <h1 className="text-2xl font-[Space_Grotesk] font-bold bg-gradient-to-r from-[#FB923C] to-[#EC4899] bg-clip-text text-transparent mb-8">
          Lynkkey
        </h1>
        <nav className="space-y-2">
          {[
            { icon: "LayoutDashboard", label: "Dashboard", active: true },
            { icon: "Briefcase", label: "My Campaigns" },
            { icon: "Users", label: "Discover Creators" },
            { icon: "MessageSquare", label: "Messages", badge: 5 },
            { icon: "CreditCard", label: "Billing" },
            { icon: "Settings", label: "Settings" },
          ].map((item, idx) => {
            const SidebarIcon = getIcon(item.icon as keyof typeof Icons);
            return (
              <a
                key={idx}
                href="#"
                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                  item.active
                    ? "bg-gradient-to-r from-[#FB923C]/20 to-[#EC4899]/20 text-[#EC4899]"
                    : "text-[#78350F] hover:bg-[#FEF3C7]"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <SidebarIcon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-[#EC4899] text-white text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-[#78350F]">
              Welcome back, Fashion Forward!
            </h2>
            <p className="text-[#78350F]/60">Here's your campaign performance overview</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative w-64">
              <Icons.Search className="absolute left-3 top-3 w-5 h-5 text-[#78350F]/40" />
              <input
                type="text"
                placeholder="Search creators..."
                className="w-full pl-10 pr-4 py-2 bg-white rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]"
              />
            </div>
            <div className="relative">
              <button className="w-10 h-10 bg-gradient-to-r from-[#FB923C] to-[#EC4899] rounded-full flex items-center justify-center text-white">
                <Icons.User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Performance Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            {
              label: "Campaign Views",
              value: "124.5K",
              change: "+18%",
              icon: "Eye",
              color: "from-blue-400 to-blue-600",
            },
            {
              label: "Conversions",
              value: "3,842",
              change: "+32%",
              icon: "Target",
              color: "from-green-400 to-green-600",
            },
            {
              label: "Total Spend",
              value: "$24,500",
              change: "+12%",
              icon: "DollarSign",
              color: "from-purple-400 to-purple-600",
            },
            {
              label: "Active Campaigns",
              value: "8",
              change: "+2%",
              icon: "Activity",
              color: "from-orange-400 to-orange-600",
            },
          ].map((metric, idx) => {
            const MetricIcon = getIcon(metric.icon as keyof typeof Icons);
            return (
              <div key={idx} className="bg-white rounded-xl p-6 border border-[#FDE68A]">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${metric.color} flex items-center justify-center`}>
                    <MetricIcon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm text-[#10B981] font-semibold">{metric.change}</span>
                </div>
                <div className="text-2xl font-bold text-[#78350F] mb-1">{metric.value}</div>
                <div className="text-sm text-[#78350F]/60">{metric.label}</div>
              </div>
            );
          })}
        </div>

        {/* Running Campaigns */}
        <div className="bg-white rounded-xl p-6 border border-[#FDE68A] mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-[#78350F]">
              Running Campaigns
            </h3>
            <a href="#" className="text-[#EC4899] hover:text-[#FB923C]">
              View all
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#FDE68A]">
                  <th className="text-left py-3 text-[#78350F]/60 font-semibold">Campaign</th>
                  <th className="text-left py-3 text-[#78350F]/60 font-semibold">Creator</th>
                  <th className="text-left py-3 text-[#78350F]/60 font-semibold">Budget</th>
                  <th className="text-left py-3 text-[#78350F]/60 font-semibold">Used</th>
                  <th className="text-left py-3 text-[#78350F]/60 font-semibold">Deadline</th>
                  <th className="text-left py-3 text-[#78350F]/60 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    campaign: "Summer Collection",
                    creator: "Sarah Johnson",
                    budget: "$1,500",
                    used: "75%",
                    deadline: "3 days",
                    status: "Active",
                  },
                  {
                    campaign: "Tech Product Launch",
                    creator: "Mike Chen",
                    budget: "$2,000",
                    used: "45%",
                    deadline: "7 days",
                    status: "Active",
                  },
                  {
                    campaign: "Food & Beverage",
                    creator: "Emma Wilson",
                    budget: "$800",
                    used: "90%",
                    deadline: "1 day",
                    status: "Reviewing",
                  },
                ].map((campaign, idx) => (
                  <tr key={idx} className="border-b border-[#FDE68A]/30 hover:bg-[#FEF3C7]/30 transition-all">
                    <td className="py-4">
                      <div className="font-semibold text-[#78350F]">{campaign.campaign}</div>
                    </td>
                    <td className="py-4 text-[#78350F]/70">{campaign.creator}</td>
                    <td className="py-4 text-[#78350F] font-semibold">{campaign.budget}</td>
                    <td className="py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-[#FEF3C7] rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-[#FB923C] to-[#EC4899] h-2 rounded-full"
                            style={{ width: campaign.used }}
                          ></div>
                        </div>
                        <span className="text-sm text-[#78350F]">{campaign.used}</span>
                      </div>
                    </td>
                    <td className="py-4 text-[#78350F]">{campaign.deadline}</td>
                    <td className="py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          campaign.status === "Active"
                            ? "bg-[#10B981]/20 text-[#10B981]"
                            : "bg-[#F59E0B]/20 text-[#F59E0B]"
                        }`}
                      >
                        {campaign.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Analytics */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-[#FDE68A]">
            <h3 className="text-lg font-semibold text-[#78350F] mb-4">
              Top Performing Creators
            </h3>
            <div className="space-y-3">
              {[
                { name: "Sarah Johnson", engagement: "9.2%", conversions: "342" },
                { name: "Mike Chen", engagement: "8.7%", conversions: "289" },
                { name: "Emma Wilson", engagement: "8.4%", conversions: "256" },
              ].map((creator, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src="./images/creator-avatar.jpg" className="w-8 h-8 rounded-full" alt="Creator avatar" data-context="Small creator profile picture" />
                    <div>
                      <div className="font-semibold text-[#78350F] text-sm">{creator.name}</div>
                      <div className="text-xs text-[#78350F]/60">{creator.engagement} engagement</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-[#78350F]">{creator.conversions}</div>
                    <div className="text-xs text-[#78350F]/60">conversions</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-[#FDE68A]">
            <h3 className="text-lg font-semibold text-[#78350F] mb-4">
              Engagement by Niche
            </h3>
            <div className="space-y-3">
              {[
                { niche: "Fashion", rate: "8.9%", color: "from-pink-400 to-pink-600" },
                { niche: "Technology", rate: "7.6%", color: "from-blue-400 to-blue-600" },
                { niche: "Lifestyle", rate: "7.2%", color: "from-purple-400 to-purple-600" },
                { niche: "Travel", rate: "6.8%", color: "from-green-400 to-green-600" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 bg-gradient-to-r ${item.color} rounded-full`}></div>
                    <span className="text-[#78350F]">{item.niche}</span>
                  </div>
                  <span className="font-semibold text-[#78350F]">{item.rate}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <button className="w-full py-4 bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all text-center">
          Create New Campaign
        </button>
      </div>
    </div>
  );
}
