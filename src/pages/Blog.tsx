import Layout from "@/components/Layout";

const posts = [
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
  {
    tag: "Analytics",
    read: "7 min read",
    title: "Building a Growth Engine with Incrementality Testing",
    excerpt:
      "Move beyond correlation to causation. How incrementality testing reveals which campaigns truly drive revenue.",
    date: "Oct 30, 2025",
  },
  {
    tag: "Creative",
    read: "5 min read",
    title: "The Creative Testing Framework That Cut Our CPA by 22%",
    excerpt:
      "A structured approach to creative iteration that compounds performance gains over time.",
    date: "Oct 5, 2025",
  },
  {
    tag: "Strategy",
    read: "9 min read",
    title: "Full-Funnel Thinking in a Last-Click World",
    excerpt:
      "Why optimising for bottom-funnel metrics alone leaves growth on the table, and what to do about it.",
    date: "Sep 18, 2025",
  },
];

export default function Blog() {
  return (
    <Layout>
      <section className="border-b border-border/50 bg-background py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-primary">Blog</p>
          <h1 className="text-5xl font-bold leading-tight transition-colors duration-300 hover:text-primary md:text-[52px]">Insights & ideas</h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-[17px]">
            Thinking on performance marketing, growth strategy, and the future of digital.
          </p>

          <div className="mt-12 space-y-0">
            {posts.map((post) => (
              <article key={post.title} className="border-b border-border/70 py-8">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div className="inline-flex items-center gap-3">
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                      {post.tag}
                    </span>
                    <span className="text-xs text-muted-foreground">{post.read}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>

                <h2 className="text-xl font-semibold leading-tight transition-colors duration-300 hover:text-primary md:text-[28px]">{post.title}</h2>
                <p className="mt-3 text-sm text-muted-foreground md:max-w-[82%]">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
