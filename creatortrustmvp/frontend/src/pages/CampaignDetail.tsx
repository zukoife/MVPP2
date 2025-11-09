
import * as Icons from "lucide-react";

export interface CampaignDetailsScreenProps {
  state?: string;
}

/**
 * States:
 *  - default: Campaign details view with basic information
 *  - brandApplicants: Brand view showing applicants list with filtering
 *  - creatorSubmission: Creator view with deliverable submission form
 *  - disputeModal: Dispute modal open with evidence upload
 *  - ratingInterface: Rating interface for completed campaign
 */
export default function CampaignDetailsScreen({ state }: CampaignDetailsScreenProps) {
  const isBrandView = state === 'brandApplicants';
  const isCreatorSubmission = state === 'creatorSubmission';
  const showDisputeModal = state === 'disputeModal';
  const showRatingInterface = state === 'ratingInterface';
  
  return (
    <div className="min-h-screen bg-[#FEF3C7] font-[Plus_Jakarta_Sans]">
      {/* Header */}
      <div className="bg-white border-b border-[#FDE68A]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="text-[#78350F] hover:text-[#EC4899]">
                <Icons.ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-[#78350F]">Summer Fashion Collection</h1>
                <p className="text-[#78350F]/60">Posted by Fashion Forward</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-[#10B981]/20 text-[#10B981] rounded-full text-sm font-semibold">Active</span>
              <button className="p-2 text-[#78350F] hover:text-[#EC4899]">
                <Icons.Bookmark className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="col-span-2 space-y-6">
            {/* Campaign Details */}
            <div className="bg-white rounded-xl p-4 md:p-6 border border-[#FDE68A]">
              <h2 className="text-xl font-semibold text-[#78350F] mb-4">Campaign Details</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-[#78350F] mb-2">Description</h3>
                  <p className="text-[#78350F]/70">
                    We're looking for creative influencers to showcase our new summer collection. 
                    Create engaging content featuring our latest designs in natural settings.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#78350F] mb-2">Deliverables</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Icons.CheckCircle className="w-5 h-5 text-[#10B981] mr-2 mt-0.5" />
                      <span className="text-[#78350F]/70">3 Instagram posts with product tags</span>
                    </li>
                    <li className="flex items-start">
                      <Icons.CheckCircle className="w-5 h-5 text-[#10B981] mr-2 mt-0.5" />
                      <span className="text-[#78350F]/70">1 YouTube video (3-5 minutes)</span>
                    </li>
                    <li className="flex items-start">
                      <Icons.CheckCircle className="w-5 h-5 text-[#10B981] mr-2 mt-0.5" />
                      <span className="text-[#78350F]/70">5 Instagram Stories with swipe-up links</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-[#78350F] mb-2">Requirements</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Fashion", "Lifestyle", "Travel", "10K+ Followers", "High Engagement"].map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-[#FEF3C7] text-[#78350F] rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Applicants List (Brand View) */}
            {isBrandView && (
              <div className="bg-white rounded-xl p-4 md:p-6 border border-[#FDE68A]">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-[#78350F]">Applicants (12)</h2>
                  <select className="px-4 py-2 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] w-full max-w-xs">
                    <option>Sort by: Most Relevant</option>
                    <option>Sort by: Engagement Rate</option>
                    <option>Sort by: Followers</option>
                  </select>
                </div>
                <div className="space-y-4">
                  {[
                    { name: "Sarah Johnson", followers: "45.2K", engagement: "8.4%", niche: "Fashion & Lifestyle", applied: "2 hours ago" },
                    { name: "Mike Chen", followers: "32.1K", engagement: "6.2%", niche: "Travel", applied: "5 hours ago" },
                    { name: "Emma Wilson", followers: "89.5K", engagement: "9.1%", niche: "Fashion", applied: "1 day ago" }
                  ].map((applicant, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-[#FEF3C7] rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img src="./images/creator-avatar.jpg" className="w-12 h-12 rounded-full" alt="Creator profile photo" data-context="Applicant avatar in circular container" />
                        <div>
                          <div className="font-semibold text-[#78350F]">{applicant.name}</div>
                          <div className="text-sm text-[#78350F]/60">{applicant.niche} • {applicant.followers} followers • {applicant.engagement} engagement</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-[#78350F]/60 whitespace-nowrap">{applicant.applied}</span>
                        <button className="px-4 h-10 bg-white text-[#78350F] rounded-lg hover:bg-[#FDE68A] transition-all flex items-center justify-center whitespace-nowrap">
                          View Profile
                        </button>
                        <button className="px-4 h-10 bg-[#10B981] text-white rounded-lg hover:bg-green-600 transition-all flex items-center justify-center whitespace-nowrap">
                          Accept
                        </button>
                        <button className="px-4 h-10 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all flex items-center justify-center whitespace-nowrap">
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submission Form (Creator View) */}
            {isCreatorSubmission && (
              <div className="bg-white rounded-xl p-4 md:p-6 border border-[#FDE68A]">
                <h2 className="text-xl font-semibold text-[#78350F] mb-4">Submit Deliverables</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[#78350F] font-semibold mb-2">Instagram Posts</label>
                    <div className="border-2 border-dashed border-[#FDE68A] rounded-lg p-8 text-center hover:border-[#EC4899] transition-all cursor-pointer">
                      <Icons.Upload className="w-12 h-12 text-[#78350F]/40 mx-auto mb-2" />
                      <p className="text-[#78350F]/60">Drop files here or click to upload</p>
                      <p className="text-sm text-[#78350F]/40">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#78350F] font-semibold mb-2">YouTube Video Link</label>
                    <input type="url" placeholder="https://youtube.com/..." className="w-full px-4 py-2 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]" />
                  </div>
                  <div>
                    <label className="block text-[#78350F] font-semibold mb-2">Notes for Brand</label>
                    <textarea rows={4} placeholder="Any additional notes about your submission..." className="w-full px-4 py-2 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]"></textarea>
                  </div>
                  <button className="w-full h-12 bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all flex items-center justify-center">
                    Submit Deliverables
                  </button>
                </div>
              </div>
            )}

            {/* Rating Interface */}
            {showRatingInterface && (
              <div className="bg-white rounded-xl p-4 md:p-6 border border-[#FDE68A]">
                <h2 className="text-xl font-semibold text-[#78350F] mb-4">Rate Your Experience</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} className="text-4xl text-[#FDE68A] hover:text-[#F59E0B] transition-colors">
                        <Icons.Star className="w-10 h-10" />
                      </button>
                    ))}
                  </div>
                  <div>
                    <label className="block text-[#78350F] font-semibold mb-2">Your Feedback</label>
                    <textarea rows={4} placeholder="Share your experience working with Fashion Forward..." className="w-full px-4 py-2 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]"></textarea>
                  </div>
                  <button className="w-full h-12 bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all flex items-center justify-center">
                    Submit Rating
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Campaign Info */}
            <div className="bg-white rounded-xl p-4 md:p-6 border border-[#FDE68A]">
              <h3 className="font-semibold text-[#78350F] mb-4">Campaign Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#78350F]/60">Budget</span>
                  <span className="font-semibold text-[#78350F]">$1,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#78350F]/60">Deadline</span>
                  <span className="font-semibold text-[#78350F]">Jun 30, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#78350F]/60">Duration</span>
                  <span className="font-semibold text-[#78350F]">2 weeks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#78350F]/60">Payment Status</span>
                  <span className="px-2 py-1 bg-[#10B981]/20 text-[#10B981] rounded text-sm font-semibold">In Escrow</span>
                </div>
              </div>
            </div>

            {/* Brand Info */}
            <div className="bg-white rounded-xl p-4 md:p-6 border border-[#FDE68A]">
              <h3 className="font-semibold text-[#78350F] mb-4">About the Brand</h3>
              <div className="flex items-center space-x-3 mb-3">
                <img src="./images/brand-logo.jpg" className="w-12 h-12 rounded-lg" alt="Fashion Forward brand logo" data-context="Brand logo in square container" />
                <div>
                  <div className="font-semibold text-[#78350F]">Fashion Forward</div>
                  <div className="text-sm text-[#78350F]/60">Verified Brand</div>
                </div>
              </div>
              <p className="text-[#78350F]/70 text-sm mb-3">
                Leading sustainable fashion brand with a focus on eco-friendly materials and ethical production.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center text-[#78350F]/60">
                  <Icons.CheckCircle className="w-4 h-4 text-[#10B981] mr-1" />
                  Verified
                </div>
                <div className="flex items-center text-[#78350F]/60">
                  <Icons.Star className="w-4 h-4 text-[#F59E0B] mr-1" />
                  4.8 Rating
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              {!isBrandView && !isCreatorSubmission && !showRatingInterface && (
                <button className="w-full h-12 bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all flex items-center justify-center">
                  Apply to Campaign
                </button>
              )}
              {!isBrandView && !isCreatorSubmission && !showRatingInterface && (
                <button 
                  onClick={() => showDisputeModal && null}
                  className="w-full h-12 bg-white text-[#78350F] rounded-lg font-semibold border border-[#FDE68A] hover:bg-[#FEF3C7] transition-all flex items-center justify-center"
                >
                  Open Dispute
                </button>
              )}
              {!isBrandView && !isCreatorSubmission && !showRatingInterface && (
                <button className="w-full h-12 bg-white text-[#78350F] rounded-lg font-semibold border border-[#FDE68A] hover:bg-[#FEF3C7] transition-all flex items-center justify-center">
                  Contact Support
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dispute Modal */}
      {showDisputeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#78350F]">Open a Dispute</h3>
              <button className="text-[#78350F]/60 hover:text-[#78350F]">
                <Icons.X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-[#78350F] font-semibold mb-2">Dispute Reason</label>
                <select className="w-full px-4 py-2 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]">
                  <option>Select a reason...</option>
                  <option>Deliverables not submitted</option>
                  <option>Quality issues</option>
                  <option>Payment dispute</option>
                  <option>Communication problems</option>
                </select>
              </div>
              <div>
                <label className="block text-[#78350F] font-semibold mb-2">Detailed Description</label>
                <textarea rows={4} placeholder="Please provide details about the dispute..." className="w-full px-4 py-2 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]"></textarea>
              </div>
              <div>
                <label className="block text-[#78350F] font-semibold mb-2">Evidence</label>
                <div className="border-2 border-dashed border-[#FDE68A] rounded-lg p-6 text-center hover:border-[#EC4899] transition-all cursor-pointer">
                  <Icons.Paperclip className="w-8 h-8 text-[#78350F]/40 mx-auto mb-2" />
                  <p className="text-[#78350F]/60">Attach screenshots, links, or documents</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <button className="flex-1 h-12 bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all flex items-center justify-center">
                  Submit Dispute
                </button>
                <button className="flex-1 h-12 bg-[#FEF3C7] text-[#78350F] rounded-lg font-semibold hover:bg-[#FDE68A] transition-all flex items-center justify-center">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}