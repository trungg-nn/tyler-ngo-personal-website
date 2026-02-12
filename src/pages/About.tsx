import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Layout, { useLanguage } from "@/components/Layout";
import MetricCard from "@/components/MetricCard";

const metrics = {
  en: [
    { value: "+35%", label: "Qualified Pipeline" },
    { value: "-22%", label: "CPA Reduction" },
    { value: "+40%", label: "Attribution Accuracy" },
    { value: "£5M/mo", label: "Budget Managed" },
  ],
  vi: [
    { value: "+35%", label: "Tăng trưởng Pipeline" },
    { value: "-22%", label: "Giảm CPA" },
    { value: "+40%", label: "Độ chính xác Attribution" },
    { value: "£5M/tháng", label: "Ngân sách quản lý" },
  ],
};

const strengths = {
  en: ["Full-Funnel Strategy", "Paid Search & Social", "Programmatic Display", "Multi-Touch Attribution", "Media Mix Modelling", "A/B & Incrementality Testing", "Budget Forecasting", "Creative Strategy"],
  vi: ["Chiến lược Full-Funnel", "Paid Search & Social", "Programmatic Display", "Attribution đa chạm", "Media Mix Modelling", "A/B & Incrementality Testing", "Dự báo ngân sách", "Chiến lược sáng tạo"],
};

export default function About() {
  const { lang } = useLanguage();

  const t = {
    en: {
      label: "About",
      p1: "I’m a Performance Marketing Manager based in London, specialising in full-funnel growth strategy for ambitious B2B and consumer brands. My work sits at the intersection of data, creative, and media— turning complex attribution challenges into clear growth roadmaps.",
      p2: "With experience managing budgets of up to £5M per month across paid search, social, programmatic, and emerging channels, I’ve developed a rigorous approach to scaling performance while maintaining efficiency. I believe in experimentation-led growth—every hypothesis tested, every insight actioned.",
      p3: "Previously, I’ve worked with scale-ups and enterprises across SaaS, FinTech, e-commerce, and EdTech, helping teams build measurement frameworks, optimise media mix, and unlock compounding gains through structured experimentation.",
      core: "Core strengths",
      edu: "Education",
      cta: "Let’s work together",
    },
    vi: {
      label: "Giới thiệu",
      p1: "Mình là Performance Marketing Manager tại London, tập trung vào chiến lược tăng trưởng full-funnel cho các thương hiệu B2B và consumer. Công việc của mình nằm ở giao điểm giữa dữ liệu, sáng tạo và media — biến các bài toán attribution phức tạp thành lộ trình tăng trưởng rõ ràng.",
      p2: "Với kinh nghiệm quản lý ngân sách tới £5M mỗi tháng trên paid search, social, programmatic và các kênh mới, mình xây dựng phương pháp scale hiệu quả mà vẫn đảm bảo hiệu suất. Mình tin vào tăng trưởng dựa trên thử nghiệm — mọi giả thuyết đều được kiểm chứng, mọi insight đều được hành động.",
      p3: "Trước đây, mình làm việc với các scale-up và doanh nghiệp trong SaaS, FinTech, e-commerce và EdTech, hỗ trợ xây dựng hệ thống đo lường, tối ưu media mix và mở khóa tăng trưởng bền vững qua thử nghiệm có cấu trúc.",
      core: "Năng lực cốt lõi",
      edu: "Học vấn",
      cta: "Hợp tác cùng tôi",
    },
  }[lang];

  return (
    <Layout>
      <section className="border-b border-border/50 bg-background py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
          <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-primary">{t.label}</p>
          <h1 className="text-5xl font-semibold md:text-[52px]">Tyler Ngo</h1>

          <div className="mt-7 space-y-5 text-base leading-[1.7] text-muted-foreground">
            <p>{t.p1}</p>
            <p>{t.p2}</p>
            <p>{t.p3}</p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {metrics[lang].map((m) => <MetricCard key={m.label} {...m} />)}
          </div>

          <div className="mt-14">
            <h2 className="text-3xl font-semibold md:text-[38px]">{t.core}</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {strengths[lang].map((item) => (
                <span key={item} className="rounded-xl border border-border bg-card/55 px-4 py-2 text-sm text-muted-foreground">{item}</span>
              ))}
            </div>
          </div>

          <div className="mt-14">
            <h2 className="text-3xl font-semibold md:text-[38px]">{t.edu}</h2>
            <div className="mt-5 space-y-4">
              <article className="rounded-2xl border border-border bg-card/55 px-5 py-4">
                <h3 className="text-2xl font-semibold">MSc Digital Marketing</h3>
                <p className="mt-1 text-sm text-muted-foreground">University of London</p>
              </article>
              <article className="rounded-2xl border border-border bg-card/55 px-5 py-4">
                <h3 className="text-2xl font-semibold">BSc Business Administration</h3>
                <p className="mt-1 text-sm text-muted-foreground">University of Economics, Vietnam</p>
              </article>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link to="/contact" className="cta-btn inline-flex items-center gap-2 rounded-xl px-8 py-3 text-sm font-medium">
              {t.cta} <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
