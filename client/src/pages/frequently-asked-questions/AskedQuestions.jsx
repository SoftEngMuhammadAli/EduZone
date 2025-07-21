import React, { useState } from "react";
import { listOfFrequentlyAskedQuestions } from "../../utils";

const AskedQuestions = () => {
  const [activeId, setActiveId] = useState(1);

  const toggleFAQ = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-xl my-10 px-4 py-8 md:px-8 lg:px-16 gap-8 max-w-7xl mx-auto">
      {/* Left Side */}
      <div className="w-full md:w-1/3">
        <h2 className="sm:text-3xl md:text-4xl font-bold mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          Still confused or unsure? Contact us at:
          <br />
          <span className="font-semibold text-[#000000] block mt-1">
            +6288 999 222 333
          </span>
        </p>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-2/3 space-y-5">
        {listOfFrequentlyAskedQuestions.map((faq) => (
          <div
            key={faq.id}
            className="border-b pb-4 cursor-pointer transition-all duration-300"
            onClick={() => toggleFAQ(faq.id)}
          >
            <div className="flex items-start justify-between text-base md:text-lg font-medium text-[#000000] gap-4">
              <span className="flex-1">
                <span className="text-[#2405F2] font-semibold mr-2">
                  {String(faq.id).padStart(2, "0")}.
                </span>
                {faq.question}
              </span>

              <span className="text-xl">{activeId === faq.id ? "✕" : "+"}</span>
            </div>
            {activeId === faq.id && (
              <p className="mt-3 text-sm text-gray-600 leading-snug">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AskedQuestions;
