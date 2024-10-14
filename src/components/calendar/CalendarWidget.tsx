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
  addYears,
  subYears,
  isSameWeek,
} from "date-fns";
import TertiaryButton from "../buttons/TertiaryButton";
import GreenButton from "../buttons/GreenButton";
import DoubleLeftArrow from "../icons/DoubleLeftArrow";
import LeftArrow from "../icons/LeftArrow";
import DoubleRightArrow from "../icons/DoubleRightArrow";
import RightArrow from "../icons/RightArrow";

type CalendarWidgetProps = {
  currentDate: Date;
  onWeekSelect: (date: Date) => void;
  hasDayEvents?: (date: Date) => boolean;
  handlePrevMonthClick: () => void;
  handleNextMonthClick: () => void;
  onClose?: () => void;
  isMobile?: boolean; // Added flag to handle mobile or desktop views
};

const CalendarWidget: React.FC<CalendarWidgetProps> = ({
  currentDate,
  onWeekSelect,
  hasDayEvents = () => false, // Optional prop for events
  handlePrevMonthClick,
  handleNextMonthClick,
  onClose,
  isMobile = false, // Default to desktop view
}) => {
  const [selectedDate, setSelectedDate] = useState(currentDate);

  useEffect(() => {
    setSelectedDate(currentDate);
  }, [currentDate]);

  //   display weeks of the month
  const weeks = eachWeekOfInterval(
    {
      start: startOfWeek(startOfMonth(selectedDate), { weekStartsOn: 1 }),
      end: endOfWeek(endOfMonth(selectedDate), { weekStartsOn: 1 }),
    },
    { weekStartsOn: 1 }
  );

  //  navigation handlers
  const handlePrevYearClick = () => {
    setSelectedDate(subYears(selectedDate, 1));
  };

  const handleNextYearClick = () => {
    setSelectedDate(addYears(selectedDate, 1));
  };

  //   display the selected week on Mobile
  const handleDisplayClick = () => {
    onWeekSelect(startOfWeek(selectedDate, { weekStartsOn: 1 }));
    if (onClose) onClose();
  };

  //   is this week selected?
  const isSelectedWeek = (week: Date): boolean => {
    return isSameWeek(week, selectedDate, { weekStartsOn: 1 });
  };

  //   does this day belong to the current month?
  const isCurrentMonth = (week: Date): boolean => {
    return isSameMonth(week, new Date());
  };

  //   when a day is clicked
  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    onWeekSelect(day);
  };

  return (
    <div
      className={`rounded text-xs ${
        isMobile
          ? "h-full flex flex-col justify-center items-center mt-4 px-[5%] md:px-[20%]"
          : "bg-gray-950 shadow-xl rounded-lg p-4"
      }`}
    >
      <div className="py-4 w-full">
        <div
          className={`flex ${
            isMobile
              ? "flex-col lg:hidden w-full items-center mb-8"
              : "justify-between items-center mb-8 text-base"
          }`}
        >
          {isMobile ? (
            <>
              <div className="flex w-full items-center justify-between mb-4">
                <button onClick={handlePrevYearClick}>
                  <DoubleLeftArrow className="h-6 w-auto fill-green opacity-60 hover:opacity-100 transform-all duration-300 ease-in-out" />
                </button>
                <button onClick={handlePrevMonthClick}>
                  <LeftArrow className="h-6 w-auto fill-green opacity-60 hover:opacity-100 transform-all duration-300 ease-in-out" />
                </button>
                <div className="w-[110px] flex justify-center items-center text-lg">
                  <span className="mt-[-0.2em] text-nowrap text-base">
                    {format(selectedDate, "MMMM yyyy")}
                  </span>
                </div>
                <button onClick={handleNextMonthClick}>
                  <RightArrow className="h-6 w-auto fill-green opacity-60 hover:opacity-100 transform-all duration-300 ease-in-out" />
                </button>
                <button onClick={handleNextYearClick}>
                  <DoubleRightArrow className="h-6 w-auto fill-green opacity-60 hover:opacity-100 transform-all duration-300 ease-in-out" />
                </button>
              </div>
              <div className="w-full flex justify-center mb-4">
                <TertiaryButton
                  onClick={() => setSelectedDate(new Date())}
                  className={`text-sm h-8 border-0 underline
                  ${
                    isCurrentMonth(selectedDate)
                      ? "mt-[-24px] opacity-0 pointer-events-none"
                      : "mt-6 opacity-100"
                  }`}
                >
                  Back to current month
                </TertiaryButton>
              </div>
            </>
          ) : (
            <>
              <button onClick={handlePrevMonthClick} className="text-white">
                ◄
              </button>
              <span className="text-white">
                {format(selectedDate, "MMMM yyyy")}
              </span>
              <button onClick={handleNextMonthClick} className="text-white">
                ►
              </button>
            </>
          )}
        </div>

        <div className="grid grid-cols-7 gap-2 text-base text-center text-lightPurple">
          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
            <div key={day} className="font-semiBold">
              {day}
            </div>
          ))}
        </div>

        <div className="flex-grow grid grid-cols-7 text-lg">
          {weeks.map((week) => (
            <React.Fragment key={week.toString()}>
              {eachDayOfInterval({
                start: startOfWeek(week, { weekStartsOn: 1 }),
                end: endOfWeek(week, { weekStartsOn: 1 }),
              }).map((day) => (
                <div
                  key={day.toString()}
                  className={`relative cursor-pointer p-3 text-center font-normal text-base transition-all duration-500 ease-in-out ${
                    isSelectedWeek(week) ? "text-neonGreen" : "text-lightGrey"
                  } ${isSameMonth(day, selectedDate) ? "" : "text-gray-800"}`}
                  onClick={() => handleDayClick(day)}
                >
                  <div
                    className={`absolute inset-0 bg-darkPurple blur-xl h-[10px] top-1/2 transform -translate-y-50 transition-all duration-500 ease-in-out ${
                      isSelectedWeek(week) ? "opacity-70" : "opacity-0"
                    }`}
                  ></div>

                  <span className="relative">{format(day, "d")}</span>

                  {hasDayEvents(day) && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-[6px] h-[6px] bg-purple-500 rounded-full"></div>
                  )}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>

        {isMobile ? (
          <>
            <div className="flex flex-col w-full justify-center items-center mt-8 space-x-4">
              <GreenButton
                onClick={handleDisplayClick}
                className="w-full text-lg"
              >
                Display
              </GreenButton>
            </div>
            <div className="flex w-full text-white pt-4 justify-center">
              <TertiaryButton
                onClick={onClose}
                hoverColor="lightPurple"
                className="text-base text-lightPurple fill-green"
              >
                ✖ Cancel
              </TertiaryButton>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default CalendarWidget;
