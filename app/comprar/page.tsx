"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";

const networks = [
  {
    id: "flow",
    name: "Flow",
    description: "O novo PIX é o Token FLOW",
    color: "#12cf83",
    icon: "/flow-icon.svg",
    href: "/",
  },
  {
    id: "btc",
    name: "Bitcoin",
    description: "A primeira e mais popular criptomoeda",
    color: "#F26522",
    icon: "/btc-icon.svg",
    href: "/btc",
  },
  {
    id: "eth",
    name: "Ethereum",
    description: "A rede mais popular para smart contracts",
    color: "#627EEA",
    icon: "/eth-icon.svg",
    href: "/eth",
  },
  {
    id: "polygon",
    name: "Polygon",
    description: "Soluções de escalabilidade para Ethereum",
    color: "#8247E5",
    icon: "/polygon-icon.svg",
    href: "/polygon",
  },
];

export default function ComprarPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Escolha sua rede
          </h1>
          <p className="text-lg text-gray-600">
            Selecione a rede na qual você deseja comprar tokens
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {networks.map((network) => (
            <Link key={network.id} href={network.href} className="block group">
              <Card className="p-6 h-full transition-all duration-300 hover:shadow-xl border-2 hover:border-[#12cf83] group-hover:scale-[1.02]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 relative">
                      <Image
                        src={network.icon}
                        alt={`${network.name} icon`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: network.color }}
                    />
                  </div>

                  <h2 className="text-2xl font-bold mb-2" style={{ color: network.color }}>
                    {network.name}
                  </h2>
                  <p className="text-gray-600 flex-grow">
                    {network.description}
                  </p>

                  <div className="mt-6">
                    <button
                      className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors"
                      style={{ 
                        backgroundColor: network.color,
                      }}
                    >
                      Comprar {network.name}
                    </button>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
} 