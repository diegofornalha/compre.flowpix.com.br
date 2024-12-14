"use client";

import { useEffect, useRef } from 'react';
import { useUser } from "@clerk/nextjs";

export default function TransakWidget() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { isSignedIn, user } = useUser();

  const params = Object.fromEntries(
    Object.entries({
      apiKey: process.env.NEXT_PUBLIC_TRANSAK_API_KEY || '',
      environment: process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'STAGING',
      network: 'flow',
      cryptoCurrencyCode: 'FLOW',
      fiatCurrency: 'BRL',
      defaultFiatAmount: '200',
      defaultPaymentMethod: 'credit_debit_card',
      themeColor: '12cf83',
      partnerCustomerId: user?.id || `customer_${Date.now()}`,
      partnerOrderId: `order_${Date.now()}`,
      walletAddress: user?.publicMetadata?.walletAddress || '0xcee767cac4c076fb',
      redirectURL: `${window.location.origin}/obrigado`,
      hostURL: window.location.origin,
      exchangeType: 'BUY',
    }).map(([key, value]) => [key, String(value)])
  );

  const transakUrl = `https://global${process.env.NODE_ENV === 'production' ? '' : '-stg'}.transak.com/?${new URLSearchParams(params)}`;

  return (
    <div className="hidden lg:block">
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-br from-[#1E1E1E]/20 via-[#12cf83]/20 to-[#1E1E1E]/20 rounded-2xl blur-2xl" />
        
        <div className="absolute -inset-3 bg-gradient-to-br from-[#1E1E1E]/30 via-[#12cf83]/30 to-[#1E1E1E]/30 rounded-xl blur-xl" />
        
        <div className="absolute -inset-[2px] bg-gradient-to-br from-[#1E1E1E] via-[#12cf83] to-[#1E1E1E] rounded-xl opacity-90" />
        
        <div className="relative w-full max-w-[450px] h-[700px] bg-white rounded-xl overflow-hidden shadow-2xl">
          <iframe
            ref={iframeRef}
            id="transakIframe"
            src={transakUrl}
            allow="camera;microphone;payment"
            className="w-full h-full border-none"
          />
        </div>
      </div>
    </div>
  );
} 