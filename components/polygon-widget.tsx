"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export default function PolygonWidget() {
  useEffect(() => {
    // Inicializa o widget do Transak
    const transakScript = document.createElement("script");
    transakScript.src = "https://global.transak.com/sdk/v1.1/widget.js";
    transakScript.async = true;
    document.body.appendChild(transakScript);

    // Configura e inicializa o widget
    transakScript.onload = () => {
      let transak = new (window as any).TransakSDK.default({
        apiKey: process.env.NEXT_PUBLIC_TRANSAK_API_KEY,
        environment: "PRODUCTION",
        defaultCryptoCurrency: "MATIC",
        network: "polygon",
        cryptoCurrencyList: "MATIC",
        defaultNetwork: "polygon",
        walletAddress: "",
        themeColor: "9333ea", // Cor roxa do Polygon
        fiatCurrency: "BRL",
        email: "",
        redirectURL: "",
        hostURL: window.location.origin,
        widgetHeight: "650px",
        widgetWidth: "100%",
      });

      transak.init();

      // Manipuladores de eventos
      transak.on(transak.EVENTS.TRANSAK_WIDGET_CLOSE, () => {
        transak.close();
      });

      transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData: any) => {
        console.log(orderData);
        transak.close();
        
        // Redireciona para a página de agradecimento com os parâmetros
        window.location.href = `/obrigado?status=success&orderId=${orderData.id}`;
      });
    };

    // Limpeza
    return () => {
      document.body.removeChild(transakScript);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
    >
      <div id="transak-onramp-widget-container" />
    </motion.div>
  );
} 