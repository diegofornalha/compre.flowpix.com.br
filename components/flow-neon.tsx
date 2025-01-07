"use client";

import { useEffect, useState } from "react";

interface FlowNeonProps {
  onLoadComplete?: () => void;
}

export default function FlowNeon({ onLoadComplete }: FlowNeonProps) {
  const [neonState, setNeonState] = useState<'blinking' | 'off' | 'static'>('blinking');
  const color = "#12cf83";

  useEffect(() => {
    // Timer para parar o efeito de piscar
    setTimeout(() => {
      setNeonState('off');
    }, 2400); // 3 piscadas de 0.8s = 2.4s

    // Timer para ligar o neon constante
    setTimeout(() => {
      setNeonState('static');
    }, 5400); // 2.4s (piscadas) + 3s (sem neon) = 5.4s

    // Timer para notificar que a animação terminou
    setTimeout(() => {
      onLoadComplete?.();
    }, 6000); // 5.4s (efeitos) + 0.6s (mostrar neon estático) = 6s
  }, [onLoadComplete]);

  return (
    <div className="w-full max-w-xl mx-auto relative">
      <style jsx>{`
        @keyframes neonBorder {
          0%, 100% {
            box-shadow: 0 0 20px ${color},
                       0 0 40px ${color},
                       0 0 60px ${color},
                       0 0 80px ${color};
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
          box-shadow: 0 0 20px ${color},
                     0 0 40px ${color},
                     0 0 60px ${color},
                     0 0 80px ${color};
          transition: box-shadow 0.3s ease;
        }
        .neon-glow {
          position: absolute;
          inset: -40px;
          background: radial-gradient(
            circle at center,
            ${color}30 0%,
            ${color}10 40%,
            transparent 70%
          );
          z-index: -1;
          filter: blur(20px);
        }
        .neon-container {
          position: relative;
          background: white;
          border-radius: 1rem;
          overflow: hidden;
        }
        .neon-container::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: ${color};
          z-index: -1;
          opacity: 0.1;
          border-radius: inherit;
        }
      `}</style>
      
      <div className="relative">
        <div className="neon-glow" />
        <div className={`neon-container shadow-lg ${
          neonState === 'blinking' ? 'neon-border' : 
          neonState === 'static' ? 'neon-static' : ''
        }`}>
          <div className="h-[600px] flex flex-col items-center justify-center bg-white/95">
            <div className="text-center space-y-2">
              <h2 className="text-4xl md:text-5xl font-bold tracking-wider" style={{ color }}>
                O NOVO PIX
              </h2>
              <h2 className="text-4xl md:text-5xl font-bold tracking-wider" style={{ color }}>
                é o Token FLOW
              </h2>
            </div>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 mt-8" style={{ borderColor: color }}></div>
          </div>
        </div>
      </div>
    </div>
  );
} 