// Components imports
import { MainNav } from "@/components/levelOneComps/navigationBar/leftNavbar";
import { LogNav } from "@/components/levelOneComps/navigationBar/rightNavbar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// Config imports
import {
  loggedPageLeftConfig,
  loggedPageRightConfig,
} from "@/config/loggedNavbarConfig";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const session = await getServerSession();
  
  if (!session) redirect("/");

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
