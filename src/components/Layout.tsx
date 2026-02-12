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
  { to: "/", label: "Home" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [isDark, setIsDark] = useState(true);
  const lang: Lang = "en";

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const shouldDark = savedTheme ? savedTheme === "dark" : true;
    document.documentElement.classList.toggle("dark", shouldDark);
    setIsDark(shouldDark);
    document.documentElement.lang = "en";
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <LanguageContext.Provider value={{ lang, setLanguage: () => {} }}>
      <div className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-30 border-b border-border/70 bg-background/75 backdrop-blur-xl dark:border-border/60 dark:bg-background/35 dark:backdrop-blur-2xl">
          <div className="mx-auto mt-2 flex w-full max-w-7xl items-center gap-3 px-2">
            <nav className="flex flex-1 items-center justify-between rounded-2xl border border-border/70 bg-card/80 px-6 py-3 shadow-[0_6px_18px_rgba(35,30,20,0.06)] backdrop-blur-xl dark:border-border/60 dark:bg-card/35 dark:shadow-[0_10px_30px_rgba(0,0,0,0.16)]">
              <Link to="/" className="font-display text-2xl font-semibold tracking-tight transition-transform duration-300 hover:scale-[1.02]">
                Tyler<span className="text-[#d4b377]">.</span>Ngo
              </Link>

              <div className="hidden items-center gap-7 text-sm md:flex">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className={`transition-all duration-300 ${location.pathname === l.to ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/70 bg-background/55 text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:text-foreground"
                  aria-label="Toggle theme"
                  title="Toggle light/dark mode"
                >
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </button>
                <Link to="/contact" className="cta-btn rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5">
                  Get in Touch
                </Link>
              </div>
            </nav>
          </div>
        </header>
        <main className="page-enter">{children}</main>
        <SiteFooter />
      </div>
    </LanguageContext.Provider>
  );
}
