import {useEffect, useMemo, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import {PortableText, type PortableTextComponents} from '@portabletext/react'
import Layout from '@/components/Layout'
import {getPostBySlug, getPosts, type SanityPost} from '@/lib/sanityQueries'

type TocItem = {
  id: string
  text: string
  level: 'h2' | 'h3'
}

const getBlockText = (value: any) =>
  (value?.children || [])
    .map((child: any) => child?.text || '')
    .join('')
    .trim()

export default function BlogPost() {
  const {slug = ''} = useParams()
  const [post, setPost] = useState<SanityPost | null>(null)
  const [allPosts, setAllPosts] = useState<SanityPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    setLoading(true)

    Promise.all([getPostBySlug(slug), getPosts()]).then(([postData, posts]) => {
      if (!mounted) return
      setPost(postData)
      setAllPosts(posts)
      setLoading(false)
    })

    return () => {
      mounted = false
    }
  }, [slug])

  const metaDescription = useMemo(() => post?.metaDescription || post?.excerpt || 'Insights from Tyler Ngo.', [post])

  const toc = useMemo<TocItem[]>(() => {
    if (!Array.isArray(post?.body)) return []

    return post.body
      .filter((block: any) => block?._type === 'block' && (block?.style === 'h2' || block?.style === 'h3'))
      .map((block: any) => ({
        id: block?._key,
        text: getBlockText(block),
        level: block?.style,
      }))
      .filter((item) => item.text)
  }, [post])

  const takeaways = useMemo(() => {
    if (!Array.isArray(post?.body)) return []

    return post.body
      .filter((block: any) => block?._type === 'block' && block?.listItem === 'bullet')
      .map((block: any) => getBlockText(block))
      .filter(Boolean)
      .slice(0, 5)
  }, [post])

  const relatedPosts = useMemo(() => {
    if (!post) return []
    const categorySet = new Set(post.categories || [])

    const scored = allPosts
      .filter((item) => item.slug && item.slug !== post.slug)
      .map((item) => {
        const overlap = (item.categories || []).filter((category) => categorySet.has(category)).length
        return {item, score: overlap}
      })
      .sort((a, b) => b.score - a.score)

    return scored.slice(0, 3).map((entry) => entry.item)
  }, [allPosts, post])

  useEffect(() => {
    if (!post) return

    document.title = `${post.title} | Tyler Ngo`

    const metaTag = document.querySelector('meta[name="description"]')
    if (metaTag) metaTag.setAttribute('content', metaDescription)
  }, [post, metaDescription])

  const portableTextComponents: PortableTextComponents = {
    block: {
      normal: ({children}) => <p className="mb-5 text-[17px] leading-8 text-foreground/90">{children}</p>,
      h2: ({children, value}: any) => (
        <h2 id={value?._key} className="mt-12 mb-4 scroll-mt-28 text-3xl font-semibold leading-tight text-foreground">
          {children}
        </h2>
      ),
      h3: ({children, value}: any) => (
        <h3 id={value?._key} className="mt-8 mb-3 scroll-mt-28 text-2xl font-semibold leading-tight text-foreground">
          {children}
        </h3>
      ),
      blockquote: ({children}) => (
        <blockquote className="my-6 border-l-2 border-primary/60 pl-4 italic text-foreground/80">{children}</blockquote>
      ),
    },
    list: {
      bullet: ({children}) => <ul className="mb-6 ml-6 list-disc space-y-2 text-[17px] leading-8">{children}</ul>,
      number: ({children}) => <ol className="mb-6 ml-6 list-decimal space-y-2 text-[17px] leading-8">{children}</ol>,
    },
    marks: {
      link: ({children, value}) => (
        <a href={value?.href} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-2">
          {children}
        </a>
      ),
    },
    types: {
      image: ({value}: any) => (
        <figure className="my-8">
          <img
            src={value?.asset?.url}
            alt={value?.alt || 'Blog image'}
            className="w-full rounded-2xl border border-border/60 object-cover"
            loading="lazy"
          />
          {value?.caption && <figcaption className="mt-2 text-sm text-muted-foreground">{value.caption}</figcaption>}
        </figure>
      ),
    },
  }

  if (loading) {
    return (
      <Layout>
        <section className="border-b border-border/50 bg-background py-16 md:py-20">
          <div className="mx-auto w-full max-w-6xl px-6 md:px-8 text-sm text-muted-foreground">Loading article...</div>
        </section>
      </Layout>
    )
  }

  if (!post) {
    return (
      <Layout>
        <section className="border-b border-border/50 bg-background py-16 md:py-20">
          <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
            <p className="text-sm text-muted-foreground">Article not found.</p>
            <Link to="/blog" className="mt-4 inline-block text-sm text-primary hover:underline">
              ← Back to blog
            </Link>
          </div>
        </section>
      </Layout>
    )
  }

  return (
    <Layout>
      <section className="border-b border-border/50 bg-background py-14 md:py-20">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-28 rounded-xl border border-border/60 bg-card/35 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-primary">On this page</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {toc.length === 0 ? (
                    <li className="text-muted-foreground">No section headings yet.</li>
                  ) : (
                    toc.map((item) => (
                      <li key={item.id} className={item.level === 'h3' ? 'ml-3' : ''}>
                        <a className="smooth-link text-muted-foreground hover:text-foreground" href={`#${item.id}`}>
                          {item.text}
                        </a>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </aside>

            <main className="lg:col-span-9">
              <Link to="/blog" className="text-xs uppercase tracking-[0.2em] text-primary hover:underline">
                Blog
              </Link>

              <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight md:text-5xl">{post.title}</h1>

              <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                {post.publishedAt && (
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                )}
                {post.authorName && <span>• By {post.authorName}</span>}
                {post.categories?.length ? <span>• {post.categories.join(', ')}</span> : null}
                <span>• 5 min read</span>
              </div>

              <details className="mt-6 rounded-xl border border-border/60 bg-card/30 p-4 lg:hidden">
                <summary className="cursor-pointer text-sm font-medium text-foreground">On this page</summary>
                <ul className="mt-3 space-y-2 text-sm">
                  {toc.length === 0 ? (
                    <li className="text-muted-foreground">No section headings yet.</li>
                  ) : (
                    toc.map((item) => (
                      <li key={item.id} className={item.level === 'h3' ? 'ml-3' : ''}>
                        <a className="smooth-link text-muted-foreground hover:text-foreground" href={`#${item.id}`}>
                          {item.text}
                        </a>
                      </li>
                    ))
                  )}
                </ul>
              </details>

              {post.excerpt && <p className="mt-6 max-w-3xl text-xl leading-relaxed text-foreground/80">{post.excerpt}</p>}

              {takeaways.length > 0 && (
                <div className="mt-8 max-w-3xl rounded-xl border border-border/60 bg-card/35 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Key takeaways</p>
                  <ul className="mt-3 ml-5 list-disc space-y-2 text-sm text-foreground/90">
                    {takeaways.map((item, idx) => (
                      <li key={`${item}-${idx}`}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="mt-8 w-full max-w-4xl rounded-2xl border border-border/60 object-cover"
                />
              )}

              <article className="mt-10 max-w-3xl">
                {Array.isArray(post.body) && post.body.length > 0 ? (
                  <PortableText value={post.body} components={portableTextComponents} />
                ) : (
                  <p className="text-[17px] leading-8 text-foreground/90">{post.excerpt || metaDescription}</p>
                )}
              </article>

              {relatedPosts.length > 0 && (
                <section className="mt-14 max-w-4xl border-t border-border/60 pt-8">
                  <h3 className="text-2xl font-semibold">Related posts</h3>
                  <div className="mt-5 grid gap-4 md:grid-cols-3">
                    {relatedPosts.map((item) => (
                      <Link
                        key={item._id}
                        to={`/blog/${item.slug}`}
                        className="interactive-card rounded-xl border border-border/60 bg-card/35 p-4"
                      >
                        <p className="text-xs text-muted-foreground">
                          {item.publishedAt
                            ? new Date(item.publishedAt).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })
                            : 'Article'}
                        </p>
                        <h4 className="mt-2 text-base font-semibold leading-snug">{item.title}</h4>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {item.excerpt || item.metaDescription || 'Read more'}
                        </p>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </main>
          </div>
        </div>
      </section>
    </Layout>
  )
}
