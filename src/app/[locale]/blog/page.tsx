"use client";

import { getPageData } from "@/lib/pageHelpers";
import PageHero from "@/components/pages/PageHero";
import HomeJournal from "@/components/sections/home/HomeJournal";
import SimpleCTA from "@/components/sections/SimpleCTA";

export default function BlogPage() {
  const { getSection, getSectionItems, t } = getPageData("blog");

  const heroSection = getSection("Blog Hero");
  const heroProps = heroSection?.props ?? {};

  const blogItems = getSectionItems("Blog Featured");
  const journalEntries = blogItems.length > 0
    ? blogItems.map((item: any, i: number) => ({
        title: t(item.props?.title),
        excerpt: t(item.props?.excerpt),
        image: item.props?.image || `/assets/Image/project-image${(i % 2) + 1}.png`,
        href: `/blog/${item.props?.slug || item.id}`,
        meta: t(item.props?.tag) || "Article",
      }))
    : [
        { title: "How a modern facade stays warm and welcoming", excerpt: "A closer look at proportion, materials, and threshold design.", image: "/assets/Image/about-image.jpg", href: "/about", meta: "Media" },
        { title: "Designing joinery that feels architectural", excerpt: "Interior details can reinforce the larger spatial idea.", image: "/assets/Image/project-image1.png", href: "/portfolio", meta: "Press release" },
        { title: "Recent hospitality concept highlighted by editors", excerpt: "A published project story focused on circulation and atmosphere.", image: "/assets/Image/project-image2.png", href: "/testimonials", meta: "News" },
      ];

  const newsletterSection = getSection("Newsletter");
  const newsletterProps = newsletterSection?.props ?? {};

  return (
    <main className="bg-white text-[#111111]">
      <PageHero
        eyebrow={t(heroProps.label) || "Blog"}
        title={t(heroProps.heading)?.replace(/<[^>]*>/g, "") || "Stories from the studio and beyond."}
        description={t(heroProps.description) || "Insights on architecture, interior design, and our project journeys."}
        image="/assets/Image/project-image1.png"
      />
      <HomeJournal items={journalEntries} />
      <SimpleCTA
        title={t(newsletterProps.heading)?.replace(/<[^>]*>/g, "") || "Stay updated with our latest stories"}
        description={t(newsletterProps.description) || "Subscribe to receive new articles and studio updates."}
        ctaLabel={t(newsletterProps.submitText) || "Subscribe Now"}
        ctaHref="/contact"
      />
    </main>
  );
}
