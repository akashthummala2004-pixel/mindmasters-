import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { CalModalProvider } from "@/components/site/CalModalContext";

const themeInitScript = `document.documentElement.style.colorScheme='dark';document.documentElement.style.background='#06070b';`;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#06070b] px-4 text-center">
      <div className="max-w-md">
        <span className="text-xs uppercase font-mono font-semibold tracking-widest text-[#74f5ff]">
          Error 404
        </span>
        <h1 className="mt-2 text-6xl font-extrabold text-white tracking-tight">404</h1>
        <h2 className="mt-3 text-xl font-bold text-white">Page Not Found</h2>
        <p className="mt-2 text-sm text-white/60 leading-relaxed">
          The page you are looking for doesn't exist or has been moved. Explore our AI services or return home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-[#12141c] border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1a1c25]"
          >
            Go to Homepage
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full bg-white/[0.08] border border-white/10 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/[0.15]"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#06070b] px-4 text-center">
      <div className="max-w-md">
        <h1 className="text-xl font-semibold tracking-tight text-white">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-white/60">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 cursor-pointer"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.08] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/[0.15]"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "AI Development & Software Solutions Company | Mind Masters AI Solutions" },
      {
        name: "description",
        content:
          "Mind Masters AI Solutions provides AI agents, automation, AI/ML, web and mobile applications, SaaS, and custom software development services.",
      },
      { name: "author", content: "Mind Masters AI Solutions Pvt Ltd" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: "AI Development & Software Solutions Company | Mind Masters AI Solutions" },
      {
        property: "og:description",
        content:
          "Mind Masters AI Solutions provides AI agents, automation, AI/ML, web and mobile applications, SaaS, and custom software development services.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Mind Masters AI Solutions Pvt Ltd" },
      { property: "og:image", content: "https://www.mindmastersai.services/companylogo.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AI Development & Software Solutions Company | Mind Masters AI Solutions" },
      {
        name: "twitter:description",
        content:
          "Mind Masters AI Solutions provides AI agents, automation, AI/ML, web and mobile applications, SaaS, and custom software development services.",
      },
      { name: "twitter:image", content: "https://www.mindmastersai.services/companylogo.png" },
      { name: "theme-color", content: "#06070b" },
    ],
    links: [
      // Warm up the font origins so the stylesheet + font files fetch in
      // parallel with our CSS instead of waiting for it to parse.
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/png", href: "/favicon-icon.png" },
      { rel: "apple-touch-icon", href: "/favicon-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
          suppressHydrationWarning
        />
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  // Initialized once for the whole app so the scroll system (Lenis on desktop,
  // native on touch) persists across client-side navigation instead of being
  // torn down and rebuilt on every route change — which left the page locked.
  useSmoothScroll();

  return (
    <QueryClientProvider client={queryClient}>
      <CalModalProvider>
        <Outlet />
      </CalModalProvider>
    </QueryClientProvider>
  );
}
