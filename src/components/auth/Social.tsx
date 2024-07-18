import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";

export const Social = () => {
  return (
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
  );
};
