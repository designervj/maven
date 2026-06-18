"use client";

import { getPageData } from "@/lib/pageHelpers";
import PageHero from "@/components/pages/PageHero";
import HomeStudioIntro from "@/components/sections/home/HomeStudioIntro";
import HomeServices from "@/components/sections/home/HomeServices";
import HomeProcess from "@/components/sections/home/HomeProcess";
import HomeFeatureBanner from "@/components/sections/home/HomeFeatureBanner";
import HomeLogoStrip from "@/components/sections/home/HomeLogoStrip";
import HomeProjects from "@/components/sections/home/HomeProjects";
import HomeFaq from "@/components/sections/home/HomeFaq";
import SimpleCTA from "@/components/sections/SimpleCTA";

export default function ServicesPage() {
  const { getSection, getSectionItems, t } = getPageData("services");

  // 1. Hero
  const heroSection = getSection("Services Hero");
  const heroProps = heroSection?.props ?? {};

  // 6. Partners Logo Strip
  const partnersSection = getSection("Our Partners");
  const partnerItems = getSectionItems("Our Partners");
  const partnersData = partnerItems.map((item: any) => ({
    name: item.props?.name,
    src: item.props?.src,
  }));

  // 9. CTA
  const ctaSection = getSection("Command Center");
  const ctaProps = ctaSection?.props ?? {};

  return (
    <main className="bg-white text-[#111111]">
      <PageHero
        eyebrow={t(heroProps.label) || "Our Services"}
        title={t(heroProps.heading)?.replace(/<[^>]*>/g, "") || "Comprehensive solutions for your ideal living space."}
        description={t(heroProps.description) || "From the first sketch to the final brick, integrated architectural and interior services."}
        image={heroProps.image || "/assets/Image/about-image.jpg"}
      />
      
      <HomeStudioIntro />
      
      <HomeServices />
      
      <HomeFeatureBanner />
      
      <HomeProcess />
      
      {partnersData.length > 0 && <HomeLogoStrip items={partnersData} />}
      
      <HomeProjects />
      
      <HomeFaq />
      
      <SimpleCTA
        title={t(ctaProps.heading)?.replace(/<[^>]*>/g, "") || "Let's Talk About Your New Project"}
        description={t(ctaProps.description) || "Every great home starts with a simple conversation."}
        ctaLabel={t(ctaProps.primaryButton) || "Book Your Free Consultation"}
        ctaHref={ctaProps.primaryButtonLink || "/contact"}
      />
    </main>
  );
}
