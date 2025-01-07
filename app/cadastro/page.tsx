"use client";

import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Embate 1: Animações e Transições
// Vencedor: Animações Suaves e Progressivas
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

export default function CadastroPage() {
  // Embate 2: Detecção de Viewport
  // Vencedor: Animação baseada em visualização
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Embate 9: Configuração do Clerk
  // Vencedor: Tema Personalizado sem Dependências Externas
  const clerkAppearance = {
    variables: {
      colorPrimary: '#22c55e',
      colorTextOnPrimaryBackground: '#ffffff',
      colorBackground: '#ffffff',
      colorText: '#111827',
      colorDanger: '#ef4444',
      colorSuccess: '#22c55e',
      colorWarning: '#f59e0b',
      borderRadius: '0.75rem'
    },
    elements: {
      formButtonPrimary:
        "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl",
      card: "bg-transparent shadow-none",
      headerTitle: "text-gray-900 text-2xl",
      headerSubtitle: "text-gray-600",
      socialButtonsBlockButton: "border-gray-200 bg-white hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2",
      socialButtonsBlockButtonText: "text-gray-600 font-medium",
      socialButtonsProviderIcon: "w-5 h-5",
      formFieldLabel: "text-gray-700 font-medium",
      formFieldInput: "border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all duration-200 rounded-lg",
      footerActionText: "text-gray-600",
      footerActionLink: "text-green-500 hover:text-green-600 transition-colors duration-200",
      dividerLine: "bg-gray-200",
      dividerText: "text-gray-500 bg-white px-4",
      formFieldSuccessText: "text-green-500",
      formFieldErrorText: "text-red-500",
      alert: "rounded-lg p-4 text-sm",
      alertSuccess: "bg-green-50 text-green-700 border border-green-200",
      alertWarning: "bg-yellow-50 text-yellow-700 border border-yellow-200",
      alertError: "bg-red-50 text-red-700 border border-red-200",
      // Embate 10: Melhorias de Acessibilidade
      formFieldInputShowPasswordButton: "text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md",
      formFieldInputShowPasswordIcon: "w-5 h-5",
      formResendCodeLink: "text-green-500 hover:text-green-600 transition-colors duration-200",
      otpCodeFieldInput: "border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all duration-200 rounded-lg text-center"
    }
  };

  return (
    // Embate 3: Layout e Fundo
    // Vencedor: Design com Gradiente Suave e Padrão Moderno
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Padrão de Fundo Decorativo */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <motion.div 
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="container mx-auto px-4 py-12 lg:py-16 relative z-10"
      >
        <div className="max-w-4xl mx-auto">
          {/* Embate 4: Header e Branding
              Vencedor: Logo Animado com Efeito Neon */}
          <motion.div 
            variants={itemVariants}
            className="text-center mb-12"
          >
            <Link href="/" className="inline-block group">
              <motion.h1 
                className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent hover:scale-105 transform transition-all duration-300"
                whileHover={{
                  textShadow: "0 0 8px rgba(34, 197, 94, 0.4)"
                }}
              >
                FLOW PIX
              </motion.h1>
            </Link>
            <motion.p 
              variants={itemVariants}
              className="mt-4 text-xl text-gray-600"
            >
              A maneira mais fácil de comprar tokens FLOW no Brasil
            </motion.p>
          </motion.div>

          {/* Embate 5: Container de Cadastro
              Vencedor: Card com Efeito de Profundidade e Borda Suave */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl border border-gray-100 backdrop-blur-sm relative overflow-hidden"
          >
            {/* Efeito de Gradiente Animado */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-green-600/5"
              animate={{
                opacity: [0.5, 0.3, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <div className="relative z-10">
              <motion.div 
                variants={itemVariants}
                className="mb-8 text-center"
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Crie sua conta na FlowPix
                </h2>
                <p className="text-gray-600 max-w-md mx-auto text-lg">
                  Comece a comprar e vender FLOW tokens de forma rápida e segura
                </p>
              </motion.div>

              {/* Embate 11: Integração Clerk Otimizada */}
              <SignUp
                appearance={clerkAppearance}
                redirectUrl="/obrigado"
                routing="path"
                path="/cadastro"
                signInUrl="/login"
                afterSignUpUrl="/obrigado"
              />

              {/* Embate 7: Termos e Condições
                  Vencedor: Links Interativos com Feedback */}
              <motion.div 
                variants={itemVariants}
                className="mt-8 text-center text-sm text-gray-500"
              >
                <p className="space-x-1">
                  <span>Ao se cadastrar, você concorda com nossos</span>
                  <Link 
                    href="/termos" 
                    className="text-green-500 hover:text-green-600 transition-colors duration-200 hover:underline"
                  >
                    Termos de Serviço
                  </Link>
                  <span>e</span>
                  <Link 
                    href="/privacidade" 
                    className="text-green-500 hover:text-green-600 transition-colors duration-200 hover:underline"
                  >
                    Política de Privacidade
                  </Link>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
} 