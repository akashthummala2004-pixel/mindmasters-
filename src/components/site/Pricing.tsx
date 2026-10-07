import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { fadeUp, smoothViewport, staggerParent } from "@/lib/motion-presets";
import { SectionHeader } from "@/components/site/Primitives";

type Service = "design" | "development" | "design-dev";
type Speed = "fast" | "medium" | "regular";

const serviceOptions: { id: Service; label: string }[] = [
  { id: "design", label: "Only Design" },
  { id: "development", label: "Only Development" },
  { id: "design-dev", label: "Design + Development" },
];

const speedOptions: { id: Speed; label: string; surcharge: number; note: string }[] = [
  { id: "fast", label: "Within 7 Days", surcharge: 100, note: "+$100/page" },
  { id: "medium", label: "Within 14 Days", surcharge: 25, note: "+$25/page" },
  { id: "regular", label: "Regular Speed (Based on discussion)", surcharge: 0, note: "" },
];

const SERVICE_BASE: Record<Service, number> = {
  design: 99,
  development: 149,
  "design-dev": 299,
};

const SERVICE_PER_PAGE: Record<Service, number> = {
  design: 50,
  development: 100,
  "design-dev": 200,
};

export function Pricing() {
  const [service, setService] = useState<Service>("design-dev");
  const [pages, setPages] = useState(3);
  const [contentHelp, setContentHelp] = useState(false);
  const [seo, setSeo] = useState(false);
  const [speed, setSpeed] = useState<Speed>("regular");

  const estimated = useMemo(() => {
    const base = SERVICE_BASE[service];
    const perPage = SERVICE_PER_PAGE[service];
    const addOnPerPage = (contentHelp ? 50 : 0) + (seo ? 50 : 0);
    const speedPerPage = speedOptions.find((s) => s.id === speed)?.surcharge ?? 0;
    return base + pages * (perPage + addOnPerPage + speedPerPage);
  }, [service, pages, contentHelp, seo, speed]);

  const sliderPct = ((pages - 1) / 29) * 100;

  return (
    <section id="pricing" className="relative section-y container-x overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute top-[10%] right-[-15%] h-[55vw] w-[55vw] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(167,139,250,0.12), transparent 60%)",
            filter: "blur(120px)",
          }}
        />
      </div>

      <div className="mx-auto max-w-5xl w-full">
        <SectionHeader
          eyebrow="Pricing"
          title="Flexible pricing for every stage. Try our project estimation calculator."
          titleClassName="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-semibold tracking-tight leading-tight text-gradient-brand text-balance"
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={smoothViewport}
          className="mt-8 lg:mt-10 flex flex-col lg:flex-row overflow-hidden rounded-2xl ring-1 ring-white/10 bg-[#0a0a0a]"
        >
          {/* LEFT — input panel */}
          <div className="flex-1 p-5 lg:p-6 border-b lg:border-b-0 lg:border-r border-white/10">
            {/* Service */}
            <fieldset>
              <legend className="text-[14px] sm:text-[15px] font-semibold text-white mb-2">
                What kind of service do you need?
              </legend>
              <div className="space-y-1">
                {serviceOptions.map((opt) => (
                  <RadioRow
                    key={opt.id}
                    name="service"
                    checked={service === opt.id}
                    onChange={() => setService(opt.id)}
                    label={opt.label}
                  />
                ))}
              </div>
            </fieldset>

            <div className="my-4 sm:my-5 h-px bg-white/[0.06]" />

            {/* Pages slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="pages-slider" className="text-[14px] sm:text-[15px] font-semibold text-white">
                  Select number of pages:
                </label>
                <span className="text-[18px] sm:text-[20px] font-semibold tracking-tight text-[#ef4444] tabular-nums">
                  {pages}
                </span>
              </div>
              <div className="relative flex items-center h-6">
                <div className="absolute inset-x-0 h-1 rounded-full bg-white/10 pointer-events-none">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-white"
                    style={{ width: `${sliderPct}%` }}
                  />
                </div>
                <input
                  id="pages-slider"
                  type="range"
                  min={1}
                  max={30}
                  value={pages}
                  onChange={(e) => setPages(Number(e.target.value))}
                  className="pricing-range absolute inset-0 w-full h-full cursor-pointer appearance-none bg-transparent"
                  aria-label="Number of pages"
                />
              </div>
              <div className="mt-2 flex justify-between text-[11.5px] text-white/45 font-mono">
                <span>1</span>
                <span>30</span>
              </div>
            </div>

            <div className="my-4 sm:my-5 h-px bg-white/[0.06]" />

            {/* Add-ons */}
            <div>
              <div className="text-[14px] sm:text-[15px] font-semibold text-white mb-2">
                Add-ons:
              </div>
              <div className="space-y-1">
                <CheckRow
                  checked={contentHelp}
                  onChange={() => setContentHelp((v) => !v)}
                  label="I will need help with content"
                  price="+$50/page"
                />
                <CheckRow
                  checked={seo}
                  onChange={() => setSeo((v) => !v)}
                  label="I want to optimize my website for SEO"
                  price="+$50/page"
                />
              </div>
            </div>

            <div className="my-4 sm:my-5 h-px bg-white/[0.06]" />

            {/* Speed */}
            <fieldset>
              <legend className="text-[14px] sm:text-[15px] font-semibold text-white mb-2">
                How fast do you need this?
              </legend>
              <div className="space-y-1">
                {speedOptions.map((opt) => (
                  <RadioRow
                    key={opt.id}
                    name="speed"
                    checked={speed === opt.id}
                    onChange={() => setSpeed(opt.id)}
                    label={opt.label}
                    price={opt.note}
                  />
                ))}
              </div>
            </fieldset>
          </div>

          {/* RIGHT — estimated cost panel */}
          <div className="flex-1 bg-[#141414] p-5 lg:p-6 flex flex-col">
            <h3 className="text-[14px] sm:text-[15px] font-semibold text-white">Estimated Cost</h3>
            <p className="mt-1 text-[12px] sm:text-[13px] text-white/55 leading-relaxed max-w-md">
              This is an instant estimation to give you an idea how much you can save with us.
            </p>

            <div className="mt-3 sm:mt-4 space-y-2">
              <ComparisonCard
                title="Typical Agency charges minimum"
                price="$10,000"
                note="+ Too much extra time & additional cost"
              />
              <ComparisonCard
                title="Regular Freelancer charges minimum"
                price="$4,000"
                note="+ Too much headache & back-and-forth"
              />
              <ComparisonCard
                title="With Mind Masters"
                price={`$${estimated.toLocaleString()}`}
                note="Save your money, time & headache"
                highlight
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Slider thumb styling */}
      <style>{`
        .pricing-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 18px;
          width: 18px;
          border-radius: 9999px;
          background: #ffffff;
          border: 3px solid #000000;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.2);
          cursor: pointer;
          margin-top: -7px;
        }
        .pricing-range::-moz-range-thumb {
          height: 18px;
          width: 18px;
          border-radius: 9999px;
          background: #ffffff;
          border: 3px solid #000000;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.2);
          cursor: pointer;
        }
        .pricing-range::-webkit-slider-runnable-track,
        .pricing-range::-moz-range-track {
          background: transparent;
          height: 4px;
        }
        .pricing-range:focus { outline: none; }
      `}</style>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   RADIO ROW
   ──────────────────────────────────────────────────────────────────────── */
function RadioRow({
  name,
  checked,
  onChange,
  label,
  price,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  label: string;
  price?: string;
}) {
  return (
    <label className="group flex items-center justify-between gap-3 cursor-pointer select-none">
      <span className="flex items-center gap-2.5 sm:gap-3">
        <span
          className={`relative inline-flex h-[18px] w-[18px] items-center justify-center rounded-full ring-1 transition-colors ${
            checked
              ? "ring-[#ef4444] bg-[#ef4444]/10"
              : "ring-white/25 group-hover:ring-white/45"
          }`}
        >
          {checked && <span className="h-2 w-2 rounded-full bg-[#ef4444]" />}
        </span>
        <input
          type="radio"
          name={name}
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <span
          className={`text-[13.5px] sm:text-[14px] transition-colors ${
            checked ? "text-white" : "text-white/75 group-hover:text-white"
          }`}
        >
          {label}
        </span>
      </span>
      {price && (
        <span className="text-[12.5px] sm:text-[13px] text-[#ef4444] font-medium tabular-nums shrink-0">
          {price}
        </span>
      )}
    </label>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   CHECKBOX ROW
   ──────────────────────────────────────────────────────────────────────── */
function CheckRow({
  checked,
  onChange,
  label,
  price,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  price: string;
}) {
  return (
    <label className="group flex items-center justify-between gap-3 cursor-pointer select-none">
      <span className="flex items-center gap-2.5 sm:gap-3">
        <span
          className={`relative inline-flex h-[18px] w-[18px] items-center justify-center rounded-[5px] ring-1 transition-colors ${
            checked
              ? "ring-[#ef4444] bg-[#ef4444]"
              : "ring-white/25 group-hover:ring-white/45"
          }`}
        >
          {checked && (
            <svg viewBox="0 0 12 12" className="h-3 w-3 text-white">
              <path
                d="M2 6.5l2.5 2.5L10 3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <span
          className={`text-[13.5px] sm:text-[14px] transition-colors ${
            checked ? "text-white" : "text-white/75 group-hover:text-white"
          }`}
        >
          {label}
        </span>
      </span>
      <span className="text-[12.5px] sm:text-[13px] text-[#ef4444] font-medium tabular-nums shrink-0">
        {price}
      </span>
    </label>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   COMPARISON CARD
   ──────────────────────────────────────────────────────────────────────── */
function ComparisonCard({
  title,
  price,
  note,
  highlight,
}: {
  title: string;
  price: string;
  note: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl p-3 sm:p-4 ring-1 ${
        highlight
          ? "bg-[linear-gradient(180deg,#1a1e2c,#0e1119)] ring-white/[0.12]"
          : "bg-[#1c1c1c] ring-white/[0.06]"
      }`}
    >
      {highlight && (
        <div aria-hidden className="absolute inset-0 pointer-events-none opacity-50">
          <div
            className="absolute inset-0"
            style={{
              background:
                "repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 14px), repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 14px)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 80% at 80% 50%, rgba(255,255,255,0.10), transparent 60%)",
            }}
          />
          {/* sparkle dots */}
          <div className="absolute right-6 top-4 h-1 w-1 rounded-full bg-white/70" />
          <div className="absolute right-16 top-10 h-[3px] w-[3px] rounded-full bg-white/40" />
          <div className="absolute right-10 top-16 h-[2px] w-[2px] rounded-full bg-white/60" />
          <div className="absolute right-24 top-7 h-1 w-1 rounded-full bg-white/30" />
          <div className="absolute right-4 top-20 h-[2px] w-[2px] rounded-full bg-white/50" />
        </div>
      )}
      <div className="relative">
        <div className="text-[12.5px] sm:text-[13px] font-semibold text-white">{title}</div>
        <div
          className={`mt-0.5 text-[20px] sm:text-[24px] font-semibold tracking-[-0.02em] leading-none tabular-nums ${
            highlight ? "text-white/85" : "text-white"
          }`}
        >
          {price}
        </div>
        <div className="mt-1 text-[11px] sm:text-[11.5px] text-white/55">{note}</div>
      </div>
    </div>
  );
}
