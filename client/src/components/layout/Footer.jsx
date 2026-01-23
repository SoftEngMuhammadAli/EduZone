import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  Youtube,
  GraduationCap,
  BookOpen,
  Shield,
  Heart,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const AppFooter = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <Instagram className="w-5 h-5" />,
      label: "Instagram",
      color: "hover:text-[#E1306C]",
      bg: "bg-gradient-to-br from-pink-500 to-orange-500",
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      label: "Twitter",
      color: "hover:text-[#1DA1F2]",
      bg: "bg-gradient-to-br from-blue-400 to-cyan-400",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      color: "hover:text-[#0077B5]",
      bg: "bg-gradient-to-br from-blue-600 to-blue-800",
    },
    {
      icon: <Facebook className="w-5 h-5" />,
      label: "Facebook",
      color: "hover:text-[#1877F2]",
      bg: "bg-gradient-to-br from-blue-500 to-blue-700",
    },
    {
      icon: <Youtube className="w-5 h-5" />,
      label: "YouTube",
      color: "hover:text-[#FF0000]",
      bg: "bg-gradient-to-br from-red-500 to-red-700",
    },
  ];

  const programs = [
    { name: "Independent Learning", icon: <BookOpen className="w-4 h-4" /> },
    { name: "Entrepreneur Track", icon: <GraduationCap className="w-4 h-4" /> },
    { name: "Career Development", icon: <Sparkles className="w-4 h-4" /> },
    { name: "Skill Certification", icon: <Shield className="w-4 h-4" /> },
  ];

  const supportLinks = [
    { name: "About Us", href: "/about" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Help Center", href: "/help" },
    { name: "Contact Support", href: "/contact" },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Blog", href: "/blog" },
    { name: "FAQ", href: "/faq" },
    { name: "Pricing", href: "/pricing" },
  ];

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      text: "softeng.aliijaz@gmail.com",
      href: "mailto:softeng.aliijaz@gmail.com",
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      text: "+92 302 8186660",
      href: "tel:+923028186660",
      gradient: "from-purple-500 to-pink-400",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      text: "Lahore, Pakistan",
      href: "#",
      gradient: "from-green-500 to-emerald-400",
    },
  ];

  const stats = [
    { value: "21K+", label: "Active Learners" },
    { value: "150+", label: "Courses" },
    { value: "50+", label: "Expert Instructors" },
    { value: "98%", label: "Satisfaction Rate" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-900/10 rounded-full mix-blend-screen filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-900/10 rounded-full mix-blend-screen filter blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Top Section - Newsletter */}
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-3xl p-8 lg:p-12 mb-16 border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-white rounded-full text-sm font-semibold mb-4">
                <Sparkles className="w-4 h-4" />
                STAY UPDATED
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Join Our Learning Community
              </h3>
              <p className="text-gray-300">
                Get the latest course updates, learning tips, and exclusive
                offers delivered to your inbox.
              </p>
            </div>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="absolute right-2 top-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-xl font-bold">EZ</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  EDU-ZONE
                </h3>
                <p className="text-sm text-gray-400">Future of Learning</p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">
              Transform your potential into expertise with our cutting-edge
              learning platform. Empowering learners worldwide to build and
              achieve their dreams.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              {contactInfo.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  className="group flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                >
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${contact.gradient} flex items-center justify-center`}
                  >
                    {contact.icon}
                  </div>
                  <span className="font-medium">{contact.text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Programs Column */}
          <div>
            <h4 className="text-lg font-bold mb-6 pb-3 border-b border-white/10">
              Learning Programs
            </h4>
            <ul className="space-y-3">
              {programs.map((program, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="group flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                      {program.icon}
                    </div>
                    <span>{program.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-lg font-bold mb-6 pb-3 border-b border-white/10">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="text-lg font-bold mb-6 pb-3 border-b border-white/10">
              Support & Legal
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
            >
              <div className="text-3xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Social Media & Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          {/* Social Media */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <span className="text-gray-300 font-medium">
                Connect with us:
              </span>
              <div className="flex gap-2">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`group w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:shadow-lg transition-all ${social.color}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg ${social.bg} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity`}
                    >
                      {social.icon}
                    </div>
                    <div className="absolute opacity-100 group-hover:opacity-0 transition-opacity">
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>Certified & Secure</span>
              <Shield className="w-5 h-5 text-green-400" />
              <span>SSL Encrypted</span>
            </div>
          </div>

          {/* Copyright & Bottom Links */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
            <div className="flex items-center gap-2 text-gray-400">
              <span>© {currentYear} EDU-ZONE. All rights reserved.</span>
              <Heart className="w-4 h-4 text-red-400 fill-current" />
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Accessibility
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Site Map
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Careers
              </a>
            </div>
          </div>

          {/* Attribution */}
          <div className="text-center mt-8">
            <p className="text-xs text-gray-500">
              Empowering the next generation of learners and innovators
              worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-20 left-10 w-4 h-4 bg-blue-500 rounded-full animate-ping opacity-20"></div>
      <div className="absolute top-20 right-10 w-4 h-4 bg-purple-500 rounded-full animate-ping opacity-20 delay-300"></div>
    </footer>
  );
};
