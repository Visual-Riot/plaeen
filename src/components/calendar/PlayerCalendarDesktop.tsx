import PlayerTimeSlot from "../buttons/PlayerTimeSlot";

export default function PlayerCalendarDesktop({ className = "", ...props }) {
  const daysOfWeekFull = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const daysOfWeekShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const hoursOfDay = Array.from({ length: 24 }, (_, i) => i + 1);

  return (
    <div className={`my-5 w-full flex ${className}`}>
      {/* Days Names Column */}
      <div className="flex flex-col">
        <div className="h-10"></div>
        {daysOfWeekFull.map((day, index) => (
          <div key={day} className="h-10 flex items-center">
            <h2 className="hidden md:inline text-lightPurple font-robotoMono font-regular uppercase">
              {day}
            </h2>
            <h2 className="inline md:hidden text-lightPurple font-robotoMono font-regular uppercase">
              {daysOfWeekShort[index]}
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
                  {daysOfWeekFull.map((day) => (
                    <div
                      key={`${day}-${hour}`}
                      className="h-10 flex flex-shrink"
                    >
                      <PlayerTimeSlot state="available" hour={hour} day={day} />
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
}
