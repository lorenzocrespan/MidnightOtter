import { Metadata } from "next"
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

// Define metadata (title and description) for the page.
export const metadata: Metadata = {
  title: "Pagina di accesso",
  description: "Accesso al tuo utente.",
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p>Pagina di login</p>
      </div>
    </main>
  )
}
