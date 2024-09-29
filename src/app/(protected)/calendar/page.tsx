"use client";
import React, { useEffect, useState } from "react";
// import buttons and icons
import GreenButton from "@/components/buttons/GreenButton";
import TertiaryButton from "@/components/buttons/TertiaryButton";
import ResetIcon from "@/components/icons/ResetIcon";
import HelpIcon from "@/components/icons/HelpIcon";
import SyncCalendarsIcon from "@/components/icons/SyncCalendarsIcon";
import PurpleButton from "@/components/buttons/PurpleButton";
import Navbar from "@/components/layout/Navbar";
import CalendarWrapper from "@/components/calendar/CalendarWrapper";
import { useUserCalendarData } from "@/lib/hooks/useUserCalendarData";
import { user } from "@nextui-org/theme";

export default function Page() {
  const { userAvailability, isLoading } = useUserCalendarData("user-001", true);
  const [savedData, setSavedData] = useState<{}>({});

  const [dayHours, setDayHours] = useState<{
    [key: string]: { [key: number]: string };
  }>(userAvailability);

  useEffect(() => {
    if (!isLoading) {
      setSavedData(userAvailability);
      setDayHours(JSON.parse(JSON.stringify(userAvailability)));
    }
  }, [isLoading, userAvailability, savedData]);

  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [helpBtnState, setHelpBtnState] = useState<string>("1" || "2" || "3");

  // FUNCTIONS -------------------------------------------------------------------------
  // *** PLACEHOLDER FOR IMPORT CALENDARS FUNCTIONALITY ***
  const importHandleClick = () => {
    console.log("Import calendars");
  };

  // toggle help modal
  const toggleHelpModal = () => {
    setHelpBtnState("1");
    setIsHelpOpen(!isHelpOpen);

    // disable scrolling when modal is open
    if (!isHelpOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  // Button in tutorial help modal
  const handleSlotClick = () => {
    if (helpBtnState === "1") {
      setHelpBtnState("2");
    } else if (helpBtnState === "2") {
      setHelpBtnState("3");
    } else {
      setHelpBtnState("1");
    }
  };

  // RESET
  const handleReset = () => {
    const length = localStorage.length;
    const keysToDelete = [];

    for (let i = 0; i < length; i++) {
      const key = localStorage.key(i);
      if (key && key.includes("dayHours")) {
        keysToDelete.push(key);
      }
    }
    keysToDelete.forEach((key) => {
      localStorage.removeItem(key);
    });

    setDayHours(JSON.parse(JSON.stringify(savedData)));
  };

  // SAVE
  const handleSave = () => {
    console.log("Save");
    // try {
    //   await saveToBackend(dayHours); // HERE WE WOULD SAVE TO BACKEND
    // } catch (error) {
    //   console.error("Error saving to backend", error);
    // }
  };

  // update slot style in help modal
  const getSlotStyle = () => {
    const styles = [
      "border-2 border-solid bg-black border-darkGrey border-opacity-80 bg-opacity-30 rounded text-offWhite",
      "bg-lightPurple border-solid border-darkGrey border-opacity-20 border-2 text-black",
      "bg-green border-solid border-darkGrey border-opacity-20 border-2 text-black",
    ];
    if (helpBtnState === "1") {
      return styles[0];
    } else if (helpBtnState === "2") {
      return styles[1];
    } else {
      return styles[2];
    }
  };

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <>
      <Navbar />
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
                    Click on the desired time slot to mark it as available for
                    this week.
                  </li>
                  <li className="py-2">
                    If the time slot is always available, click the slot again
                    to set it as always available.
                  </li>
                  <li className="py-2">
                    To clear the slot and make it not available again, click it
                    once more to reset it to not available.
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
                    <p>
                      {helpBtnState === "1"
                        ? "Not available"
                        : helpBtnState === "2"
                        ? "Available this week"
                        : "Always available"}
                    </p>
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

          {/* CALENDAR WRAPPER HERE */}
          <CalendarWrapper
            dayHours={dayHours}
            setDayHours={setDayHours}
            className="mt-8 md:mt-16"
          />

          {/* Bottom Row with legend and submit button */}
          <div className="flex items-start md:items-center w-full justify-between md:mt-8 px-2 md:px-0">
            <div className="flex flex-col lg:flex-row text-lightGrey font-light text-sm">
              <div className="flex flex-row pr-8 ">
                <div className="w-5 h-5 border-2 border-solid bg-black border-darkGrey border-opacity-70 bg-opacity-15 rounded mb-4 lg:mb-0 mr-2"></div>{" "}
                <p>Not available</p>
              </div>
              <div className="flex flex-row pr-8">
                <div className="w-5 h-5 bg-lightPurple border-solid border-lightPurple border-2 rounded mb-4 lg:mb-0  mr-2"></div>{" "}
                <p className="text-nowrap">Available this week</p>
              </div>
              <div className="flex flex-row pr-8">
                <div className="w-5 h-5 bg-green border-solid border-green border-2 rounded mb-4 lg:mb-0  mr-2"></div>{" "}
                <p className="text-nowrap">Always Available</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex-col items-end lg:items-center flex lg:flex-row">
              {/* save button on mobile */}
              <GreenButton
                className="text-sm flex lg:hidden"
                onClick={handleSave}
              >
                Save and continue
              </GreenButton>

              <TertiaryButton
                className="mr-0 mt-4 lg:mt-0 lg:mr-5 align-middle"
                onClick={handleReset}
              >
                <ResetIcon className="mr-2 fill-current align-middle" />
                Reset
              </TertiaryButton>
              {/* save button on desktop */}
              <GreenButton
                className="align-middle hidden lg:flex"
                onClick={handleSave}
              >
                Save and continue
              </GreenButton>
            </div>
          </div>

          {/* closing tags for main containers */}
        </div>
      </div>
    </>
  );
}
