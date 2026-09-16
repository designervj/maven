import { redirect } from "next/navigation";

export default function AdminLayout() {
  redirect(
    process.env.KALP_ADMIN_URL ||
      process.env.NEXT_PUBLIC_KALP_ADMIN_URL ||
      "http://localhost:5177"
  );
}
