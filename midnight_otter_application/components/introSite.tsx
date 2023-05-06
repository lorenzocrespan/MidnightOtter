"use client"

import * as React from "react"

export function Title() {

    return (
        <div>
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
