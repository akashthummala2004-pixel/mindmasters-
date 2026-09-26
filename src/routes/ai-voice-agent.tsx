import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Code2,
  Headphones,
  MessageCircle,
  Mic,
  MicOff,
  Pause,
  Play,
  PhoneOff,
  PhoneCall,
  RefreshCw,
  Sparkles,
  UserCheck,
  Workflow,
} from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { MouseGlow } from "@/components/site/MouseGlow";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { MobileBottomNav } from "@/components/site/MobileBottomNav";
import { useCalModal } from "@/components/site/CalModalContext";
import { smoothTransition, fadeUp, staggerParent, smoothViewport } from "@/lib/motion-presets";
import { createBreadcrumbSchema, SITE_URL, COMPANY_NAME } from "@/lib/seo-schemas";

type VoiceStatus = "idle" | "listening" | "paused" | "processing" | "speaking";

const capabilities = [
  {
    icon: <Headphones />,
    title: "Customer Support",
    description:
      "Handle common customer questions and provide immediate voice assistance.",
  },
  {
    icon: <UserCheck />,
    title: "Lead Qualification",
    description:
      "Ask relevant questions, understand customer intent and capture qualified leads.",
  },
  {
    icon: <CalendarDays />,
    title: "Appointment Booking",
    description:
      "Help customers check availability and schedule meetings or appointments.",
  },
  {
    icon: <PhoneCall />,
    title: "Inbound Enquiries",
    description:
      "Respond naturally to incoming business enquiries and guide customers.",
  },
  {
    icon: <RefreshCw />,
    title: "Follow-Ups",
    description:
      "Support structured follow-up conversations based on your business workflow.",
  },
  {
    icon: <Clock3 />,
    title: "Always Available",
    description:
      "Create a voice experience that can support customers beyond normal working hours.",
  },
];

const useCases = [
  "Customer Support",
  "Lead Qualification",
  "Appointment Booking",
  "Product Enquiries",
  "Customer Follow-Ups",
  "Service Assistance",
];

const features = [
  "Natural voice interaction",
  "Context-aware conversations",
  "Multi-turn dialogue",
  "Real-time responses",
  "Business-specific knowledge",
  "Workflow integration",
];

const integrations = [
  {
    icon: <Code2 />,
    title: "Website",
    description: "Embed the voice experience directly into your web application.",
  },
  {
    icon: <Workflow />,
    title: "Business Workflows",
    description: "Connect conversations with your existing operational workflows.",
  },
  {
    icon: <CalendarDays />,
    title: "Calendar",
    description: "Connect supported scheduling workflows for appointments.",
  },
  {
    icon: <MessageCircle />,
    title: "Communication",
    description: "Integrate supported communication channels when required.",
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center justify-center gap-4">
      <span className="h-[3px] w-9 rounded-full bg-[#3987ff]" />
      <span className="text-[11px] uppercase tracking-[0.38em] text-[#6ba7ff]">
        {children}
      </span>
    </div>
  );
}

function CapabilityCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactElement<any>;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-[24px] border border-white/[0.08] bg-white/[0.025] p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-400/20 hover:bg-white/[0.04]">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-blue-400/20 bg-blue-500/[0.06] text-[#67a5ff]">
        {React.cloneElement(icon, { size: 23 } as any)}
      </div>

      <h3 className="mt-6 text-[21px] font-medium text-white">{title}</h3>

      <p className="mt-3 text-[15px] leading-7 text-white/50">{description}</p>
    </div>
  );
}

function ProcessStep({
  number,
  icon,
  title,
  description,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="relative z-10 text-center">
      <span className="text-xs font-mono tracking-[0.25em] text-white/25">
        {number}
      </span>

      <div className="mx-auto mt-5 flex h-24 w-24 items-center justify-center rounded-full border border-blue-400/20 bg-[#080d18] text-[#69a7ff] shadow-[0_0_40px_rgba(59,130,246,0.09)]">
        {icon}
      </div>

      <h3 className="mt-7 text-[22px] font-medium">{title}</h3>

      <p className="mx-auto mt-3 max-w-[320px] text-[15px] leading-7 text-white/45">
        {description}
      </p>
    </div>
  );
}

function Waveform({ className = "" }: { className?: string }) {
  const heights = [
    7, 12, 22, 35, 17, 44, 26, 55, 31, 18, 39, 24, 13, 30, 18,
  ];

  return (
    <div className={`items-center gap-[4px] ${className}`}>
      {heights.map((height, index) => (
        <span
          key={index}
          className="w-[3px] rounded-full bg-gradient-to-t from-[#356ed0] via-[#5696ff] to-[#c88f69]"
          style={{ height }}
        />
      ))}
    </div>
  );
}

const aiVoiceBreadcrumb = createBreadcrumbSchema([
  { name: "Home", url: `${SITE_URL}/` },
  { name: "AI Voice Agent", url: `${SITE_URL}/ai-voice-agent` },
]);

export const Route = createFileRoute("/ai-voice-agent")({
  head: () => ({
    meta: [
      { title: `AI Voice Agent Experience | ${COMPANY_NAME}` },
      {
        name: "description",
        content:
          "Talk to Intelligence. Built for real business. Mind Masters AI-powered voice interactions handle customer support, qualify leads, and automate conversations.",
      },
      {
        name: "keywords",
        content:
          "AI voice agent, conversational AI, automated phone support, lead qualification voice bot, appointment booking AI, Mind Masters AI",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: `AI Voice Agent Experience | ${COMPANY_NAME}` },
      {
        property: "og:description",
        content:
          "Talk to Intelligence. Built for real business. Mind Masters AI-powered voice interactions handle customer support, qualify leads, and automate conversations.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/ai-voice-agent` },
      { property: "og:image", content: `${SITE_URL}/companylogo.png` },
      { property: "og:site_name", content: COMPANY_NAME },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/ai-voice-agent` }],
  }),
  component: AIVoiceAgentPage,
});

function AIVoiceAgentPage() {
  const { openCalModal } = useCalModal();
  const [status, setStatus] = useState<VoiceStatus>("idle");
  const [seconds, setSeconds] = useState(0);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (status !== "listening") return;

    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [status]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");

    const sec = (time % 60).toString().padStart(2, "0");

    return `${minutes}:${sec}`;
  };

  const startCall = () => {
    setStatus("listening");
  };

  const endCall = () => {
    setStatus("idle");
    setSeconds(0);
  };

  const handleTryVoiceAgent = () => {
    if (status === "idle") {
      setStatus("listening");
    }
    const el = document.getElementById("interactive-voice-agent");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const statusLabel: Record<VoiceStatus, string> = {
    idle: "Ready to talk",
    listening: "Listening...",
    paused: "Paused",
    processing: "Understanding...",
    speaking: "Speaking...",
  };

  const bars = [
    12, 22, 34, 48, 28, 60, 38, 76, 48, 30, 52, 68, 32, 42, 72, 54, 38,
    24, 44, 62, 36, 25,
  ];

  return (
    <MotionConfig reducedMotion="user" transition={smoothTransition}>
      <div className="min-h-screen overflow-hidden bg-[#05070d] text-white flex flex-col justify-between">
        {/* Inject JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aiVoiceBreadcrumb) }}
        />

        <MouseGlow />
        <Navbar />

        <main className="relative overflow-hidden bg-[#05070d] text-white pt-[72px] flex-1">
          {/* BACKGROUND */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-[200px] top-[80px] h-[700px] w-[700px] rounded-full bg-blue-700/[0.10] blur-[160px]" />
            <div className="absolute -right-[100px] top-[150px] h-[500px] w-[500px] rounded-full bg-orange-500/[0.035] blur-[150px]" />

            <div className="absolute -left-[300px] top-[150px] h-[620px] w-[900px] rotate-[20deg] rounded-[50%] border border-blue-400/[0.08]" />
            <div className="absolute -left-[170px] top-[330px] h-[470px] w-[800px] rotate-[12deg] rounded-[50%] border border-violet-400/[0.08]" />
          </div>

          <motion.section
            initial="hidden"
            animate="show"
            viewport={smoothViewport}
            variants={staggerParent}
            className="relative mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-10 px-6 pt-12 sm:pt-16 lg:pt-16 xl:pt-20 pb-6 sm:pb-8 lg:grid-cols-[46%_54%] lg:px-10 xl:px-14"
          >
            {/* LEFT IMAGE */}
            <motion.div variants={fadeUp} className="relative hidden h-[620px] overflow-hidden lg:block -mt-6">
              <div
                className="relative h-full w-full"
                style={{
                  WebkitMaskImage: "radial-gradient(ellipse 82% 80% at 48% 44%, black 35%, transparent 95%)",
                  maskImage: "radial-gradient(ellipse 82% 80% at 48% 44%, black 35%, transparent 95%)",
                }}
              >
                <img
                  src="/images/ai-voice-human.png"
                  alt="AI Voice Agent"
                  className="absolute inset-0 h-full w-full object-cover object-[45%_48%] scale-[1.05]"
                />

                {/* blend image into website */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#05070d]" />
                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#05070d] to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#05070d] to-transparent" />
                <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#05070d]/80 to-transparent" />
              </div>
            </motion.div>

            {/* RIGHT SIDE CONTENT */}
            <motion.div variants={fadeUp} className="relative z-10 flex flex-col justify-center">
              <div className="flex items-center gap-4">
                <span className="h-[3px] w-10 rounded-full bg-blue-500" />

                <span className="text-[11px] tracking-[0.35em] text-gray-400 font-semibold uppercase">
                  AI VOICE AGENT EXPERIENCE
                </span>
              </div>

              <h1 className="mt-6 max-w-[790px] text-[48px] font-bold leading-[1.02] tracking-[-0.04em] sm:text-[58px] xl:text-[68px]">
                Talk to Intelligence.
                <br />

                <span className="bg-gradient-to-r from-[#3b82f6] via-[#8b70e8] to-[#e5a56f] bg-clip-text text-transparent">
                  Built for Real Business.
                </span>
              </h1>

              <p className="mt-6 max-w-[760px] text-[17px] leading-7 text-gray-400 xl:text-[18px]">
                AI-powered voice interactions that sound human, solve real problems
                and support business growth. Handle customer support, qualify
                leads, book appointments and automate routine conversations.
              </p>

              {/* CTA */}
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={handleTryVoiceAgent}
                  className="group flex min-w-[290px] items-center justify-center gap-7 rounded-full border border-blue-400/30 bg-gradient-to-r from-[#1658dd] via-[#3b70df] to-[#c69b6d] px-8 py-4 text-[17px] font-medium shadow-[0_0_30px_rgba(59,130,246,0.14)] transition hover:scale-[1.015] cursor-pointer"
                >
                  <span>Try Our AI Voice Agent</span>

                  <ArrowRight
                    size={20}
                    className="transition group-hover:translate-x-1"
                  />
                </button>

                <button
                  type="button"
                  onClick={() => openCalModal()}
                  className="group flex min-w-[230px] items-center justify-center gap-7 rounded-full border border-white/[0.14] bg-white/[0.015] px-8 py-4 text-[17px] transition hover:bg-white/[0.04] cursor-pointer"
                >
                  <span>Schedule Demo</span>

                  <ArrowRight
                    size={20}
                    className="transition group-hover:translate-x-1"
                  />
                </button>
              </div>
            </motion.div>
          </motion.section>

          {/* INTERACTIVE VOICE AGENT SECTION */}
          <section id="interactive-voice-agent" className="relative z-10 mx-auto max-w-[1200px] px-6 pt-10 sm:pt-12 pb-16 sm:pb-20 border-t border-white/[0.06]">
            <div className="text-center mb-10">
              <span className="text-[11px] tracking-[0.35em] text-blue-400 font-semibold uppercase">
                INTERACTIVE DEMO
              </span>
              <h2 className="mt-3 text-[36px] sm:text-[44px] font-bold text-white tracking-tight">
                Experience Mind Masters AI Voice
              </h2>
              <p className="mt-2 text-[16px] text-gray-400 max-w-[600px] mx-auto">
                Test real-time conversational intelligence with voice commands below.
              </p>
            </div>

            <div className="rounded-[32px] border border-white/[0.10] bg-[#080c16]/90 p-8 sm:p-12 shadow-[0_25px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl">
              <div className="grid items-center gap-8 md:grid-cols-[240px_1fr]">
                {/* MIC */}
                <button
                  type="button"
                  onClick={startCall}
                  aria-label="Start voice interaction"
                  className={`relative mx-auto flex h-[190px] w-[190px] items-center justify-center rounded-full border transition-all duration-500 cursor-pointer ${
                    status === "listening"
                      ? "border-blue-400/50 bg-blue-500/[0.08] shadow-[0_0_60px_rgba(59,130,246,0.25)]"
                      : "border-white/[0.13] bg-white/[0.02]"
                  }`}
                >
                  <span className="absolute inset-4 rounded-full border border-blue-400/20" />
                  <span className="absolute inset-8 rounded-full border border-violet-400/15" />

                  <div className="absolute bottom-5 right-2 h-14 w-14 rounded-full bg-orange-400/[0.10] blur-xl" />

                  {muted ? (
                    <MicOff size={50} className="relative z-10 text-gray-400" />
                  ) : (
                    <Mic size={50} className="relative z-10 text-blue-300" />
                  )}
                </button>

                {/* STATUS & WAVEFORM */}
                <div>
                  <div className="flex items-start justify-between gap-5 flex-wrap sm:flex-nowrap">
                    <div>
                      <p className="text-[11px] tracking-[0.3em] text-blue-400 font-semibold uppercase">
                        AI VOICE AGENT
                      </p>

                      <h3 className="mt-2 text-[32px] sm:text-[38px] font-semibold text-white">
                        {statusLabel[status]}
                      </h3>

                      <p className="mt-1 text-[15px] text-gray-400">
                        Speak naturally or select a prompt below. I&apos;m listening.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-300">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          status === "listening"
                            ? "bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]"
                            : "bg-gray-500"
                        }`}
                      />
                      <span className="font-mono">{formatTime(seconds)}</span>
                    </div>
                  </div>

                  {/* WAVEFORM */}
                  <div className="mt-6 flex h-[65px] items-center gap-[4px]">
                    {bars.map((height, i) => (
                      <span
                        key={i}
                        style={{
                          height:
                            status === "listening"
                              ? `${height}px`
                              : `${Math.max(6, height / 5)}px`,
                        }}
                        className="w-[3.5px] rounded-full bg-gradient-to-t from-[#2754a7] via-[#4f8fff] to-[#d29264] transition-all duration-300"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* CONTROLS */}
              <div className="mt-8 flex justify-center gap-8 border-t border-white/[0.07] pt-6">
                <Control
                  label={muted ? "Unmute" : "Mute"}
                  onClick={() => setMuted(!muted)}
                  icon={muted ? <MicOff size={20} /> : <Mic size={20} />}
                />

                <Control
                  label={status === "paused" ? "Resume" : "Pause"}
                  onClick={() =>
                    setStatus((s) => (s === "paused" ? "listening" : "paused"))
                  }
                  icon={
                    status === "paused" ? (
                      <Play size={20} />
                    ) : (
                      <Pause size={20} />
                    )
                  }
                />

                <Control
                  label="End Call"
                  onClick={endCall}
                  danger
                  icon={<PhoneOff size={20} />}
                />
              </div>

              {/* SUGGESTION PILLS */}
              <div className="mt-8 pt-6 border-t border-white/[0.05]">
                <p className="text-center text-xs tracking-wider text-gray-500 uppercase font-semibold mb-3">
                  Try saying
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  {[
                    "Tell me about your services",
                    "I want to build an AI solution",
                    "Can I schedule a meeting?",
                    "I need help with my project",
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => {
                        startCall();
                      }}
                      className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-xs sm:text-sm text-gray-300 hover:border-blue-400/40 hover:bg-white/[0.06] hover:text-white transition cursor-pointer"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* =======================================================
              SECTION 3 — CAPABILITIES
          ======================================================= */}
          <section className="relative border-t border-white/[0.06] px-6 py-24">
            <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-blue-700/[0.06] blur-[140px]" />

            <div className="relative mx-auto max-w-[1400px]">
              <SectionLabel>VOICE AGENT CAPABILITIES</SectionLabel>

              <h2 className="mx-auto max-w-[850px] text-center text-[42px] font-semibold leading-tight tracking-[-0.03em] md:text-[56px]">
                One Voice Agent.
                <br />
                <span className="text-white/55">
                  Multiple Business Conversations.
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-[700px] text-center text-[17px] leading-8 text-white/50">
                Configure the AI Voice Agent around the conversations and workflows
                that matter to your business.
              </p>

              <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {capabilities.map((item) => (
                  <CapabilityCard key={item.title} {...item} />
                ))}
              </div>
            </div>
          </section>

          {/* =======================================================
              SECTION 4 — HOW IT WORKS
          ======================================================= */}
          <section className="relative px-6 py-24 border-t border-white/[0.05]">
            <div className="mx-auto max-w-[1400px]">
              <SectionLabel>HOW IT WORKS</SectionLabel>

              <h2 className="text-center text-[42px] font-semibold tracking-[-0.03em] md:text-[56px]">
                From Conversation to Action.
              </h2>

              <p className="mx-auto mt-5 max-w-[650px] text-center text-[17px] leading-8 text-white/50">
                A simple conversational flow designed around your business process.
              </p>

              <div className="relative mt-20 grid gap-6 lg:grid-cols-3">
                {/* connecting line */}
                <div className="absolute left-[16%] right-[16%] top-[72px] hidden h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent lg:block" />

                <ProcessStep
                  number="01"
                  icon={<Mic size={27} />}
                  title="Customer Speaks"
                  description="The customer talks naturally with the AI Voice Agent."
                />

                <ProcessStep
                  number="02"
                  icon={<Sparkles size={27} />}
                  title="AI Understands"
                  description="The agent interprets the request, context and conversational intent."
                />

                <ProcessStep
                  number="03"
                  icon={<Workflow size={27} />}
                  title="Business Action"
                  description="The conversation can trigger the appropriate supported workflow or next step."
                />
              </div>
            </div>
          </section>

          {/* =======================================================
              SECTION 5 — USE CASES
          ======================================================= */}
          <section className="relative px-6 py-24 border-t border-white/[0.05]">
            <div className="pointer-events-none absolute right-[-200px] top-20 h-[500px] w-[500px] rounded-full bg-violet-600/[0.045] blur-[150px]" />

            <div className="relative mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <div className="mb-5 flex items-center gap-4">
                  <span className="h-[3px] w-9 bg-[#3987ff]" />
                  <span className="text-[11px] tracking-[0.38em] text-[#6ba7ff]">
                    BUSINESS USE CASES
                  </span>
                </div>

                <h2 className="text-[43px] font-semibold leading-[1.08] tracking-[-0.03em] md:text-[58px]">
                  Built Around
                  <br />
                  <span className="bg-gradient-to-r from-[#3b82f6] via-[#8273e8] to-[#d9a071] bg-clip-text text-transparent">
                    Real Conversations.
                  </span>
                </h2>

                <p className="mt-7 max-w-[520px] text-[17px] leading-8 text-white/50">
                  Different businesses need different conversations. Configure your
                  voice experience around the scenarios your customers actually
                  encounter.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {useCases.map((item, index) => (
                  <div
                    key={item}
                    className="group flex min-h-[110px] items-center justify-between rounded-[22px] border border-white/[0.08] bg-white/[0.025] px-6 transition hover:border-blue-400/20 hover:bg-white/[0.04]"
                  >
                    <div className="flex items-center gap-5">
                      <span className="text-sm font-mono text-blue-400/60">
                        0{index + 1}
                      </span>

                      <span className="text-[18px] text-white/85">{item}</span>
                    </div>

                    <ChevronRight
                      size={19}
                      className="text-white/25 transition group-hover:translate-x-1 group-hover:text-blue-400"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =======================================================
              SECTION 6 — NATURAL CONVERSATION EXPERIENCE
          ======================================================= */}
          <section className="relative px-6 py-24 border-t border-white/[0.05]">
            <div className="mx-auto max-w-[1400px] rounded-[36px] border border-white/[0.08] bg-[#070b14] px-7 py-16 md:px-14 lg:px-20">
              <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                {/* voice visual */}
                <div className="relative flex min-h-[420px] items-center justify-center">
                  <div className="absolute h-[390px] w-[390px] rounded-full bg-blue-600/[0.07] blur-[80px]" />

                  <div className="relative flex h-[290px] w-[290px] items-center justify-center rounded-full border border-blue-400/20">
                    <div className="absolute inset-6 rounded-full border border-blue-400/15" />
                    <div className="absolute inset-12 rounded-full border border-violet-400/15" />

                    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-blue-500/[0.08] text-[#79afff] shadow-[0_0_60px_rgba(59,130,246,0.17)]">
                      <Mic size={47} />
                    </div>
                  </div>

                  {/* left waveform */}
                  <Waveform className="absolute left-0 hidden xl:flex" />

                  {/* right waveform */}
                  <Waveform className="absolute right-0 hidden xl:flex" />
                </div>

                <div>
                  <div className="mb-5 flex items-center gap-4">
                    <span className="h-[3px] w-9 bg-[#3987ff]" />
                    <span className="text-[11px] tracking-[0.35em] text-[#6ba7ff]">
                      CONVERSATION EXPERIENCE
                    </span>
                  </div>

                  <h2 className="text-[42px] font-semibold leading-[1.1] tracking-[-0.03em] md:text-[55px]">
                    Designed to Feel
                    <br />
                    <span className="text-white/50">More Natural.</span>
                  </h2>

                  <p className="mt-6 max-w-[580px] text-[17px] leading-8 text-white/50">
                    The interface is designed around conversational interactions
                    rather than menus, forms or complicated commands.
                  </p>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <CheckCircle2
                          size={18}
                          className="shrink-0 text-[#5598ff]"
                        />
                        <span className="text-[15px] text-white/70">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =======================================================
              SECTION 7 — INTEGRATIONS
          ======================================================= */}
          <section className="relative px-6 py-24 border-t border-white/[0.05]">
            <div className="mx-auto max-w-[1400px]">
              <SectionLabel>CONNECT YOUR WORKFLOW</SectionLabel>

              <h2 className="mx-auto max-w-[850px] text-center text-[42px] font-semibold leading-tight tracking-[-0.03em] md:text-[56px]">
                Your Voice Agent Should Work
                <br />
                <span className="text-white/50">With Your Business.</span>
              </h2>

              <p className="mx-auto mt-6 max-w-[700px] text-center text-[17px] leading-8 text-white/50">
                Connect supported systems and workflows based on your business
                requirements.
              </p>

              <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {integrations.map(({ icon, title, description }) => (
                  <div
                    key={title}
                    className="rounded-[24px] border border-white/[0.08] bg-white/[0.025] p-7"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-400/20 bg-blue-500/[0.06] text-blue-400">
                      {React.cloneElement(icon, { size: 21 } as any)}
                    </div>

                    <h3 className="mt-6 text-[20px] font-medium">{title}</h3>

                    <p className="mt-3 text-[14px] leading-7 text-white/45">
                      {description}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-center text-xs text-white/30">
                Available integrations depend on your selected implementation and
                connected systems.
              </p>
            </div>
          </section>

          {/* =======================================================
              SECTION 8 — FINAL CTA
          ======================================================= */}
          <section className="relative px-6 pb-28 pt-20 border-t border-white/[0.05]">
            <div className="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-[850px] -translate-x-1/2 rounded-full bg-blue-700/[0.07] blur-[140px]" />

            <div className="relative mx-auto max-w-[1250px] overflow-hidden rounded-[38px] border border-white/[0.09] bg-[#070b14] px-7 py-20 text-center md:px-16">
              <div className="absolute -left-20 top-[-140px] h-[400px] w-[400px] rounded-full border border-blue-400/[0.08]" />
              <div className="absolute -right-20 bottom-[-180px] h-[440px] w-[440px] rounded-full border border-orange-400/[0.06]" />

              <div className="relative">
                <SectionLabel>START A CONVERSATION</SectionLabel>

                <h2 className="mx-auto max-w-[850px] text-[44px] font-semibold leading-[1.07] tracking-[-0.03em] md:text-[64px]">
                  Ready to Experience
                  <br />
                  <span className="bg-gradient-to-r from-[#3987ff] via-[#8775e5] to-[#dca475] bg-clip-text text-transparent">
                    Mind Masters AI Voice?
                  </span>
                </h2>

                <p className="mx-auto mt-6 max-w-[650px] text-[17px] leading-8 text-white/50">
                  Try the interactive voice experience or discuss how a voice agent
                  could fit into your business workflow.
                </p>

                <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleTryVoiceAgent}
                    className="group inline-flex items-center justify-center gap-6 rounded-full bg-gradient-to-r from-[#1762ea] via-[#547deb] to-[#c69b70] px-9 py-5 text-[17px] font-medium shadow-[0_0_35px_rgba(59,130,246,0.15)] transition hover:scale-[1.015] cursor-pointer"
                  >
                    Try Voice Agent
                    <ArrowRight
                      size={19}
                      className="transition group-hover:translate-x-1"
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => openCalModal()}
                    className="group inline-flex items-center justify-center gap-6 rounded-full border border-white/[0.13] px-9 py-5 text-[17px] transition hover:bg-white/[0.04] cursor-pointer"
                  >
                    Schedule a 1:1 Meeting
                    <ArrowRight
                      size={19}
                      className="transition group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <WhatsAppButton />
        <MobileBottomNav />
      </div>
    </MotionConfig>
  );
}

function Control({
  icon,
  label,
  onClick,
  danger = false,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-2 text-xs text-gray-400 hover:text-white transition cursor-pointer"
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full border transition ${
          danger
            ? "border-orange-400/25 bg-orange-500/[0.07] text-orange-300 hover:bg-orange-500/[0.12]"
            : "border-white/10 bg-white/[0.025] text-gray-200 hover:bg-white/[0.05]"
        }`}
      >
        {icon}
      </div>

      <span>{label}</span>
    </button>
  );
}

function HumanVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="relative h-[610px] w-[650px]">

        {/* ambient glow */}
        <div className="absolute left-[16%] top-[10%] h-[450px] w-[450px] rounded-full bg-blue-600/[0.08] blur-[100px]" />
        <div className="absolute left-[42%] top-[52%] h-[200px] w-[220px] rounded-full bg-orange-400/[0.06] blur-[75px]" />

        {/* large futuristic rings */}
        <div className="absolute left-[-10%] top-[10%] h-[500px] w-[700px] rotate-[12deg] rounded-[50%] border-t border-blue-400/15" />
        <div className="absolute left-[-2%] top-[25%] h-[440px] w-[650px] rotate-[16deg] rounded-[50%] border-t border-violet-400/10" />
        <div className="absolute left-[4%] top-[40%] h-[360px] w-[580px] rotate-[20deg] rounded-[50%] border-t border-orange-300/10" />

        {/* digital particles */}
        {[
          ["26%", "15%"],
          ["33%", "10%"],
          ["48%", "18%"],
          ["55%", "27%"],
          ["59%", "37%"],
          ["42%", "44%"],
          ["28%", "52%"],
        ].map(([left, top], i) => (
          <span
            key={i}
            style={{ left, top }}
            className="absolute h-[5px] w-[5px] rounded-full bg-blue-400/60 shadow-[0_0_12px_rgba(96,165,250,.8)]"
          />
        ))}

        {/* main profile */}
        <svg
          viewBox="0 0 600 650"
          className="absolute left-[5%] top-[2%] h-[590px] w-[560px]"
        >
          <defs>
            <linearGradient id="profileStroke" x1="250" y1="60" x2="430" y2="550">
              <stop offset="0%" stopColor="#5e9cff" />
              <stop offset="62%" stopColor="#4f7dea" />
              <stop offset="82%" stopColor="#7968d7" />
              <stop offset="100%" stopColor="#ca7d4b" />
            </linearGradient>

            <linearGradient id="softFill" x1="100" y1="60" x2="420" y2="600">
              <stop offset="0%" stopColor="#0b1a31" stopOpacity="0.55" />
              <stop offset="50%" stopColor="#07101d" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#05070d" stopOpacity="0.05" />
            </linearGradient>

            <filter id="glow">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* transparent body */}
          <path
            d="
              M100 620
              C115 540 150 485 207 450
              C231 435 248 414 253 390
              C258 363 247 337 231 308
              C208 266 202 218 219 174
              C238 124 282 92 333 86
              C382 80 427 101 449 139
              C466 168 468 195 455 218
              C447 234 432 246 420 258
              C409 269 406 279 411 290
              C416 301 431 308 428 319
              C425 330 413 335 405 343
              C398 350 398 362 394 375
              C386 402 366 423 340 438
              C310 456 286 479 275 507
              C262 541 272 580 300 620
              Z
            "
            fill="url(#softFill)"
          />

          {/* primary facial line */}
          <path
            d="
              M220 174
              C239 124 283 92 333 86
              C383 80 428 102 449 139
              C466 168 468 195 455 218
              C447 234 432 246 420 258
              C409 269 406 279 411 290
              C416 301 431 308 428 319
              C425 330 413 335 405 343
              C398 350 398 362 394 375
              C386 402 366 423 340 438
            "
            fill="none"
            stroke="url(#profileStroke)"
            strokeWidth="5"
            strokeLinecap="round"
            filter="url(#glow)"
          />

          {/* digital back of head */}
          <path
            d="
              M220 174
              C196 207 193 252 208 292
              C218 321 238 349 245 377
              C251 400 248 419 241 436
            "
            fill="none"
            stroke="#477ee4"
            strokeWidth="2.5"
            strokeDasharray="3 11"
            opacity="0.65"
          />

          {/* neck warm line */}
          <path
            d="
              M340 438
              C311 456 287 480 275 508
              C267 530 269 552 278 571
            "
            fill="none"
            stroke="#c87946"
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#glow)"
          />

          {/* neural arcs */}
          <path
            d="M260 210 C310 175 350 185 382 220"
            fill="none"
            stroke="#4d82d8"
            strokeWidth="1.5"
            opacity="0.25"
          />

          <path
            d="M250 255 C310 220 364 235 394 275"
            fill="none"
            stroke="#7659bd"
            strokeWidth="1.3"
            opacity="0.22"
          />
        </svg>

        {/* floating AI nodes */}
        <div className="absolute left-[37%] top-[31%] flex h-16 w-16 items-center justify-center rounded-full border border-blue-400/20 bg-blue-500/[0.04] backdrop-blur-xl">
          <div className="h-3 w-3 rounded-full bg-blue-400 shadow-[0_0_20px_#3b82f6]" />
        </div>

        <div className="absolute left-[49%] top-[42%] h-2 w-2 rounded-full bg-violet-400/70" />
        <div className="absolute left-[45%] top-[50%] h-1.5 w-1.5 rounded-full bg-blue-400/70" />

        {/* bottom fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[120px] bg-gradient-to-t from-[#05070d] to-transparent" />
      </div>
    </div>
  );
}
