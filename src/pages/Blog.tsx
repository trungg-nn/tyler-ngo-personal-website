import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Layout, { useLanguage } from "@/components/Layout";
import { getPosts, type SanityPost } from "@/lib/sanityQueries";

const posts = {
  en: [
    { tag: "Attribution", read: "8 min read", title: "Why Multi-Touch Attribution Changes Everything", excerpt: "The days of last-click are over. Here’s how modern attribution models are reshaping budget allocation and proving true marketing impact.", date: "Jan 15, 2026" },
    { tag: "Performance", read: "6 min read", title: "Scaling Paid Media Without Scaling Waste", excerpt: "How to maintain efficiency as you increase spend—lessons from managing £5M+ monthly budgets across channels.", date: "Dec 8, 2025" },
    { tag: "Strategy", read: "10 min read", title: "The Experimentation Playbook for B2B", excerpt: "A practical framework for running meaningful experiments in B2B marketing, from hypothesis to statistical significance.", date: "Nov 22, 2025" },
  ],
  vi: [
    { tag: "Attribution", read: "8 phút đọc", title: "Vì sao Multi-Touch Attribution thay đổi cuộc chơi", excerpt: "Thời của last-click đã qua. Đây là cách attribution hiện đại định hình lại phân bổ ngân sách và chứng minh tác động thật của marketing.", date: "15 Thg 1, 2026" },
    { tag: "Performance", read: "6 phút đọc", title: "Mở rộng Paid Media mà không lãng phí", excerpt: "Cách giữ hiệu quả khi tăng ngân sách — bài học từ việc quản lý hơn £5M mỗi tháng trên đa kênh.", date: "8 Thg 12, 2025" },
    { tag: "Chiến lược", read: "10 phút đọc", title: "Playbook thử nghiệm cho B2B", excerpt: "Framework thực tiễn để chạy thử nghiệm có ý nghĩa trong B2B, từ giả thuyết đến ý nghĩa thống kê.", date: "22 Thg 11, 2025" },
  ],
};

export default function Blog() {
  const { lang } = useLanguage();
  const [sanityPosts, setSanityPosts] = useState<SanityPost[]>([]);

  useEffect(() => {
    let mounted = true;
    getPosts().then((data) => {
      if (mounted) setSanityPosts(data);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const sanityMapped = useMemo(
    () => sanityPosts.map((post) => ({
      tag: post.categories?.[0] || "Insight",
      read: "5 min read",
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || post.metaDescription || "New article available.",
      date: post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "",
      authorName: post.authorName,
    })),
    [sanityPosts]
  );

  const activePosts = lang === "en" && sanityMapped.length > 0 ? sanityMapped : posts[lang];

  const t = {
    en: {
      label: "Blog",
      title: "Insights & ideas",
      subtitle: "Thinking on performance marketing, growth strategy, and the future of digital.",
    },
    vi: {
      label: "Bài viết",
      title: "Góc nhìn & ý tưởng",
      subtitle: "Phân tích về performance marketing, chiến lược tăng trưởng và tương lai của digital.",
    },
  }[lang];

  return (
    <Layout>
      <section className="border-b border-border/50 bg-background py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-primary">{t.label}</p>
          <h1 className="text-5xl font-bold leading-tight transition-colors duration-300 hover:text-primary md:text-[52px]">{t.title}</h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-[17px]">{t.subtitle}</p>

          <div className="mt-12 space-y-0">
            {activePosts.map((post) => (
              <article key={post.title} className="border-b border-border/70 py-8 transition-colors duration-300 hover:bg-card/20">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div className="inline-flex items-center gap-3">
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">{post.tag}</span>
                    <span className="text-xs text-muted-foreground">{post.read}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>

                <h2 className="text-xl font-semibold leading-tight transition-colors duration-300 hover:text-primary md:text-[28px]">
                  {"slug" in post && post.slug ? (
                    <Link to={`/blog/${post.slug}`} className="smooth-link">
                      {post.title}
                    </Link>
                  ) : (
                    post.title
                  )}
                </h2>
                <p className="mt-3 text-sm text-muted-foreground md:max-w-[82%]">{post.excerpt}</p>
                {"authorName" in post && post.authorName && (
                  <p className="mt-2 text-xs text-muted-foreground">By {post.authorName}</p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
