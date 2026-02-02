import { useState } from "react";

const agendaData = {
  day1: {
    date: "27 March, 2026",
    events: [
      {
        time: "8:00 AM - 9:00 AM",
        title: "Registration",
      },
      {
        time: "9:00 AM - 9:30 AM",
        title: "Inauguration Ceremony",
      },
      {
        time: "1:30 PM - 2:15 PM",
        title: "Lunch Break",
      },
      {
        time: "2:15 PM - 4:15 PM",
        title: "Round One Evaluation and Elimination",
      },
      {
        time : "5:00 PM - 8:00 Pm",
        title : "Round two",
      },
      {
        time : "8:00 PM - 8:45 PM",
        title : "Dinner",
      },
      {
        time : "8:45P PM - 10:00 PM",
        title : "Round Two",
      }
     
    ]
  },
  day2: {
    date: "28 March, 2026",
    events: [
      {
        time: "5:00 AM - 8:00 AM",
        title: "Round Two",
       
      },
      {
        time: "8:00 AM - 8:45 AM",
        title: "Breakfast",
      },
      {
        time : "8:45 AM - 12:15 PM",
        title : "Round Two",
      },
      {
        time : "12:15 PM - 1:15 PM",
        title : "Round Two Evaluation",
      },
      {
        time : "1:15 PM - 2:00 PM",
        title : "Lunch",
      },
      {
        time : "2:00 PM - 3:00 PM",
        title : "Valedictory",
      }
    ]
  }
};

export default function EventAgenda() {
  const [activeDay, setActiveDay] = useState("day1");
  const day = agendaData[activeDay];

  return (
    <section id="agenda" className="min-h-screen bg-black text-white px-6 py-20">

      {/* CENTERED HEADER SECTION */}
      <div className="flex flex-col items-center text-center mb-16">

        <h1 className="text-5xl md:text-6xl font-bold max-w-4xl leading-tight mb-12">
          HackXelerate'26{" "}
          <span className="text-[#c17817]">Agenda</span>
        </h1>

        {/* Day Selector */}
        <div className="flex w-full max-w-4xl rounded-full bg-neutral-800 overflow-hidden">
          <button
            onClick={() => setActiveDay("day1")}
            className={`w-1/3 py-4 text-xl font-semibold transition ${
              activeDay === "day1"
                ? "bg-[#c17817]"
                : "text-gray-400"
            }`}
          >
            Day 1
          </button>

       <h2 className="w-1/3 flex items-center justify-center text-xl font-semibold select-none">
  {day.date}
</h2>


          <button
            onClick={() => setActiveDay("day2")}
            className={`w-1/3 py-4 text-xl font-semibold transition ${
              activeDay === "day2"
                ? "bg-blue-600"
                : "text-gray-400"
            }`}
          >
            Day 2
          </button>
        </div>

      </div>

      {/* EVENTS */}
      <div className="space-y-8 max-w-5xl mx-auto">

        {day.events.map((event, index) => (
          <div key={index} className="w-full">

            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] p-8 rounded-2xl shadow-lg w-full">

              {/* Time inside box */}
              <span className="inline-block bg-neutral-800 text-gray-300 text-sm px-4 py-1 rounded-full mb-3">
                {event.time}
              </span>

              <h2 className="text-2xl font-bold mb-4">
                {event.title}
              </h2>

              {event.points && (
                <ul className="list-disc list-inside space-y-2 text-gray-400">
                  {event.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              )}

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}
