export type ColorOption = { name: string; hex: string };

export type Product = {
  id: string;
  name: string;
  latin: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  secondary: string;
  badge?: string;
  isNew?: boolean;
  rating: number;
  reviews: number;
  material: string;
  dimensions: string;
  description: string;
  colors: ColorOption[];
  legs: ColorOption[];
};

export const IMG = {
  hero: "/images/hero-kitchen.jpg",
  roomDining: "/images/room-dining.jpg",
  roomLiving: "/images/room-living.jpg",
  roomBedroom: "/images/room-bedroom.jpg",
  chairSand: "/images/chair-sand.jpg",
  chairOlive: "/images/chair-olive.jpg",
  tableOak: "/images/table-oak.jpg",
  stoolNavy: "/images/stool-navy.jpg",
  console: "/images/console-walnut.jpg",
  armchairTerra: "/images/armchair-terra.jpg",
  diningSet: "/images/dining-set.jpg",
  cafeChair: "/images/cafe-chair.jpg",
  sofaLounge: "/images/sofa-lounge.jpg",
};

export const FABRICS: ColorOption[] = [
  { name: "شنی", hex: "#d8c5ab" },
  { name: "زیتونی", hex: "#7b8367" },
  { name: "سرمه‌ای", hex: "#2b3d52" },
  { name: "تراکوتا", hex: "#b26a4b" },
  { name: "زغالی", hex: "#3d3c38" },
  { name: "کرم", hex: "#e9dfcd" },
  { name: "کاراملی", hex: "#a9805a" },
];

export const LEGS: ColorOption[] = [
  { name: "بلوط", hex: "#b08a5b" },
  { name: "گردو", hex: "#5a4030" },
  { name: "برنزی", hex: "#c2a368" },
  { name: "مشکی", hex: "#26282b" },
];

export const FREE_SHIPPING = 20_000_000;
export const SHIPPING_COST = 390_000;

const fabric = (names: string[]): ColorOption[] =>
  names
    .map((name) => FABRICS.find((c) => c.name === name))
    .filter((c): c is ColorOption => Boolean(c));

export const PRODUCTS: Product[] = [
  {
    id: "ava",
    name: "صندلی ناهارخوری آوا",
    latin: "AVA CHAIR",
    category: "صندلی",
    price: 3_850_000,
    oldPrice: 4_200_000,
    image: IMG.chairSand,
    secondary: IMG.roomDining,
    badge: "پرفروش",
    rating: 4.9,
    reviews: 214,
    material: "پارچه بوکله ضد لکه",
    dimensions: "۵۶ × ۵۸ × ۸۲ سانتی‌متر",
    description:
      "آوا با پشتی منحنی و رویه‌ی بوکله، تعادل گرمی و مینیمالیسم را به میز ناهارخوری شما می‌آورد. اسکلت راش خشک‌شده و اسفنج سرد با چگالی بالا، نشستنی نرم و بادوام می‌سازد.",
    colors: fabric(["شنی", "زیتونی", "سرمه‌ای", "تراکوتا", "زغالی", "کرم"]),
    legs: LEGS,
  },
  {
    id: "rona",
    name: "میز ناهارخوری رونا",
    latin: "RONA TABLE",
    category: "میز",
    price: 12_800_000,
    oldPrice: 14_200_000,
    image: IMG.tableOak,
    secondary: IMG.roomDining,
    badge: "جدید",
    isNew: true,
    rating: 4.8,
    reviews: 96,
    material: "چوب بلوط طبیعی",
    dimensions: "قطر ۱۲۰ × ارتفاع ۷۵ سانتی‌متر",
    description:
      "رونا میزی گرد از بلوط طبیعی با پایه‌های مجسمه‌وار است؛ برای فضاهای کوچک و دورهمی‌های بزرگ. پوشش رنگ پایه، مقاوم در برابر رطوبت و لکه است.",
    colors: [
      { name: "بلوط روشن", hex: "#c19a6b" },
      { name: "گردو", hex: "#5a4030" },
      { name: "راش", hex: "#d3b48a" },
      { name: "دود", hex: "#3b3a37" },
    ],
    legs: LEGS,
  },
  {
    id: "neo",
    name: "صندلی بار نئو",
    latin: "NEO STOOL",
    category: "صندلی",
    price: 5_400_000,
    image: IMG.stoolNavy,
    secondary: IMG.hero,
    rating: 4.7,
    reviews: 68,
    material: "مخمل درجه یک",
    dimensions: "۴۵ × ۵۰ × ۹۵ سانتی‌متر",
    description:
      "نئو برای ایستگاه‌های صبحگاهی ساخته شده؛ پشتی کوتاه و منحنی، جای پای برنزی و ارتفاع استاندارد برای این آشپزخانه. پارچه‌ی مخمل با تراکم بالا، لطیف و سخت‌جان است.",
    colors: fabric(["سرمه‌ای", "زیتونی", "شنی", "زغالی"]),
    legs: LEGS,
  },
  {
    id: "minoo",
    name: "ست مبل راحتی مینو",
    latin: "MINOO SOFA",
    category: "مبل",
    price: 28_500_000,
    oldPrice: 32_000_000,
    image: IMG.roomLiving,
    secondary: IMG.sofaLounge,
    badge: "منتخب طراحان",
    rating: 5,
    reviews: 42,
    material: "پارچه بوکله ضد لکه",
    dimensions: "۲۱۰ × ۹۰ × ۸۵ سانتی‌متر",
    description:
      "ست نشیمن مینو ترکیبی از مبل سه‌نفره، مبل تک‌نفره و میز جلومبلی است. بالشت‌های پشتی نرم و لایه‌ی فوم پاک‌شونده، مینو را برای زندگی روزمره آماده کرده است.",
    colors: fabric(["کرم", "شنی", "زیتونی", "سرمه‌ای"]),
    legs: LEGS,
  },
  {
    id: "olivia",
    name: "صندلی اولیو",
    latin: "OLIVIA CHAIR",
    category: "صندلی",
    price: 4_250_000,
    image: IMG.chairOlive,
    secondary: IMG.roomLiving,
    isNew: true,
    rating: 4.8,
    reviews: 121,
    material: "مخمل کوتاه",
    dimensions: "۵۴ × ۵۶ × ۸۰ سانتی‌متر",
    description:
      "اولیو با رنگ زیتونیِ آرام و پشتی قوس‌دار، مکمل میزهای چوبی و فضای سبز خانه است. پایه‌های چوبی برنزی و نشیمن ارتوپدی، ساعت‌های طولانی نشستن را خوش می‌کنند.",
    colors: fabric(["زیتونی", "سرمه‌ای", "شنی", "تراکوتا"]),
    legs: LEGS,
  },
  {
    id: "lia",
    name: "میز جلومبلی لیا",
    latin: "LIA TABLE",
    category: "میز",
    price: 9_600_000,
    image: IMG.console,
    secondary: IMG.roomLiving,
    badge: "پیشنهاد آرکا",
    rating: 4.7,
    reviews: 57,
    material: "چوب گردو و بلوط",
    dimensions: "۱۱۰ × ۴۰ × ۷۵ سانتی‌متر",
    description:
      "لیا کنسولی کم‌عمق با رگه‌های طبیعی گردو است که در نشیمن، راهرو یا پشت مبل جا باز می‌کند. درها با بستنِ بی‌صدا و دستگیره‌های مسی ارائه می‌شوند.",
    colors: [
      { name: "گردو", hex: "#5a4030" },
      { name: "بلوط", hex: "#b08a5b" },
      { name: "دود", hex: "#3b3a37" },
    ],
    legs: LEGS,
  },
  {
    id: "terra",
    name: "صندلی بازوی تِرا",
    latin: "TERRA CHAIR",
    category: "مبل",
    price: 6_900_000,
    oldPrice: 7_800_000,
    image: IMG.armchairTerra,
    secondary: IMG.cafeChair,
    rating: 4.9,
    reviews: 83,
    material: "پارچه ترابوز",
    dimensions: "۶۵ × ۷۰ × ۷۸ سانتی‌متر",
    description:
      "تِرا یک صندلی بازوی مجسمه‌وار با رنگِ تراکوتاست که گوشه‌ای دنج برای کتاب و قهوه می‌سازد. فنرهای موجی و فوم سرد، فرم را سال‌ها حفظ می‌کنند.",
    colors: fabric(["تراکوتا", "شنی", "زیتونی", "کرم"]),
    legs: LEGS,
  },
  {
    id: "aria",
    name: "ست ناهارخوری آرام",
    latin: "ARAM DINING SET",
    category: "میز",
    price: 34_500_000,
    oldPrice: 38_900_000,
    image: IMG.diningSet,
    secondary: IMG.roomDining,
    badge: "ست کامل",
    rating: 4.9,
    reviews: 39,
    material: "بلوط و پارچه بوکله",
    dimensions: "میز ۱۸۰ × ۹۰ + ۶ صندلی",
    description:
      "ست آرام شامل میز مستطیل بلوط و شش صندلی بوکله است؛ برای خانه‌هایی که دورهمی را جدی می‌گیرند. امکان سفارش با پارچه و ابعاد دلخواه وجود دارد.",
    colors: fabric(["شنی", "کرم", "زیتونی", "سرمه‌ای"]),
    legs: LEGS,
  },
];

export const BUNDLE: Product = {
  id: "bundle-living",
  name: "ست نشیمن آرکا",
  latin: "ARKA LIVING SET",
  category: "ست",
  price: 46_800_000,
  oldPrice: 58_400_000,
  image: IMG.roomLiving,
  secondary: IMG.roomDining,
  badge: "۱۵٪ صرفه‌جویی",
  rating: 5,
  reviews: 24,
  material: "پارچه بوکله + بلوط",
  dimensions: "مبل سه‌نفره + تک‌نفره + میز",
  description:
    "ست کامل نشیمن شامل مبل سه‌نفره مینو، صندلی بازوی تِرا و میز جلومبلی لیا؛ هارمونی رنگ و ابعاد، آماده برای خانه‌ی شما.",
  colors: fabric(["کرم", "شنی", "زیتونی"]),
  legs: LEGS,
};

export type Category = {
  id: string;
  title: string;
  latin: string;
  count: number;
  image: string;
  blurb: string;
};

export const CATEGORIES: Category[] = [
  {
    id: "sofa",
    title: "مبل و کاناپه",
    latin: "SOFAS",
    count: 42,
    image: IMG.roomLiving,
    blurb: "راحتی در ابعاد خانه‌ی شما",
  },
  {
    id: "chair",
    title: "صندلی",
    latin: "CHAIRS",
    count: 86,
    image: IMG.chairOlive,
    blurb: "نشستنی که امضا می‌گذارد",
  },
  {
    id: "table",
    title: "میز و کنسول",
    latin: "TABLES",
    count: 64,
    image: IMG.tableOak,
    blurb: "وسط‌خانه، جای اصلی",
  },
  {
    id: "kitchen",
    title: "آشپزخانه و این",
    latin: "KITCHEN",
    count: 28,
    image: IMG.hero,
    blurb: "صبح‌ها اینجا شروع می‌شود",
  },
];

export type Hotspot = { id: string; x: number; y: number; productId: string };
export type Room = {
  id: string;
  label: string;
  latin: string;
  image: string;
  hotspots: Hotspot[];
};

export const ROOMS: Room[] = [
  {
    id: "living",
    label: "نشیمن",
    latin: "LIVING ROOM",
    image: IMG.roomLiving,
    hotspots: [
      { id: "l1", x: 31, y: 68, productId: "minoo" },
      { id: "l2", x: 57, y: 79, productId: "lia" },
      { id: "l3", x: 15, y: 65, productId: "terra" },
    ],
  },
  {
    id: "dining",
    label: "ناهارخوری",
    latin: "DINING ROOM",
    image: IMG.roomDining,
    hotspots: [
      { id: "d1", x: 32, y: 72, productId: "ava" },
      { id: "d2", x: 55, y: 63, productId: "rona" },
      { id: "d3", x: 79, y: 70, productId: "olivia" },
    ],
  },
  {
    id: "kitchen",
    label: "آشپزخانه",
    latin: "KITCHEN",
    image: IMG.hero,
    hotspots: [
      { id: "k1", x: 33, y: 70, productId: "neo" },
      { id: "k2", x: 55, y: 78, productId: "rona" },
      { id: "k3", x: 20, y: 64, productId: "ava" },
    ],
  },
];

export const TESTIMONIALS = [
  {
    id: "t1",
    name: "سارا محمدی",
    city: "تهران",
    initials: "س‌م",
    rating: 5,
    text: "صندلی‌ها را قبل از خرید در چیدمان سه‌بعدی خانه خودم دیدم؛ رنگ زیتونی دقیقاً همان چیزی بود که در ذهن داشتم. بسته‌بندی و نصب هم بی‌نقص انجام شد.",
    product: "صندلی ناهارخوری آوا",
  },
  {
    id: "t2",
    name: "امیرحسین رضایی",
    city: "اصفهان",
    initials: "ا‌ر",
    rating: 5,
    text: "میز رونا و شش صندلی را سفارش دادم. چوب واقعاً خشک و باکیفیت است و رنگ پایه‌ها با چیزی که در نمایش سه‌بعدی دیدم یکی بود. تجربه‌ی خرید آنلاین قابل اعتماد.",
    product: "ست ناهارخوری آرام",
  },
  {
    id: "t3",
    name: "نگار موسوی",
    city: "شیراز",
    initials: "ن‌م",
    rating: 4.9,
    text: "چیزی که آرکا را متفاوت کرد، مشاوره‌ی واقعی بود. ابعاد و پارچه را با هماهنگی خانه‌ام تنظیم کردیم و نتیجه از عکس‌ها هم بهتر شد.",
    product: "ست مبل راحتی مینو",
  },
  {
    id: "t4",
    name: "پویا کریمی",
    city: "تبریز",
    initials: "پ‌ک",
    rating: 4.8,
    text: "نمایش سه‌بعدی محصول، انتخاب پارچه را خیلی ساده کرد. دوخت‌ها تمیز و اسکلت صندلی محکم است؛ بعد از شش ماه استفاده روزمره، هنوز مثل روز اول.",
    product: "صندلی اولیو",
  },
];

export const NAV_LINKS = [
  { label: "خانه", href: "#home" },
  { label: "محصولات", href: "#products" },
  { label: "نمایش سه‌بعدی", href: "#experience" },
  { label: "اتاق الهام", href: "#inspiration" },
  { label: "نمایشگاه", href: "#showroom" },
  { label: "تماس با ما", href: "#contact" },
];

export const SEARCH_TAGS = ["صندلی بوکله", "میز بلوط", "مبل کرم", "صندلی بار"];

export const SORT_OPTIONS = [
  { id: "popular", label: "محبوب‌ترین" },
  { id: "cheap", label: "ارزان‌ترین" },
  { id: "expensive", label: "گران‌ترین" },
  { id: "new", label: "جدیدترین" },
];

export const faNum = (value: number) => new Intl.NumberFormat("fa-IR").format(value);
export const faPrice = (value: number) => `${faNum(value)} تومان`;
export const discountPercent = (price: number, oldPrice?: number) =>
  oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;
