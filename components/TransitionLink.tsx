"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentProps } from "react";
import { EXIT_MS, variantFor } from "@/lib/transitions";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

/** Set when a page change starts from one of these links, so the next page can move focus to its content. */
export const navState = { fromLink: false };

/** An internal link that plays the exit motion of the target page's transition before navigating. */
export function TransitionLink({ href, onClick, children, ...rest }: Props) {
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
        navState.fromLink = true;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        e.preventDefault();
        const variant = variantFor(href);
        // The circular reveal on the next page grows from the point that was clicked.
        const root = document.documentElement.style;
        root.setProperty("--tx", `${Math.round((e.clientX / window.innerWidth) * 100)}%`);
        root.setProperty("--ty", `${Math.round((e.clientY / window.innerHeight) * 100)}%`);
        document.body.dataset.leave = variant;
        window.setTimeout(() => {
          router.push(href);
          window.scrollTo({ top: 0 });
        }, EXIT_MS);
      }}
    >
      {children}
    </Link>
  );
}
