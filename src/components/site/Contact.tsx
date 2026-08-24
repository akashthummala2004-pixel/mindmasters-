import { motion } from "framer-motion";
import { Linkedin, Twitter, ArrowUpRight } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="relative grid gap-10 md:grid-cols-2 items-start">
      <div>
        <h3 className="font-display text-3xl md:text-5xl font-semibold text-gradient-soft">
          Let's engineer<br />what's next.
        </h3>
        <p className="mt-5 text-muted-foreground max-w-md">
          Whether you're scaling an AI platform, transforming an enterprise stack, or
          launching a category-defining product — our team is ready.
        </p>
        <div className="mt-8 space-y-3 text-sm">
          <div className="flex items-center gap-3 text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary glow-cyan" />
            mmaisolutions.pvt@gmail.com
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent glow-purple" />
            +91 85007 29621
          </div>
        </div>
        <div className="mt-8 flex gap-2">
          {[Twitter, Linkedin].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full glass hover:glow-cyan transition"
            >
              <Icon className="h-4 w-4" strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onSubmit={(e) => { e.preventDefault(); setSent(true); }}
        className="glass-strong rounded-3xl p-7 md:p-8 space-y-4"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Name" name="name" />
          <Field label="Company" name="company" />
        </div>
        <Field label="Work email" name="email" type="email" />
        <Field label="What can we build together?" name="msg" textarea />
        <button
          type="submit"
          suppressHydrationWarning
          className="group relative w-full overflow-hidden rounded-xl bg-foreground px-5 py-3.5 text-sm font-semibold text-background transition hover:opacity-95"
        >
          <span className="relative z-10 inline-flex items-center gap-2">
            {sent ? "Message received ✓" : "Send Inquiry"}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </button>
      </motion.form>
    </div>
  );
}

function Field({
  label, name, type = "text", textarea,
}: { label: string; name: string; type?: string; textarea?: boolean }) {
  const cls =
    "peer w-full rounded-xl bg-foreground/[0.03] border border-foreground/10 px-4 pt-5 pb-2 text-sm text-foreground placeholder-transparent outline-none focus:border-primary/60 focus:bg-foreground/[0.05] transition";
  return (
    <label className="relative block">
      {textarea ? (
        <textarea name={name} rows={4} placeholder={label} className={cls} suppressHydrationWarning />
      ) : (
        <input name={name} type={type} placeholder={label} className={cls} suppressHydrationWarning />
      )}
      <span className="absolute left-4 top-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
    </label>
  );
}
