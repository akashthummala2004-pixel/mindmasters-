import { createFileRoute, Link } from "@tanstack/react-router";
import { MotionConfig, motion } from "framer-motion";
import { ArrowLeft, Clock, Video, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { smoothTransition, smoothViewport } from "@/lib/motion-presets";
import { Navbar } from "@/components/site/Navbar";
import { MouseGlow } from "@/components/site/MouseGlow";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { MobileBottomNav } from "@/components/site/MobileBottomNav";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { WebGLBoundary } from "@/components/site/WebGLBoundary";
import contactImage from "@/assets/contact.png";
import companyLogo from "@/assets/companylogo.png";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Schedule a 1:1 Meeting — Mind Masters AI Solutions" },
      {
        name: "description",
        content:
          "Book a free 1:1 consultation with our team to discuss your project, timeline, and budget.",
      },
    ],
  }),
  component: SchedulePage,
});

function SchedulePage() {
  return (
    <MotionConfig reducedMotion="user" transition={smoothTransition}>
      <div className="relative min-h-screen text-foreground bg-background">
        <MouseGlow />
        <Navbar />

        {/* Hero */}
        <section className="relative container-x pt-28 sm:pt-36 pb-4 sm:pb-6 overflow-hidden">
          {/* 3D Dotted Surface Background (Header only) */}
          <WebGLBoundary>
            <DottedSurface className="absolute inset-x-0 -top-16 md:-top-24 h-[400px] sm:h-[500px] -z-20 opacity-100 pointer-events-none mask-image-bottom" style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)' }} />
          </WebGLBoundary>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[80%]"
            style={{
              background:
                "radial-gradient(45% 70% at 50% 0%, rgba(91,140,255,0.10), transparent 70%)",
            }}
          />

          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 sm:gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="text-[24px] sm:text-3xl md:text-[36px] font-semibold tracking-[-0.025em] leading-[1.05] text-white text-balance max-w-2xl">
                  Schedule a 1:1 Meeting
                  <br />
                  with Us
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="hidden md:block relative shrink-0"
              >
                <span
                  aria-hidden
                  className="absolute -inset-10 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(91,140,255,0.18), transparent 60%)",
                    filter: "blur(40px)",
                  }}
                />
                <img
                  src={contactImage}
                  alt="Contact Support"
                  width={524}
                  height={524}
                  loading="lazy"
                  decoding="async"
                  className="relative h-[240px] lg:h-[280px] w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Schedule booking section with compact 2-column layout */}
        <section className="relative container-x pb-20 sm:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={smoothViewport}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto max-w-5xl rounded-3xl bg-[#090a0d] border border-white/10 overflow-hidden shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)] grid grid-cols-1 lg:grid-cols-[280px_1fr]"
          >
            {/* Left Branding Panel: Transparent logo symbol only, no background, no captions */}
            <div className="p-6 sm:p-8 bg-[#0c0e14] border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between">
              <div>
                {/* Transparent Infinity Logo Symbol */}
                <div className="mb-6">
                  <img
                    src={companyLogo}
                    alt="Mind Masters AI Logo"
                    className="h-10 sm:h-12 w-auto object-contain drop-shadow-[0_2px_10px_rgba(0,242,255,0.2)]"
                  />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-6">
                  30 min meeting
                </h3>

                <div className="space-y-4 text-xs sm:text-sm text-white/70">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#74f5ff]" />
                    <span>30m</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Video className="w-4 h-4 text-[#74f5ff]" />
                    <span>Cal Video</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-[#74f5ff]" />
                    <span>Asia/Kolkata</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 text-[11.5px] text-white/40 leading-relaxed">
                Select an available date and time slot for your consultation.
              </div>
            </div>

            {/* Right Panel: Compact Calendar (Left) + Available Time Slots (Right) */}
            <div className="relative bg-[#090a0d]">
              <CalendarWidget />
            </div>
          </motion.div>
        </section>

        <Footer />
        <WhatsAppButton />
        <MobileBottomNav />
        <div
          className="md:hidden"
          aria-hidden
          style={{
            height:
              "calc(var(--dock-h) + var(--dock-gap) + env(safe-area-inset-bottom, 0px) + 16px)",
          }}
        />
      </div>
    </MotionConfig>
  );
}

function getOrdinalSuffix(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

function CalendarWidget() {
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonth, setCurrentMonth] = useState<number>(7); // 7 = August (0-indexed)
  const [selectedDate, setSelectedDate] = useState<number>(24);
  const [use24h, setUse24h] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  // Days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  // First day weekday index (0 = Sun, 1 = Mon, etc.)
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  // Selected date formatted header string (e.g. "Tue 25th")
  const selectedDateObj = new Date(currentYear, currentMonth, selectedDate);
  const dayOfWeekName = selectedDateObj.toLocaleDateString("en-US", { weekday: "short" });
  const formattedSelectedHeader = `${dayOfWeekName} ${selectedDate}${getOrdinalSuffix(selectedDate)}`;

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
  ];

  const formatTime = (time: string) => {
    if (use24h) return time;
    const [h, m] = time.split(":").map(Number);
    const period = h >= 12 ? "PM" : "AM";
    const displayH = h % 12 === 0 ? 12 : h % 12;
    return `${displayH.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${period}`;
  };

  return (
    <div className="p-5 sm:p-7 grid grid-cols-1 md:grid-cols-[1fr_240px] lg:grid-cols-[1fr_260px] gap-6 lg:gap-8 items-start">
      {/* 1. Compact Month Calendar (Left Side) */}
      <div>
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/10">
          <h4 className="text-base font-semibold text-white">
            {monthNames[currentMonth]} {currentYear}
          </h4>
          <div className="flex items-center gap-1.5 text-white/60">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg bg-white/[0.04] border border-white/10 hover:bg-white/10 text-white transition-colors cursor-pointer"
              aria-label="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg bg-white/[0.04] border border-white/10 hover:bg-white/10 text-white transition-colors cursor-pointer"
              aria-label="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 gap-1 text-center mb-3">
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
            <span key={day} className="text-[10.5px] font-semibold text-white/40 tracking-wider">
              {day}
            </span>
          ))}
        </div>

        {/* Compact Date Box Grid (Small, clean, rounded) */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2 place-items-center">
          {/* Empty lead cells for month starting weekday */}
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="w-8 h-8 sm:w-9 sm:h-9" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const dateNum = idx + 1;
            const isSelected = dateNum === selectedDate;

            return (
              <button
                key={dateNum}
                type="button"
                onClick={() => setSelectedDate(dateNum)}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                  isSelected
                    ? "bg-white text-black font-bold shadow-[0_0_16px_rgba(255,255,255,0.4)]"
                    : "bg-white/[0.04] text-white/90 hover:bg-white/15 border border-white/10"
                }`}
              >
                {dateNum}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Available Time Slots Column (Right Side of Calendar) */}
      <div className="border-t md:border-t-0 md:border-l border-white/10 pt-5 md:pt-0 md:pl-6">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-sm font-semibold text-white">{formattedSelectedHeader}</h5>
          {/* 12h / 24h toggle */}
          <div className="flex items-center gap-1 bg-white/[0.06] p-0.5 rounded-lg border border-white/10 text-[11px]">
            <button
              type="button"
              onClick={() => setUse24h(false)}
              className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${!use24h ? "bg-white/20 text-white" : "text-white/40"}`}
            >
              12h
            </button>
            <button
              type="button"
              onClick={() => setUse24h(true)}
              className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${use24h ? "bg-white/20 text-white" : "text-white/40"}`}
            >
              24h
            </button>
          </div>
        </div>

        {/* Available Time Slot Buttons Grid/List */}
        <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
          {timeSlots.map((slot) => {
            const formatted = formatTime(slot);
            const isSelected = selectedTime === slot;
            return (
              <a
                key={slot}
                href="https://cal.com/mm-ai-solutions-mzfol6/30min"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setSelectedTime(slot)}
                className={`w-full py-2.5 px-4 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer group ${
                  isSelected
                    ? "bg-[#74f5ff] text-black border-[#74f5ff] shadow-[0_0_15px_rgba(116,245,255,0.4)]"
                    : "bg-white/[0.04] border-white/10 text-white hover:border-[#74f5ff]/50 hover:bg-[#74f5ff]/10"
                }`}
              >
                <span>{formatted}</span>
                <span className="text-[10px] opacity-60 group-hover:opacity-100 transition-opacity">
                  Book →
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
