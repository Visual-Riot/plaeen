// CALENDAR LOCAL STORAGE UTILS ----------------------------------------------------------------------------------------------------------

/**
 * Get the current day's hours from local storage for a specific week key.
 * @param weekKey - The key to identify the week.
 * @param day - The specific day to get hours for.
 * @returns The current day's hours from local storage.
 */

export const getCurrentDayHours = (weekKey: string, day: string) => {
  const currentDayHours = JSON.parse(
    localStorage.getItem(`dayHours-${weekKey}`) || "{}"
  );

  if (!currentDayHours[day]) {
    currentDayHours[day] = {};
  }

  return currentDayHours;
};

/**
 * Update the state of a specific hour for a given day and save it to local storage.
 * @param weekKey - The key to identify the week.
 * @param day - The specific day to update hours for.
 * @param hour - The hour to update.
 * @param newState - The new state to set for the hour.
 */
export const updateHourStateInLocalStorage = (
  weekKey: string,
  day: string,
  hour: string,
  newState: string
) => {
  const currentDayHours = getCurrentDayHours(weekKey, day);
  currentDayHours[day][hour] = newState;

  localStorage.setItem(`dayHours-${weekKey}`, JSON.stringify(currentDayHours));
};
