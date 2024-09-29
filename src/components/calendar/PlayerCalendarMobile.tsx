import PlayerTimeSlot from "../buttons/PlayerTimeSlot";
import DayButton from "../buttons/DayButton";
import React, { useState, useEffect } from "react";
import { startOfWeek, format, addDays } from "date-fns";

interface PlayerCalendarMobileProps {
  dayHours: { [key: string]: { [key: number]: string } };
  currentDate: Date;
  onHoursStateChange: (
    day: string,
    hour: number,
    newState: "1" | "2" | "3"
  ) => void;
  className?: string;
}

const PlayerCalendarMobile: React.FC<PlayerCalendarMobileProps> = ({
  dayHours,
  currentDate,
  onHoursStateChange,
  className,
}) => {
  const start = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekKey = format(start, "dd.MM.yyyy");
  const [animationTrigger, setAnimationTrigger] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [touchedSlots, setTouchedSlots] = useState<{ [key: string]: boolean }>(
    {}
  );

  const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(start, i);
    return {
      dayName: format(date, "EEEE"),
      shortDayName: format(date, "EEE"),
      dayDate: format(date, "dd"),
      dayKey: format(date, "yyyy-MM-dd"),
    };
  });

  const formatHour = (hour: number) => {
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return { formattedHour, ampm };
  };

  const hoursOfDay = Array.from({ length: 24 }, (_, i) => i + 1);

  const [selectedDay, setSelectedDay] = useState<string>("Monday");

  // Flash animation when changing the selected day
  const handleDayChange = (day: string) => {
    setSelectedDay(day);
    setAnimationTrigger(true);
    setTimeout(() => {
      setAnimationTrigger(false);
    }, 300);
  };

  // HANDLE TOUCH EVENTS : FOR DRAGGING & SELECTING ON GESTURE
  const handleTouchStart = (e: TouchEvent) => {
    setIsDragging(true);
  };

  const handleTouchMove = (e: TouchEvent) => {
    // touch coordinates
    const touch = e.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;

    // get the element at the touch coordinates
    const elementAtPoint = document.elementFromPoint(x, y) as HTMLElement;

    if (
      elementAtPoint &&
      elementAtPoint.classList.contains("player-time-slot")
    ) {
      const day = elementAtPoint.getAttribute("data-day") as string;
      const hour = parseInt(elementAtPoint.getAttribute("data-hour") as string);

      if (day && hour) {
        const slotKey = `${day}-${hour}`;

        if (!touchedSlots[slotKey]) {
          setTouchedSlots((prev) => ({ ...prev, [slotKey]: true }));

          const currentState = dayHours[day]?.[hour] || "1";

          const newState =
            currentState === "1" ? "2" : currentState === "2" ? "3" : "1";
          onHoursStateChange(day, hour, newState);

          const currentDayHours = JSON.parse(
            localStorage.getItem(`dayHours-${weekKey}`) || "{}"
          );
          if (!currentDayHours[day]) {
            currentDayHours[day] = {};
          }
          currentDayHours[day][hour] = newState;
          localStorage.setItem(
            `dayHours-${weekKey}`,
            JSON.stringify(currentDayHours)
          );
        }
      }
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    setIsDragging(false);
    setTouchedSlots({});
  };

  useEffect(() => {
    const handleTouchStartListener = (e: TouchEvent) => handleTouchStart(e);
    const handleTouchMoveListener = (e: TouchEvent) => handleTouchMove(e);
    const handleTouchEndListener = (e: TouchEvent) => handleTouchEnd(e);

    document.addEventListener("touchstart", handleTouchStartListener, false);
    document.addEventListener("touchmove", handleTouchMoveListener, false);
    document.addEventListener("touchend", handleTouchEndListener, false);

    return () => {
      document.removeEventListener("touchstart", handleTouchStartListener);
      document.removeEventListener("touchmove", handleTouchMoveListener);
      document.removeEventListener("touchend", handleTouchEndListener);
    };
  }, [touchedSlots, isDragging]);

  // render player time slots for each day of the week depending on the selected day
  const renderTimeSlots = () => {
    return hoursOfDay.map((hour) => {
      const { formattedHour, ampm } = formatHour(hour);

      const dayKey = daysOfWeek.find(
        (day) => day.dayName === selectedDay
      )?.dayKey;

      const slotState = dayKey ? dayHours[dayKey]?.[hour] || "1" : "1";

      return (
        <div
          key={hour}
          className={`flex justify-center ${
            animationTrigger ? "animate-flash" : ""
          }`}
        >
          <PlayerTimeSlot
            day={dayKey as string}
            hour={hour}
            state={slotState as "1" | "2" | "3" | "4" | "5" | "6" | "7"}
            displayedHour={{ hour: formattedHour, ampm }}
            onStateChange={onHoursStateChange}
            isDragging={isDragging}
          />
        </div>
      );
    });
  };

  return (
    <div className={`mt-2 mb-10 ${className}`}>
      <div className="w-full">
        {/* Days Names Column */}
        <div className="grid grid-cols-7 gap-1 md:gap-1 px-2 mt-4">
          {daysOfWeek.map(({ shortDayName, dayName, dayDate }) => (
            <div key={dayName} className="flex justify-center">
              <DayButton
                state={selectedDay === dayName ? "selected" : "unselected"}
                onClick={() => {
                  handleDayChange(dayName);
                }}
                className="h-[5rem]"
              >
                <div className="flex flex-col items-center">
                  <p className="text-sm">{shortDayName}</p>
                  <p className="text-xl font-bold">{dayDate}</p>
                </div>
              </DayButton>
            </div>
          ))}
        </div>

        {/* Render time slots for the selected day */}
        <div className="grid grid-cols-6 gap-2 md:gap-4 px-2 mt-4 touch-none test">
          {renderTimeSlots()}
        </div>
        {/* end of render time slots */}
      </div>
    </div>
  );
};

export default PlayerCalendarMobile;
