/// <reference types="@cloudflare/workers-types" />

const BOT_PATTERNS = /bot|crawler|spider|crawling|headless|curl|wget|python|go-http/i;

interface Env {
  PAGE_VIEWS: KVNamespace;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const ua = request.headers.get("user-agent") ?? "";
  const referer = request.headers.get("referer") ?? "";

  if (BOT_PATTERNS.test(ua) || !referer) {
    return new Response(null, { status: 204 });
  }

  const body = await request.json() as { slug?: string };
  if (!body.slug) return new Response(null, { status: 400 });

  const key = `views:${body.slug}`;
  const current = parseInt((await env.PAGE_VIEWS.get(key)) ?? "0");
  await env.PAGE_VIEWS.put(key, String(current + 1));

  return new Response(null, { status: 204 });
};
