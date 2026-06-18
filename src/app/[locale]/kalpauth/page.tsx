import type { Metadata } from "next";
import LoginPage from "@/views/login/page";

export const metadata: Metadata = {
  title: "Login | Maven Projects",
  description: "Sign in to your Maven Projects account.",
};

export default function KalpAuthPage() {
  return <LoginPage />;
}
