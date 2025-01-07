"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

interface Profile {
  id: string;
  user_id: string;
  avatar_url: string;
  credits: number;
  tier: string;
  wallet_address: string;
  created_at: string;
  updated_at: string;
}

export default function UserProfilePage() {
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Partial<Profile>>({});
  const { isSignedIn, userId } = useAuth();
  const { user } = useUser();
  const supabase = createClient();

  useEffect(() => {
    async function fetchUserProfile() {
      if (isSignedIn && userId) {
        console.log('Buscando perfil para userId:', userId);
        
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', userId)
          .single();

        console.log('Resposta do Supabase:', { data, error });

        if (data && !error) {
          console.log('Perfil encontrado:', data);
          setUserProfile(data);
          setEditedProfile(data);
        } else {
          console.error('Erro ao buscar perfil:', error);
          
          // Se não encontrou o perfil, vamos criar um
          if (error?.code === 'PGRST116') {
            console.log('Perfil não encontrado, criando novo...');
            const { data: newProfile, error: createError } = await supabase
              .from('profiles')
              .insert([
                {
                  user_id: userId,
                  avatar_url: user?.imageUrl,
                  credits: 0,
                  tier: 'free'
                }
              ])
              .select()
              .single();

            console.log('Resultado da criação:', { newProfile, createError });

            if (newProfile && !createError) {
              setUserProfile(newProfile);
              setEditedProfile(newProfile);
            } else {
              console.error('Erro ao criar perfil:', createError);
            }
          }
        }
      }
    }

    fetchUserProfile();
  }, [isSignedIn, userId, user?.imageUrl]);

  const handleInputChange = (field: keyof Profile, value: string | number) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    if (!userProfile?.id) return;

    const { error } = await supabase
      .from('profiles')
      .update(editedProfile)
      .eq('user_id', userId);

    if (!error) {
      setUserProfile(prev => ({ ...prev, ...editedProfile } as Profile));
      setIsEditing(false);
    } else {
      console.error('Erro ao atualizar perfil:', error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (!isSignedIn) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Faça login para ver seu perfil</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-8 flex justify-between items-center">
            <h1 className="text-4xl font-bold text-gray-900">Seu Perfil</h1>
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200"
            >
              {isEditing ? "Salvar" : "Editar"}
            </button>
          </motion.div>

          {userProfile && (
            <motion.div variants={itemVariants}>
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Cabeçalho do Perfil */}
                <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-8">
                  <div className="text-center">
                    {userProfile.avatar_url ? (
                      <div className="w-24 h-24 mx-auto mb-4 relative">
                        <Image
                          src={userProfile.avatar_url}
                          alt="Avatar"
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                    <h2 className="text-2xl font-bold text-white">ID do Usuário: {userProfile.user_id}</h2>
                    <div className="mt-2 flex flex-col items-center gap-2">
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white">
                        <span className="text-sm">Tier: {userProfile.tier || "Free"}</span>
                      </div>
                      {user?.primaryEmailAddress && (
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white">
                          <span className="text-sm">{user.primaryEmailAddress.emailAddress}</span>
                        </div>
                      )}
                      {user?.externalAccounts && user.externalAccounts.length > 0 && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white">
                          <Image
                            src={user.externalAccounts[0].provider === "google" ? "/google-icon.svg" : "/default-provider.svg"}
                            alt={user.externalAccounts[0].provider}
                            width={16}
                            height={16}
                            className="rounded-full"
                          />
                          <span className="text-sm capitalize">{user.externalAccounts[0].provider}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Informações do Perfil */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">ID</h3>
                        <p className="mt-1 text-lg font-medium text-gray-900">{userProfile.id}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Créditos</h3>
                        <p className="mt-1 text-lg font-medium text-green-600">{userProfile.credits || 0}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Carteira</h3>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedProfile.wallet_address || ""}
                            onChange={(e) => handleInputChange("wallet_address", e.target.value)}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Digite o endereço da sua carteira"
                          />
                        ) : (
                          <p className="mt-1 text-lg font-medium text-gray-900 break-all">
                            {userProfile.wallet_address || "Não configurada"}
                          </p>
                        )}
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Membro desde</h3>
                        <p className="mt-1 text-lg font-medium text-gray-900">
                          {new Date(userProfile.created_at).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Última Atualização */}
                  <div className="mt-8 p-4 bg-gray-50 rounded-xl">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Última Atualização</h4>
                        <p className="mt-1 text-lg font-medium text-gray-900">
                          {new Date(userProfile.updated_at).toLocaleString('pt-BR')}
                        </p>
                      </div>
                      <div className="text-right">
                        <h4 className="text-sm font-medium text-gray-500">Status</h4>
                        <p className="mt-1 text-lg font-medium text-green-600">Ativo</p>
                      </div>
                    </div>
                  </div>

                  {/* Botões de Ação */}
                  {isEditing && (
                    <div className="mt-6 flex justify-end space-x-4">
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setEditedProfile(userProfile);
                        }}
                        className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200"
                      >
                        Salvar Alterações
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </main>
  );
} 