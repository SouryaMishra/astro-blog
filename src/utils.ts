import type { CollectionEntry } from "astro:content";

export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Date(date).toLocaleDateString(undefined, options);
}

export function capitalize(str: string): string {
  if (typeof str !== "string" || str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function sort(
  collection: CollectionEntry<"blog">[]
): CollectionEntry<"blog">[] {
  return [...collection].sort(
    (first: CollectionEntry<"blog">, second: CollectionEntry<"blog">) =>
      second.data.pubDate.valueOf() - first.data.pubDate.valueOf()
  );
}
