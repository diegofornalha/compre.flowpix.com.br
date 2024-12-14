"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface Token {
  name: string;
  price: string;
  change: string;
  positive: boolean;
  logo?: string;
}

const tokens: Token[] = [
  {
    name: "FLOW",
    price: "$0.85",
    change: "+5.2%",
    positive: true,
    logo: "/flow-logo.png"
  },
  {
    name: "$BR",
    price: "$0.012",
    change: "+2.8%",
    positive: true,
    logo: "/br-logo.png"
  },
  {
    name: "USDT",
    price: "$1.00",
    change: "+0.1%",
    positive: true,
    logo: "/usdt-logo.png"
  }
];

export function TokenGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {tokens.map((token, index) => (
        <motion.div
          key={token.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="overflow-hidden border-none bg-[#1A1A1A]">
            <CardHeader className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {token.logo ? (
                    <img 
                      src={token.logo} 
                      alt={`${token.name} logo`} 
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-[#12cf83] rounded-full" />
                  )}
                  <CardTitle className="text-white">
                    {token.name}
                  </CardTitle>
                </div>
                <span className="text-2xl font-bold text-white">
                  {token.price}
                </span>
              </div>
              <CardDescription className="flex justify-between items-center">
                <span>24h</span>
                <span className={token.positive ? "text-[#12cf83]" : "text-red-500"}>
                  {token.change}
                </span>
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      ))}
    </div>
  );
} 