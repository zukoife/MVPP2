
import * as Icons from "lucide-react";

export interface LoginScreenProps {
  state?: string;
}

/**
 * States:
 *  - default: Login form displayed
 *  - forgotPasswordLink: Visual focus on forgot password link with recovery form
 */
export default function LoginScreen({ state }: LoginScreenProps) {
  const focusForgotPassword = state === "forgotPasswordLink";

  return (
    <div className="min-h-screen bg-[#FEF3C7] font-[Plus_Jakarta_Sans] flex items-center justify-center px-6">
      <div className="max-w-full sm:max-w-md w-full mx-4 sm:mx-0">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-[Space_Grotesk] font-bold bg-gradient-to-r from-[#FB923C] to-[#EC4899] bg-clip-text text-transparent mb-2">
            Lynkkey
          </h1>
          <p className="text-[#78350F]/60">
            {focusForgotPassword ? "Reset your password" : "Welcome back"}
          </p>
        </div>

        {/* Login Form or Password Recovery Form */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-[#FDE68A]">
          {!focusForgotPassword ? (
            <>
              <h2 className="text-2xl font-bold text-[#78350F] mb-6">Sign In</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-[#78350F] font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]"
                    placeholder="your@email.com"
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
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-[#EC4899] bg-[#FEF3C7] border-[#FDE68A] rounded focus:ring-[#EC4899]"
                    />
                    <span className="ml-2 text-sm text-[#78350F]">Remember me</span>
                  </label>
                  <a
                    href="#"
                    className="text-sm text-[#EC4899] hover:text-[#FB923C]"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all"
                >
                  Sign In
                </button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#FDE68A]"></div>
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
                Don't have an account?{" "}
                <a href="#" className="text-[#EC4899] hover:text-[#FB923C]">
                  Sign up
                </a>
              </p>
            </>
          ) : (
            <>
              <div className="mb-6">
                <Icons.Mail className="w-12 h-12 text-[#EC4899] mb-4" />
                <h2 className="text-2xl font-bold text-[#78350F] mb-2">
                  Forgot Password?
                </h2>
                <p className="text-[#78350F]/60 text-sm">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>
              <form className="space-y-4">
                <div>
                  <label className="block text-[#78350F] font-semibold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-[#FEF3C7] text-[#78350F] rounded-lg border border-[#FDE68A] focus:outline-none focus:border-[#EC4899]"
                    placeholder="your@email.com"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all"
                >
                  Send Reset Link
                </button>
              </form>
              <div className="mt-6 text-center">
                <a
                  href="#"
                  className="text-sm text-[#EC4899] hover:text-[#FB923C] font-semibold"
                >
                  ← Back to Sign In
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}