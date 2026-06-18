import type { Metadata } from "next";

import HomePage from "@/pages/HomePage";

export const metadata: Metadata = {
  title: "Best Architects & Interior Designers in Jaipur | Maven Projects",
  description:
    "Elevate your space with Maven Projects, the leading architecture firm in Jaipur. Specializing in luxury home design and interiors in Jagatpura, Vaishali Nagar & more.",
};

export default function Page() {
  return <HomePage />;
}
