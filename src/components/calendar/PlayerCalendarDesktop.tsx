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
  className?: string;
}

const PlayerCalendarDesktop: React.FC<Props> = ({
  dayHours,
  onHoursStateChange,
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
            <h2 className="hidden md:inline text-lightPurple font-robotoMono font-regular uppercase">
              {day}
            </h2>
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
                <h2 className="text-lightPurple font-robotoMono font-regular uppercase text-center w-full h-10">
                  {hour}
                </h2>
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
