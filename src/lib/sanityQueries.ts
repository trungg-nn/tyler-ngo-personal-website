import { hasSanityConfig, sanity } from "./sanity";

export type SanityPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  metaDescription?: string;
  publishedAt?: string;
  imageUrl?: string;
  authorName?: string;
  categories?: string[];
  body?: unknown[];
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
        publishedAt,
        "imageUrl": image.asset->url,
        "authorName": author->name,
        "categories": categories[]->title
      }`
    );

    return posts ?? [];
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  if (!hasSanityConfig) return null;

  try {
    const post = await sanity.fetch<SanityPost | null>(
      `*[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        metaDescription,
        publishedAt,
        "imageUrl": image.asset->url,
        "authorName": author->name,
        "categories": categories[]->title,
        body
      }`,
      { slug }
    );

    return post;
  } catch {
    return null;
  }
}
