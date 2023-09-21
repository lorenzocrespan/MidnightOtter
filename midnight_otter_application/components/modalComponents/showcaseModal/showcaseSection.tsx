"use client";
// Framer motion imports
// Framer motion provides a declarative, composable, and easy-to-use animation library for React.
import { AnimatePresence, motion } from "framer-motion";
// React imports
import { Scene } from "@/components/baseComponents/canvas/scene";

interface ShowcaseDataProps {
  title: string;
  subtitle: string;
}

export function Showcase(showcaseProps: ShowcaseDataProps) {
  return (
    <AnimatePresence>
      <motion.div
        key="showcase"
        initial={{ opacity: 0 }}
        transition={{ duration: 3, type: "tween" }}
        animate={{ opacity: 1 }}
        className="flex w-full items-center justify-center"
      >
        <Scene />
      </motion.div>
      <div className="absolute left-0 top-0 z-10 h-full w-full">
        <div className="flex h-screen flex-col items-center justify-center gap-4 text-gray-400">
          <p className="text-8xl">{showcaseProps.title}</p>
          <p className="text-4xl">{showcaseProps.subtitle}</p>
        </div>
      </div>
    </AnimatePresence>
  );
}
