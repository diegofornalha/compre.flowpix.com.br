"use client";

import TransakWidget from "@/components/transak-widget";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Coluna da esquerda - Como funciona */}
          <div className="order-2 lg:order-1 space-y-8">
            <section>
              <h2 className="text-4xl lg:text-5xl font-bold text-green-500 mb-6">Como funciona</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">ESCOLHA O MÉTODO DE PAGAMENTO</h3>
                    <p className="text-gray-600">Selecione: google pay, apple pay e cartões.</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">ESCOLHA A QUANTIDADE DE TOKENS FLOW</h3>
                    <p className="text-gray-600">Selecione a quantia desejada.</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">FAÇA O LOGIN PARA RECEBER TOKENS $BR</h3>
                    <p className="text-gray-600">Quanto mais tokens você comprar, mais tokens $BR vai receber.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Seção de Compartilhamento */}
            <section className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 shadow-lg">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Compartilhe seu link e ganhe FLOW</h2>
                <Link href="/cadastro" target="_blank" rel="noopener noreferrer">
                  <button className="bg-white text-green-600 font-semibold py-3 px-6 rounded-lg text-lg hover:bg-gray-50 transition-colors w-full max-w-sm shadow-md">
                    Faça seu cadastro
                  </button>
                </Link>
              </div>
            </section>
          </div>

          {/* Coluna da direita - Widget */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-8">
            <TransakWidget />
          </div>
        </div>
      </div>
    </main>
  );
} 