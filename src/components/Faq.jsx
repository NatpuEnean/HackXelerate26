import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
  {
    question: "What is HackXelerate’26?",
    answer: "HackXelerate’26 is a national-level hackathon where students come together to innovate and build solutions."
  },
  {
    question: "Who can participate?",
    answer: "Students from any college and year across India are welcome to participate."
  },
  {
    question: "How many members can be in a team?",
    answer: "Each team can have 4 to 6 members, and a participant can be part of only one team."
  },
  {
    question: "How does the hackathon take place?",
    answer: "The event begins with an abstract submission, followed by an on-campus hackathon conducted in two rounds."
  },
  {
    question: "What facilities are provided?",
    answer: "Food and refreshments are provided to all participants. Accommodation is provided only for Round 2 shortlisted teams."
  },
  {
    question: "Where can I get regular updates about the event?",
    answer: "All updates and important announcements will be shared to the team leader's registered email and <a href='https://whatsapp.com/channel/0029Vb2w0RB2kNFxBXlBA33J' target='_blank' style='color: green; font-weight: bold; text-decoration: underline;'>WhatsApp</a>."
  }
];


export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="min-h-screen bg-black text-white px-6 py-20">
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
        
            <p dangerouslySetInnerHTML={{ __html: faq.answer }} className="mt-4 text-gray-400 leading-relaxed" />
          
        )}
      </div>
    ))}
  </div>

</div>
    </section>
  );
}
