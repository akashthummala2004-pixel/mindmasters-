import { Linkedin, Twitter } from "lucide-react";
import { Link } from "@tanstack/react-router";
import companyLogo from "@/assets/companylogo.png";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

const columns: FooterColumn[] = [
  {
    title: "Services",
    links: [
      { label: "AI Agents & Automation", href: "/ai-agents-automation" },
      { label: "AI/ML Solutions", href: "/ai-ml-solutions" },
      { label: "Web App Development", href: "/web-application-development" },
      { label: "Mobile App Development", href: "/mobile-app-development" },
      { label: "SaaS Development", href: "/saas-development" },
      { label: "Custom Software", href: "/custom-software-development" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Schedule a 1:1", href: "/schedule" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] container-x pt-12 sm:pt-20 pb-10 sm:pb-12 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -bottom-[50%] left-1/2 -translate-x-1/2 h-[60vw] w-[120vw] rounded-full" style={{ background: "radial-gradient(closest-side, rgba(91,140,255,0.10), transparent 70%)", filter: "blur(120px)" }} />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-x-5 gap-y-8 sm:gap-10">
          <div className="col-span-2 md:col-span-4">
            <Link to="/" className="flex items-center gap-2.5 group cursor-pointer">
              <img
                src={companyLogo}
                alt="Mind Masters AI Solutions Logo"
                width={1536}
                height={1024}
                loading="lazy"
                decoding="async"
                className="h-8 sm:h-9 lg:h-10 w-auto object-contain rounded-lg drop-shadow-[0_2px_12px_rgba(56,189,248,0.3)] transition-transform group-hover:scale-[1.02]"
              />
              <span className="text-[14px] sm:text-[15px] font-semibold tracking-tight text-white group-hover:text-white/95 transition-colors">
                Mind Masters{" "}
                <span className="text-[color:var(--violet)]">·</span>{" "}
                <span className="font-serif-display italic text-white/85">AI</span>
              </span>
            </Link>
            <p className="mt-3 sm:mt-4 max-w-sm text-[12.5px] sm:text-sm text-white/55 leading-[1.55] sm:leading-relaxed text-pretty">
              AI agents, web apps, mobile apps, SaaS platforms, and custom software engineered with purpose.
            </p>
            <div className="mt-4 sm:mt-5 flex items-center gap-2">
              {[
                {
                  name: "LinkedIn",
                  icon: Linkedin,
                  href: "https://www.linkedin.com/company/mind-masters-ai-solutions-pvt-ltd/",
                },
                {
                  name: "Twitter",
                  icon: Twitter,
                  href: "https://x.com",
                },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full glass text-white/65 hover:text-white hover:border-white/20 transition-colors tap-press"
                  aria-label={item.name}
                >
                  <item.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:-translate-y-0.5" strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="md:col-span-3">
              <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                {col.title}
              </div>
              <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={l.external ? "_blank" : undefined}
                      rel={l.external ? "noopener noreferrer" : undefined}
                      className="relative inline-block text-[12.5px] sm:text-sm text-white/65 hover:text-white transition-colors group"
                    >
                      {l.label}
                      <span aria-hidden className="absolute left-0 -bottom-0.5 h-px w-0 bg-[color:var(--brand)] group-hover:w-full transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 md:col-span-3">
            <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
              Contact
            </div>
            <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-2.5 text-[12.5px] sm:text-sm">
              <li>
                <a
                  href="mailto:mmaisolutions.pvt@gmail.com"
                  className="text-white/65 hover:text-white transition-colors break-all"
                >
                  mmaisolutions.pvt@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+918500729621" className="text-white/65 hover:text-white transition-colors">
                  +91 85007 29621
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/918500729621"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/65 hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Brand wordmark — soft display */}
        <div aria-hidden className="relative mt-10 sm:mt-20 -mx-5 sm:-mx-8 lg:-mx-12 overflow-hidden">
          <div className="text-center text-[22vw] sm:text-[14vw] md:text-[12vw] font-semibold tracking-[-0.05em] text-white/[0.04] leading-[0.85] select-none whitespace-nowrap">
            Mind Masters
          </div>
        </div>

        <div className="mt-7 sm:mt-10 pt-5 sm:pt-6 border-t border-white/[0.06] flex flex-col-reverse sm:flex-row items-center justify-between gap-3 text-[11.5px] sm:text-sm">
          <div className="text-white/40 text-center sm:text-left">
            © {new Date().getFullYear()} Mind Masters AI · All rights reserved.
          </div>
          <div className="flex items-center gap-5">
            <a href="#" className="text-white/40 hover:text-white/80 transition-colors">Privacy</a>
            <a href="#" className="text-white/40 hover:text-white/80 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
