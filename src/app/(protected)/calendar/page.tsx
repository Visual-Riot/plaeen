"use client";
import React, { useEffect, useState } from "react";
// import buttons and icons
import OutlineButton from "@/components/buttons/OutlineButton";
import GreenButton from "@/components/buttons/GreenButton";
import TertiaryButton from "@/components/buttons/TertiaryButton";
import ResetIcon from "@/components/icons/ResetIcon";
import LeftArrow from "@/components/icons/LeftArrow";
import RightArrow from "@/components/icons/RightArrow";
import CalendarIcon from "@/components/icons/CalendarIcon";
import HelpIcon from "@/components/icons/HelpIcon";
import SyncCalendarsIcon from "@/components/icons/SyncCalendarsIcon";
import PurpleButton from "@/components/buttons/PurpleButton";
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
  set,
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
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [helpBtnState, setHelpBtnState] = useState<string>(
    "Available" || "Unavailable This Week" || "Never Available"
  );

  // toggle help modal
  const toggleHelpModal = () => {
    setHelpBtnState("Available");
    setIsHelpOpen(!isHelpOpen);

    if (!isHelpOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  // toggle calendar preview
  const handleDesktopCalendarPrevToggle = () => {
    setshowMobileCalendarWidget(false);
    setshowDesktopCalendarWidget((prev) => !prev);
  };
  const handleMobileCalendarPrevToggle = () => {
    setshowDesktopCalendarWidget(false);
    setshowMobileCalendarWidget((prev) => !prev);
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

  const handleSlotClick = () => {
    if (helpBtnState === "Available") {
      setHelpBtnState("Unavailable This Week");
    } else if (helpBtnState === "Unavailable This Week") {
      setHelpBtnState("Never Available");
    } else {
      setHelpBtnState("Available");
    }
  };

  const getSlotStyle = () => {
    const styles = [
      "border-2 border-solid bg-black border-green border-opacity-20 bg-opacity-15 lg:bg-opacity-20",
      "bg-accentThree border-solid border-accentThree border-2",
      "bg-accentOne border-solid border-accentOne border-2",
    ];
    if (helpBtnState === "Available") {
      return styles[0];
    } else if (helpBtnState === "Unavailable This Week") {
      return styles[1];
    } else {
      return styles[2];
    }
  };

  return (
    // background
    <div
      className={`relative min-h-screen bg-calendar-bg bg-cover bg-center flex justify-center items-center`}
    >
      {/* black overlay on background pic */}
      <div className="absolute inset-0 bg-black opacity-85"></div>
      {/* HELP MODAL */}
      {isHelpOpen && (
        <div className="z-[1000]">
          <div className="fixed inset-0 bg-black opacity-80"></div>
          <div className="fixed inset-0 flex justify-center items-center mx-4 lg:mx-[15%]">
            <div className="bg-lightPurple bg-opacity-20 rounded-lg p-8 drop-shadow-2xl backdrop-blur">
              <h3 className="text-xl font-semibold text-white">
                To mark availability
              </h3>
              <hr className="opacity-10 mt-4 border-[1px]"></hr>
              <ul className="text-lightGrey font-light mt-4 list-disc ml-4">
                <li className="py-2">
                  Click on the desired time slot to mark it as unavailable for
                  this week.
                </li>
                <li className="py-2">
                  If the time slot is never available, click the slot again to
                  set it as never available.
                </li>
                <li className="py-2">
                  To clear the slot and make it available again, click it once
                  more to reset it to available.
                </li>
              </ul>
              {/* try it out */}
              <div className="w-full flex flex-col items-start justify-center mt-8 lg:mt-8">
                <p className="text-lightGrey">
                  Click on the slot to see how it works:{" "}
                </p>
                <div className="flex text-lightGrey gap-x-2 items-center mt-6">
                  <button
                    onClick={() => handleSlotClick()}
                    className={`ml-0 lg:ml-4 grow w-12 h-12 lg:w-5 lg:h-5 font-semibold hover:scale-90 ease-in-out duration-300 rounded ${getSlotStyle()}`}
                  ></button>
                  <p>{helpBtnState}</p>
                </div>
              </div>
              <hr className="opacity-10 mt-6 border-[1px]"></hr>
              {/* close button */}
              <div className="flex w-full justify-end lg:justify-center mt-6">
                <PurpleButton
                  onClick={() => toggleHelpModal()}
                  className="text-lg"
                >
                  Got it!
                </PurpleButton>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* frosted glass */}
      <div className="w-full lg:w-4/5 min-h-screen lg:min-h-4 bg-lightPurple bg-opacity-10 backdrop-filter backdrop-blur brightness-125 rounded-lg py-4 md:py-12 px-2 md:p-14">
        {/* HEADLINE ROW */}
        <div className="flex flex-col md:flex-row items-center md:items-baseline md:justify-between">
          <div className="flex flex-row items-baseline gap-x-4">
            <h1 className="pl-2 md:pl-0 text-7xl md:text-6xl text-green font-abolition text-center">
              Your Calendar
            </h1>
            <button onClick={() => toggleHelpModal()}>
              <HelpIcon className="w-6 h-6 fill-lightPurple opacity-60 hover:opacity-100 transform-all duration-300 ease-in-out" />
            </button>
          </div>
          <div className="flex justify-center md:justify-end">
            <TertiaryButton
              onClick={importHandleClick}
              className="mt-6 md:mt-0 text-sm underline text-lightPurple"
            >
              Sync Calendars
              <SyncCalendarsIcon className="w-4 h-4 ml-2" />
            </TertiaryButton>
          </div>
        </div>

        {/* CALENDAR NAVIGATION ROW */}
        <div className="flex justify-between items-center mt-8 md:mt-16 md:mb-12 text-lightPurple text-2xl font-semibold">
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
                    currentDate={currentDate}
                    // onWeekSelect={handleCalendarWidgetWeekSelect}
                    onWeekSelect={setCurrentDate}
                    onClose={handleMobileCalendarPrevToggle}
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
                className={`ml-4 text-base h-8 border-none text-lightGrey text-sm
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
                className={`absolute opacity-0 top-[220px] right-[38px] z-10 transition-all duration-300 ease-in-out ${
                  showDesktopCalendarWidget
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <CalendarDesktopWidget
                  currentDate={currentDate}
                  onWeekSelect={setCurrentDate}
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
        />

        {/* Bottom Row with legend and submit button */}
        <div className="flex items-start md:items-center w-full justify-between md:mt-8 px-2 md:px-0">
          <div className="flex flex-col lg:flex-row text-lightGrey font-light text-sm">
            <div className="flex flex-row pr-8 ">
              <div className="w-5 h-5 border-2 border-solid bg-black border-green border-opacity-20 bg-opacity-15 rounded mb-4 lg:mb-0 mr-2"></div>{" "}
              <p>Available</p>
            </div>
            <div className="flex flex-row pr-8">
              <div className="w-5 h-5 bg-accentThree border-solid border-accentThree border-2 rounded mb-4 lg:mb-0  mr-2"></div>{" "}
              <p className="text-nowrap">Not available this week</p>
            </div>
            <div className="flex flex-row pr-8">
              <div className="w-5 h-5 bg-accentOne border-solid border-accentOne border-2 rounded mb-4 lg:mb-0  mr-2"></div>{" "}
              <p className="text-nowrap">Never available</p>
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
