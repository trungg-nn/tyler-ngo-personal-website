import { Link } from "react-router-dom";
import { Mail, Linkedin, Instagram, Facebook } from "lucide-react";
import { useLanguage } from "@/components/Layout";

export default function SiteFooter() {
  const { lang } = useLanguage();

  const t = {
    en: {
      desc: "Performance Marketing Manager driving full-funnel growth through data, media, and experimentation.",
      navigate: "NAVIGATE",
      contact: "CONTACT",
      portfolio: "Portfolio",
      blog: "Blog",
      about: "About",
      contactLink: "Contact",
      linkedin: "LinkedIn",
      instagram: "Instagram",
      facebook: "Facebook",
      rights: "© 2026 Tyler Ngo. All rights reserved.",
    },
    vi: {
      desc: "Performance Marketing Manager thúc đẩy tăng trưởng full-funnel qua dữ liệu, media và thử nghiệm.",
      navigate: "ĐIỀU HƯỚNG",
      contact: "LIÊN HỆ",
      portfolio: "Dự án",
      blog: "Bài viết",
      about: "Giới thiệu",
      contactLink: "Liên hệ",
      linkedin: "LinkedIn",
      instagram: "Instagram",
      facebook: "Facebook",
      rights: "© 2026 Tyler Ngo. Đã đăng ký bản quyền.",
    },
  }[lang];

  return (
    <footer className="border-t border-border/80 bg-muted/45 py-12 md:py-14 dark:bg-[#10101a]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 md:grid-cols-3 md:gap-16">
        <div>
          <h3 className="text-2xl font-semibold">Tyler<span className="text-[#d4b377]">.</span>Ngo</h3>
          <p className="mt-3 max-w-[280px] text-sm leading-7 text-muted-foreground">{t.desc}</p>
        </div>
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-foreground">{t.navigate}</p>
          <div className="space-y-3 text-sm">
            <Link to="/portfolio" className="block text-muted-foreground hover:text-foreground">{t.portfolio}</Link>
            <Link to="/blog" className="block text-muted-foreground hover:text-foreground">{t.blog}</Link>
            <Link to="/about" className="block text-muted-foreground hover:text-foreground">{t.about}</Link>
            <Link to="/contact" className="block text-muted-foreground hover:text-foreground">{t.contactLink}</Link>
          </div>
        </div>
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-foreground">{t.contact}</p>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <a href="mailto:hello@tylerngo.co.uk" className="flex items-center gap-2 leading-none transition-colors hover:text-foreground">
              <Mail size={14} />
              <span>hello@tylerngo.co.uk</span>
            </a>
            <a href="#" className="flex items-center gap-2 leading-none transition-colors hover:text-foreground">
              <Linkedin size={14} />
              <span>{t.linkedin}</span>
            </a>
            <a href="#" className="flex items-center gap-2 leading-none transition-colors hover:text-foreground">
              <Instagram size={14} />
              <span>{t.instagram}</span>
            </a>
            <a href="#" className="flex items-center gap-2 leading-none transition-colors hover:text-foreground">
              <Facebook size={14} />
              <span>{t.facebook}</span>
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 w-full max-w-7xl border-t border-border/70 px-6 pt-6 text-center text-xs text-muted-foreground">
        {t.rights}
      </div>
    </footer>
  );
}
