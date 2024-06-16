// "use client";
import React from "react";
import PlayerTimeSlot from "../../components/buttons/PlayerTimeSlot";

export default function Page() {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const hoursOfDay = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="relative min-h-screen bg-calendar-bg bg-cover bg-center flex justify-center items-center">
      <div className="absolute inset-0 bg-black opacity-85"></div>
      <div className="relative w-4/5 h-4/5 bg-lightPurple bg-opacity-10 backdrop-filter backdrop-blur brightness-125 rounded-lg block p-10">
        <div>
          <h1 className="text-6xl text-green font-abolition justify-left">
            Calendar
          </h1>
        </div>

        <div className="flex flex-col my-10">
          {daysOfWeek.map((day) => (
            <div key={day} className="flex items-center">
              <div
                className="text-lightPurple text-center p-2 flex-shring-0"
                style={{ width: "100px" }}
              >
                {day}
              </div>

              <div className="flex flex-grow">
                {hoursOfDay.map((hour) => (
                  <div key={`${day}-${hour}`} className="flex-grow">
                    {/* {hour} */}

                    <PlayerTimeSlot hour={hour} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
