import { motion } from "framer-motion";
import {
  Brain, Code2, Cloud, Smartphone, Workflow, Globe2, Sparkles, BarChart3,
} from "lucide-react";

const services = [
  { icon: Brain, title: "Artificial Intelligence", desc: "Custom LLMs, agents, RAG systems and computer vision tuned to your domain." },
  { icon: Code2, title: "Enterprise Software", desc: "Mission-critical platforms engineered for scale, security and longevity." },
  { icon: Cloud, title: "Cloud Infrastructure", desc: "Multi-cloud architecture, observability, and zero-downtime deployments." },
  { icon: Smartphone, title: "Web & Mobile Apps", desc: "Beautiful, performant products across every screen and form factor." },
  { icon: Workflow, title: "Automation Systems", desc: "Eliminate operational drag with intelligent, end-to-end workflow automation." },
  { icon: Globe2, title: "Global Marketing", desc: "Brand systems and growth engines that compound across markets." },
  { icon: Sparkles, title: "AI Consulting", desc: "From strategy to deployment — partnering with leaders on AI transformation." },
  { icon: BarChart3, title: "Data Analytics", desc: "Turn raw signal into decision-grade insight with modern data stacks." },
];

export function ServicesGrid() {
  return (
    <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((s, i) => (
        <motion.div
          key={s.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -6 }}
          className="group relative overflow-hidden rounded-2xl glass p-6"
        >
          <div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.82 0.18 210 / 0.5), oklch(0.62 0.24 300 / 0.5))",
              WebkitMask:
                "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              padding: "1px",
            }}
          />
          <div className="relative">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-aurora/10 ring-1 ring-foreground/10">
              <s.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            <div className="mt-6 flex items-center text-xs text-muted-foreground/70 group-hover:text-primary transition-colors">
              Learn more <span className="ml-1.5 transition-transform group-hover:translate-x-1">→</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
