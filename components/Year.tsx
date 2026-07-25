"use client";

import { useSyncExternalStore } from "react";

// In a prerendered server component new Date() runs at BUILD time, so the footer
// year would go stale after New Year until the next deploy. This resolves it in
// the visitor's browser; the server snapshot is what makes hydration clean.
const subscribe = () => () => {};
const getYear = () => new Date().getFullYear();

export default function Year() {
  const year = useSyncExternalStore(subscribe, getYear, getYear);
  return <>{year}</>;
}
