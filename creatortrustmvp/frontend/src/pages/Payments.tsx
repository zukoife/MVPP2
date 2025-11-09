import React from "react";
import * as Icons from "lucide-react";

export interface PaymentsScreenProps {
  state: string;
}

/**
 * States:
 *  - default: Transaction history visible with brand escrow and creator withdrawal interfaces
 *  - escrowFunding: Escrow funding modal open for one-time payment
 *  - disputeResolution: Dispute resolution interface visible with evidence upload
 */
export default function PaymentsScreen({ state }: PaymentsScreenProps) {
  const showEscrowModal = state === "escrowFunding";
  const showDisputeResolution = state === "disputeResolution";


  return (
    <div className="min-h-screen bg-[#FEF3C7] font-[Plus_Jakarta_Sans]">
      {/* Header */}
      <div className="bg-white border-b border-[#FDE68A]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#78350F]">Payments & Transactions</h1>
            <button className="w-10 h-10 bg-gradient-to-r from-[#FB923C] to-[#EC4899] rounded-full flex items-center justify-center text-white">
              <Icons.User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Balance Overview */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-[#FDE68A]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                <Icons.DollarSign className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-[#10B981] font-semibold">+12.5%</span>
            </div>
            <div className="text-2xl font-bold text-[#78350F] mb-1">$12,450</div>
            <div className="text-sm text-[#78350F]/60">Available Balance</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-[#FDE68A]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                <Icons.Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-[#3B82F6] font-semibold">In Escrow</span>
            </div>
            <div className="text-2xl font-bold text-[#78350F] mb-1">$3,800</div>
            <div className="text-sm text-[#78350F]/60">Pending Release</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-[#FDE68A]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                <Icons.TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-[#9333EA] font-semibold">This Month</span>
            </div>
            <div className="text-2xl font-bold text-[#78350F] mb-1">$5,230</div>
            <div className="text-sm text-[#78350F]/60">Total Earnings</div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-xl p-6 border border-[#FDE68A] mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-[#78350F]">Transaction History</h2>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-[#FEF3C7] text-[#78350F] rounded-lg text-sm font-semibold hover:bg-[#FDE68A] transition-all">
                Export CSV
              </button>
              <select className="w-full px-4 py-2 bg-white text-[#78350F] rounded-lg border border-[#FDE68A] text-sm focus:outline-none focus:border-[#EC4899]">
                <option>All Transactions</option>
                <option>Payments Received</option>
                <option>Escrow Deposits</option>
                <option>Withdrawals</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#FDE68A]">
                  <th className="text-left py-3 text-[#78350F]/60 font-semibold">Date</th>
                  <th className="text-left py-3 text-[#78350F]/60 font-semibold">Description</th>
                  <th className="text-left py-3 text-[#78350F]/60 font-semibold">Type</th>
                  <th className="text-left py-3 text-[#78350F]/60 font-semibold">Amount</th>
                  <th className="text-left py-3 text-[#78350F]/60 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: "Jun 15, 2024", desc: "Summer Fashion Campaign", type: "Payment Received", amount: "+$1,500", status: "Completed" },
                  { date: "Jun 14, 2024", desc: "Tech Product Launch", type: "Escrow Deposit", amount: "-$2,000", status: "Held" },
                  { date: "Jun 12, 2024", desc: "Withdrawal to PayPal", type: "Withdrawal", amount: "-$3,000", status: "Completed" },
                  { date: "Jun 10, 2024", desc: "Food & Beverage Campaign", type: "Payment Received", amount: "+$800", status: "Completed" },
                  { date: "Jun 08, 2024", desc: "Fitness Challenge", type: "Escrow Deposit", amount: "-$1,200", status: "Pending" },
                ].map((transaction, idx) => (
                  <tr key={idx} className="border-b border-[#FDE68A]/30 hover:bg-[#FEF3C7]/30 transition-all">
                    <td className="py-4 text-[#78350F]">{transaction.date}</td>
                    <td className="py-4 text-[#78350F]">{transaction.desc}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        transaction.type === "Payment Received" ? "bg-[#10B981]/20 text-[#10B981]" :
                        transaction.type === "Escrow Deposit" ? "bg-[#F59E0B]/20 text-[#F59E0B]" :
                        "bg-[#78350F]/20 text-[#78350F]"
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className={`py-4 font-semibold ${
                      transaction.amount.startsWith('+') ? 'text-[#10B981]' : 'text-[#78350F]'
                    }`}>
                      {transaction.amount}
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        transaction.status === "Completed" ? "bg-[#10B981]/20 text-[#10B981]" :
                        transaction.status === "Held" ? "bg-[#F59E0B]/20 text-[#F59E0B]" :
                        "bg-[#78350F]/20 text-[#78350F]"
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-6">
          {/* Brand: Escrow Funding */}
          <div className="bg-white rounded-xl p-6 border border-[#FDE68A]">
            <h3 className="text-lg font-semibold text-[#78350F] mb-4">Fund Escrow</h3>
            <p className="text-[#78350F]/60 mb-4">Deposit funds for upcoming campaigns</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[#FEF3C7] rounded-lg">
                <div>
                  <div className="font-semibold text-[#78350F]">Tech Product Launch</div>
                  <div className="text-sm text-[#78350F]/60">Due: June 20, 2024</div>
                </div>
                <div className="font-bold text-[#78350F]">$2,000</div>
              </div>
              <button
                onClick={() => showEscrowModal && null}
                className="w-full py-2 bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all"
              >
                Fund Campaign
              </button>
            </div>
          </div>

          {/* Creator: Withdrawal */}
          <div className="bg-white rounded-xl p-6 border border-[#FDE68A]">
            <h3 className="text-lg font-semibold text-[#78350F] mb-4">Withdraw Funds</h3>
            <p className="text-[#78350F]/60 mb-4">Transfer earnings to your account</p>
            <div className="space-y-3">
              <div className="p-3 bg-[#FEF3C7] rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#78350F]/60">Available to withdraw</span>
                  <span className="font-bold text-[#78350F]">$12,450</span>
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 py-2 bg-white text-[#78350F] rounded-lg text-sm font-semibold hover:bg-[#FDE68A] transition-all">
                    PayPal
                  </button>
                  <button className="flex-1 py-2 bg-white text-[#78350F] rounded-lg text-sm font-semibold hover:bg-[#FDE68A] transition-all">
                    Bank Transfer
                  </button>
                </div>
              </div>
              <button className="w-full py-2 bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all">
                Withdraw Now
              </button>
            </div>
          </div>
        </div>

        {/* Dispute Resolution */}
        {showDisputeResolution && (
          <div className="mt-8 bg-white rounded-xl p-6 border border-[#FDE68A]">
            <h3 className="text-lg font-semibold text-[#78350F] mb-4">Dispute Resolution</h3>
            <div className="bg-red-50 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-3 mb-2">
                <Icons.AlertTriangle className="w-5 h-5 text-red-500" />
                <span className="font-semibold text-[#78350F]">Active Dispute: Summer Fashion Campaign</span>
              </div>
              <p className="text-sm text-[#78350F]/60 mb-3">
                Dispute opened on June 10, 2024 • Status: Under Review
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#78350F]/60">Evidence submitted by:</span>
                  <span className="font-semibold text-[#78350F]">Both parties</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#78350F]/60">Expected resolution:</span>
                  <span className="font-semibold text-[#78350F]">3-5 business days</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="flex-1 py-2 bg-[#FEF3C7] text-[#78350F] rounded-lg font-semibold hover:bg-[#FDE68A] transition-all">
                View Details
              </button>
              <button className="flex-1 py-2 bg-white text-[#78350F] rounded-lg font-semibold border border-[#FDE68A] hover:bg-[#FEF3C7] transition-all">
                Submit Additional Evidence
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Escrow Funding Modal */}
      {showEscrowModal && (
        <div className="fixed inset-x-0 top-0 bottom-0 bg-black/50 flex items-center justify-center z-50 min-h-screen">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#78350F]">Fund Escrow</h3>
              <button className="text-[#78350F]/60 hover:text-[#78350F]">
                <Icons.X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-[#FEF3C7] rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#78350F]/60">Campaign</span>
                  <span className="font-semibold text-[#78350F]">Tech Product Launch</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#78350F]/60">Amount to fund</span>
                  <span className="text-2xl font-bold text-[#78350F]">$2,000</span>
                </div>
              </div>
              <div>
                <label className="block text-[#78350F] font-semibold mb-2">Payment Method</label>
                <select className="w-full px-4 py-3 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]">
                  <option>Credit Card ending in 4242</option>
                  <option>Bank Account ****1234</option>
                  <option>Add new payment method</option>
                </select>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Icons.Info className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div className="text-sm text-[#78350F]/70">
                    <p className="font-semibold text-[#78350F] mb-1">Escrow Protection</p>
                    <p>Your payment will be held securely and only released to the creator after deliverables are approved.</p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <button className="flex-1 py-3 bg-[#FEF3C7] text-[#78350F] rounded-lg font-semibold hover:bg-[#FDE68A] transition-all">
                  Cancel
                </button>
                <button className="flex-1 py-3 bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all">
                  Confirm Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
