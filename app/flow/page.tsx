"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

const networks = [
  {
    id: "flow",
    name: "Flow Network",
    icon: "/flow-icon.svg",
    description: "Rede nativa do Flow, ideal para NFTs e jogos",
    benefits: ["Baixas taxas", "Alta velocidade", "Suporte a NFTs"],
    color: "from-green-400 to-green-600"
  },
  {
    id: "btc",
    name: "Bitcoin",
    icon: "/btc-icon.svg",
    description: "A primeira e mais segura criptomoeda",
    benefits: ["Alta segurança", "Maior adoção", "Reserva de valor"],
    color: "from-orange-400 to-orange-600"
  },
  {
    id: "ethereum",
    name: "Ethereum",
    icon: "/eth-icon.svg",
    description: "A rede mais popular para DeFi e tokens",
    benefits: ["Maior liquidez", "Mais dApps", "Segurança comprovada"],
    color: "from-blue-400 to-blue-600"
  },
  {
    id: "polygon",
    name: "Polygon",
    icon: "/polygon-icon.svg",
    description: "Solução de escala do Ethereum com baixas taxas",
    benefits: ["Taxas mínimas", "Compatível com ETH", "Rápido"],
    color: "from-purple-400 to-purple-600"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

export default function FlowPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white py-12">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="container mx-auto px-4"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent mb-4">
              Escolha sua Rede
            </h1>
            <p className="text-xl text-gray-600">
              Compre tokens em diferentes redes blockchain
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {networks.map((network) => (
              <motion.div
                key={network.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
              >
                <div className={`bg-gradient-to-r ${network.color} p-6 text-white`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white rounded-xl p-2">
                      <img
                        src={network.icon}
                        alt={network.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="text-2xl font-bold">{network.name}</h3>
                  </div>
                  <p className="text-white/90">{network.description}</p>
                </div>

                <div className="p-6">
                  <ul className="space-y-2 mb-6">
                    {network.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-600">
                        <svg
                          className="w-5 h-5 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  <Link href={`/comprar/${network.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3 px-4 bg-gradient-to-r ${network.color} text-white rounded-xl font-semibold hover:shadow-lg transition-shadow`}
                    >
                      Comprar em {network.name}
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
} 