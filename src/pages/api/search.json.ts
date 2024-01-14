import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export const GET: APIRoute = async ({ url }): Promise<Response> => {
  const query = url.searchParams.get("query");
  if (query === null) {
    return new Response(
      JSON.stringify({
        error: "Query param is missing",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const allBlogArticles: CollectionEntry<"blog">[] = await getCollection(
    "blog"
  );

  const searchResults =
    query && query.trim()
      ? allBlogArticles.filter((article) => {
          const titleMatch = article.data.title
            .toLowerCase()
            .includes(query.trim().toLowerCase());

          const bodyMatch = article.body
            .toLowerCase()
            .includes(query.trim().toLowerCase());

          const slugMatch = article.slug
            .toLowerCase()
            .includes(query.trim().toLowerCase());

          const tagMatch = article.data.tags.includes(
            query.trim().toLowerCase()
          );

          return titleMatch || bodyMatch || slugMatch || tagMatch;
        })
      : allBlogArticles;

  return new Response(
    JSON.stringify({
      searchResults,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
