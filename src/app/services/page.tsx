"use client";

import { getPageData } from "@/lib/pageHelpers";
import PageHero from "@/components/pages/PageHero";
import HomeStudioIntro from "@/components/sections/home/HomeStudioIntro";
import HomeDesignLeadership from "@/components/sections/home/HomeDesignLeadership";
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

  // 2. Studio Intro (Capabilities)
  const introSection = getSection("Studio Intro");
  const introProps = introSection?.props ?? {};
  const studioIntroData = introSection ? {
    eyebrow: t(introProps.eyebrow) || "Our Capabilities",
    title: t(introProps.title)?.replace(/<[^>]*>/g, "") || "We offer a fully integrated approach...",
    description: "",
    supportingCopy: "",
    cta: { label: t(introProps.cta) || "View Projects", href: introProps.ctaLink || "/portfolio" }
  } : null;

  // 3. Design Leadership
  const leadershipSection = getSection("Design Leadership");
  const leadershipProps = leadershipSection?.props ?? {};
  const leadershipItems = getSectionItems("Design Leadership");
  const leadershipData = leadershipSection ? {
    title: t(leadershipProps.title)?.replace(/<[^>]*>/g, "") || "Honoring creativity, quality, and design leadership",
    image: leadershipProps.image || "/assets/Image/project-image2.png",
    points: leadershipItems.map((item: any) => ({
      text: t(item.props?.text),
    })),
  } : null;

  // 4. Services grid
  const serviceItems = getSectionItems("Services");
  const services = serviceItems.length > 0
    ? serviceItems.map((item: any, i: number) => ({
        index: String(i + 1).padStart(2, "0"),
        title: t(item.props?.name),
        description: t(item.props?.desc),
        icon: (["house", "sofa", "ruler", "house", "sofa", "ruler"][i] || "house") as "house" | "sofa" | "ruler",
        linkLabel: t(item.props?.name),
      }))
    : [
        { index: "01", title: "Architecture", description: "We design safe, beautiful homes that stand the test of time.", icon: "house" as const, linkLabel: "Architecture" },
        { index: "02", title: "Interior Design", description: "Bespoke interiors that blend style with functionality.", icon: "sofa" as const, linkLabel: "Interior design" },
        { index: "03", title: "Renovation", description: "Breathing new life into old spaces with modern aesthetics.", icon: "ruler" as const, linkLabel: "Renovation" },
      ];

  // 5. Feature Banner (Turnkey Solutions)
  const featureSection = getSection("Turnkey Solutions");
  const featureProps = featureSection?.props ?? {};
  const featureData = featureSection ? {
    eyebrow: t(featureProps.eyebrow) || "Turnkey Delivery",
    title: t(featureProps.title)?.replace(/<[^>]*>/g, "") || "End-to-End Design & Build without the friction.",
    image: featureProps.image || "/assets/Image/project-image3.jpg",
    secondaryImage: featureProps.secondaryImage || "/assets/Image/project-image2.png",
    cta: { label: t(featureProps.cta) || "Learn More", href: featureProps.ctaLink || "/contact" }
  } : null;

  // 6. Process steps
  const processSection = getSection("Process");
  const processProps = processSection?.props ?? {};
  const processStepItems = getSectionItems("Process");
  const processIntro = {
    eyebrow: t(processProps.label) || "Our Process",
    title: t(processProps.heading)?.replace(/<[^>]*>/g, "") || "We guide you from the first conversation through to move-in.",
    description: t(processProps.description) || "Every decision is led by detail and transparency.",
  };
  const processSteps = processStepItems.length > 0
    ? processStepItems.map((item: any) => ({
        step: item.props?.step || item.id,
        title: t(item.props?.title),
        description: t(item.props?.desc),
      }))
    : [
        { step: "01", title: "Discovery & Planning", description: "Deep-dive into your goals and project scope." },
        { step: "02", title: "Design & Architecture", description: "Wireframes, system design, and tech stack selection." },
      ];

  // 7. Partners Logo Strip
  const partnersSection = getSection("Our Partners");
  const partnerItems = getSectionItems("Our Partners");
  const partnersData = partnerItems.map((item: any) => ({
    name: item.props?.name,
    src: item.props?.src,
  }));

  // 8. Projects
  const projectsSection = getSection("Projects");
  const projectItems = getSectionItems("Projects");
  const projectsData = projectItems.map((item: any) => ({
    title: t(item.props?.title),
    category: t(item.props?.category),
    location: t(item.props?.location),
    year: item.props?.year,
    image: item.props?.image || "/assets/Image/project-image1.png",
    href: item.props?.href || "/portfolio",
  }));

  // 9. FAQ
  const faqSection = getSection("FAQ");
  const faqItems = getSectionItems("FAQ");
  const faqData = faqItems.map((item: any) => ({
    question: t(item.props?.question),
    answer: t(item.props?.answer),
  }));

  // 10. CTA
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
      
      {studioIntroData && <HomeStudioIntro content={studioIntroData} />}
      
      {leadershipData && <HomeDesignLeadership title={leadershipData.title} points={leadershipData.points} image={leadershipData.image} />}
      
      <HomeServices items={services} />
      
      {featureData && <HomeFeatureBanner content={featureData} />}
      
      <HomeProcess intro={processIntro} steps={processSteps} />
      
      {partnersData.length > 0 && <HomeLogoStrip items={partnersData} />}
      
      {projectsData.length > 0 && <HomeProjects items={projectsData} />}
      
      {faqData.length > 0 && <HomeFaq items={faqData} />}
      
      <SimpleCTA
        title={t(ctaProps.heading)?.replace(/<[^>]*>/g, "") || "Let's Talk About Your New Project"}
        description={t(ctaProps.description) || "Every great home starts with a simple conversation."}
        ctaLabel={t(ctaProps.primaryButton) || "Book Your Free Consultation"}
        ctaHref={ctaProps.primaryButtonLink || "/contact"}
      />
    </main>
  );
}
