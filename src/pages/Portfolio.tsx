import Layout, { useLanguage } from "@/components/Layout";

const projects = {
  en: [
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
  ],
  vi: [
    {
      type: "Nền tảng SaaS B2B",
      title: "Tăng tốc pipeline cho SaaS doanh nghiệp",
      desc: "Tái cấu trúc chiến lược paid full-funnel với multi-touch attribution, giúp tăng 35% qualified pipeline và giảm CPA 18%.",
      tags: ["Paid Search", "LinkedIn Ads", "Attribution"],
      metric: "+35% qualified pipeline trong 6 tháng",
    },
    {
      type: "Thương hiệu thời trang DTC",
      title: "Giảm CPA cho e-commerce ở quy mô lớn",
      desc: "Nâng cấp framework creative testing và tối ưu landing page để giảm chi phí chuyển đổi khi tăng ngân sách lên £1.2M/tháng.",
      tags: ["Meta Ads", "Google Shopping", "CRO"],
      metric: "-22% CPA trên toàn kênh",
    },
    {
      type: "Fintech scale-up",
      title: "Chuyển đổi mô hình attribution",
      desc: "Thiết kế và triển khai mô hình attribution lai, kết hợp media mix modelling với incrementality testing để đo đúng hiệu quả kênh.",
      tags: ["MMM", "Incrementality", "Data Engineering"],
      metric: "+40% độ chính xác attribution",
    },
    {
      type: "Công ty EdTech",
      title: "Chiến lược mở rộng đa thị trường",
      desc: "Dẫn dắt mở rộng performance marketing sang 3 thị trường châu Âu, xây funnel bản địa hoá và quản lý ngân sách £5M/tháng.",
      tags: ["Programmatic", "Localisation", "Strategy"],
      metric: "3 thị trường mới, £5M/tháng",
    },
  ],
};

export default function Portfolio() {
  const { lang } = useLanguage();
  const t = {
    en: {
      title: "Selected work",
      subtitle: "Case studies showcasing measurable business outcomes through performance marketing strategy.",
      label: "Portfolio",
    },
    vi: {
      title: "Dự án tiêu biểu",
      subtitle: "Các case study thể hiện kết quả kinh doanh đo lường được từ chiến lược performance marketing.",
      label: "Dự án",
    },
  }[lang];

  return (
    <Layout>
      <section className="border-b border-border/60 bg-background py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-primary">{t.label}</p>
          <h1 className="text-5xl font-bold md:text-[52px]">{t.title}</h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-[17px]">{t.subtitle}</p>

          <div className="mt-10 space-y-4">
            {projects[lang].map((p) => (
              <article key={p.title} className="interactive-card rounded-2xl border border-border bg-card/55 p-6 md:p-6">
                <div className="grid gap-6 md:grid-cols-[1.9fr_0.8fr] md:items-start">
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{p.type}</p>
                    <h2 className="mt-2 text-3xl font-semibold leading-tight md:text-[30px]">{p.title}</h2>
                    <p className="mt-3 max-w-[92%] text-sm text-muted-foreground">{p.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">{tag}</span>
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
