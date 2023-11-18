// Components imports
import { MainNav } from "@/components/modalComponents/navigationBarModal/leftNavbar";
import { LogNav } from "@/components/modalComponents/navigationBarModal/rightNavbar";

// Config imports
import {
  loggedPageLeftConfig,
  loggedPageRightConfig,
} from "@/config/loggedNavbarConfig";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="container flex min-h-screen flex-col">
      <header className=" sticky top-0 z-40 border-b bg-black">
        <div className=" flex h-16 items-center justify-between py-6">
          <MainNav items={loggedPageLeftConfig.mainNav} />
          <nav>
            <LogNav items={loggedPageRightConfig.mainNav} />
          </nav>
        </div>
      </header>
      <div className="min-h-screen">{children}</div>
    </div>
  );
}
