import PlayerTimeSlot from "../buttons/PlayerTimeSlot";
import DayButton from "../buttons/DayButton";
import React, { useState } from "react";
import { startOfWeek, endOfWeek, format } from "date-fns";

interface PlayerCalendarMobileProps {
  dayHours: { [key: string]: { [key: number]: string } };
  selectedDay: string;
  currentDate: Date;
  onHoursStateChange: (
    day: string,
    hour: number,
    newState: "available" | "single" | "recurring"
  ) => void;
  className?: string;
}

const PlayerCalendarMobile: React.FC<PlayerCalendarMobileProps> = ({
  dayHours,
  currentDate,
  onHoursStateChange,
  className,
}) => {
  const daysOfWeek: string[] = [];
  const start = startOfWeek(currentDate, { weekStartsOn: 1 });
  const end = endOfWeek(currentDate, { weekStartsOn: 1 });

  for (
    let date = start;
    date <= end;
    date = new Date(date.setDate(date.getDate() + 1))
  ) {
    daysOfWeek.push(format(date, "EEEE"));
  }

  const formatHour = (hour: number) => {
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return { formattedHour, ampm };
  };

  const hoursOfDay = Array.from({ length: 24 }, (_, i) => i + 1);

  const [selectedDay, setSelectedDay] = useState<string>("Monday");

  const handleDayChange = (day: string) => {
    setSelectedDay(day);
  };

  // render player time slots for each day of the week depending on the selected day
  const renderTimeSlots = () => {
    return hoursOfDay.map((hour) => {
      const slotState = dayHours[selectedDay]?.[hour] || "available";
      const { formattedHour, ampm } = formatHour(hour);
      return (
        <div key={hour} className="flex justify-center">
          <PlayerTimeSlot
            day={selectedDay}
            hour={hour}
            state={slotState as "available" | "single" | "recurring"}
            displayedHour={{ hour: formattedHour, ampm }}
            onStateChange={onHoursStateChange}
          />
        </div>
      );
    });
  };

  return (
    <div className={`mt-2 mb-10 ${className}`}>
      <div className="w-full">
        {/* Days Names Column */}
        <div className="grid grid-cols-7 gap-1 md:gap-1 px-2 mt-4">
          {daysOfWeek.map((day) => (
            <div key={day} className="flex justify-center">
              <DayButton
                // key={day}
                state={selectedDay === day ? "selected" : "unselected"}
                onClick={() => {
                  handleDayChange(day);
                }}
              >
                {day.slice(0, 3)}
              </DayButton>
            </div>
          ))}
        </div>

        {/* Render time slots for the selected day */}
        <div className="grid grid-cols-6 gap-2 md:gap-4 px-2 mt-4">
          {renderTimeSlots()}
        </div>
        {/* end of render time slots */}
      </div>
    </div>
  );
};

export default PlayerCalendarMobile;

// return backup:
// return (
//   <div className={`mt-2 mb-10 ${className}`}>
//     <div className="w-full">
//       {/* Days Names Column */}
//       <div className="grid grid-cols-7 gap-1 md:gap-1 px-2 mt-4">
//         {daysOfWeek.map((day) => (
//           <div key={day} className="flex justify-center">
//             <DayButton
//               // key={day}
//               state={selectedDay === day ? "selected" : "unselected"}
//               onClick={() => {
//                 handleDayChange(day);
//               }}
//             >
//               {day.slice(0, 3)}
//             </DayButton>
//           </div>
//         ))}
//       </div>

//       {/* Render time slots for the selected day */}
//       <div className="grid grid-cols-6 gap-2 md:gap-4 px-2 mt-4">
//         {renderTimeSlots()}
//       </div>
//       {/* end of render time slots */}
//     </div>
//   </div>
// );

// renderTimeSlots backup:
// const renderTimeSlots = () => {
//   return hoursOfDay.map((hour) => {
//     const { formattedHour, ampm } = formatHour(hour);
//     const slotState = dayHours[selectedDay]?.[hour] || "available";
//     return (
//       <div key={hour} className="flex justify-center">
//         <PlayerTimeSlot
//           day={selectedDay}
//           hour={hour}
//           state={slotState as "available" | "single" | "recurring"}
//           displayedHour={{ hour: formattedHour, ampm }}
//           onStateChange={onHoursStateChange}
//         />
//       </div>
//     );
//   });
// };
