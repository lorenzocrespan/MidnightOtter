"use client";

import * as React from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import { MainNavItem } from "@/types";
import { cn } from "@/lib/utils";
import { useMetamaskTaskContext } from "@/context/metamaskContext";
import { useRouter } from "next/navigation";

interface MainNavProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
}

export function LogNav({ items, children }: MainNavProps) {
  const segment = useSelectedLayoutSegment();
  const dispatch = useMetamaskTaskContext();
  const router = useRouter();

  return (
    <div className="flex gap-6 md:gap-10">
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              {...(item.title === "Logout"
                ? {
                    onClick: (e) => {
                      e.preventDefault();
                      dispatch
                        ? dispatch({ type: "DISCONNECT" })
                        : console.log("dispatch not found");
                      router.push("/");
                    },
                  }
                : {})}
              className={cn(
                "hover:text-foreground/80 flex items-center text-lg font-medium transition-colors sm:text-sm",
                item.href.startsWith(`/${segment}`)
                  ? "text-foreground"
                  : "text-foreground/60",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
