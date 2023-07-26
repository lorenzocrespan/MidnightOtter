"use client";

import * as React from "react";
import dynamic from "next/dynamic";
const Scene = dynamic(
  () => import("@/components/rootPage/canvas/scene").then((mod) => mod.Scene),
  { ssr: false }
);

export function Title() {
  return (
    <div>
      <Scene />
      <div className="absolute left-0 top-0 z-10 h-full w-full">
        <div className="flex h-screen flex-col items-center justify-center gap-4 text-gray-400">
          <p className="text-8xl">Midnight Otter</p>
          <p className="text-4xl">Blockchain of custody</p>
        </div>
      </div>
    </div>
  );
}
