import { createClient } from "@/utlis/supabase/server";
import { redirect } from "next/navigation";

export default async function PostAuthLoading() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 1. If not logged in, send to login
  if (!user) {
    redirect("/login");
  }

  // 2. If it's your admin email, redirect to Admin Panel
  if (user.email === "adityabansal04031@gmail.com") {
    redirect("/admin");
  }

  // 3. Any other user goes to normal home dashboard
  redirect("/");
}