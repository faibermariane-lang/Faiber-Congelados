import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArtboardClient } from "./ArtboardClient";

export const metadata: Metadata = { title: "Artboard · Faiber", robots: { index: false, follow: false } };

/** Prancheta de desenvolvimento. Nunca vai ao ar. */
export default function ArtboardPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <ArtboardClient />;
}
