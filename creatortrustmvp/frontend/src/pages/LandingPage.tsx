
import * as Icons from "lucide-react";

export interface LandingPageScreenProps {
  state?: string;
}

/**
 * States:
 *  - default: Full landing page with all sections visible in light mode
 *  - pricingYearly: Pricing toggle set to yearly with discounted rates
 *  - darkMode: Full landing page with dark theme applied
 */
export default function LandingPageScreen({
  state,
}: LandingPageScreenProps) {
  const isYearly = state === "pricingYearly";
  const isDarkMode = state === "darkMode";

  // Helper to render icons safely
  const getIcon = (
    name: keyof typeof Icons
  ): React.ComponentType<React.SVGProps<SVGSVGElement>> => {
    return Icons[name] as React.ComponentType<React.SVGProps<SVGSVGElement>>;
  };

  // Define consistent border colors for steps
  const stepBorderColors = {
    1: "rgb(59, 130, 246)", // blue-500
    2: "rgb(168, 85, 247)", // purple-500
    3: "rgb(236, 72, 153)", // pink-500
    4: "rgb(251, 146, 60)", // orange-400
  };

  // Dark mode color classes
  const colors = {
    bg: isDarkMode ? "bg-[#1F2937]" : "bg-[#FEF3C7]",
    navBg: isDarkMode ? "bg-gray-900/90" : "bg-white/90",
    border: isDarkMode ? "border-[#374151]" : "border-[#FDE68A]",
    text: isDarkMode ? "text-[#F9FAFB]" : "text-[#78350F]",
    textSecondary: isDarkMode ? "text-[#F9FAFB]/80" : "text-[#78350F]/80",
    textMuted: isDarkMode ? "text-[#F9FAFB]/60" : "text-[#78350F]/60",
    card: isDarkMode ? "bg-[#111827]" : "bg-white",
    cardHover: isDarkMode ? "hover:bg-[#1F2937]" : "hover:bg-[#FEF3C7]",
    lightBg: isDarkMode ? "bg-[#374151]" : "bg-[#FEF3C7]",
    footerBg: isDarkMode ? "bg-[#111827]" : "bg-[#78350F]",
    footerText: isDarkMode ? "text-[#F9FAFB]" : "text-white",
    footerTextMuted: isDarkMode ? "text-[#F9FAFB]/70" : "text-white/70",
    gradientBg: isDarkMode 
      ? "bg-gradient-to-br from-[#1F2937] via-[#374151] to-[#4B5563]" 
      : "bg-gradient-to-br from-[#FEF3C7] via-white to-[#FED7AA]",
  };

  return (
    <div className={`min-h-screen ${colors.bg} font-[Open_Sans]`}>
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 ${colors.navBg} backdrop-blur-md border-b ${colors.border}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-[Space_Grotesk] font-bold bg-gradient-to-r from-[#FB923C] to-[#EC4899] bg-clip-text text-transparent">
                Lynkkey
              </h1>
              <div className="hidden md:flex items-center space-x-6">
                <a href="#" className={`${colors.text} hover:text-[#EC4899] transition-colors`}>
                  How It Works
                </a>
                <a href="#" className={`${colors.text} hover:text-[#EC4899] transition-colors`}>
                  Features
                </a>
                <a href="#" className={`${colors.text} hover:text-[#EC4899] transition-colors`}>
                  Pricing
                </a>
                <a href="#" className={`${colors.text} hover:text-[#EC4899] transition-colors`}>
                  About
                </a>
                <a href="#" className={`${colors.text} hover:text-[#EC4899] transition-colors`}>
                  Contact
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Dark mode toggle */}
              <button className={`p-2 rounded-lg ${colors.cardHover} transition-colors`}>
                {isDarkMode ? (
                  <Icons.Sun className="w-5 h-5 text-[#F9FAFB]" />
                ) : (
                  <Icons.Moon className="w-5 h-5 text-[#78350F]" />
                )}
              </button>
              <button className={`px-4 py-2 ${colors.text} hover:text-[#EC4899] transition-colors`}>
                Login
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white rounded-lg hover:shadow-lg hover:shadow-pink-300/50 transition-all">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-6">
        <div className={`absolute inset-0 ${colors.gradientBg} opacity-50`}></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h2 className={`text-5xl md:text-6xl font-[Space_Grotesk] font-bold ${colors.text} mb-6`}>
            Connect Brands with Creators
            <br />
            <span className="bg-gradient-to-r from-[#FB923C] to-[#EC4899] bg-clip-text text-transparent">
              Effortlessly
            </span>
          </h2>
          <p className={`text-xl ${colors.textSecondary} mb-8 max-w-3xl mx-auto`}>
            Discover authentic partnerships through intelligent matching, secure payments, and real-time collaboration tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white rounded-lg hover:shadow-lg hover:shadow-pink-300/50 transition-all">
              Get Started Free
            </button>
            <button className={`px-8 py-3 ${colors.card} ${colors.text} rounded-lg border ${colors.border} ${colors.cardHover} transition-all`}>
              See How It Works
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className={`text-4xl font-[Space_Grotesk] font-bold text-center ${colors.text} mb-12`}>
            How It Works
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: 1,
                title: "Sign Up",
                desc: "Create your profile as a Creator or Brand",
                gradient: "from-blue-400 to-purple-500",
              },
              {
                step: 2,
                title: "Browse Campaigns",
                desc: "Discover opportunities or post your own",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                step: 3,
                title: "Get Matched",
                desc: "Connect with perfect partners through AI",
                gradient: "from-pink-500 to-orange-500",
              },
              {
                step: 4,
                title: "Track & Earn",
                desc: "Monitor results and receive secure payments",
                gradient: "from-orange-500 to-yellow-500",
              },
            ].map((item) => (
              <div
                key={item.step}
                className={`${colors.card} rounded-xl p-6 border-t-4 hover:shadow-xl transition-all`}
                style={{ borderTopColor: stepBorderColors[item.step as keyof typeof stepBorderColors] }}
              >
                <div
                  className={`w-12 h-12 rounded-full ${item.gradient} bg-gradient-to-r flex items-center justify-center text-white font-bold mb-4`}
                >
                  {item.step}
                </div>
                <h4 className={`font-semibold ${colors.text} mb-2`}>{item.title}</h4>
                <p className={`${colors.textMuted} text-sm`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className={`py-20 px-6 ${colors.card}`}>
        <div className="max-w-7xl mx-auto">
          <h3 className={`text-4xl font-[Space_Grotesk] font-bold text-center ${colors.text} mb-12`}>
            Powerful Features
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "BarChart3",
                title: "Real-time Analytics",
                desc: "Track campaign performance with detailed insights",
              },
              {
                icon: "Shield",
                title: "Escrow Protection",
                desc: "Secure payment system protecting both parties",
              },
              {
                icon: "CheckCircle",
                title: "Verified Creators",
                desc: "Work with authentic, vetted influencers",
              },
              {
                icon: "Zap",
                title: "Smart Match Engine",
                desc: "AI-powered recommendations for perfect partnerships",
              },
              {
                icon: "Star",
                title: "Reviews & Ratings",
                desc: "Build trust through transparent feedback",
              },
              {
                icon: "LayoutDashboard",
                title: "Campaign Dashboard",
                desc: "Manage all collaborations from one place",
              },
            ].map((feature) => {
              const FeatureIcon = getIcon(feature.icon as keyof typeof Icons);
              return (
                <div key={feature.title} className={`${colors.lightBg} rounded-xl p-6 hover:shadow-lg transition-all`}>
                  <FeatureIcon className="w-8 h-8 text-[#EC4899] mb-4" />
                  <h4 className={`font-semibold ${colors.text} mb-2`}>{feature.title}</h4>
                  <p className={`${colors.textMuted} text-sm`}>{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className={`text-4xl font-[Space_Grotesk] font-bold text-center ${colors.text} mb-12`}>
            What Our Users Say
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Johnson",
                role: "Fashion Creator",
                image: "fashion-creator-portrait",
                quote: "Lynkkey transformed my career. I've connected with amazing brands that align with my values.",
              },
              {
                name: "Michael Chen",
                role: "Brand Manager",
                image: "brand-manager-professional",
                quote: "The quality of creators on Lynkkey is outstanding. Our campaigns have never performed better.",
              },
              {
                name: "Emma Wilson",
                role: "Lifestyle Influencer",
                image: "lifestyle-influencer-smiling",
                quote: "Secure payments and transparent communication make Lynkkey my go-to platform.",
              },
            ].map((testimonial, idx) => (
              <div key={idx} className={`${colors.card} rounded-xl p-6 shadow-lg`}>
                <div className="flex items-center mb-4">
                  <img
                    src={`./images/${testimonial.image}.jpg`}
                    alt={testimonial.name}
                    data-context="Profile photo of a professional person"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className={`font-semibold ${colors.text}`}>{testimonial.name}</h4>
                    <p className={`text-sm ${colors.textMuted}`}>{testimonial.role}</p>
                  </div>
                </div>
                <p className={`${colors.textSecondary} italic`}>"{testimonial.quote}"</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Icons.Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className={`py-20 px-6 ${colors.card}`}>
        <div className="max-w-7xl mx-auto">
          <h3 className={`text-4xl font-[Space_Grotesk] font-bold text-center ${colors.text} mb-12`}>
            Success Stories
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Summer Fashion Campaign",
                brand: "StyleCo",
                creator: "Fashion Forward",
                image: "fashion-campaign-showcase",
              },
              {
                title: "Tech Product Launch",
                brand: "InnovateTech",
                creator: "Tech Guru",
                image: "tech-product-launch",
              },
              {
                title: "Food & Beverage Promotion",
                brand: "FreshBites",
                creator: "Foodie Life",
                image: "food-beverage-promotion",
              },
              {
                title: "Fitness Challenge",
                brand: "FitLife",
                creator: "Fitness Pro",
                image: "fitness-challenge-campaign",
              },
              {
                title: "Travel Adventure Series",
                brand: "Wanderlust",
                creator: "Travel Explorer",
                image: "travel-adventure-series",
              },
              {
                title: "Beauty Tutorial Campaign",
                brand: "GlowUp",
                creator: "Beauty Expert",
                image: "beauty-tutorial-campaign",
              },
            ].map((showcase, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={`./images/${showcase.image}.jpg`}
                    alt={showcase.title}
                    data-context="Campaign showcase image displaying brand and creator collaboration"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-sm font-semibold">{showcase.brand}</p>
                      <p className="text-xs opacity-90">× {showcase.creator}</p>
                    </div>
                  </div>
                </div>
                <h4 className={`mt-3 font-semibold ${colors.text}`}>{showcase.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className={`text-4xl font-[Space_Grotesk] font-bold text-center ${colors.text} mb-8`}>
            Simple, Transparent Pricing
          </h3>

          {/* Toggle */}
          <div className="flex justify-center mb-12">
            <div className={`${colors.card} rounded-lg p-1 border ${colors.border}`}>
              <button
                className={`px-6 py-2 rounded-md transition-all ${
                  !isYearly ? "bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white" : colors.text
                }`}
              >
                Monthly
              </button>
              <button
                className={`px-6 py-2 rounded-md transition-all ${
                  isYearly ? "bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white" : colors.text
                }`}
              >
                Yearly (Save 20%)
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Free Trial",
                price: isYearly ? "$0" : "$0",
                period: "forever",
                features: [
                  "3 campaign applications/month",
                  "Basic profile",
                  "Limited analytics",
                ],
                highlighted: false,
              },
              {
                name: "Pro",
                price: isYearly ? "$48" : "$60",
                period: isYearly ? "/year" : "/month",
                features: [
                  "Unlimited applications",
                  "Advanced analytics",
                  "Priority support",
                  "Verified badge",
                ],
                highlighted: true,
              },
              {
                name: "Premium",
                price: isYearly ? "$96" : "$120",
                period: isYearly ? "/year" : "/month",
                features: [
                  "Everything in Pro",
                  "White-label reports",
                  "Dedicated manager",
                  "API access",
                ],
                highlighted: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`${colors.card} rounded-xl p-8 ${plan.highlighted ? "ring-2 ring-[#EC4899] shadow-xl" : `border ${colors.border}`}`}
              >
                <h4 className={`text-xl font-semibold ${colors.text} mb-2`}>{plan.name}</h4>
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${colors.text}`}>{plan.price}</span>
                  <span className={colors.textMuted}>{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className={`flex items-center ${colors.textSecondary}`}>
                      <Icons.Check className="w-5 h-5 text-[#10B981] mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg transition-all ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white hover:shadow-lg hover:shadow-pink-300/50"
                      : `${colors.lightBg} ${colors.text} hover:bg-[#FDE68A]`
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#FB923C] to-[#EC4899] rounded-2xl p-12 text-center text-white">
          <h3 className="text-4xl font-[Space_Grotesk] font-bold mb-4">Join Lynkkey Today</h3>
          <p className="text-xl mb-8 opacity-90">
            Start creating meaningful brand partnerships in minutes
          </p>
          <button className="px-8 py-3 bg-white text-[#EC4899] rounded-lg font-semibold hover:bg-gray-100 transition-all">
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${colors.footerBg} ${colors.footerText} py-12 px-6`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-2xl font-[Space_Grotesk] font-bold mb-4">Lynkkey</h4>
              <p className={`${colors.footerTextMuted} text-sm`}>
                Connecting brands and creators for authentic collaborations
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Product</h5>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Connect</h5>
              <div className="flex space-x-4">
                <Icons.Twitter className="w-5 h-5 text-white/70 hover:text-white cursor-pointer" />
                <Icons.Instagram className="w-5 h-5 text-white/70 hover:text-white cursor-pointer" />
                <Icons.Linkedin className="w-5 h-5 text-white/70 hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/50 text-sm">
            © 2024 Lynkkey. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
