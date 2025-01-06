"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";

type Profile = {
  id: string;
  user_id: string;
  avatar_url: string | null;
  wallet_address: string | null;
  credits: number;
  tier: "free" | "pro";
};

export default function ProfileForm() {
  const { user } = useUser();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Error loading profile:", error);
        return;
      }

      setProfile(data);
      setLoading(false);
    }

    loadProfile();
  }, [user?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id || !profile) return;

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          wallet_address: profile.wallet_address,
          avatar_url: profile.avatar_url,
        })
        .eq("user_id", user.id);

      if (error) throw error;
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Erro ao atualizar perfil");
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!profile) {
    return <div>Perfil não encontrado</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-6">
      <div className="space-y-2">
        <Label htmlFor="wallet">Endereço da Carteira Flow</Label>
        <Input
          id="wallet"
          value={profile.wallet_address || ""}
          onChange={(e) =>
            setProfile({ ...profile, wallet_address: e.target.value })
          }
          placeholder="0x..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="avatar">URL do Avatar</Label>
        <Input
          id="avatar"
          value={profile.avatar_url || ""}
          onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
          placeholder="https://..."
        />
      </div>

      <div className="space-y-2">
        <Label>Créditos</Label>
        <p className="text-2xl font-bold text-green-600">{profile.credits}</p>
      </div>

      <div className="space-y-2">
        <Label>Plano Atual</Label>
        <p className="text-lg font-semibold capitalize">
          {profile.tier === "pro" ? "PRO 🌟" : "Free"}
        </p>
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold"
      >
        Salvar Alterações
      </Button>
    </form>
  );
} 