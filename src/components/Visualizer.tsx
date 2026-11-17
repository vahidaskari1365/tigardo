import { useState } from "react";
import {
  ArrowLeft,
  ArrowUpLeft,
  Box,
  Eye,
  Plus,
  Ruler,
  Scan,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";
import { PRODUCTS, ROOMS, faPrice, faNum } from "../lib/data";
import { useShop } from "../lib/store";
import { cn } from "../utils/cn";
import { Kicker } from "./ui";

const steps = [
  {
    title: "اتاق را انتخاب کنید",
    text: "یکی از فضاهای نشیمن، ناهارخوری یا آشپزخانه را باز کنید.",
  },
  {
    title: "نقطه‌ها را لمس کنید",
    text: "روی هر محصول بزنید تا ابعاد، رنگ و قیمت آن را ببینید.",
  },
  {
    title: "ست دلخواه را بسازید",
    text: "ترکیب رنگ‌ها را تغییر دهید و همه را یک‌جا سفارش دهید.",
  },
];

export default function Visualizer() {
  const [roomIndex, setRoomIndex] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { addToCart, openProduct } = useShop();

  const room = ROOMS[roomIndex];
  const activeHotspot = room.hotspots.find((hotspot) => hotspot.id === activeId) ?? null;
  const activeProduct = activeHotspot
    ? PRODUCTS.find((product) => product.id === activeHotspot.productId)
    : null;

  return (
    <section id="inspiration" className="shell py-14 sm:py-16 lg:py-20">
      <div className="relative overflow-hidden rounded-[30px] bg-navy-deep p-4 text-cream sm:p-6 lg:rounded-[36px] lg:p-10">
        <div className="pointer-events-none absolute -end-24 -top-24 h-80 w-80 rounded-full bg-brass/12 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 start-1/4 h-64 w-64 rounded-full bg-sage/15 blur-3xl" />
        <span className="font-display pointer-events-none absolute -bottom-14 -start-4 select-none text-[150px] leading-none tracking-[0.1em] text-white/[0.035] lg:text-[210px]">
          ARKA
        </span>

        <div className="relative grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          {/* copy */}
          <div data-reveal>
            <Kicker tone="dark">ROOM VISUALIZER</Kicker>
            <h2 className="mt-3.5 text-[26px] font-extrabold leading-[1.5] text-cream sm:text-[32px] lg:text-[36px]">
              خانه‌ات را قبل از خرید
              <br />
              <span className="text-brass">از نزدیک ببین.</span>
            </h2>
            <p className="mt-4 max-w-md text-[12px] leading-7 text-cream/60 sm:text-[13px]">
              در نمایشگاه مجازی آرکا قدم بزنید؛ محصولات واقعی را در چیدمان‌های واقعی
              لمس کنید و ست کامل خودتان را بسازید. بدون عجله، بدون فروشنده.
            </p>

            <ol className="mt-6 space-y-3.5">
              {steps.map((step, index) => (
                <li key={step.title} className="flex gap-3.5">
                  <span className="font-display mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-brass/30 bg-brass/10 text-[11px] text-brass">
                    {faNum(index + 1)}
                  </span>
                  <div>
                    <p className="text-[12px] font-bold text-cream">{step.title}</p>
                    <p className="mt-1 text-[10px] leading-5 text-cream/45 sm:text-[11px]">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#experience"
                className="group inline-flex h-11 items-center gap-2 rounded-full bg-brass px-5 text-[12px] font-bold text-navy-deep transition-colors hover:bg-cream"
              >
                شروع چیدمان سه‌بعدی
                <ArrowLeft
                  size={15}
                  className="transition-transform group-hover:-translate-x-1"
                />
              </a>
              <a
                href="#contact"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 px-4 text-[11px] font-semibold text-cream/80 transition-colors hover:border-brass hover:text-brass"
              >
                مشاوره رایگان
                <ArrowUpLeft size={14} />
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-4 text-[9px] text-cream/40 sm:text-[10px]">
              <span className="flex items-center gap-1.5">
                <Scan size={12} className="text-brass/80" /> واقعیت افزوده
              </span>
              <span className="flex items-center gap-1.5">
                <Box size={12} className="text-brass/80" /> مدل ۳۶۰ درجه
              </span>
              <span className="flex items-center gap-1.5">
                <Ruler size={12} className="text-brass/80" /> ابعاد واقعی
              </span>
            </div>
          </div>

          {/* room */}
          <div data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
            <div className="mb-3 flex items-center justify-between gap-2">
              <div className="no-scrollbar flex gap-1 rounded-full border border-white/10 bg-white/5 p-1">
                {ROOMS.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setRoomIndex(index);
                      setActiveId(null);
                    }}
                    aria-pressed={roomIndex === index}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-[10px] font-semibold transition-colors sm:px-3.5",
                      roomIndex === index
                        ? "bg-cream text-navy"
                        : "text-cream/55 hover:text-cream",
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <span className="font-display hidden text-[10px] tracking-[0.24em] text-cream/35 sm:block">
                {room.latin}
              </span>
            </div>

            <div className="relative overflow-hidden rounded-[22px] border border-white/12">
              <div className="relative aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/3]">
                {ROOMS.map((item, index) => (
                  <img
                    key={item.id}
                    src={item.image}
                    alt={`چیدمان ${item.label} آرکا`}
                    loading="lazy"
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
                      index === roomIndex ? "opacity-100" : "opacity-0",
                    )}
                  />
                ))}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-transparent to-navy-deep/20" />

                <span className="absolute start-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-navy-deep/60 px-2.5 py-1.5 text-[9px] font-medium text-cream backdrop-blur">
                  <Sparkles size={11} className="text-brass" />
                  روی نقطه‌ها بزنید
                </span>

                {room.hotspots.map((hotspot) => (
                  <button
                    key={hotspot.id}
                    type="button"
                    onClick={() =>
                      setActiveId((current) => (current === hotspot.id ? null : hotspot.id))
                    }
                    aria-label="مشاهده محصول"
                    className={cn(
                      "halo absolute z-20 grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border transition-all duration-300",
                      activeId === hotspot.id
                        ? "scale-110 border-brass bg-brass text-navy-deep"
                        : "border-white/70 bg-cream/95 text-navy hover:bg-brass",
                    )}
                    style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                  >
                    <Plus
                      size={14}
                      className={cn(
                        "transition-transform",
                        activeId === hotspot.id && "rotate-45",
                      )}
                    />
                  </button>
                ))}

                {activeProduct ? (
                  <div className="animate-fade-up absolute inset-x-2.5 bottom-2.5 z-30 flex min-h-[76px] items-center gap-2.5 rounded-2xl border border-white/60 bg-cream/95 p-2 text-navy shadow-float backdrop-blur-md sm:inset-x-3 sm:bottom-3 sm:min-h-[84px] sm:gap-3 sm:p-2.5">
                    <img
                      src={activeProduct.image}
                      alt={activeProduct.name}
                      className="h-14 w-12 shrink-0 rounded-xl object-cover sm:h-16 sm:w-14"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[11px] font-bold sm:text-xs">
                        {activeProduct.name}
                      </p>
                      <p className="mt-0.5 text-[9px] text-muted">
                        {activeProduct.material}
                      </p>
                      <p className="mt-1 text-[10px] font-extrabold">
                        {faPrice(activeProduct.price)}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => openProduct(activeProduct)}
                        aria-label={`جزئیات ${activeProduct.name}`}
                        className="grid h-8 w-8 place-items-center rounded-full border border-navy/15 text-navy transition-colors hover:border-brass hover:bg-brass/10"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => addToCart(activeProduct)}
                        className="inline-flex h-8 items-center gap-1 rounded-full bg-navy px-2.5 text-[9px] font-bold text-cream transition-colors hover:bg-brass hover:text-navy-deep sm:px-3"
                      >
                        <ShoppingBag size={12} />
                        <span className="hidden sm:inline">افزودن</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveId(null)}
                        aria-label="بستن"
                        className="grid h-7 w-7 place-items-center rounded-full text-navy/50 hover:bg-navy/5"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-x-3 bottom-3 z-10 flex items-end justify-between gap-2">
                    <p className="text-[10px] font-medium text-cream/80">
                      {faNum(room.hotspots.length)} محصول در چیدمان {room.label}
                    </p>
                    <span className="rounded-full border border-white/25 bg-white/10 px-2 py-1 text-[8px] text-cream/70 backdrop-blur">
                      تور مجازی
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
