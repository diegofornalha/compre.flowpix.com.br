"use client";

import { motion } from "framer-motion";

interface StepProps {
  title: string;
  description: string;
  icon: string;
}

export function Step({ title, description, icon }: StepProps) {
  return (
    <motion.div 
      className="flex items-start gap-6"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="w-16 h-16 bg-[#1A1A1A] rounded-full flex items-center justify-center flex-shrink-0"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg 
          className="w-8 h-8" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#12cf83" 
          strokeWidth="2"
        >
          <path 
            d={icon} 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
      </motion.div>
      <div>
        <motion.h3 
          className="text-xl font-semibold mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {title}
        </motion.h3>
        <motion.p 
          className="text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
} 