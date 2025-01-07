"use client";

import { motion, AnimatePresence } from "framer-motion";
import TransakWidget from "@/components/transak-widget";
import NetworkNeon from "@/components/network-neon";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

export default function Home() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isPulsing, setIsPulsing] = useState(false);
  const [showWidget, setShowWidget] = useState(false);

  useEffect(() => {
    // Inicia o efeito pulsante após um delay
    const timer = setTimeout(() => {
      setIsPulsing(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const pulseVariants = {
    initial: { boxShadow: "0 0 0 rgba(34, 197, 94, 0)" },
    pulse: {
      boxShadow: [
        "0 0 0 rgba(34, 197, 94, 0)",
        "0 0 20px rgba(34, 197, 94, 0.3)",
        "0 0 40px rgba(34, 197, 94, 0.2)",
        "0 0 0 rgba(34, 197, 94, 0)",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const neonTextVariants = {
    initial: { textShadow: "0 0 0 rgba(34, 197, 94, 0)" },
    glow: {
      textShadow: [
        "0 0 4px rgba(34, 197, 94, 0.3)",
        "0 0 8px rgba(34, 197, 94, 0.3)",
        "0 0 12px rgba(34, 197, 94, 0.3)",
        "0 0 4px rgba(34, 197, 94, 0.3)",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Coluna da esquerda - Como funciona */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            className="order-2 lg:order-1 space-y-8"
          >
            <section>
              <motion.h2 
                initial="initial"
                animate={isPulsing ? "glow" : "initial"}
                variants={{
                  ...itemVariants,
                  ...neonTextVariants
                }}
                className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent mb-8"
              >
                Como funciona
              </motion.h2>
              <div className="space-y-6">
                <motion.div 
                  initial="initial"
                  animate={isPulsing ? "pulse" : "initial"}
                  variants={{
                    ...itemVariants,
                    ...pulseVariants
                  }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden"
                >
                  <motion.div 
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0"
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0 0 20px rgba(34, 197, 94, 0.5)",
                    }}
                  >
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">ESCOLHA O MÉTODO DE PAGAMENTO</h3>
                    <p className="text-gray-600">Selecione: google pay, apple pay e cartões.</p>
                  </div>
                </motion.div>

                <motion.div 
                  initial="initial"
                  animate={isPulsing ? "pulse" : "initial"}
                  variants={{
                    ...itemVariants,
                    ...pulseVariants
                  }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <motion.div 
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0"
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0 0 20px rgba(34, 197, 94, 0.5)",
                    }}
                  >
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">ESCOLHA A QUANTIDADE DE TOKENS FLOW</h3>
                    <p className="text-gray-600">Selecione a quantia desejada.</p>
                  </div>
                </motion.div>

                <motion.div 
                  initial="initial"
                  animate={isPulsing ? "pulse" : "initial"}
                  variants={{
                    ...itemVariants,
                    ...pulseVariants
                  }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <motion.div 
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0"
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0 0 20px rgba(34, 197, 94, 0.5)",
                    }}
                  >
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">FAÇA O LOGIN PARA RECEBER TOKENS $BR</h3>
                    <p className="text-gray-600">Quanto mais tokens você comprar, mais tokens $BR vai receber.</p>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Seção de Compartilhamento */}
            <motion.section 
              initial="initial"
              animate={isPulsing ? "pulse" : "initial"}
              variants={{
                ...itemVariants,
                ...pulseVariants
              }}
              className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 shadow-xl relative overflow-hidden"
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-600/20"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="text-center relative z-10">
                <motion.h2 
                  className="text-3xl font-bold text-white mb-6"
                  initial="initial"
                  animate={isPulsing ? "glow" : "initial"}
                  variants={neonTextVariants}
                >
                  Compartilhe seu link e ganhe FLOW
                </motion.h2>
                <Link href="/cadastro" target="_blank" rel="noopener noreferrer">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-green-600 font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 w-full max-w-sm shadow-lg hover:shadow-xl relative overflow-hidden group"
                  >
                    <motion.span 
                      className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-green-600/10"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative z-10">Faça seu cadastro</span>
                  </motion.button>
                </Link>
              </div>
            </motion.section>
          </motion.div>

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
                  color="#12cf83"
                  title="O NOVO PIX"
                  subtitle="é o Token FLOW"
                  onLoadComplete={() => setShowWidget(true)}
                />
              </div>
              <div className={`absolute inset-0 transition-opacity duration-500 ${showWidget ? 'opacity-100' : 'opacity-0'}`}>
                <TransakWidget cryptoCurrency="FLOW" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
} 