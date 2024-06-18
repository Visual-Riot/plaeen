"use client";
import React from "react";
import PlayerCalendarDesktop from "../../components/calendar/PlayerCalendarDesktop";
import PlayerCalendarMobile from "../../components/calendar/PlayerCalendarMobile";
import OutlineButton from "../../components/buttons/OutlineButton";
import GreenButton from "../../components/buttons/GreenButton";
import TertiaryButton from "../../components/buttons/TertiaryButton";

import ResetIcon from "../../components/icons/ResetIcon";

export default function Page() {
  const importHandleClick = () => {
    console.log("Import calendars");
  };

  return (
    // background
    <div className="relative min-h-screen bg-calendar-bg bg-cover bg-center flex justify-center items-center">
      {/* black overlay on background pic */}
      <div className="absolute inset-0 bg-black opacity-85"></div>
      {/* frosted glass */}
      <div className="w-full md:w-4/5 min-h-screen md:min-h-4 bg-lightPurple bg-opacity-10 backdrop-filter backdrop-blur brightness-125 rounded-lg py-10 px-2 md:p-10">
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

        {/* CALENDAR */}
        <PlayerCalendarMobile className="flex lg:hidden" />
        <PlayerCalendarDesktop className="hidden lg:flex" />

        {/* LOW ROW with legend and submit button */}
        <div className="flex items-center w-full justify-between  px-2">
          <div className="flex flex-col md:flex-row text-lightGrey font-light text-sm">
            <div className="flex flex-row pr-8 ">
              <button className="w-5 h-5 bg-green opacity-50 rounded mb-4 mr-2"></button>{" "}
              <p>Available</p>
            </div>
            <div className="flex flex-row pr-8">
              <button className="w-5 h-5 bg-pinkAccent opacity-50 rounded mb-4 mr-2"></button>{" "}
              <p className="text-nowrap">Single event</p>
            </div>
            <div className="flex flex-row pr-8">
              <button className="w-5 h-5 bg-cyanAccent opacity-50 rounded mb-4 mr-2"></button>{" "}
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
              onClick={() => console.log("Reset")}
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
