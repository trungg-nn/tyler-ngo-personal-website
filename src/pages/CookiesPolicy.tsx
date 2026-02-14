import Layout from "@/components/Layout";

export default function CookiesPolicy() {
  return (
    <Layout>
      <section className="border-b border-border/50 bg-background py-16 md:py-20">
        <div className="mx-auto w-full max-w-4xl px-6 md:px-8">
          <h1 className="text-4xl font-semibold md:text-5xl">Cookies Policy</h1>
          <p className="mt-6 text-sm leading-7 text-muted-foreground">Last updated: 14 February 2026</p>

          <div className="mt-8 space-y-6 text-sm leading-7 text-muted-foreground">
            <p>
              This website uses cookies and similar technologies to ensure core functionality, measure performance, and improve user experience.
            </p>
            <p>
              <strong className="text-foreground">Essential cookies:</strong> required for basic site operation and security.
            </p>
            <p>
              <strong className="text-foreground">Analytics cookies:</strong> help us understand traffic, page performance, and engagement trends (for example via Google Analytics).
            </p>
            <p>
              You can manage or disable cookies in your browser settings. Blocking some cookies may affect site functionality.
            </p>
            <p>
              Where required by law, non-essential cookies are used based on consent.
            </p>
            <p>
              For privacy-related questions, contact <a className="text-foreground underline" href="mailto:hello@tylerngo.co.uk">hello@tylerngo.co.uk</a>.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
