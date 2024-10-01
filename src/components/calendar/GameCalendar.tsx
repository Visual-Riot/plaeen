"use client";
import React, { useState, useEffect } from "react";
// import buttons and icons
import GreenButton from "@/components/buttons/GreenButton";
import TertiaryButton from "@/components/buttons/TertiaryButton";
import OutlineButton from "@/components/buttons/OutlineButton";
import EditIcon from "@/components/icons/EditIcon";
import CalendarWrapper from "@/components/calendar/CalendarWrapper";
import Link from "next/link";

interface Availability {
  day: string;
  hours: { hour: number; state: string }[];
}

interface GameCalendarProps {
  teamId: string;
  gameId: string;
}

const GameCalendar: React.FC<GameCalendarProps> = ({
  teamId,
  gameId,
}: {
  teamId: string;
  gameId: string;
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const [dayHours, setDayHours] = useState<{
    [key: string]: { [key: number]: string };
  }>({});

  // Fetch team calendar data and process it
  async function fetchTeamCalendarData(teamId: string, gameId: string) {
    try {
      const gameCalendarResponse = await fetch("/data/game-calendar.json");
      const gameCalendars = await gameCalendarResponse.json();

      // Find the correct game calendar based on team_id and game_id --- that is passed to this component
      const gameCalendar = gameCalendars.find(
        (calendar: { team_id: string; game_id: string }) =>
          calendar.team_id === teamId && calendar.game_id === gameId
      );

      if (!gameCalendar) {
        console.error("Game calendar not found");
        return;
      }

      // Fetch the teams and find the team with the correct team_id
      const teamResponse = await fetch("/data/teams.json");
      const teams = await teamResponse.json();
      const team = teams.find((team: { id: string }) => team.id === teamId);

      if (!team) {
        console.error("Team not found");
        return;
      }

      const teamMembers = team.members;

      // Fetch the user calendars (all of the team members)
      const userCalendarResponse = await fetch("/data/user-calendar.json");
      const userCalendars = await userCalendarResponse.json();

      let newDayHours: { [key: string]: { [key: number]: string } } = {};

      // Collect each team member's availability
      for (const userId of teamMembers) {
        const userSchedule = userCalendars.find(
          (calendar: { user_id: string }) => calendar.user_id === userId
        );

        if (userSchedule) {
          userSchedule.availability.forEach((availability: Availability) => {
            const day = availability.day;

            if (!newDayHours[day]) {
              newDayHours[day] = {};
            }

            availability.hours.forEach(({ hour, state }) => {
              if (!newDayHours[day][hour]) {
                newDayHours[day][hour] = "0"; // Initialize state to 0 - this is in case no data is available for a specific day-hour
              }

              if (state === "2" || state === "3") {
                // If the member is available, set state to "1" to indicate availability -
                newDayHours[day][hour] = "1"; // --- this is temporary marking and will be changed so number/state 1 is not final
              }
            });
          });
        }
      }

      // Update the state based on the availability of all members
      for (const day in newDayHours) {
        for (const hour in newDayHours[day]) {
          const availabilityStates = newDayHours[day][hour];

          let availableCount = availabilityStates === "1" ? 1 : 0;

          // Check how many members are available for this day-hour
          teamMembers.forEach((userId: string) => {
            const userSchedule = userCalendars.find(
              (calendar: { user_id: string }) => calendar.user_id === userId
            );

            if (userSchedule) {
              const userAvailability = userSchedule.availability.find(
                (avail: Availability) => avail.day === day
              );

              if (userAvailability) {
                const hourAvailability = userAvailability.hours.find(
                  (h: { hour: number; state: string }) =>
                    h.hour.toString() === hour
                );

                if (
                  hourAvailability &&
                  (hourAvailability.state === "2" ||
                    hourAvailability.state === "3")
                ) {
                  availableCount++;
                }
              }
            }
          });

          // Set the new state based on the count of available members
          if (availableCount === teamMembers.length) {
            newDayHours[day][hour] = "4"; // All team members available
          } else if (availableCount >= 2) {
            newDayHours[day][hour] = "5"; // Some team members available
          } else {
            newDayHours[day][hour] = "0"; // Less than 2 members available
          }
        }
      }

      setDayHours(newDayHours);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchTeamCalendarData(teamId, gameId);
  }, []);

  //   SKELETON LOADING
  if (isLoading) {
    return (
      <div className="my-5 w-full flex">
        {/* Days Names Column */}
        <div className="flex flex-col">
          <div className="h-[30px]"></div>
          {[
            "MONDAY",
            "TUESDAY",
            "WEDNESDAY",
            "THURSDAY",
            "FRIDAY",
            "SATURDAY",
            "SUNDAY",
          ].map((dayName) => (
            <div key={dayName} className="h-10 flex items-center relative">
              <div className="text-lightPurple font-robotoMono font-regular uppercase text-nowrap">
                <div className="flex items-center gap-x-3">
                  <span className="text-base">{dayName}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hours columns */}
        <div className="flex flex-col w-full">
          <div className="flex flex-row">
            <div className="w-5 md:w-10 h-10"></div>
            <div className="flex flex-row justify-between w-full">
              {Array.from({ length: 24 }, (_, hour) => (
                <div
                  key={hour}
                  className="text-center justify-center items-center"
                >
                  <div className="h-10 flex items-center relative">
                    {/* Display Hours */}
                    <div className="text-lightPurple font-robotoMono font-regular uppercase text-center w-full h-10 pb-2">
                      {hour + 1}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    {[
                      "MONDAY",
                      "TUESDAY",
                      "WEDNESDAY",
                      "THURSDAY",
                      "FRIDAY",
                      "SATURDAY",
                      "SUNDAY",
                    ].map((dayName) => (
                      <div key={`${dayName}-${hour}`} className="h-10 flex">
                        <div className="animate-pulse border-2 border-solid bg-black border-darkGrey border-opacity-80 bg-opacity-30 rounded grow lg:grow-0 w-12 h-12 lg:w-5 lg:h-5"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  //   RETURNING THE LOADED COMPONENT
  return (
    <>
      <CalendarWrapper
        dayHours={dayHours}
        setDayHours={setDayHours}
        desktopWidgetTop="top-[100px]"
      />

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
    </>
  );
};

export default GameCalendar;
