"use client";

import { getPageData } from "@/lib/pageHelpers";
import PageHero from "@/components/pages/PageHero";
import HomeProjects from "@/components/sections/home/HomeProjects";
import HomeFeatureBanner from "@/components/sections/home/HomeFeatureBanner";
import SimpleCTA from "@/components/sections/SimpleCTA";

export default function PortfolioPage() {
  const { getSection, t } = getPageData("portfolio");

  const heroSection = getSection("Portfolio Hero");
  const heroProps = heroSection?.props ?? {};

  const ctaSection = getSection("Portfolio CTA");
  const ctaProps = ctaSection?.props ?? {};

  return (
    <main className="bg-white text-[#111111]">
      <PageHero
        eyebrow={t(heroProps.label) || "Our Portfolio"}
        title={t(heroProps.heading)?.replace(/<[^>]*>/g, "") || "Transforming ideas into beautiful, lived-in spaces across Jaipur."}
        description={t(heroProps.description) || "A curated look at our recent architecture and interior projects."}
        image="/assets/Image/project-image2.png"
      />
      <HomeProjects />
      <HomeFeatureBanner />
      <SimpleCTA
        title={t(ctaProps.heading)?.replace(/<[^>]*>/g, "") || "Ready to Start Your Project?"}
        description={t(ctaProps.description) || "Seeing our work is just the beginning."}
        ctaLabel={t(ctaProps.primaryButton) || "Start Your Project Here"}
        ctaHref={ctaProps.primaryButtonLink || "/contact"}
      />
    </main>
  );
}
