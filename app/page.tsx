"use client";

import { motion } from "framer-motion";
import { Step } from "@/components/ui/step";
import Link from "next/link";
import TransakWidget from "@/components/transak-widget";
import CustomSignInButton from "@/components/sign-in-button";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <main className="container mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start min-h-screen">
          <div className="space-y-16 pb-16">
            {/* Logo e título */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-6xl font-bold text-[#12cf83]">
                FLOW PIX
              </h1>
              <p className="text-xl text-gray-600">
                A maneira mais fácil de comprar tokens FLOW no Brasil
              </p>
            </motion.div>

            {/* Seção "Como Funciona" */}
            <section>
              <motion.h2 
                className="text-4xl font-bold text-[#12cf83] mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Como funciona
              </motion.h2>
              <div className="space-y-8">
                <Step 
                  title="ESCOLHA O MÉTODO DE PAGAMENTO" 
                  description="Selecione: google pay, apple pay e cartões." 
                  icon="M8 7h12m-12 6h12m-12 6h12M4 7h0m0 6h0m0 6h0"
                />
                <Step 
                  title="ESCOLHA A QUANTIDADE DE TOKENS FLOW" 
                  description="Selecione o token a quantia desejada." 
                  icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8v1m0 10v1M3 12h1m16 0h1"
                />
                <Step 
                  title="FAÇA O LOGIN PARA RECEBER TOKENS $BR" 
                  description="Quanto mais tokens você comprar, mais tokens $BR vai receber." 
                  icon="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"
                />
              </div>
            </section>

            {/* Seção de Referência */}
            <motion.section 
              className="bg-gradient-to-br from-[#1E1E1E] to-[#12cf83] rounded-2xl p-8 text-white shadow-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl font-bold leading-tight">
                  Compartilhe seu link e ganhe FLOW
                </h2>
                <Link href="/user" className="block">
                  <motion.button 
                    className="bg-white/90 hover:bg-white text-[#1E1E1E] px-6 py-3 rounded-xl font-medium transition-all w-full text-center text-lg shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Faça seu cadastro
                  </motion.button>
                </Link>
              </div>
            </motion.section>
          </div>

          {/* Coluna da direita - TransakWidget */}
          <div className="relative lg:sticky lg:top-8">
            <TransakWidget />
          </div>
        </div>
      </main>
    </div>
  );
} 