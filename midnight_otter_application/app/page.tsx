"use client";

import dynamic from "next/dynamic";
import { Navbar } from "@/components/navbar";

/**
 * > Lazy Loading
 * Lazy loading is a technique for loading code only when it is needed.
 * Dynamic imports permit the use of server-side rendering without the need to load all supporting code.
 */

const Title = dynamic(
  () => import("@/components/rootPage/introSite").then((mod) => mod.Title),
  { ssr: false }
);
const Section = dynamic(
  () => import("@/components/rootPage/section").then((mod) => mod.Section),
  { ssr: false }
);

export default function Page() {
  return (
    <>
      <Title />
      <Section />
    </>
  );
}
