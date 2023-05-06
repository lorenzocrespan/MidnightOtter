'use client'
import { MeshDistortMaterial } from  '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { r3f } from '@/helpers/global'
import { motion } from 'framer-motion'

export default function Scene({ ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }}>
      <Canvas {...props}>
        <sphereGeometry args={[1.5, 128, 128]} />
        <MeshDistortMaterial metalness={0.8} roughness={0.6} color={0x191970} distort={0.75} />
      </Canvas>
    </motion.div>
  )
}