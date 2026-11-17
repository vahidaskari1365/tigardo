import { useState } from "react";
import {
  ArrowLeft,
  ArrowUpLeft,
  Check,
  Eye,
  Heart,
  Maximize2,
  Move,
  RefreshCw,
  RotateCcw,
  Scan,
  ShieldCheck,
  ShoppingBag,
  Truck,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { BUNDLE, IMG, PRODUCTS, faNum, faPrice, type Product } from "../lib/data";
import { useShop } from "../lib/store";
import { cn } from "../utils/cn";
import Product3DViewer from "./Product3DViewer";
import { ColorDot, QtyStepper, SectionHead, Stars } from "./ui";

const configurators = ["ava", "olivia", "neo"].map(
  (id) => PRODUCTS.find((product) => product.id === id)!,
);

const demoTabs = [
  { id: "3d", label: "نمایش سه‌بعدی" },
  { id: "ar", label: "نمایش در فضا" },
  { id: "specs", label: "مشخصات" },
] as const;

type DemoTab = (typeof demoTabs)[number]["id"];

/* ============================ configurator ============================ */
function Configurator() {
  const { addToCart, toggleFavorite, isFavorite } = useShop();
  const [activeId, setActiveId] = useState(configurators[0].id);
  const [colorIndex, setColorIndex] = useState(0);
  const [legIndex, setLegIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<DemoTab>("3d");
  const [angle, setAngle] = useState(28);
  const [zoom, setZoom] = useState(1);
  const [arActive, setArActive] = useState(false);

  const active = configurators.find((item) => item.id === activeId) ?? configurators[0];
  const color = active.colors[Math.min(colorIndex, active.colors.length - 1)];
  const leg = active.legs[Math.min(legIndex, active.legs.length - 1)];
  const liked = isFavorite(active.id);

  const selectProduct = (product: Product) => {
    setActiveId(product.id);
    setColorIndex(0);
    setLegIndex(0);
    setQty(1);
    setAngle(28);
    setZoom(1);
    setArActive(false);
  };

  const resetView = () => {
    setAngle(28);
    setZoom(1);
  };

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[28px] border border-ink/10 bg-white shadow-card">
      {/* head */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/8 px-4 py-3.5 sm:px-5">
        <div className="no-scrollbar flex items-center gap-1 overflow-x-auto rounded-full bg-cream-200/70 p-1">
          {demoTabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-2 text-[11px] font-semibold transition-all sm:text-xs",
                tab === item.id
                  ? "bg-navy text-cream shadow-sm"
                  : "text-navy/60 hover:bg-white/70 hover:text-navy",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <span className="hidden items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.24em] text-muted sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-sage" />
          3D Product Studio
        </span>
      </div>

      {tab === "specs" ? (
        <SpecsPanel product={active} onBack={() => setTab("3d")} />
      ) : (
        <div className="grid flex-1 gap-5 p-4 sm:p-5 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-[1.02fr_0.98fr]">
          {/* ------------------------- visual stage ------------------------- */}
          <div className="flex flex-col">
            <div
              className={cn(
                "group relative flex flex-1 flex-col overflow-hidden rounded-[22px] border border-ink/8",
                tab === "ar" ? "bg-navy/10" : "tile",
              )}
            >
              {/* top chips */}
              <div className="absolute inset-x-3 top-3 z-30 flex items-start justify-between gap-2">
                <span className="rounded-full border border-white/50 bg-cream/90 px-2.5 py-1 text-[9px] font-semibold text-navy backdrop-blur">
                  {tab === "ar" ? "ROOM PREVIEW · نسخه نمایشی" : "۳۶۰° LIVE VIEW"}
                </span>
                <div className="flex flex-col gap-1.5">
                  <button
                    type="button"
                    onClick={() => setZoom((value) => Math.min(1.45, +(value + 0.1).toFixed(2)))}
                    aria-label="بزرگ‌نمایی"
                    className="grid h-8 w-8 place-items-center rounded-full border border-ink/10 bg-cream/90 text-navy backdrop-blur transition-colors hover:bg-white"
                  >
                    <ZoomIn size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoom((value) => Math.max(0.85, +(value - 0.1).toFixed(2)))}
                    aria-label="کوچک‌نمایی"
                    className="grid h-8 w-8 place-items-center rounded-full border border-ink/10 bg-cream/90 text-navy backdrop-blur transition-colors hover:bg-white"
                  >
                    <ZoomOut size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={resetView}
                    aria-label="بازنشانی نما"
                    className="grid h-8 w-8 place-items-center rounded-full border border-ink/10 bg-cream/90 text-navy backdrop-blur transition-colors hover:bg-white"
                  >
                    <RotateCcw size={13} />
                  </button>
                </div>
              </div>

              {/* thumbnails */}
              <div className="absolute bottom-3 start-3 z-30 flex gap-1.5 lg:flex-col">
                {configurators.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => selectProduct(product)}
                    aria-label={`انتخاب ${product.name}`}
                    aria-pressed={product.id === active.id}
                    className={cn(
                      "h-11 w-11 overflow-hidden rounded-xl border-2 bg-cream-100 transition-all",
                      product.id === active.id
                        ? "border-brass shadow-md"
                        : "border-white/60 opacity-75 hover:opacity-100",
                    )}
                  >
                    <img
                      src={product.image}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>

              {/* Real WebGL product stage — the product is made of Three.js meshes, not a rotated image. */}
              <div className="relative min-h-[330px] flex-1 sm:min-h-[380px]">
                {tab === "ar" ? (
                  <>
                    <img
                      src={IMG.roomLiving}
                      alt="پیش‌نمایش محصول در فضای واقعی"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/45 via-transparent to-navy-deep/15" />
                  </>
                ) : (
                  <>
                    <span className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-brass/40 sm:h-[285px] sm:w-[285px]" />
                    <span className="pointer-events-none absolute bottom-14 left-1/2 z-[1] h-8 w-[190px] -translate-x-1/2 rounded-[50%] bg-navy/15 blur-lg" />
                  </>
                )}

                <Product3DViewer
                  product={active}
                  color={color}
                  leg={leg}
                  angle={angle}
                  zoom={zoom}
                  onAngleChange={setAngle}
                  onZoomChange={setZoom}
                  showStatus={false}
                  className="absolute inset-0 z-10"
                />

                {tab === "ar" ? (
                  <>
                    <span className="pointer-events-none absolute inset-5 z-20">
                      <span className="absolute start-0 top-0 h-6 w-6 border-s-2 border-t-2 border-cream/90" />
                      <span className="absolute end-0 top-0 h-6 w-6 border-e-2 border-t-2 border-cream/90" />
                      <span className="absolute bottom-0 start-0 h-6 w-6 border-b-2 border-s-2 border-cream/90" />
                      <span className="absolute bottom-0 end-0 h-6 w-6 border-b-2 border-e-2 border-cream/90" />
                    </span>
                    {arActive ? (
                      <span className="scanline pointer-events-none absolute inset-x-8 z-30 h-px bg-brass shadow-[0_0_18px_4px_rgba(198,166,120,0.55)]" />
                    ) : null}
                    <button
                      type="button"
                      onClick={() => setArActive((value) => !value)}
                      className="absolute bottom-3 end-3 z-30 inline-flex items-center gap-1.5 rounded-full bg-cream/95 px-3 py-2 text-[10px] font-bold text-navy backdrop-blur transition-colors hover:bg-brass"
                    >
                      <Scan size={13} />
                      {arActive ? "پیش‌نمایش فعال است" : "فعال‌سازی پیش‌نمایش"}
                    </button>
                  </>
                ) : (
                  <span className="pointer-events-none absolute bottom-3 end-3 z-30 inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-white/75 px-2.5 py-1 text-[9px] font-medium text-navy/70 backdrop-blur">
                    <Move size={11} />
                    مدل واقعی — برای چرخش بکشید
                  </span>
                )}
              </div>

              {/* rotation bar */}
              <div className="relative z-30 flex items-center gap-3 border-t border-ink/8 bg-white/70 px-4 py-2.5 backdrop-blur">
                <span className="shrink-0 text-[10px] font-semibold tabular-nums text-navy/70">
                  {faNum(Math.round(angle))}°
                </span>
                <input
                  type="range"
                  min={0}
                  max={360}
                  value={angle}
                  onChange={(event) => setAngle(Number(event.target.value))}
                  aria-label="چرخش ۳۶۰ درجه محصول"
                  className="h-1 w-full cursor-pointer rounded-full bg-cream-300"
                />
                <span className="shrink-0 rounded-full bg-cream-200 px-2 py-0.5 text-[9px] font-semibold text-navy/60">
                  ۳۶۰°
                </span>
              </div>
            </div>
          </div>

          {/* --------------------------- info panel --------------------------- */}
          <div className="flex flex-col">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-cream-200 px-2 py-0.5 text-[9px] font-semibold text-navy/70">
                    {active.category}
                  </span>
                  {active.badge ? (
                    <span className="rounded-full bg-brass/15 px-2 py-0.5 text-[9px] font-semibold text-brass-dark">
                      {active.badge}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-2.5 text-lg font-extrabold text-navy sm:text-xl">
                  {active.name}
                </h3>
                <p className="font-display mt-0.5 text-[10px] tracking-[0.28em] text-muted">
                  {active.latin}
                </p>
              </div>
              <button
                type="button"
                onClick={() => toggleFavorite(active)}
                aria-label={liked ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
                aria-pressed={liked}
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-colors",
                  liked
                    ? "border-brass bg-brass/15 text-brass-dark"
                    : "border-ink/10 text-navy/50 hover:border-brass hover:text-brass-dark",
                )}
              >
                <Heart size={15} className={liked ? "fill-current" : ""} />
              </button>
            </div>

            <div className="mt-2.5 flex flex-wrap items-center gap-3">
              <Stars rating={active.rating} count={active.reviews} />
              <span className="h-3 w-px bg-ink/10" />
              <span className="text-[10px] text-muted">{active.material}</span>
            </div>

            <div className="mt-4 flex items-end justify-between gap-3 rounded-2xl bg-cream-100 px-3.5 py-3">
              <div>
                {active.oldPrice ? (
                  <p className="text-[10px] text-muted">
                    <span className="line-through">{faNum(active.oldPrice)}</span> تومان
                  </p>
                ) : (
                  <p className="text-[10px] text-muted">قیمت نهایی</p>
                )}
                <p className="mt-1 text-lg font-extrabold text-navy">
                  {faNum(active.price)}
                  <span className="ms-1 text-[10px] font-medium text-muted">تومان</span>
                </p>
              </div>
              {active.oldPrice ? (
                <span className="rounded-full bg-navy px-2.5 py-1 text-[10px] font-bold text-cream">
                  {faNum(Math.round(((active.oldPrice - active.price) / active.oldPrice) * 100))}٪
                  تخفیف
                </span>
              ) : null}
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold text-navy">رنگ پارچه</p>
                <p className="text-[10px] text-muted">{color.name}</p>
              </div>
              <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
                {active.colors.map((item, index) => (
                  <ColorDot
                    key={item.name}
                    hex={item.hex}
                    selected={color.name === item.name}
                    onClick={() => setColorIndex(index)}
                    label={item.name}
                  />
                ))}
              </div>
            </div>

            <div className="mt-3.5">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold text-navy">رنگ پایه</p>
                <p className="text-[10px] text-muted">{leg.name}</p>
              </div>
              <div className="mt-2.5 flex items-center gap-2.5">
                {active.legs.map((item, index) => (
                  <ColorDot
                    key={item.name}
                    hex={item.hex}
                    metallic
                    selected={leg.name === item.name}
                    onClick={() => setLegIndex(index)}
                    label={item.name}
                    size="sm"
                  />
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2">
              <QtyStepper value={qty} onChange={setQty} size="md" />
              <button
                type="button"
                onClick={() =>
                  addToCart(active, { qty, color, leg: active.legs[legIndex] })
                }
                className="group inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-navy px-4 text-[12px] font-bold text-cream transition-colors hover:bg-navy-deep"
              >
                <ShoppingBag size={15} />
                افزودن به سبد خرید
                <ArrowLeft
                  size={14}
                  className="opacity-60 transition-transform group-hover:-translate-x-1"
                />
              </button>
            </div>

            <div className="mt-auto grid grid-cols-3 gap-2 pt-4 text-center text-[10px] text-muted">
              {[
                { Icon: Truck, label: "ارسال رایگان" },
                { Icon: ShieldCheck, label: "ضمانت ۵ ساله" },
                { Icon: RefreshCw, label: "۷ روز بازگشت" },
              ].map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 rounded-xl border border-ink/8 bg-cream-50 px-1.5 py-2"
                >
                  <Icon size={14} className="text-brass-dark" />
                  {label}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setTab("specs")}
              className="mt-3.5 inline-flex items-center gap-1.5 self-start text-[11px] font-semibold text-navy/70 underline decoration-brass/50 decoration-dotted underline-offset-4 transition-colors hover:text-brass-dark"
            >
              مشاهده تمام مشخصات
              <ArrowUpLeft size={12} />
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

/* ----------------------------- specs panel ---------------------------- */
function SpecsPanel({ product, onBack }: { product: Product; onBack: () => void }) {
  const specs = [
    { label: "جنس رویه", value: product.material },
    { label: "ابعاد", value: product.dimensions },
    { label: "اسکلت", value: "چوب راش خشک‌شده" },
    { label: "اسفنج", value: "فوم سرد با چگالی ۳۵" },
    { label: "ضمانت", value: "۵ سال ضمانت سازه" },
    { label: "ساخت", value: "ایران — کارگاه آرکا" },
  ];

  return (
    <div className="animate-fade-in grid flex-1 gap-5 p-4 sm:p-5 md:grid-cols-2">
      <div className="tile flex flex-col items-center justify-center rounded-[22px] border border-ink/8 p-4">
        <img
          src={product.image}
          alt={product.name}
          className="h-[240px] w-auto object-contain drop-shadow-xl sm:h-[300px]"
        />
        <div className="mt-3 flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 text-[10px] text-navy/70 backdrop-blur">
          <Eye size={12} className="text-brass-dark" />
          {product.name} — نمای استودیویی
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-brass-dark">
          Product details
        </p>
        <h3 className="mt-2 text-xl font-extrabold text-navy">{product.name}</h3>
        <p className="mt-2.5 text-[12px] leading-7 text-muted">{product.description}</p>

        <dl className="mt-4 divide-y divide-ink/8 rounded-2xl border border-ink/8 bg-cream-50 px-3.5">
          {specs.map((spec) => (
            <div key={spec.label} className="flex items-center justify-between gap-4 py-2.5">
              <dt className="text-[11px] text-muted">{spec.label}</dt>
              <dd className="text-[11px] font-semibold text-navy">{spec.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Stars rating={product.rating} count={product.reviews} />
          <span className="text-[10px] text-muted">
            رنگ‌های موجود: {product.colors.map((c) => c.name).join("، ")}
          </span>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="mt-5 inline-flex items-center gap-2 self-start rounded-full border border-navy/15 px-4 py-2.5 text-[11px] font-semibold text-navy transition-colors hover:border-brass hover:bg-brass/10"
        >
          <RotateCcw size={13} />
          بازگشت به نمایش سه‌بعدی
        </button>
      </div>
    </div>
  );
}

/* =========================== room preview =========================== */
const roomViews = [
  { id: "dining", label: "ناهارخوری", image: IMG.roomDining, productId: "ava", count: 6 },
  { id: "living", label: "نشیمن", image: IMG.roomLiving, productId: "minoo", count: 4 },
  { id: "kitchen", label: "آشپزخانه", image: IMG.hero, productId: "neo", count: 3 },
];

function RoomPreview() {
  const [viewIndex, setViewIndex] = useState(0);
  const view = roomViews[viewIndex];
  const featured = PRODUCTS.find((product) => product.id === view.productId)!;
  const { addToCart } = useShop();

  return (
    <article className="overflow-hidden rounded-[28px] border border-ink/10 bg-white p-3.5 shadow-card sm:p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-sage" />
          <h3 className="text-[13px] font-bold text-navy">محصول در فضای واقعی</h3>
        </div>
        <a
          href="#inspiration"
          className="inline-flex items-center gap-1 text-[10px] font-semibold text-muted transition-colors hover:text-brass-dark"
        >
          کاوش فضا
          <ArrowUpLeft size={12} />
        </a>
      </div>

      <div className="no-scrollbar mb-2.5 flex gap-1 rounded-full bg-cream-200/70 p-1">
        {roomViews.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setViewIndex(index)}
            className={cn(
              "flex-1 rounded-full px-2 py-1.5 text-[10px] font-semibold transition-colors",
              viewIndex === index ? "bg-white text-navy shadow-sm" : "text-navy/55 hover:text-navy",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <a
        href="#inspiration"
        className="group relative block aspect-[4/3] overflow-hidden rounded-[18px] bg-cream-200"
      >
        {roomViews.map((item, index) => (
          <img
            key={item.id}
            src={item.image}
            alt={`اتاق ${item.label}`}
            loading="lazy"
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105",
              index === viewIndex ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-navy-deep/5 to-transparent" />
        <span className="absolute start-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-cream/90 px-2.5 py-1 text-[9px] font-semibold text-navy backdrop-blur">
          <Eye size={11} />
          مشاهده در فضای واقعی
        </span>
        <span className="absolute end-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-white/40 bg-white/15 text-cream backdrop-blur transition-colors group-hover:bg-brass group-hover:text-navy-deep">
          <Maximize2 size={13} />
        </span>
        <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2 text-cream">
          <div>
            <p className="text-[9px] uppercase tracking-[0.2em] text-cream/60">{view.id}</p>
            <p className="mt-0.5 text-[12px] font-bold">{faNum(view.count)} محصول در این فضا</p>
          </div>
          <span className="rounded-full border border-white/25 bg-white/10 px-2 py-1 text-[9px] backdrop-blur">
            کلیک برای کاوش
          </span>
        </div>
      </a>

      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-[11px] font-semibold text-navy">{featured.name}</p>
          <p className="mt-0.5 text-[10px] text-muted">{faPrice(featured.price)}</p>
        </div>
        <button
          type="button"
          onClick={() => addToCart(featured)}
          aria-label={`افزودن ${featured.name} به سبد خرید`}
          className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-navy px-3.5 text-[10px] font-bold text-cream transition-colors hover:bg-navy-deep"
        >
          <ShoppingBag size={13} />
          افزودن
        </button>
      </div>
    </article>
  );
}

/* ============================ bundle offer ============================ */
function BundleCard() {
  const { addToCart, openProduct } = useShop();
  const [swatch, setSwatch] = useState(0);
  const colors = BUNDLE.colors.slice(0, 3);

  return (
    <article className="relative flex flex-1 flex-col overflow-hidden rounded-[28px] bg-navy-deep p-4 text-cream shadow-card">
      <div className="pointer-events-none absolute -end-16 -top-16 h-48 w-48 rounded-full bg-brass/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -start-10 h-40 w-40 rounded-full bg-sage/20 blur-3xl" />

      <div className="relative flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[9px] font-semibold tracking-[0.18em] text-brass">
          BUNDLE OFFER
        </span>
        <span className="rounded-full bg-brass px-2 py-0.5 text-[9px] font-bold text-navy-deep">
          ۱۵٪ ارزان‌تر
        </span>
      </div>

      <div className="relative mt-3 flex items-center gap-3">
        <div className="relative h-[86px] w-[104px] shrink-0 overflow-hidden rounded-2xl border border-white/15">
          <img src={IMG.roomLiving} alt="ست نشیمن آرکا" className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 to-transparent" />
          <span className="absolute bottom-2 start-2 rounded-full bg-cream/90 px-1.5 py-0.5 text-[8px] font-bold text-navy">
            ۳ تکه
          </span>
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-extrabold">{BUNDLE.name}</h3>
          <p className="mt-1 text-[10px] leading-5 text-cream/55">
            مبل سه‌نفره مینو + صندلی بازوی تِرا + میز لیا
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-sm font-bold text-brass">{faNum(BUNDLE.price)}</span>
            <span className="text-[9px] text-cream/40 line-through">{faNum(BUNDLE.oldPrice!)}</span>
          </div>
        </div>
      </div>

      <div className="relative mt-3.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {colors.map((color, index) => (
            <button
              key={color.name}
              type="button"
              onClick={() => setSwatch(index)}
              aria-label={`رنگ ${color.name}`}
              aria-pressed={swatch === index}
              className={cn(
                "h-5 w-5 rounded-full ring-offset-2 ring-offset-navy-deep transition-all",
                swatch === index ? "ring-2 ring-brass" : "ring-1 ring-white/25",
              )}
              style={{ background: color.hex }}
            />
          ))}
          <span className="text-[9px] text-cream/45">{colors[swatch].name}</span>
        </div>
        <button
          type="button"
          onClick={() => openProduct(BUNDLE)}
          className="text-[10px] font-semibold text-cream/60 underline decoration-brass/60 underline-offset-4 hover:text-brass"
        >
          جزئیات ست
        </button>
      </div>

      <button
        type="button"
        onClick={() => addToCart(BUNDLE, { color: colors[swatch] })}
        className="relative mt-3 inline-flex h-10 items-center justify-center gap-2 rounded-full bg-cream text-[11px] font-bold text-navy transition-colors hover:bg-brass"
      >
        <ShoppingBag size={14} />
        افزودن ست کامل به سبد
        <ArrowLeft size={13} />
      </button>
    </article>
  );
}

/* ========================== trust features ========================== */
const features = [
  { Icon: Truck, title: "ارسال و نصب رایگان", desc: "برای سفارش‌های بالای ۲۰ میلیون" },
  { Icon: ShieldCheck, title: "ضمانت اصالت کالا", desc: "۵ سال ضمانت سازه و اسکلت" },
  { Icon: RefreshCw, title: "۷ روز بازگشت", desc: "بدون هیچ پرسشی، بدون هزینه" },
  { Icon: Check, title: "مشاوره تخصصی", desc: "چیدمان رایگان با طراح آرکا" },
];

function TrustFeatures() {
  return (
    <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-[24px] border border-ink/10 bg-ink/8 lg:grid-cols-4">
      {features.map(({ Icon, title, desc }) => (
        <div
          key={title}
          className="group flex items-start gap-3 bg-cream-50 px-4 py-4 transition-colors hover:bg-white"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-brass/30 bg-brass/10 text-brass-dark">
            <Icon size={16} />
          </span>
          <div>
            <p className="text-[11px] font-bold text-navy sm:text-xs">{title}</p>
            <p className="mt-1 text-[9px] leading-4 text-muted sm:text-[10px]">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============================= section ============================= */
export default function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden bg-cream py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute -start-24 top-32 h-72 w-72 rounded-full bg-brass/8 blur-3xl" />
      <div className="shell relative">
        <SectionHead
          kicker="3D EXPERIENCE"
          title={
            <>
              محصول را از هر زاویه ببین،
              <span className="text-brass-dark"> بعد انتخاب کن.</span>
            </>
          }
          desc="رنگ پارچه و پایه را تغییر دهید، محصول را ۳۶۰ درجه بچرخانید و آن را در چیدمان واقعی اتاق ببینید. همه‌چیز پیش از خرید، در دست شماست."
          action={{ label: "اتاق‌های الهام", href: "#inspiration" }}
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.38fr_1fr]">
          <div data-reveal>
            <Configurator />
          </div>
          <div className="flex flex-col gap-5" data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
            <RoomPreview />
            <BundleCard />
          </div>
        </div>

        <div data-reveal>
          <TrustFeatures />
        </div>
      </div>
    </section>
  );
}
