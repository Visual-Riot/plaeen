import Link from "next/link";
import { Button } from "../ui/button";

interface BackButtonProps {
  href: string;
  label: string;
}

export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button variant="link" className="font-normal w-full mt-5" size="sm" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
}