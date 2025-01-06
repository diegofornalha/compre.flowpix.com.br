"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ObrigadoPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    // Aqui você pode adicionar analytics ou outras integrações
    console.log("Transação concluída:", { status, orderId });
  }, [status, orderId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6">
            <svg
              className="h-12 w-12 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            Obrigado pela sua compra!
          </h2>
          
          <p className="text-lg text-gray-600 mb-8">
            Sua transação foi processada com sucesso.
            {orderId && (
              <span className="block text-sm text-gray-500 mt-2">
                ID do Pedido: {orderId}
              </span>
            )}
          </p>

          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-800">
                Seus FLOW tokens serão enviados para sua carteira em breve.
              </p>
            </div>

            <div className="flex flex-col space-y-3">
              <Link href="/user">
                <Button className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white">
                  Ver Minha Carteira
                </Button>
              </Link>

              <Link href="/">
                <Button className="w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                  Voltar para Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 