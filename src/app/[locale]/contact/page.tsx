import type { Metadata } from "next";

import ContactPage from "@/components/pages/ContactPage";

export const metadata: Metadata = {
  title: "Contact Maven Projects | Best Architects in Jaipur",
  description:
    "Ready to start your project? Contact Maven Projects in Jaipur today for expert architecture and interior design consultations. Call us at +91 8209117064.",
};

export default function Page() {
  return <ContactPage />;
}
