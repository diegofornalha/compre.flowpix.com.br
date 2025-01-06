import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import WalletConnect from "@/components/wallet-connect";

export default async function UserPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Sua Carteira Flow
        </h1>
        <WalletConnect />
      </div>
    </div>
  );
} 