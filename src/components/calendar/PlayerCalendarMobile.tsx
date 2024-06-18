import PlayerTimeSlot from "../buttons/PlayerTimeSlot";
import DayButton from "../buttons/DayButton";

export default function PlayerCalendarMobile({ className = "", ...props }) {
  const daysOfWeekShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const hoursOfDay = Array.from({ length: 24 }, (_, i) => i + 1);

  return (
    <div className={`my-10 ${className}`}>
      <div className="w-full">
        {/* Days Names Column */}
        <div className="flex w-full justify-between px-2">
          {daysOfWeekShort.map((day) => (
            // <h2 className="text-lightPurple font-robotoMono font-regular uppercase text-center flex-1">
            //   {day}
            // </h2>
            <DayButton key={day} onClick={() => console.log(day)}>
              {day}
            </DayButton>
          ))}
        </div>

        {/* Hours columns */}

        <div className="grid grid-cols-6 gap-4 px-2 mt-4 ">
          {hoursOfDay.map((hour) => (
            <div key={hour} className="flex flex-col items-center">
              <PlayerTimeSlot
                state="available"
                day="day"
                hour={hour}
                className="w-full"
                displayedHour={hour}
              />
            </div>
          ))}
        </div>
      </div>

      {/* <div className="flex flex-col w-full">
        <div className="flex flex-row justify-between pr-6">
          <div className="w-5 md:w-20 h-10"></div>
          <div
            className="flex flex-row justify-between  overflow-x-auto"
            style={{ scrollbarWidth: "none" }}
          >
            {hoursOfDay.map((hour) => (
              <div
                key={hour}
                className="text-center justify-center items-center"
              >
                <h2 className="text-lightPurple font-robotoMono font-regular uppercase text-center w-10 h-10">
                  {hour}
                </h2>
                <div>
                  {daysOfWeekFull.map((day) => (
                    <div key={`${day}-${hour}`} className="h-10">
                      <PlayerTimeSlot state="available" hour={hour} day={day} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
}
