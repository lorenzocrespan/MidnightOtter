'use client'

import { forwardRef, Suspense, useImperativeHandle, useRef } from 'react'
import { PerspectiveCamera, View as ViewImpl } from '@react-three/drei'
import { Three } from '@/helpers/components/Three'

export const Common = ({ color }) => (
  <Suspense fallback={null}>
    {color && <color attach='background' args={[color]} />}
    <ambientLight intensity={1} />
    <pointLight position={[20, 30, 10]} intensity={1.5} />
    <pointLight position={[-10, -10, -10]} intensity={0.5} color='blue' />
    <PerspectiveCamera makeDefault fov={50} position={[0, 0, 6]} />
  </Suspense>
)

const View = forwardRef(({ children, ...props }, ref) => {
  const localRef = useRef(null)
  useImperativeHandle(ref, () => localRef.current)

  return (
    <>
      <div ref={localRef} {...props} />
      <Three>
        <ViewImpl track={localRef}>
          {children}
        </ViewImpl>
      </Three>
    </>
  )
})
View.displayName = 'View'

export { View }