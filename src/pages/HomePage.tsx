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
  return (
    <main className="overflow-x-hidden bg-white text-[#141414]">
      <HomeHero />
      <HomeStudioIntro />
      <HomeServices />
      <HomeProjects />
      <HomeProcess />
      <HomeFeatureBanner />
      <HomeFounderFeature />
      <HomeFaq />
      <HomeClosingCta />
    </main>
  );
}
