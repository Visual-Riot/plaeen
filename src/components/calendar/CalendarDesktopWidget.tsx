import React, { useEffect, useState, useCallback } from "react";
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
} from "date-fns";

interface CalendarDesktopWidgetProps {
  currentDate: Date;
  handlePrevMonthClick: () => void;
  handleNextMonthClick: () => void;
  hasDayEvents?: (date: Date) => boolean;
  onWeekSelect: (date: Date) => void;
}

const CalendarDesktopWidget: React.FC<CalendarDesktopWidgetProps> = ({
  currentDate,
  handlePrevMonthClick,
  handleNextMonthClick,
  hasDayEvents,
  onWeekSelect,
}) => {
  const [selectedDate, setSelectedDate] = useState(currentDate);

  useEffect(() => {
    setSelectedDate(currentDate); // Sync selectedDate with currentDate
  }, [currentDate]);

  // display weeks of the month
  const weeks = eachWeekOfInterval(
    {
      start: startOfWeek(startOfMonth(selectedDate), { weekStartsOn: 1 }),
      end: endOfWeek(endOfMonth(selectedDate), { weekStartsOn: 1 }),
    },
    { weekStartsOn: 1 }
  );

  // Is this week selected?
  const isSelectedWeek = (week: Date): boolean => {
    return isSameWeek(week, selectedDate, { weekStartsOn: 1 });
  };

  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    onWeekSelect(day);
  };

  return (
    <div className="bg-gray-950 shadow-xl rounded-lg p-4">
      {/* Month row */}
      <div className="flex justify-between items-center mb-4 text-base">
        <button onClick={handlePrevMonthClick} className="text-white">
          ◄
        </button>
        <span className="text-white">{format(selectedDate, "MMMM yyyy")}</span>
        <button onClick={handleNextMonthClick} className="text-white">
          ►
        </button>
      </div>
      {/* Render names of days */}
      <div className="grid grid-cols-7 gap-2 mt-6 mb-2 text-base text-center text-lightPurple">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
          <div key={day} className="font-light">
            {day}
          </div>
        ))}
      </div>
      {/* Render dates */}
      <div className="flex-grow grid grid-cols-7 text-lg mb-6">
        {weeks.map((week) => (
          <React.Fragment key={week.toString()}>
            {eachDayOfInterval({
              start: startOfWeek(week, { weekStartsOn: 1 }),
              end: endOfWeek(week, { weekStartsOn: 1 }),
            }).map((day) => (
              <div
                key={day.toString()}
                className={`relative cursor-pointer py-2 px-3 text-center font-normal text-base transition-all duration-500 ease-in-out ${
                  isSelectedWeek(week) && isSameMonth(day, selectedDate)
                    ? "text-neonGreen"
                    : ""
                } ${
                  isSameMonth(day, selectedDate)
                    ? "text-lightGrey"
                    : "text-darkGrey"
                }`}
                onClick={() => handleDayClick(day)}
              >
                <span className="relative">{format(day, "d")}</span>
                {/* {hasDayEvents(day) && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-[6px] h-[6px] bg-purple-500 rounded-full"></div>
                )} */}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CalendarDesktopWidget;
