import { motion } from "framer-motion";
import { ArrowUpRight, Globe, Layers } from "lucide-react";
import { SectionHeader } from "@/components/site/Primitives";
import { fadeUp, smoothViewport, staggerParent } from "@/lib/motion-presets";

type Project = {
  id: string;
  name: string;
  url: string;
  displayUrl: string;
  category: string;
  challenge: string;
  solution: string;
  technologies: string[];
  image: string;
  alt: string;
  tagColor: string;
};

const projects: Project[] = [
  {
    id: "94-convenience",
    name: "94 Convenience & Deli",
    url: "https://94convenience.com",
    displayUrl: "94convenience.com",
    category: "E-Commerce & Food Delivery Platform",
    challenge:
      "A local convenience store and deli in St. Peters, MO required a modern digital presence to manage food menus, delivery options, and local customer inquiries efficiently.",
    solution:
      "Mind Masters engineered a high-performance web platform featuring custom food ordering menus, DoorDash delivery integration, SNAP EBT highlights, and 24/7 store operational details.",
    technologies: ["React", "TypeScript", "DoorDash API", "Tailwind CSS", "Node.js"],
    image: "https://images.unsplash.com/photo-1556742049-0a675659e366?q=80&w=1600&auto=format&fit=crop",
    alt: "94 Convenience E-Commerce & Food Delivery Platform",
    tagColor: "text-[color:var(--brand)] bg-[color:var(--brand)]/10 border-[color:var(--brand)]/25",
  },
  {
    id: "ucovy-connects",
    name: "Ucovy Connects",
    url: "https://ucovyconnects.com",
    displayUrl: "ucovyconnects.com",
    category: "Technology Enablement & Consulting",
    challenge:
      "An enterprise technology consulting firm needed a modern digital platform to showcase intelligent business solutions, tech infrastructure services, and strategic network offerings to corporate clients.",
    solution:
      "Mind Masters developed a scalable digital enablement platform featuring custom frontend architecture, AI engine integrations, and high-availability cloud infrastructure.",
    technologies: ["Next.js", "AI Engine", "Cloud Infrastructure", "Tailwind CSS", "GraphQL"],
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1600&auto=format&fit=crop",
    alt: "Ucovy Connects Technology Enablement Platform",
    tagColor: "text-[color:var(--violet)] bg-[color:var(--violet)]/10 border-[color:var(--violet)]/25",
  },
];

export function BuildChooser() {
  return (
    <section id="initialize" className="relative section-y container-x bg-[#06070b]">
      {/* Background Ambient Glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[50vw] max-w-[1000px] bg-[radial-gradient(ellipse_at_center,rgba(91,140,255,0.08),transparent_70%)] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Our Projects"
          title={<>Live Projects Showcase</>}
          desc="Explore real-world web applications and digital platforms engineered by Mind Masters · AI for businesses and enterprises."
          align="center"
        />

        {/* 2 Live Projects Side-by-Side Grid */}
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={smoothViewport}
          className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={fadeUp}
              className="group relative rounded-3xl border border-white/10 bg-[#090a0f] overflow-hidden shadow-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[460px] sm:min-h-[500px] transition-all duration-300 hover:border-white/20 hover:shadow-[0_16px_48px_rgba(0,0,0,0.7)]"
            >
              {/* Background Image */}
              <div className="absolute inset-0 -z-10 overflow-hidden">
                <picture>
                  <source srcSet={project.image} type="image/webp" />
                  <img
                    src={project.image}
                    alt={project.alt}
                    className="absolute inset-0 h-full w-full object-cover opacity-35 transition-opacity duration-500 group-hover:opacity-50"
                  />
                </picture>
                {/* Gradient Overlays for High Contrast Text */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06070b] via-[#06070b]/85 to-black/30" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#06070b]/90 via-[#06070b]/55 to-transparent" />
              </div>

              {/* Top Status Bar */}
              <div className="flex items-center justify-between pointer-events-none z-10 mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-[11px] font-mono text-white/80">
                  <Globe className="w-3.5 h-3.5 text-[color:var(--brand)]" />
                  <span>https://{project.displayUrl}</span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active
                </span>
              </div>

              {/* Project Content */}
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider border mb-3 backdrop-blur-md ${project.tagColor}`}>
                    <Layers className="w-3.5 h-3.5" />
                    <span>{project.category}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                    {project.name}
                  </h3>

                  {/* 4-Part Narrative Format */}
                  <div className="space-y-3.5 mb-6 text-xs sm:text-sm leading-relaxed">
                    <div>
                      <span className="font-semibold text-[#74f5ff] uppercase tracking-wider text-[10.5px] block mb-1">
                        Challenge
                      </span>
                      <p className="text-white/75">{project.challenge}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-[#74f5ff] uppercase tracking-wider text-[10.5px] block mb-1">
                        Solution
                      </span>
                      <p className="text-white/75">{project.solution}</p>
                    </div>
                  </div>

                  {/* Technology Section */}
                  <div className="mb-6">
                    <span className="font-semibold text-white/90 uppercase tracking-wider text-[10.5px] block mb-2">
                      Technology
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-white/[0.08] border border-white/10 text-[10.5px] sm:text-xs font-mono text-white/85"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Result / Live Product Button */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.08] border border-white/15 text-white font-semibold text-xs sm:text-sm hover:bg-white/[0.15] hover:border-white/30 transition-all group/btn cursor-pointer"
                  >
                    <span>Visit Live Website</span>
                    <ArrowUpRight className="h-4 w-4 text-white/80 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>

                  <span className="text-xs font-mono text-white/40 group-hover:text-white/60 transition-colors">
                    {project.displayUrl}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
