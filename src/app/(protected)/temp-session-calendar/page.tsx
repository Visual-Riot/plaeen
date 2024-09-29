"use client";
import React, { useState, useEffect } from "react";
// import buttons and icons
import GreenButton from "@/components/buttons/GreenButton";
import TertiaryButton from "@/components/buttons/TertiaryButton";
import OutlineButton from "@/components/buttons/OutlineButton";
import EditIcon from "@/components/icons/EditIcon";
import Navbar from "@/components/layout/Navbar";
import CalendarWrapper from "@/components/calendar/CalendarWrapper";
import Link from "next/link";
import { user } from "@nextui-org/theme";

interface Availability {
  day: string;
  hours: { hour: number; state: string }[];
}

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  const [dayHours, setDayHours] = useState<{
    [key: string]: { [key: number]: string };
  }>({});

  // Fetch team calendar data and process it
  async function fetchTeamCalendarData() {
    const usersResponse = await fetch("/data/users.json");
    const users = await usersResponse.json();

    const userCalendarResponse = await fetch("/data/user-calendar.json");
    const userCalendar = await userCalendarResponse.json();

    const teamResponse = await fetch("/data/teams.json");
    const teams = await teamResponse.json();

    const teamId = "team-001"; // hardcoded for now

    const team = teams.find((team: { id: string }) => team.id === teamId);
    if (!team) {
      console.error("team not found");
      return;
    }

    const teamMembers = team.members;

    let newDayHours: { [key: string]: { [key: number]: string } } = {};

    // Process each member's availability
    for (const userId of teamMembers) {
      const userSchedule = userCalendar.find(
        (calendar: { user_id: string; availability: Availability[] }) =>
          calendar.user_id === userId
      );
      if (userSchedule) {
        userSchedule.availability.forEach((availability: Availability) => {
          const day = availability.day;

          // Initialize day in newDayHours if not present
          if (!newDayHours[day]) {
            newDayHours[day] = {};
          }

          availability.hours.forEach(({ hour, state }) => {
            // Initialize hour in the day's hours if not present
            if (!newDayHours[day][hour]) {
              newDayHours[day][hour] = "1"; // Default state as "1"
            }

            // Determine the state based on availability
            if (state === "3") {
              newDayHours[day][hour] = "5"; // all available
            } else if (state === "2") {
              newDayHours[day][hour] = "6"; // Some available
            } else {
              newDayHours[day][hour] = "4"; // Not available
            }
          });
        });
      }
    }

    setDayHours(newDayHours);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchTeamCalendarData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div
        className={`relative min-h-screen bg-calendar-bg bg-cover bg-center flex justify-center items-center`}
      >
        {/* black overlay on background pic */}
        <div className="absolute inset-0 bg-black opacity-85"></div>
        {/* frosted glass */}
        <div className="w-full lg:w-4/5 min-h-screen lg:min-h-4 bg-lightPurple bg-opacity-10 backdrop-filter backdrop-blur brightness-125 rounded-lg py-4 md:py-12 px-2 md:p-14">
          <CalendarWrapper dayHours={dayHours} setDayHours={setDayHours} />

          {/* Bottom Row with legend and submit button */}
          <div className="flex items-start md:items-center w-full justify-between md:mt-8 px-2 md:px-0">
            <div className="flex flex-col lg:flex-row text-lightGrey font-light text-sm">
              <div className="flex flex-row pr-8 ">
                <div className="w-5 h-5 bg-green border-solid border-darkGrey border-2 rounded mb-4 lg:mb-0  mr-2"></div>{" "}
                <p>All team available</p>
              </div>
              <div className="flex flex-row pr-8 ">
                <div className="w-5 h-5 bg-green border-solid bg-opacity-30 border-opacity-30 border-darkGrey border-2 rounded mb-4 lg:mb-0  mr-2"></div>{" "}
                <p>Some are available</p>
              </div>
              <div className="flex flex-row pr-8">
                <div className="w-5 h-5 bg-lightPurple border-solid border-darkGrey border-2 rounded mb-4 lg:mb-0  mr-2"></div>{" "}
                <p className="text-nowrap">Your session</p>
              </div>
              <div className="flex flex-row pr-8">
                <div className="w-5 h-5 bg-darkPurple border-solid border-darkGrey border-2 rounded mb-4 lg:mb-0  mr-2"></div>{" "}
                <p className="text-nowrap">Invitation</p>
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

              <TertiaryButton className="mr-0 mt-4 lg:mt-0 lg:mr-5 align-middle">
                <EditIcon className="mr-2 h-4 w-4 fill-current align-middle" />
                <Link href="/calendar">Edit availability</Link>
              </TertiaryButton>
              {/* save button on desktop */}
              <OutlineButton
                className="align-middle hidden items-center lg:flex"
                onClick={() => console.log("New Session")}
              >
                Create new session
              </OutlineButton>
            </div>
          </div>

          {/* closing tags for main containers */}
        </div>
      </div>
    </>
  );
}
