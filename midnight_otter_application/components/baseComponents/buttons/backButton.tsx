// Next imports
import Link from "next/link";
// React components imports
import { Icons } from "@/components/baseComponents/icons";

interface BackButtonDataProps {
  title: string;
  destination: string;
}

export function BackButton(backButtonProps: BackButtonDataProps) {
  return (
    <Link
      href={backButtonProps.destination}
      className="absolute left-4 top-4 md:left-8 md:top-8"
    >
      <div className="flex cursor-pointer items-center space-x-2 align-middle text-slate-400 hover:text-slate-300">
        <Icons.chevronLeft className="mr-2 h-5 w-5" />
        {backButtonProps.title}
      </div>
    </Link>
  );
}
