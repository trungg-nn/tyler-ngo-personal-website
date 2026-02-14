import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const items = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Cookies Policy", to: "/cookies-policy" },
  { label: "Terms & Conditions", to: "/terms-and-conditions" },
];

export default function Legal() {
  return (
    <Layout>
      <section className="border-b border-border/50 bg-background py-16 md:py-20">
        <div className="mx-auto w-full max-w-5xl px-6 md:px-8">
          <h1 className="text-5xl font-semibold md:text-[52px]">Legal</h1>

          <div className="mt-8 border-t border-border/80">
            {items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="block border-b border-border/80 py-6 text-3xl font-medium text-muted-foreground transition-colors hover:text-foreground md:text-5xl"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
