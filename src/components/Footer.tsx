import { useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowUpLeft,
  Camera,
  Check,
  Clock,
  Mail,
  MapPin,
  Phone,
  Play,
  RefreshCw,
  Send,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { CATEGORIES, IMG, NAV_LINKS } from "../lib/data";
import { useShop } from "../lib/store";
import { Kicker, Logo } from "./ui";

/* ============================== showroom ============================== */
function Showroom() {
  const { notify } = useShop();

  return (
    <section id="showroom" className="shell py-14 sm:py-16 lg:py-20">
      <div
        className="grid overflow-hidden rounded-[28px] border border-ink/10 bg-cream-50 shadow-card lg:grid-cols-2"
        data-reveal
      >
        <div className="p-6 sm:p-8 lg:p-10">
          <Kicker>OUR SHOWROOM</Kicker>
          <h2 className="mt-3.5 text-[24px] font-extrabold leading-[1.5] text-navy sm:text-[30px]">
            نمایشگاه آرکا را
            <br />
            از نزدیک لمس کنید.
          </h2>
          <p className="mt-3.5 max-w-md text-[12px] leading-7 text-muted">
            پارچه‌ها را در دست بگیرید، روی صندلی‌ها بنشینید و با طراحان ما درباره‌ی
            چیدمان خانه‌تان گفت‌وگو کنید. بازدید و مشاوره رایگان است.
          </p>

          <div className="mt-6 space-y-3.5">
            {[
              {
                Icon: MapPin,
                title: "نمایشگاه مرکزی",
                value: "تهران، خیابان ولیعصر، بالاتر از پارک ساعی، پلاک ۱۲۸",
              },
              {
                Icon: Clock,
                title: "ساعت بازدید",
                value: "شنبه تا پنجشنبه، ۱۰:۰۰ تا ۲۰:۰۰ — جمعه‌ها با تعیین وقت",
              },
              {
                Icon: Phone,
                title: "رزرو و مشاوره",
                value: "۰۲۱-۹۱۰۰۲۲۴۵",
              },
            ].map(({ Icon, title, value }) => (
              <div key={title} className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-brass/30 bg-brass/10 text-brass-dark">
                  <Icon size={15} />
                </span>
                <div>
                  <p className="text-[11px] font-bold text-navy">{title}</p>
                  <p className="mt-0.5 text-[10px] leading-5 text-muted sm:text-[11px]">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() =>
                notify("درخواست بازدید ثبت شد؛ برای هماهنگی زمان با شما تماس می‌گیریم")
              }
              className="group inline-flex h-11 items-center gap-2 rounded-full bg-navy px-5 text-[12px] font-bold text-cream transition-colors hover:bg-navy-deep"
            >
              رزرو بازدید
              <ArrowLeft
                size={15}
                className="transition-transform group-hover:-translate-x-1"
              />
            </button>
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-navy/15 px-4 text-[11px] font-semibold text-navy transition-colors hover:border-brass hover:bg-brass/10"
            >
              مسیریابی
              <ArrowUpLeft size={14} />
            </a>
          </div>
        </div>

        <div className="relative min-h-[300px] overflow-hidden bg-cream-200 lg:min-h-[420px]">
          <img
            src={IMG.roomDining}
            alt="نمایشگاه آرکا، فضای ناهارخوری با صندلی‌های سرمه‌ای"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/55 via-transparent to-navy-deep/10" />

          <a
            href="#inspiration"
            aria-label="ورود به تور مجازی نمایشگاه"
            className="group absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-white/15 text-cream backdrop-blur-md transition-all hover:scale-105 hover:bg-brass hover:text-navy-deep"
          >
            <Play size={20} className="fill-current" />
            <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-white/10" />
          </a>

          <span className="absolute start-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-navy-deep/45 px-2.5 py-1.5 text-[9px] font-medium text-cream backdrop-blur">
            <Sparkles size={11} className="text-brass" />
            تور مجازی ۳۶۰°
          </span>

          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl border border-white/20 bg-navy-deep/55 px-3 py-2.5 text-cream backdrop-blur-md">
            <div>
              <p className="text-[10px] text-cream/55">نمایشگاه مرکزی تهران</p>
              <p className="mt-0.5 text-[11px] font-bold">آماده‌ی پذیرایی از شما</p>
            </div>
            <span className="rounded-full bg-cream px-2.5 py-1 text-[9px] font-bold text-navy">
              رایگان
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================= newsletter ============================= */
function Newsletter() {
  const { notify } = useShop();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus("error");
      return;
    }
    setStatus("done");
    notify("کد تخفیف ۵٪ به ایمیل شما ارسال شد");
  };

  return (
    <section className="shell pb-14 sm:pb-16 lg:pb-20">
      <div className="relative overflow-hidden rounded-[28px] bg-navy-deep px-5 py-7 text-cream sm:px-8 sm:py-9" data-reveal>
        <div className="pointer-events-none absolute -end-20 -top-24 h-64 w-64 rounded-full bg-brass/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 start-1/3 h-48 w-48 rounded-full bg-sage/20 blur-3xl" />
        <div className="relative grid items-center gap-6 lg:grid-cols-2">
          <div>
            <Kicker tone="dark">ARKA LETTER</Kicker>
            <h2 className="mt-3 text-[22px] font-extrabold leading-[1.5] sm:text-[26px]">
              ۵٪ تخفیف اولین خریدت را بگیر.
            </h2>
            <p className="mt-2 max-w-sm text-[11px] leading-6 text-cream/55 sm:text-[12px]">
              مجموعه‌های جدید، راهنمای چیدمان و پیشنهادهای ویژه، ماهی یک ایمیل؛ بدون
              پیام اضافه.
            </p>
          </div>

          {status === "done" ? (
            <div className="flex items-center gap-3 rounded-2xl border border-brass/30 bg-white/5 px-4 py-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brass text-navy-deep">
                <Check size={18} />
              </span>
              <div>
                <p className="text-[12px] font-bold">ثبت شد! خوش آمدید.</p>
                <p className="mt-1 text-[10px] text-cream/55">
                  کد تخفیف به {email} ارسال شد.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="w-full">
              <div className="flex flex-col gap-2 sm:flex-row">
                <label htmlFor="newsletter-email" className="sr-only">
                  ایمیل شما
                </label>
                <div className="relative flex-1">
                  <Mail
                    size={16}
                    className="pointer-events-none absolute end-3.5 top-1/2 -translate-y-1/2 text-cream/40"
                  />
                  <input
                    id="newsletter-email"
                    type="email"
                    dir="ltr"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder="name@example.com"
                    className="h-12 w-full rounded-full border border-white/15 bg-white/5 pe-10 ps-4 text-left text-[12px] text-cream placeholder:text-cream/30 focus:border-brass focus:outline-none"
                    aria-invalid={status === "error"}
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-brass px-6 text-[12px] font-bold text-navy-deep transition-colors hover:bg-cream"
                >
                  عضویت
                  <Send size={14} />
                </button>
              </div>
              <p
                className={`mt-2 text-[10px] ${status === "error" ? "text-red-300" : "text-cream/35"}`}
                role={status === "error" ? "alert" : undefined}
              >
                {status === "error"
                  ? "لطفاً یک ایمیل معتبر وارد کنید."
                  : "با عضویت، با حریم خصوصی و شرایط آرکا موافقت می‌کنید."}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ============================== footer ============================== */
export default function Footer() {
  return (
    <>
      <Showroom />
      <Newsletter />

      <footer id="contact" className="relative overflow-hidden bg-navy-deep pb-6 pt-12 text-cream sm:pt-14">
        <div className="pointer-events-none absolute -bottom-20 end-0 h-64 w-64 rounded-full bg-brass/8 blur-3xl" />
        <div className="shell relative">
          <div className="grid gap-9 pb-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
            <div>
              <Logo tone="light" />
              <p className="mt-4 max-w-xs text-[11px] leading-6 text-cream/50">
                آرکا، کارگاه طراحی و تولید مبلمان مدرن ایرانی؛ از سال ۱۳۹۲ در کنار
                خانه‌هایی که دوست دارند زیبا زندگی کنند.
              </p>
              <div className="mt-5 flex items-center gap-2">
                {[
                  { Icon: Camera, label: "اینستاگرام" },
                  { Icon: Send, label: "تلگرام" },
                  { Icon: Mail, label: "ایمیل" },
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#contact"
                    aria-label={label}
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-cream/65 transition-colors hover:border-brass hover:text-brass"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brass">
                Quick links
              </h3>
              <ul className="mt-4 space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-[12px] text-cream/55 transition-colors hover:text-cream"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brass">
                Collections
              </h3>
              <ul className="mt-4 space-y-2.5">
                {CATEGORIES.map((category) => (
                  <li key={category.id}>
                    <a
                      href="#products"
                      className="text-[12px] text-cream/55 transition-colors hover:text-cream"
                    >
                      {category.title}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#products"
                    className="text-[12px] text-cream/55 transition-colors hover:text-cream"
                  >
                    اتاق خواب و روشنایی
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brass">
                Contact
              </h3>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-2 text-[11px] leading-5 text-cream/55">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-brass/70" />
                  تهران، ولیعصر، بالاتر از پارک ساعی، پلاک ۱۲۸
                </li>
                <li>
                  <a
                    href="tel:+982191002245"
                    className="flex items-center gap-2 text-[11px] text-cream/55 transition-colors hover:text-cream"
                  >
                    <Phone size={14} className="shrink-0 text-brass/70" />
                    <span dir="ltr">021-91002245</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hello@arka.studio"
                    className="flex items-center gap-2 text-[11px] text-cream/55 transition-colors hover:text-cream"
                  >
                    <Mail size={14} className="shrink-0 text-brass/70" />
                    hello@arka.studio
                  </a>
                </li>
                <li className="flex items-center gap-2 text-[11px] text-cream/55">
                  <Clock size={14} className="shrink-0 text-brass/70" />
                  شنبه تا پنجشنبه، ۱۰ تا ۲۰
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 border-t border-white/10 py-4">
            <span className="text-[10px] text-cream/40">همچنین در:</span>
            {["دیجی‌کالا", "ترب", "ایمالز", "باسلام"].map((market) => (
              <a
                key={market}
                href="#products"
                className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] text-cream/55 transition-colors hover:border-brass/50 hover:text-cream"
              >
                {market}
              </a>
            ))}
            <a
              href="#products"
              className="inline-flex items-center gap-1 rounded-full border border-dashed border-white/15 px-2.5 py-1 text-[10px] text-cream/40 transition-colors hover:border-brass/50 hover:text-brass"
            >
              + سایر مارکت‌پلیس‌ها
              <ArrowUpLeft size={11} />
            </a>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[10px] text-cream/35">
              © ۱۴۰۵ آرکا — تمام حقوق محفوظ است. طراحی با{" "}
              <span className="text-brass">♥</span> برای خانه‌های ایرانی.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {[
                { Icon: ShieldCheck, label: "پرداخت امن" },
                { Icon: Truck, label: "ارسال سراسری" },
                { Icon: RefreshCw, label: "۷ روز بازگشت" },
              ].map(({ Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1.5 text-[9px] text-cream/45"
                >
                  <Icon size={12} className="text-brass/70" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
