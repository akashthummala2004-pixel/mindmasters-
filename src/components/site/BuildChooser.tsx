import { motion } from "framer-motion";
import { ArrowUpRight, Globe } from "lucide-react";
import { SectionHeader } from "@/components/site/Primitives";
import { fadeUp, smoothViewport, staggerParent } from "@/lib/motion-presets";

type Project = {
  id: string;
  name: string;
  url: string;
  displayUrl: string;
  category: string;
  whatWeBuilt: string;
  keyFeatures: string[];
  technologies: string[];
  image: string;
  alt: string;
  tagColor: string;
  objectPosition: string;
};

const projects: Project[] = [
  {
    id: "94-convenience",
    name: "94 Convenience & Deli",
    url: "https://94convenience.com",
    displayUrl: "94convenience.com",
    category: "E-commerce & Food Delivery",
    whatWeBuilt:
      "A modern ordering platform for a local convenience store and deli, enabling customers to explore food, order online and access delivery services.",
    keyFeatures: ["Online Ordering", "DoorDash Integration", "Mobile Responsive"],
    technologies: ["React", "TypeScript", "DoorDash API", "Tailwind CSS", "Node.js"],
    image: "/94convenience-ui.jpg",
    alt: "94 Convenience & Deli Homepage Hero Preview",
    tagColor: "text-[color:var(--brand)] bg-[color:var(--brand)]/10 border-[color:var(--brand)]/25",
    objectPosition: "80% 5%",
  },
  {
    id: "ucovy-connects",
    name: "Ucovy Connects",
    url: "https://ucovyconnects.com",
    displayUrl: "ucovyconnects.com",
    category: "Technology & Consulting",
    whatWeBuilt:
      "A professional corporate website showcasing technology consulting, digital solutions and business services.",
    keyFeatures: ["Service Showcase", "Responsive Design", "Modern UI"],
    technologies: ["Next.js", "Tailwind CSS", "Cloud Infrastructure"],
    image: "/ucovyconnects-ui.jpg",
    alt: "Ucovy Connects Homepage Hero Preview",
    tagColor: "text-[color:var(--violet)] bg-[color:var(--violet)]/10 border-[color:var(--violet)]/25",
    objectPosition: "center 0%",
  },
  {
    id: "pack-ur-bag",
    name: "PackUrBag",
    url: "https://packurbag.in",
    displayUrl: "packurbag.in",
    category: "Travel & Tourism Platform",
    whatWeBuilt:
      "A travel booking and vacation packages platform enabling users to explore destinations, curate custom itineraries, and book tour experiences online.",
    keyFeatures: ["Package Booking", "Custom Itineraries", "Seamless Checkout", "Mobile Responsive"],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Payment API"],
    image: "/packurbag-ui.jpg",
    alt: "PackUrBag Travel Search Hero UI Preview",
    tagColor: "text-[#74f5ff] bg-[#74f5ff]/10 border-[#74f5ff]/25",
    objectPosition: "center 0%",
  },
];

export function BuildChooser() {
  return (
    <section id="initialize" className="relative section-y container-x bg-[#06070b] overflow-hidden">
      {/* Background Ambient Glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[50vw] max-w-[1000px] bg-[radial-gradient(ellipse_at_center,rgba(91,140,255,0.08),transparent_70%)] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Our Projects"
          title={<>Live Projects Showcase</>}
          desc="Explore real-world web applications and digital platforms engineered by Mind Masters · AI for businesses and enterprises."
          align="center"
        />

        {/* Live Projects Grid */}
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={smoothViewport}
          className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={fadeUp}
              className="group relative rounded-3xl border border-white/10 bg-[#0a0c10] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-white/25 hover:bg-[#0e1016] shadow-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] h-full"
            >
              {/* Card Content */}
              <div className="flex flex-col justify-between h-full">
                {/* Top Status Bar */}
                <div className="flex items-center justify-between pointer-events-none mb-5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-[11px] font-mono text-white/90">
                    <Globe className="w-3.5 h-3.5 text-[color:var(--brand)]" />
                    <span>https://{project.displayUrl}</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Active
                  </span>
                </div>

                {/* Project Details */}
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4 drop-shadow-md">
                      {project.name}
                    </h3>

                    {/* What We Built Section */}
                    <div className="mb-4">
                      <span className="font-semibold text-[#74f5ff] uppercase tracking-wider text-[10.5px] block mb-1">
                        WHAT WE BUILT
                      </span>
                      <p className="text-white/90 text-xs sm:text-sm leading-relaxed drop-shadow-sm font-medium">
                        {project.whatWeBuilt}
                      </p>
                    </div>

                    {/* Key Features Section */}
                    <div className="mb-5">
                      <span className="font-semibold text-[#74f5ff] uppercase tracking-wider text-[10.5px] block mb-2">
                        KEY FEATURES
                      </span>
                      <ul className="flex flex-wrap gap-2">
                        {project.keyFeatures.map((feature) => (
                          <li
                            key={feature}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/50 border border-white/15 text-xs font-medium text-white/95 backdrop-blur-md shadow-sm"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#74f5ff]" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technology Section */}
                    <div className="mb-6">
                      <span className="font-semibold text-white/70 uppercase tracking-wider text-[10.5px] block mb-2">
                        TECHNOLOGY
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md bg-black/60 border border-white/15 text-[10.5px] sm:text-xs font-mono text-white/90 backdrop-blur-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Result / Live Product Button */}
                  <div className="pt-4 border-t border-white/15 flex items-center justify-between">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/70 border border-white/20 text-white font-semibold text-xs sm:text-sm hover:bg-white hover:text-black transition-all group/btn cursor-pointer shadow-md"
                    >
                      <span>Visit Live Website</span>
                      <ArrowUpRight className="h-4 w-4 text-white/80 group-hover/btn:text-black group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>

                    <span className="text-xs font-mono text-white/60 group-hover:text-white/90 transition-colors">
                      {project.displayUrl}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
