import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/25 py-16">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 md:grid-cols-3">
        <div>
          <h3 className="text-3xl font-semibold">Tyler.Ngo</h3>
          <p className="mt-4 text-lg text-muted-foreground">
            Performance Marketing Manager driving full-funnel growth through data, media, and experimentation.
          </p>
        </div>
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">Navigate</p>
          <div className="space-y-2 text-lg">
            <Link to="/portfolio" className="block text-muted-foreground hover:text-foreground">Portfolio</Link>
            <Link to="/blog" className="block text-muted-foreground hover:text-foreground">Blog</Link>
            <Link to="/about" className="block text-muted-foreground hover:text-foreground">About</Link>
            <Link to="/contact" className="block text-muted-foreground hover:text-foreground">Contact</Link>
          </div>
        </div>
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">Contact</p>
          <div className="space-y-3 text-lg text-muted-foreground">
            <p className="inline-flex items-center gap-2"><Mail size={16} /> trungngo.2810@gmail.com</p>
            <p className="inline-flex items-center gap-2"><MapPin size={16} /> London, UK</p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 w-full max-w-6xl border-t border-border/70 px-6 pt-8 text-center text-sm text-muted-foreground">
        © 2026 Tyler Ngo. All rights reserved.
      </div>
    </footer>
  );
}
