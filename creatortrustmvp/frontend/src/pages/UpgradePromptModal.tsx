import React from "react";
import * as Icons from "lucide-react";

export interface UpgradePromptModalScreenProps {
  /** ID of the preview state to display */
  state: string;
}

/**
 * States:
 *  - default: Basic upgrade prompt modal
 *  - inlinePlans: Expanded modal with plan comparison
 *  - paymentModal: Payment modal open for plan selection
 */
export default function UpgradePromptModalScreen({
  state,
}: UpgradePromptModalScreenProps) {
  const showInlinePlans = state === "inlinePlans";
  const showPaymentModal = state === "paymentModal";


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      {!showPaymentModal ? (
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="p-6 border-b border-[#FDE68A]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#78350F]">
                  Unlock More Features
                </h2>
                <p className="text-[#78350F]/60">
                  Upgrade your plan to access premium features
                </p>
              </div>
              <button className="text-[#78350F]/60 hover:text-[#78350F] self-center">
                <Icons.X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {!showInlinePlans ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-gradient-to-r from-[#FB923C] to-[#EC4899] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icons.Crown className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#78350F] mb-4">
                  You've reached your free tier limit!
                </h3>
                <p className="text-[#78350F]/60 mb-8 max-w-md mx-auto">
                  You've used all 3 of your monthly campaign applications. Upgrade
                  to Pro for unlimited applications and advanced features.
                </p>
                <button
                  onClick={() => {
                    /* No internal state change – the preview state is driven by the `state` prop */
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all"
                >
                  See Plans
                </button>
              </div>
            ) : (
              <div>
                {/* Toggle */}
                <div className="flex justify-center mb-8">
                  <div className="bg-[#FEF3C7] rounded-lg p-1 border border-[#FDE68A]">
                    <button className="px-6 py-2 rounded-md bg-white text-[#78350F] font-semibold transition-all">
                      Monthly
                    </button>
                    <button className="px-6 py-2 rounded-md text-[#78350F] hover:bg-white/50 transition-all">
                      Yearly (Save 20%)
                    </button>
                  </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  {[
                    {
                      name: "Free",
                      price: "$0",
                      period: "/month",
                      features: [
                        "3 campaign applications/month",
                        "Basic profile",
                        "Limited analytics",
                        "Community support",
                      ],
                      highlighted: false,
                      current: true,
                    },
                    {
                      name: "Pro",
                      price: "$60",
                      period: "/month",
                      features: [
                        "Unlimited applications",
                        "Advanced analytics",
                        "Priority support",
                        "Verified badge",
                        "Custom branding",
                      ],
                      highlighted: true,
                      current: false,
                    },
                    {
                      name: "Premium",
                      price: "$120",
                      period: "/month",
                      features: [
                        "Everything in Pro",
                        "White-label reports",
                        "Dedicated manager",
                        "API access",
                        "Custom integrations",
                      ],
                      highlighted: false,
                      current: false,
                    },
                  ].map((plan) => (
                    <div
                      key={plan.name}
                      className={`bg-white rounded-xl p-6 border-2 ${
                        plan.highlighted
                          ? "border-[#EC4899] shadow-xl"
                          : "border-[#FDE68A]"
                      } ${plan.current ? "opacity-75" : ""}`}
                    >
                      {plan.current && (
                        <div className="text-center mb-2">
                          <span className="px-3 py-1 bg-[#78350F]/20 text-[#78350F] rounded-full text-sm font-semibold">
                            Current Plan
                          </span>
                        </div>
                      )}
                      <h3 className="text-xl font-bold text-[#78350F] mb-2">
                        {plan.name}
                      </h3>
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-[#78350F]">
                          {plan.price}
                        </span>
                        <span className="text-[#78350F]/60">{plan.period}</span>
                      </div>
                      <ul className="space-y-2 mb-6">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm">
                            <Icons.Check className="w-4 h-4 text-[#10B981] mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-[#78350F]/70">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => {
                          /* No internal state change – preview state handled externally */
                        }}
                        className={`w-full py-3 rounded-lg font-semibold transition-all ${
                          plan.current
                            ? "bg-[#FEF3C7] text-[#78350F] cursor-not-allowed"
                            : plan.highlighted
                            ? "bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white hover:shadow-lg hover:shadow-pink-300/50"
                            : plan.name === "Premium"
                            ? "bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white hover:shadow-lg hover:shadow-purple-300/50"
                            : "bg-[#FEF3C7] text-[#78350F] hover:bg-[#FDE68A]"
                        }`}
                        disabled={plan.current}
                      >
                        {plan.current ? "Current Plan" : "Upgrade Now"}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Feature Comparison */}
                <div className="bg-[#FEF3C7] rounded-xl p-4">
                  <h4 className="font-bold text-[#78350F] mb-4">
                    Feature Comparison
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#FDE68A]">
                          <th className="text-left py-2 text-[#78350F]/60">
                            Feature
                          </th>
                          <th className="text-center py-2 text-[#78350F]/60">
                            Free
                          </th>
                          <th className="text-center py-2 text-[#78350F]/60">
                            Pro
                          </th>
                          <th className="text-center py-2 text-[#78350F]/60">
                            Premium
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            feature: "Campaign Applications",
                            free: "3/month",
                            pro: "Unlimited",
                            premium: "Unlimited",
                          },
                          {
                            feature: "Analytics Dashboard",
                            free: "Basic",
                            pro: "Advanced",
                            premium: "Advanced + Custom",
                          },
                          {
                            feature: "Support Response Time",
                            free: "48 hours",
                            pro: "24 hours",
                            premium: "2 hours",
                          },
                          {
                            feature: "Verified Badge",
                            free: "No",
                            pro: "Yes",
                            premium: "Yes",
                          },
                          {
                            feature: "API Access",
                            free: "No",
                            pro: "No",
                            premium: "Yes",
                          },
                        ].map((row, idx) => (
                          <tr key={idx} className="border-b border-[#FDE68A]/30">
                            <td className="py-2 text-[#78350F]">
                              {row.feature}
                            </td>
                            <td className="py-2 text-center text-[#78350F]/70">
                              {row.free}
                            </td>
                            <td className="py-2 text-center text-[#78350F]/70">
                              {row.pro}
                            </td>
                            <td className="py-2 text-center text-[#78350F]/70">
                              {row.premium}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {!showInlinePlans && (
            <div className="p-6 border-t border-[#FDE68A]">
              <div className="flex justify-between items-center">
                <button className="text-[#78350F]/60 hover:text-[#78350F]">
                  Maybe later
                </button>
                <button className="text-[#EC4899] hover:text-[#FB923C]">
                  Learn more about plans
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Payment Modal */
        <div className="bg-white rounded-2xl max-w-md w-full mx-4">
          <div className="p-6 border-b border-[#FDE68A]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#78350F]">
                  Complete Upgrade
                </h3>
                <p className="text-[#78350F]/60">Pro Plan - Monthly</p>
              </div>
              <button className="text-[#78350F]/60 hover:text-[#78350F] self-center">
                <Icons.X className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="bg-[#FEF3C7] rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#78350F]/60">Subscription</span>
                  <span className="font-semibold text-[#78350F]">Pro Plan</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#78350F]/60">Billing cycle</span>
                  <span className="font-semibold text-[#78350F]">Monthly</span>
                </div>
              </div>
              <div>
                <label className="block text-[#78350F] font-semibold mb-2">
                  Payment Method
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 p-3 bg-[#FEF3C7] rounded-lg cursor-pointer hover:bg-[#FDE68A] transition-all">
                    <input
                      type="radio"
                      name="payment"
                      className="w-4 h-4 text-[#EC4899]"
                      defaultChecked
                    />
                    <Icons.CreditCard className="w-5 h-5 text-[#78350F]" />
                    <span className="text-[#78350F]">Credit Card</span>
                  </label>
                  <label className="flex items-center space-x-3 p-3 bg-[#FEF3C7] rounded-lg cursor-pointer hover:bg-[#FDE68A] transition-all">
                    <input type="radio" name="payment" className="w-4 h-4 text-[#EC4899]" />
                    <Icons.DollarSign className="w-5 h-5 text-[#78350F]" />
                    <span className="text-[#78350F]">PayPal</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-[#78350F] font-semibold mb-2">
                  Card Details
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899] mb-3"
                  placeholder="Card number"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]"
                    placeholder="MM/YY"
                  />
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]"
                    placeholder="CVV"
                  />
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Icons.Shield className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div className="text-sm text-[#78350F]/70">
                    <p className="font-semibold text-[#78350F] mb-1">
                      Secure Payment
                    </p>
                    <p>
                      Your payment information is encrypted and secure. You can
                      cancel anytime.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <button className="flex-1 py-3 bg-[#F3F4F6] text-[#374151] rounded-lg font-semibold hover:bg-[#E5E7EB] transition-all">
                  Cancel
                </button>
                <button className="flex-1 py-3 bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all">
                  Pay $60
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
