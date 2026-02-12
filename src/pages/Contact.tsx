import { Mail, MapPin, Phone, Send } from "lucide-react";
import Layout from "@/components/Layout";

export default function Contact() {
  return (
    <Layout>
      <section className="border-b border-border/50 bg-background py-16 md:py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-primary">Contact</p>
          <h1 className="text-5xl font-semibold md:text-[52px]">Let’s connect</h1>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">
            Interested in working together or just want to chat about performance marketing? Reach out.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-[0.9fr_1.4fr]">
            <div className="space-y-4">
              <article className="rounded-2xl border border-border bg-card/55 p-5">
                <h2 className="text-xl font-semibold">Direct contact</h2>
                <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 leading-none">
                    <Mail size={14} className="shrink-0" />
                    <span>trungngo.2810@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2 leading-none">
                    <Phone size={14} className="shrink-0" />
                    <span>+44 7763 464 335</span>
                  </div>
                  <div className="flex items-center gap-2 leading-none">
                    <MapPin size={14} className="shrink-0" />
                    <span>London, United Kingdom</span>
                  </div>
                </div>
              </article>

              <article className="rounded-2xl border border-border bg-card/55 p-5">
                <h2 className="text-xl font-semibold">Response time</h2>
                <p className="mt-2 text-sm text-muted-foreground">I typically respond within 24 hours on business days.</p>
              </article>
            </div>

            <form className="rounded-2xl border border-border bg-card/55 p-5">
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-foreground">Name</label>
                  <input className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none" placeholder="Your name" />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-foreground">Email</label>
                  <input className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-foreground">Message</label>
                  <textarea className="min-h-[120px] w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none" placeholder="Tell me about your project..." />
                </div>
                <button type="button" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground">
                  Send Message <Send size={14} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
