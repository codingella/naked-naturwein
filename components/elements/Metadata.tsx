import { Metadata } from "next";
import { urlFor } from "../../helpers/image-tools";

type SeoValues = {
  title: string;
  description: string;
  index: boolean;
  follow: boolean;
  preview: null | { asset: any }; // Adjust `any` to the actual asset type if needed
};


function getSeoValues(
  seo: Partial<SeoValues> | undefined,
  fallback: SeoValues
): SeoValues {
  return {
    title: seo?.title ?? fallback.title,
    description: seo?.description ?? fallback.description,
    index: seo?.index ?? fallback.index,
    follow: seo?.follow ?? fallback.follow,
    preview: seo?.preview ?? fallback.preview,
  };
}

export function getMetadata(seo: Partial<SeoValues>): Metadata {
  const fallbackValues: SeoValues = {
    title: "Naked Naturweinmesse",
    description: "",
    index: true,
    follow: true,
    preview: null,
  };
  
  const { title, description, index, follow, preview } = getSeoValues(seo, fallbackValues);

 
  return {
    title,
    description,
    robots: `${follow ? "follow" : "nofollow"}, ${index ? "index" : "noindex"}`,
    openGraph: preview ? { images: [{ url: urlFor(preview?.asset).url() }] } : undefined,
  };
}
