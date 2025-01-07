"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ObrigadoContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const orderId = searchParams.get("orderId");

  console.log("Transaction Status:", status);
  console.log("Order ID:", orderId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto text-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 mb-8"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent mb-4">
            Obrigado pela sua compra!
          </h1>
          <p className="text-xl text-gray-600">
            Sua transação foi processada com sucesso.
            {orderId && (
              <span className="block mt-2 text-sm text-gray-500">
                ID da transação: {orderId}
              </span>
            )}
          </p>
        </motion.div>

        <div className="space-y-4">
          <Link href="/cadastro">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-5 px-8 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Fazer Cadastro
            </motion.button>
          </Link>

          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-5 px-8 bg-white text-green-600 font-semibold rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100"
            >
              Voltar para o Início
            </motion.button>
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-500 text-sm"
      >
        Se precisar de ajuda, entre em contato com nosso{" "}
        <a
          href="/suporte"
          className="text-green-600 hover:text-green-700 underline"
        >
          suporte
        </a>
        .
      </motion.div>
    </motion.div>
  );
}

export default function ObrigadoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <Suspense fallback={
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 mb-8">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
            </div>
          </div>
        }>
          <ObrigadoContent />
        </Suspense>
      </div>
    </main>
  );
} 