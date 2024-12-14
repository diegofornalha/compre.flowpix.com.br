"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <SignUp 
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-xl"
          }
        }}
        path="/sign-up"
        routing="path"
        redirectUrl="/"
      />
    </div>
  );
} 