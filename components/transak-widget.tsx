"use client";

import { useEffect, useRef, useState } from "react";

export default function TransakWidget() {
  const [iframeUrl, setIframeUrl] = useState<string>("");
  const [neonState, setNeonState] = useState<'blinking' | 'off' | 'static'>('blinking');
  const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === "production";

  useEffect(() => {
    if (typeof window === "undefined") return;

    const baseUrl = isProduction ? "https://global.transak.com" : "https://global-stg.transak.com";
    const params = new URLSearchParams({
      apiKey: process.env.NEXT_PUBLIC_TRANSAK_API_KEY || "",
      environment: isProduction ? "PRODUCTION" : "STAGING",
      network: "flow",
      cryptoCurrencyCode: "FLOW",
      fiatCurrency: "BRL",
      defaultFiatAmount: "200",
      themeColor: "12cf83",
      walletAddress: "0xcee767cac4c076fb",
      redirectURL: `${window.location.origin}/obrigado`,
      hostURL: window.location.origin,
      exchangeType: "BUY",
      countryCode: "BR",
      paymentMethod: "credit_debit_card",
      disableFiatSelector: "true",
      fiatSupportedCountries: "BR",
      defaultCurrency: "BRL",
      language: "pt",
      exchangeScreenTitle: "Comprar FLOW",
      hideMenu: "false",
      disableCryptoSelector: "true",
      isFeeCalculationHidden: "false",
      isAutoFillUserData: "true",
      colorMode: "LIGHT",
      buttonTextColor: "FFFFFF",
      buttonBgColor: "12cf83",
      widgetHeight: "600px",
      widgetWidth: "100%",
    });

    // Timer para parar o efeito de piscar
    setTimeout(() => {
      setNeonState('off');
    }, 2400); // 3 piscadas de 0.8s = 2.4s

    // Timer para ligar o neon constante
    setTimeout(() => {
      setNeonState('static');
    }, 5400); // 2.4s (piscadas) + 3s (sem neon) = 5.4s

    // Timer para carregar o widget
    setTimeout(() => {
      setIframeUrl(`${baseUrl}/?${params.toString()}`);
    }, 6000); // 5.4s (efeitos) + 0.6s (mostrar neon estático) = 6s
  }, [isProduction]);

  return (
    <div className="w-full max-w-xl mx-auto relative">
      <style jsx>{`
        @keyframes neonBorder {
          0%, 100% {
            box-shadow: 0 0 20px #12cf83,
                       0 0 40px #12cf83,
                       0 0 60px #12cf83;
          }
          50% {
            box-shadow: none;
          }
        }
        .neon-border {
          animation: neonBorder 0.8s 3;
          animation-timing-function: ease-in-out;
        }
        .neon-static {
          box-shadow: 0 0 20px #12cf83,
                     0 0 40px #12cf83,
                     0 0 60px #12cf83;
          transition: box-shadow 0.3s ease;
        }
      `}</style>
      
      <div className={`bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 ${
        neonState === 'blinking' ? 'neon-border' : 
        neonState === 'static' ? 'neon-static' : ''
      }`}>
        {!iframeUrl ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm z-10">
            <div className="text-center space-y-2">
              <h2 className="text-4xl md:text-5xl font-bold text-[#12cf83] tracking-wider">
                O NOVO PIX
              </h2>
              <h2 className="text-4xl md:text-5xl font-bold text-[#12cf83] tracking-wider">
                é o Token FLOW
              </h2>
            </div>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mt-8"></div>
          </div>
        ) : null}
        
        <div className={!iframeUrl ? "opacity-0" : "opacity-100 transition-opacity duration-500"}>
          <iframe
            src={iframeUrl}
            allow="camera;microphone;fullscreen;payment"
            className="w-full h-[600px] border-none"
          />
        </div>
      </div>
    </div>
  );
} 