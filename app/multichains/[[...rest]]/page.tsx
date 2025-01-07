"use client";

import TransakWidget from "@/components/transak-widget";
import NetworkNeon from "@/components/network-neon";
import { SignUp } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { createClient } from "@/lib/supabase/client";

export default function MultiChainsPage() {
  const [showWidget, setShowWidget] = useState(false);
  const [transactionType, setTransactionType] = useState<"BUY" | "SELL">("BUY");
  const [userProfile, setUserProfile] = useState<any>(null);
  const { isSignedIn, userId } = useAuth();
  const supabase = createClient();

  useEffect(() => {
    async function fetchUserProfile() {
      if (isSignedIn && userId) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (data && !error) {
          setUserProfile(data);
        }
      }
    }

    fetchUserProfile();
  }, [isSignedIn, userId]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.8,
      },
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Coluna da esquerda - Como funciona */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="order-2 lg:order-1 space-y-8"
          >
            <section>
              <motion.h2 
                variants={itemVariants}
                className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent mb-8"
              >
                Como funciona
              </motion.h2>

              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500/20 rounded-2xl blur-xl" />
                  <motion.div 
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center flex-shrink-0">
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
              </div>
            </section>

            {/* Seção de Vantagens */}
            <motion.section 
              variants={itemVariants}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500/10 rounded-xl blur-lg" />
                  <div className="bg-white p-6 rounded-xl shadow-lg relative">
                    <div className="text-red-600 mb-2">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Transações Rápidas</h4>
                    <p className="text-gray-600">Confirmação instantânea em redes de alta performance.</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-red-500/10 rounded-xl blur-lg" />
                  <div className="bg-white p-6 rounded-xl shadow-lg relative">
                    <div className="text-red-600 mb-2">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Segurança Máxima</h4>
                    <p className="text-gray-600">Proteção avançada em todas as transações.</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-red-500/10 rounded-xl blur-lg" />
                  <div className="bg-white p-6 rounded-xl shadow-lg relative">
                    <div className="text-red-600 mb-2">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Melhores Taxas</h4>
                    <p className="text-gray-600">Taxas competitivas em todas as redes.</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-red-500/10 rounded-xl blur-lg" />
                  <div className="bg-white p-6 rounded-xl shadow-lg relative">
                    <div className="text-red-600 mb-2">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Multi-Chain</h4>
                    <p className="text-gray-600">Acesso a todas as principais redes em um só lugar.</p>
                  </div>
                </div>
              </div>
            </motion.section>
          </motion.div>

          {/* Coluna da direita - Widget */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="order-1 lg:order-2 flex flex-col justify-end"
          >
            {showWidget ? (
              <motion.div variants={itemVariants}>
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500/20 rounded-2xl blur-xl" />
                  <div className="bg-white p-4 rounded-2xl shadow-lg relative">
                    <TransakWidget
                      cryptoCurrency=""
                      transactionType={transactionType}
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-8">
                <motion.div variants={itemVariants}>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.button
                      onClick={() => {
                        setTransactionType("BUY");
                        setShowWidget(true);
                      }}
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10">Comprar</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    </motion.button>

                    <motion.button
                      onClick={() => {
                        setTransactionType("SELL");
                        setShowWidget(true);
                      }}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10">Vender</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    </motion.button>
                  </div>
                </motion.div>

                <div className="mt-auto space-y-4">
                  <motion.div variants={itemVariants}>
                    <div className="relative">
                      <div className="absolute inset-0 bg-red-500/20 rounded-2xl blur-xl" />
                      <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative">
                        {isSignedIn && userProfile ? (
                          <div className="text-center space-y-4">
                            <h3 className="text-xl font-bold text-gray-900">Perfil do Usuário</h3>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="grid grid-cols-2 gap-4 text-left">
                                <div>
                                  <p className="text-sm text-gray-500">ID do Usuário</p>
                                  <p className="font-medium text-gray-900">{userProfile.id}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Email</p>
                                  <p className="font-medium text-gray-900">{userProfile.email || "Não informado"}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Carteira</p>
                                  <p className="font-medium text-gray-900 break-all">{userProfile.wallet_address || "Não configurada"}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Membro desde</p>
                                  <p className="font-medium text-gray-900">
                                    {new Date(userProfile.created_at).toLocaleDateString('pt-BR')}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="mt-4">
                              <p className="text-sm text-gray-500">
                                Status: <span className="text-green-500 font-medium">Verificado</span>
                              </p>
                            </div>
                          </div>
                        ) : (
                          <>
                            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                              Escolha sua wallet Web3 para logar
                            </h3>
                            <div className="w-full max-w-md mx-auto">
                              <SignUp
                                afterSignUpUrl="/multichains"
                                afterSignInUrl="/multichains"
                                appearance={{
                                  elements: {
                                    formButtonPrimary: 
                                      "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
                                    card: "bg-transparent shadow-none",
                                  },
                                }}
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <div className="relative">
                      <div className="absolute inset-0 bg-red-500/20 rounded-2xl blur-xl" />
                      <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center flex-shrink-0">
                          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">A taxa vira cashback</h3>
                          <p className="text-gray-600">Quanto mais tokens você comprar, mais tokens $BR vai receber.</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
} 