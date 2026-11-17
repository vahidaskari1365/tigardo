import { useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Products from "./components/Products";
import Visualizer from "./components/Visualizer";
import Story from "./components/Story";
import Footer from "./components/Footer";
import Overlays from "./components/Overlays";
import { ShopProvider, useShop } from "./lib/store";

/** adds the reveal-on-scroll behaviour once the DOM is ready */
function RevealManager() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("reveal-ready");
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return () => root.classList.remove("reveal-ready");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );

    elements.forEach((element) => observer.observe(element));

    // safety net: never leave content invisible if the observer is throttled
    const fallback = window.setTimeout(() => {
      elements.forEach((element) => element.classList.add("is-visible"));
    }, 1400);

    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}

/** locks the page behind drawers, modals and the search palette */
function ScrollLock() {
  const { drawerOpen, searchOpen, activeProduct } = useShop();

  useEffect(() => {
    const locked = drawerOpen || searchOpen || Boolean(activeProduct);
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen, searchOpen, activeProduct]);

  return null;
}

function Site() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream">
      <Header />
      <main>
        <Hero />
        <Experience />
        <Products />
        <Visualizer />
        <Story />
      </main>
      <Footer />
      <Overlays />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <RevealManager />
      <ScrollLock />
      <Site />
    </ShopProvider>
  );
}
