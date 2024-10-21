"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "@/components/auth/Header";
import { Social } from "@/components/auth/Social";
import { BackButton } from "@/components/auth/BackButton";
import Terms from "./Terms";

interface CardWrapperProps {
  children: React.ReactNode;
  header: string;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  showTerms?: boolean;
}

export const CardWrapper = ({
  children,
  header,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  showSocial,
  showTerms,
}: CardWrapperProps) => {
  return (
    <Card
      className="max-w-[80%] sm:max-w-[70%] md:max-w-[520px]"
      variant="glass"
    >
      <CardHeader>
        <Header header={header} label={headerLabel} />
      </CardHeader>
      <CardContent className="mt-4">
        {children}
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardContent>
      {showSocial && (
        <CardContent>
          <Social />
        </CardContent>
      )}
      <CardFooter>{showTerms && <Terms />}</CardFooter>
    </Card>
  );
};
