'use client'

import dynamic from 'next/dynamic'

/**
 * > Lazy Loading
 * Lazy loading is a technique for loading code only when it is needed.
 * Dynamic imports permit the use of server-side rendering without the need to load all supporting code.
 */

const View = dynamic(() => import('@/components/canvas/view').then((mod) => mod.View), { ssr: false })
const Blob = dynamic(() => import('@/components/canvas/mesh').then((mod) => mod.Blob), { ssr: false })
const Common = dynamic(() => import('@/components/canvas/view').then((mod) => mod.Common), { ssr: false })

const Title = dynamic(() => import('@/components/introSite').then((mod) => mod.Title), { ssr: false })

import { MeshDistortMaterial, Sphere, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'

export default function Page() {
  return (
    <div>
      <motion.div initial={{ opacity: 0 }} transition={{ duration: 2, type: "tween" }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='flex h-screen w-full items-center justify-center'>
        <Canvas>
          <ambientLight intensity={1} />
          <directionalLight position={[20, 30, 10]} intensity={1.5} />
          <directionalLight position={[-19, -20, -20]} intensity={0.25} color='blue' />
          <PerspectiveCamera makeDefault fov={50} position={[0, 0, 6]} />
          <Sphere args={[1.5, 128, 128]}>
            <MeshDistortMaterial metalness={0.8} roughness={0.6} color={0x191970} distort={0.75} />
          </Sphere>
        </Canvas>
      </motion.div>
      <Title />
    </div>
  )
}