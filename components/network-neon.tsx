"use client";

import { useEffect, useState } from "react";

interface NetworkNeonProps {
  color: string;
  title: string;
  subtitle?: string;
  onLoadComplete?: () => void;
}

export default function NetworkNeon({ color, title, subtitle, onLoadComplete }: NetworkNeonProps) {
  const [neonState, setNeonState] = useState<'blinking' | 'off' | 'static'>('blinking');
  const [showContent, setShowContent] = useState(true);

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
      setShowContent(false);
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
          opacity: ${neonState === 'static' ? '1' : '0.7'};
          transition: opacity 0.3s ease;
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
          opacity: ${neonState === 'static' ? '0.15' : '0.1'};
          border-radius: inherit;
          transition: opacity 0.3s ease;
        }
      `}</style>
      
      <div className="relative">
        <div className="neon-glow" />
        <div className={`neon-container shadow-lg ${
          neonState === 'blinking' ? 'neon-border' : 
          neonState === 'static' ? 'neon-static' : ''
        }`}>
          {showContent ? (
            <div className="h-[600px] flex flex-col items-center justify-center bg-white/95">
              <div className="text-center space-y-2">
                <h2 className="text-4xl md:text-5xl font-bold tracking-wider" style={{ color }}>
                  {title}
                </h2>
                {subtitle && (
                  <h2 className="text-4xl md:text-5xl font-bold tracking-wider" style={{ color }}>
                    {subtitle}
                  </h2>
                )}
              </div>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 mt-8" style={{ borderColor: color }}></div>
            </div>
          ) : (
            <div className="h-[600px]" />
          )}
        </div>
      </div>
    </div>
  );
} 