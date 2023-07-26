"use client";

import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { PerspectiveCamera } from "@react-three/drei";

const Blob = dynamic(
  () => import("@/components/rootPage/canvas/mesh").then((mod) => mod.Blob),
  { ssr: false }
);

export const Scene = () => {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        transition={{ duration: 2, type: "tween" }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex h-screen w-full items-center justify-center"
      >
        <Canvas>
          <ambientLight intensity={1} />
          <directionalLight position={[20, 30, 10]} intensity={1.5} />
          <directionalLight
            position={[-19, -20, -20]}
            intensity={0.25}
            color="blue"
          />
          <PerspectiveCamera makeDefault fov={50} position={[0, 0, 6]} />
          <Blob />
          <Preload all />
        </Canvas>
      </motion.div>
    </AnimatePresence>
  );
};
