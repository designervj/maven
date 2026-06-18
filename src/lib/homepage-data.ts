export type NavItem = {
  label: string;
  href: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
  primaryCta: NavItem;
  secondaryCta: NavItem;
  supportingCaption: string;
  metaLabel: string;
};

export type StudioIntro = {
  eyebrow: string;
  title: string;
  description: string;
  supportingCopy: string;
  cta: NavItem;
};

export type FounderFeature = {
  eyebrow: string;
  title: string;
  quote: string;
  description: string;
  image: string;
  secondaryImage: string;
  role: string;
  name: string;
  cta: NavItem;
};

export type ServiceItem = {
  index: string;
  title: string;
  description: string;
  icon: "house" | "sofa" | "ruler";
  linkLabel: string;
};

export type LogoItem = {
  name: string;
  src: string;
};

export type ProjectItem = {
  title: string;
  category: string;
  location: string;
  image: string;
  href: string;
  year: string;
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type TestimonialContent = {
  quote: string;
  name: string;
  role: string;
  image: string;
};

export type JournalItem = {
  title: string;
  excerpt: string;
  image: string;
  href: string;
  meta: string;
};

export type ContactLink = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type FeatureBanner = {
  eyebrow: string;
  title: string;
  image: string;
  secondaryImage?: string;
  cta: NavItem;
};

export type StatItem = {
  value: string;
  label: string;
};

export type AwardItem = {
  year: string;
  title: string;
  source: string;
};

export const siteNavigation: NavItem[] = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/about" },
  { label: "SERVICES", href: "/services" },
  { label: "BLOG", href: "/blog" },
  { label: "PORTFOLIO", href: "/portfolio" },
  { label: "CONTACT US", href: "/contact" },
];

export const heroContent: HeroContent = {
  eyebrow: "Recent Work / Jaipur",
  title: "CREATING HOMES THAT FEEL NATURAL AND SPACIOUS",
  image: "/assets/Image/about-us-img.jpeg",
  primaryCta: { label: "Explore portfolio", href: "/portfolio" },
  secondaryCta: { label: "Start a conversation", href: "/contact" },
  supportingCaption:
    "Creating homes that feel natural, spacious, and fully yours.",
  metaLabel: "Maven Projects | Architecture and Interior Design in Jaipur",
};

export const studioIntro: StudioIntro = {
  eyebrow: "Your Partner in Design",
  title:
    "Maven Projects is a premier architecture and interior design studio based in Jaipur. We specialize in contemporary spaces that prioritize clarity, comfort, and character.",
  description: "",
  supportingCopy: "",
  cta: { label: "Learn more about us", href: "/about" },
};

export const services: ServiceItem[] = [
  {
    index: "01",
    title: "Architecture",
    description:
      "We design safe, beautiful, and sustainable homes that stand the test of time, from Jagatpura to C-Scheme.",
    icon: "house",
    linkLabel: "Architecture",
  },
  {
    index: "02",
    title: "Interior Design",
    description:
      "Bespoke interiors that blend style with functionality, creating spaces you’ll love to live in across Jaipur.",
    icon: "sofa",
    linkLabel: "Interior design",
  },
  {
    index: "03",
    title: "Renovation",
    description:
      "Breathing new life into old spaces with modern aesthetics, high-quality materials, and structural upgrades.",
    icon: "ruler",
    linkLabel: "Renovation",
  },
];

export const featuredProjects: ProjectItem[] = [
  {
    title: "Primary Residence House",
    category: "New build",
    location: "Jaipur, India",
    image: "/assets/Image/about-img.jpg",
    href: "/portfolio",
    year: "2024",
  },
  {
    title: "Field View Villa",
    category: "Private home",
    location: "Ahmedabad, India",
    image: "/assets/Image/about-image.jpg",
    href: "/portfolio",
    year: "2023",
  },
  {
    title: "Lightwell Gallery",
    category: "Cultural interiors",
    location: "Mumbai, India",
    image: "/assets/Image/project-image2.png",
    href: "/portfolio",
    year: "2024",
  },
];

export const processIntro = {
  eyebrow: "Our Process",
  title:
    "We guide you from the first conversation through to move-in, turning complex planning into a clear, collaborative journey.",
  description:
    "Every decision is led by detail and transparency, ensuring the final design evolves with precision and absolute confidence.",
};

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Letter of Collaboration",
    description:
      "We establish scope, intent, and working rhythm early so the project starts with aligned expectations and a shared architectural brief.",
  },
  {
    step: "02",
    title: "Evaluate & Design",
    description:
      "Concept development, material study, planning, and technical refinement move in parallel to keep the design both expressive and buildable.",
  },
  {
    step: "03",
    title: "Partner & Build",
    description:
      "With consultants, vendors, and site teams aligned, we stay involved through execution to protect the quality of every decision.",
  },
];

export const featureBanner: FeatureBanner = {
  eyebrow: "Before the build",
  title: "The best builds start before the build",
  image: "/assets/Image/project-image1.png",
  secondaryImage: "/assets/Image/project-image2.png",
  cta: { label: "Discover more", href: "/about" },
};



export const founderFeature: FounderFeature = {
  eyebrow: "Our Philosophy",
  title: "Designing with discipline, warmth, and long-term clarity.",
  quote:
    "Every successful project balances concept and control. We believe a home should be as functional as it is beautiful, tailored to the people who live there.",
  description:
    "Our studio pairs strong architectural thinking with calm execution support so the final space feels exactly as we promised from day one.",
  image: "/assets/Image/team-img.jpg",
  secondaryImage: "/assets/Image/project-image2.png",
  role: "Architecture / Interiors / Execution",
  name: "Maven Projects",
  cta: { label: "Meet the studio", href: "/about" },
};

export const journalEntries: JournalItem[] = [
  {
    title: "How a modern facade stays warm and welcoming",
    excerpt:
      "A closer look at proportion, materials, and threshold design in our recent residential work.",
    image: "/assets/Image/about-image.jpg",
    href: "/about",
    meta: "Media",
  },
  {
    title: "Designing joinery that feels architectural",
    excerpt:
      "Interior details can reinforce the larger spatial idea when geometry, texture, and light are handled together.",
    image: "/assets/Image/project-image1.png",
    href: "/portfolio",
    meta: "Press release",
  },
  {
    title: "Recent hospitality concept highlighted by editors",
    excerpt:
      "A published project story focused on circulation, atmosphere, and restrained material layering.",
    image: "/assets/Image/project-image2.png",
    href: "/testimonials",
    meta: "News",
  },
];

export const testimonial: TestimonialContent = {
  quote:
    "Maven Projects gave our home a rare sense of stillness. Every room feels generous, resolved, and beautifully easy to live in.",
  name: "Residential Client",
  role: "Jaipur",
  image: "/assets/Image/testimonials-img.png",
};

export const collaborationLogos: LogoItem[] = [
  { name: "Brand 1", src: "/assets/Image/brand-logo (1).svg" },
  { name: "Brand 2", src: "/assets/Image/brand-logo (2).svg" },
  { name: "Brand 3", src: "/assets/Image/brand-logo (3).svg" },
  { name: "Brand 4", src: "/assets/Image/brand-logo (4).svg" },
];

export const homeFooterCta: FeatureBanner = {
  eyebrow: "Let's Talk About Your Project",
  title: "Let's create a home that feels composed, generous, and fully yours.",
  image: "/assets/Image/about-image.jpg",
  cta: { label: "Book a consultation", href: "/contact" },
};

export const siteContact = {
  phoneLabel: "+91 8209117064",
  phoneHref: "tel:+91 8209117064",
  emailLabel: "mavenprojectshq@gmail.com",
  emailHref: "mailto:mavenprojectshq@gmail.com",
  address: " A-291, JDA Staff colony, Mahal Road, Jagatpura, Jaipur, Rajasthan 302017",
};

export const footerQuickLinks: ContactLink[] = [
  ...siteNavigation,
];

export const faqItems = [
  {
    question: "How do I find a reliable architect or interior designer in Jaipur?",
    answer: "The best approach is to find a studio that aligns with your style and values. We focus on creating modern, balanced homes for families across Jaipur, including areas like Vaishali Nagar and Malviya Nagar."
  },
  {
    question: "Can Maven Projects manage my entire construction project?",
    answer: "Yes, we provide end-to-end project management. We handle everything from the initial design to on-site execution and coordination, so your project stays on track and within budget."
  }
];

export const footerContactActions: ContactLink[] = [
  { label: "Book a consultation", href: siteContact.emailHref },
  { label: "Speak to our team", href: siteContact.phoneHref },
  { label: "Our selected work", href: "/portfolio" },
];

export const socialLinks: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/maven.projects.official?igsh=MTI1ZDl1aXFqdzI2bA%3D%3D" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61583407575742" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
  { label: "YouTube", href: "https://youtube.com/" },
];
