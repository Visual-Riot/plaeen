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

type CalendarPreviewProps = {
  currentDate: Date;
  onWeekSelect: (date: Date) => void;
};

const CalendarPreview: React.FC<CalendarPreviewProps> = ({
  currentDate,
  onWeekSelect,
}) => {
  const [selectedDate, setSelectedDate] = useState(currentDate);

  useEffect(() => {
    setSelectedDate(currentDate);
  }, [currentDate]);

  const weeks = eachWeekOfInterval({
    start: startOfMonth(selectedDate),
    end: endOfMonth(selectedDate),
  }).map((weekStart) => startOfWeek(weekStart, { weekStartsOn: 1 }));

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

  const displayedWeekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const displayedWeekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });

  return (
    <div className="bg-black bg-opacity-90 rounded p-4 text-xs">
      {/* month row */}
      <div className="flex justify-between items-center mb-4">
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
        <div className="flex justify-between w-full mb-4 mx-2">
          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
            <div key={day} className="text-center font-light">
              {day}
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 text-white">
        {/* Render days in each week */}
        {weeks.map((weekStart) => {
          const isCurrentWeek =
            weekStart >= displayedWeekStart && weekStart <= displayedWeekEnd;
          return (
            <React.Fragment key={weekStart.toString()}>
              {eachDayOfInterval({
                start: weekStart,
                end: endOfWeek(weekStart, { weekStartsOn: 1 }),
              }).map((day) => (
                <div
                  key={day.toString()}
                  className={`cursor-pointer p-2 text-center rounded ${
                    isSameMonth(day, selectedDate)
                      ? `  ${
                          isCurrentWeek
                            ? "bg-lightPurple bg-opacity-70 text-black"
                            : "bg-darkPurple bg-opacity-50 text-lightPurple"
                        }`
                      : "bg-darkPurple bg-opacity-20 text-grey"
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

export default CalendarPreview;
