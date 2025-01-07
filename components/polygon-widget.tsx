"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

declare global {
  interface Window {
    transak: any;
  }
}

export default function PolygonWidget() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://global.transak.com/sdk/v1.1/widget.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      let transak = new window.transak("STAGING");
      let settings = {
        apiKey: process.env.NEXT_PUBLIC_TRANSAK_API_KEY,
        environment: "STAGING",
        defaultCryptoCurrency: "MATIC",
        themeColor: "8B5CF6",
        hostURL: window.location.origin,
        widgetHeight: "700px",
        widgetWidth: "500px",
        defaultNetwork: "polygon",
        cryptoCurrencyList: "MATIC",
        walletAddress: "",
        disableWalletAddressForm: true,
        email: "",
        redirectURL: "",
      };

      transak.init(settings);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8 relative overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
      <div className="relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6"
        >
          Comprar Polygon
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-gray-600 mb-8"
        >
          Compre MATIC de forma rápida e segura usando vários métodos de pagamento.
        </motion.p>
        <div id="transakWidget" className="w-full min-h-[700px]" />
      </div>
    </motion.div>
  );
} 