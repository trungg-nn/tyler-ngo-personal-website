import Layout from "@/components/Layout";

const projects = [
  {
    type: "B2B SaaS Platform",
    title: "Enterprise SaaS Pipeline Acceleration",
    desc: "Restructured the full-funnel paid strategy with multi-touch attribution, driving a 35% increase in qualified pipeline while reducing CPA by 18%.",
    tags: ["Paid Search", "LinkedIn Ads", "Attribution"],
    metric: "+35% qualified pipeline in 6 months",
  },
  {
    type: "DTC Fashion Brand",
    title: "E-Commerce CPA Reduction at Scale",
    desc: "Overhauled creative testing frameworks and landing page optimisation to cut acquisition costs while scaling monthly spend to £1.2M.",
    tags: ["Meta Ads", "Google Shopping", "CRO"],
    metric: "-22% CPA across all channels",
  },
  {
    type: "Fintech Scale-Up",
    title: "Attribution Model Transformation",
    desc: "Designed and implemented a hybrid attribution model combining media mix modelling with incrementality testing to unlock true channel impact.",
    tags: ["MMM", "Incrementality", "Data Engineering"],
    metric: "+40% attribution accuracy",
  },
  {
    type: "EdTech Company",
    title: "Multi-Market Expansion Strategy",
    desc: "Led the performance marketing expansion into 3 European markets, building localised acquisition funnels and managing £5M monthly budgets.",
    tags: ["Programmatic", "Localisation", "Strategy"],
    metric: "3 new markets, £5M/mo budget",
  },
];

export default function Portfolio() {
  return (
    <Layout>
      <section className="border-b border-border/60 bg-background py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-primary">Portfolio</p>
          <h1 className="text-5xl font-bold md:text-[52px]">Selected work</h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-[17px]">
            Case studies showcasing measurable business outcomes through performance marketing strategy.
          </p>

          <div className="mt-10 space-y-4">
            {projects.map((p) => (
              <article key={p.title} className="rounded-2xl border border-border bg-card/55 p-6 md:p-6">
                <div className="grid gap-6 md:grid-cols-[1.9fr_0.8fr] md:items-start">
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{p.type}</p>
                    <h2 className="mt-2 text-3xl font-semibold leading-tight md:text-[30px]">{p.title}</h2>
                    <p className="mt-3 max-w-[92%] text-sm text-muted-foreground">{p.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right text-xl font-semibold md:pt-3 md:text-[22px] md:leading-tight md:whitespace-nowrap">
                    <span className="text-gradient-gold">{p.metric}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
