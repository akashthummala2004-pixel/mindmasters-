import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Loader2, Check } from "lucide-react";
import contactImage from "@/assets/contact.png";
import { useState, type FormEvent } from "react";
import { fadeUp, smoothViewport } from "@/lib/motion-presets";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { WebGLBoundary } from "@/components/site/WebGLBoundary";
import { sendInquiry } from "@/lib/inquiry.server";

const WHATSAPP_NUMBER = "918500729621";

type Status = "idle" | "sending" | "success" | "error";

export function ContactSection() {
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
      requirements: String(data.get("message") || ""),
    };

    setStatus("sending");
    setErrorMessage("");

    try {
      await sendInquiry({ data: payload });

      const waLines = [
        `Hi Mind Masters — new inquiry from ${payload.name}.`,
        payload.company ? `Company: ${payload.company}` : "",
        `Email: ${payload.email}`,
        ``,
        `Message:`,
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
    <section id="contact" className="relative isolate section-y container-x overflow-hidden">
      {/* 3D Dotted Surface Background (Header only) */}
      <WebGLBoundary>
        <DottedSurface className="absolute inset-x-0 -top-16 md:-top-24 h-[400px] sm:h-[500px] -z-20 opacity-100 pointer-events-none mask-image-bottom" style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)' }} />
      </WebGLBoundary>

      {/* Background Glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute top-[20%] left-[10%] h-[40vw] w-[40vw] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.03), transparent 60%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="mx-auto max-w-3xl w-full">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 sm:mb-12 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={smoothViewport}
            className="max-w-xl"
          >
            <h2 className="text-[24px] sm:text-3xl lg:text-[36px] font-semibold tracking-tight text-white leading-[1.15] text-balance">
              Let's build something<br />Amazing together
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={smoothViewport}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="hidden md:block relative shrink-0"
          >
            <img
              src={contactImage}
              alt="Contact Support"
              width={524}
              height={524}
              loading="lazy"
              decoding="async"
              className="relative h-[260px] lg:h-[320px] w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
            />
          </motion.div>
        </div>

        {/* Form & Info Container */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={smoothViewport}
          className="flex flex-col lg:flex-row overflow-hidden rounded-3xl ring-1 ring-white/10 bg-[#0a0a0a] shadow-2xl"
        >
          {/* LEFT — Form */}
          <div className="flex-1 p-5 sm:p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-white/10">
            <form onSubmit={handleSubmit} className="space-y-4">
              {status === "success" && (
                <div
                  role="status"
                  className="flex items-start gap-2.5 rounded-xl border border-emerald-400/30 bg-emerald-400/[0.08] px-3.5 py-2.5 text-[12.5px] text-emerald-300"
                >
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={2.4} />
                  <span>Message sent. A WhatsApp draft opened in a new tab — tap Send there to reach us instantly too.</span>
                </div>
              )}
              {status === "error" && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-400/30 bg-red-400/[0.08] px-3.5 py-2.5 text-[12.5px] text-red-300"
                >
                  {errorMessage}
                </div>
              )}

              <div className="space-y-1.5">
                <label htmlFor="name" className="text-[12px] font-medium text-white/80">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Jane Smith"
                  required
                  className="w-full rounded-xl bg-white/[0.03] ring-1 ring-white/10 focus:ring-white/30 px-3.5 py-2.5 text-[13px] text-white placeholder:text-white/30 outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="text-[12px] font-medium text-white/80">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.name@gmail.com"
                  required
                  className="w-full rounded-xl bg-white/[0.03] ring-1 ring-white/10 focus:ring-white/30 px-3.5 py-2.5 text-[13px] text-white placeholder:text-white/30 outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="company" className="text-[12px] font-medium text-white/80">Company</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Apple"
                  className="w-full rounded-xl bg-white/[0.03] ring-1 ring-white/10 focus:ring-white/30 px-3.5 py-2.5 text-[13px] text-white placeholder:text-white/30 outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-[12px] font-medium text-white/80">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  placeholder="I need help with..."
                  required
                  className="w-full rounded-xl bg-white/[0.03] ring-1 ring-white/10 focus:ring-white/30 px-3.5 py-2.5 text-[13px] text-white placeholder:text-white/30 outline-none transition-all resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  aria-busy={status === "sending"}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-black ring-1 ring-white/20 px-6 py-3 text-[14px] font-semibold text-white transition-transform active:scale-95 disabled:opacity-70 hover:bg-white/5"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : status === "success" ? (
                    <>
                      <Check className="h-4 w-4" strokeWidth={2.4} />
                      Sent
                    </>
                  ) : (
                    "Get in touch"
                  )}
                </button>
                <span className="text-[12px] text-white/40 flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-3.5 h-3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  Avg. response: 24h
                </span>
              </div>
            </form>
          </div>

          {/* RIGHT — Contact Info */}
          <div className="w-full lg:w-[260px] bg-[#121212] flex flex-col">
            <div className="flex-1 p-5 sm:p-6 lg:p-8 border-b border-white/10 flex flex-col justify-center">
              <Phone className="h-4 w-4 text-white/60 mb-3" strokeWidth={1.5} />
              <div className="text-[13px] font-semibold text-white mb-1">Phone</div>
              <div className="text-[13px] text-white/55">8500729621</div>
            </div>
            
            <div className="flex-1 p-5 sm:p-6 lg:p-8 border-b border-white/10 flex flex-col justify-center">
              <Mail className="h-4 w-4 text-white/60 mb-3" strokeWidth={1.5} />
              <div className="text-[13px] font-semibold text-white mb-1">Email</div>
              <div className="text-[13px] text-white/55">mmaisolutions.pvt@gmail.com</div>
            </div>

            <div className="flex-1 p-5 sm:p-6 lg:p-8 flex flex-col justify-center">
              <MapPin className="h-4 w-4 text-white/60 mb-3" strokeWidth={1.5} />
              <div className="text-[13px] font-semibold text-white mb-1">Office</div>
              <div className="text-[13px] text-white/55">Khammam, Telangana</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
