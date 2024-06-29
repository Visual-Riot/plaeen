"use client";

import USPs from "@/components/cards/USPs";

const USPsSection = () => {
  return (
    <div>
      <h2 className="relative font-sofia text-neonGreen text-left text-[38px] xs:top-[100px] sm:top-[80px] left-0 w-[70%] mx-auto">
        Why Plaeen?
      </h2>
      <div className="flex flex-wrap relative top-[120px] w-[80%] mx-auto justify-evenly">
        <USPs
          className="bg-usp1"
          icon={"/icons/easy-scheduling_icon.svg"}
          headline={"Effortless Scheduling"}
          text={
            "Stop juggling calendars. Plaeen finds the perfect time for your next gaming session with friends."
          }
        />
        <USPs
          className="bg-usp2"
          icon={"/icons/friends-only_icon.svg"}
          headline={"Friends Only"}
          text={
            "Plaeen is your safe space. Play with the people you know and trust, without worrying about random invites."
          }
        />
        <USPs
          className="bg-usp3"
          icon={"/icons/more-game_icon.svg"}
          headline={"More time, more games"}
          text={
            "Spend less time planning, more time playing. Plaeen makes scheduling gaming sessions a breeze."
          }
        />
      </div>
    </div>
  );
};

export default USPsSection;
