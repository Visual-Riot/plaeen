import React, { useState, useEffect, useRef } from "react";
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
  set,
  isSameWeek,
} from "date-fns";
import OutlineButton from "../buttons/OutlineButton";
import TertiaryButton from "../buttons/TertiaryButton";

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

  const handlePrevMonthClick = () => {
    setSelectedDate(subMonths(selectedDate, 1));
  };

  const handleNextMonthClick = () => {
    setSelectedDate(addMonths(selectedDate, 1));
  };

  const toggleMonthPicker = () => {
    setIsMonthPickerVisible((prev) => !prev);
  };

  const handleDisplayClick = () => {
    onWeekSelect(startOfWeek(selectedDate, { weekStartsOn: 1 }));
    onClose();
  };

  // HAS EVENTS
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

  // IS CURRENT WEEK
  const isCurrentWeek = (week: Date): boolean => {
    return isSameWeek(week, selectedDate, { weekStartsOn: 1 });
  };

  return (
    <div className="rounded text-xs h-full flex flex-col pt-8 px-[5%] md:px-[20%]">
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
        <div className="grid grid-cols-7 gap-2 p-2 text-lg text-center text-lightPurple">
          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
            <div key={day} className="font-light">
              {day}
            </div>
          ))}
        </div>

        {/* Render Days */}
        <div className="flex-grow grid grid-cols-7 text-lg mb-12">
          {weeks.map((week) => {
            return (
              <React.Fragment key={week.toString()}>
                {eachDayOfInterval({
                  start: startOfWeek(week, { weekStartsOn: 1 }),
                  end: endOfWeek(week, { weekStartsOn: 1 }),
                }).map((day) => (
                  <div
                    key={day.toString()}
                    className={`relative cursor-pointer p-4 text-center font-normal text-base  transition-all duration-500 ease-in-out ${
                      isCurrentWeek(week) ? "text-neonGreen" : "text-lightGrey"
                    } ${isSameMonth(day, selectedDate) ? "" : "text-gray-700"}`}
                    onClick={() => setSelectedDate(day)}
                  >
                    <div
                      className={`absolute inset-0 bg-darkPurple blur-xl h-[10px] top-1/2 transform -translate-y-50 transition-all duration-500 ease-in-out ${
                        isCurrentWeek(week) ? "opacity-70" : "opacity-0"
                      }`}
                    ></div>

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

        {/* Display Button */}
        <div className="flex w-full justify-end items-center mt-8 space-x-4">
          <TertiaryButton
            onClick={onClose}
            hoverColor="lightPurple"
            className="text-lg"
          >
            ✖ Close
          </TertiaryButton>
          <OutlineButton onClick={handleDisplayClick} className="px-4 text-lg">
            Display
          </OutlineButton>
        </div>
      </div>
    </div>
  );
};

export default CalendarMobileWidget;
