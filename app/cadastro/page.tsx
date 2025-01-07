"use client";

import { SignUp } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CadastroPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent mb-4">
              Crie sua conta na FlowPix
            </h1>
            <p className="text-gray-600 text-lg">
              Comece a comprar e vender FLOW tokens de forma rápida e segura
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            <div className="relative z-10">
              <div className="flex flex-col items-center justify-center space-y-6">
                <SignUp
                  appearance={{
                    elements: {
                      formButtonPrimary:
                        "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg w-full",
                      footerActionLink:
                        "text-green-600 hover:text-green-700 font-semibold",
                      formFieldInput:
                        "w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200",
                      dividerLine: "bg-gray-200",
                      dividerText: "text-gray-400 mx-4",
                      formFieldLabel: "text-gray-600 font-medium",
                      identityPreviewText: "text-gray-600",
                      identityPreviewEditButton:
                        "text-green-600 hover:text-green-700",
                      headerTitle: "text-2xl font-bold text-gray-900",
                      headerSubtitle: "text-gray-600",
                      socialButtonsBlockButton:
                        "flex items-center justify-center w-full px-6 py-3 mb-4 text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow space-x-2",
                      socialButtonsBlockButtonText: "font-semibold",
                    },
                  }}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-8"
          >
            <Link
              href="/flow"
              className="inline-block bg-white text-green-600 font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 shadow-md hover:shadow-lg relative overflow-hidden group"
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-green-100 to-green-50"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative z-10">Comprar em Outras Redes</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
} 