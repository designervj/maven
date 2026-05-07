"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

import { homeFooterCta, siteContact } from "@/lib/homepage-data";
import { useState } from "react";

const offices = [
  {
    label: "Studio",
    title: "Jaipur",
    details: ["A-291, JDA Staff colony, Mahal Road, Jagatpura, 302017"],
  },
  {
    label: "Appointments",
    title: "By prior schedule",
    details: ["Monday to Saturday", "9:00 AM to 7:00 PM", "Sunday", " 10:00 AM to 6:00 PM"],
  },
];

export default function ContactPage() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    project: "",
    message: "",
    location: ""
  })
  const [saving, setSaving] = useState(false)

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true)
      const response = await fetch('/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const value = await response.json();
      if (value.success) {
        setForm({
          name: "",
          email: "",
          phone: "",
          project: "",
          message: "",
          location: ""
        })
        alert("Thank you for contacting us! We will get back to you soon.");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="bg-white text-[#111111]">
      <section className="border-b border-[#d7d7d7] bg-white pt-24 md:pt-28">
        <div className="mx-auto max-w-[1500px] px-5 pb-14 pt-6 md:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(360px,0.85fr)]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <p className="font-editorial text-[10px] uppercase tracking-[0.24em] text-[#777777] md:text-xs">
                Contact
              </p>
              <h1 className="font-display mt-4 max-w-4xl text-[clamp(2.5rem,5vw,4.6rem)] font-medium leading-[0.98] tracking-[-0.045em] text-[#111111]">
                Get in touch with Maven Projects.
              </h1>
              <p className="font-editorial mt-6 max-w-2xl text-sm leading-7 text-[#555555] md:text-base">
                Share your project brief, timeline, location, and the kind of space you want to create. We usually respond
                to all inquiries within 24 hours. Our goal is to provide you with clear answers and helpful guidance
                from day one.
              </p>

              <div className="mt-10 grid gap-8 border-t border-[#d7d7d7] pt-6 md:grid-cols-3">
                <div>
                  <Phone className="h-5 w-5 text-[#111111]" strokeWidth={1.5} />
                  <p className="font-editorial mt-4 text-[10px] uppercase tracking-[0.22em] text-[#777777] md:text-xs">
                    Call
                  </p>
                  <a href={siteContact.phoneHref} className="font-editorial mt-2 block text-sm text-[#111111]">
                    {siteContact.phoneLabel}
                  </a>
                </div>
                <div>
                  <Mail className="h-5 w-5 text-[#111111]" strokeWidth={1.5} />
                  <p className="font-editorial mt-4 text-[10px] uppercase tracking-[0.22em] text-[#777777] md:text-xs">
                    Email
                  </p>
                  <a href={siteContact.emailHref} className="font-editorial mt-2 block text-sm text-[#111111]">
                    {siteContact.emailLabel}
                  </a>
                </div>
                <div>
                  <MapPin className="h-5 w-5 text-[#111111]" strokeWidth={1.5} />
                  <p className="font-editorial mt-4 text-[10px] uppercase tracking-[0.22em] text-[#777777] md:text-xs">
                    Visit
                  </p>
                  <p className="font-editorial mt-2 text-sm leading-7 text-[#111111]">{siteContact.address}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.12 }}
              className="border border-[#d7d7d7] bg-[#fafafa] p-6 md:p-8"
            >
              <p className="font-editorial text-[10px] uppercase tracking-[0.24em] text-[#777777] md:text-xs">
                Project inquiry
              </p>
              <form
                action={siteContact.emailHref}
                method="get"
                className="mt-6 space-y-5"
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="font-editorial text-[10px] uppercase tracking-[0.22em] text-[#777777] md:text-xs">
                      Name
                    </span>
                    <input
                      type="text"
                      value={form.name}
                      name="name"
                      placeholder="Your name"
                      onChange={(e) => handleChangeInput(e)}
                      className="mt-2 w-full border border-[#d7d7d7] bg-white px-4 py-3 text-sm text-[#111111] outline-none transition focus:border-[#111111]"
                    />
                  </label>
                  <label className="block">
                    <span className="font-editorial text-[10px] uppercase tracking-[0.22em] text-[#777777] md:text-xs">
                      Email
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      placeholder="you@example.com"
                      onChange={(e) => handleChangeInput(e)}
                      className="mt-2 w-full border border-[#d7d7d7] bg-white px-4 py-3 text-sm text-[#111111] outline-none transition focus:border-[#111111]"
                    />
                  </label>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="font-editorial text-[10px] uppercase tracking-[0.22em] text-[#777777] md:text-xs">
                      Phone
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      placeholder="+91"
                      onChange={(e) => handleChangeInput(e)}
                      className="mt-2 w-full border border-[#d7d7d7] bg-white px-4 py-3 text-sm text-[#111111] outline-none transition focus:border-[#111111]"
                    />
                  </label>
                  <label className="block">
                    <span className="font-editorial text-[10px] uppercase tracking-[0.22em] text-[#777777] md:text-xs">
                      Project type
                    </span>
                    <select
                      name="project"
                      value={form.project}
                      onChange={(e) => handleChangeInput(e)}
                      className="mt-2 w-full border border-[#d7d7d7] bg-white px-4 py-3 text-sm text-[#111111] outline-none transition focus:border-[#111111]"
                    >
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
                    onChange={(e) => handleChangeInput(e)}
                    className="mt-2 w-full border border-[#d7d7d7] bg-white px-4 py-3 text-sm text-[#111111] outline-none transition focus:border-[#111111]"
                  />
                </label>

                <label className="block">
                  <span className="font-editorial text-[10px] uppercase tracking-[0.22em] text-[#777777] md:text-xs">
                    Tell us about your project
                  </span>
                  <textarea
                    name="message"
                    rows={6}
                    value={form.message}
                    placeholder="Share size, timeline, goals, and any links or references."
                    onChange={(e) => handleChangeInput(e)}
                    className="mt-2 w-full resize-none border border-[#d7d7d7] bg-white px-4 py-3 text-sm text-[#111111] outline-none transition focus:border-[#111111]"
                  />
                </label>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full bg-[#111111] hover:bg-[#000000] text-white py-6 rounded-none font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {saving ? "Submitting..." : "Send inquiry"}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#d7d7d7] bg-white py-14">
        <div className="mx-auto max-w-[1500px] px-5 md:px-8 lg:px-10">
          <div className="grid gap-8 md:grid-cols-2">
            {offices.map((office) => (
              <div key={office.title} className="border border-[#d7d7d7] p-6 md:p-8">
                <p className="font-editorial text-[10px] uppercase tracking-[0.24em] text-[#777777] md:text-xs">
                  {office.label}
                </p>
                <h2 className="font-display mt-4 text-[1.9rem] font-medium tracking-[-0.035em] text-[#111111]">
                  {office.title}
                </h2>
                <div className="mt-6 space-y-2">
                  {office.details.map((detail) => (
                    <p key={detail} className="font-editorial text-sm leading-7 text-[#555555]">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white pt-12">
        <div className="mx-auto max-w-[1500px]">
          <div className="relative min-h-[320px] overflow-hidden md:min-h-[430px]">
            <Image
              src={homeFooterCta.image}
              alt={homeFooterCta.title}
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,11,0.08)_0%,rgba(11,11,11,0.3)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 border-t border-white/60 bg-black/10 px-5 py-6 backdrop-blur-[2px] md:px-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="font-editorial text-[10px] uppercase tracking-[0.24em] text-white/88 md:text-xs">
                    {homeFooterCta.eyebrow}
                  </p>
                  <h2 className="font-display mt-3 max-w-3xl text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.04] tracking-[-0.04em] text-white">
                    {homeFooterCta.title}
                  </h2>
                </div>
                <Link
                  href={homeFooterCta.cta.href}
                  className="inline-flex w-full items-center justify-center border border-white/75 bg-white px-5 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#111111] transition duration-300 hover:bg-transparent hover:text-white sm:w-fit"
                >
                  {homeFooterCta.cta.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
