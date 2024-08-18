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

type CalendarMobileWidgetProps = {
  currentDate: Date;
  onWeekSelect: (date: Date) => void;
  onClose: () => void;
};

const CalendarMobileWidget: React.FC<CalendarMobileWidgetProps> = ({
  currentDate,
  onWeekSelect,
  onClose,
}) => {
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [isMonthPickerVisible, setIsMonthPickerVisible] = useState(false);

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

  const toggleMonthPicker = () => {
    setIsMonthPickerVisible((prev) => !prev);
  };

  return (
    <div className="bg-black bg-opacity-90 rounded text-xs h-full flex flex-col">
      {/* Month Selector Row */}
      <div className="flex justify-between items-center p-4 bg-darkPurple text-white">
        <button onClick={handlePrevMonthClick}>◄</button>
        <button onClick={toggleMonthPicker}>
          {format(selectedDate, "MMMM yyyy")}
        </button>
        <button onClick={handleNextMonthClick}>►</button>
      </div>

      {/* Month Picker Dropdown */}
      {isMonthPickerVisible && (
        <div className="bg-grey-900 text-white p-4">
          {/* Add logic to display a scrolling list of months and years here */}
        </div>
      )}

      {/* Days of the Week */}
      <div className="grid grid-cols-7 gap-2 p-2 text-center text-lightPurple">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
          <div key={day} className="font-light">
            {day}
          </div>
        ))}
      </div>

      {/* Render Days */}
      <div className="flex-grow grid grid-cols-7 gap-2 p-2 text-white overflow-y-auto">
        {weeks.map((week) => {
          return (
            <React.Fragment key={week.toString()}>
              {eachDayOfInterval({
                start: startOfWeek(week, { weekStartsOn: 1 }),
                end: endOfWeek(week, { weekStartsOn: 1 }),
              }).map((day) => (
                <div
                  key={day.toString()}
                  className={`cursor-pointer p-4 text-center rounded ${
                    isSameMonth(day, selectedDate)
                      ? "bg-darkPurple text-white"
                      : "bg-grey-700 text-grey"
                  }`}
                  onClick={() => handleDayClick(day)}
                >
                  {format(day, "d")}
                  {/* Render the purple dot for non-'available' playerSlots */}
                  {/* Assuming you have a function `hasPlayerSlot` that checks this */}
                  {/* {hasPlayerSlot(day) && (
                    <div className="mt-1 w-2 h-2 bg-purple-500 rounded-full mx-auto"></div>
                  )} */}
                  <div className="mt-1 w-2 h-2 bg-purple-500 rounded-full mx-auto"></div>
                </div>
              ))}
            </React.Fragment>
          );
        })}
      </div>

      {/* Display Button */}
      <button
        className="p-4 bg-green-500 text-white"
        onClick={() =>
          onWeekSelect(startOfWeek(selectedDate, { weekStartsOn: 1 }))
        }
      >
        Display
      </button>
      <button className="p-4 bg-green-500 text-white" onClick={() => onClose()}>
        Close
      </button>
    </div>
  );
};

export default CalendarMobileWidget;
