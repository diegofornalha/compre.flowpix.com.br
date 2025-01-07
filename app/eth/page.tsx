"use client";

import TransakWidget from "@/components/transak-widget";
import NetworkNeon from "@/components/network-neon";
import { motion } from "framer-motion";
import { useState } from "react";

export default function EthereumPage() {
  const [showWidget, setShowWidget] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Coluna da esquerda - Como funciona */}
          <div className="order-2 lg:order-1 space-y-8">
            <section>
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#627EEA] to-[#627EEA] bg-clip-text text-transparent mb-8">
                Como funciona
              </h2>
              <div className="space-y-6">
                <motion.div 
                  initial="initial"
                  animate="pulse"
                  variants={{
                    initial: { boxShadow: "0 0 0 rgba(98, 126, 234, 0)" },
                    pulse: {
                      boxShadow: [
                        "0 0 0 rgba(98, 126, 234, 0)",
                        "0 0 20px rgba(98, 126, 234, 0.3)",
                        "0 0 40px rgba(98, 126, 234, 0.2)",
                        "0 0 0 rgba(98, 126, 234, 0)",
                      ],
                      transition: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    },
                  }}
                  className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#627EEA] to-[#627EEA] flex items-center justify-center flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">ESCOLHA O MÉTODO DE PAGAMENTO</h3>
                    <p className="text-gray-600">Selecione: google pay, apple pay e cartões.</p>
                  </div>
                </motion.div>

                <motion.div 
                  initial="initial"
                  animate="pulse"
                  variants={{
                    initial: { boxShadow: "0 0 0 rgba(98, 126, 234, 0)" },
                    pulse: {
                      boxShadow: [
                        "0 0 0 rgba(98, 126, 234, 0)",
                        "0 0 20px rgba(98, 126, 234, 0.3)",
                        "0 0 40px rgba(98, 126, 234, 0.2)",
                        "0 0 0 rgba(98, 126, 234, 0)",
                      ],
                      transition: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    },
                  }}
                  className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#627EEA] to-[#627EEA] flex items-center justify-center flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">ESCOLHA A QUANTIDADE DE ETHEREUM</h3>
                    <p className="text-gray-600">Selecione a quantia desejada.</p>
                  </div>
                </motion.div>

                <motion.div 
                  initial="initial"
                  animate="pulse"
                  variants={{
                    initial: { boxShadow: "0 0 0 rgba(98, 126, 234, 0)" },
                    pulse: {
                      boxShadow: [
                        "0 0 0 rgba(98, 126, 234, 0)",
                        "0 0 20px rgba(98, 126, 234, 0.3)",
                        "0 0 40px rgba(98, 126, 234, 0.2)",
                        "0 0 0 rgba(98, 126, 234, 0)",
                      ],
                      transition: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    },
                  }}
                  className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#627EEA] to-[#627EEA] flex items-center justify-center flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">FAÇA O LOGIN PARA RECEBER TOKENS $BR</h3>
                    <p className="text-gray-600">Quanto mais tokens você comprar, mais tokens $BR vai receber.</p>
                  </div>
                </motion.div>
              </div>
            </section>
          </div>

          {/* Coluna da direita - Widget */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2 lg:sticky lg:top-8"
          >
            <div className="relative h-[600px]">
              <div className="absolute inset-0">
                <NetworkNeon
                  color="#627EEA"
                  title="COMPRE ETHEREUM"
                  subtitle="de forma simples"
                  onLoadComplete={() => setShowWidget(true)}
                />
              </div>
              <div className={`absolute inset-0 transition-opacity duration-500 ${showWidget ? 'opacity-100' : 'opacity-0'}`}>
                <TransakWidget cryptoCurrency="ETH" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
} 