"use client";

import { SignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

export default function CadastroPage() {
  const router = useRouter();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/comprar");
    }
  }, [isSignedIn, router]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md p-4">
        <SignUp
          redirectUrl="/comprar"
          signInUrl="/cadastro"
        />
      </div>
    </main>
  );
} 