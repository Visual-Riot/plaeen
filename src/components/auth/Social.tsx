import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";

export const Social = () => {
  return (
    <>
      <div className="flex flex-col items-center w-full gap-y-2 mt-8 ">
        <Button
          size="full"
          className="gap-7"
          variant="social"
          onClick={() => {}}
        >
          <FcGoogle size={24} />
          Continue with Google
        </Button>
      </div>
      <div className="my-8 flex basis-full text-lightGrey font-thin before:bg-[#707070] before:h-px before:grow before:mr-4 before:mt-2 after:bg-[#707070] after:h-px after:grow items-center after:ml-4 after:mt-2">
        or
      </div>
    </>
  );
};
