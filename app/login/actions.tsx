"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { setAdminCookie, clearAdminCookie } from "@/lib/simple-auth";

export async function login(formData: FormData) {
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;

  const adminEmail1 = process.env.ADMIN_EMAIL_1;
  const adminPass1 = process.env.ADMIN_PASS_1;
  const adminEmail2 = process.env.ADMIN_EMAIL_2;
  const adminPass2 = process.env.ADMIN_PASS_2;

  const normalized = email?.toLowerCase() ?? "";
  const isFirstAdmin =
    normalized === (adminEmail1?.trim().toLowerCase() ?? "") && password === adminPass1;
  const isSecondAdmin =
    normalized === (adminEmail2?.trim().toLowerCase() ?? "") && password === adminPass2;

  if (!isFirstAdmin && !isSecondAdmin) {
    redirect("/error");
  }

  await setAdminCookie();
  revalidatePath("/", "layout");
  redirect("/admin");
}

export async function signup(_formData: FormData) {
  redirect("/error");
}

export async function logout() {
  await clearAdminCookie();
  revalidatePath("/", "layout");
  redirect("/");
}
