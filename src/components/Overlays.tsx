import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowUp,
  Check,
  ChevronLeft,
  Heart,
  Minus,
  Move,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  PackageCheck,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  ShoppingBag,
  Truck,
  X,
} from "lucide-react";
import {
  FREE_SHIPPING,
  PRODUCTS,
  SEARCH_TAGS,
  faNum,
  faPrice,
} from "../lib/data";
import { favoriteProducts, useShop } from "../lib/store";
import { cn } from "../utils/cn";
import Product3DViewer from "./Product3DViewer";
import { ColorDot, QtyStepper, Stars } from "./ui";

/* ============================ search dialog ============================ */
export function SearchDialog() {
  const { searchOpen, setSearchOpen, openProduct, addToCart } = useShop();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!searchOpen) return;
    setQuery("");
    const timer = setTimeout(() => inputRef.current?.focus(), 120);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [searchOpen, setSearchOpen]);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return PRODUCTS.slice(0, 4);
    return PRODUCTS.filter((product) =>
      `${product.name} ${product.latin} ${product.category} ${product.material}`
        .toLowerCase()
        .includes(term),
    );
  }, [query]);

  if (!searchOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center bg-navy-deep/65 p-4 pt-[92px] backdrop-blur-sm animate-fade-in sm:pt-[120px]"
      onClick={() => setSearchOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="جستجوی محصولات"
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-[26px] border border-white/40 bg-cream-50 shadow-float"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-ink/8 px-4 py-3.5">
          <Search size={18} className="shrink-0 text-brass-dark" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="نام محصول، جنس یا دسته‌بندی را بنویسید…"
            aria-label="جستجو"
            className="h-9 flex-1 bg-transparent text-[13px] text-navy outline-none placeholder:text-muted/70"
          />
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            aria-label="بستن جستجو"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink/10 text-navy/60 transition-colors hover:border-brass hover:text-navy"
          >
            <X size={15} />
          </button>
        </div>

        <div className="thin-scrollbar max-h-[62vh] overflow-y-auto p-3.5 sm:p-4">
          <div className="mb-3 flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] text-muted">پیشنهادها:</span>
            {SEARCH_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setQuery(tag)}
                className="rounded-full border border-ink/10 bg-cream-100 px-2.5 py-1 text-[10px] text-navy/70 transition-colors hover:border-brass hover:text-navy"
              >
                {tag}
              </button>
            ))}
          </div>

          {results.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-[13px] font-bold text-navy">نتیجه‌ای پیدا نشد</p>
              <p className="mt-1.5 text-[11px] text-muted">
                عبارت دیگری را امتحان کنید یا با مشاوران آرکا تماس بگیرید.
              </p>
            </div>
          ) : (
            <ul className="space-y-1.5">
              {results.map((product) => (
                <li
                  key={product.id}
                  className="flex items-center gap-2 rounded-2xl border border-transparent pe-2 transition-colors hover:border-ink/8 hover:bg-cream-100"
                >
                  <button
                    type="button"
                    onClick={() => {
                      openProduct(product);
                      setSearchOpen(false);
                    }}
                    className="group flex min-w-0 flex-1 items-center gap-3 p-2 text-start"
                  >
                    <img
                      src={product.image}
                      alt=""
                      className="h-14 w-14 shrink-0 rounded-xl border border-ink/8 object-cover"
                      loading="lazy"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-bold text-navy">
                        {product.name}
                      </span>
                      <span className="mt-0.5 block text-[10px] text-muted">
                        {product.category} · {product.material}
                      </span>
                    </span>
                    <span className="hidden shrink-0 text-[12px] font-bold text-navy sm:block">
                      {faNum(product.price)}
                      <span className="ms-1 text-[9px] font-normal text-muted">تومان</span>
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    aria-label={`افزودن ${product.name} به سبد`}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-navy text-cream transition-colors hover:bg-brass hover:text-navy-deep"
                  >
                    <Plus size={14} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-ink/8 bg-cream-100 px-4 py-2.5 text-[9px] text-muted">
          <span>جستجوی زنده در {faNum(PRODUCTS.length)} محصول</span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-ink/15 bg-white px-1.5 py-0.5">Esc</kbd>
            برای بستن
          </span>
        </div>
      </div>
    </div>
  );
}

/* ============================ cart drawer ============================ */
export function CartDrawer() {
  const {
    cart,
    favorites,
    drawerOpen,
    drawerTab,
    setDrawerTab,
    closeDrawer,
    removeLine,
    setQty,
    addToCart,
    toggleFavorite,
    subtotal,
    shipping,
    total,
    savedAmount,
    cartCount,
    clearCart,
    openProduct,
    notify,
  } = useShop();
  const [order, setOrder] = useState<{ code: string; total: number } | null>(null);

  useEffect(() => {
    if (!drawerOpen) setOrder(null);
  }, [drawerOpen]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen, closeDrawer]);

  const wishlist = favoriteProducts(favorites);
  const progress = Math.min(100, Math.round((subtotal / FREE_SHIPPING) * 100));
  const remaining = Math.max(0, FREE_SHIPPING - subtotal);

  if (!drawerOpen) return null;

  const handleClose = () => {
    closeDrawer();
    setOrder(null);
  };

  return (
    <div className="fixed inset-0 z-[95]">
      <button
        type="button"
        aria-label="بستن سبد خرید"
        onClick={handleClose}
        className="absolute inset-0 h-full w-full cursor-default bg-navy-deep/60 backdrop-blur-sm animate-fade-in"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="سبد خرید و علاقه‌مندی‌ها"
        className="animate-drawer-in absolute inset-y-0 left-0 flex w-full max-w-[420px] flex-col bg-cream-50 shadow-float"
      >
        <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-ink/10 px-4">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-navy text-cream">
              <ShoppingBag size={16} />
            </span>
            <div>
              <p className="text-[13px] font-extrabold text-navy">سبد خرید شما</p>
              <p className="mt-0.5 text-[9px] text-muted">
                {cartCount > 0 ? `${faNum(cartCount)} قلم کالا` : "هنوز خریداری نشده"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="بستن"
            className="grid h-9 w-9 place-items-center rounded-full border border-ink/10 text-navy/60 transition-colors hover:border-brass hover:text-navy"
          >
            <X size={17} />
          </button>
        </div>

        {order ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-sage/15 text-sage">
              <PackageCheck size={36} strokeWidth={1.4} />
            </span>
            <h3 className="mt-5 text-xl font-extrabold text-navy">سفارش شما ثبت شد</h3>
            <p className="mt-2 max-w-xs text-[11px] leading-6 text-muted">
              ممنون که آرکا را انتخاب کردید. همکاران ما تا ۳۰ دقیقه‌ی آینده برای هماهنگی
              ارسال با شما تماس می‌گیرند.
            </p>
            <div className="mt-5 w-full rounded-2xl border border-dashed border-brass/50 bg-cream-100 px-4 py-3">
              <div className="flex items-center justify-between text-[10px] text-muted">
                <span>کد پیگیری</span>
                <span className="font-bold tracking-[0.16em] text-navy" dir="ltr">
                  {order.code}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] text-muted">
                <span>مبلغ پرداخت‌شده</span>
                <span className="font-bold text-navy">{faPrice(order.total)}</span>
              </div>
            </div>
            <div className="mt-5 flex w-full flex-col gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-navy text-[12px] font-bold text-cream transition-colors hover:bg-navy-deep"
              >
                بازگشت به فروشگاه
                <ArrowLeft size={15} />
              </button>
              <button
                type="button"
                onClick={() => notify("وضعیت سفارش از طریق پیامک برای شما ارسال شد")}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-navy/15 text-[11px] font-semibold text-navy transition-colors hover:border-brass hover:bg-brass/10"
              >
                پیگیری سفارش
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid shrink-0 grid-cols-2 border-b border-ink/10 px-3 pt-2">
              {[
                { id: "cart" as const, label: "سبد خرید", count: cartCount },
                { id: "wishlist" as const, label: "علاقه‌مندی‌ها", count: wishlist.length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setDrawerTab(tab.id)}
                  className={cn(
                    "relative flex items-center justify-center gap-1.5 pb-2.5 pt-2 text-[11px] font-semibold transition-colors",
                    drawerTab === tab.id ? "text-navy" : "text-muted hover:text-navy",
                  )}
                >
                  {tab.label}
                  <span className="rounded-full bg-cream-200 px-1.5 text-[9px] tabular-nums text-muted">
                    {faNum(tab.count)}
                  </span>
                  {drawerTab === tab.id ? (
                    <span className="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-brass" />
                  ) : null}
                </button>
              ))}
            </div>

            {drawerTab === "cart" ? (
              <>
                {cart.length > 0 ? (
                  <div className="shrink-0 border-b border-ink/8 bg-cream-100 px-4 py-3">
                    <p className="flex items-center gap-1.5 text-[10px] text-navy/75">
                      <Truck size={13} className="text-brass-dark" />
                      {remaining > 0 ? (
                        <>
                          <b className="font-bold">{faNum(remaining)} تومان</b> تا ارسال
                          رایگان
                        </>
                      ) : (
                        <b className="font-bold text-sage">ارسال رایگان فعال شد 🎉</b>
                      )}
                    </p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-cream-300">
                      <div
                        className="h-full rounded-full bg-gradient-to-l from-brass to-sage transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                ) : null}

                <div className="thin-scrollbar flex-1 overflow-y-auto px-4">
                  {cart.length === 0 ? (
                    <EmptyState
                      icon="cart"
                      title="سبد خریدت خالیه"
                      text="از میان مجموعه‌ی آرکا انتخاب کن؛ رنگ‌ها را عوض کن و خانه‌ات را بساز."
                      onClose={handleClose}
                    />
                  ) : (
                    <ul className="divide-y divide-ink/8">
                      {cart.map((line) => (
                        <li key={line.key} className="flex gap-3 py-4">
                          <button
                            type="button"
                            onClick={() => {
                              handleClose();
                              openProduct(line.product);
                            }}
                            className="shrink-0 overflow-hidden rounded-xl border border-ink/8 bg-cream-200"
                            aria-label={`مشاهده ${line.product.name}`}
                          >
                            <img
                              src={line.product.image}
                              alt={line.product.name}
                              className="h-[86px] w-[70px] object-cover"
                            />
                          </button>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <p className="truncate text-[13px] font-bold text-navy">
                                {line.product.name}
                              </p>
                              <button
                                type="button"
                                onClick={() => removeLine(line.key)}
                                aria-label={`حذف ${line.product.name}`}
                                className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-red-50 hover:text-red-500"
                              >
                                <X size={14} />
                              </button>
                            </div>
                            <p className="mt-1 text-[10px] text-muted">
                              {line.product.latin}
                            </p>
                            <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[10px] text-muted">
                              <span className="inline-flex items-center gap-1">
                                <span
                                  className="h-2.5 w-2.5 rounded-full ring-1 ring-ink/10"
                                  style={{ background: line.color.hex }}
                                />
                                {line.color.name}
                              </span>
                              {line.leg ? <span>پایه {line.leg.name}</span> : null}
                            </div>
                            <div className="mt-2 flex items-center justify-between gap-2">
                              <div className="flex items-center rounded-full border border-ink/12 bg-white">
                                <button
                                  type="button"
                                  onClick={() => setQty(line.key, line.qty - 1)}
                                  aria-label="کاهش تعداد"
                                  disabled={line.qty <= 1}
                                  className="grid h-7 w-7 place-items-center text-navy/70 disabled:opacity-30"
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="min-w-5 text-center text-[11px] font-bold tabular-nums text-navy">
                                  {faNum(line.qty)}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setQty(line.key, line.qty + 1)}
                                  aria-label="افزایش تعداد"
                                  disabled={line.qty >= 9}
                                  className="grid h-7 w-7 place-items-center text-navy/70 disabled:opacity-30"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                              <p className="text-[12px] font-extrabold text-navy">
                                {faNum(line.product.price * line.qty)}
                                <span className="ms-1 text-[9px] font-normal text-muted">
                                  تومان
                                </span>
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {cart.length > 0 ? (
                  <div className="shrink-0 border-t border-ink/10 bg-cream-50 px-4 pb-4 pt-3">
                    <dl className="space-y-2 text-[12px]">
                      <div className="flex items-center justify-between text-muted">
                        <dt>جمع کالاها</dt>
                        <dd className="font-semibold text-navy">{faPrice(subtotal)}</dd>
                      </div>
                      {savedAmount > 0 ? (
                        <div className="flex items-center justify-between text-sage">
                          <dt>سود شما از این خرید</dt>
                          <dd className="font-semibold">{faPrice(savedAmount)}</dd>
                        </div>
                      ) : null}
                      <div className="flex items-center justify-between text-muted">
                        <dt>ارسال و نصب</dt>
                        <dd className="font-semibold text-navy">
                          {shipping === 0 ? "رایگان" : faPrice(shipping)}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between border-t border-dashed border-ink/15 pt-2.5">
                        <dt className="text-[12px] font-bold text-navy">مبلغ قابل پرداخت</dt>
                        <dd className="text-[14px] font-extrabold text-navy">
                          {faPrice(total)}
                        </dd>
                      </div>
                    </dl>
                    <button
                      type="button"
                      onClick={() => {
                        const code = `ARK-${Math.floor(100000 + Math.random() * 899999)}`;
                        setOrder({ code, total });
                        clearCart();
                        notify("سفارش شما با موفقیت ثبت شد");
                      }}
                      className="mt-3.5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-navy text-[12px] font-bold text-cream transition-colors hover:bg-navy-deep"
                    >
                      تکمیل خرید
                      <ArrowLeft size={15} />
                    </button>
                    <p className="mt-2 flex items-center justify-center gap-1.5 text-[9px] text-muted">
                      <ShieldCheck size={12} className="text-sage" />
                      پرداخت امن با درگاه بانکی و ضمانت بازگشت ۷ روزه
                    </p>
                  </div>
                ) : null}
              </>
            ) : (
              <div className="thin-scrollbar flex-1 overflow-y-auto px-4">
                {wishlist.length === 0 ? (
                  <EmptyState
                    icon="heart"
                    title="لیست علاقه‌مندی خالیه"
                    text="محصولات موردعلاقه‌ات را با قلب کنار هر محصول ذخیره کن تا بعداً راحت پیدایشان کنی."
                    onClose={handleClose}
                  />
                ) : (
                  <ul className="divide-y divide-ink/8">
                    {wishlist.map((product) => (
                      <li key={product.id} className="flex items-center gap-3 py-4">
                        <button
                          type="button"
                          onClick={() => {
                            handleClose();
                            openProduct(product);
                          }}
                          className="h-[70px] w-[58px] shrink-0 overflow-hidden rounded-xl border border-ink/8"
                          aria-label={`مشاهده ${product.name}`}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </button>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[12px] font-bold text-navy">
                            {product.name}
                          </p>
                          <p className="mt-1 text-[10px] text-muted">
                            {faPrice(product.price)}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => addToCart(product)}
                              className="inline-flex h-7 items-center gap-1 rounded-full bg-navy px-2.5 text-[9px] font-bold text-cream transition-colors hover:bg-brass hover:text-navy-deep"
                            >
                              <ShoppingBag size={11} />
                              افزودن
                            </button>
                            <button
                              type="button"
                              onClick={() => toggleFavorite(product)}
                              className="inline-flex h-7 items-center gap-1 rounded-full border border-ink/12 px-2 text-[9px] text-muted transition-colors hover:border-red-200 hover:text-red-500"
                            >
                              <X size={11} />
                              حذف
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </>
        )}
      </aside>
    </div>
  );
}

function EmptyState({
  icon,
  title,
  text,
  onClose,
}: {
  icon: "cart" | "heart";
  title: string;
  text: string;
  onClose: () => void;
}) {
  const Icon = icon === "cart" ? ShoppingBag : Heart;
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-full border border-dashed border-brass/50 bg-brass/5 text-brass-dark">
        <Icon size={26} strokeWidth={1.4} />
      </span>
      <h3 className="mt-4 text-[15px] font-extrabold text-navy">{title}</h3>
      <p className="mt-2 max-w-[230px] text-[11px] leading-6 text-muted">{text}</p>
      <a
        href="#products"
        onClick={onClose}
        className="mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-navy px-5 text-[11px] font-bold text-cream transition-colors hover:bg-navy-deep"
      >
        مشاهده محصولات
        <ArrowLeft size={14} />
      </a>
    </div>
  );
}

/* =========================== product modal =========================== */
export function ProductModal() {
  const { activeProduct, closeProduct, addToCart, toggleFavorite, isFavorite } = useShop();
  const [colorIndex, setColorIndex] = useState(0);
  const [legIndex, setLegIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [viewerAngle, setViewerAngle] = useState(28);
  const [viewerZoom, setViewerZoom] = useState(1);

  useEffect(() => {
    setColorIndex(0);
    setLegIndex(0);
    setQty(1);
    setViewerAngle(28);
    setViewerZoom(1);
  }, [activeProduct?.id]);

  useEffect(() => {
    if (!activeProduct) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeProduct();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeProduct, closeProduct]);

  if (!activeProduct) return null;

  const product = activeProduct;
  const color = product.colors[Math.min(colorIndex, product.colors.length - 1)];
  const leg = product.legs[Math.min(legIndex, product.legs.length - 1)];
  const liked = isFavorite(product.id);

  return (
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center overflow-y-auto bg-navy-deep/65 p-3 backdrop-blur-sm animate-fade-in sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
      onClick={closeProduct}
    >
      <div
        className="relative my-auto w-full max-w-4xl overflow-hidden rounded-[26px] border border-white/40 bg-cream-50 shadow-float"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeProduct}
          aria-label="بستن"
          className="absolute end-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-full border border-ink/10 bg-cream/90 text-navy backdrop-blur transition-colors hover:bg-white"
        >
          <X size={17} />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="relative flex flex-col bg-cream-200">
            <div className="tile relative min-h-[320px] flex-1 overflow-hidden md:min-h-[440px]">
              <Product3DViewer
                product={product}
                color={color}
                leg={leg}
                angle={viewerAngle}
                zoom={viewerZoom}
                onAngleChange={setViewerAngle}
                onZoomChange={setViewerZoom}
                showStatus={false}
                compact
                className="absolute inset-0"
              />

              <div className="pointer-events-none absolute start-3 top-3 z-10 flex flex-col gap-1.5">
                {product.badge ? (
                  <span className="rounded-full bg-navy px-2.5 py-1 text-[9px] font-bold text-cream">
                    {product.badge}
                  </span>
                ) : null}
                {product.oldPrice ? (
                  <span className="rounded-full bg-brass px-2 py-1 text-[9px] font-bold text-navy-deep">
                    {faNum(Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100))}٪
                    تخفیف
                  </span>
                ) : null}
              </div>

              <span className="pointer-events-none absolute bottom-3 start-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/75 px-2.5 py-1 text-[9px] font-medium text-navy/75 backdrop-blur">
                <Move size={11} />
                بکشید تا بچرخد
              </span>

              <div className="absolute bottom-3 end-3 z-10 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setViewerZoom((value) => Math.min(1.5, +(value + 0.1).toFixed(2)))}
                  aria-label="بزرگ‌نمایی مدل"
                  className="grid h-8 w-8 place-items-center rounded-full border border-white/70 bg-white/80 text-navy shadow-sm backdrop-blur transition-colors hover:bg-white"
                >
                  <ZoomIn size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => setViewerZoom((value) => Math.max(0.8, +(value - 0.1).toFixed(2)))}
                  aria-label="کوچک‌نمایی مدل"
                  className="grid h-8 w-8 place-items-center rounded-full border border-white/70 bg-white/80 text-navy shadow-sm backdrop-blur transition-colors hover:bg-white"
                >
                  <ZoomOut size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setViewerAngle(28);
                    setViewerZoom(1);
                  }}
                  aria-label="بازنشانی نمای مدل"
                  className="grid h-8 w-8 place-items-center rounded-full border border-white/70 bg-white/80 text-navy shadow-sm backdrop-blur transition-colors hover:bg-white"
                >
                  <RotateCcw size={13} />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between bg-cream-200 px-4 py-3 text-[9px] text-muted">
              <span>نمای واقعی WebGL · {faNum(Math.round(viewerAngle))}°</span>
              <span className="rounded-full bg-white/75 px-2 py-1 text-navy/65">۳۶۰ درجه</span>
            </div>
          </div>

          <div className="thin-scrollbar p-5 md:max-h-[92vh] md:overflow-y-auto md:p-7">
            <p className="text-[10px] font-semibold text-brass-dark">
              {product.category} · {product.material}
            </p>
            <div className="mt-1.5 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-extrabold text-navy">{product.name}</h2>
                <p className="font-display mt-1 text-[10px] tracking-[0.28em] text-muted">
                  {product.latin}
                </p>
              </div>
              <button
                type="button"
                onClick={() => toggleFavorite(product)}
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

            <div className="mt-2 flex flex-wrap items-center gap-3">
              <Stars rating={product.rating} count={product.reviews} />
              <span className="h-3 w-px bg-ink/10" />
              <span className="text-[10px] text-muted">{product.dimensions}</span>
            </div>

            <div className="mt-4 flex items-end justify-between gap-2 rounded-2xl border border-ink/8 bg-cream-100 px-3.5 py-2.5">
              <div>
                {product.oldPrice ? (
                  <p className="text-[9px] text-muted line-through">
                    {faNum(product.oldPrice)} تومان
                  </p>
                ) : (
                  <p className="text-[9px] text-muted">قیمت نهایی</p>
                )}
                <p className="mt-0.5 text-lg font-extrabold text-navy">
                  {faNum(product.price)}
                  <span className="ms-1 text-[9px] font-medium text-muted">تومان</span>
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-sage/15 px-2 py-1 text-[9px] font-semibold text-sage">
                <Check size={11} />
                موجود در انبار
              </span>
            </div>

            <p className="mt-3 text-[11px] leading-6 text-muted">{product.description}</p>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold text-navy">رنگ پارچه</p>
                <p className="text-[10px] text-muted">{color.name}</p>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.colors.map((item, index) => (
                  <ColorDot
                    key={item.name}
                    hex={item.hex}
                    selected={item.name === color.name}
                    onClick={() => setColorIndex(index)}
                    label={item.name}
                    size="sm"
                  />
                ))}
              </div>
            </div>

            <div className="mt-3">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold text-navy">رنگ پایه</p>
                <p className="text-[10px] text-muted">{leg.name}</p>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.legs.map((item, index) => (
                  <ColorDot
                    key={item.name}
                    hex={item.hex}
                    metallic
                    selected={item.name === leg.name}
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
                onClick={() => {
                  addToCart(product, { qty, color, leg: product.legs[legIndex] });
                  closeProduct();
                }}
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-navy text-[12px] font-bold text-cream transition-colors hover:bg-navy-deep"
              >
                <ShoppingBag size={15} />
                افزودن به سبد خرید
              </button>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[9px] text-muted">
              {[
                { Icon: Truck, label: "ارسال رایگان" },
                { Icon: ShieldCheck, label: "ضمانت اصالت" },
                { Icon: RefreshCw, label: "۷ روز بازگشت" },
              ].map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1 rounded-xl border border-ink/8 px-1 py-2"
                >
                  <Icon size={13} className="text-brass-dark" />
                  {label}
                </div>
              ))}
            </div>

            <a
              href="#inspiration"
              onClick={closeProduct}
              className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-semibold text-navy/70 underline decoration-brass/60 underline-offset-4 hover:text-brass-dark"
            >
              <ChevronLeft size={12} />
              دیدن این محصول در فضای واقعی
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =============================== toast =============================== */
export function Toast() {
  const { toast, openDrawer } = useShop();
  if (!toast) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-[100] flex justify-center px-4">
      <div
        key={toast.id}
        role="status"
        aria-live="polite"
        className="animate-fade-up pointer-events-auto flex w-full max-w-md items-center gap-3 rounded-full border border-white/15 bg-navy-deep/95 px-3.5 py-2.5 text-cream shadow-float backdrop-blur-md"
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sage/20 text-sage">
          <Check size={16} />
        </span>
        <p className="min-w-0 flex-1 text-[11px] leading-5 text-cream/85">{toast.message}</p>
        <button
          type="button"
          onClick={() => openDrawer("cart")}
          className="inline-flex h-8 shrink-0 items-center gap-1 rounded-full bg-cream px-3 text-[10px] font-bold text-navy transition-colors hover:bg-brass"
        >
          سبد خرید
          <ArrowLeft size={12} />
        </button>
      </div>
    </div>
  );
}

/* ============================ back to top ============================ */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="بازگشت به بالای صفحه"
      className="animate-fade-in fixed bottom-5 start-4 z-40 grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-navy-deep/90 text-cream shadow-float backdrop-blur transition-colors hover:border-brass hover:text-brass sm:bottom-6 sm:start-6"
    >
      <ArrowUp size={17} />
    </button>
  );
}

export default function Overlays() {
  return (
    <>
      <SearchDialog />
      <CartDrawer />
      <ProductModal />
      <Toast />
      <BackToTop />
    </>
  );
}
