"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react"
import React from "react";

interface ProviderProps {
  children: React.ReactNode
  session?: Session | null
}

const Provider = ({children, session}: ProviderProps) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider