import PlayerTimeSlot from "../buttons/PlayerTimeSlot";
import React from "react";

interface Props {
  dayHours: { [key: string]: { [key: number]: string } };

  onHoursStateChange: (
    day: string,
    hour: number,
    newState: "available" | "single" | "recurring",
    selectedDay?: string
  ) => void;
  onSelectAllSlotsForDays: (
    day: string,
    currentStates: { [hour: number]: string },
    hoursOfDay: number[]
  ) => void;
  onSelectAllSlotsForHours: (
    hour: number,
    currentStates: { [day: string]: string },
    daysOfWeek: string[]
  ) => void;
  className?: string;
}

const PlayerCalendarDesktop: React.FC<Props> = ({
  dayHours,
  onHoursStateChange,
  onSelectAllSlotsForDays,
  onSelectAllSlotsForHours,
  className = "",
}) => {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const hoursOfDay = Array.from({ length: 24 }, (_, i) => i + 1);

  return (
    <div className={`my-5 w-full flex ${className}`}>
      {/* Days Names Column */}
      <div className="flex flex-col">
        <div className="h-10"></div>
        {daysOfWeek.map((day, index) => (
          <div key={day} className="h-10 flex items-center">
            <button
              className="hidden md:inline text-lightPurple font-robotoMono font-regular uppercase"
              onClick={() =>
                onSelectAllSlotsForDays(day, dayHours[day] || {}, hoursOfDay)
              }
            >
              {day}
            </button>
          </div>
        ))}
      </div>

      {/* Hours columns */}
      <div className="flex flex-col w-full">
        <div className="flex flex-row">
          <div className="w-5 md:w-10 h-10"></div>
          <div className="flex flex-row justify-between w-full">
            {hoursOfDay.map((hour) => (
              <div
                key={hour}
                className="text-center justify-center items-center"
              >
                <button
                  className="text-lightPurple font-robotoMono font-regular uppercase text-center w-full h-10 pb-2"
                  onClick={() =>
                    onSelectAllSlotsForHours(
                      hour,
                      daysOfWeek.reduce(
                        (states, day) => ({
                          ...states,
                          [day]: dayHours[day]?.[hour] || "available",
                        }),
                        {}
                      ),
                      daysOfWeek
                    )
                  }
                >
                  {hour}
                </button>
                <div className="flex flex-col">
                  {daysOfWeek.map((day) => (
                    <div
                      key={`${day}-${hour}`}
                      className="h-10 flex flex-shrink"
                    >
                      <PlayerTimeSlot
                        day={day}
                        hour={hour}
                        state={
                          (dayHours[day]?.[hour] as
                            | "available"
                            | "single"
                            | "recurring") || "available"
                        }
                        onStateChange={onHoursStateChange}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCalendarDesktop;
