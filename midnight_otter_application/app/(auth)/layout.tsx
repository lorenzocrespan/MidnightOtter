import { BackButton } from "@/components/baseComponents/buttons/backButton";
import { Suspense } from "react";
import Loading from "./loading";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen">
      <BackButton title="Homepage" destination="/" />
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
