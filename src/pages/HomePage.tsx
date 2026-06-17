"use client";

import { getPageData } from "@/lib/pageHelpers";
import HomeClosingCta from "@/components/sections/home/HomeClosingCta";
import HomeFaq from "@/components/sections/home/HomeFaq";
import HomeFeatureBanner from "@/components/sections/home/HomeFeatureBanner";
import HomeFounderFeature from "@/components/sections/home/HomeFounderFeature";
import HomeHero from "@/components/sections/home/HomeHero";
import HomeProcess from "@/components/sections/home/HomeProcess";
import HomeProjects from "@/components/sections/home/HomeProjects";
import HomeServices from "@/components/sections/home/HomeServices";
import HomeStudioIntro from "@/components/sections/home/HomeStudioIntro";

export default function HomePage() {
  const { getSection, getSectionItems, t } = getPageData("home");

  // ─── Hero ──────────────────────────────────────────────────────────────────────
  const heroSection = getSection("Hero");
  const heroProps = heroSection?.props ?? {};
  const heroContent = {
    eyebrow: t(heroProps.label) || "Recent Work / Jaipur",
    title: t(heroProps.heading)?.replace(/<[^>]*>/g, "") || "CREATING HOMES THAT FEEL NATURAL AND SPACIOUS",
    image: heroProps.image || "/assets/Image/about-us-img.jpeg",
    primaryCta: {
      label: t(heroProps.primaryButton) || "Explore portfolio",
      href: heroProps.primaryButtonLink || "/portfolio",
    },
    secondaryCta: {
      label: t(heroProps.secondaryButton) || "Start a conversation",
      href: heroProps.secondaryButtonLink || "/contact",
    },
    supportingCaption: t(heroProps.description) || "Creating homes that feel natural, spacious, and fully yours.",
    metaLabel: "Maven Projects | Architecture and Interior Design in Jaipur",
  };

  // ─── Studio Intro ─────────────────────────────────────────────────────────────
  const coreSection = getSection("Core");
  const coreProps = coreSection?.props ?? {};
  const studioIntro = {
    eyebrow: t(coreProps.label) || "Your Partner in Design",
    title: t(coreProps.heading)?.replace(/<[^>]*>/g, "") ||
      "Maven Projects is a premier architecture and interior design studio based in Jaipur.",
    description: "",
    supportingCopy: "",
    cta: { label: "Learn more about us", href: "/about" },
  };

  // ─── Services ─────────────────────────────────────────────────────────────────
  const serviceItems = getSectionItems("Services");
  const services = serviceItems.length > 0
    ? serviceItems.map((item: any, i: number) => ({
        index: String(i + 1).padStart(2, "0"),
        title: t(item.props?.name),
        description: t(item.props?.desc),
        icon: (["house", "sofa", "ruler"][i] || "house") as "house" | "sofa" | "ruler",
        linkLabel: t(item.props?.name),
      }))
    : [
        { index: "01", title: "Architecture", description: "We design safe, beautiful, and sustainable homes.", icon: "house" as const, linkLabel: "Architecture" },
        { index: "02", title: "Interior Design", description: "Bespoke interiors that blend style with functionality.", icon: "sofa" as const, linkLabel: "Interior design" },
        { index: "03", title: "Renovation", description: "Breathing new life into old spaces with modern aesthetics.", icon: "ruler" as const, linkLabel: "Renovation" },
      ];

  // ─── Featured Projects ─────────────────────────────────────────────────────────
  const industryItems = getSectionItems("Industries");
  const featuredProjects = industryItems.length > 0
    ? industryItems.slice(0, 3).map((item: any, i: number) => ({
        title: t(item.props?.title),
        category: item.props?.tag || `Project ${i + 1}`,
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

  // ─── Process ──────────────────────────────────────────────────────────────────
  const processSection = getSection("Results");
  const processItems = getSectionItems("Results");
  const processProps = processSection?.props ?? {};
  const processIntro = {
    eyebrow: t(processProps.label) || "Our Process",
    title: t(processProps.heading)?.replace(/<[^>]*>/g, "") || "We guide you from the first conversation through to move-in.",
    description: t(processProps.description) || "Every decision is led by detail and transparency.",
  };
  const processSteps = processItems.length > 0
    ? processItems.map((item: any) => ({
        step: item.props?.target || item.id,
        title: t(item.props?.title),
        description: t(item.props?.sub),
      }))
    : [
        { step: "01", title: "Letter of Collaboration", description: "We establish scope, intent, and working rhythm early." },
        { step: "02", title: "Evaluate & Design", description: "Concept development, material study, planning, and technical refinement." },
        { step: "03", title: "Partner & Build", description: "With consultants, vendors, and site teams aligned, we stay involved." },
      ];

  // ─── Feature Banner ───────────────────────────────────────────────────────────
  const bannerSection = getSection("AI Workflow");
  const bannerProps = bannerSection?.props ?? {};
  const featureBanner = {
    eyebrow: t(bannerProps.label) || "Before the build",
    title: t(bannerProps.heading)?.replace(/<[^>]*>/g, "") || "The best builds start before the build",
    image: "/assets/Image/project-image1.png",
    secondaryImage: "/assets/Image/project-image2.png",
    cta: { label: "Discover more", href: "/about" },
  };

  // ─── Founder Feature ──────────────────────────────────────────────────────────
  const founderSection = getSection("Founder Feature");
  const founderProps = founderSection?.props ?? {};
  const founderFeature = founderSection ? {
    eyebrow: t(founderProps.eyebrow) || "Our Philosophy",
    title: t(founderProps.title)?.replace(/<[^>]*>/g, "") || "Designing with discipline, warmth, and long-term clarity.",
    quote: t(founderProps.quote) || "Every successful project balances concept and control.",
    description: t(founderProps.description) || "Our studio pairs strong architectural thinking with calm execution support.",
    image: founderProps.image || "/assets/Image/team-img.jpg",
    secondaryImage: founderProps.secondaryImage || "/assets/Image/project-image2.png",
    role: t(founderProps.role) || "Architecture / Interiors / Execution",
    name: t(founderProps.name) || "Maven Projects",
    cta: { label: t(founderProps.cta) || "Meet the studio", href: founderProps.ctaLink || "/about" },
  } : {
    eyebrow: "Our Philosophy",
    title: "Designing with discipline, warmth, and long-term clarity.",
    quote: "Every successful project balances concept and control. We believe a home should be as functional as it is beautiful.",
    description: "Our studio pairs strong architectural thinking with calm execution support.",
    image: "/assets/Image/team-img.jpg",
    secondaryImage: "/assets/Image/project-image2.png",
    role: "Architecture / Interiors / Execution",
    name: "Maven Projects",
    cta: { label: "Meet the studio", href: "/about" },
  };

  // ─── FAQ ──────────────────────────────────────────────────────────────────────
  const faqData = getSectionItems("FAQ");
  const faqItems = faqData.length > 0
    ? faqData.map((item: any) => ({
        question: t(item.props?.question),
        answer: t(item.props?.answer),
      }))
    : [
        { question: "How do I find a reliable architect or interior designer in Jaipur?", answer: "The best approach is to find a studio that aligns with your style and values." },
        { question: "Can Maven Projects manage my entire construction project?", answer: "Yes, we provide end-to-end project management from design to on-site execution." },
      ];

  // ─── Closing CTA ──────────────────────────────────────────────────────────────
  const ctaSection = getSection("Client Logos");
  const ctaProps = ctaSection?.props ?? {};
  const homeFooterCta = {
    eyebrow: t(ctaProps.label) || "Let's Talk About Your Project",
    title: "Let's create a home that feels composed, generous, and fully yours.",
    image: "/assets/Image/about-image.jpg",
    cta: { label: "Book a consultation", href: "/contact" },
  };

  return (
    <main className="overflow-x-hidden bg-white text-[#141414]">
      <HomeHero content={heroContent} />
      <HomeStudioIntro content={studioIntro} />
      <HomeServices items={services} />
      <HomeProjects items={featuredProjects} />
      <HomeProcess intro={processIntro} steps={processSteps} />
      <HomeFeatureBanner content={featureBanner} />
      <HomeFounderFeature content={founderFeature} />
      <HomeFaq items={faqItems} />
      <HomeClosingCta content={homeFooterCta} />
    </main>
  );
}
