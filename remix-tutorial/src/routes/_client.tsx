"use client";

import { useRouter } from "@hiogawa/react-server/client";

export function GlobalPendingOverlay() {
  const isPending = useRouter((s) => s.isPending || s.isActionPending);
  return (
    <div
      style={{
        pointerEvents: "none",
        opacity: isPending ? 0.5 : 0,
        transition: "opacity 200ms",
        transitionDelay: "200ms",
        background: "#fff",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    />
  );
}
