import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { SectionHeader } from "@/components/site/Primitives";
import { smoothViewport } from "@/lib/motion-presets";

const faqs = [
  {
    q: "What types of clients do you work with?",
    a: "We specialize in AI startups, SaaS companies and tech-forward businesses. Our clients range from early-stage founders establishing brand identity to established companies modernizing their digital presence. We're particularly experienced with AI, fintech, devtools, and SaaS products.",
  },
  {
    q: "Can we start with a single page or smaller scope?",
    a: "Absolutely. We offer flexible engagement options — a single landing page, a complete website redesign or ongoing design support. Starting small is a great way to test our collaboration before committing to larger projects.",
  },
  {
    q: "How fast can you deliver?",
    a: "Typical turnaround is 1–2 weeks for a landing page and 4–6 weeks for full website projects, depending on complexity. For urgent needs we offer expedited timelines. We'll provide a detailed timeline during the initial consultation.",
  },
  {
    q: "Do you handle development too?",
    a: "Yes. We offer end-to-end design and development services and can take projects from concept to fully functional product. We work with modern stacks like React, Next.js, Tailwind CSS, Node and Python — fast, responsive, easy to maintain.",
  },
  {
    q: "Are your designs dev-ready?",
    a: "100%. Every design is created with development in mind. We deliver organized Figma files with proper component structures, design tokens and responsive specifications. The handoff process includes detailed documentation to ensure seamless implementation by any development team.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative section-y container-x bg-black overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[5%] right-[-10%] h-[40vw] w-[40vw] rounded-full" style={{ background: "radial-gradient(circle, rgba(91,140,255,0.08), transparent 60%)", filter: "blur(110px)" }} />
      </div>

      <div className="mx-auto max-w-4xl">
        <SectionHeader
          eyebrow="We've got answers"
          title={
            <>
              Frequently asked{" "}
              <span className="font-serif-display italic text-white">questions</span>
            </>
          }
          desc="Everything you need to know about working with us. Can't find your answer? Just ask."
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={smoothViewport}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 sm:mt-14"
        >
          <Accordion.Root type="single" collapsible className="space-y-2 sm:space-y-3">
            {faqs.map((item, i) => (
              <Accordion.Item
                key={i}
                value={`item-${i}`}
                className="group overflow-hidden rounded-2xl ring-1 ring-white/[0.06] bg-[linear-gradient(180deg,rgba(20,23,31,0.6),rgba(10,12,18,0.5))] hover:ring-white/[0.12] transition-colors"
              >
                <Accordion.Header asChild>
                  <Accordion.Trigger
                    className="group flex w-full items-center justify-between gap-4 text-left px-5 sm:px-7 py-4 sm:py-5 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-2xl"
                  >
                    <span className="text-[14.5px] sm:text-[16px] font-medium text-white tracking-[-0.005em] leading-snug">
                      {item.q}
                    </span>
                    <span className="relative inline-flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full ring-1 ring-white/15 bg-white/[0.04] transition-all group-data-[state=open]:bg-white group-data-[state=open]:text-black group-data-[state=open]:rotate-45">
                      <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.2} />
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="px-5 sm:px-7 pb-5 sm:pb-6 pt-0 text-[13.5px] sm:text-[15px] text-white/60 leading-[1.65] max-w-prose transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[state=closed]:opacity-0 group-data-[state=closed]:translate-y-1 group-data-[state=open]:opacity-100 group-data-[state=open]:translate-y-0">
                    {item.a}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </motion.div>
      </div>
    </section>
  );
}
