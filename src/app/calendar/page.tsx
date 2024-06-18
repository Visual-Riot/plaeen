"use client";
import React from "react";
import PlayerTimeSlot from "../../components/buttons/PlayerTimeSlot";
import OutlineButton from "../../components/buttons/OutlineButton";
import GreenButton from "../../components/buttons/GreenButton";
import TertiaryButton from "../../components/buttons/TertiaryButton";

import ResetIcon from "../../components/icons/ResetIcon";

export default function Page() {
  const daysOfWeekFull = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const daysOfWeekShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const hoursOfDay = Array.from({ length: 24 }, (_, i) => i + 1);

  const importHandleClick = () => {
    console.log("Import calendars");
  };

  return (
    <div className="relative min-h-screen bg-calendar-bg bg-cover bg-center flex justify-center items-center">
      {/* black overlay on background pic */}
      <div className="absolute inset-0 bg-black opacity-85"></div>
      {/* frosted glass */}
      <div className="relative w-full h-full md:w-4/5 md:h-4/5 bg-lightPurple bg-opacity-10 backdrop-filter backdrop-blur brightness-125 rounded-lg block p-0 py-10 px-4 md:p-10">
        {/* HEADLINE ROW */}
        <div className="block md:flex md:justify-between">
          <h1 className="text-6xl text-green font-abolition text-center">
            Calendar
          </h1>
          <div className="flex w-full justify-center md:justify-end">
            <OutlineButton
              onClick={importHandleClick}
              className="mt-10 md:mt-0"
            >
              Import Calendars
            </OutlineButton>
          </div>
        </div>

        {/* CALENDAR */}
        <div className="my-10 flex flex-row">
          <div className="flex flex-col">
            <div className="h-10"></div>
            {daysOfWeekFull.map((day, index) => (
              <div key={day} className="h-10 flex items-center">
                <h2 className="hidden md:inline text-lightPurple font-robotoMono font-regular uppercase">
                  {day}
                </h2>
                <h2 className="inline md:hidden text-lightPurple font-robotoMono font-regular uppercase">
                  {daysOfWeekShort[index]}
                </h2>
              </div>
            ))}
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between pr-6">
              <div className="w-5 md:w-20 h-10"></div>
              <div className="overflow-x-scroll flex flex-row justify-between">
                {hoursOfDay.map((hour) => (
                  <div
                    key={hour}
                    className="text-center justify-center items-center"
                  >
                    <h2 className="text-lightPurple font-robotoMono font-regular uppercase text-center w-10 h-10">
                      {hour}
                    </h2>
                    <div>
                      {daysOfWeekFull.map((day) => (
                        <div key={`${day}-${hour}`} className="h-10">
                          <PlayerTimeSlot
                            state="available"
                            hour={hour}
                            day={day}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* LOW ROW with legend and submit button */}
        <div className="flex justify-between items-center align-middle">
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

          <div>
            <TertiaryButton
              className="mr-5 align-middle"
              onClick={() => console.log("Reset")}
            >
              <ResetIcon className="mr-2 fill-current align-middle" />
              Reset
            </TertiaryButton>
            <GreenButton
              className="align-middle"
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
