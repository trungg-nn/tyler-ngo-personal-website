import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="border-t border-border/80 bg-[#10101a] py-12 md:py-14">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 md:grid-cols-3 md:gap-16">
        <div>
          <h3 className="text-2xl font-semibold">Tyler<span className="text-[#d4b377]">.</span>Ngo</h3>
          <p className="mt-3 max-w-[280px] text-sm leading-7 text-muted-foreground">
            Performance Marketing Manager driving full-funnel growth through data, media, and experimentation.
          </p>
        </div>
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-foreground">NAVIGATE</p>
          <div className="space-y-3 text-sm">
            <Link to="/portfolio" className="block text-muted-foreground hover:text-foreground">Portfolio</Link>
            <Link to="/blog" className="block text-muted-foreground hover:text-foreground">Blog</Link>
            <Link to="/about" className="block text-muted-foreground hover:text-foreground">About</Link>
            <Link to="/contact" className="block text-muted-foreground hover:text-foreground">Contact</Link>
          </div>
        </div>
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-foreground">CONTACT</p>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
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
      <div className="mx-auto mt-8 w-full max-w-7xl border-t border-border/70 px-6 pt-6 text-center text-xs text-muted-foreground">
        © 2026 Tyler Ngo. All rights reserved.
      </div>
    </footer>
  );
}
