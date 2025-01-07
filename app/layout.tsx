"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import type { Appearance } from "@clerk/types";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const clerkAppearance: Appearance = {
  elements: {
    formButtonPrimary:
      "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white",
    formFieldInput:
      "border-gray-200 focus:border-green-500 focus:ring-green-500",
    formFieldLabel: "text-gray-700",
    footerActionLink: "text-green-600 hover:text-green-700",
    headerTitle: "hidden",
    headerSubtitle: "hidden",
    socialButtonsBlockButton:
      "border-gray-200 hover:bg-gray-50 text-gray-600",
    socialButtonsBlockButtonText: "text-gray-600",
    dividerLine: "bg-gray-200",
    dividerText: "text-gray-500",
  },
  layout: {
    socialButtonsPlacement: "bottom" as const,
    showOptionalFields: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      appearance={clerkAppearance}
    >
      <html lang="pt-BR">
        <head>
          <title>Flowpix - Compre tokens em múltiplas redes</title>
          <meta name="description" content="Compre tokens em diferentes redes blockchain de forma rápida e segura." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body className={inter.className}>
          <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}