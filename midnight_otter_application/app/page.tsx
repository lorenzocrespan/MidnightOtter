// Components imports
import { MainNav } from "@/components/modalComponents/navigationBarModal/leftNavbar";
import { LogNav } from "@/components/modalComponents/navigationBarModal/rightNavbar";
import { Showcase } from "@/components/modalComponents/showcaseModal/showcaseSection";
import { Section } from "@/components/baseComponents/section";
// Config imports
import {
  introductionPageLeftConfig,
  introductionPageRightConfig,
} from "@/config/introductionPage";

export default function Page() {
  return (
    <div className="container flex min-h-screen flex-col">
      <header className=" sticky top-0 z-40 border-b bg-black">
          <div className=" flex h-16 items-center justify-between py-6">
            <MainNav items={introductionPageLeftConfig.mainNav} />
            <nav>
              <LogNav items={introductionPageRightConfig.mainNav} />
            </nav>
          </div>
      </header>
      <div className="min-h-screen">
        <Showcase title="Midnight Otter" subtitle="Blockchain of custody" />
      </div>
      <Section />
    </div>
  );
}
