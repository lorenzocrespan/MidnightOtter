import { Metadata } from "next"
import Link from "next/link"

import { Icons } from "@/components/icons"

// Define metadata (title and description) for the page.
export const metadata: Metadata = {
  title: "Pagina di registrazione",
  description: "Registrazione del tuo utente.",
}

export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <Link href="/" className="absolute top-4 left-4 md:top-8 md:left-8">
        <div className="flex align-middle items-center space-x-2 text-slate-400 hover:text-slate-300 cursor-pointer">
          <Icons.chevronLeft className="mr-2 h-5 w-5" />
          Homepage
        </div>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-80">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-10 w-10" />
          <h1 className="text-2xl font-semibold">
            Create an account
          </h1>
          <p className="text-sm text-slate-400">
            Enter your email to create your account.
          </p>
        </div>
        <p className="px-8 text-center text-sm text-slate-400">
          By clicking continue, you agree to our &nbsp;
          <Link href="/termService" className="hover:text-brand underline underline-offset-4">
            Terms of Service 
          </Link>
          &nbsp; and &nbsp;
          <Link href="/privacyPolicy" className="hover:text-brand underline underline-offset-4">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
