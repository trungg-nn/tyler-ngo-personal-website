import Layout from "@/components/Layout";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <section className="border-b border-border/50 bg-background py-16 md:py-20">
        <div className="mx-auto w-full max-w-4xl px-6 md:px-8">
          <h1 className="text-4xl font-semibold md:text-5xl">Privacy Policy</h1>
          <p className="mt-6 text-sm leading-7 text-muted-foreground">Last updated: 14 February 2026</p>

          <div className="mt-8 space-y-6 text-sm leading-7 text-muted-foreground">
            <p>
              We collect contact details you submit via forms (name, email, message) to respond to enquiries and provide requested services.
            </p>
            <p>
              We use analytics tools (e.g., Google Analytics) to understand site performance and improve user experience. Data is processed in aggregated form where possible.
            </p>
            <p>
              We do not sell personal data. Information may be processed by trusted service providers used for hosting, analytics, and form delivery.
            </p>
            <p>
              To request data access, correction, or deletion, contact: <a className="text-foreground underline" href="mailto:hello@tylerngo.co.uk">hello@tylerngo.co.uk</a>.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
