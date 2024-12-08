"use client";

import { useUser } from "@clerk/nextjs";
import { Card } from "./ui/card";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Wallet, LogOut } from "lucide-react";

interface Profile {
  id: string;
  user_id: string;
  avatar_url: string;
  wallet_address: string | null;
  created_at: string;
  updated_at: string;
}

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function UserProfile() {
  const { user, isLoaded } = useUser();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Carregar perfil inicial e sincronizar com Clerk
  useEffect(() => {
    if (user) {
      syncProfile();
    }
  }, [user]);

  const syncProfile = async () => {
    try {
      const response = await fetch('/api/user', {
        method: 'POST'
      });
      const data = await response.json();
      
      if (data.success && data.profile) {
        console.log('Profile synced with Clerk:', data.profile);
        setProfile(data.profile);
      }
    } catch (error) {
      console.error('Error syncing profile:', error);
    }
  };

  // Monitorar mudanças no Metamask
  useEffect(() => {
    if (window.ethereum && user) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', () => window.location.reload());
      window.ethereum.on('disconnect', handleDisconnect);

      // Verificar conexão atual
      checkCurrentConnection();

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', () => {});
        window.ethereum.removeListener('disconnect', handleDisconnect);
      };
    }
  }, [user]);

  const checkCurrentConnection = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          await updateProfile(accounts[0]);
        } else {
          await updateProfile();
        }
      } else {
        await updateProfile();
      }
    } catch (error) {
      console.error('Erro ao verificar conexão:', error);
      await updateProfile();
    }
  };

  const handleAccountsChanged = async (accounts: string[]) => {
    if (accounts.length > 0) {
      await updateProfile(accounts[0]);
    } else {
      await handleDisconnect();
    }
  };

  const handleDisconnect = async () => {
    try {
      await updateProfile(null);
      console.log('Carteira desconectada com sucesso');
    } catch (error) {
      console.error('Erro ao desconectar carteira:', error);
    }
  };

  const updateProfile = async (walletAddress?: string | null) => {
    if (!user) return;

    try {
      console.log('Atualizando perfil com endereço:', walletAddress);
      const response = await fetch('/api/create-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          avatar_url: user.imageUrl,
          wallet_address: walletAddress || null,
        }),
      });

      const data = await response.json();
      console.log('Resposta da atualização:', data);

      if (data.success) {
        setProfile(data.profile);
        if (!walletAddress) {
          console.log('Endereço da carteira removido do perfil');
        } else {
          console.log('Perfil atualizado com novo endereço:', walletAddress);
        }
      } else {
        throw new Error(data.error || 'Falha ao atualizar perfil');
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Por favor, instale o MetaMask!');
      return;
    }

    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length > 0) {
        console.log('Conectando carteira:', accounts[0]);
        await updateProfile(accounts[0]);
      }
    } catch (error) {
      console.error('Erro ao conectar carteira:', error);
      alert('Erro ao conectar carteira. Tente novamente.');
    } finally {
      setIsConnecting(false);
    }
  };

  if (!isLoaded) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return <div>Não está logado</div>;
  }

  return (
    <Card className="p-4">
      <div className="flex items-center space-x-4">
        {user.imageUrl && (
          <img 
            src={user.imageUrl} 
            alt="Foto do perfil" 
            className="w-16 h-16 rounded-full"
          />
        )}
        <div className="flex-grow">
          <h2 className="text-xl font-bold">{user.fullName}</h2>
          <p className="text-gray-600">{user.primaryEmailAddress?.emailAddress}</p>
          <p className="text-sm text-gray-500">Clerk ID: {user.id}</p>
          {profile && (
            <>
              <p className="text-sm text-gray-500">Supabase ID: {profile.id}</p>
              {profile.wallet_address ? (
                <div className="flex items-center mt-2">
                  <p className="text-sm text-gray-500 flex items-center">
                    <Wallet className="w-4 h-4 mr-2" />
                    Carteira: {profile.wallet_address.slice(0, 6)}...{profile.wallet_address.slice(-4)}
                  </p>
                  <Button
                    onClick={handleDisconnect}
                    variant="ghost"
                    size="sm"
                    className="ml-2"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="mt-2 flex items-center"
                  variant="outline"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  {isConnecting ? 'Conectando...' : 'Conectar Metamask'}
                </Button>
              )}
              <p className="text-sm text-gray-500 mt-2">
                Última atualização: {new Date(profile.updated_at).toLocaleDateString('pt-BR')}
              </p>
            </>
          )}
          <p className="text-sm text-gray-500">
            Criado em: {user.createdAt ? new Date(user.createdAt).toLocaleDateString('pt-BR') : 'Data não disponível'}
          </p>
        </div>
      </div>
    </Card>
  );
} 