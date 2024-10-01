import React from "react";
import CalendarGrid from "./CalendarGrid";
import LeftArrow from "../icons/LeftArrow";
import CalendarIcon from "../icons/CalendarIcon";
import CalendarDesktopWidget from "./CalendarDesktopWidget";
import CalendarMobileWidget from "./CalendarMobileWidget";
import RightArrow from "../icons/RightArrow";
import TertiaryButton from "../buttons/TertiaryButton";
import OutlineButton from "../buttons/OutlineButton";
import {
  format,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  isBefore,
} from "date-fns";
import { useState, useEffect, useRef } from "react";

interface CalendarWrapperProps {
  dayHours: { [key: string]: { [key: number]: string } };
  setDayHours: React.Dispatch<
    React.SetStateAction<{ [key: string]: { [key: number]: string } }>
  >;
  desktopWidgetTop?: string;
  className?: string;
}

const CalendarWrapper: React.FC<CalendarWrapperProps> = ({
  dayHours,
  setDayHours,
  desktopWidgetTop = "top-[220px]",
  className,
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const desktopCalendarRef = useRef<HTMLDivElement>(null);

  const [showDesktopCalendarWidget, setshowDesktopCalendarWidget] =
    useState(false);
  const [showMobileCalendarWidget, setshowMobileCalendarWidget] =
    useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        desktopCalendarRef.current &&
        !desktopCalendarRef.current.contains(event.target as Node)
      ) {
        setshowDesktopCalendarWidget(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [desktopCalendarRef]);

  // toggle calendar widget
  const handleDesktopCalendarPrevToggle = () => {
    setshowMobileCalendarWidget(false);
    setshowDesktopCalendarWidget((prev) => !prev);
  };
  const handleMobileCalendarPrevToggle = () => {
    setshowDesktopCalendarWidget(false);
    setshowMobileCalendarWidget((prev) => !prev);
  };

  // Calendar Navigation
  const handlePreviousWeek = () => {
    setCurrentDate((prevDate) => subWeeks(prevDate, 1));
  };

  const handleNextWeek = () => {
    setCurrentDate((prevDate) => addWeeks(prevDate, 1));
  };

  const handlePreviousMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = subMonths(prevDate, 1);
      const weekStart = getFirstFullWeekOfMonth(newDate);
      return weekStart;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = addMonths(prevDate, 1);
      const weekStart = getFirstFullWeekOfMonth(newDate);
      return weekStart;
    });
  };

  // display current week
  const handleWeekSelect = (date: Date) => {
    setCurrentDate(date);
  };

  // Current week
  const currentWeekRangeMobile = `${format(
    startOfWeek(currentDate, { weekStartsOn: 1 }),
    "dd MMM"
  )} - ${format(endOfWeek(currentDate, { weekStartsOn: 1 }), "dd MMM")}`;

  const currentWeekRangeDesktop = `${format(
    startOfWeek(currentDate, { weekStartsOn: 1 }),
    "dd.MM"
  )} - ${format(endOfWeek(currentDate, { weekStartsOn: 1 }), "dd.MM")}`;

  const currentMonth = format(currentDate, "MMMM yyyy");

  const handleCurrentWeek = () => {
    setCurrentDate(new Date());
  };

  let isCurrentWeek =
    startOfWeek(currentDate, { weekStartsOn: 1 }).toDateString() ===
    startOfWeek(new Date(), { weekStartsOn: 1 }).toDateString();

  const getFirstFullWeekOfMonth = (date: Date) => {
    const firstDayOfMonth = startOfMonth(date);
    const weekStart = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 });
    if (isBefore(weekStart, firstDayOfMonth)) {
      return addWeeks(weekStart, 1);
    }
    return weekStart;
  };

  // CHECK FOR EVENTS
  const hasDayEvents = (date: Date): boolean => {
    if (typeof window === "undefined") {
      return false;
    }

    const weekKey = format(startOfWeek(date, { weekStartsOn: 1 }), "yyy-MM-dd");
    const storedData = localStorage.getItem(`dayHours-${weekKey}`);

    if (!storedData) {
      return false;
    }

    try {
      const parsedData = JSON.parse(storedData);
      const dayOfWeek = format(date, "EEEE");

      return (
        parsedData[dayOfWeek] && Object.keys(parsedData[dayOfWeek]).length > 0
      );
    } catch (e) {
      console.error("Error parsing dayHours data:", e);
      return false;
    }
  };

  return (
    <div className={className}>
      <div
        className={`flex justify-between items-center md:mb-12 text-lightPurple text-2xl font-semibold`}
      >
        {/* Mobile view */}
        <div className="flex flex-col lg:hidden w-full items-center">
          <div className="flex items-center">
            <button onClick={handlePreviousWeek}>
              <LeftArrow className="mr-2 h-8 w-auto fill-green opacity-60 hover:opacity-100  transform-all duration-300 ease-in-out" />
            </button>
            <div className="w-[240px] flex justify-center items-center">
              <span className="mx-2 mt-[-0.2em] text-xl text-nowrap">
                {currentWeekRangeMobile}
              </span>{" "}
              <button onClick={handleMobileCalendarPrevToggle} className="ml-2">
                <CalendarIcon className="ml-2 align-middle fill-lightPurple opacity-60 hover:opacity-100  transform-all duration-300 ease-in-out" />
              </button>
            </div>
            {showMobileCalendarWidget && (
              <div
                className={`absolute top-0 left-0 right-0 bottom-0 w-screen h-screen bg-black z-10 transition-opacity duration-300 ease-in-out ${
                  showMobileCalendarWidget
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <CalendarMobileWidget
                  currentDate={currentDate}
                  handlePrevMonthClick={handlePreviousMonth}
                  handleNextMonthClick={handleNextMonth}
                  onClose={handleMobileCalendarPrevToggle}
                  hasDayEvents={hasDayEvents}
                  onWeekSelect={handleWeekSelect}
                />
              </div>
            )}
            <button onClick={handleNextWeek}>
              <RightArrow className="ml-2 h-8 w-auto fill-green opacity-60 hover:opacity-100  transform-all duration-300 ease-in-out" />
            </button>
          </div>
          <TertiaryButton
            onClick={handleCurrentWeek}
            className={`text-sm h-8 border-0 underline
                  ${
                    isCurrentWeek
                      ? "mt-[-24px] opacity-0 pointer-events-none"
                      : "mt-4 opacity-100"
                  }`}
            color="lightGrey"
          >
            Back to current week
          </TertiaryButton>
        </div>

        {/* Desktop view */}
        <div className="hidden lg:flex justify-between items-center w-full">
          <div className="flex items-center">
            <button onClick={handlePreviousWeek}>
              <LeftArrow className="mr-2 fill-green opacity-60 hover:opacity-100  transform-all duration-300 ease-in-out" />
            </button>
            <span className="mx-2 mt-[-0.2em] w-[150px] flex justify-center items-center text-nowrap">
              {currentWeekRangeDesktop}
            </span>
            <button onClick={handleNextWeek}>
              <RightArrow className="ml-2 fill-green opacity-60 hover:opacity-100  transform-all duration-300 ease-in-out" />
            </button>
            <OutlineButton
              onClick={handleCurrentWeek}
              className={`ml-4 text-base h-8 border-none text-lightGrey
                  ${
                    isCurrentWeek
                      ? "opacity-0 pointer-events-none"
                      : "opacity-100"
                  }`}
            >
              ◄ <span className="underline">Back to current week</span>
            </OutlineButton>
          </div>

          <div className="flex items-center" ref={desktopCalendarRef}>
            <button onClick={handlePreviousMonth}>
              <LeftArrow className="mr-2 align-middle fill-green opacity-60 hover:opacity-100  transform-all duration-300 ease-in-out" />
            </button>
            <div className="w-[250px] flex justify-center items-center">
              <span className="mx-2 mt-[-0.2em] text-nowrap">
                {currentMonth}
              </span>{" "}
              <button
                onClick={handleDesktopCalendarPrevToggle}
                className="ml-2"
              >
                <CalendarIcon className="ml-2 align-middle fill-lightPurple opacity-60 hover:opacity-100  transform-all duration-300 ease-in-out" />
              </button>
            </div>

            <div
              className={`absolute opacity-0 ${desktopWidgetTop} right-[38px] z-10 transition-all duration-300 ease-in-out ${
                showDesktopCalendarWidget
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <CalendarDesktopWidget
                currentDate={currentDate}
                handlePrevMonthClick={handlePreviousMonth}
                handleNextMonthClick={handleNextMonth}
                // hasDayEvents={hasDayEvents}
                onWeekSelect={handleWeekSelect}
              />
            </div>

            <button onClick={handleNextMonth}>
              <RightArrow className="ml-2 align-middle fill-green opacity-60 hover:opacity-100  transform-all duration-300 ease-in-out" />
            </button>
          </div>
        </div>
      </div>

      {/* CALENDAR */}
      <CalendarGrid
        dayHours={dayHours}
        setDayHours={setDayHours}
        currentDate={currentDate}
      />
    </div>
  );
};

export default CalendarWrapper;
