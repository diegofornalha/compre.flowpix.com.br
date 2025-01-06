import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ProfileForm from "@/components/profile-form";

export default async function ProfilePage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Seu Perfil</h1>
      <ProfileForm />
    </div>
  );
} 