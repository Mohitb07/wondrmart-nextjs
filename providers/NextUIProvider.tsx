// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import NextTopLoader from "nextjs-toploader";

export function UIProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextTopLoader
        color="#BEF264"
        showSpinner={false}
      />
      {children}
    </NextUIProvider>
  );
}
