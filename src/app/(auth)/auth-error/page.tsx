import { CardWrapper } from "@/components/auth/CardWrapper";
import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const AuthErrorPage = () => {
  return (
    <CardWrapper
      header="Something went wrong!"
      headerLabel="Oops, try again in a few minutes"
      backButtonHref="/login"
      backButtonLabel="Return to login"
    >
      <div className="flex items-center justify-center py-4">
        <FaExclamationTriangle size={38} color="#FF304D" />
      </div>
    </CardWrapper>
  );
};

export default AuthErrorPage;
