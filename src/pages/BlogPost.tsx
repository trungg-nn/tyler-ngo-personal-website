import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Layout from "@/components/Layout";
import { getPostBySlug, type SanityPost } from "@/lib/sanityQueries";

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-5 text-[17px] leading-8 text-foreground/90">{children}</p>,
    h2: ({ children }) => <h2 className="mt-10 mb-4 text-3xl font-semibold leading-tight text-foreground">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 mb-3 text-2xl font-semibold leading-tight text-foreground">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-primary/60 pl-4 italic text-foreground/80">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mb-6 ml-6 list-disc space-y-2 text-[17px] leading-8">{children}</ul>,
    number: ({ children }) => <ol className="mb-6 ml-6 list-decimal space-y-2 text-[17px] leading-8">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-2">
        {children}
      </a>
    ),
  },
};

export default function BlogPost() {
  const { slug = "" } = useParams();
  const [post, setPost] = useState<SanityPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getPostBySlug(slug).then((data) => {
      if (mounted) {
        setPost(data);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [slug]);

  const metaDescription = useMemo(
    () => post?.metaDescription || post?.excerpt || "Insights from Tyler Ngo.",
    [post]
  );

  useEffect(() => {
    if (!post) return;

    document.title = `${post.title} | Tyler Ngo`;

    const metaTag = document.querySelector('meta[name="description"]');
    if (metaTag) {
      metaTag.setAttribute("content", metaDescription);
    }
  }, [post, metaDescription]);

  if (loading) {
    return (
      <Layout>
        <section className="border-b border-border/50 bg-background py-16 md:py-20">
          <div className="mx-auto w-full max-w-4xl px-6 md:px-8 text-sm text-muted-foreground">Loading article...</div>
        </section>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <section className="border-b border-border/50 bg-background py-16 md:py-20">
          <div className="mx-auto w-full max-w-4xl px-6 md:px-8">
            <p className="text-sm text-muted-foreground">Article not found.</p>
            <Link to="/blog" className="mt-4 inline-block text-sm text-primary hover:underline">
              ← Back to blog
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="border-b border-border/50 bg-background py-16 md:py-20">
        <div className="mx-auto w-full max-w-3xl px-6 md:px-8">
          <Link to="/blog" className="text-xs uppercase tracking-[0.2em] text-primary hover:underline">
            Blog
          </Link>

          <h1 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">{post.title}</h1>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            {post.publishedAt && (
              <span>
                {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            )}
            {post.authorName && <span>• By {post.authorName}</span>}
            {post.categories?.length ? <span>• {post.categories.join(", ")}</span> : null}
          </div>

          {post.excerpt && <p className="mt-6 text-xl leading-relaxed text-foreground/80">{post.excerpt}</p>}

          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="mt-8 w-full rounded-2xl border border-border/60 object-cover"
            />
          )}

          <article className="mt-10">
            {Array.isArray(post.body) && post.body.length > 0 ? (
              <PortableText value={post.body} components={portableTextComponents} />
            ) : (
              <p className="text-[17px] leading-8 text-foreground/90">{post.excerpt || metaDescription}</p>
            )}
          </article>
        </div>
      </section>
    </Layout>
  );
}
