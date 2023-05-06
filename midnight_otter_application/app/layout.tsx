"use client"

import './globals.css'
import { Layout } from '@/components/dom/Layout'
import { motion, AnimatePresence } from 'framer-motion'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='antialiased'>
      <body>
        <AnimatePresence>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
            <Layout>
              {children}
            </Layout>
          </motion.div>
        </AnimatePresence>
      </body>
    </html>
  )
}
