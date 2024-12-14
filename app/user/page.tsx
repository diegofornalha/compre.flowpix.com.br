"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function UserRedirect() {
  const [countdown, setCountdown] = useState(2);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = "https://accounts.flowpix.com.br/user";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#1E1E1E] to-[#12cf83]">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"
      />
      <motion.div 
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="mt-4 text-white text-xl font-medium">
          Redirecionando...
        </p>
        <p className="mt-2 text-white/80">
          Em {countdown} segundos
        </p>
      </motion.div>
    </div>
  );
} 