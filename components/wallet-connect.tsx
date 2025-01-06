"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";

declare global {
  interface Window {
    fcl: any;
  }
}

export default function WalletConnect() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    // Carregar FCL
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@onflow/fcl@latest/dist/fcl.min.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.fcl.config({
        "app.detail.title": "FlowPix",
        "app.detail.icon": "https://flowpix.com.br/icon.png",
        "accessNode.api": "https://rest-mainnet.onflow.org",
        "discovery.wallet": "https://fcl-discovery.onflow.org/authn",
        "flow.network": "mainnet"
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    async function loadWalletAddress() {
      if (!user?.id) return;

      const { data } = await supabase
        .from("profiles")
        .select("wallet_address")
        .eq("user_id", user.id)
        .single();

      if (data?.wallet_address) {
        setWalletAddress(data.wallet_address);
      }
    }

    loadWalletAddress();
  }, [user?.id]);

  const connectWallet = async () => {
    if (!user?.id || !window.fcl) return;

    try {
      setIsConnecting(true);
      const account = await window.fcl.authenticate();
      const addr = account.addr;

      // Atualizar no Supabase
      const { error } = await supabase
        .from("profiles")
        .update({ wallet_address: addr })
        .eq("user_id", user.id);

      if (error) throw error;

      setWalletAddress(addr);
      toast.success("Carteira conectada com sucesso!");
    } catch (error) {
      console.error("Erro ao conectar carteira:", error);
      toast.error("Erro ao conectar carteira");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    if (!user?.id) return;

    try {
      await window.fcl.unauthenticate();
      
      const { error } = await supabase
        .from("profiles")
        .update({ wallet_address: null })
        .eq("user_id", user.id);

      if (error) throw error;

      setWalletAddress(null);
      toast.success("Carteira desconectada com sucesso!");
    } catch (error) {
      console.error("Erro ao desconectar carteira:", error);
      toast.error("Erro ao desconectar carteira");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-8 bg-white rounded-xl shadow-lg max-w-md mx-auto">
      <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      </div>

      <div className="text-center space-y-3">
        <h2 className="text-2xl font-bold text-gray-800">
          {walletAddress ? "Carteira Conectada" : "Conectar Carteira Flow"}
        </h2>
        {walletAddress && (
          <p className="text-sm text-gray-600 font-mono break-all">
            {walletAddress}
          </p>
        )}
      </div>

      {walletAddress ? (
        <Button
          onClick={disconnectWallet}
          className="w-full bg-red-500 hover:bg-red-600 text-white"
        >
          Desconectar Carteira
        </Button>
      ) : (
        <Button
          onClick={connectWallet}
          disabled={isConnecting}
          className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white"
        >
          {isConnecting ? "Conectando..." : "Conectar Carteira Flow"}
        </Button>
      )}

      <p className="text-sm text-gray-500 text-center">
        {walletAddress
          ? "Sua carteira Flow está conectada e pronta para uso."
          : "Conecte sua carteira Flow para começar a usar o FlowPix."}
      </p>
    </div>
  );
} 