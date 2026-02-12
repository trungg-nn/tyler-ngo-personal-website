import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
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

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/65 backdrop-blur-xl">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
          <Link to="/" className="font-display text-2xl font-semibold tracking-tight">
            Tyler<span className="text-[#d4b377]">.</span>Ngo
          </Link>
          <div className="hidden items-center gap-8 text-sm md:flex">
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
          <Link to="/contact" className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">
            Get in Touch
          </Link>
        </nav>
      </header>
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
