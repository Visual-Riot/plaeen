"use client";
import { CardWrapper } from "@/components/auth/CardWrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "@/components/forms/FormError";
import { FormSuccess } from "@/components/forms/FormSuccess";

const VerificationWidget = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing token! Try with a new verification link");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong! Try again in a few minutes");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      header="Verifying your account"
      headerLabel="This should only take few seconds..."
      backButtonLabel="Back to Login"
      backButtonHref="/login"
    >
      <div className="flex items-center w-full justify-center py-4">
        {!success && !error && (
          <PacmanLoader
            color="#5AE307"
            size={50}
            cssOverride={{ marginRight: "30%" }}
            speedMultiplier={2}
          />
        )}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};

export default VerificationWidget;
