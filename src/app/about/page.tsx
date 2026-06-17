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
  const { getSection, getSectionItems, getSectionProp, t } = getPageData("about");

  // 1. Hero
  const heroSection = getSection("About Hero");
  const heroProps = heroSection?.props ?? {};

  // 2. Studio Intro
  const introSection = getSection("Studio Intro");
  const introProps = introSection?.props ?? {};
  const studioIntroData = introSection ? {
    eyebrow: t(introProps.eyebrow) || "The Studio",
    title: t(introProps.title)?.replace(/<[^>]*>/g, "") || "We are a tight-knit team...",
    description: "",
    supportingCopy: "",
    cta: { label: t(introProps.cta) || "Our Services", href: introProps.ctaLink || "/services" }
  } : null;

  // 3. Why Us / Philosophy
  const whySection = getSection("Why Us");
  const whyProps = whySection?.props ?? {};
  const whyItems = getSectionItems("Why Us");
  const founderFeature = whySection ? {
    eyebrow: t(whyProps.label) || "Our Philosophy",
    title: t(whyProps.heading)?.replace(/<[^>]*>/g, "") || "Designing with discipline, warmth, and long-term clarity.",
    quote: t(whyProps.description) || "Every successful project balances concept and control.",
    description: whyItems.map((i: any) => `${t(i.props?.key)}: ${t(i.props?.value)}`).join(" · "),
    image: whyProps.image || "/assets/Image/team-img.jpg",
    secondaryImage: whyProps.secondaryImage || "/assets/Image/project-image2.png",
    role: whyProps.role || "Architecture / Interiors / Execution",
    name: whyProps.name || "Maven Projects",
    cta: { label: t(whyProps.cta) || "Meet the studio", href: whyProps.ctaLink || "/contact" },
  } : null;

  // 4. Our Expertise (Services)
  const expertiseSection = getSection("Our Expertise");
  const expertiseItems = getSectionItems("Our Expertise");
  const servicesData = expertiseItems.map((item: any) => ({
    index: item.props?.index || "01",
    title: t(item.props?.title),
    description: t(item.props?.description),
    icon: item.props?.icon || "house",
    linkLabel: "Read more",
  }));

  // 5. Our Process
  const processSection = getSection("Our Process");
  const processProps = processSection?.props ?? {};
  const processItems = getSectionItems("Our Process");
  const processData = processSection ? {
    intro: {
      eyebrow: t(processProps.eyebrow) || "Methodology",
      title: t(processProps.title)?.replace(/<[^>]*>/g, "") || "A structured approach to architecture.",
      description: t(processProps.description) || "From the first sketch to the final handover...",
    },
    steps: processItems.map((item: any) => ({
      step: t(item.props?.step),
      title: t(item.props?.title),
      description: t(item.props?.description),
    }))
  } : null;

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

  // 7. CTA
  const ctaSection = getSection("Results");
  const ctaProps = ctaSection?.props ?? {};
  const homeFooterCta = {
    eyebrow: t(ctaProps.label) || "Let's Talk About Your Project",
    title: t(ctaProps.heading)?.replace(/<[^>]*>/g, "") || "Let's create a home that feels composed, generous, and fully yours.",
    image: ctaProps.image || "/assets/Image/about-image.jpg",
    cta: { label: t(ctaProps.primaryButton) || "Book a consultation", href: ctaProps.primaryButtonLink || "/contact" },
  };

  return (
    <main className="bg-white text-[#111111]">
      <PageHero
        eyebrow={t(heroProps.label) || "About Us"}
        title={t(heroProps.heading)?.replace(/<[^>]*>/g, "") || "Modern design built on trust, clarity, and the way you live."}
        description={t(heroProps.description) || "Maven Projects works across residences, renovations, and contemporary interiors."}
        image={heroProps.image || "/assets/Image/about-us-img.jpeg"}
      />
      
      {studioIntroData && <HomeStudioIntro content={studioIntroData} />}
      
      {servicesData.length > 0 && <HomeServices items={servicesData} />}
      
      {founderFeature && <HomeFounderFeature content={founderFeature} />}
      
      {processData && <HomeProcess intro={processData.intro} steps={processData.steps} />}
      
      {statsData.length > 0 && <HomeMetricsAwards stats={statsData} awards={awardsData} />}
      
      <HomeClosingCta content={homeFooterCta} />
    </main>
  );
}
