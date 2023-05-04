import { Metadata } from "next"
import Link from "next/link"

import { Icons } from "@/components/icons"
import { UserAuthForm } from "@/components/user-auth-form"

// Define metadata (title and description) for the page.
export const metadata: Metadata = {
  title: "Pagina di accesso",
  description: "Accesso al tuo utente.",
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
            Welcome back
          </h1>
          <p className="text-sm text-slate-400">
            Enter your email to sign in to your account.
          </p>
        </div>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-slate-400">
          <Link href="/register" className="hover:text-brand underline underline-offset-4">
            Don&apos;t have an account? Sign Up.
          </Link>
        </p>
      </div>
    </div>
  )
}
