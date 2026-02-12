import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Target, BarChart3, Zap } from "lucide-react";
import Layout from "@/components/Layout";
import MetricCard from "@/components/MetricCard";

const metrics = [
  { value: "+35%", label: "Qualified Pipeline" },
  { value: "-22%", label: "Cost Per Acquisition" },
  { value: "+40%", label: "Attribution Accuracy" },
  { value: "£5M/mo", label: "Budget Managed" },
];

const capabilities = [
  { icon: TrendingUp, title: "Full-Funnel Growth", desc: "End-to-end strategy from awareness to conversion, optimized at every stage." },
  { icon: Target, title: "Performance Media", desc: "Precision-targeted paid campaigns across search, social, and programmatic." },
  { icon: BarChart3, title: "Attribution & Analytics", desc: "Multi-touch attribution models that reveal true marketing impact." },
  { icon: Zap, title: "Experimentation", desc: "Rigorous A/B testing and rapid iteration to unlock compounding gains." },
];

const featuredArticles = [
  { title: "Why Multi-Touch Attribution Changes Everything", tag: "Attribution", date: "Jan 2026" },
  { title: "Scaling Paid Media Without Scaling Waste", tag: "Performance", date: "Dec 2025" },
  { title: "The Experimentation Playbook for B2B", tag: "Strategy", date: "Nov 2025" },
];

export default function Index() {
  return (
    <Layout>
      <section className="hero-bg relative overflow-hidden border-b border-border/60">
        <div className="mx-auto w-full max-w-7xl px-6 pb-20 pt-24 md:pt-32 reveal-up">
          <div className="max-w-3xl">
            <p className="mb-6 inline-flex items-center rounded-full border border-primary/30 bg-card/30 px-4 py-1.5 text-sm text-primary">• Performance Marketing Manager · London</p>
            <h1 className="text-4xl font-bold leading-[1.08] md:text-[72px]">Driving growth through <span className="text-gradient-gold">data, media & experimentation</span></h1>
            <p className="mt-7 max-w-2xl text-base text-muted-foreground md:text-[19px] md:leading-[1.65]">I help ambitious brands scale revenue with full-funnel performance strategies, rigorous attribution, and relentless optimisation.</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/portfolio" className="cta-btn inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-base font-medium">View My Work <ArrowRight size={16} /></Link>
              <Link to="/contact" className="rounded-xl border border-border bg-background/30 px-7 py-3.5 text-base">Get in Touch</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/50 bg-background py-24 md:py-28 reveal-up" style={{ animationDelay: '120ms' }}>
        <div className="mx-auto w-full max-w-7xl px-6">
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-primary">Results</p>
          <h2 className="mb-12 text-5xl font-semibold md:text-[52px]">Numbers that speak</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">{metrics.map((m) => <MetricCard key={m.label} {...m} />)}</div>
        </div>
      </section>

      <section className="border-b border-border/50 bg-card/30 py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6">
          <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-primary">Expertise</p>
          <h2 className="mb-8 text-[44px] font-semibold leading-tight">What I do best</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {capabilities.map((c, i) => (
              <article key={c.title} className={`reveal-up rounded-2xl border border-border bg-background/72 px-6 py-6 md:min-h-[154px]`} style={{ animationDelay: `${120 + i * 90}ms` }}>
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
          <div className="mb-10 flex items-end justify-between">
            <div><p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-primary">Insights</p><h2 className="text-[44px] font-semibold">Latest thinking</h2></div>
            <Link to="/blog" className="hidden items-center gap-2 text-primary md:inline-flex">All articles <ArrowRight size={14} /></Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {featuredArticles.map((a) => (
              <article key={a.title} className="rounded-2xl border border-border bg-card/60 p-5">
                <span className="mb-4 inline-block rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">{a.tag}</span>
                <h3 className="mb-3 text-xl font-semibold leading-tight">{a.title}</h3>
                <p className="text-sm text-muted-foreground">{a.date}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border/50 bg-card/30 py-12">
        <div className="mx-auto w-full max-w-3xl px-6 text-center">
          <h2 className="text-[40px] font-semibold">Stay in the loop</h2>
          <p className="mt-3 text-sm text-muted-foreground">Monthly insights on performance marketing, attribution, and growth strategy.</p>
          <div className="mx-auto mt-6 flex max-w-[340px] flex-col gap-2 sm:max-w-xl sm:flex-row">
            <input type="email" placeholder="your@email.com" className="flex-1 rounded-xl border border-border bg-background px-4 py-2 text-sm outline-none" />
            <button className="cta-btn rounded-xl px-5 py-2 text-sm font-medium">Subscribe</button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
