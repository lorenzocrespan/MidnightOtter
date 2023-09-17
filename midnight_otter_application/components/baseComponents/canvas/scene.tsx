// Three JS imports
// Three JS is a library that allows us to create 3D objects in the browser using WebGL.
import { Canvas } from "@react-three/fiber";
import { Preload, PerspectiveCamera } from "@react-three/drei";
// React imports
import { Blob } from "@/components/baseComponents/canvas/mesh";
// Types imports
import { MeshDataType } from "@/types/threeJS";

export const Scene = () => {
  // Definition of the mesh properties.
  const meshProps: MeshDataType = {
    metalness: 0.5,
    roughness: 0.5,
    color: 0x191970,
    distort: 0.5,
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Canvas>
        <ambientLight intensity={1} />
        <directionalLight position={[20, 30, 10]} intensity={1.5} />
        <directionalLight
          position={[-20, -20, -20]}
          intensity={0.2}
          color="blue"
        />
        <PerspectiveCamera makeDefault fov={50} position={[0, 0, 5]} />
        <Blob {...meshProps} />
        <Preload all />
      </Canvas>
    </div>
  );
};
