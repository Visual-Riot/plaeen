"use client";
import React, { useState, useEffect, use } from "react";
// import buttons and icons
import OutlineButton from "@/components/buttons/OutlineButton";
import GreenButton from "@/components/buttons/GreenButton";
import TertiaryButton from "@/components/buttons/TertiaryButton";
import ResetIcon from "@/components/icons/ResetIcon";
import LeftArrow from "@/components/icons/LeftArrow";
import RightArrow from "@/components/icons/RightArrow";
import DoubleLeftArrow from "@/components/icons/DoubleLeftArrow";
import DoubleRightArrow from "@/components/icons/DoubleRightArrow";
import CalendarIcon from "@/components/icons/CalendarIcon";
// import components and packages
import PlayerCalendarWrapper from "@/components/calendar/PlayerCalendarWrapper";
import CalendarDesktopWidget from "@/components/calendar/CalendarDesktopWidget";
import CalendarMobileWidget from "@/components/calendar/CalendarMobileWidget";
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
  addDays,
} from "date-fns";

export default function Page() {
  // *** PLACEHOLDER FOR IMPORT CALENDARS FUNCTIONALITY ***
  const importHandleClick = () => {
    console.log("Import calendars");
  };

  const [dayHours, setDayHours] = useState<{
    [key: string]: { [key: number]: string };
  }>({});

  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [showDesktopCalendarWidget, setshowDesktopCalendarWidget] =
    useState(false);
  const [showMobileCalendarWidget, setshowMobileCalendarWidget] =
    useState(false);

  // toggle calendar preview
  const handleDesktopCalendarPrevToggle = () => {
    setshowMobileCalendarWidget(false);
    setshowDesktopCalendarWidget((prev) => !prev);
  };
  const handleMobileCalendarPrevToggle = () => {
    setshowDesktopCalendarWidget(false);
    setshowMobileCalendarWidget((prev) => !prev);
  };

  const handleCalendarWidgetWeekSelect = (weekStart: Date) => {
    setCurrentDate(weekStart);
    setshowDesktopCalendarWidget(false);
  };

  // Reset dayHours state
  const resetDayHours = () => {
    setDayHours({});
  };

  const getFirstFullWeekOfMonth = (date: Date) => {
    const firstDayOfMonth = startOfMonth(date);
    const weekStart = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 });
    if (isBefore(weekStart, firstDayOfMonth)) {
      return addWeeks(weekStart, 1);
    }
    return weekStart;
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

  // Current week
  const currentWeekRange = `${format(
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

  // Check each day for events
  const getCurrentWeekKey = (date: Date) => {
    const start = startOfWeek(date, { weekStartsOn: 1 });
    return format(start, "dd.MM.yyyy");
  };

  const hasEvents = (date: Date): boolean => {
    const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
    const weekKey = getCurrentWeekKey(currentDate);

    for (let i = 0; i < 7; i++) {
      const day = format(addDays(startDate, i), "EEEE");
      const storedData = localStorage.getItem(`dayHours-${weekKey}`);

      if (!storedData) {
        return false;
      }
      const parsedData = JSON.parse(storedData);

      if (Object.keys(parsedData).length === 0) {
        return false;
      } else {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {}, [hasEvents]);

  return (
    // background
    <div className="relative min-h-screen bg-calendar-bg bg-cover bg-center flex justify-center items-center">
      {/* black overlay on background pic */}
      <div className="absolute inset-0 bg-black opacity-85"></div>
      {/* frosted glass */}
      <div className="w-full md:w-4/5 min-h-screen md:min-h-4 bg-lightPurple bg-opacity-10 backdrop-filter backdrop-blur brightness-125 rounded-lg py-4 md:py-12 px-2 md:p-14">
        {/* HEADLINE ROW */}
        {/* <div className="block md:flex md:justify-between"> */}
        <div className="flex justify-start md:justify-between">
          <h1 className="pl-2 md:pl-0 text-7xl md:text-6xl text-green font-abolition text-center">
            Calendar
          </h1>
          <div className="ml-4 md:ml-0 flex justify-center md:justify-end">
            <OutlineButton
              onClick={importHandleClick}
              className="mt-4 md:mt-0 text-sm"
              color="lightPurple"
              hoverColor="lightGrey"
            >
              Sync Calendars
            </OutlineButton>
          </div>
        </div>

        {/* CALENDAR NAVIGATION ROW */}
        <div className="flex justify-between items-center mt-8 md:mt-16 md:mb-12 text-lightPurple text-2xl font-semibold">
          {/* Mobile view */}
          <div className="flex flex-col lg:hidden w-full items-center">
            <div className="flex items-center">
              <button onClick={handlePreviousMonth}>
                <DoubleLeftArrow className="mr-4 fill-green opacity-60 hover:opacity-100  transform-all duration-300 ease-in-out" />
              </button>
              <button onClick={handlePreviousWeek}>
                <LeftArrow className="mr-2 fill-green opacity-60 hover:opacity-100  transform-all duration-300 ease-in-out" />
              </button>
              <div className="w-[240px] flex justify-center items-center">
                <span className="mx-2 mt-[-0.2em] text-nowrap">
                  {currentWeekRange}
                </span>{" "}
                <button
                  onClick={handleMobileCalendarPrevToggle}
                  className="ml-2"
                >
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
                    dayHours={dayHours}
                    currentDate={currentDate}
                    onWeekSelect={handleCalendarWidgetWeekSelect}
                    onClose={handleMobileCalendarPrevToggle}
                    hasEvents={hasEvents}
                  />
                </div>
              )}
              <button onClick={handleNextWeek}>
                <RightArrow className="ml-2 fill-green opacity-60 hover:opacity-100  transform-all duration-300 ease-in-out" />
              </button>
              <button onClick={handleNextMonth}>
                <DoubleRightArrow className="ml-4 fill-green opacity-60 hover:opacity-100  transform-all duration-300 ease-in-out" />
              </button>
            </div>
            <OutlineButton
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
            </OutlineButton>
          </div>

          {/* Desktop view */}
          <div className="hidden lg:flex justify-between items-center w-full">
            <div className="flex items-center">
              <button onClick={handlePreviousWeek}>
                <LeftArrow className="mr-2 fill-green opacity-60 hover:opacity-100  transform-all duration-300 ease-in-out" />
              </button>
              <span className="mx-2 mt-[-0.2em] w-[150px] flex justify-center items-center text-nowrap">
                {currentWeekRange}
              </span>
              <button onClick={handleNextWeek}>
                <RightArrow className="ml-2 fill-green opacity-60 hover:opacity-100  transform-all duration-300 ease-in-out" />
              </button>
              <OutlineButton
                onClick={handleCurrentWeek}
                className={`ml-4 text-base h-8 border-0 text-lightGrey text-sm
                  ${
                    isCurrentWeek
                      ? "opacity-0 pointer-events-none"
                      : "opacity-100"
                  }`}
              >
                ◄ <span className="underline">Back to current week</span>
              </OutlineButton>
            </div>

            <div className="flex items-center">
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
                className={`absolute top-[220px] z-10 transition-all duration-300 ease-in-out ${
                  showDesktopCalendarWidget
                    ? "opacity-0 pointer-events-none"
                    : "opacity-100 pointer-events-auto"
                }`}
              >
                <CalendarDesktopWidget
                  currentDate={currentDate}
                  onWeekSelect={handleCalendarWidgetWeekSelect}
                />
              </div>

              <button onClick={handleNextMonth}>
                <RightArrow className="ml-2 align-middle fill-green opacity-60 hover:opacity-100  transform-all duration-300 ease-in-out" />
              </button>
            </div>
          </div>
        </div>

        {/* CALENDAR */}
        <PlayerCalendarWrapper
          dayHours={dayHours}
          setDayHours={setDayHours}
          currentDate={currentDate}
          hasEvents={hasEvents}
        />

        {/* Bottom Row with legend and submit button */}
        <div className="flex items-start md:items-center w-full justify-between md:mt-8 px-2 md:px-0">
          <div className="flex flex-col lg:flex-row text-lightGrey font-light text-sm">
            <div className="flex flex-row pr-8 ">
              <div className="w-5 h-5 bg-green opacity-50 rounded mb-4 lg:mb-0 mr-2"></div>{" "}
              <p>Available</p>
            </div>
            <div className="flex flex-row pr-8">
              <div className="w-5 h-5 bg-accentTwo opacity-50 rounded mb-4 lg:mb-0  mr-2"></div>{" "}
              <p className="text-nowrap">Single event</p>
            </div>
            <div className="flex flex-row pr-8">
              <div className="w-5 h-5 bg-accentOne opacity-50 rounded mb-4 lg:mb-0  mr-2"></div>{" "}
              <p className="text-nowrap">Recurring event</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex-col items-end lg:items-center flex lg:flex-row">
            {/* save button on mobile */}
            <GreenButton
              className="text-sm flex lg:hidden"
              onClick={() => console.log("Submit")}
            >
              Save and continue
            </GreenButton>

            <TertiaryButton
              className="mr-0 mt-4 lg:mt-0 lg:mr-5 align-middle"
              onClick={() => {
                resetDayHours();
              }}
            >
              <ResetIcon className="mr-2 fill-current align-middle" />
              Reset
            </TertiaryButton>
            {/* save button on desktop */}
            <GreenButton
              className="align-middle hidden lg:flex"
              onClick={() => console.log("Submit")}
            >
              Save and continue
            </GreenButton>
          </div>
        </div>

        {/* closing tags for main containers */}
      </div>
    </div> // closing tag for the main div
  );
}
