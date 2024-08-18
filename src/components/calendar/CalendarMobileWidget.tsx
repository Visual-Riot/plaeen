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
  addDays,
} from "date-fns";

type CalendarMobileWidgetProps = {
  currentDate: Date;
  onWeekSelect: (date: Date) => void;
  onClose: () => void;
  dayHours: { [key: string]: { [key: number]: string } };
  hasEvents?: (date: Date) => boolean;
};

const CalendarMobileWidget: React.FC<CalendarMobileWidgetProps> = ({
  currentDate,
  onWeekSelect,
  onClose,
  dayHours,
  hasEvents,
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

  // HAS EVENTS
  const getCurrentWeekKey = (date: Date) => {
    const start = startOfWeek(date, { weekStartsOn: 1 });
    return format(start, "dd.MM.yyyy");
  };

  const hasDayEvents = (date: Date): boolean => {
    const startOfWeekDate = startOfWeek(date, { weekStartsOn: 1 });
    const weekKey = format(startOfWeekDate, "dd.MM.yyyy");

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

  return (
    <div className="rounded text-xs h-full flex flex-col pt-8">
      <div className="py-8">
        {/* Month Selector Row */}
        <div className="flex flex-row items-center justify-between">
          <div className="flex justify-between items-center p-4 text-xl text-white">
            <button onClick={toggleMonthPicker}>
              {format(selectedDate, "MMMM yyyy")} ▿
            </button>
          </div>
          <div>
            <button className="mx-4 text-2xl" onClick={handlePrevMonthClick}>
              ◄
            </button>
            <button className="mx-4 text-2xl" onClick={handleNextMonthClick}>
              ►
            </button>
          </div>
        </div>

        {/* Month Picker Dropdown */}
        {isMonthPickerVisible && (
          <div className="bg-grey-900 text-white p-4">
            {/* Logic to display a scrolling list of months and years here */}
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
                        ? "text-white"
                        : "text-grey"
                    }`}
                    onClick={() => handleDayClick(day)}
                  >
                    {format(day, "d")}

                    {/* Render the purple dot for non-'available' playerSlots */}

                    {hasDayEvents(day) && (
                      <div className="mt-1 w-2 h-2 bg-purple-500 rounded-full mx-auto"></div>
                    )}
                    {/* <div className="mt-1 w-2 h-2 bg-purple-500 rounded-full mx-auto"></div> */}
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
        <button
          className="p-4 bg-green-500 text-white"
          onClick={() => onClose()}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CalendarMobileWidget;
