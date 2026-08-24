import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Project = {
  title: string;
  tag: string;
  desc: string;
  scope: string[];
  hue: string;
};

const projects: Project[] = [
  {
    title: "Neural Mesh Platform",
    tag: "AI Infrastructure",
    desc: "Unified inference layer routing across 40+ frontier and proprietary models with tenant-isolated pipelines.",
    scope: ["LLM Routing", "Observability", "Evals"],
    hue: "linear-gradient(135deg, oklch(0.95 0.05 80), oklch(0.85 0.12 60))",
  },
  {
    title: "Sovereign Data Pipeline",
    tag: "Enterprise · NDA",
    desc: "Realtime ingestion and governance layer processing 2.4B daily events for a global financial institution.",
    scope: ["Data Engineering", "Compliance", "Streaming"],
    hue: "linear-gradient(135deg, oklch(0.92 0.04 250), oklch(0.78 0.1 240))",
  },
  {
    title: "Realtime Agents Studio",
    tag: "Agentic Systems",
    desc: "Multi-step autonomous workflows with human-in-the-loop safety rails for an enterprise SaaS leader.",
    scope: ["Agents", "Tool Use", "HIL"],
    hue: "linear-gradient(135deg, oklch(0.93 0.05 30), oklch(0.82 0.14 20))",
  },
  {
    title: "Edge Inference Mesh",
    tag: "Healthcare · NDA",
    desc: "On-device model serving for diagnostic imaging across 120+ hospitals — sub-15ms latency.",
    scope: ["Edge ML", "Compression", "HIPAA"],
    hue: "linear-gradient(135deg, oklch(0.94 0.05 160), oklch(0.8 0.12 150))",
  },
];

export function CaseStudies() {
  return (
    <section id="showcase" className="relative py-24 md:py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Case Studies
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-foreground">
              Production systems,{" "}
              <span className="italic font-normal" style={{ fontFamily: "var(--font-serif)" }}>
                real outcomes
              </span>
              .
            </h2>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent transition-colors"
          >
            View all work <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href="#contact"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group block rounded-3xl border border-foreground/8 bg-card overflow-hidden hover:border-foreground/20 transition-all"
            >
              <div
                className="aspect-[16/10] relative overflow-hidden"
                style={{ background: p.hue }}
              >
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="absolute top-5 left-5">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-foreground/70 bg-card/70 backdrop-blur-md rounded-full px-3 py-1.5 border border-foreground/10">
                    {p.tag}
                  </span>
                </div>
                <div className="absolute bottom-5 right-5">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-foreground text-background transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    <ArrowUpRight className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                </div>
              </div>
              <div className="p-7">
                <h3 className="font-display text-2xl font-semibold tracking-[-0.02em]">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.scope.map((s) => (
                    <span key={s} className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground border border-foreground/10 rounded-full px-2.5 py-1">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
