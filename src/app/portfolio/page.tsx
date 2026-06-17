"use client";

import { getPageData } from "@/lib/pageHelpers";
import PageHero from "@/components/pages/PageHero";
import HomeProjects from "@/components/sections/home/HomeProjects";
import HomeFeatureBanner from "@/components/sections/home/HomeFeatureBanner";
import SimpleCTA from "@/components/sections/SimpleCTA";

export default function PortfolioPage() {
  const { getSection, getSectionItems, t } = getPageData("portfolio");

  const heroSection = getSection("Portfolio Hero");
  const heroProps = heroSection?.props ?? {};

  const projectItems = getSectionItems("Portfolio Grid");
  const featuredProjects = projectItems.length > 0
    ? projectItems.map((item: any, i: number) => ({
        title: t(item.props?.title),
        category: t(item.props?.category) || item.props?.code || `Project ${i + 1}`,
        location: "Jaipur, India",
        image: item.props?.image || `/assets/Image/project-image${(i % 2) + 1}.png`,
        href: "/portfolio",
        year: "2024",
      }))
    : [
        { title: "Primary Residence House", category: "New build", location: "Jaipur, India", image: "/assets/Image/about-img.jpg", href: "/portfolio", year: "2024" },
        { title: "Field View Villa", category: "Private home", location: "Ahmedabad, India", image: "/assets/Image/about-image.jpg", href: "/portfolio", year: "2023" },
        { title: "Lightwell Gallery", category: "Cultural interiors", location: "Mumbai, India", image: "/assets/Image/project-image2.png", href: "/portfolio", year: "2024" },
      ];

  const ctaSection = getSection("Portfolio CTA");
  const ctaProps = ctaSection?.props ?? {};

  const featureBanner = {
    eyebrow: t(ctaProps.label) || "Before the build",
    title: t(ctaProps.heading)?.replace(/<[^>]*>/g, "") || "The best builds start before the build",
    image: "/assets/Image/project-image1.png",
    secondaryImage: "/assets/Image/project-image2.png",
    cta: { label: t(ctaProps.secondaryButton) || "Discover more", href: ctaProps.secondaryButtonLink || "/about" },
  };

  return (
    <main className="bg-white text-[#111111]">
      <PageHero
        eyebrow={t(heroProps.label) || "Our Portfolio"}
        title={t(heroProps.heading)?.replace(/<[^>]*>/g, "") || "Transforming ideas into beautiful, lived-in spaces across Jaipur."}
        description={t(heroProps.description) || "A curated look at our recent architecture and interior projects."}
        image="/assets/Image/project-image2.png"
      />
      <HomeProjects items={featuredProjects} />
      <HomeFeatureBanner content={featureBanner} />
      <SimpleCTA
        title={t(ctaProps.heading)?.replace(/<[^>]*>/g, "") || "Ready to Start Your Project?"}
        description={t(ctaProps.description) || "Seeing our work is just the beginning."}
        ctaLabel={t(ctaProps.primaryButton) || "Start Your Project Here"}
        ctaHref={ctaProps.primaryButtonLink || "/contact"}
      />
    </main>
  );
}
