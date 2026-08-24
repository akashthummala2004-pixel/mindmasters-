import { motion } from "framer-motion";
import { smoothTransition, smoothViewport } from "@/lib/motion-presets";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { sendInquiry } from "@/lib/inquiry.server";

const PROJECT_TYPES = ["Website", "Mobile App", "AI Solution", "SaaS Platform", "Automation System", "UI/UX Design", "Other"];
const BUDGETS = ["Under ₹50k", "₹50k – ₹2L", "₹2L – ₹10L", "₹10L+", "Not sure yet"];
const TIMELINES = ["ASAP", "Within 1 month", "1 – 3 months", "Flexible"];

const WHATSAPP_NUMBER = "918500729621";

type Status = "idle" | "sending" | "success" | "error";

export function InquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      company: String(data.get("company") || ""),
      email: String(data.get("email") || ""),
      projectType: String(data.get("projectType") || ""),
      budget: String(data.get("budget") || ""),
      timeline: String(data.get("timeline") || ""),
      requirements: String(data.get("requirements") || ""),
    };

    setStatus("sending");
    setErrorMessage("");

    try {
      await sendInquiry({ data: payload });

      const waLines = [
        `Hi Mind Masters — new inquiry from ${payload.name}.`,
        payload.company ? `Company: ${payload.company}` : "",
        `Email: ${payload.email}`,
        payload.projectType ? `Project type: ${payload.projectType}` : "",
        payload.budget ? `Budget: ${payload.budget}` : "",
        payload.timeline ? `Timeline: ${payload.timeline}` : "",
        ``,
        `Requirements:`,
        payload.requirements,
      ].filter(Boolean).join("\n");
      const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waLines)}`;
      window.open(waHref, "_blank", "noopener,noreferrer");

      setStatus("success");
      form.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <section id="contact" className="relative section-y container-x overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_30%,rgba(91,140,255,0.10),transparent_70%)]" />
        <div className="absolute -bottom-[40%] left-1/2 -translate-x-1/2 h-[55vw] w-[80vw] rounded-full" style={{ background: "radial-gradient(circle, rgba(167,139,250,0.10), transparent 60%)", filter: "blur(120px)" }} />
      </div>

      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={smoothViewport}
          transition={smoothTransition}
          className="relative card-premium overflow-hidden p-5 sm:p-10"
        >
          {/* top accent */}
          <div aria-hidden className="pointer-events-none absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-[color:var(--brand)]/60 to-transparent" />

          <div className="text-center mb-6 sm:mb-10">
            <div className="inline-flex items-center gap-2 rounded-full glass px-2.5 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-[11px] uppercase tracking-[0.20em] sm:tracking-[0.22em] text-white/60 mb-3 sm:mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand)] animate-glow-pulse" />
              Get in touch
            </div>
            <h2 className="text-[24px] sm:text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-gradient-brand leading-[1.05] text-balance">
              Tell us about your{" "}
              <span className="font-serif-display italic text-white">project</span>
            </h2>
            <p className="mt-2.5 sm:mt-3 text-[13.5px] sm:text-[15px] text-white/60 max-w-xl mx-auto leading-[1.55] sm:leading-relaxed text-pretty">
              30-minute consultation is free. Share details and we'll come prepared.
            </p>
          </div>

          {status === "success" && (
            <div
              role="status"
              className="mb-6 flex items-start gap-2.5 border border-[color:var(--success)]/30 bg-[color:var(--success)]/[0.08] text-[color:var(--success)] rounded-xl px-4 py-3 text-sm"
            >
              <Check className="h-4 w-4 mt-0.5 shrink-0" strokeWidth={2.4} />
              <span>Inquiry sent. A WhatsApp draft opened in a new tab — tap Send there to ping us too.</span>
            </div>
          )}
          {status === "error" && (
            <div
              role="alert"
              className="mb-6 border border-[color:var(--destructive)]/30 bg-[color:var(--destructive)]/[0.08] text-[color:var(--destructive)] rounded-xl px-4 py-3 text-sm"
            >
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
            <Field label="Name" name="name" required placeholder="Jane Doe" />
            <Field label="Company" name="company" placeholder="Acme Inc." />
            <Field label="Email" name="email" type="email" required placeholder="you@company.com" className="sm:col-span-2" />

            <SelectField label="Project type" name="projectType" options={PROJECT_TYPES} />
            <SelectField label="Budget" name="budget" options={BUDGETS} />
            <SelectField label="Timeline" name="timeline" options={TIMELINES} className="sm:col-span-2" />

            <div className="sm:col-span-2">
              <label className="block text-[12px] sm:text-[13px] font-medium text-white/75 mb-1.5 sm:mb-2">
                Requirements <span className="text-[color:var(--destructive)]">*</span>
              </label>
              <textarea
                name="requirements"
                rows={3}
                required
                placeholder="What are you trying to build? Who's it for?"
                suppressHydrationWarning
                className="ring-focus w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-3 sm:px-3.5 py-2.5 text-[14px] sm:text-sm text-white placeholder:text-white/30 outline-none resize-y"
              />
            </div>

            <div className="sm:col-span-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 pt-1 sm:pt-2">
              <p className="text-[12.5px] sm:text-[13px] text-white/50 order-2 sm:order-1 text-center sm:text-left">
                Or email{" "}
                <a href="mailto:mmaisolutions.pvt@gmail.com" className="text-[color:var(--brand)] hover:text-[color:var(--brand-hover)] underline underline-offset-4 decoration-[color:var(--brand)]/30 break-all">
                  mmaisolutions.pvt@gmail.com
                </a>
              </p>
              <button
                type="submit"
                disabled={status === "sending"}
                aria-busy={status === "sending"}
                suppressHydrationWarning
                className="group btn-pill-primary text-[13.5px] sm:text-sm px-5 py-2.5 disabled:opacity-70 disabled:cursor-not-allowed order-1 sm:order-2"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.4} />
                    Sending…
                  </>
                ) : status === "success" ? (
                  <>
                    <Check className="h-4 w-4" strokeWidth={2.4} />
                    Sent
                  </>
                ) : (
                  <>
                    Send inquiry
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

function Field({
  label, name, type = "text", required, placeholder, className = "",
}: {
  label: string; name: string; type?: string; required?: boolean; placeholder?: string; className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-[12px] sm:text-[13px] font-medium text-white/75 mb-1.5 sm:mb-2">
        {label}{required && <span className="text-[color:var(--destructive)] ml-0.5">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        suppressHydrationWarning
        className="ring-focus w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-3 sm:px-3.5 py-2.5 text-[14px] sm:text-sm text-white placeholder:text-white/30 outline-none"
      />
    </div>
  );
}

function SelectField({
  label, name, options, className = "",
}: {
  label: string; name: string; options: string[]; className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-[12px] sm:text-[13px] font-medium text-white/75 mb-1.5 sm:mb-2">
        {label}
      </label>
      <select
        name={name}
        defaultValue=""
        suppressHydrationWarning
        className="ring-focus w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-3 sm:px-3.5 py-2.5 text-[14px] sm:text-sm text-white outline-none appearance-none cursor-pointer"
      >
        <option value="" disabled>Select…</option>
        {options.map((o) => (<option key={o} value={o}>{o}</option>))}
      </select>
    </div>
  );
}
