"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentProps } from "react";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

/** A link that zooms the current page out before the next page zooms in. */
export function ZoomLink({ href, onClick, children, ...rest }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Link
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        const target = href.split("#")[0].replace(/\/+$/, "") || "/";
        const here = pathname.replace(/\/+$/, "") || "/";
        if (href.startsWith("#") || target === here) return; // same page: let the browser scroll
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        e.preventDefault();
        document.body.classList.add("zoom-out");
        window.setTimeout(() => {
          router.push(href);
          window.scrollTo({ top: 0 });
        }, 220);
      }}
    >
      {children}
    </Link>
  );
}
