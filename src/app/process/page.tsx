"use client";

import { getPageData } from "@/lib/pageHelpers";
import PageHero from "@/components/pages/PageHero";
import HomeProcess from "@/components/sections/home/HomeProcess";
import HomeClosingCta from "@/components/sections/home/HomeClosingCta";

export default function ProcessPage() {
  const { getSection, getSectionItems, t } = getPageData("process");

  const heroSection = getSection("Process Hero");
  const heroProps = heroSection?.props ?? {};

  const phaseSection = getSection("Process Phases");
  const phaseProps = phaseSection?.props ?? {};
  const phaseItems = getSectionItems("Process Phases");

  const processIntro = {
    eyebrow: t(phaseProps.label) || "Our Process",
    title: t(phaseProps.heading)?.replace(/<[^>]*>/g, "") || "A clear studio workflow that turns your vision into a buildable reality.",
    description: t(phaseProps.description) || "Every decision is led by detail and transparency.",
  };
  const processSteps = phaseItems.length > 0
    ? phaseItems.map((item: any) => ({
        step: item.props?.step || item.id,
        title: t(item.props?.title),
        description: t(item.props?.desc),
      }))
    : [
        { step: "01", title: "Discovery & Strategy", description: "We deeply understand your business, users, and technical requirements." },
        { step: "02", title: "Design & Architecture", description: "System architecture, UI/UX design, and tech stack selection." },
        { step: "03", title: "Development", description: "Sprint-based delivery with weekly demos and CI/CD pipelines." },
        { step: "04", title: "QA & Launch", description: "Rigorous testing, performance tuning, and production deployment." },
      ];

  const ctaSection = getSection("Process CTA");
  const ctaProps = ctaSection?.props ?? {};
  const homeFooterCta = {
    eyebrow: t(ctaProps.label) || "Let's Talk About Your Project",
    title: t(ctaProps.heading)?.replace(/<[^>]*>/g, "") || "Let's kick off your first sprint.",
    image: "/assets/Image/about-image.jpg",
    cta: {
      label: t(ctaProps.primaryButton) || "Book a consultation",
      href: ctaProps.primaryButtonLink || "/contact",
    },
  };

  return (
    <main className="bg-white text-[#111111]">
      <PageHero
        eyebrow={t(heroProps.label) || "Our Process"}
        title={t(heroProps.heading)?.replace(/<[^>]*>/g, "") || "A clear studio workflow that turns your vision into a buildable reality."}
        description={t(heroProps.description) || "We guide you from the first conversation through to move-in."}
        image="/assets/Image/project-image1.png"
      />
      <HomeProcess intro={processIntro} steps={processSteps} />
      <HomeClosingCta content={homeFooterCta} />
    </main>
  );
}
