"use client"

import * as React from "react"
import dynamic from 'next/dynamic'
const Scene = dynamic(() => import('@/components/rootPage/canvas/scene').then((mod) => mod.Scene), { ssr: false })

export function Title() {

    return (
        <div>
            <Scene />
            <div className='absolute z-10 top-0 left-0 w-full h-full'>
                <div className='flex flex-col gap-4 text-gray-400 justify-center items-center h-screen'>
                    <p className='text-8xl'>
                        Midnight Otter
                    </p>
                    <p className='text-4xl'>
                        Blockchain of custody
                    </p>
                </div>
            </div>
        </div>
    )
}
