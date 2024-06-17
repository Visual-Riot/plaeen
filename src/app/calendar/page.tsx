"use client";
import React from "react";
import PlayerTimeSlot from "../../components/buttons/PlayerTimeSlot";
import OutlineButton from "../../components/buttons/OutlineButton";
import GreenButton from "../../components/buttons/GreenButton";
import TertiaryButton from "../../components/buttons/TertiaryButton";

import ResetIcon from "../../components/icons/ResetIcon";

export default function Page() {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const hoursOfDay = Array.from({ length: 24 }, (_, i) => i + 1);

  const importHandleClick = () => {
    console.log("Import calendars");
  };

  return (
    <div className="relative min-h-screen bg-calendar-bg bg-cover bg-center flex justify-center items-center">
      {/* black overlay on background pic */}
      <div className="absolute inset-0 bg-black opacity-85"></div>
      {/* frosted glass */}
      <div className="relative w-4/5 h-4/5 bg-lightPurple bg-opacity-10 backdrop-filter backdrop-blur brightness-125 rounded-lg block p-10">
        {/* HEADLINE ROW */}
        <div className="flex justify-between items-center">
          <h1 className="text-6xl text-green font-abolition justify-left">
            Calendar
          </h1>
          <OutlineButton onClick={importHandleClick}>
            Import Calendars
          </OutlineButton>
        </div>

        {/* CALENDAR */}
        <div className="my-10">
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row w-1/6"></div>
              {hoursOfDay.map((hour) => (
                <div className="w-10 text-center justify-center items-center">
                  <h2
                    key={hour}
                    className="text-lightPurple font-robotoMono font-regular uppercase text-center"
                  >
                    {hour}
                  </h2>
                </div>
              ))}
            </div>
          </div>

          {daysOfWeek.map((day) => (
            <div key={day} className="flex flex-col">
              <div className="flex flex-row justify-between my-2">
                <h2 className="text-lightPurple font-robotoMono font-regular uppercase w-1/6">
                  {day}
                </h2>
                {hoursOfDay.map((hour) => (
                  <div className="w-10">
                    <PlayerTimeSlot
                      state="available"
                      key={hour}
                      hour={hour}
                      day={day}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* LOW ROW with legend and submit button */}
        <div className="flex justify-between items-center align-middle">
          <div className="flex flex-row text-lightGrey font-light text-sm">
            <div className="flex flex-row pr-8 ">
              <button className="w-5 h-5 bg-green opacity-50 rounded mr-2"></button>{" "}
              <p>Available</p>
            </div>
            <div className="flex flex-row pr-8">
              <button className="w-5 h-5 bg-pinkAccent opacity-50 rounded mr-2"></button>{" "}
              <p>Single event</p>
            </div>
            <div className="flex flex-row pr-8">
              <button className="w-5 h-5 bg-cyanAccent opacity-50 rounded mr-2"></button>{" "}
              <p>Recurring event</p>
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
