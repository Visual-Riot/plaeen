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
      <div className="my-4 flex basis-full text-lightGrey font-thin before:bg-[#707070] before:h-px before:grow before:mr-4 before:mt-2 after:bg-[#707070] after:h-px after:grow items-center after:ml-4 after:mt-2">
        or
      </div>
      <div className="flex flex-col items-center w-full gap-y-2 mt-4 ">
        <Button
          size="full"
          className="gap-7"
          variant="social"
          onClick={() => {
            onClick("google");
          }}
        >
          <FcGoogle size={24} />
          Continue with Google
        </Button>
        <Button
          size="full"
          className="gap-7"
          variant="social"
          onClick={() => {
            onClick("twitch");
          }}
        >
          <FaTwitch size={24} color="#9146FF"/>
          Continue with Twitch
        </Button>
        <Button
          size="full"
          className="gap-7"
          variant="social"
          onClick={() => {
            onClick("discord");
          }}
        >
          <FaDiscord size={24} color="#5865F2" />
          Continue with Discord
        </Button>
      </div>
    </>
  );
};
