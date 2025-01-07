"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const networks = [
  {
    id: "flow",
    name: "Flow",
    description: "A rede Flow é conhecida por sua escalabilidade e facilidade de uso, ideal para NFTs e jogos.",
    benefits: [
      "Taxas baixas",
      "Transações rápidas",
      "Ideal para NFTs",
      "Ecossistema em crescimento"
    ],
    color: "from-green-500 to-green-600",
    textColor: "text-green-600",
    borderColor: "border-green-100",
    shadowColor: "shadow-green-100",
    icon: "/flow-icon.svg"
  },
  {
    id: "eth",
    name: "Ethereum",
    description: "Ethereum é a principal rede para DeFi e smart contracts, com o maior ecossistema.",
    benefits: [
      "Maior ecossistema DeFi",
      "Alta segurança",
      "Ampla adoção",
      "Constante inovação"
    ],
    color: "from-blue-500 to-blue-600",
    textColor: "text-blue-600",
    borderColor: "border-blue-100",
    shadowColor: "shadow-blue-100",
    icon: "/eth-icon.svg"
  },
  {
    id: "polygon",
    name: "Polygon",
    description: "Polygon oferece escalabilidade e baixo custo para transações na rede Ethereum.",
    benefits: [
      "Taxas muito baixas",
      "Alta velocidade",
      "Compatível com Ethereum",
      "Grande ecossistema"
    ],
    color: "from-purple-500 to-purple-600",
    textColor: "text-purple-600",
    borderColor: "border-purple-100",
    shadowColor: "shadow-purple-100",
    icon: "/polygon-icon.svg"
  },
  {
    id: "btc",
    name: "Bitcoin",
    description: "Bitcoin é a primeira e mais conhecida criptomoeda, ideal para reserva de valor.",
    benefits: [
      "Alta segurança",
      "Ampla aceitação",
      "Reserva de valor",
      "Liquidez global"
    ],
    color: "from-orange-500 to-orange-600",
    textColor: "text-orange-600",
    borderColor: "border-orange-100",
    shadowColor: "shadow-orange-100",
    icon: "/btc-icon.svg"
  }
];

export default function FlowPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Escolha sua rede
          </h1>
          <p className="text-xl text-gray-600">
            Selecione a rede blockchain para comprar seus tokens
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {networks.map((network, index) => (
            <motion.div
              key={network.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/${network.id}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border ${network.borderColor} relative overflow-hidden group`}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${network.color}`} />

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${network.color} p-3 flex items-center justify-center`}>
                        <Image
                          src={network.icon}
                          alt={`${network.name} icon`}
                          width={40}
                          height={40}
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          {network.name}
                        </h2>
                        <p className={`${network.textColor} font-medium`}>
                          Comprar {network.name}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6">
                      {network.description}
                    </p>

                    <div className="space-y-3">
                      {network.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <svg
                            className={`w-5 h-5 ${network.textColor}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-gray-600">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <motion.div
                      className={`mt-8 py-4 px-6 rounded-xl bg-gradient-to-r ${network.color} text-white font-semibold text-center relative overflow-hidden group`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.span
                        className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                        initial={false}
                      />
                      <span className="relative z-10">
                        Comprar {network.name}
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
} 