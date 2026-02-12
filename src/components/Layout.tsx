import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import SiteFooter from "@/components/SiteFooter";

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

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const shouldDark = saved ? saved === "dark" : true;
    document.documentElement.classList.toggle("dark", shouldDark);
    setIsDark(shouldDark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/35 backdrop-blur-2xl">
        <nav className="mx-auto mt-2 flex w-full max-w-7xl items-center justify-between rounded-2xl border border-border/60 bg-card/35 px-6 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.16)] backdrop-blur-xl">
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
                {l.label}
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
            <Link to="/contact" className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">
              Get in Touch
            </Link>
          </div>
        </nav>
      </header>
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
