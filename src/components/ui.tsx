import type { ReactNode } from "react";
import { ArrowLeft, Minus, Plus, Star } from "lucide-react";
import { cn } from "../utils/cn";

/* ------------------------------- logo ------------------------------- */
export function Logo({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const light = tone === "light";
  return (
    <a
      href="#home"
      aria-label="آرکا — صفحه اصلی"
      className={cn("group flex items-center gap-3", className)}
    >
      <span
        className={cn(
          "grid h-11 w-11 place-items-center rounded-[14px] border transition-colors",
          light ? "border-white/25 bg-white/5" : "border-ink/15 bg-ink/[0.04]",
        )}
      >
        <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none" aria-hidden="true">
          <path
            d="M7 26.5V15a9 9 0 0118 0v11.5"
            stroke={light ? "#f7f3eb" : "#112a3b"}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M12.2 26.5V17a3.8 3.8 0 017.6 0v9.5"
            stroke="#c6a678"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path d="M4 26.5h24" stroke="#c6a678" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="16" cy="8.4" r="1.15" fill="#c6a678" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[27px] font-semibold leading-none tracking-[0.22em] transition-colors",
            light ? "text-cream" : "text-navy",
          )}
        >
          ARKA
        </span>
        <span
          className={cn(
            "mt-1.5 text-[9px] tracking-[0.16em]",
            light ? "text-cream/60" : "text-muted",
          )}
        >
          مبلمان و دکوراسیون
        </span>
      </span>
    </a>
  );
}

/* ------------------------------ kicker ------------------------------ */
export function Kicker({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.32em]",
        tone === "light" ? "text-brass-dark" : "text-brass",
        className,
      )}
    >
      <span
        className={cn("h-px w-7", tone === "light" ? "bg-brass-dark/60" : "bg-brass/60")}
      />
      {children}
    </span>
  );
}

/* --------------------------- section head --------------------------- */
export function SectionHead({
  kicker,
  title,
  desc,
  action,
  tone = "light",
  className,
}: {
  kicker: string;
  title: ReactNode;
  desc?: string;
  action?: { label: string; href: string };
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl" data-reveal>
        <Kicker tone={tone}>{kicker}</Kicker>
        <h2
          className={cn(
            "mt-3.5 text-[26px] font-extrabold leading-[1.5] tracking-tight sm:text-[32px] lg:text-[36px]",
            tone === "light" ? "text-navy" : "text-cream",
          )}
        >
          {title}
        </h2>
        {desc ? (
          <p
            className={cn(
              "mt-3 max-w-xl text-[13px] leading-7 sm:text-sm",
              tone === "light" ? "text-muted" : "text-cream/65",
            )}
          >
            {desc}
          </p>
        ) : null}
      </div>
      {action ? (
        <a
          href={action.href}
          className={cn(
            "group inline-flex shrink-0 items-center gap-2.5 text-[13px] font-semibold transition-colors",
            tone === "light"
              ? "text-navy hover:text-brass-dark"
              : "text-cream hover:text-brass",
          )}
        >
          {action.label}
          <span
            className={cn(
              "grid h-9 w-9 place-items-center rounded-full border transition-all group-hover:-translate-x-1",
              tone === "light"
                ? "border-navy/15 group-hover:border-brass group-hover:bg-brass/10"
                : "border-white/20 group-hover:border-brass",
            )}
          >
            <ArrowLeft size={15} />
          </span>
        </a>
      ) : null}
    </div>
  );
}

/* ------------------------------- stars ------------------------------ */
export function Stars({
  rating,
  count,
  className,
  light = false,
}: {
  rating: number;
  count?: number;
  className?: string;
  light?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className="inline-flex items-center gap-0.5" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((index) => (
          <Star
            key={index}
            size={12}
            className={
              index < Math.round(rating)
                ? "fill-brass text-brass"
                : light
                  ? "fill-white/10 text-white/25"
                  : "fill-cream-300 text-cream-300"
            }
          />
        ))}
      </span>
      <span
        className={cn(
          "text-[11px] font-medium tabular-nums",
          light ? "text-cream/60" : "text-muted",
        )}
      >
        {rating.toLocaleString("fa-IR")}
        {typeof count === "number" ? ` (${count.toLocaleString("fa-IR")})` : ""}
      </span>
    </span>
  );
}

/* ---------------------------- qty stepper --------------------------- */
export function QtyStepper({
  value,
  onChange,
  min = 1,
  max = 9,
  tone = "light",
  size = "md",
  label = "تعداد",
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  tone?: "light" | "dark";
  size?: "sm" | "md";
  label?: string;
}) {
  const dark = tone === "dark";
  const btn =
    "grid place-items-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-35";
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border p-1",
        size === "sm" ? "h-9" : "h-11",
        dark ? "border-white/15 bg-white/5" : "border-ink/12 bg-white",
      )}
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        aria-label="افزایش تعداد"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className={cn(
          btn,
          size === "sm" ? "h-7 w-7" : "h-9 w-9",
          dark ? "hover:bg-white/10" : "hover:bg-cream-200",
        )}
      >
        <Plus size={14} />
      </button>
      <span
        className={cn(
          "min-w-6 text-center text-sm font-bold tabular-nums",
          dark ? "text-cream" : "text-navy",
        )}
        aria-live="polite"
      >
        {value.toLocaleString("fa-IR")}
      </span>
      <button
        type="button"
        aria-label="کاهش تعداد"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className={cn(
          btn,
          size === "sm" ? "h-7 w-7" : "h-9 w-9",
          dark ? "hover:bg-white/10" : "hover:bg-cream-200",
        )}
      >
        <Minus size={14} />
      </button>
    </div>
  );
}

/* ----------------------------- color dot ---------------------------- */
export function ColorDot({
  hex,
  selected,
  onClick,
  label,
  size = "md",
  metallic = false,
}: {
  hex: string;
  selected?: boolean;
  onClick: () => void;
  label: string;
  size?: "sm" | "md";
  metallic?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      aria-pressed={selected}
      className={cn(
        "relative grid shrink-0 place-items-center rounded-full transition-all duration-300",
        size === "sm" ? "h-6 w-6" : "h-8 w-8",
        selected
          ? "ring-2 ring-brass ring-offset-2 ring-offset-white"
          : "ring-1 ring-ink/10 hover:ring-ink/30",
      )}
      style={{
        background: metallic
          ? `linear-gradient(140deg, #f2e7d2 0%, ${hex} 55%, #6d5636 100%)`
          : hex,
      }}
    >
      <span className="sr-only">{label}</span>
    </button>
  );
}
