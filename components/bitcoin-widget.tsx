"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function BitcoinWidget() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const transakConfig = {
      apiKey: process.env.NEXT_PUBLIC_TRANSAK_API_KEY,
      environment: process.env.NEXT_PUBLIC_ENVIRONMENT,
      defaultCryptoCurrency: 'BTC',
      walletAddress: '', // será preenchido quando integrado com carteira
      themeColor: '#F7931A', // Cor do Bitcoin
      fiatCurrency: 'BRL',
      email: '', // será preenchido com o email do usuário
      redirectURL: '',
      hostURL: window.location.origin,
      widgetHeight: "650px",
      widgetWidth: "100%",
    };

    const queryString = new URLSearchParams(transakConfig as any).toString();
    const widgetUrl = `https://global.transak.com?${queryString}`;

    if (iframeRef.current) {
      iframeRef.current.src = widgetUrl;
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-6 bg-gradient-to-r from-orange-500 to-orange-600">
        <h2 className="text-2xl font-bold text-white mb-2">Comprar Bitcoin</h2>
        <p className="text-orange-50">
          Compre BTC diretamente com PIX, cartão ou transferência
        </p>
      </div>
      <iframe
        ref={iframeRef}
        className="w-full h-[650px] border-0"
        title="Transak On-Ramp Widget (Bitcoin)"
        allow="camera;microphone;payment"
      />
    </motion.div>
  );
} 