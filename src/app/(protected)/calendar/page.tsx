"use client";
import React, { useState, useEffect } from "react";
import OutlineButton from "@/components/buttons/OutlineButton";
import GreenButton from "@/components/buttons/GreenButton";
import TertiaryButton from "@/components/buttons/TertiaryButton";
import ResetIcon from "@/components/icons/ResetIcon";
import LeftArrow from "@/components/icons/LeftArrow";
import RightArrow from "@/components/icons/RightArrow";
import PlayerCalendarWrapper from "@/components/calendar/PlayerCalendarWrapper";
import {
  format,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
} from "date-fns";

export default function Page() {
  // PLACEHOLDER FOR IMPORT CALENDARS FUNCTIONALITY
  const importHandleClick = () => {
    console.log("Import calendars");
  };

  const [dayHours, setDayHours] = useState<{
    [key: string]: { [key: number]: string };
  }>({});

  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const resetDayHours = () => {
    setDayHours({});
  };

  // Calendar Update option
  const currentWeekRange = `${format(
    startOfWeek(currentDate, { weekStartsOn: 1 }),
    "dd.MM"
  )} - ${format(endOfWeek(currentDate, { weekStartsOn: 1 }), "dd.MM")}`;
  const currentMonth = format(currentDate, "MMMM yyyy");

  // Calendar Navigation
  const handlePreviousWeek = () => {
    setCurrentDate((prevDate) => subWeeks(prevDate, 1));
  };

  const handleNextWeek = () => {
    setCurrentDate((prevDate) => addWeeks(prevDate, 1));
  };

  const handlePreviousMonth = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  };

  return (
    // background
    <div className="relative min-h-screen bg-calendar-bg bg-cover bg-center flex justify-center items-center">
      {/* black overlay on background pic */}
      <div className="absolute inset-0 bg-black opacity-85"></div>
      {/* frosted glass */}
      <div className="w-full md:w-4/5 min-h-screen md:min-h-4 bg-lightPurple bg-opacity-10 backdrop-filter backdrop-blur brightness-125 rounded-lg py-12 px-2 md:p-14">
        {/* HEADLINE ROW */}
        <div className="block md:flex md:justify-between">
          <h1 className="text-8xl md:text-6xl text-green font-abolition text-center">
            Calendar
          </h1>
          <div className="flex justify-center md:justify-end">
            <OutlineButton onClick={importHandleClick} className="mt-7 md:mt-0">
              Import Calendars
            </OutlineButton>
          </div>
        </div>

        {/* CALENDAR NAVIGATION ROW */}
        <div className="flex justify-between items-center mt-16 mb-12 text-lightPurple text-xl font-semibold">
          <div className="flex items-center">
            <button onClick={handlePreviousWeek}>
              <LeftArrow className="mr-2 fill-green" />
            </button>
            <span className="mx-2 mt-[-0.2em] w-36 flex justify-center items-center">
              {currentWeekRange}
            </span>
            <button onClick={handleNextWeek}>
              <RightArrow className="ml-2 fill-green" />
            </button>
          </div>
          <div className="flex items-center">
            <button onClick={handlePreviousMonth}>
              <LeftArrow className="mr-2 align-middle fill-green" />
            </button>
            <div className=" w-56 flex justify-center items-center">
              <span className="mx-2 mt-[-0.2em] text-nowrap">
                {currentMonth}
              </span>{" "}
              <button className="ml-2">&#128197; {/* calendar icon */}</button>
            </div>
            <button onClick={handleNextMonth}>
              <RightArrow className="ml-2 align-middle fill-green" />
            </button>
          </div>
        </div>

        {/* CALENDAR */}
        <PlayerCalendarWrapper
          dayHours={dayHours}
          setDayHours={setDayHours}
          currentDate={currentDate}
        />

        {/* LOW ROW with legend and submit button */}
        <div className="flex items-center w-full justify-between mt-8 px-2">
          <div className="flex flex-col md:flex-row text-lightGrey font-light text-sm">
            <div className="flex flex-row pr-8 ">
              <button className="w-5 h-5 bg-green opacity-50 rounded mb-4 mr-2"></button>{" "}
              <p>Available</p>
            </div>
            <div className="flex flex-row pr-8">
              <button className="w-5 h-5 bg-accentTwo opacity-50 rounded mb-4 mr-2"></button>{" "}
              <p className="text-nowrap">Single event</p>
            </div>
            <div className="flex flex-row pr-8">
              <button className="w-5 h-5 bg-accentOne opacity-50 rounded mb-4 mr-2"></button>{" "}
              <p className="text-nowrap">Recurring event</p>
            </div>
          </div>

          <div className="flex-col items-end lg:items-center flex lg:flex-row">
            <GreenButton
              className="align-middle flex lg:hidden"
              onClick={() => console.log("Submit")}
            >
              Save and continue
            </GreenButton>

            <TertiaryButton
              className="mr-0 lg:mr-5 align-middle"
              onClick={() => {
                resetDayHours();
              }}
            >
              <ResetIcon className="mr-2 fill-current align-middle" />
              Reset
            </TertiaryButton>
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
