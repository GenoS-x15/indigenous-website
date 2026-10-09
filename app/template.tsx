"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { navState } from "@/components/TransitionLink";
import { variantFor } from "@/lib/transitions";

// A template re-mounts on every navigation (links, back and forward), which replays the enter motion of the new page.
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    delete document.body.dataset.leave;
    // After a link click, move keyboard and screen reader focus to the new page's content.
    if (navState.fromLink) {
      navState.fromLink = false;
      document.getElementById("content")?.focus({ preventScroll: true });
    }
  }, [pathname]);

  return (
    <div className="page" data-enter={variantFor(pathname)}>
      {children}
    </div>
  );
}
