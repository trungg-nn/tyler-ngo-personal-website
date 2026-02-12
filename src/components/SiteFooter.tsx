import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/25 py-10 md:py-12">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 md:grid-cols-3 md:gap-12">
        <div>
          <h3 className="text-2xl font-semibold">Tyler.Ngo</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Performance Marketing Manager driving full-funnel growth through data, media, and experimentation.
          </p>
        </div>
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">Navigate</p>
          <div className="space-y-2 text-sm">
            <Link to="/portfolio" className="block text-muted-foreground hover:text-foreground">Portfolio</Link>
            <Link to="/blog" className="block text-muted-foreground hover:text-foreground">Blog</Link>
            <Link to="/about" className="block text-muted-foreground hover:text-foreground">About</Link>
            <Link to="/contact" className="block text-muted-foreground hover:text-foreground">Contact</Link>
          </div>
        </div>
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Contact</p>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 leading-none">
              <Mail size={14} />
              <span>trungngo.2810@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 leading-none">
              <MapPin size={14} />
              <span>London, UK</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 w-full max-w-6xl border-t border-border/70 px-6 pt-6 text-center text-xs text-muted-foreground">
        © 2026 Tyler Ngo. All rights reserved.
      </div>
    </footer>
  );
}
