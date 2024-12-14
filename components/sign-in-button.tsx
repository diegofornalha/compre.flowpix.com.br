"use client";

import { SignInButton } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function CustomSignInButton() {
  return (
    <SignInButton mode="modal">
      <motion.button
        className="bg-[#1E1E1E]/90 hover:bg-[#1E1E1E] text-white px-6 py-3 rounded-xl font-medium transition-all w-full text-center text-lg shadow-lg"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Entrar
      </motion.button>
    </SignInButton>
  );
} 