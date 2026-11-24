import type { APIRoute } from "astro";

const getRobotsTxt = (sitemapURL: string) => `
User-agent: *
Allow: /

Sitemap: ${sitemapURL}
`;

export const GET: APIRoute = () => {
  const sitemapURL = "https://dion-verse.github.io/astro-paper/sitemap-index.xml";
  return new Response(getRobotsTxt(sitemapURL));
};
