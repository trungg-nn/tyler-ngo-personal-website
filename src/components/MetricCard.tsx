export default function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <article className="flex min-h-[132px] flex-col items-center justify-center rounded-2xl border border-border bg-card/62 px-6 py-5 text-center shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 md:min-h-[142px]">
      <p className="text-4xl font-semibold leading-none text-primary md:text-[44px]">{value}</p>
      <p className="mt-2 text-[14px] text-muted-foreground">{label}</p>
    </article>
  );
}
