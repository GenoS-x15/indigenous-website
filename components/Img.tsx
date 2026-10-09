import NextImage, { type ImageProps } from "next/image";
import { asset } from "@/lib/site";

/**
 * next/image with the site's base path added to plain "/images/..." paths.
 * Next.js adds the base path to links but not to image paths, which matters when the site lives in a
 * sub-folder (GitHub Pages: /indigenous-website/). With no base path this is exactly next/image.
 */
export default function Image({ src, alt, ...rest }: ImageProps) {
  return <NextImage src={typeof src === "string" ? asset(src) : src} alt={alt} {...rest} />;
}
