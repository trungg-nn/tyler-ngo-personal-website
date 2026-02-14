import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Target, BarChart3, Zap } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import Layout, { useLanguage } from "@/components/Layout";
import MetricCard from "@/components/MetricCard";
import { NEWSLETTER_FORM_ENDPOINT, hasNewsletterEndpoint } from "@/lib/formEndpoints";
import { getHomeSettings, getPosts, type SanityPost } from "@/lib/sanityQueries";

const metrics = {
  en: [
    { value: "+35%", label: "Qualified Pipeline" },
    { value: "-22%", label: "Cost Per Acquisition" },
    { value: "+40%", label: "Attribution Accuracy" },
    { value: "£5M/mo", label: "Budget Managed" },
  ],
  vi: [
    { value: "+35%", label: "Tăng trưởng Pipeline" },
    { value: "-22%", label: "Giảm Chi phí Chuyển đổi" },
    { value: "+40%", label: "Độ chính xác Attribution" },
    { value: "£5M/tháng", label: "Ngân sách quản lý" },
  ],
};

const capabilities = {
  en: [
    { icon: TrendingUp, title: "Full-Funnel Growth", desc: "End-to-end strategy from awareness to conversion, optimized at every stage." },
    { icon: Target, title: "Performance Media", desc: "Precision-targeted paid campaigns across search, social, and programmatic." },
    { icon: BarChart3, title: "Attribution & Analytics", desc: "Multi-touch attribution models that reveal true marketing impact." },
    { icon: Zap, title: "Experimentation", desc: "Rigorous A/B testing and rapid iteration to unlock compounding gains." },
  ],
  vi: [
    { icon: TrendingUp, title: "Tăng trưởng Full-Funnel", desc: "Chiến lược end-to-end từ nhận biết đến chuyển đổi, tối ưu ở mọi giai đoạn." },
    { icon: Target, title: "Performance Media", desc: "Chiến dịch trả phí nhắm mục tiêu chính xác trên search, social và programmatic." },
    { icon: BarChart3, title: "Attribution & Analytics", desc: "Mô hình attribution đa chạm giúp nhìn đúng tác động marketing." },
    { icon: Zap, title: "Thử nghiệm", desc: "A/B testing chặt chẽ và lặp nhanh để mở khóa tăng trưởng bền vững." },
  ],
};

const defaultHeroSlides = [
  { imageUrl: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80", alt: "Performance marketing dashboard" },
  { imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80", alt: "Marketing analytics" },
  { imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80", alt: "Growth strategy planning" },
];

const FALLBACK_THUMBNAIL =
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80";

export default function Index() {
  const { lang } = useLanguage();
  const [slideIndex, setSlideIndex] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterTrap, setNewsletterTrap] = useState("");
  const [newsletterState, setNewsletterState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [latestPosts, setLatestPosts] = useState<SanityPost[]>([]);
  const [heroSlides, setHeroSlides] = useState(defaultHeroSlides);
  const [insightsContent, setInsightsContent] = useState<{ title?: string; subtitle?: string }>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let mounted = true;

    Promise.all([getPosts(), getHomeSettings()]).then(([posts, settings]) => {
      if (!mounted) return;

      setLatestPosts(posts.slice(0, 5));

      const sanitySlides = settings?.heroSlides?.filter((slide) => slide?.imageUrl) || [];
      if (sanitySlides.length > 0) {
        setHeroSlides(
          sanitySlides.map((slide) => ({
            imageUrl: slide.imageUrl || FALLBACK_THUMBNAIL,
            alt: slide.alt || "Homepage hero slide",
          }))
        );
      }

      setInsightsContent({
        title: settings?.insightsTitle,
        subtitle: settings?.insightsSubtitle,
      });
    });

    return () => {
      mounted = false;
    };
  }, []);

  const carouselPosts = useMemo(
    () =>
      latestPosts.map((post) => ({
        title: post.title,
        slug: post.slug,
        tag: post.categories?.[0] || "Insight",
        date: post.publishedAt
          ? new Date(post.publishedAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : "",
        imageUrl: post.imageUrl || FALLBACK_THUMBNAIL,
        imageAlt: post.imageAlt || post.title,
      })),
    [latestPosts]
  );

  const onNewsletterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!hasNewsletterEndpoint || !NEWSLETTER_FORM_ENDPOINT) {
      setNewsletterState("error");
      return;
    }

    if (newsletterTrap.trim()) {
      setNewsletterState("success");
      return;
    }

    try {
      setNewsletterState("loading");
      const res = await fetch(NEWSLETTER_FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          email: newsletterEmail,
          _subject: "Newsletter subscription",
          _template: "table",
          _captcha: "false",
          _honey: newsletterTrap,
          source: "tylerngo.co.uk/newsletter",
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Newsletter submit failed");
      setNewsletterState("success");
      setNewsletterEmail("");
    } catch {
      setNewsletterState("error");
    }
  };

  const t = {
    en: {
      badge: "• Performance Marketing Manager · London",
      titleBefore: "Driving growth through",
      titleHighlight: "data, media & experimentation",
      subtitle:
        "I help ambitious brands scale revenue with full-funnel performance strategies, rigorous attribution, and relentless optimisation.",
      viewWork: "View My Work",
      getInTouch: "Get in Touch",
      results: "Results",
      numbersSpeak: "Numbers that speak",
      expertise: "Expertise",
      whatBest: "What I do best",
      insights: "Insights",
      latestThinking: "Latest insights",
      allArticles: "All articles",
      stayLoop: "Stay in the loop",
      monthlyInsights: "Monthly insights on performance marketing, attribution, and growth strategy.",
      subscribe: "Subscribe",
      subscribing: "Submitting...",
      subscribed: "Subscribed successfully.",
      subscribeError: "Could not subscribe right now.",
      subscribeMissing: "Newsletter endpoint not configured yet.",
    },
    vi: {
      badge: "• Performance Marketing Manager · London",
      titleBefore: "Thúc đẩy tăng trưởng bằng",
      titleHighlight: "dữ liệu, media & thử nghiệm",
      subtitle:
        "Mình giúp các thương hiệu tăng doanh thu bằng chiến lược full-funnel, attribution chặt chẽ và tối ưu liên tục.",
      viewWork: "Xem dự án",
      getInTouch: "Liên hệ",
      results: "Kết quả",
      numbersSpeak: "Những con số biết nói",
      expertise: "Chuyên môn",
      whatBest: "Điểm mạnh của tôi",
      insights: "Góc nhìn",
      latestThinking: "Insights mới nhất",
      allArticles: "Xem tất cả",
      stayLoop: "Luôn cập nhật",
      monthlyInsights: "Insight hàng tháng về performance marketing, attribution và chiến lược tăng trưởng.",
      subscribe: "Đăng ký",
      subscribing: "Đang gửi...",
      subscribed: "Đăng ký thành công.",
      subscribeError: "Không thể đăng ký lúc này.",
      subscribeMissing: "Newsletter chưa cấu hình nơi nhận.",
    },
  }[lang];

  return (
    <Layout>
      <section className="hero-bg relative overflow-hidden border-b border-border/60">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 pb-20 pt-24 md:grid-cols-[1.05fr_0.95fr] md:pt-32 reveal-up">
          <div className="max-w-3xl">
            <p className="mb-6 inline-flex items-center rounded-full border border-primary/30 bg-card/30 px-4 py-1.5 text-sm text-primary">{t.badge}</p>
            <h1 className="text-4xl font-bold leading-[1.08] md:text-[72px]">{t.titleBefore} <span className="text-gradient-gold">{t.titleHighlight}</span></h1>
            <p className="mt-7 max-w-2xl text-base text-muted-foreground md:text-[19px] md:leading-[1.65]">{t.subtitle}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/portfolio" className="cta-btn inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-base font-medium">{t.viewWork} <ArrowRight size={16} /></Link>
              <Link to="/contact" className="rounded-xl border border-border bg-background/30 px-7 py-3.5 text-base">{t.getInTouch}</Link>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="hero-frame overflow-hidden rounded-[26px] border border-border/70 bg-card/50 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.22)]">
              <img
                src={heroSlides[slideIndex]?.imageUrl || FALLBACK_THUMBNAIL}
                alt={heroSlides[slideIndex]?.alt || "Performance marketing"}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                className="h-[520px] w-full rounded-[20px] object-cover transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-4 left-4 rounded-xl border border-border/70 bg-background/85 px-3 py-2 text-xs backdrop-blur">Live campaigns</div>
            <div className="absolute -right-3 top-5 rounded-xl border border-border/70 bg-background/85 px-3 py-2 text-xs backdrop-blur">Attribution · Growth</div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/50 bg-background py-24 md:py-28 reveal-up" style={{ animationDelay: "120ms" }}>
        <div className="mx-auto w-full max-w-7xl px-6">
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-primary">{t.results}</p>
          <h2 className="mb-12 text-5xl font-semibold md:text-[52px]">{t.numbersSpeak}</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">{metrics[lang].map((m) => <MetricCard key={m.label} {...m} />)}</div>
        </div>
      </section>

      <section className="border-b border-border/50 bg-card/30 py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6">
          <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-primary">{t.expertise}</p>
          <h2 className="mb-8 text-[44px] font-semibold leading-tight">{t.whatBest}</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {capabilities[lang].map((c, i) => (
              <article key={c.title} className="reveal-up interactive-card rounded-2xl border border-border bg-background/72 px-6 py-6 md:min-h-[154px]" style={{ animationDelay: `${120 + i * 90}ms` }}>
                <div className="mb-4 inline-flex rounded-xl border border-border bg-card/50 p-3"><c.icon size={16} className="text-primary" /></div>
                <h3 className="mb-2 text-[28px] font-semibold leading-tight md:text-[30px]">{c.title}</h3>
                <p className="text-[14px] leading-relaxed text-muted-foreground">{c.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border/50 bg-background py-16">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-primary">{t.insights}</p>
              <h2 className="text-[44px] font-semibold">{insightsContent.title || t.latestThinking}</h2>
              {insightsContent.subtitle && <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{insightsContent.subtitle}</p>}
            </div>
            <Link to="/blog" className="hidden items-center gap-2 text-primary md:inline-flex">{t.allArticles} <ArrowRight size={14} /></Link>
          </div>

          <div className="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2">
            {carouselPosts.map((post) => (
              <article key={post.slug} className="interactive-card min-w-[280px] max-w-[320px] snap-start rounded-2xl border border-border bg-card/60 p-4 md:min-w-[340px]">
                <img src={post.imageUrl} alt={post.imageAlt} loading="lazy" className="h-40 w-full rounded-xl border border-border/50 object-cover" />
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="rounded-full bg-secondary px-2 py-1 text-secondary-foreground">{post.tag}</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-tight">
                  <Link to={`/blog/${post.slug}`} className="smooth-link hover:text-primary">
                    {post.title}
                  </Link>
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border/50 bg-card/30 py-12">
        <div className="mx-auto w-full max-w-3xl px-6 text-center">
          <h2 className="text-[40px] font-semibold">{t.stayLoop}</h2>
          <p className="mt-3 text-sm text-muted-foreground">{t.monthlyInsights}</p>
          <form onSubmit={onNewsletterSubmit} className="mx-auto mt-6 flex max-w-[340px] flex-col gap-2 sm:max-w-xl sm:flex-row">
            <input
              required
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 rounded-xl border border-border bg-background px-4 py-2 text-sm outline-none"
            />
            <input
              tabIndex={-1}
              autoComplete="off"
              value={newsletterTrap}
              onChange={(e) => setNewsletterTrap(e.target.value)}
              className="hidden"
              aria-hidden="true"
              name="website"
            />
            <button
              type="submit"
              disabled={newsletterState === "loading"}
              className="cta-btn rounded-xl px-5 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-60"
            >
              {newsletterState === "loading" ? t.subscribing : t.subscribe}
            </button>
          </form>
          {!hasNewsletterEndpoint && <p className="mt-2 text-xs text-amber-500">{t.subscribeMissing}</p>}
          {newsletterState === "success" && <p className="mt-2 text-xs text-emerald-500">{t.subscribed}</p>}
          {newsletterState === "error" && <p className="mt-2 text-xs text-red-500">{t.subscribeError}</p>}
        </div>
      </section>
    </Layout>
  );
}
