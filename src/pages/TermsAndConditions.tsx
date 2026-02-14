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
              By accessing this website, you agree to these Terms & Conditions.
            </p>
            <p>
              Content is provided for general information only and does not constitute legal, tax, investment, or financial advice. You should seek independent professional advice before making decisions.
            </p>
            <p>
              We make reasonable efforts to keep information accurate and up to date, but do not guarantee completeness, reliability, or suitability for any specific purpose.
            </p>
            <p>
              This website may include third-party links and partner links. We are not responsible for third-party content, availability, products, or services.
            </p>
            <p>
              All intellectual property on this website, unless stated otherwise, belongs to Tyler Ngo. You may not reproduce or republish material without permission.
            </p>
            <p>
              We may update these terms from time to time by posting a revised version on this page.
            </p>
            <p>
              For enquiries, contact <a className="text-foreground underline" href="mailto:hello@tylerngo.co.uk">hello@tylerngo.co.uk</a>.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
