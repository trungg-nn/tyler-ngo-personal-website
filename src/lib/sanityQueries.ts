import { hasSanityConfig, sanity } from "./sanity";

export type SanityPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  metaDescription?: string;
  publishedAt?: string;
};

export async function getPosts(): Promise<SanityPost[]> {
  if (!hasSanityConfig) return [];

  try {
    const posts = await sanity.fetch<SanityPost[]>(
      `*[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        metaDescription,
        publishedAt
      }`
    );

    return posts ?? [];
  } catch {
    return [];
  }
}
