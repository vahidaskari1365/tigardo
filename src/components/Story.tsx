import { ArrowLeft, ArrowUpLeft, BadgeCheck, Check, Quote, Sparkles } from "lucide-react";
import { IMG, TESTIMONIALS, faNum } from "../lib/data";
import { Kicker, SectionHead, Stars } from "./ui";

const stats = [
  { value: "+۱۲", label: "سال تجربه طراحی" },
  { value: "+۲٬۴۰۰", label: "خانه چیده‌شده" },
  { value: "۹۸٪", label: "رضایت مشتریان" },
  { value: "۱۸", label: "استان تحت پوشش" },
];

const values = ["طراحی و تولید داخل", "پارچه‌های ضد لکه", "چیدمان اختصاصی رایگان"];

export default function Story() {
  return (
    <>
      <section id="about" className="shell py-14 sm:py-16 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* images */}
          <div className="relative" data-reveal>
            <span className="absolute -end-3 -top-3 hidden h-full w-full rounded-[30px] border border-brass/40 sm:block" />
            <div className="relative overflow-hidden rounded-[26px] sm:rounded-[30px]">
              <img
                src={IMG.roomBedroom}
                alt="اتاق خواب آرکا با مبلمان چوب گردو و پارچه کرم"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover sm:aspect-[5/6]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/35 via-transparent to-transparent" />
              <div className="absolute bottom-4 start-4 rounded-2xl border border-white/30 bg-cream/90 px-3 py-2 backdrop-blur">
                <p className="text-[9px] text-muted">مجموعه اتاق خواب</p>
                <p className="mt-0.5 text-[11px] font-bold text-navy">آرامش در جزئیات</p>
              </div>
            </div>

            <div className="absolute -bottom-6 -start-3 hidden w-40 overflow-hidden rounded-2xl border-4 border-cream shadow-float sm:block lg:w-48">
              <img
                src={IMG.hero}
                alt="آشپزخانه مدرن آرکا"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>

            <div className="absolute -top-4 start-6 flex items-center gap-2 rounded-full border border-ink/10 bg-cream-50 px-3 py-2 shadow-card">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-brass/20 text-brass-dark">
                <Sparkles size={14} />
              </span>
              <span className="text-[10px] font-bold text-navy">از ۱۳۹۲ در کنار شما</span>
            </div>
          </div>

          {/* copy */}
          <div data-reveal style={{ ["--reveal-delay" as string]: "100ms" }}>
            <Kicker>ABOUT ARKA</Kicker>
            <h2 className="mt-3.5 text-[26px] font-extrabold leading-[1.5] text-navy sm:text-[32px] lg:text-[36px]">
              چوب، پارچه و نور؛
              <br />
              سه عنصرِ یک خانه‌ی زنده.
            </h2>
            <p className="mt-4 text-[12px] leading-7 text-muted sm:text-[13px]">
              آرکا از یک کارگاه کوچک نجاری شروع شد؛ با این باور که مبلمان نباید فقط
              «جا پر کند»، باید زندگی را آسان‌تر و روزها را قشنگ‌تر کند. امروز با تیمی از
              طراحان، نجاران و خیاطان، هر قطعه را برای یک خانه‌ی واقعی می‌سازیم.
            </p>
            <p className="mt-3 text-[12px] leading-7 text-muted sm:text-[13px]">
              پارچه‌ها را از تولیدکنندگان ایرانی و اروپایی انتخاب می‌کنیم، چوب را خشک و
              پایدار می‌خریم و هر محصول پیش از ارسال، در کارگاه کنترل کیفیت می‌شود.
            </p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {values.map((value) => (
                <li
                  key={value}
                  className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-cream-100 px-3 py-1.5 text-[10px] font-medium text-navy/75"
                >
                  <Check size={12} className="text-sage" />
                  {value}
                </li>
              ))}
            </ul>

            <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/8">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-cream-50 px-4 py-3.5">
                  <p className="text-lg font-extrabold text-navy sm:text-xl">{stat.value}</p>
                  <p className="mt-1 text-[10px] text-muted">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#products"
                className="group inline-flex h-11 items-center gap-2 rounded-full bg-navy px-5 text-[12px] font-bold text-cream transition-colors hover:bg-navy-deep"
              >
                مشاهده مجموعه
                <ArrowLeft
                  size={15}
                  className="transition-transform group-hover:-translate-x-1"
                />
              </a>
              <a
                href="#showroom"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-navy/15 px-4 text-[11px] font-semibold text-navy transition-colors hover:border-brass hover:bg-brass/10"
              >
                بازدید از نمایشگاه
                <ArrowUpLeft size={14} />
              </a>
              <span className="font-display ms-auto hidden text-lg italic tracking-wide text-brass-dark sm:block">
                Arka Studio
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* testimonials */}
      <section className="border-y border-ink/8 bg-cream-100 py-14 sm:py-16 lg:py-20">
        <div className="shell">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHead
              kicker="CUSTOMER STORIES"
              title="از زبان خانه‌ها"
              desc="هر نظر، یک تجربه‌ی واقعی از خرید و زندگی با مبلمان آرکاست."
            />
            <div
              className="flex shrink-0 items-center gap-4 rounded-2xl border border-ink/10 bg-cream-50 px-4 py-3"
              data-reveal
            >
              <p className="font-display text-4xl font-semibold text-navy">4.9</p>
              <div>
                <Stars rating={4.9} />
                <p className="mt-1.5 text-[10px] text-muted">
                  میانگین {faNum(1268)} نظر ثبت‌شده
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {TESTIMONIALS.map((item, index) => (
              <figure
                key={item.id}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${index * 70}ms` }}
                className="flex flex-col rounded-[22px] border border-ink/10 bg-cream-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-card sm:p-5"
              >
                <div className="flex items-center justify-between">
                  <Stars rating={item.rating} />
                  <Quote size={20} className="text-brass/40" />
                </div>
                <blockquote className="mt-3 flex-1 text-[12px] leading-6 text-navy/75 sm:text-[13px] sm:leading-7">
                  «{item.text}»
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-2.5 border-t border-ink/8 pt-3.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brass/30 to-cream-300 text-[11px] font-bold text-navy">
                    {item.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12px] font-bold text-navy">{item.name}</p>
                    <p className="mt-0.5 truncate text-[10px] text-muted">
                      {item.city} · {item.product}
                    </p>
                  </div>
                  <BadgeCheck size={15} className="shrink-0 text-sage" />
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
