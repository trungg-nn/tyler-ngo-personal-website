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
              This policy explains how Tyler Ngo ("we", "us") collects and uses personal data when you use this website.
            </p>
            <p>
              <strong className="text-foreground">Data we collect:</strong> details you submit through forms (such as name, email, message), plus technical/usage data (for example IP address, browser type, and page interactions) via analytics tools.
            </p>
            <p>
              <strong className="text-foreground">Why we process data:</strong> to respond to enquiries, provide requested services, improve site performance, prevent abuse/spam, and maintain website security.
            </p>
            <p>
              <strong className="text-foreground">Legal bases (UK GDPR):</strong> legitimate interests (site operations, analytics, security), pre-contract/contract steps (responding to service requests), and consent where required.
            </p>
            <p>
              <strong className="text-foreground">Sharing:</strong> we may use trusted processors for hosting, analytics, and form handling. We do not sell your personal data.
            </p>
            <p>
              <strong className="text-foreground">Retention:</strong> personal data is kept only as long as reasonably necessary for the purposes above, legal obligations, or dispute handling.
            </p>
            <p>
              <strong className="text-foreground">Your rights:</strong> depending on applicable law, you may request access, correction, deletion, restriction, objection, or data portability.
            </p>
            <p>
              To exercise data rights, contact <a className="text-foreground underline" href="mailto:hello@tylerngo.co.uk">hello@tylerngo.co.uk</a>.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
