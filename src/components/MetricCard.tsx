export default function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <article className="flex min-h-[132px] flex-col items-center justify-center rounded-2xl border border-border bg-muted/30 px-6 py-5 text-center shadow-[0_6px_14px_rgba(45,40,30,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 dark:bg-card/62 dark:shadow-[0_8px_30px_rgba(0,0,0,0.18)] md:min-h-[142px]">
      <p className="text-4xl font-semibold leading-none md:text-[44px]"><span className="text-gradient-gold">{value}</span></p>
      <p className="mt-2 text-[14px] text-muted-foreground">{label}</p>
    </article>
  );
}
