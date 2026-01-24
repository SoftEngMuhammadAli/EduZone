import React, { useState } from "react";
import { listOfFrequentlyAskedQuestions } from "../../../utils/FAQ";
import {
  ChevronDown,
  HelpCircle,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react";
import { askedQuestionsCategoriesData } from "../../../utils/AppUtils";

const AskedQuestions = () => {
  const [activeId, setActiveId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleFAQ = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  const filteredFAQs = listOfFrequentlyAskedQuestions.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <section className="relative bg-linear-to-b from-white to-gray-50 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-linear-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-sm font-semibold mb-4">
            <HelpCircle className="w-4 h-4" />
            FIND ANSWERS QUICKLY
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked{" "}
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get instant answers to common questions about our platform, courses,
            and learning experience.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl px-6 py-4 pl-12 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <HelpCircle className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Browse by Category
                </h3>
                <div className="space-y-3">
                  {askedQuestionsCategoriesData.map((category, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
                          {category.icon}
                        </div>
                        <span className="font-medium text-gray-700">
                          {category.label}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-linear-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Still Need Help?
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  Our support team is here to help you with any questions you
                  may have.
                </p>
                <div className="space-y-4">
                  <a
                    href="tel:+6288999222333"
                    className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Call Us</div>
                      <div className="font-semibold">+62 88 999 222 333</div>
                    </div>
                  </a>
                  <a
                    href="mailto:support@eduzone.com"
                    className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Email Us</div>
                      <div className="font-semibold">support@eduzone.com</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {filteredFAQs.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <HelpCircle className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No Results Found
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    We couldn't find any questions matching "{searchTerm}". Try
                    different keywords or browse by category.
                  </p>
                </div>
              ) : (
                filteredFAQs.map((faq) => (
                  <div
                    key={faq.id}
                    className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full text-left p-6 md:p-8"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                              <span className="text-white text-sm font-bold">
                                {String(faq.id).padStart(2, "0")}
                              </span>
                            </div>
                            <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                              {
                                askedQuestionsCategoriesData[
                                  Math.min(
                                    faq.id - 1,
                                    askedQuestionsCategoriesData.length - 1,
                                  )
                                ].label
                              }
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                            {faq.question}
                          </h3>
                        </div>
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                            activeId === faq.id
                              ? "bg-linear-to-br from-blue-500 to-purple-500 text-white rotate-180"
                              : "bg-gray-100 text-gray-700 group-hover:bg-gray-200"
                          }`}
                        >
                          <ChevronDown className="w-5 h-5" />
                        </div>
                      </div>

                      {activeId === faq.id && (
                        <div className="mt-6 pt-6 border-t border-gray-100">
                          <div className="flex gap-3 mb-4">
                            <MessageSquare className="w-5 h-5 text-blue-500 mt-1" />
                            <p className="text-gray-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span className="px-3 py-1 bg-gray-100 rounded-full">
                              Helpful?
                            </span>
                            <button className="px-3 py-1 hover:bg-gray-100 rounded-full transition-colors">
                              Yes
                            </button>
                            <button className="px-3 py-1 hover:bg-gray-100 rounded-full transition-colors">
                              No
                            </button>
                          </div>
                        </div>
                      )}
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* FAQ Stats */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-linear-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {listOfFrequentlyAskedQuestions.length}+
                </div>
                <div className="text-gray-700 font-medium">
                  Answered Questions
                </div>
              </div>
              <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  24/7
                </div>
                <div className="text-gray-700 font-medium">
                  Support Available
                </div>
              </div>
              <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  98%
                </div>
                <div className="text-gray-700 font-medium">
                  Satisfaction Rate
                </div>
              </div>
            </div>

            {/* Additional Help */}
            <div className="mt-12 bg-linear-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    Still Have Questions?
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Our comprehensive knowledge base and expert support team are
                    here to ensure you have the best learning experience.
                  </p>
                  <button className="bg-white text-gray-900 font-semibold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors">
                    Visit Knowledge Base
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">5min</div>
                    <div className="text-sm text-gray-300">
                      Avg. Response Time
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">100%</div>
                    <div className="text-sm text-gray-300">Resolution Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">EN</div>
                    <div className="text-sm text-gray-300">
                      Multi-language Support
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">∞</div>
                    <div className="text-sm text-gray-300">
                      24/7 Availability
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AskedQuestions;
