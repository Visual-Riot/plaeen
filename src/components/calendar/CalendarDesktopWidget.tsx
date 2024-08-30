// Calendar.js
import React, { useState, useEffect } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachWeekOfInterval,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  eachDayOfInterval,
  subMonths,
  addMonths,
} from "date-fns";

type CalendarDesktopWidgetProps = {
  currentDate: Date;
  onWeekSelect: (date: Date) => void;
};

const CalendarDesktopWidget: React.FC<CalendarDesktopWidgetProps> = ({
  currentDate,
  onWeekSelect,
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

  const handleDayClick = (date: Date) => {
    const weekStart = startOfWeek(date, { weekStartsOn: 1 });
    onWeekSelect(weekStart);
  };

  const handlePrevMonthClick = () => {
    setSelectedDate(subMonths(selectedDate, 1));
  };

  const handleNextMonthClick = () => {
    setSelectedDate(addMonths(selectedDate, 1));
  };

  let displayedWeekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  let displayedWeekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });

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
      <div className="flex text-lightPurple justify-between">
        {/* Render days of the week header */}
        <div className="flex justify-between w-full mb-4 mx-2 text-base">
          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
            <div key={day} className="text-center font-light">
              {day}
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 text-white">
        {/* Render days in each week */}
        {weeks.map((week) => {
          const isCurrentWeek =
            week >= displayedWeekStart && week <= displayedWeekEnd;
          return (
            <React.Fragment key={week.toString()}>
              {eachDayOfInterval({
                start: startOfWeek(week, { weekStartsOn: 1 }),
                end: endOfWeek(week, { weekStartsOn: 1 }),
              }).map((day) => (
                <div
                  key={day.toString()}
                  className={`cursor-pointer p-2 text-center text-base rounded ${
                    isSameMonth(day, selectedDate)
                      ? `  ${
                          isCurrentWeek
                            ? "bg-opacity-70 text-neonGreen"
                            : "bg-opacity-50 text-lightGrey"
                        }`
                      : "text-gray-700"
                  }`}
                  onClick={() => handleDayClick(day)}
                >
                  {format(day, "d")}
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
