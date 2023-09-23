// Components imports
import { MainNav } from "@/components/modalComponents/navigationBarModal/leftNavbar";
import { LogNav } from "@/components/modalComponents/navigationBarModal/rightNavbar";
// Config imports
import {
  introductionPageLeftConfig,
  introductionPageRightConfig,
} from "@/config/introductionPage";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="container flex min-h-screen flex-col">
      <header className=" sticky top-0 z-40 border-b">
        <div className=" flex h-16 items-center justify-between py-6">
          <MainNav items={introductionPageLeftConfig.mainNav} />
          <nav>
            <LogNav items={introductionPageRightConfig.mainNav} />
          </nav>
        </div>
      </header>
      <div className="min-h-screen">{children}</div>
    </div>
  );
}
