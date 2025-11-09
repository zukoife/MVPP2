
import * as Icons from "lucide-react";

export interface SignUpScreenProps {
  state?: string;
}

/**
 * States:
 *  - default: Account type selection screen
 *  - creatorForm: Creator sign-up form visible
 *  - brandForm: Brand sign-up form visible
 */
export default function SignUpScreen({ state }: SignUpScreenProps) {
  const showCreatorForm = state === "creatorForm";
  const showBrandForm = state === "brandForm";
  const showTypeSelection = state === "default";

  return (
    <div className="min-h-screen bg-[#FEF3C7] font-[Plus_Jakarta_Sans] flex items-center justify-center px-6">
      <div className="max-w-full sm:max-w-md w-full mx-4 sm:mx-0">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-[Space_Grotesk] font-bold bg-gradient-to-r from-[#FB923C] to-[#EC4899] bg-clip-text text-transparent mb-2">
            Lynkkey
          </h1>
          <p className="text-[#78350F]/60">Connect Brands with Creators</p>
        </div>

        {/* Account Type Selection */}
        {showTypeSelection && (
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-[#FDE68A]">
            <h2 className="text-2xl font-bold text-[#78350F] mb-6 text-center">
              Join as a Creator or Brand
            </h2>
            <div className="space-y-4">
              <button
                onClick={() => null}
                className="w-full p-6 bg-gradient-to-r from-[#FB923C]/10 to-[#EC4899]/10 border-2 border-[#FDE68A] rounded-xl hover:border-[#EC4899] transition-all group h-[164px] flex flex-col justify-start"
              >
                <Icons.Camera className="w-8 h-8 text-[#EC4899] mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-[#78350F] mb-1">I'm a Creator</h3>
                <p className="text-sm text-[#78350F]/60 leading-relaxed">
                  Showcase your talent and collaborate with amazing brands
                </p>
              </button>
              <button
                onClick={() => null}
                className="w-full p-6 bg-gradient-to-r from-[#FB923C]/10 to-[#EC4899]/10 border-2 border-[#FDE68A] rounded-xl hover:border-[#EC4899] transition-all group h-[164px] flex flex-col justify-start"
              >
                <Icons.Building className="w-8 h-8 text-[#EC4899] mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-[#78350F] mb-1">I'm a Brand</h3>
                <p className="text-sm text-[#78350F]/60 leading-relaxed">
                  Find the perfect creators for your campaigns
                </p>
              </button>
            </div>
            <p className="text-center text-[#78350F]/60 mt-6">
              Already have an account?{" "}
              <a 
                href="#" 
                className="text-[#EC4899] hover:text-[#FB923C] inline-block px-2 py-1 -mx-2 -my-1 rounded hover:bg-[#FEF3C7]/30 transition-colors"
              >
                Sign in
              </a>
            </p>
          </div>
        )}

        {/* Creator Form */}
        {showCreatorForm && (
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-[#FDE68A]">
            <button className="mb-4 text-[#78350F] hover:text-[#EC4899] flex items-center px-2 py-1 -mx-2 rounded hover:bg-[#FEF3C7]/30 transition-colors">
              <Icons.ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
            <h2 className="text-2xl font-bold text-[#78350F] mb-6">
              Create Creator Account
            </h2>
            <form className="space-y-4">
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
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-[#78350F] font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-[#78350F] font-semibold mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all"
              >
                Create Account
              </button>
            </form>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#78350F]/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-[#78350F]/60">Or continue with</span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button className="h-12 bg-white border border-[#FDE68A] rounded-lg flex items-center justify-center hover:bg-[#FEF3C7] transition-all">
                  <Icons.Chrome className="w-5 h-5 text-[#78350F] mr-2" />
                  Google
                </button>
                <button className="h-12 bg-white border border-[#FDE68A] rounded-lg flex items-center justify-center hover:bg-[#FEF3C7] transition-all">
                  <Icons.Instagram className="w-5 h-5 text-[#78350F] mr-2" />
                  Instagram
                </button>
              </div>
            </div>
            <p className="text-center text-[#78350F]/60 mt-6">
              Already have an account?{" "}
              <a 
                href="#" 
                className="text-[#EC4899] hover:text-[#FB923C] inline-block px-2 py-1 -mx-2 -my-1 rounded hover:bg-[#FEF3C7]/30 transition-colors"
              >
                Sign in
              </a>
            </p>
          </div>
        )}

        {/* Brand Form */}
        {showBrandForm && (
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-[#FDE68A]">
            <button className="mb-4 text-[#78350F] hover:text-[#EC4899] flex items-center px-2 py-1 -mx-2 rounded hover:bg-[#FEF3C7]/30 transition-colors">
              <Icons.ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
            <h2 className="text-2xl font-bold text-[#78350F] mb-6">
              Create Brand Account
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-[#78350F] font-semibold mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]"
                  placeholder="Acme Corp"
                />
              </div>
              <div>
                <label className="block text-[#78350F] font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]"
                  placeholder="contact@acme.com"
                />
              </div>
              <div>
                <label className="block text-[#78350F] font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-[#78350F] font-semibold mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all"
              >
                Create Account
              </button>
            </form>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#78350F]/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-[#78350F]/60">Or continue with</span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button className="h-12 bg-white border border-[#FDE68A] rounded-lg flex items-center justify-center hover:bg-[#FEF3C7] transition-all">
                  <Icons.Chrome className="w-5 h-5 text-[#78350F] mr-2" />
                  Google
                </button>
                <button className="h-12 bg-white border border-[#FDE68A] rounded-lg flex items-center justify-center hover:bg-[#FEF3C7] transition-all">
                  <Icons.Instagram className="w-5 h-5 text-[#78350F] mr-2" />
                  Instagram
                </button>
              </div>
            </div>
            <p className="text-center text-[#78350F]/60 mt-6">
              Already have an account?{" "}
              <a 
                href="#" 
                className="text-[#EC4899] hover:text-[#FB923C] inline-block px-2 py-1 -mx-2 -my-1 rounded hover:bg-[#FEF3C7]/30 transition-colors"
              >
                Sign in
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}