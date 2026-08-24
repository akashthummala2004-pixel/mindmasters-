import { motion } from "framer-motion";

const projects = [
  { tag: "Finance · AI", title: "Atlas Risk Engine", desc: "Real-time fraud detection processing 2.4B events/day for a top-5 global bank." },
  { tag: "Healthcare", title: "Helix Clinical Copilot", desc: "Multimodal AI assistant deployed across 380 hospitals reducing chart time 47%." },
  { tag: "Logistics", title: "Meridian Orchestrator", desc: "Autonomous routing platform optimizing 1.1M shipments across 64 countries." },
  { tag: "Retail · LLM", title: "Vela Commerce Brain", desc: "Personalization layer driving +28% AOV for an enterprise omni-channel retailer." },
  { tag: "Energy", title: "Polaris Grid AI", desc: "Predictive load balancing across renewables for a continental utility operator." },
];

export function Showcase() {
  return (
    <div className="relative">
      <div className="mx-auto max-w-7xl px-6 overflow-x-auto no-scrollbar">
        <div className="flex gap-5 pb-6 snap-x snap-mandatory">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
              className="snap-start shrink-0 w-[85vw] sm:w-[520px] h-[380px] rounded-3xl glass-strong relative overflow-hidden group"
            >
              <div
                className="absolute inset-0 opacity-60 group-hover:opacity-80 transition"
                style={{
                  background:
                    i % 2
                      ? "radial-gradient(at 80% 20%, oklch(0.62 0.24 300 / 0.5), transparent 60%), radial-gradient(at 20% 80%, oklch(0.82 0.18 210 / 0.35), transparent 60%)"
                      : "radial-gradient(at 20% 20%, oklch(0.82 0.18 210 / 0.5), transparent 60%), radial-gradient(at 80% 80%, oklch(0.62 0.24 300 / 0.35), transparent 60%)",
                }}
              />
              {/* Mock dashboard chrome */}
              <div className="relative h-full p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-foreground/30" />
                    <span className="h-2 w-2 rounded-full bg-foreground/30" />
                    <span className="h-2 w-2 rounded-full bg-foreground/30" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{p.tag}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 6 }).map((_, k) => (
                    <div key={k} className="h-16 rounded-lg glass border-foreground/5 overflow-hidden relative">
                      <div className="absolute bottom-0 inset-x-0 bg-aurora opacity-70" style={{ height: `${30 + ((k * 17) % 50)}%` }} />
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground max-w-md">{p.desc}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{scrollbar-width:none}`}</style>
    </div>
  );
}
