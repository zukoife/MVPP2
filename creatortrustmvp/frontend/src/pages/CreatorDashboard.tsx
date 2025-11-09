import React from "react";
import * as Icons from "lucide-react";

export interface CreatorDashboardScreenProps {
  state: string;
}

/**
 * States:
 *  - default: Dashboard with KPI cards, performance graph, and active campaigns
 *  - freeTierLimitReached: Upgrade prompt modal visible
 */
export default function CreatorDashboardScreen({
  state,
}: CreatorDashboardScreenProps) {
  const showUpgradeModal = state === "freeTierLimitReached";

  // Helper to safely cast an icon name to a component type
  const getIcon = (
    name: keyof typeof Icons
  ): React.ComponentType<React.SVGProps<SVGSVGElement>> => {
    return Icons[name] as React.ComponentType<React.SVGProps<SVGSVGElement>>;
  };

  return (
    <div className="min-h-screen bg-[#FEF3C7] font-[Open_Sans]">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-[#FDE68A] p-6 z-40">
        <h1 className="text-2xl font-[Space_Grotesk] font-bold bg-gradient-to-r from-[#FB923C] to-[#EC4899] bg-clip-text text-transparent mb-8">
          Lynkkey
        </h1>
        <nav className="space-y-2">
          {[
            { icon: "LayoutDashboard", label: "Dashboard", active: true },
            { icon: "Briefcase", label: "Campaigns" },
            { icon: "DollarSign", label: "Earnings" },
            { icon: "MessageSquare", label: "Messages", badge: 3 },
            { icon: "Star", label: "Reviews" },
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
              Welcome back, Sarah!
            </h2>
            <p className="text-[#78350F]/60">Here's your performance overview</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Icons.Search className="absolute left-3 top-3 w-5 h-5 text-[#78350F]/40" />
              <input
                type="text"
                placeholder="Search campaigns..."
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

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            {
              label: "Total Campaigns",
              value: "24",
              change: "+12%",
              icon: "Briefcase",
              color: "from-blue-400 to-blue-600",
            },
            {
              label: "Earnings (This Month)",
              value: "$3,842",
              change: "+23%",
              icon: "DollarSign",
              color: "from-green-400 to-green-600",
            },
            {
              label: "Engagement Rate",
              value: "8.4%",
              change: "+2.1%",
              icon: "TrendingUp",
              color: "from-purple-400 to-purple-600",
            },
            {
              label: "Active Deals",
              value: "5",
              change: "0%",
              icon: "Activity",
              color: "from-orange-400 to-orange-600",
            },
          ].map((kpi, idx) => {
            const KpiIcon = getIcon(kpi.icon as keyof typeof Icons);
            return (
              <div key={idx} className="bg-white rounded-xl p-6 border border-[#FDE68A]">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${kpi.color} flex items-center justify-center`}>
                    <KpiIcon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm text-[#10B981] font-semibold">{kpi.change}</span>
                </div>
                <div className="text-2xl font-bold text-[#78350F] mb-1">{kpi.value}</div>
                <div className="text-sm text-[#78350F]/60">{kpi.label}</div>
              </div>
            );
          })}
        </div>

        {/* Performance Graph */}
        <div className="bg-white rounded-xl p-6 border border-[#FDE68A] mb-8">
          <h3 className="text-lg font-semibold text-[#78350F] mb-4">
            Performance Overview
          </h3>
          <div className="h-64 bg-gradient-to-r from-[#FB923C]/10 to-[#EC4899]/10 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Icons.BarChart3 className="w-12 h-12 text-[#EC4899] mx-auto mb-2" />
              <p className="text-[#78350F]/60">Analytics visualization</p>
            </div>
          </div>
        </div>

        {/* Active Campaigns */}
        <div className="bg-white rounded-xl p-6 border border-[#FDE68A] mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-[#78350F]">
              Active Campaigns
            </h3>
            <a href="#" className="text-[#EC4899] hover:text-[#FB923C]">
              View all
            </a>
          </div>
          <div className="space-y-4">
            {[
              {
                brand: "Fashion Forward",
                title: "Summer Collection Launch",
                progress: 75,
                deadline: "3 days",
                payment: "In Escrow",
              },
              {
                brand: "TechGadgets",
                title: "Gadget Review Series",
                progress: 45,
                deadline: "7 days",
                payment: "Pending",
              },
              {
                brand: "HealthyEats",
                title: "Recipe Video Campaign",
                progress: 90,
                deadline: "1 day",
                payment: "Released",
              },
            ].map((campaign, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-[#FEF3C7] rounded-lg"
              >
                <div className="flex-1">
                  <div className="font-semibold text-[#78350F]">
                    {campaign.title}
                  </div>
                  <div className="text-sm text-[#78350F]/60">{campaign.brand}</div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#78350F]/60">Progress</span>
                    <span className="text-[#78350F] font-semibold">
                      {campaign.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-white rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#FB923C] to-[#EC4899] h-2 rounded-full"
                      style={{ width: `${campaign.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-[#78350F]/60">Deadline</div>
                  <div className="font-semibold text-[#78350F]">
                    {campaign.deadline}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-[#78350F]/60">Payment</div>
                  <div
                    className={`font-semibold ${
                      campaign.payment === "Released"
                        ? "text-[#10B981]"
                        : campaign.payment === "In Escrow"
                        ? "text-[#F59E0B]"
                        : "text-[#78350F]"
                    }`}
                  >
                    {campaign.payment}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl p-6 border border-[#FDE68A] mb-8">
          <h3 className="text-lg font-semibold text-[#78350F] mb-4">
            Recent Notifications
          </h3>
          <div className="space-y-3">
            {[
              { type: "message", text: "New message from Fashion Forward", time: "2 hours ago" },
              { type: "campaign", text: "Your application was approved!", time: "5 hours ago" },
              { type: "payment", text: "Payment of $450 released", time: "1 day ago" },
            ].map((notif, idx) => {
              const NotificationIcon = getIcon(
                (notif.type === "message"
                  ? "MessageSquare"
                  : notif.type === "campaign"
                  ? "CheckCircle"
                  : "DollarSign") as keyof typeof Icons
              );
              const iconColor =
                notif.type === "message"
                  ? "text-blue-600"
                  : notif.type === "campaign"
                  ? "text-green-600"
                  : "text-yellow-600";
              return (
                <div
                  key={idx}
                  className="flex items-center space-x-3 p-3 hover:bg-[#FEF3C7] rounded-lg cursor-pointer"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      notif.type === "message"
                        ? "bg-blue-100"
                        : notif.type === "campaign"
                        ? "bg-green-100"
                        : "bg-yellow-100"
                    }`}
                  >
                    <NotificationIcon className={`w-5 h-5 ${iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[#78350F]">{notif.text}</div>
                    <div className="text-sm text-[#78350F]/60">{notif.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => showUpgradeModal && null}
          className="w-full py-4 bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all"
        >
          Find New Campaigns
        </button>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#FB923C] to-[#EC4899] rounded-full flex items-center justify-center mx-auto mb-4">
                <Icons.Crown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#78350F] mb-2">
                Upgrade to Pro
              </h3>
              <p className="text-[#78350F]/60 mb-6">
                You've reached your free tier limit of 3 campaign applications per month. Upgrade to unlock unlimited opportunities!
              </p>
              <div className="bg-[#FEF3C7] rounded-lg p-4 mb-6">
                <div className="inline-flex items-baseline">
                  <span className="text-3xl font-bold text-[#78350F]">$60</span>
                  <span className="text-lg font-normal text-[#78350F] ml-1">/month</span>
                </div>
                <div className="text-sm text-[#78350F]/60 mt-1">
                  or $48/year (Save 20%)
                </div>
              </div>
              <div className="space-y-2 mb-6">
                {[
                  "Unlimited campaign applications",
                  "Advanced analytics dashboard",
                  "Priority support",
                  "Verified creator badge",
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center text-left">
                    <Icons.Check className="w-5 h-5 text-[#10B981] mr-2 flex-shrink-0" />
                    <span className="text-[#78350F] text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="flex space-x-3">
                <button className="flex-1 py-3 bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all">
                  Upgrade Now
                </button>
                <button className="flex-1 py-3 bg-[#FEF3C7] text-[#78350F] rounded-lg font-semibold hover:bg-[#FDE68A] transition-all">
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}