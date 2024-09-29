import { useState, useEffect } from "react";

interface Availability {
  day: string;
  hours: { hour: number; state: string }[];
}

export function useUserCalendarData(userId?: string, shouldFetch = true) {
  const [userAvailability, setUserAvailability] = useState<{
    [key: string]: { [key: number]: string };
  }>({});
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch user calendar data
  const fetchUserCalendarData = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const userCalendarResponse = await fetch("/data/user-calendar.json");
      if (!userCalendarResponse.ok) {
        throw new Error(
          `Error fetching user calendar: ${userCalendarResponse.statusText}`
        );
      }
      const userCalendar = await userCalendarResponse.json();

      const userSchedule = userCalendar.find(
        (calendar: { user_id: string; availability: Availability[] }) =>
          calendar.user_id === userId
      );

      let newUserDayHours: { [key: string]: { [key: number]: string } } = {};

      if (userSchedule) {
        userSchedule.availability.forEach((availability: Availability) => {
          const day = availability.day;

          if (!newUserDayHours[day]) {
            newUserDayHours[day] = {};
          }

          availability.hours.forEach(({ hour, state }) => {
            newUserDayHours[day][hour] = state;
          });
        });
      }

      setUserAvailability(newUserDayHours);
    } catch (error) {
      console.error("Error fetching user availability:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (shouldFetch && userId) {
      fetchUserCalendarData();
    }
  }, [shouldFetch, userId]);

  return {
    userAvailability,
    isLoading,
    fetchUserCalendarData, // for manual use
  };
}
