"use client";

import { useEffect, useState } from "react";

interface TransakWidgetProps {
  cryptoCurrency?: string;
}

export default function TransakWidget({ cryptoCurrency = "FLOW" }: TransakWidgetProps) {
  const [iframeUrl, setIframeUrl] = useState<string>("");
  const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === "production";
  const isEth = cryptoCurrency === "ETH";

  useEffect(() => {
    if (typeof window === "undefined") return;

    const baseUrl = isProduction ? "https://global.transak.com" : "https://global-stg.transak.com";
    const params = new URLSearchParams({
      apiKey: process.env.NEXT_PUBLIC_TRANSAK_API_KEY || "",
      environment: isProduction ? "PRODUCTION" : "STAGING",
      network: getNetwork(cryptoCurrency),
      fiatCurrency: "BRL",
      defaultFiatAmount: "200",
      themeColor: getThemeColor(cryptoCurrency),
      walletAddress: cryptoCurrency === "FLOW" ? "0xcee767cac4c076fb" : "",
      redirectURL: `${window.location.origin}/obrigado`,
      hostURL: window.location.origin,
      exchangeType: "BUY",
      countryCode: "BR",
      paymentMethod: "credit_debit_card,pix,sepa_bank_transfer",
      disableFiatSelector: "true",
      fiatSupportedCountries: "BR",
      defaultCurrency: "BRL",
      language: "pt",
      exchangeScreenTitle: isEth ? "Comprar na rede Ethereum" : `Comprar ${cryptoCurrency}`,
      hideMenu: "false",
      disableCryptoSelector: isEth ? "false" : "true",
      isFeeCalculationHidden: "false",
      isAutoFillUserData: "true",
      colorMode: "LIGHT",
      buttonTextColor: "FFFFFF",
      buttonBgColor: getThemeColor(cryptoCurrency),
      widgetHeight: "600px",
      widgetWidth: "100%",
    });

    // Adicionar cryptoCurrencyCode apenas se não for ETH
    if (!isEth) {
      params.append("cryptoCurrencyCode", cryptoCurrency);
    }

    setIframeUrl(`${baseUrl}/?${params.toString()}`);
  }, [isProduction, cryptoCurrency, isEth]);

  // Função auxiliar para determinar a rede correta
  function getNetwork(currency: string): string {
    switch (currency) {
      case "FLOW":
        return "flow";
      case "ETH":
        return "ethereum";  // Conforme documentação, ETH usa "ethereum" e não "mainnet"
      case "BTC":
        return "mainnet";
      case "MATIC":
        return "polygon";
      default:
        return "mainnet";
    }
  }

  // Função auxiliar para determinar a cor do tema
  function getThemeColor(currency: string): string {
    switch (currency) {
      case "FLOW":
        return "12cf83";
      case "ETH":
        return "627EEA";
      case "BTC":
        return "F26522";
      case "MATIC":
        return "8247E5";
      default:
        return "12cf83";
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <iframe
        src={iframeUrl}
        allow="camera;microphone;fullscreen;payment"
        className="w-full h-[600px] border-none rounded-xl"
      />
    </div>
  );
} 