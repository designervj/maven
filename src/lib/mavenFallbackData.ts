import aboutPage from '@/lib/pages/aboutPage.json';
import adminDashboardPage from '@/lib/pages/adminDashboardPage.json';
import blogPage from '@/lib/pages/blogPage.json';
import contactPage from '@/lib/pages/contactPage.json';
import footerPage from '@/lib/pages/footerPage.json';
import homePage from '@/lib/pages/homePage.json';
import kalpauthPage from '@/lib/pages/kalpauthPage.json';
import loginPage from '@/lib/pages/loginPage.json';
import portfolioPage from '@/lib/pages/portfolioPage.json';
import processPage from '@/lib/pages/processPage.json';
import servicesPage from '@/lib/pages/servicesPage.json';
import testimonialsPage from '@/lib/pages/testimonialsPage.json';
import globalThemeConfig from '@/styles/global.json';

const pageList = [
  homePage,
  aboutPage,
  servicesPage,
  portfolioPage,
  processPage,
  testimonialsPage,
  contactPage,
  blogPage,
  footerPage,
  loginPage,
  kalpauthPage,
  adminDashboardPage,
] as any[];

const publicTheme = {
  ...(globalThemeConfig.public_theme as any),
  typography: {
    ...(globalThemeConfig.public_theme.typography as any),
    monoFont: globalThemeConfig.public_theme.typography?.monoFont ?? 'JetBrains Mono',
  },
};

const adminTheme = {
  ...(globalThemeConfig.admin_theme as any),
  typography: {
    ...(globalThemeConfig.admin_theme.typography as any),
    monoFont: globalThemeConfig.admin_theme.typography?.monoFont ?? 'JetBrains Mono',
  },
};

const publicNavigation = [
  { label: 'HOME', href: '/', kind: 'link' },
  { label: 'ABOUT US', href: '/about', kind: 'link' },
  { label: 'SERVICES', href: '/services', kind: 'link' },
  { label: 'BLOG', href: '/blog', kind: 'link' },
  { label: 'PORTFOLIO', href: '/portfolio', kind: 'link' },
  { label: 'CONTACT US', href: '/contact', kind: 'link' },
];

const adminNavigation = [
  { label: 'Overview', href: '/admin', kind: 'link', icon: 'LayoutDashboard' },
  { label: 'Projects', href: '/admin/projects', kind: 'link', icon: 'Briefcase' },
  { label: 'Clients', href: '/admin/clients', kind: 'link', icon: 'Users' },
  { label: 'Inquiries', href: '/admin/inquiries', kind: 'link', icon: 'MessageSquare' },
  { label: 'Gallery', href: '/admin/gallery', kind: 'link', icon: 'ImageIcon' },
  { label: 'Settings', href: '/admin/settings', kind: 'link', icon: 'Settings' },
];

const routes = [
  { key: 'home', path: '/', page_slug: 'home', visibility: 'public' },
  { key: 'about', path: '/about', page_slug: 'about', visibility: 'public' },
  { key: 'services', path: '/services', page_slug: 'services', visibility: 'public' },
  { key: 'blog', path: '/blog', page_slug: 'blog', visibility: 'public' },
  { key: 'portfolio', path: '/portfolio', page_slug: 'portfolio', visibility: 'public' },
  { key: 'contact', path: '/contact', page_slug: 'contact', visibility: 'public' },
  { key: 'process', path: '/process', page_slug: 'process', visibility: 'public' },
  { key: 'testimonials', path: '/testimonials', page_slug: 'testimonials', visibility: 'public' },
  { key: 'admin', path: '/admin', page_slug: 'admin', visibility: 'admin' },
];

export const mavenBlueprint = {
  tenant_id: 'kp_maven',
  tenant_slug: 'maven',
  version: 1,
  business_label: 'Maven Projects',
  vertical_packs: 'cms',
  enabled_modules: ['cms', 'forms', 'media', 'publishing', 'tenant-dashboard'],
  public_theme: publicTheme,
  admin_theme: adminTheme,
  public_navigation: publicNavigation,
  admin_navigation: adminNavigation,
  routes,
  brandAssets: { public_theme: publicTheme, admin_theme: adminTheme },
  brandValue: {
    coreValues: ['Architecture', 'Interior Design', 'Renovation', 'Execution'],
    values: ['Architecture', 'Interior Design', 'Renovation', 'Execution'],
    taglines: {
      primary: 'Creating homes that feel natural, spacious, and fully yours.',
      primary_slogan: 'Creating homes that feel natural, spacious, and fully yours.',
      short_message: 'Architecture and Interior Design in Jaipur',
      secondary_message: 'Designing with discipline, warmth, and long-term clarity.',
    },
    brandTaglines: {
      primary_slogan: 'Creating homes that feel natural, spacious, and fully yours.',
      short_message: 'Architecture and Interior Design in Jaipur',
      secondary_message: 'Designing with discipline, warmth, and long-term clarity.',
    },
    socialLinks: [],
    socialMedia: [],
  },
  businessProfile: {
    businessInfo: {
      name: 'Maven Projects',
      industry: 'Architecture and Interior Design',
      legalName: 'Maven Projects',
      foundedDate: '',
    },
    communications: {
      supportEmail: 'mavenprojectshq@gmail.com',
      salesEmail: 'mavenprojectshq@gmail.com',
      pressEmail: 'mavenprojectshq@gmail.com',
      primaryEmail: 'mavenprojectshq@gmail.com',
    },
    contactInfo: {
      primaryPhone: '+91 8209117064',
      whatsapp: '+91 8209117064',
      website: 'https://www.mavenprojects.in/',
      workingHours: '',
    },
    legalRegulatory: { registrationNumber: '', taxId: '' },
  },
  branding: null,
  commerce: {},
  localization: {
    languages: { available: [{ code: 'en', name: 'English', enabled: true }], default: 'en' },
    currency: 'INR',
  },
  mediaConfiguration: {
    selectedProvider: 'local',
    cloudinary: { cloudName: '', apiKey: '', apiSecret: '' },
    s3: { bucketName: '', region: '', accessKeyId: '', secretAccessKey: '', endpoint: '' },
  },
  dashboard_widgets: [],
  vocabulary: { customer: 'client', order: 'project', booking: 'consultation', staff: 'team', location: 'site' },
  templates: [],
  toneTags: [],
  primaryGoal: { id: 'website', label: 'Public website and CMS' },
  admin_email: 'mavenprojectshq@gmail.com',
  agency_slug: 'agency-maven-architect',
  business_type: 'Architecture and Interior Design',
  infra_mode: 'shared',
  masterPrompt: '',
  tags: null,
  storeConfiguration: '',
  currenciesAndTaxes: '',
  paymentProviders: '',
  shippingRegions: '',
  checkoutPolicies: '',
};

export function getMavenPage(slugOrId: string) {
  const normalized = slugOrId.replace(/^maven:/, '');
  return pageList.find((page) => page.slug === normalized) ?? null;
}

export function getMavenPages() {
  return pageList;
}

export function getMavenBlueprintResponse() {
  return {
    data: {
      id: 'maven:blueprint',
      document_key: 'blueprint',
      tenant_slug: 'maven',
      payload: mavenBlueprint,
      updatedAt: new Date().toISOString(),
    },
    success: true,
  };
}
