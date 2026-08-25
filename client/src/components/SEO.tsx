import { useEffect } from "react";

export interface SEOProps {
  title: string;
  description: string;
  slug?: string;
  image?: string;
  type?: string;
  imageAlt?: string;
}

export default function SEO({
  title,
  description,
  slug = "",
  image = "https://res.cloudinary.com/dqsyzpxkg/image/upload/v1783590626/1000497503_dep9re.jpg",
  type = "website",
  imageAlt
}: SEOProps) {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // 2. Standard Meta Tags
    setMetaTag("name", "description", description);

    // 3. Open Graph Tags
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", type);
    if (image) {
      setMetaTag("property", "og:image", image);
      if (imageAlt) {
        setMetaTag("property", "og:image:alt", imageAlt);
      }
    }
    const currentUrl = typeof window !== "undefined" ? (slug ? `${window.location.origin}${slug}` : window.location.href) : "";
    if (currentUrl) {
      setMetaTag("property", "og:url", currentUrl);
    }

    // 4. Twitter Card Tags
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    if (image) {
      setMetaTag("name", "twitter:image", image);
    }

    // 5. Canonical Link Tag
    if (currentUrl) {
      let canonicalLink = document.querySelector("link[rel='canonical']");
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute("href", currentUrl);
    }
  }, [title, description, slug, image, type, imageAlt]);

  return null;
}
