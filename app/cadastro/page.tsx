"use client";

import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Link from "next/link";

export default function CadastroPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <h1 className="text-4xl lg:text-5xl font-bold text-green-500 hover:text-green-600 transition-colors">
                FLOW PIX
              </h1>
            </Link>
            <p className="mt-4 text-xl text-gray-600">
              A maneira mais fácil de comprar tokens FLOW no Brasil
            </p>
          </div>

          {/* Signup Container */}
          <div className="bg-gray-50 rounded-xl p-8 shadow-lg border border-gray-100">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Crie sua conta na FlowPix
              </h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Comece a comprar e vender FLOW tokens de forma rápida e segura
              </p>
            </div>

            <SignUp
              appearance={{
                elements: {
                  formButtonPrimary:
                    "bg-green-500 hover:bg-green-600 text-white transition-colors",
                  card: "bg-transparent shadow-none",
                  headerTitle: "text-gray-900",
                  headerSubtitle: "text-gray-600",
                  socialButtonsBlockButton: "border-gray-200 bg-white hover:bg-gray-50",
                  socialButtonsBlockButtonText: "text-gray-600",
                  formFieldLabel: "text-gray-700",
                  formFieldInput: "border-gray-200 focus:border-green-500 focus:ring-green-500",
                  footerActionText: "text-gray-600",
                  footerActionLink: "text-green-500 hover:text-green-600",
                  dividerLine: "bg-gray-200",
                  dividerText: "text-gray-500",
                },
              }}
              redirectUrl="/"
              routing="path"
              path="/cadastro"
              signInUrl="/login"
            />

            <div className="mt-8 text-center text-sm text-gray-500">
              <p>
                Ao se cadastrar, você concorda com nossos{" "}
                <a href="/termos" className="text-green-500 hover:text-green-600">
                  Termos de Serviço
                </a>{" "}
                e{" "}
                <a href="/privacidade" className="text-green-500 hover:text-green-600">
                  Política de Privacidade
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 