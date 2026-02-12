import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import MetricCard from "@/components/MetricCard";

const metrics = [
  { value: "+35%", label: "Qualified Pipeline" },
  { value: "-22%", label: "CPA Reduction" },
  { value: "+40%", label: "Attribution Accuracy" },
  { value: "£5M/mo", label: "Budget Managed" },
];

export default function Index() {
  return (
    <Layout>
      <section className="hero-bg relative overflow-hidden border-b border-border/60">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_50%,rgba(99,102,241,0.14),transparent_28%)]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] bg-[linear-gradient(110deg,transparent_0%,rgba(120,130,255,0.08)_42%,transparent_75%)] md:block" />
        <div className="mx-auto w-full max-w-6xl px-6 pb-28 pt-28 md:pt-36">
          <div className="max-w-3xl">
            <p className="mb-6 inline-flex items-center rounded-full border border-primary/30 bg-card/30 px-4 py-1.5 text-sm text-primary">
              • Performance Marketing Manager · London
            </p>
            <h1 className="text-[56px] font-bold leading-[1.02] md:text-[84px]">
              Driving growth through <span className="text-gradient-gold">data, media & experimentation</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg text-muted-foreground md:text-2xl md:leading-[1.35]">
              I help ambitious brands scale revenue with full-funnel performance strategies, rigorous attribution, and relentless optimisation.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/portfolio" className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-base font-medium text-primary-foreground">
                View My Work <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="rounded-xl border border-border bg-background/30 px-7 py-3.5 text-base">
                Get in Touch
              </Link>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
            {metrics.map((m) => (
              <MetricCard key={m.label} {...m} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
