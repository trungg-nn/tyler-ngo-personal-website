import { Mail, MapPin, Phone, Send } from "lucide-react";
import Layout, { useLanguage } from "@/components/Layout";

export default function Contact() {
  const { lang } = useLanguage();

  const t = {
    en: {
      label: "Contact",
      title: "Let’s connect",
      subtitle: "Interested in working together or just want to chat about performance marketing? Reach out.",
      direct: "Direct contact",
      response: "Response time",
      responseText: "I typically respond within 24 hours on business days.",
      name: "Name",
      email: "Email",
      message: "Message",
      yourName: "Your name",
      yourEmail: "your@email.com",
      yourMessage: "Tell me about your project...",
      send: "Send Message",
    },
    vi: {
      label: "Liên hệ",
      title: "Hãy kết nối",
      subtitle: "Nếu bạn muốn hợp tác hoặc trao đổi về performance marketing, hãy liên hệ với mình.",
      direct: "Thông tin liên hệ",
      response: "Thời gian phản hồi",
      responseText: "Mình thường phản hồi trong vòng 24 giờ vào ngày làm việc.",
      name: "Tên",
      email: "Email",
      message: "Nội dung",
      yourName: "Tên của bạn",
      yourEmail: "email@cuaban.com",
      yourMessage: "Hãy chia sẻ về dự án của bạn...",
      send: "Gửi tin nhắn",
    },
  }[lang];

  return (
    <Layout>
      <section className="border-b border-border/50 bg-background py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
          <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-primary">{t.label}</p>
          <h1 className="text-5xl font-semibold md:text-[52px]">{t.title}</h1>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">{t.subtitle}</p>

          <div className="mt-10 grid gap-6 md:grid-cols-[0.9fr_1.4fr]">
            <div className="space-y-4">
              <article className="rounded-2xl border border-border bg-card/55 p-5">
                <h2 className="text-xl font-semibold">{t.direct}</h2>
                <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 leading-none"><Mail size={14} className="shrink-0" /><span>trungngo.2810@gmail.com</span></div>
                  <div className="flex items-center gap-2 leading-none"><Phone size={14} className="shrink-0" /><span>+44 7763 464 335</span></div>
                  <div className="flex items-center gap-2 leading-none"><MapPin size={14} className="shrink-0" /><span>London, United Kingdom</span></div>
                </div>
              </article>

              <article className="rounded-2xl border border-border bg-card/55 p-5">
                <h2 className="text-xl font-semibold">{t.response}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{t.responseText}</p>
              </article>
            </div>

            <form className="rounded-2xl border border-border bg-card/55 p-5">
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-foreground">{t.name}</label>
                  <input className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none" placeholder={t.yourName} />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-foreground">{t.email}</label>
                  <input className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none" placeholder={t.yourEmail} />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-foreground">{t.message}</label>
                  <textarea className="min-h-[120px] w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none" placeholder={t.yourMessage} />
                </div>
                <button type="button" className="cta-btn inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-sm font-medium">
                  {t.send} <Send size={14} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
