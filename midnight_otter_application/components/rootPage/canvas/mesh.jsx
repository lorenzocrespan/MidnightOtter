"use client";

import { MeshDistortMaterial, Sphere } from "@react-three/drei";

export const Blob = ({ route = "/", ...props }) => {
  return (
    <mesh {...props}>
      <Sphere args={[1.5, 94, 94]}>
        <MeshDistortMaterial
          metalness={0.8}
          roughness={0.6}
          color={0x191970}
          distort={0.5}
        />
      </Sphere>
    </mesh>
  );
};
