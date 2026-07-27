"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utlis/supabase/client";

export default function PostAuthLoading() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function handleRedirect() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      // Check if it's your admin email
      if (user.email === "adityabansal04031@gmail.com") {
        router.push("/admin");
      } else {
        router.push("/");
      }
      
      router.refresh();
    }

    handleRedirect();
  }, [router, supabase]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
      <div className="w-8 h-8 border-4 border-orange-950 border-t-transparent rounded-full animate-spin" />
      <p className="text-gray-600 font-medium text-sm">Signing you in...</p>
    </div>
  );
}