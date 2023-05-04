"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"

import { Icons } from "@/components/icons"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams()

  return (
    <div className="flex flex-col gap-5"  {...props}>
      <form>
        <div className="grid gap-3">
          <input
            type="email"
            id="email"
            className="w-full p-2 text-sm text-slate-900 rounded-md outline outline-1 outline-slate-400"
            placeholder="name@example.com"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled = {isLoading || isGitHubLoading}
          />
          <button type="button" className="w-full py-2 text-sm text-white rounded-md outline outline-1 outline-slate-400 hover:bg-gray-800" disabled={isLoading}>
            {isLoading && (<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />)}
            Sign In with Email
          </button>
        </div>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-300" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white rounded-md px-2 text-slate-600">Or continue with</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button type="button" className="flex self-center items-center justify-center w-2/3 py-2 text-sm text-white rounded-md outline outline-1 outline-slate-400 hover:bg-gray-800"
          onClick={() => {
            setIsGitHubLoading(true)
            // signIn("github", { callbackUrl: searchParams?.get("from") || "/dashboard" })
          }}
          disabled={isLoading || isGitHubLoading}
        >
          {isGitHubLoading ?
            (<Icons.spinner className="mr-2 h-5 w-5 animate-spin" />) :
            (<Icons.gitHub className="mr-2 h-5 w-5" />)} {" "}
          Github
        </button>
        <button type="button" className="flex self-center items-center justify-center w-2/3 py-2 text-sm text-white rounded-md outline outline-1 outline-slate-400 hover:bg-gray-800"
          onClick={() => {
            setIsGitHubLoading(true)
            // signIn("github", { callbackUrl: searchParams?.get("from") || "/dashboard" })
          }}
          disabled={isLoading || isGitHubLoading}
        >
          {isGitHubLoading ?
            (<Icons.spinner className="mr-2 h-5 w-5 animate-spin" />) :
            (<Icons.metamask className="mr-2 h-5 w-5" />)} {" "}
          Metamask
        </button>
      </div>
    </div>
  )
}
