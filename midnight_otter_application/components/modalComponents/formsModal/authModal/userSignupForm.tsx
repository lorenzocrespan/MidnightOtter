"use client";

import * as React from "react";

import { Icons } from "@/components/baseComponents/icons";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserSignupForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  return (
    <div className="flex flex-col gap-5" {...props}>
      <form>
        <div className="grid gap-3">
          <input
            type="email"
            id="email"
            className="w-full rounded-md p-2 text-sm text-slate-900 outline outline-1 outline-slate-400"
            placeholder="name@example.com"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading}
          />
          <button
            type="button"
            className="w-full rounded-md py-2 text-sm text-white outline outline-1 outline-slate-400 hover:bg-gray-800"
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </button>
        </div>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-300" />
        </div>
      </div>
    </div>
  );
}
