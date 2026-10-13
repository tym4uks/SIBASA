import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import {
  Menu,
  Search,
  Send,
  ShoppingBag,
  X,
  MessageCircle,
  Phone,
} from "lucide-react";
import { useCart } from "./cart";
import { container } from "./ui";

export function Logo() {
  return (
    <Link
      to="/"
      className="inline-flex items-center rounded-xl bg-deep px-3.5 py-2 text-[15px] font-semibold tracking-[0.12em] text-white"
    >
      СИБАСА
    </Link>
  );
}

const nav = [
  { to: "/cabinet", label: "Личный кабинет" },
  { to: "/catalog", label: "Каталог" },
  { to: "/about", label: "О магазине" },
  { to: "/about#contacts", label: "Контакты" },
];

export const socials = [
  { icon: Send, label: "Telegram" },
  { icon: () => <span className="text-xs font-bold">VK</span>, label: "VK" },
  { icon: MessageCircle, label: "WhatsApp" },
];

function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  useEffect(() => setOpen(false), [loc.pathname]);
  return (
    <header className="sticky top-0 z-40 border-b border-deep/5 bg-cream/85 backdrop-blur-md">
      <div
        className={`${container} flex h-[72px] items-center justify-between`}
      >
        <Logo />
        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((n) => (
            <NavLink
              key={n.label}
              to={n.to}
              end
              className={({ isActive }) =>
                `text-sm font-medium transition hover:text-coral ${isActive && !n.to.includes("#") ? "text-deep" : "text-mute"}`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-1.5">
          <button
            aria-label="Поиск"
            className="rounded-full p-2.5 text-deep hover:bg-foam cursor-pointer"
          >
            <Search size={20} />
          </button>
          <Link
            to="/cart"
            aria-label="Корзина"
            className="relative rounded-full p-2.5 text-deep hover:bg-foam"
          >
            <ShoppingBag size={20} />
            {count > 0 && (
              <span className="absolute right-0 top-0 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-coral px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
          <button
            aria-label="Меню"
            className="rounded-full p-2.5 text-deep hover:bg-foam md:hidden cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-deep/5 bg-cream px-5 pb-5 md:hidden">
          {nav.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              className="block border-b border-deep/5 py-4 text-base font-medium text-deep"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-28 bg-deep text-white/80">
      <div
        className={`${container} grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]`}
      >
        <div>
          <span className="inline-block rounded-xl bg-white px-3.5 py-2 text-[15px] font-semibold tracking-[0.12em] text-deep">
            СИБАСА
          </span>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
            Свежая рыба и морепродукты премиум-качества с доставкой по Москве за
            2 часа.
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <h4 className="mb-4 text-base text-white">Контакты</h4>
          <p>Москва, ул. Рыбная, 12</p>
          <p className="flex items-center gap-2">
            <Phone size={14} /> +7 (495) 123-45-67
          </p>
          <p>hello@sibasa.ru</p>
        </div>
        <div>
          <h4 className="mb-4 text-base text-white">Мы в сети</h4>
          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition hover:bg-coral"
              >
                <s.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
        © 2026 СИБАСА. Все права защищены.
      </div>
    </footer>
  );
}

export default function Layout() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash)
      setTimeout(
        () =>
          document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }),
        50,
      );
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return (
    <div className="min-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
