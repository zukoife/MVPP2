
import * as Icons from "lucide-react";

export interface ApplyToCampaignScreenProps {
  state?: string;
}

/**
 * States:
 *  - default: Application form modal open
 */
export default function ApplyToCampaignScreen() {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-2xl max-w-full sm:max-w-2xl w-full mx-4 sm:mx-0 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#FDE68A] flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#78350F]">Apply to Campaign</h2>
              <p className="text-[#78350F]/80">Summer Fashion Collection - Fashion Forward</p>
            </div>
            <button className="text-[#78350F]/80 hover:text-[#78350F]">
              <Icons.X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Form - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <form className="space-y-6">
              {/* Cover Message */}
              <div>
                <label className="block text-[#78350F] font-semibold mb-2">
                  Cover Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]"
                  placeholder="Tell the brand why you're perfect for this campaign. Include your experience with fashion content, your creative ideas, and what makes you unique..."
                />
                <p className="text-sm text-[#78350F]/80 mt-1">
                  Minimum 100 characters
                </p>
              </div>

              {/* Portfolio Selection */}
              <div>
                <label className="block text-[#78350F] font-semibold mb-2">
                  Select Portfolio Samples
                </label>
                <p className="text-sm text-[#78350F]/80 mb-3">
                  Choose your best content that showcases your fashion and lifestyle style
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <label key={i} className="relative cursor-pointer group">
                      <input type="checkbox" className="sr-only" />
                      <div className="aspect-square bg-[#FEF3C7] rounded-lg overflow-hidden border-2 border-transparent group-hover:border-[#EC4899] transition-all">
                        <img src="./images/content-sample.jpg" className="w-full h-full object-cover" alt="Content sample" data-context="Portfolio content sample" />
                      </div>
                      <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                        <Icons.Check className="w-4 h-4 text-[#10B981]" />
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Expected Delivery */}
              <div>
                <label className="block text-[#78350F] font-semibold mb-2">
                  Expected Delivery Timeline
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="date"
                    className="flex-1 px-4 py-3 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]"
                  />
                  <div className="text-sm text-[#78350F]/80">
                    Campaign deadline: Jun 30, 2024
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-[#78350F] font-semibold mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]"
                  placeholder="Any additional information you'd like to share with the brand..."
                />
              </div>

              {/* Terms */}
              <div className="bg-[#FEF3C7] rounded-lg p-4">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-[#EC4899] mt-1" />
                  <span className="text-sm text-[#78350F]">
                    I agree to deliver the campaign requirements by the specified deadline and understand that payment will be held in escrow until deliverables are approved.
                  </span>
                </label>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#FDE68A] flex-shrink-0">
          <div className="flex space-x-3">
            <button className="flex-1 py-3 bg-[#FEF3C7] text-[#78350F] rounded-lg font-semibold hover:bg-[#FDE68A] transition-all">
              Cancel
            </button>
            <button className="flex-1 py-3 bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all">
              Submit Application
            </button>
          </div>
          <p className="text-center text-xs text-[#78350F]/80 mt-4">
            You have 2 applications remaining this month
          </p>
        </div>
      </div>
    </div>
  );
}
