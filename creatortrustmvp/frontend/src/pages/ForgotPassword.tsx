
import * as Icons from "lucide-react";

export interface ForgotPasswordScreenProps {
  state?: string;
}

/**
 * States:
 *  - default: Email input form visible
 *  - successState: Success message shown after submission
 */
export default function ForgotPasswordScreen({ state }: ForgotPasswordScreenProps) {
  const showSuccess = state === "successState";

  return (
    <div className="min-h-screen bg-[#FEF3C7] font-[Plus_Jakarta_Sans] flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-[Space_Grotesk] font-bold bg-gradient-to-r from-[#FB923C] to-[#EC4899] bg-clip-text text-transparent mb-2">
            Lynkkey
          </h1>
          <p className="text-[#78350F]/60">Reset your password</p>
        </div>

        {/* Form or Success Message */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-[#FDE68A]">
          {!showSuccess ? (
            <>
              <div className="text-center mb-6">
                <Icons.Mail className="w-12 h-12 text-[#EC4899] mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-[#78350F] mb-2">
                  Forgot Password?
                </h2>
                <p className="text-[#78350F]/60">
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
            </>
          ) : (
            <div className="text-center">
              <Icons.CheckCircle className="w-16 h-16 text-[#10B981] mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-[#78350F] mb-2">
                Check Your Email
              </h2>
              <p className="text-[#78350F]/60 mb-6">
                If your email is registered, you will receive a password reset link shortly.
              </p>
              <button
                className="w-full h-12 bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all"
                onClick={() => null}
              >
                Back to Login
              </button>
            </div>
          )}

          <div className="mt-6 text-center">
            <a href="#" className="text-[#EC4899] hover:text-[#FB923C]">
              Back to Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}