import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import MetricCard from "@/components/MetricCard";

const metrics = [
  { value: "+35%", label: "Qualified Pipeline" },
  { value: "-22%", label: "CPA Reduction" },
  { value: "+40%", label: "Attribution Accuracy" },
  { value: "£5M/mo", label: "Budget Managed" },
];

const strengths = [
  "Full-Funnel Strategy",
  "Paid Search & Social",
  "Programmatic Display",
  "Multi-Touch Attribution",
  "Media Mix Modelling",
  "A/B & Incrementality Testing",
  "Budget Forecasting",
  "Creative Strategy",
];

export default function About() {
  return (
    <Layout>
      <section className="border-b border-border/50 bg-background py-16 md:py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-primary">About</p>
          <h1 className="text-5xl font-semibold md:text-[52px]">Tyler Ngo</h1>

          <div className="mt-7 space-y-5 text-base leading-[1.7] text-muted-foreground">
            <p>
              I’m a Performance Marketing Manager based in London, specialising in full-funnel growth strategy for ambitious B2B and consumer brands. My work sits at the intersection of data, creative, and media— turning complex attribution challenges into clear growth roadmaps.
            </p>
            <p>
              With experience managing budgets of up to £5M per month across paid search, social, programmatic, and emerging channels, I’ve developed a rigorous approach to scaling performance while maintaining efficiency. I believe in experimentation-led growth—every hypothesis tested, every insight actioned.
            </p>
            <p>
              Previously, I’ve worked with scale-ups and enterprises across SaaS, FinTech, e-commerce, and EdTech, helping teams build measurement frameworks, optimise media mix, and unlock compounding gains through structured experimentation.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {metrics.map((m) => (
              <MetricCard key={m.label} {...m} />
            ))}
          </div>

          <div className="mt-14">
            <h2 className="text-3xl font-semibold md:text-[38px]">Core strengths</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {strengths.map((item) => (
                <span key={item} className="rounded-xl border border-border bg-card/55 px-4 py-2 text-sm text-muted-foreground">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-14">
            <h2 className="text-3xl font-semibold md:text-[38px]">Education</h2>
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
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-medium text-primary-foreground">
              Let’s work together <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
