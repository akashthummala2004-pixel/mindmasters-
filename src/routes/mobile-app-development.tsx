import { createFileRoute } from "@tanstack/react-router";
import { ServicePageTemplate, ServicePageConfig } from "@/components/site/ServicePageTemplate";
import { SITE_URL, COMPANY_NAME } from "@/lib/seo-schemas";

const config: ServicePageConfig = {
  slug: "mobile-app-development",
  serviceTitle: "Mobile App Development",
  h1Title: "Mobile App Development Services for iOS & Android",
  metaDesc:
    "Native and cross-platform mobile application development services for iOS and Android, powered by modern frameworks, APIs, and AI integrations.",
  heroTag: "Native & Cross-Platform Mobile Engineering",
  overviewDesc:
    "We build sleek, high-performing native and cross-platform mobile applications for iOS and Android — combining fluid 60FPS user interfaces, offline-first architectures, secure biometric authentication, and AI API integrations.",
  problemsTitle: "Mobile Challenges We Help Brands Overcome",
  problems: [
    {
      title: "Janky UI & Slow Load Times",
      desc: "Unoptimized mobile apps plagued by laggy transitions, memory leaks, and long startup times that drive users to uninstall.",
    },
    {
      title: "Dual Codebase Overhead",
      desc: "Managing separate iOS and Android engineering teams without a synchronized release cycle or unified design language.",
    },
    {
      title: "Unreliable Offline Performance",
      desc: "Mobile applications that crash or become unusable when connectivity drops in real-world mobile environments.",
    },
  ],
  features: [
    {
      title: "Cross-Platform React Native & Flutter",
      desc: "Single high-performance codebase targeting both Apple App Store and Google Play Store with native speed.",
    },
    {
      title: "AI & On-Device ML Integration",
      desc: "Embedding computer vision, speech recognition, and smart recommendation engines directly inside mobile applications.",
    },
    {
      title: "Biometric Security & Push Notifications",
      desc: "FaceID/TouchID authentication, encrypted local storage, real-time push channels, and deep linking.",
    },
    {
      title: "Offline-First Synchronization",
      desc: "Local WatermelonDB/SQLite caching with background delta sync when network connection is restored.",
    },
  ],
  technologies: [
    "React Native",
    "Flutter",
    "Swift (iOS)",
    "Kotlin (Android)",
    "Expo",
    "Firebase",
    "GraphQL",
    "WatermelonDB",
    "APNs / FCM",
    "App Store Connect",
  ],
  useCases: [
    {
      title: "On-Demand Delivery & Booking Apps",
      desc: "Real-time GPS tracking, interactive map routing, in-app payments, and instant driver/user notifications.",
    },
    {
      title: "Healthcare & Telemedicine Mobile Apps",
      desc: "HIPAA-compliant video consultations, encrypted messaging, appointment booking, and wearable device sync.",
    },
    {
      title: "Fintech & Mobile Banking Applications",
      desc: "Secure mobile wallets, instant peer-to-peer transfers, biometric logins, and interactive expense analytics.",
    },
  ],
  process: [
    {
      step: "01",
      title: "Mobile UX/UI Blueprinting",
      desc: "Designing touch-first mobile interfaces, gesture patterns, interactive prototypes, and navigation flows.",
    },
    {
      step: "02",
      title: "Native Code Development",
      desc: "Building clean modular components, state management, offline storage, and API client layers.",
    },
    {
      step: "03",
      title: "Device Testing & QA",
      desc: "Testing across multiple physical iOS and Android devices, screen sizes, OS versions, and network conditions.",
    },
    {
      step: "04",
      title: "App Store & Play Store Publishing",
      desc: "Managing app store review guidelines, metadata optimization, certificates, and smooth submission.",
    },
  ],
  faqs: [
    {
      question: "Should we build a native app or cross-platform (React Native/Flutter)?",
      answer:
        "For 90% of business applications, cross-platform (React Native or Flutter) provides 95%+ native performance while cutting development time and maintenance costs by almost half. For heavy 3D or hardware-intensive apps, native Swift/Kotlin is recommended.",
    },
    {
      question: "Do you handle App Store and Google Play Store approval?",
      answer:
        "Yes, we handle the complete store submission process — including provisioning profiles, app store guidelines compliance, privacy policies, screenshot assets, and review communication.",
    },
    {
      question: "How do you ensure data security on mobile devices?",
      answer:
        "We implement SSL pinning, encrypted SQLite local databases, Secure Enclave / KeyStore token storage, biometric authentication, and strict API token expiration.",
    },
  ],
  offers: [
    "Cross-Platform Mobile App Development",
    "iOS Application Development",
    "Android Application Development",
    "Mobile App UI/UX & Store Publishing",
  ],
  relatedServices: [
    {
      name: "Web Application Development",
      slug: "/web-application-development",
      desc: "Scalable web applications, customer portals, and web backends.",
    },
    {
      name: "AI Agents & Automation Services",
      slug: "/ai-agents-automation",
      desc: "AI voice agents and automated workflow pipelines.",
    },
    {
      name: "Custom Software Development",
      slug: "/custom-software-development",
      desc: "Custom backend microservices and API integrations.",
    },
  ],
};

export const Route = createFileRoute("/mobile-app-development")({
  head: () => ({
    meta: [
      { title: `${config.serviceTitle} Services | ${COMPANY_NAME}` },
      { name: "description", content: config.metaDesc },
      {
        name: "keywords",
        content:
          "mobile app development company, mobile application development services, iOS app development, Android app development, React Native Flutter apps, AI mobile apps",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: `${config.serviceTitle} Services | ${COMPANY_NAME}` },
      { property: "og:description", content: config.metaDesc },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/mobile-app-development` },
      { property: "og:image", content: `${SITE_URL}/companylogo.png` },
      { property: "og:site_name", content: COMPANY_NAME },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${config.serviceTitle} Services | ${COMPANY_NAME}` },
      { name: "twitter:description", content: config.metaDesc },
      { name: "twitter:image", content: `${SITE_URL}/companylogo.png` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/mobile-app-development` }],
  }),
  component: () => <ServicePageTemplate config={config} />,
});
