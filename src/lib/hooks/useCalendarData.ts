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
    setIsLoading(true); // Set loading to true when starting the fetch
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
            newUserDayHours[day][hour] = state; // Use state directly from JSON
          });
        });
      }

      setUserAvailability(newUserDayHours);
    } catch (error) {
      console.error("Error fetching user availability:", error);
    } finally {
      setIsLoading(false); // Set loading to false when done
    }
  };

  // Run the fetch function only if shouldFetch is true and userId is provided
  useEffect(() => {
    if (shouldFetch && userId) {
      fetchUserCalendarData();
    }
  }, [shouldFetch, userId]); // Dependency array includes shouldFetch and userId

  return {
    userAvailability,
    isLoading,
    fetchUserCalendarData, // Expose this function for manual use
  };
}
