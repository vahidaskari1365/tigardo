import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  FREE_SHIPPING,
  PRODUCTS,
  SHIPPING_COST,
  type ColorOption,
  type Product,
} from "./data";

export type CartLine = {
  key: string;
  product: Product;
  qty: number;
  color: ColorOption;
  leg?: ColorOption;
};

export type DrawerTab = "cart" | "wishlist";

type AddOptions = { qty?: number; color?: ColorOption; leg?: ColorOption };

type ShopValue = {
  cart: CartLine[];
  favorites: string[];
  drawerOpen: boolean;
  drawerTab: DrawerTab;
  searchOpen: boolean;
  activeProduct: Product | null;
  toast: { id: number; message: string } | null;
  cartCount: number;
  subtotal: number;
  shipping: number;
  total: number;
  savedAmount: number;
  addToCart: (product: Product, options?: AddOptions) => void;
  removeLine: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clearCart: () => void;
  toggleFavorite: (product: Product) => void;
  isFavorite: (id: string) => boolean;
  openDrawer: (tab?: DrawerTab) => void;
  closeDrawer: () => void;
  setDrawerTab: (tab: DrawerTab) => void;
  setSearchOpen: (open: boolean) => void;
  openProduct: (product: Product) => void;
  closeProduct: () => void;
  notify: (message: string) => void;
};

const ShopContext = createContext<ShopValue | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState<DrawerTab>("cart");
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const notify = useCallback((message: string) => {
    setToast({ id: Date.now(), message });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const addToCart = useCallback(
    (product: Product, options?: AddOptions) => {
      const color = options?.color ?? product.colors[0];
      const leg = options?.leg ?? product.legs[0];
      const qty = Math.max(1, options?.qty ?? 1);
      const key = `${product.id}__${color.name}__${leg?.name ?? "none"}`;
      setCart((prev) => {
        const existing = prev.find((line) => line.key === key);
        if (existing) {
          return prev.map((line) =>
            line.key === key ? { ...line, qty: Math.min(9, line.qty + qty) } : line,
          );
        }
        return [...prev, { key, product, qty, color, leg }];
      });
      notify(`«${product.name}» با رنگ ${color.name} به سبد خرید اضافه شد`);
    },
    [notify],
  );

  const removeLine = useCallback((key: string) => {
    setCart((prev) => prev.filter((line) => line.key !== key));
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setCart((prev) =>
      prev.map((line) =>
        line.key === key ? { ...line, qty: Math.min(9, Math.max(1, qty)) } : line,
      ),
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleFavorite = useCallback(
    (product: Product) => {
      setFavorites((prev) => {
        const exists = prev.includes(product.id);
        notify(
          exists
            ? `«${product.name}» از علاقه‌مندی‌ها حذف شد`
            : `«${product.name}» به علاقه‌مندی‌ها اضافه شد`,
        );
        return exists ? prev.filter((id) => id !== product.id) : [...prev, product.id];
      });
    },
    [notify],
  );

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const openDrawer = useCallback((tab: DrawerTab = "cart") => {
    setDrawerTab(tab);
    setDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const openProduct = useCallback((product: Product) => setActiveProduct(product), []);
  const closeProduct = useCallback(() => setActiveProduct(null), []);

  const cartCount = useMemo(() => cart.reduce((sum, line) => sum + line.qty, 0), [cart]);
  const subtotal = useMemo(
    () => cart.reduce((sum, line) => sum + line.product.price * line.qty, 0),
    [cart],
  );
  const savedAmount = useMemo(
    () =>
      cart.reduce(
        (sum, line) => sum + (line.product.oldPrice ?? line.product.price) * line.qty,
        0,
      ) - subtotal,
    [cart, subtotal],
  );
  const shipping = cart.length === 0 || subtotal >= FREE_SHIPPING ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  const value: ShopValue = {
    cart,
    favorites,
    drawerOpen,
    drawerTab,
    searchOpen,
    activeProduct,
    toast,
    cartCount,
    subtotal,
    shipping,
    total,
    savedAmount,
    addToCart,
    removeLine,
    setQty,
    clearCart,
    toggleFavorite,
    isFavorite,
    openDrawer,
    closeDrawer,
    setDrawerTab,
    setSearchOpen,
    openProduct,
    closeProduct,
    notify,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop must be used inside ShopProvider");
  return context;
}

export const favoriteProducts = (ids: string[]) =>
  PRODUCTS.filter((product) => ids.includes(product.id));
