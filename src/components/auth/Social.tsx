import { FcGoogle } from "react-icons/fc";
import { FaTwitch, FaDiscord } from "react-icons/fa";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
  const onClick = (provider: "google" | "twitch" | "discord") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <>
      <div className="my-4 text-xs sm:text-sm md:text-base flex basis-full text-lightGrey font-thin before:bg-[#707070] before:h-px before:grow before:mr-4 before:mt-2 after:bg-[#707070] after:h-px after:grow items-center after:ml-4 after:mt-2">
        or
      </div>
      <div className="flex flex-col items-center w-full gap-y-2 mt-4 ">
        <Button
          size="full"
          className="gap-4 sm:gap-5 md:gap-7"
          variant="social"
          onClick={() => {
            onClick("google");
          }}
        >
          <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
            <FcGoogle size="auto" />
          </div>
          Continue with Google
        </Button>
        <Button
          size="full"
          className="gap-4 sm:gap-5 md:gap-7"
          variant="social"
          onClick={() => {
            onClick("twitch");
          }}
        >
          <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
            <FaTwitch size="auto" color="#9146FF" />
          </div>
          Continue with Twitch
        </Button>
        <Button
          size="full"
          className="gap-4 sm:gap-5 md:gap-7"
          variant="social"
          onClick={() => {
            onClick("discord");
          }}
        >
          <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
            <FaDiscord size="auto" color="#5865F2" />
          </div>
          Continue with Discord
        </Button>
      </div>
    </>
  );
};
