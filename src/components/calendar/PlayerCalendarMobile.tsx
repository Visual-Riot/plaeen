import PlayerTimeSlot from "../buttons/PlayerTimeSlot";
import DayButton from "../buttons/DayButton";

export default function PlayerCalendarMobile({ className = "", ...props }) {
  const daysOfWeekShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const hoursOfDay = Array.from({ length: 24 }, (_, i) => i + 1);

  return (
    <div className={`my-10 ${className}`}>
      <div className="w-full">
        {/* Days Names Column */}
        <div className="grid grid-cols-7 gap-2 md:gap-4 px-2 mt-4">
          {daysOfWeekShort.map((day) => (
            <div key={day} className="flex justify-center">
              <DayButton
                key={day}
                onClick={() => console.log(day)}
                state="unselected"
              >
                {day}
              </DayButton>
            </div>
          ))}
        </div>

        {/* Hours columns */}

        <div className="grid grid-cols-6 gap-2 md:gap-4 px-2 mt-4">
          {hoursOfDay.map((hour) => (
            <div key={hour} className="flex justify-center">
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
    </div>
  );
}
