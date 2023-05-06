'use client'

import { MeshDistortMaterial } from  '@react-three/drei'

export const Blob = ({ route = '/', ...props }) => {
  return (
    <mesh {...props}>
      <sphereGeometry args={[1.5, 128, 128]} /> 
      <MeshDistortMaterial metalness={0.8} roughness={0.6} color={0x191970} distort={0.75}/>
    </mesh>
  )
}
