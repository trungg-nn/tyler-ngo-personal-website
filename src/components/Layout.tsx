import { createContext, useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import SiteFooter from "@/components/SiteFooter";

export type Lang = "en" | "vi";

type LanguageContextValue = {
  lang: Lang;
  setLanguage: (lang: Lang) => void;
};

export const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

const links = [
  { to: "/", label: { en: "Home", vi: "Trang chủ" } },
  { to: "/portfolio", label: { en: "Portfolio", vi: "Dự án" } },
  { to: "/blog", label: { en: "Blog", vi: "Bài viết" } },
  { to: "/about", label: { en: "About", vi: "Giới thiệu" } },
  { to: "/contact", label: { en: "Contact", vi: "Liên hệ" } },
];

const copy = {
  en: { cta: "Get in Touch" },
  vi: { cta: "Liên hệ" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const shouldDark = savedTheme ? savedTheme === "dark" : true;
    document.documentElement.classList.toggle("dark", shouldDark);
    setIsDark(shouldDark);

    const savedLang = localStorage.getItem("lang") as Lang | null;
    const nextLang: Lang = savedLang === "vi" ? "vi" : "en";
    setLang(nextLang);
    document.documentElement.lang = nextLang;
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const setLanguage = (nextLang: Lang) => {
    setLang(nextLang);
    localStorage.setItem("lang", nextLang);
    document.documentElement.lang = nextLang;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLanguage }}>
      <div className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-30 border-b border-border/70 bg-background/75 backdrop-blur-xl dark:border-border/60 dark:bg-background/35 dark:backdrop-blur-2xl">
          <div className="mx-auto mt-2 flex w-full max-w-7xl items-center gap-3 px-2">
            <nav className="flex flex-1 items-center justify-between rounded-2xl border border-border/70 bg-card/80 px-6 py-3 shadow-[0_6px_18px_rgba(35,30,20,0.06)] backdrop-blur-xl dark:border-border/60 dark:bg-card/35 dark:shadow-[0_10px_30px_rgba(0,0,0,0.16)]">
              <Link to="/" className="font-display text-2xl font-semibold tracking-tight">
                Tyler<span className="text-[#d4b377]">.</span>Ngo
              </Link>

              <div className="hidden items-center gap-7 text-sm md:flex">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className={location.pathname === l.to ? "text-primary" : "text-muted-foreground hover:text-foreground"}
                  >
                    {l.label[lang]}
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/70 bg-background/55 text-muted-foreground transition hover:text-foreground"
                  aria-label="Toggle theme"
                  title="Toggle light/dark mode"
                >
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </button>
                <Link to="/contact" className="cta-btn rounded-xl px-5 py-2.5 text-sm font-medium">
                  {copy[lang].cta}
                </Link>
              </div>
            </nav>

            <div className="hidden items-center rounded-xl border border-border/70 bg-background/55 p-1 md:flex">
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${lang === "en" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage("vi")}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${lang === "vi" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
              >
                VI
              </button>
            </div>
          </div>
        </header>
        <main>{children}</main>
        <SiteFooter />
      </div>
    </LanguageContext.Provider>
  );
}
