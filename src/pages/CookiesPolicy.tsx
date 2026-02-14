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
              This website uses essential cookies and analytics cookies to operate reliably and measure performance.
            </p>
            <p>
              Analytics cookies help us understand which pages perform best and where users drop off, so we can improve the website.
            </p>
            <p>
              You can control cookies via your browser settings, including blocking or deleting existing cookies.
            </p>
            <p>
              Continued use of this site indicates consent to the use of cookies as described here.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
