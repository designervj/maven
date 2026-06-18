"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

import { homeFooterCta, siteContact } from "@/lib/homepage-data";
import { getPageData } from "@/lib/pageHelpers";

// ─── Animation variants ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const slideLeft = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0 },
};

const slideRight = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0 },
};

// ─── Office info mapped from JSON dynamically ───

export default function ContactPage() {
  const { getSection, getSectionItems, t } = getPageData("contact");

  const heroSection = getSection("Contact Hero");
  const heroProps = heroSection?.props ?? {};
  const contactItems = getSectionItems("Contact Hero");

  const contactHeading =
    t(heroProps.heading)?.replace(/<[^>]*>/g, "") ||
    "Get in touch with Maven Projects.";
  const contactDescription =
    t(heroProps.description) ||
    "Share your project brief, timeline, location, and the kind of space you want to create.";

  const emailItem = contactItems.find((i: any) =>
    t(i.props?.label)?.toLowerCase().includes("email")
  );
  const phoneItem = contactItems.find((i: any) =>
    t(i.props?.label)?.toLowerCase().includes("phone")
  );
  const addressItem = contactItems.find((i: any) =>
    t(i.props?.label)?.toLowerCase().includes("address")
  );

  const phoneLabel = t(phoneItem?.props?.value) || siteContact.phoneLabel;
  const phoneHref = phoneItem
    ? `tel:${t(phoneItem.props?.value)}`
    : siteContact.phoneHref;
  const emailLabel = t(emailItem?.props?.value) || siteContact.emailLabel;
  const emailHref = emailItem
    ? `mailto:${t(emailItem.props?.value)}`
    : siteContact.emailHref;
  const address = t(addressItem?.props?.value) || siteContact.address;
  const heroImage = heroProps.image || "/assets/Image/project-image1.png";

  const officeItems = getSectionItems("Offices");
  const offices = officeItems.length > 0 
    ? officeItems.map((item: any) => ({
        label: t(item.props?.label),
        title: t(item.props?.title),
        details: t(item.props?.details)?.split("|").map((d: string) => d.trim()) || [],
      }))
    : [
        {
          label: "Studio",
          title: "Jaipur",
          details: ["A-291, JDA Staff colony, Mahal Road, Jagatpura, 302017"],
        },
        {
          label: "Appointments",
          title: "By prior schedule",
          details: ["Monday to Saturday  ·  9:00 AM – 7:00 PM", "Sunday  ·  10:00 AM – 6:00 PM"],
        },
      ];

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    project: "",
    message: "",
    location: "",
  });
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChangeInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const response = await fetch("/api/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const value = await response.json();
      if (value.success) {
        setForm({ name: "", email: "", phone: "", project: "", message: "", location: "" });
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="bg-white text-[#111111]">

      {/* ─── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative isolate flex min-h-[62svh] items-end overflow-hidden bg-[#1a1a1a]">
        {/* Background image */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={heroImage}
            alt="Maven Projects Contact"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.18)_0%,rgba(10,10,10,0.52)_60%,rgba(10,10,10,0.72)_100%)]" />
        </motion.div>

        {/* Hero text */}
        <motion.div
          className="relative z-10 mx-auto w-full max-w-[1500px] px-5 pb-12 pt-36 md:px-8 lg:px-10 lg:pt-40"
          initial="hidden"
          animate="show"
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="font-editorial text-[10px] uppercase tracking-[0.28em] text-white/75 md:text-xs"
          >
            Contact
          </motion.p>
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display mt-4 max-w-3xl text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[0.94] tracking-[-0.045em] text-white"
          >
            {contactHeading}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="font-editorial mt-6 max-w-xl text-sm leading-7 text-white/80 md:text-[0.95rem]"
          >
            {contactDescription}
          </motion.p>

          {/* Quick contact links */}
          <motion.div
            variants={stagger}
            className="mt-10 flex flex-wrap gap-6 border-t border-white/30 pt-8"
          >
            {[
              { href: phoneHref, label: phoneLabel, Icon: Phone },
              { href: emailHref, label: emailLabel, Icon: Mail },
            ].map(({ href, label, Icon }) => (
              <motion.a
                key={href}
                href={href}
                variants={fadeUp}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="group flex items-center gap-3 text-white/85 transition-colors duration-200 hover:text-white"
              >
                <Icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                <span className="font-editorial text-sm">{label}</span>
                <ArrowRight className="h-3 w-3 translate-x-0 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── MAIN CONTENT: info + form ────────────────────────────────────────── */}
      <section className="border-b border-[#d7d7d7] bg-white">
        <div className="mx-auto max-w-[1500px] px-5 py-16 md:px-8 lg:px-10 lg:py-20">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(360px,1fr)] lg:gap-16">

            {/* Left — contact details */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.p
                variants={slideLeft}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="font-editorial text-[10px] uppercase tracking-[0.26em] text-[#777777] md:text-xs"
              >
                Let's connect
              </motion.p>
              <motion.h2
                variants={slideLeft}
                transition={{ duration: 0.75, ease: "easeOut" }}
                className="font-display mt-4 text-[clamp(2rem,3.5vw,3rem)] font-medium leading-[1.02] tracking-[-0.04em] text-[#111111]"
              >
                We'd love to hear about your project.
              </motion.h2>
              <motion.p
                variants={slideLeft}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="font-editorial mt-5 max-w-md text-sm leading-7 text-[#555555]"
              >
                Whether you're planning a new home, a renovation, or a commercial interior — reach out and let's start the conversation.
              </motion.p>

              {/* Contact cards */}
              <motion.div
                variants={stagger}
                className="mt-10 grid gap-5 sm:grid-cols-3"
              >
                {[
                  { Icon: Phone, label: "Call us", value: phoneLabel, href: phoneHref },
                  { Icon: Mail, label: "Email us", value: emailLabel, href: emailHref },
                  { Icon: MapPin, label: "Visit us", value: address, href: "#" },
                ].map(({ Icon, label, value, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    variants={fadeUp}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                    className="group block border border-[#e5e5e5] bg-[#fafafa] p-5 transition-all duration-300 hover:border-[#111111] hover:bg-white"
                  >
                    <div className="flex h-9 w-9 items-center justify-center border border-[#dfdfdf] bg-white transition-colors duration-300 group-hover:border-[#111111]">
                      <Icon className="h-4 w-4 text-[#555555] group-hover:text-[#111111] transition-colors duration-300" strokeWidth={1.5} />
                    </div>
                    <p className="font-editorial mt-4 text-[10px] uppercase tracking-[0.22em] text-[#888888] md:text-xs">
                      {label}
                    </p>
                    <p className="font-editorial mt-2 text-sm leading-6 text-[#111111]">
                      {value}
                    </p>
                  </motion.a>
                ))}
              </motion.div>

              {/* Office hours */}
              <motion.div
                variants={stagger}
                className="mt-10 grid gap-5 border-t border-[#e5e5e5] pt-8 sm:grid-cols-2"
              >
                {offices.map((office) => (
                  <motion.div
                    key={office.title}
                    variants={fadeUp}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                  >
                    <p className="font-editorial text-[10px] uppercase tracking-[0.22em] text-[#888888] md:text-xs">
                      {office.label}
                    </p>
                    <p className="font-display mt-2 text-lg font-medium tracking-[-0.02em] text-[#111111]">
                      {office.title}
                    </p>
                    {office.details.map((d) => (
                      <p key={d} className="font-editorial mt-1 text-sm leading-7 text-[#666666]">
                        {d}
                      </p>
                    ))}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — inquiry form */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={slideRight}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="border border-[#d7d7d7] bg-[#fafafa] p-7 md:p-9"
            >
              <p className="font-editorial text-[10px] uppercase tracking-[0.24em] text-[#777777] md:text-xs">
                Project inquiry
              </p>
              <p className="font-display mt-2 text-[1.35rem] font-medium tracking-[-0.025em] text-[#111111]">
                Tell us about your project
              </p>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 border border-[#c8e6c9] bg-[#f1f8e9] px-4 py-3 text-sm text-[#2e7d32]"
                >
                  ✓ Thank you! We'll be in touch within 24 hours.
                </motion.div>
              )}

              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    { label: "Name", name: "name", type: "text", placeholder: "Your name" },
                    { label: "Email", name: "email", type: "email", placeholder: "you@example.com" },
                  ].map((field) => (
                    <label key={field.name} className="block">
                      <span className="font-editorial text-[10px] uppercase tracking-[0.22em] text-[#777777] md:text-xs">
                        {field.label}
                      </span>
                      <input
                        type={field.type}
                        name={field.name}
                        value={form[field.name as keyof typeof form]}
                        placeholder={field.placeholder}
                        onChange={handleChangeInput}
                        className="mt-2 w-full border border-[#d7d7d7] bg-white px-4 py-3 text-sm text-[#111111] outline-none transition-all duration-200 focus:border-[#111111] focus:ring-0"
                      />
                    </label>
                  ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="font-editorial text-[10px] uppercase tracking-[0.22em] text-[#777777] md:text-xs">
                      Phone
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      placeholder="+91"
                      onChange={handleChangeInput}
                      className="mt-2 w-full border border-[#d7d7d7] bg-white px-4 py-3 text-sm text-[#111111] outline-none transition-all duration-200 focus:border-[#111111]"
                    />
                  </label>
                  <label className="block">
                    <span className="font-editorial text-[10px] uppercase tracking-[0.22em] text-[#777777] md:text-xs">
                      Project type
                    </span>
                    <select
                      name="project"
                      value={form.project}
                      onChange={handleChangeInput}
                      className="mt-2 w-full border border-[#d7d7d7] bg-white px-4 py-3 text-sm text-[#111111] outline-none transition-all duration-200 focus:border-[#111111]"
                    >
                      <option value="">Select type</option>
                      <option>Residence</option>
                      <option>Interiors</option>
                      <option>Renovation</option>
                      <option>Commercial</option>
                      <option>Institutional</option>
                    </select>
                  </label>
                </div>

                <label className="block">
                  <span className="font-editorial text-[10px] uppercase tracking-[0.22em] text-[#777777] md:text-xs">
                    Location
                  </span>
                  <input
                    type="text"
                    name="location"
                    placeholder="City / Site location"
                    value={form.location}
                    onChange={handleChangeInput}
                    className="mt-2 w-full border border-[#d7d7d7] bg-white px-4 py-3 text-sm text-[#111111] outline-none transition-all duration-200 focus:border-[#111111]"
                  />
                </label>

                <label className="block">
                  <span className="font-editorial text-[10px] uppercase tracking-[0.22em] text-[#777777] md:text-xs">
                    Tell us about your project
                  </span>
                  <textarea
                    name="message"
                    rows={5}
                    value={form.message}
                    placeholder="Share size, timeline, goals, and any references."
                    onChange={handleChangeInput}
                    className="mt-2 w-full resize-none border border-[#d7d7d7] bg-white px-4 py-3 text-sm text-[#111111] outline-none transition-all duration-200 focus:border-[#111111]"
                  />
                </label>

                <motion.button
                  type="submit"
                  whileHover={{ backgroundColor: "#000000" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  className="group flex w-full items-center justify-center gap-3 bg-[#111111] py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300"
                >
                  {saving ? (
                    <>
                      <span className="inline-block h-3 w-3 animate-spin rounded-full border border-white/30 border-t-white" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      Send inquiry
                      <ArrowRight className="h-3.5 w-3.5 translate-x-0 transition-transform duration-200 group-hover:translate-x-1" />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER CTA BANNER ────────────────────────────────────────────────── */}
      <motion.section
        className="bg-white pt-12"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeIn}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="relative min-h-[320px] overflow-hidden md:min-h-[430px]">
            <Image
              src={homeFooterCta.image}
              alt={homeFooterCta.title}
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,11,0.08)_0%,rgba(11,11,11,0.32)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 border-t border-white/50 bg-black/10 px-5 py-7 backdrop-blur-[2px] md:px-8 md:py-8">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={stagger}
                className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
              >
                <div>
                  <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="font-editorial text-[10px] uppercase tracking-[0.24em] text-white/80 md:text-xs">
                    {homeFooterCta.eyebrow}
                  </motion.p>
                  <motion.h2 variants={fadeUp} transition={{ duration: 0.65 }} className="font-display mt-3 max-w-3xl text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.04] tracking-[-0.04em] text-white">
                    {homeFooterCta.title}
                  </motion.h2>
                </div>
                <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
                  <Link
                    href={homeFooterCta.cta.href}
                    className="group inline-flex w-full items-center justify-center gap-2 border border-white/75 bg-white px-6 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#111111] transition duration-300 hover:bg-transparent hover:text-white sm:w-fit"
                  >
                    {homeFooterCta.cta.label}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
