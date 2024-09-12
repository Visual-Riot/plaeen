"use client";

import USPs from "@/components/cards/USPs";

const USPsSection = () => {
  return (
    <div className="x-main-paddings">
      <h2 className="responsive-header font-sofia font-semibold text-neonGreen text-left mt-28 mb-10">
        Why Plaeen?
      </h2>
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <USPs
          className="bg-usp1 md:max-w-[600px]"
          icon={"/icons/easy-scheduling_icon.svg"}
          headline={"Effortless Scheduling"}
          text={
            "Stop juggling calendars. Plaeen finds the perfect time for your next gaming session with friends."
          }
        />
        <USPs
          className="bg-usp2 md:max-w-[600px]"
          icon={"/icons/friends-only_icon.svg"}
          headline={"Friends Only"}
          text={
            "Plaeen is your safe space. Play with the people you know and trust, without worrying about random invites."
          }
        />
        <USPs
          className="bg-usp3 md:max-w-[600px]"
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

// "use client";

// import USPs from "@/components/cards/USPs";

// const USPsSection = () => {
//   return (
//     <div>
//       <h2 className="font-sofia font-semibold text-neonGreen text-left text-[38px] mt-28 w-[72%] mx-auto mb-10">
//         Why Plaeen?
//       </h2>
//       <div className="flex flex-col md:flex-row px-6 lg:px-16 xl:px-0 xl:w-[80%] mx-auto justify-evenly gap-4">
//         <USPs
//           className="bg-usp1"
//           icon={"/icons/easy-scheduling_icon.svg"}
//           headline={"Effortless Scheduling"}
//           text={
//             "Stop juggling calendars. Plaeen finds the perfect time for your next gaming session with friends."
//           }
//         />
//         <USPs
//           className="bg-usp2"
//           icon={"/icons/friends-only_icon.svg"}
//           headline={"Friends Only"}
//           text={
//             "Plaeen is your safe space. Play with the people you know and trust, without worrying about random invites."
//           }
//         />
//         <USPs
//           className="bg-usp3"
//           icon={"/icons/more-game_icon.svg"}
//           headline={"More time, more games"}
//           text={
//             "Spend less time planning, more time playing. Plaeen makes scheduling gaming sessions a breeze."
//           }
//         />
//       </div>
//     </div>
//   );
// };

// export default USPsSection;
