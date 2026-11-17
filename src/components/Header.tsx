import { useEffect, useState } from "react";
import {
  Heart,
  Menu,
  Phone,
  Search,
  ShoppingBag,
  Sparkles,
  Truck,
  User,
  X,
} from "lucide-react";
import { cn } from "../utils/cn";
import { NAV_LINKS, PRODUCTS, faNum } from "../lib/data";
import { useShop } from "../lib/store";
import { ArrowLeft } from "lucide-react";
import { Logo } from "./ui";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount, favorites, openDrawer, setSearchOpen } = useShop();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const solid = scrolled;
  const iconButton = cn(
    "relative grid h-10 w-10 place-items-center rounded-full border border-transparent transition-colors",
    solid ? "text-navy hover:bg-ink/[0.06]" : "text-cream hover:bg-white/10",
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* announcement */}
        <div
          className={cn(
            "overflow-hidden bg-navy-deep text-cream/75 transition-all duration-500",
            solid ? "h-0 opacity-0" : "h-9 opacity-100",
          )}
        >
          <div className="shell flex h-9 items-center justify-between gap-4 text-[10px] sm:text-[11px]">
            <p className="flex items-center gap-2">
              <Sparkles size={12} className="text-brass" />
              ارسال و نصب رایگان برای سفارش‌های بالای ۲۰ میلیون تومان
            </p>
            <div className="hidden items-center gap-4 sm:flex">
              <a
                href="tel:+982191002245"
                className="flex items-center gap-1.5 transition-colors hover:text-brass"
                dir="ltr"
              >
                <Phone size={12} />
                021-91002245
              </a>
              <span className="h-3 w-px bg-white/15" />
              <a href="#contact" className="transition-colors hover:text-brass">
                پیگیری سفارش
              </a>
            </div>
          </div>
        </div>

        {/* nav */}
        <div
          className={cn(
            "border-b transition-all duration-500",
            solid
              ? "border-ink/10 bg-cream/95 shadow-[0_18px_40px_-30px_rgba(8,26,38,0.6)] backdrop-blur-xl"
              : "border-white/10 bg-gradient-to-b from-navy-deep/70 via-navy-deep/25 to-transparent",
          )}
        >
          <div className="shell flex h-[72px] items-center justify-between gap-4">
            <Logo tone={solid ? "dark" : "light"} />

            <nav
              aria-label="ناوبری اصلی"
              className={cn(
                "hidden items-center gap-6 text-[13px] font-medium lg:flex xl:gap-8",
                solid ? "text-navy/80" : "text-cream/85",
              )}
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative py-2 transition-colors after:absolute after:bottom-0 after:right-0 after:h-px after:w-0 after:bg-brass after:transition-all after:duration-300 hover:text-brass hover:after:w-full"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-0.5 sm:gap-1">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className={cn(
                  "hidden h-10 items-center gap-2 rounded-full border px-3.5 text-[11px] transition-colors md:flex",
                  solid
                    ? "border-ink/12 bg-white/60 text-muted hover:border-brass/60"
                    : "border-white/20 bg-white/5 text-cream/70 hover:border-brass/60",
                )}
                aria-label="جستجوی محصولات"
              >
                <Search size={15} />
                <span className="hidden lg:inline">جستجوی محصولات…</span>
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className={cn(iconButton, "md:hidden")}
                aria-label="جستجوی محصولات"
              >
                <Search size={19} />
              </button>
              <button
                type="button"
                onClick={() => openDrawer("wishlist")}
                className={iconButton}
                aria-label={`علاقه‌مندی‌ها (${faNum(favorites.length)})`}
              >
                <Heart size={19} />
                {favorites.length > 0 ? (
                  <span className="absolute end-1 top-1 h-2 w-2 rounded-full bg-brass ring-2 ring-navy-deep" />
                ) : null}
              </button>
              <button
                type="button"
                onClick={() => openDrawer("cart")}
                className={iconButton}
                aria-label={`سبد خرید (${faNum(cartCount)})`}
              >
                <ShoppingBag size={19} />
                {cartCount > 0 ? (
                  <span
                    className={cn(
                      "absolute -end-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full px-1 text-[9px] font-bold tabular-nums",
                      solid
                        ? "bg-navy text-cream"
                        : "bg-brass text-navy-deep",
                    )}
                  >
                    {faNum(cartCount)}
                  </span>
                ) : null}
              </button>
              <a
                href="#contact"
                className={cn(iconButton, "hidden sm:grid")}
                aria-label="حساب کاربری"
              >
                <User size={19} />
              </a>
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className={cn(iconButton, "lg:hidden")}
                aria-label="باز کردن منو"
                aria-expanded={mobileOpen}
              >
                <Menu size={21} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* mobile menu */}
      {mobileOpen ? (
        <div
          className="fixed inset-0 z-[80] flex flex-col bg-navy-deep text-cream animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="منوی موبایل"
        >
          <div className="shell flex h-[72px] shrink-0 items-center justify-between border-b border-white/10">
            <Logo tone="light" />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-cream transition-colors hover:bg-white/10"
              aria-label="بستن منو"
            >
              <X size={20} />
            </button>
          </div>

          <div className="thin-scrollbar flex-1 overflow-y-auto">
            <div className="shell py-7">
              <nav aria-label="ناوبری موبایل" className="flex flex-col">
                {NAV_LINKS.map((link, index) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-center justify-between border-b border-white/8 py-4"
                  >
                    <span className="flex items-center gap-4">
                      <span className="font-display text-sm text-brass/70">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-lg font-semibold">{link.label}</span>
                    </span>
                    <ArrowLeft
                      size={17}
                      className="text-cream/40 transition-transform group-hover:-translate-x-1 group-hover:text-brass"
                    />
                  </a>
                ))}
              </nav>

              <div className="mt-8">
                <p className="text-[10px] uppercase tracking-[0.3em] text-brass">
                  Popular categories
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {PRODUCTS.slice(0, 4).map((product) => (
                    <a
                      key={product.id}
                      href="#products"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-2.5"
                    >
                      <img
                        src={product.image}
                        alt=""
                        className="h-12 w-12 rounded-xl object-cover"
                        loading="lazy"
                      />
                      <span className="text-xs font-medium text-cream/80">
                        {product.category}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="flex items-center gap-2 text-xs text-cream/60">
                  <Truck size={15} className="text-brass" />
                  ارسال و نصب رایگان سفارش‌های بالای ۲۰ میلیون تومان
                </p>
                <a
                  href="tel:+982191002245"
                  dir="ltr"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-cream"
                >
                  <Phone size={15} className="text-brass" />
                  021-91002245
                </a>
              </div>

              <a
                href="#experience"
                onClick={() => setMobileOpen(false)}
                className="mt-6 flex h-12 items-center justify-center gap-2 rounded-full bg-brass text-sm font-bold text-navy-deep"
              >
                شروع تجربه سه‌بعدی
                <ArrowLeft size={16} />
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
