import Layout from "@/components/Layout";

export default function TermsAndConditions() {
  return (
    <Layout>
      <section className="border-b border-border/50 bg-background py-16 md:py-20">
        <div className="mx-auto w-full max-w-4xl px-6 md:px-8">
          <h1 className="text-4xl font-semibold md:text-5xl">Terms & Conditions</h1>
          <p className="mt-6 text-sm leading-7 text-muted-foreground">Last updated: 14 February 2026</p>

          <div className="mt-8 space-y-6 text-sm leading-7 text-muted-foreground">
            <p>
              The content on this website is provided for general information purposes and does not constitute legal, financial, or investment advice.
            </p>
            <p>
              You are responsible for evaluating information before acting on it. Where relevant, seek independent professional advice.
            </p>
            <p>
              This site may include external links and partner links. We are not responsible for third-party content, products, or services.
            </p>
            <p>
              By using this website, you agree to these terms. For questions, contact <a className="text-foreground underline" href="mailto:hello@tylerngo.co.uk">hello@tylerngo.co.uk</a>.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
