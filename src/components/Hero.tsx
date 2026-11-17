import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Layers,
  Play,
  RotateCw,
  Scan,
  ShieldCheck,
  Truck,
  Armchair,
  Sofa,
  TableProperties,
  Utensils,
} from "lucide-react";
import { IMG } from "../lib/data";
import { cn } from "../utils/cn";

const slides = [
  {
    id: "s1",
    image: IMG.hero,
    eyebrow: "ARKA COLLECTION — ۱۴۰۵",
    title: (
      <>
        با <span className="text-brass">سه‌بعدی</span> ببین،
        <br />
        خانه‌ات را طراحی کن.
      </>
    ),
    text: "صندلی، میز و این آشپزخانه را در محیط واقعی خانه‌ی خود ببینید؛ رنگ، جنس و اندازه را تغییر دهید و با اطمینان خرید کنید.",
  },
  {
    id: "s2",
    image: IMG.roomLiving,
    eyebrow: "LIVING ROOM EDIT",
    title: (
      <>
        هر رنگ، هر جنس،
        <br />
        در <span className="text-brass">خانه‌ی شما.</span>
      </>
    ),
    text: "پارچه‌ها و رنگ‌های چوب را زنده و دقیق مقایسه کنید. ستِ نشیمن دلخواهتان را انتخاب کنید و نتیجه را همان لحظه ببینید.",
  },
  {
    id: "s3",
    image: IMG.roomDining,
    eyebrow: "DINING & KITCHEN",
    title: (
      <>
        دورهمی‌های خانه را
        <br />
        از <span className="text-brass">نو بساز.</span>
      </>
    ),
    text: "از میزهای بلوط گرد تا صندلی‌های بوکله؛ مجموع‌های برای نشستن‌های طولانی، گفت‌وگو و قهوه‌های دیروقت.",
  },
];

const categories = [
  { label: "مبل", Icon: Sofa, href: "#products" },
  { label: "صندلی", Icon: Armchair, href: "#products" },
  { label: "میز", Icon: TableProperties, href: "#products" },
  { label: "این", Icon: Utensils, href: "#products" },
];

const trust = [
  { Icon: Truck, title: "ارسال و نصب سراسری", sub: "در ۱۸ استان ایران" },
  { Icon: Layers, title: "تنوع رنگ و متریال", sub: "بیش از ۴۰ ترکیب" },
  { Icon: Scan, title: "مشاهده در فضای واقعی", sub: "با واقعیت افزوده" },
  { Icon: ShieldCheck, title: "پرداخت امن و ضمانت", sub: "۵ سال ضمانت سازه" },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 7500);
    return () => clearTimeout(timer);
  }, [index]);

  const go = (direction: number) =>
    setIndex((prev) => (prev + direction + slides.length) % slides.length);

  const slide = slides[index];

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[900px] items-center overflow-hidden bg-navy-deep pb-48 pt-32 text-cream sm:min-h-[900px] sm:pb-48 lg:min-h-[880px] lg:pb-36 lg:pt-40"
    >
      {/* backgrounds */}
      <div className="absolute inset-0 -z-10">
        {slides.map((item, position) => (
          <img
            key={item.id}
            src={item.image}
            alt=""
            aria-hidden={index !== position}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms]",
              index === position
                ? "animate-soft-zoom opacity-100"
                : "scale-105 opacity-0",
            )}
            fetchPriority={position === 0 ? "high" : "low"}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-l from-navy-deep via-navy-deep/70 to-navy-deep/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/10 to-navy-deep/55" />
        <div className="grain absolute inset-0 opacity-[0.14] mix-blend-soft-light" />
      </div>

      <div className="shell relative z-10 w-full">
        <div className="max-w-[600px]">
          <p
            key={`${slide.id}-eyebrow`}
            className="animate-fade-in inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.26em] text-cream/80 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brass" />
            {slide.eyebrow}
          </p>

          <h1
            key={`${slide.id}-title`}
            className="animate-fade-up mt-6 text-[34px] font-extrabold leading-[1.45] tracking-tight text-cream sm:text-[44px] lg:text-[52px] lg:leading-[1.4]"
          >
            {slide.title}
          </h1>

          <p
            key={`${slide.id}-text`}
            className="animate-fade-up mt-5 max-w-[500px] text-[13px] leading-8 text-cream/70 sm:text-sm"
            style={{ animationDelay: "90ms" }}
          >
            {slide.text}
          </p>

          <div
            className="animate-fade-up mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "160ms" }}
          >
            <a
              href="#experience"
              className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-cream px-6 text-[13px] font-bold text-navy shadow-[0_18px_40px_-20px_rgba(0,0,0,0.7)] transition-all hover:bg-brass hover:text-navy-deep"
            >
              شروع تجربه سه‌بعدی
              <ArrowLeft
                size={17}
                className="transition-transform group-hover:-translate-x-1"
              />
            </a>
            <a
              href="#products"
              className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-white/25 bg-white/5 px-5 text-[13px] font-semibold text-cream backdrop-blur-sm transition-colors hover:border-brass hover:text-brass"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full border border-white/25">
                <Play size={11} className="fill-current" />
              </span>
              مشاهده مجموعه
            </a>
          </div>

          <div
            className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-[11px] text-cream/60"
            style={{ animationDelay: "220ms" }}
          >
            <span className="flex items-baseline gap-1.5">
              <b className="text-base font-bold text-cream">+۲٬۴۰۰</b> خانه چیده‌شده
            </span>
            <span className="h-4 w-px bg-white/15" />
            <span className="flex items-baseline gap-1.5">
              <b className="text-base font-bold text-cream">۹۸٪</b> رضایت مشتریان
            </span>
            <span className="h-4 w-px bg-white/15" />
            <span className="flex items-center gap-1.5">
              <RotateCw size={13} className="text-brass" />
              نمایش ۳۶۰ درجه
            </span>
          </div>

        </div>
      </div>

      {/* floating category rail */}
      <aside className="absolute left-6 top-1/2 z-20 hidden w-[150px] -translate-y-1/2 xl:left-10 xl:block">
        <div className="rounded-[26px] border border-white/40 bg-cream/95 p-2.5 text-navy shadow-float backdrop-blur-xl">
          <p className="px-2 pb-1 pt-1.5 text-[9px] font-semibold tracking-[0.22em] text-muted">
            دسته‌بندی
          </p>
          {categories.map(({ label, Icon, href }, position) => (
            <a
              key={label}
              href={href}
              className={cn(
                "group flex flex-col items-center gap-1.5 rounded-[18px] px-2 py-3 transition-colors hover:bg-cream-200",
                position > 0 && "border-t border-ink/5",
              )}
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-cream-200 text-navy transition-all group-hover:bg-navy group-hover:text-cream">
                <Icon size={20} strokeWidth={1.5} />
              </span>
              <span className="text-[11px] font-semibold">{label}</span>
            </a>
          ))}
        </div>
      </aside>

      {/* slide controls */}
      <div className="absolute inset-x-0 bottom-[150px] z-20 sm:bottom-[144px] lg:bottom-[118px]">
        <div className="shell flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="اسلاید قبلی"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/25 text-cream/80 transition-colors hover:border-brass hover:text-brass"
            >
              <ChevronRight size={16} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="اسلاید بعدی"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/25 text-cream/80 transition-colors hover:border-brass hover:text-brass"
            >
              <ChevronLeft size={16} />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-display text-xs tracking-[0.2em] text-cream/60">
              {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-1.5">
              {slides.map((item, position) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIndex(position)}
                  aria-label={`رفتن به اسلاید ${position + 1}`}
                  aria-current={index === position}
                  className={cn(
                    "h-1 rounded-full transition-all duration-500",
                    index === position ? "w-7 bg-brass" : "w-2 bg-white/30 hover:bg-white/60",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* trust bar */}
      <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/12 bg-navy-deep/55 backdrop-blur-md">
        <div className="shell grid grid-cols-2 md:grid-cols-4 [&>*]:py-2.5 [&>*]:text-center md:[&>*]:py-4">
          {trust.map(({ Icon, title, sub }, position) => (
            <div
              key={title}
              className={cn(
                "flex items-center justify-center gap-2.5 px-2 text-right md:gap-3",
                position > 1 && "border-t border-white/10 md:border-t-0 md:border-s",
                position % 2 === 1 && "border-s border-white/10 md:border-s",
              )}
            >
              <Icon size={18} strokeWidth={1.4} className="shrink-0 text-brass md:size-5" />
              <div className="min-w-0">
                <p className="truncate text-[10px] font-semibold text-cream/90 sm:text-xs">
                  {title}
                </p>
                <p className="mt-0.5 truncate text-[9px] text-cream/45 sm:text-[10px]">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
