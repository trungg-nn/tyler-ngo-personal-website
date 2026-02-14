import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import Layout, { useLanguage } from "@/components/Layout";
import { CONTACT_FORM_ENDPOINT, hasContactEndpoint } from "@/lib/formEndpoints";
import { trackEvent } from "@/lib/analytics";

type SubmitState = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const { lang } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [step, setStep] = useState<1 | 2>(1);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

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
      continue: "Continue",
      send: "Send Message",
      sending: "Sending...",
      success: "Thanks — your message has been sent.",
      error: "Could not send right now. Please email me directly.",
      missingEndpoint: "Form endpoint not configured yet. Please use direct email for now.",
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
      continue: "Tiếp tục",
      send: "Gửi tin nhắn",
      sending: "Đang gửi...",
      success: "Đã gửi thành công. Cảm ơn bạn!",
      error: "Gửi thất bại. Vui lòng email trực tiếp giúp mình.",
      missingEndpoint: "Form chưa cấu hình nơi nhận. Tạm thời vui lòng email trực tiếp.",
    },
  }[lang];

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!hasContactEndpoint || !CONTACT_FORM_ENDPOINT) {
      setSubmitState("error");
      trackEvent("contact_submit_error", {reason: "missing_endpoint"});
      return;
    }

    if (website.trim()) {
      setSubmitState("success");
      return;
    }

    try {
      setSubmitState("loading");
      trackEvent("contact_submit_attempt", {step});
      const res = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Website Contact Form: ${name}`,
          _template: "table",
          _captcha: "false",
          _honey: website,
          source: "tylerngo.co.uk/contact",
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Submit failed");

      setSubmitState("success");
      trackEvent("contact_submit_success", {source: "contact_page"});
      setName("");
      setEmail("");
      setMessage("");
      setStep(1);
    } catch {
      setSubmitState("error");
      trackEvent("contact_submit_error", {reason: "request_failed"});
    }
  };

  return (
    <Layout>
      <section className="border-b border-border/50 bg-background py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
          <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-primary">{t.label}</p>
          <h1 className="text-5xl font-semibold md:text-[52px]">{t.title}</h1>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">{t.subtitle}</p>

          <div className="mt-10 grid gap-6 md:grid-cols-[0.9fr_1.4fr]">
            <div className="space-y-4">
              <article className="interactive-card rounded-2xl border border-border bg-card/55 p-5">
                <h2 className="text-xl font-semibold">{t.direct}</h2>
                <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 leading-none"><Mail size={14} className="shrink-0" /><span>hello@tylerngo.co.uk</span></div>
                  <div className="flex items-center gap-2 leading-none"><Phone size={14} className="shrink-0" /><span>+44 7763 464 335</span></div>
                  <div className="flex items-center gap-2 leading-none"><MapPin size={14} className="shrink-0" /><span>London, United Kingdom</span></div>
                </div>
              </article>

              <article className="interactive-card rounded-2xl border border-border bg-card/55 p-5">
                <h2 className="text-xl font-semibold">{t.response}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{t.responseText}</p>
              </article>
            </div>

            <form onSubmit={onSubmit} className="interactive-card rounded-2xl border border-border bg-card/55 p-5">
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-foreground">{t.name}</label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none"
                    placeholder={t.yourName}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-foreground">{t.email}</label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none"
                    placeholder={t.yourEmail}
                  />
                </div>
                {step === 2 && (
                  <div>
                    <label className="mb-2 block text-sm text-foreground">{t.message}</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-[120px] w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none"
                      placeholder={t.yourMessage}
                    />
                  </div>
                )}

                <input
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="hidden"
                  aria-hidden="true"
                  name="website"
                />

                {!hasContactEndpoint && <p className="text-xs text-amber-500">{t.missingEndpoint}</p>}
                {submitState === "success" && <p className="text-xs text-emerald-500">{t.success}</p>}
                {submitState === "error" && <p className="text-xs text-red-500">{t.error}</p>}

                {step === 1 ? (
                  <button
                    type="button"
                    disabled={!name.trim() || !email.trim()}
                    onClick={() => {
                      setStep(2);
                      trackEvent("contact_step_continue", {source: "contact_page"});
                    }}
                    className="cta-btn inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {t.continue} <Send size={14} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submitState === "loading"}
                    className="cta-btn inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitState === "loading" ? t.sending : t.send} <Send size={14} />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
