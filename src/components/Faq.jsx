import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
  {
    question: "How many events a delegate can participate?",
    answer: "A delegate can participate in up to 3 events."
  },
  {
    question: "What is the last date for registration?",
    answer: "The last date for registration will be announced soon."
  },
  {
    question: "What are the supporting facilities provided on behalf of institution?",
    answer: "Food, accommodation and transport support will be provided."
  },
  {
    question: "What are the Policies to be followed?",
    answer: "All delegates must carry their ID cards and follow code of conduct."
  },
  {
    question: "What is the advantage of group registration from a particular college?",
    answer: "Group registration offers discounted pricing and priority access."
  },
  {
    question: "How about parking facilities for vehicles?",
    answer: "Parking space is available inside the campus for all participants."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 items-start">

  {/* LEFT SIDE */}
  <div>

    <h1 className="text-5xl font-bold leading-tight mb-8">
      Frequently asked <br />
      <span className="text-gray-500">Questions</span>
    </h1>

    {/* IMAGE BELOW HEADING (hidden on mobile) */}
    <img
      src="/img/1.webp"
      alt="FAQ"
      className="hidden md:block w-72 mt-4 opacity-90"
    />
  </div>

  {/* RIGHT SIDE (FAQ LIST) */}
  <div className="space-y-5 md:col-span-2">
    {faqs.map((faq, index) => (
      <div
        key={index}
        className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl p-6 shadow-lg transition-all duration-300"
      >
        <button
          className="flex justify-between items-center w-full text-left"
          onClick={() =>
            setOpenIndex(openIndex === index ? null : index)
          }
        >
          <span className="text-lg font-medium">
            {faq.question}
          </span>

          <span className="bg-neutral-700 p-2 rounded-full">
            {openIndex === index ? <FiMinus /> : <FiPlus />}
          </span>
        </button>

        {openIndex === index && (
          <p className="mt-4 text-gray-400 leading-relaxed">
            {faq.answer}
          </p>
        )}
      </div>
    ))}
  </div>

</div>
    </section>
  );
}
