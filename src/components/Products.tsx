import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpLeft,
  ChevronDown,
  Eye,
  Heart,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import {
  CATEGORIES,
  PRODUCTS,
  SORT_OPTIONS,
  faNum,
  type Product,
} from "../lib/data";
import { useShop } from "../lib/store";
import { cn } from "../utils/cn";
import { SectionHead, Stars } from "./ui";

/* ============================== product card ============================== */
export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const { addToCart, openProduct, toggleFavorite, isFavorite } = useShop();
  const liked = isFavorite(product.id);
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <article
      className="group animate-fade-up flex min-w-0 flex-col"
      style={{ animationDelay: `${Math.min(index, 7) * 55}ms` }}
    >
      <div className="relative">
        <button
          type="button"
          onClick={() => openProduct(product)}
          aria-label={`مشاهده سریع ${product.name}`}
          className="relative block aspect-[4/5] w-full overflow-hidden rounded-[20px] border border-ink/8 bg-cream-200 sm:rounded-[24px]"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.06] group-hover:opacity-0"
          />
          <img
            src={product.secondary}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-all duration-700 group-hover:scale-100 group-hover:opacity-100"
          />
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </button>

        {/* badges */}
        <div className="pointer-events-none absolute start-2.5 top-2.5 z-10 flex flex-col items-start gap-1.5">
          {product.badge ? (
            <span className="rounded-full bg-navy px-2.5 py-1 text-[9px] font-bold text-cream shadow-sm">
              {product.badge}
            </span>
          ) : null}
          {discount > 0 ? (
            <span className="rounded-full bg-brass px-2 py-1 text-[9px] font-extrabold text-navy-deep shadow-sm">
              {faNum(discount)}٪ تخفیف
            </span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => toggleFavorite(product)}
          aria-label={liked ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
          aria-pressed={liked}
          className={cn(
            "absolute end-2.5 top-2.5 z-10 grid h-8 w-8 place-items-center rounded-full border backdrop-blur-md transition-all sm:h-9 sm:w-9",
            liked
              ? "border-brass bg-cream text-brass-dark"
              : "border-white/60 bg-cream/80 text-navy/70 hover:border-brass hover:text-brass-dark",
          )}
        >
          <Heart size={14} className={liked ? "fill-current" : ""} />
        </button>

        {/* hover actions */}
        <div className="absolute inset-x-2.5 bottom-2.5 z-10 flex translate-y-0 items-center gap-1.5 opacity-100 transition-all duration-300 lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
          <button
            type="button"
            onClick={() => openProduct(product)}
            className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 truncate rounded-full border border-white/60 bg-cream/90 px-2 text-[10px] font-bold text-navy backdrop-blur transition-colors hover:bg-white"
          >
            <Eye size={13} />
            مشاهده سریع
          </button>
          <button
            type="button"
            onClick={() => addToCart(product)}
            aria-label={`افزودن ${product.name} به سبد خرید`}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy text-cream shadow-md transition-colors hover:bg-brass hover:text-navy-deep"
          >
            <ShoppingBag size={14} />
          </button>
        </div>
      </div>

      <div className="mt-3 px-0.5 sm:mt-4">
        <div className="flex items-center justify-between gap-2">
          <span className="font-display truncate text-[10px] tracking-[0.22em] text-muted">
            {product.latin}
          </span>
          <Stars rating={product.rating} />
        </div>
        <button
          type="button"
          onClick={() => openProduct(product)}
          className="mt-1 block max-w-full truncate text-start text-[13px] font-bold text-navy transition-colors hover:text-brass-dark sm:text-sm"
        >
          {product.name}
        </button>
        <p className="mt-1 truncate text-[10px] text-muted sm:text-[11px]">
          {product.material} · {product.category}
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[13px] font-extrabold text-navy sm:text-[15px]">
              {faNum(product.price)}
            </span>
            <span className="text-[10px] text-muted">تومان</span>
            {product.oldPrice ? (
              <span className="hidden text-[10px] text-muted line-through sm:inline">
                {faNum(product.oldPrice)}
              </span>
            ) : null}
          </div>
          <div className="flex items-center gap-1">
            {product.colors.slice(0, 3).map((color) => (
              <span
                key={color.name}
                title={color.name}
                className="h-2.5 w-2.5 rounded-full ring-1 ring-ink/10"
                style={{ background: color.hex }}
              />
            ))}
            {product.colors.length > 3 ? (
              <span className="text-[8px] text-muted">+{faNum(product.colors.length - 3)}</span>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

/* ============================== categories ============================== */
function Collections() {
  return (
    <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {CATEGORIES.map((category, index) => (
        <a
          key={category.id}
          href="#products"
          data-reveal
          style={{ ["--reveal-delay" as string]: `${index * 80}ms` }}
          className="group relative block aspect-[4/5] overflow-hidden rounded-[22px] border border-ink/8 bg-cream-200 sm:rounded-[26px]"
        >
          <img
            src={category.image}
            alt={category.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.07]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/20 to-transparent" />
          <span className="absolute start-3 top-3 rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[8px] font-semibold tracking-[0.22em] text-cream/90 backdrop-blur">
            {category.latin}
          </span>
          <span className="font-display absolute end-3 top-3 text-[10px] tracking-[0.2em] text-cream/50">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2 text-cream sm:inset-x-4 sm:bottom-4">
            <div className="min-w-0">
              <h3 className="text-sm font-extrabold sm:text-lg">{category.title}</h3>
              <p className="mt-1 truncate text-[9px] text-cream/55 sm:text-[10px]">
                {faNum(category.count)} محصول
              </p>
            </div>
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cream text-navy transition-all duration-300 group-hover:-translate-x-1 group-hover:bg-brass sm:h-9 sm:w-9">
              <ArrowUpLeft size={14} />
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}

/* =============================== section =============================== */
const filters = ["همه", "صندلی", "میز", "مبل"];

export default function Products() {
  const { openProduct, notify } = useShop();
  const [filter, setFilter] = useState("همه");
  const [sort, setSort] = useState("popular");

  const list = useMemo(() => {
    const filtered =
      filter === "همه" ? [...PRODUCTS] : PRODUCTS.filter((item) => item.category === filter);
    switch (sort) {
      case "cheap":
        return filtered.sort((a, b) => a.price - b.price);
      case "expensive":
        return filtered.sort((a, b) => b.price - a.price);
      case "new":
        return filtered.sort(
          (a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)) || b.rating - a.rating,
        );
      default:
        return filtered.sort((a, b) => b.reviews - a.reviews);
    }
  }, [filter, sort]);

  return (
    <>
      <section id="collections" className="shell py-14 sm:py-16 lg:py-20">
        <SectionHead
          kicker="CURATED COLLECTIONS"
          title="دسته‌بندی محصولات"
          desc="از گوشه‌ی دنج کتاب تا میز ناهارخوریِ دورهمی‌ها؛ هر فضا مجموعه‌ی خودش را دارد."
          action={{ label: "همه مجموعه‌ها", href: "#products" }}
        />
        <Collections />
      </section>

      <section id="products" className="relative pb-16 sm:pb-20 lg:pb-24">
        <div className="shell">
          <div className="rounded-[30px] border border-ink/8 bg-cream-100/70 p-4 sm:p-6 lg:p-8">
            <SectionHead
              kicker="BEST SELLERS"
              title="محصولات پرطرفدار"
              desc="پرفروش‌ترین‌های این فصل آرکا؛ انتخاب‌شده برای کیفیت، دوام و هماهنگی با خانه‌ی شما."
              action={{ label: "مشاهده همه محصولات", href: "#collections" }}
            />

            <div className="mt-6 flex flex-col gap-3 border-t border-ink/8 pt-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="no-scrollbar -mx-1 flex items-center gap-1.5 overflow-x-auto px-1">
                {filters.map((item) => {
                  const count =
                    item === "همه"
                      ? PRODUCTS.length
                      : PRODUCTS.filter((product) => product.category === item).length;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setFilter(item)}
                      aria-pressed={filter === item}
                      className={cn(
                        "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-[11px] font-semibold transition-all",
                        filter === item
                          ? "border-navy bg-navy text-cream"
                          : "border-ink/10 bg-white/60 text-navy/65 hover:border-brass hover:text-navy",
                      )}
                    >
                      {item}
                      <span
                        className={cn(
                          "rounded-full px-1.5 text-[9px] tabular-nums",
                          filter === item ? "bg-white/15 text-cream/80" : "bg-cream-200 text-muted",
                        )}
                      >
                        {faNum(count)}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 text-[10px] text-muted">
                  <SlidersHorizontal size={13} />
                  {faNum(list.length)} محصول
                </span>
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(event) => setSort(event.target.value)}
                    aria-label="مرتب‌سازی محصولات"
                    className="h-9 appearance-none rounded-full border border-ink/12 bg-white/80 ps-3.5 pe-8 text-[10px] font-semibold text-navy outline-none transition-colors hover:border-brass"
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={13}
                    className="pointer-events-none absolute end-2.5 top-1/2 -translate-y-1/2 text-navy/50"
                  />
                </div>
              </div>
            </div>

            <div
              key={`${filter}-${sort}`}
              className="mt-6 grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-9 lg:grid-cols-4"
            >
              {list.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>

            <div className="mt-9 flex flex-col items-center justify-between gap-4 rounded-[22px] border border-ink/10 bg-cream-50 px-5 py-4 sm:flex-row">
              <div className="flex items-center gap-3 text-center sm:text-start">
                <span className="hidden h-10 w-10 place-items-center rounded-full bg-brass/15 text-brass-dark sm:grid">
                  <Sparkles size={17} />
                </span>
                <div>
                  <p className="text-[12px] font-bold text-navy">
                    محصولی که می‌خواهید در مجموعه نیست؟
                  </p>
                  <p className="mt-1 text-[10px] text-muted">
                    با مشاوران آرکا تماس بگیرید؛ سفارش‌های اختصاصی ابعاد و رنگ پذیرفته می‌شود.
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => notify("درخواست مشاوره ثبت شد؛ به‌زودی با شما تماس می‌گیریم")}
                  className="inline-flex h-9 items-center gap-1.5 rounded-full border border-navy/15 px-4 text-[10px] font-bold text-navy transition-colors hover:border-brass hover:bg-brass/10"
                >
                  مشاوره رایگان
                  <ArrowUpLeft size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFilter("همه");
                    setSort("popular");
                    openProduct(PRODUCTS[0]);
                  }}
                  className="inline-flex h-9 items-center gap-1.5 rounded-full bg-navy px-4 text-[10px] font-bold text-cream transition-colors hover:bg-navy-deep"
                >
                  پیشنهاد آرکا
                  <ArrowLeft size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
