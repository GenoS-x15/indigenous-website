"use client";

import { useEffect } from "react";

// A template re-mounts on every navigation, which replays the zoom-in animation.
export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.body.classList.remove("zoom-out");
  }, []);
  return <div className="page-zoom">{children}</div>;
}
