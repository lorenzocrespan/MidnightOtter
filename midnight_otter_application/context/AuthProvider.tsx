// app/providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import { ReactNode } from "react";

export default function NextAuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <SessionProvider refetchInterval={0}>{children}</SessionProvider>;
}
