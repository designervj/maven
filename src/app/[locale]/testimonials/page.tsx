"use client";

import { getPageData } from "@/lib/pageHelpers";
import PageHero from "@/components/pages/PageHero";
import HomeTestimonial from "@/components/sections/home/HomeTestimonial";
import SimpleCTA from "@/components/sections/SimpleCTA";
import { testimonial } from "@/lib/homepage-data";

export default function TestimonialsPage() {
  const { getSection, getSectionItems, t } = getPageData("testimonials");

  const heroSection = getSection("Testimonials Hero");
  const heroProps = heroSection?.props ?? {};

  const testimonialItems = getSectionItems("Testimonials Grid");
  const firstItem = testimonialItems[0];
  const featuredTestimonial = firstItem
    ? {
        quote: t(firstItem.props?.quote),
        name: t(firstItem.props?.author),
        role: t(firstItem.props?.role),
        image: firstItem.props?.avatar || "/assets/Image/testimonials-img.png",
      }
    : testimonial;

  const ctaSection = getSection("Testimonials CTA");
  const ctaProps = ctaSection?.props ?? {};

  return (
    <main className="bg-white text-[#111111]">
      <PageHero
        eyebrow={t(heroProps.label) || "Client Stories"}
        title={t(heroProps.heading)?.replace(/<[^>]*>/g, "") || "What our clients say about us."}
        description={t(heroProps.description) || "Real stories from clients who trusted us with their most important spaces."}
        image="/assets/Image/about-us-img.jpeg"
      />
      <HomeTestimonial content={featuredTestimonial} />

      {testimonialItems.length > 0 && (
        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-[1500px] px-5 md:px-8 lg:px-10">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonialItems.map((item: any) => (
                <article
                  key={item.id}
                  className="border border-[#dfdfdf] p-8 flex flex-col gap-6"
                >
                  <div className="flex gap-1">
                    {Array.from({ length: item.props?.rating || 5 }).map((_: any, i: number) => (
                      <span key={i} className="text-[#c9a84c] text-sm">★</span>
                    ))}
                  </div>
                  <p className="font-editorial text-sm leading-7 text-[#444444] flex-1">
                    "{t(item.props?.quote)}"
                  </p>
                  <div className="border-t border-[#efefef] pt-5">
                    <p className="font-medium text-[#141414] text-sm">{t(item.props?.author)}</p>
                    <p className="font-editorial text-xs text-[#888888] mt-1">{t(item.props?.role)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <SimpleCTA
        title={t(ctaProps.heading)?.replace(/<[^>]*>/g, "") || "Ready to become our next success story?"}
        description={t(ctaProps.description) || "Let's build something extraordinary together."}
        ctaLabel={t(ctaProps.primaryButton) || "Start a Project"}
        ctaHref={ctaProps.primaryButtonLink || "/contact"}
      />
    </main>
  );
}
