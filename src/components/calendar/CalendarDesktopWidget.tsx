import React, { use, useEffect, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachWeekOfInterval,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameWeek,
  eachDayOfInterval,
  subMonths,
  addMonths,
  set,
} from "date-fns";
import { on } from "events";

interface CalendarDesktopWidgetProps {
  currentDate: Date;
  onWeekSelect: (date: Date) => void;
  onClose?: () => void;
}

const CalendarDesktopWidget: React.FC<CalendarDesktopWidgetProps> = ({
  currentDate,
  onWeekSelect,
  onClose,
}) => {
  const [selectedDate, setSelectedDate] = useState(currentDate);

  useEffect(() => {
    setSelectedDate(currentDate);
  }, [currentDate]);

  const weeks = eachWeekOfInterval(
    {
      start: startOfWeek(startOfMonth(selectedDate), { weekStartsOn: 1 }),
      end: endOfWeek(endOfMonth(selectedDate), { weekStartsOn: 1 }),
    },
    { weekStartsOn: 1 }
  );

  const handlePrevMonthClick = () => {
    onWeekSelect(subMonths(selectedDate, 1));
  };

  const handleNextMonthClick = () => {
    onWeekSelect(addMonths(selectedDate, 1));
  };

  const handleDayClick = (day: Date) => {
    onWeekSelect(startOfWeek(day, { weekStartsOn: 1 }));
  };

  // check if the day has events
  const hasDayEvents = (date: Date): boolean => {
    const weekKey = format(
      startOfWeek(date, { weekStartsOn: 1 }),
      "dd.MM.yyyy"
    );
    const storedData = localStorage.getItem(`dayHours-${weekKey}`);

    if (!storedData) {
      return false;
    }

    const parsedData = JSON.parse(storedData);
    const dayOfWeek = format(date, "EEEE");

    return (
      parsedData[dayOfWeek] && Object.keys(parsedData[dayOfWeek]).length > 0
    );
  };

  // Is this week selected?
  const isSelectedWeek = (week: Date): boolean => {
    return isSameWeek(week, selectedDate, { weekStartsOn: 1 });
  };

  // is this week the current week?
  const isCurrentMonth = (week: Date): boolean => {
    return isSameMonth(week, new Date());
  };

  return (
    <div className="bg-gray-950 shadow-xl rounded-lg p-4">
      {/* month row */}
      <div className="flex justify-between items-center mb-4 text-base">
        <button onClick={handlePrevMonthClick} className="text-white">
          ◄
        </button>
        <span className="text-white">{format(selectedDate, "MMMM yyyy")}</span>
        <button onClick={handleNextMonthClick} className="text-white">
          ►
        </button>
      </div>
      {/* render names of days */}
      <div className="grid grid-cols-7 gap-2 mt-6 mb-2 text-base text-center text-lightPurple">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
          <div key={day} className="font-light">
            {day}
          </div>
        ))}
      </div>
      {/* render dates */}
      <div className="flex-grow grid grid-cols-7 text-lg mb-6">
        {weeks.map((week) => {
          return (
            <React.Fragment key={week.toString()}>
              {eachDayOfInterval({
                start: startOfWeek(week, { weekStartsOn: 1 }),
                end: endOfWeek(week, { weekStartsOn: 1 }),
              }).map((day) => (
                <div
                  key={day.toString()}
                  className={`relative cursor-pointer p-3 text-center font-normal text-base transition-all duration-500 ease-in-out ${
                    isSelectedWeek(week) ? "text-neonGreen" : "text-lightGrey"
                  } ${isSameMonth(day, selectedDate) ? "" : "text-gray-700"}`}
                  onClick={() => {
                    setSelectedDate(day);
                  }}
                >
                  <span className="relative">{format(day, "d")}</span>

                  {hasDayEvents(day) && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-[6px] h-[6px] bg-purple-500 rounded-full"></div>
                  )}
                </div>
              ))}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarDesktopWidget;

// import React, { useState, useEffect } from "react";
// import {
//   format,
//   startOfMonth,
//   endOfMonth,
//   eachWeekOfInterval,
//   startOfWeek,
//   endOfWeek,
//   isSameMonth,
//   eachDayOfInterval,
//   subMonths,
//   addMonths,
// } from "date-fns";

// type CalendarDesktopWidgetProps = {
//   currentDate: Date;
//   onWeekSelect: (date: Date) => void;
// };

// const CalendarDesktopWidget: React.FC<CalendarDesktopWidgetProps> = ({
//   currentDate,
//   onWeekSelect,
// }) => {
//   const [selectedDate, setSelectedDate] = useState(currentDate);

//   useEffect(() => {
//     setSelectedDate(currentDate);
//   }, [currentDate]);

//   const weeks = eachWeekOfInterval(
//     {
//       start: startOfWeek(startOfMonth(selectedDate), { weekStartsOn: 1 }),
//       end: endOfWeek(endOfMonth(selectedDate), { weekStartsOn: 1 }),
//     },
//     { weekStartsOn: 1 }
//   );

//   const handleDayClick = (date: Date) => {
//     const weekStart = startOfWeek(date, { weekStartsOn: 1 });
//     onWeekSelect(weekStart);
//   };

//   const handlePrevMonthClick = () => {
//     setSelectedDate(subMonths(selectedDate, 1));
//   };

//   const handleNextMonthClick = () => {
//     setSelectedDate(addMonths(selectedDate, 1));
//   };

//   let displayedWeekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
//   let displayedWeekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });

//   // check if the day has events
//   const hasDayEvents = (date: Date): boolean => {
//     const weekKey = format(
//       startOfWeek(date, { weekStartsOn: 1 }),
//       "dd.MM.yyyy"
//     );
//     const storedData = localStorage.getItem(`dayHours-${weekKey}`);

//     if (!storedData) {
//       return false;
//     }

//     const parsedData = JSON.parse(storedData);
//     const dayOfWeek = format(date, "EEEE");

//     return (
//       parsedData[dayOfWeek] && Object.keys(parsedData[dayOfWeek]).length > 0
//     );
//   };

//   return (
//     <div className="bg-gray-950 shadow-xl rounded-lg p-4">
//       {/* month row */}
//       <div className="flex justify-between items-center mb-4 text-base">
//         <button onClick={handlePrevMonthClick} className="text-white">
//           ◄
//         </button>
//         <span className="text-white">{format(selectedDate, "MMMM yyyy")}</span>
//         <button onClick={handleNextMonthClick} className="text-white">
//           ►
//         </button>
//       </div>
//       <div className="flex text-lightPurple justify-between">
//         {/* Render days of the week header */}
//         <div className="flex justify-between w-full mb-4 mx-2 text-base">
//           {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
//             <div key={day} className="text-center font-light">
//               {day}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="grid grid-cols-7 gap-2 text-white">
//         {/* Render days in each week */}
//         {weeks.map((week) => {
//           const isCurrentWeek =
//             week >= displayedWeekStart && week <= displayedWeekEnd;
//           return (
//             <React.Fragment key={week.toString()}>
//               {eachDayOfInterval({
//                 start: startOfWeek(week, { weekStartsOn: 1 }),
//                 end: endOfWeek(week, { weekStartsOn: 1 }),
//               }).map((day) => (
//                 <div
//                   key={day.toString()}
//                   className={`cursor-pointer p-2 text-center text-base rounded ${
//                     isSameMonth(day, selectedDate)
//                       ? `  ${
//                           isCurrentWeek
//                             ? "bg-opacity-70 text-neonGreen"
//                             : "bg-opacity-50 text-lightGrey"
//                         }`
//                       : "text-gray-700"
//                   }`}
//                   onClick={() => handleDayClick(day)}
//                 >
//                   <div className="flex flex-col items-center justify-center">
//                     {format(day, "d")}
//                     {hasDayEvents(day) && (
//                       <div className="w-[6px] h-[6px] bg-purple-500 rounded-full"></div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </React.Fragment>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default CalendarDesktopWidget;
