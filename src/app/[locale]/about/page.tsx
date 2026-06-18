"use client";

import { getPageData } from "@/lib/pageHelpers";
import PageHero from "@/components/pages/PageHero";
import HomeStudioIntro from "@/components/sections/home/HomeStudioIntro";
import HomeFounderFeature from "@/components/sections/home/HomeFounderFeature";
import HomeServices from "@/components/sections/home/HomeServices";
import HomeProcess from "@/components/sections/home/HomeProcess";
import HomeMetricsAwards from "@/components/sections/home/HomeMetricsAwards";
import HomeClosingCta from "@/components/sections/home/HomeClosingCta";

export default function AboutPage() {
  const { getSection, getSectionItems, t } = getPageData("about");

  // 1. Hero
  const heroSection = getSection("About Hero");
  const heroProps = heroSection?.props ?? {};

  // 6. Metrics & Awards
  const metricsSection = getSection("Metrics");
  const metricsItems = getSectionItems("Metrics");
  const statsData = metricsItems.map((item: any) => ({
    label: t(item.props?.label),
    value: t(item.props?.value),
  }));
  // Mock awards (we can add these to JSON later if needed)
  const awardsData = [
    { year: "2023", title: "Best Residential Project", source: "AIA Rajasthan" },
    { year: "2022", title: "Sustainable Design Award", source: "Design Digest" },
  ];

  return (
    <main className="bg-white text-[#111111]">
      <PageHero
        eyebrow={t(heroProps.label) || "About Us"}
        title={t(heroProps.heading)?.replace(/<[^>]*>/g, "") || "Modern design built on trust, clarity, and the way you live."}
        description={t(heroProps.description) || "Maven Projects works across residences, renovations, and contemporary interiors."}
        image={heroProps.image || "/assets/Image/about-us-img.jpeg"}
      />
      
      <HomeStudioIntro />
      
      <HomeServices />
      
      <HomeFounderFeature />
      
      <HomeProcess />
      
      {statsData.length > 0 && <HomeMetricsAwards stats={statsData} awards={awardsData} />}
      
      <HomeClosingCta />
    </main>
  );
}
