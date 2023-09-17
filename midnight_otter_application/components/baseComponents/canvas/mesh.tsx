// Three JS imports
// Three JS is a library that allows us to create 3D objects in the browser using WebGL.
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
// Types imports
import { MeshDataType } from "@/types/threeJS";

export const Blob = (meshProps: MeshDataType) => {
  return (
    <Sphere args={[1.25, 100, 100]}>
      <MeshDistortMaterial
        metalness={meshProps.metalness}
        roughness={meshProps.roughness}
        color={meshProps.color}
        distort={meshProps.distort}
      />
    </Sphere>
  );
};
