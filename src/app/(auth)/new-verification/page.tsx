"use client";
import { CardWrapper } from "@/components/auth/CardWrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { PacmanLoader, BarLoader } from "react-spinners";
const NewVerificationPage = () => {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    console.log(token);
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      header="Verifying your account"
      headerLabel="You will be redirected within a few seconds"
      backButtonLabel="Back to Login"
      backButtonHref="/login"
    >
      <div className="flex items-center w-full px-14 py-4">
        <PacmanLoader color="#5AE307" size={50} />
      </div>
    </CardWrapper>
  );
};

export default NewVerificationPage;
