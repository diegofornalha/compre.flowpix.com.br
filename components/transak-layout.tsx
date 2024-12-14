"use client";

import { motion } from "framer-motion";
import Header from "@/components/headers";
import TransakWidget from "@/components/transak-widget";

export default function TransakLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <motion.header 
        className="bg-gradient-to-r from-[#1E1E1E] to-[#12cf83]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="pt-6 pb-4 flex items-center justify-between"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-white font-bold text-2xl tracking-wider">
              FLOW PIX
            </h1>
            <Header />
          </motion.div>
        </div>
      </motion.header>
      <main className="flex-grow">
        {children}
      </main>
      <TransakWidget />
    </div>
  );
} 