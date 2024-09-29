import { useEffect, useState } from "react";

interface Availability {
  day: string;
  hours: { hour: number; state: string }[];
}

export function useUserCalendarData(userId?: string, shouldFetch = true) {
  const [isLoading, setIsLoading] = useState(true);
  const [userAvailability, setUserAvailability] = useState<{
    [key: string]: { [key: number]: string };
  }>({});

  // Function to fetch user calendar data
  const fetchUserCalendarData = async (): Promise<{
    [key: string]: { [key: number]: string };
  }> => {
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

      return newUserDayHours;
    } catch (error) {
      console.error("Error fetching user availability:", error);
      return {};
    }
  };

  useEffect(() => {
    if (shouldFetch && userId) {
      // Fetch data and set availability as a constant
      setIsLoading(true);
      fetchUserCalendarData().then((data) => {
        setUserAvailability(data); // Set user availability once fetched
        setIsLoading(false);
      });
    }
  }, [shouldFetch, userId]);

  return {
    userAvailability,
    isLoading,
  };
}
