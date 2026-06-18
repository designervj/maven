"use client";

import { getPageData } from "@/lib/pageHelpers";
import PageHero from "@/components/pages/PageHero";
import HomeProcess from "@/components/sections/home/HomeProcess";
import HomeClosingCta from "@/components/sections/home/HomeClosingCta";

export default function ProcessPage() {
  const { getSection, t } = getPageData("process");

  const heroSection = getSection("Process Hero");
  const heroProps = heroSection?.props ?? {};

  const ctaSection = getSection("Process CTA");
  const ctaProps = ctaSection?.props ?? {};

  return (
    <main className="bg-white text-[#111111]">
      <PageHero
        eyebrow={t(heroProps.label) || "Our Process"}
        title={t(heroProps.heading)?.replace(/<[^>]*>/g, "") || "A clear studio workflow that turns your vision into a buildable reality."}
        description={t(heroProps.description) || "We guide you from the first conversation through to move-in."}
        image="/assets/Image/project-image1.png"
      />
      <HomeProcess />
      <HomeClosingCta />
    </main>
  );
}
