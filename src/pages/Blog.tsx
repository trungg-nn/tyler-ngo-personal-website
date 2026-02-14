import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Layout, { useLanguage } from "@/components/Layout";
import { getPosts, type SanityPost } from "@/lib/sanityQueries";

type BlogCard = {
  tag: string;
  read: string;
  title: string;
  slug?: string;
  excerpt: string;
  date: string;
  authorName?: string;
  imageUrl?: string;
  imageAlt?: string;
};

const fallbackPosts = {
  en: [
    {
      tag: "Attribution",
      read: "8 min read",
      title: "Why Multi-Touch Attribution Changes Everything",
      excerpt:
        "The days of last-click are over. Here’s how modern attribution models are reshaping budget allocation and proving true marketing impact.",
      date: "Jan 15, 2026",
    },
    {
      tag: "Performance",
      read: "6 min read",
      title: "Scaling Paid Media Without Scaling Waste",
      excerpt:
        "How to maintain efficiency as you increase spend—lessons from managing £5M+ monthly budgets across channels.",
      date: "Dec 8, 2025",
    },
    {
      tag: "Strategy",
      read: "10 min read",
      title: "The Experimentation Playbook for B2B",
      excerpt:
        "A practical framework for running meaningful experiments in B2B marketing, from hypothesis to statistical significance.",
      date: "Nov 22, 2025",
    },
  ],
  vi: [
    {
      tag: "Attribution",
      read: "8 phút đọc",
      title: "Vì sao Multi-Touch Attribution thay đổi cuộc chơi",
      excerpt:
        "Thời của last-click đã qua. Đây là cách attribution hiện đại định hình lại phân bổ ngân sách và chứng minh tác động thật của marketing.",
      date: "15 Thg 1, 2026",
    },
    {
      tag: "Performance",
      read: "6 phút đọc",
      title: "Mở rộng Paid Media mà không lãng phí",
      excerpt:
        "Cách giữ hiệu quả khi tăng ngân sách — bài học từ việc quản lý hơn £5M mỗi tháng trên đa kênh.",
      date: "8 Thg 12, 2025",
    },
    {
      tag: "Chiến lược",
      read: "10 phút đọc",
      title: "Playbook thử nghiệm cho B2B",
      excerpt:
        "Framework thực tiễn để chạy thử nghiệm có ý nghĩa trong B2B, từ giả thuyết đến ý nghĩa thống kê.",
      date: "22 Thg 11, 2025",
    },
  ],
};

const FALLBACK_THUMBNAIL =
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80";

export default function Blog() {
  const { lang } = useLanguage();
  const [sanityPosts, setSanityPosts] = useState<SanityPost[]>([]);
  const [activeTag, setActiveTag] = useState("All");

  useEffect(() => {
    let mounted = true;
    getPosts().then((data) => {
      if (mounted) setSanityPosts(data);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const sanityMapped = useMemo<BlogCard[]>(
    () =>
      sanityPosts.map((post) => ({
        tag: post.categories?.[0] || "Insight",
        read: "6 min read",
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || post.metaDescription || "New article available.",
        date: post.publishedAt
          ? new Date(post.publishedAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : "",
        authorName: post.authorName,
        imageUrl: post.imageUrl,
        imageAlt: post.imageAlt,
      })),
    [sanityPosts]
  );

  const allPosts: BlogCard[] = lang === "en" && sanityMapped.length > 0 ? sanityMapped : fallbackPosts[lang];

  const tags = useMemo(() => {
    const unique = Array.from(new Set(allPosts.map((p) => p.tag))).filter(Boolean);
    return ["All", ...unique];
  }, [allPosts]);

  const filteredPosts = useMemo(
    () => (activeTag === "All" ? allPosts : allPosts.filter((p) => p.tag === activeTag)),
    [allPosts, activeTag]
  );

  const featured = filteredPosts[0];
  const list = filteredPosts.slice(1);

  const t = {
    en: {
      label: "Blog",
      title: "Insights and analysis.",
      subtitle:
        "Practical writing on performance marketing, measurement, growth strategy, and the tools that power modern acquisition.",
      featured: "Featured",
      readArticle: "Read article",
    },
    vi: {
      label: "Bài viết",
      title: "Insights và phân tích.",
      subtitle:
        "Nội dung thực chiến về performance marketing, measurement, growth strategy và các công cụ cho tăng trưởng hiện đại.",
      featured: "Nổi bật",
      readArticle: "Đọc bài",
    },
  }[lang];

  return (
    <Layout>
      <section className="border-b border-border/50 bg-background py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
          <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-primary">{t.label}</p>
          <h1 className="text-5xl font-semibold md:text-[52px]">{t.title}</h1>
          <p className="mt-4 max-w-3xl text-base text-muted-foreground md:text-[18px]">{t.subtitle}</p>

          <div className="mt-10 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={`rounded-xl border px-3 py-1.5 text-xs transition-colors ${
                  activeTag === tag
                    ? "border-primary/40 bg-primary/15 text-primary"
                    : "border-border bg-card/40 text-muted-foreground hover:text-foreground"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {featured && (
            <article className="mt-8 rounded-2xl border border-border/60 bg-card/40 p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-primary/20 px-2.5 py-1 text-[11px] font-semibold text-primary">{t.featured}</span>
                <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] text-secondary-foreground">{featured.tag}</span>
              </div>

              <img
                src={featured.imageUrl || FALLBACK_THUMBNAIL}
                alt={featured.imageAlt || featured.title}
                loading="lazy"
                className="mt-4 h-52 w-full rounded-xl border border-border/50 object-cover md:h-64"
              />

              <h2 className="mt-5 text-3xl font-semibold leading-tight md:text-[42px]">
                {featured.slug ? (
                  <Link to={`/blog/${featured.slug}`} className="smooth-link hover:text-primary">
                    {featured.title}
                  </Link>
                ) : (
                  featured.title
                )}
              </h2>

              <p className="mt-4 max-w-3xl text-[16px] leading-7 text-muted-foreground">{featured.excerpt}</p>

              <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span>{featured.date}</span>
                <span>•</span>
                <span>{featured.read}</span>
                {featured.authorName ? (
                  <>
                    <span>•</span>
                    <span>By {featured.authorName}</span>
                  </>
                ) : null}
              </div>

              {featured.slug && (
                <Link to={`/blog/${featured.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                  {t.readArticle} →
                </Link>
              )}
            </article>
          )}

          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {list.map((post) => (
              <article key={`${post.title}-${post.date}`} className="interactive-card rounded-2xl border border-border/60 bg-card/40 p-5">
                <img
                  src={post.imageUrl || FALLBACK_THUMBNAIL}
                  alt={post.imageAlt || post.title}
                  loading="lazy"
                  className="mb-3 h-40 w-full rounded-xl border border-border/50 object-cover"
                />

                <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded-full bg-secondary px-2 py-1 text-secondary-foreground">{post.tag}</span>
                  <span>{post.date}</span>
                </div>

                <h3 className="text-xl font-semibold leading-tight">
                  {post.slug ? (
                    <Link to={`/blog/${post.slug}`} className="smooth-link hover:text-primary">
                      {post.title}
                    </Link>
                  ) : (
                    post.title
                  )}
                </h3>

                <p className="mt-3 text-sm text-muted-foreground">{post.excerpt}</p>
                <div className="mt-4 text-xs text-muted-foreground">{post.read}</div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
