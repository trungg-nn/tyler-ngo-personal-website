import { hasSanityConfig, sanity } from "./sanity";

export type SanityPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  focusKeyword?: string;
  publishedAt?: string;
  imageUrl?: string;
  imageAlt?: string;
  authorName?: string;
  categories?: string[];
  body?: unknown[];
};

export type SanityHomeSettings = {
  heroSlides?: { imageUrl?: string; alt?: string }[];
  insightsTitle?: string;
  insightsSubtitle?: string;
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
        ogTitle,
        ogDescription,
        canonicalUrl,
        noIndex,
        focusKeyword,
        publishedAt,
        "imageUrl": image.asset->url,
        "imageAlt": image.alt,
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
        ogTitle,
        ogDescription,
        canonicalUrl,
        noIndex,
        focusKeyword,
        publishedAt,
        "imageUrl": image.asset->url,
        "imageAlt": image.alt,
        "authorName": author->name,
        "categories": categories[]->title,
        body[]{
          ...,
          _type == "image" => {
            ...,
            "asset": asset->{url}
          }
        }
      }`,
      { slug }
    );

    return post;
  } catch {
    return null;
  }
}

export async function getHomeSettings(): Promise<SanityHomeSettings | null> {
  if (!hasSanityConfig) return null;

  try {
    const settings = await sanity.fetch<SanityHomeSettings | null>(
      `*[_type == "homeSettings"][0]{
        insightsTitle,
        insightsSubtitle,
        heroSlides[]{
          "imageUrl": image.asset->url,
          alt
        }
      }`
    );

    return settings;
  } catch {
    return null;
  }
}
