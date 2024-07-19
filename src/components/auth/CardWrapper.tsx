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
    <Card className="min-w-[520px] max-w-[40%]" variant="glass">
      <CardHeader>
        <Header header={header} label={headerLabel} />
      </CardHeader>
      {showSocial && (
        <CardContent>
          <Social />
        </CardContent>
      )}
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel} />
        {showTerms && (
        
          <Terms />
        
      )}
      </CardFooter>
    </Card>
  );
};
