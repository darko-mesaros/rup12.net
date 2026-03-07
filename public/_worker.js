const BOT_PATTERNS = /bot|crawler|spider|crawling|headless|curl|wget|python|go-http/i;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/track" && request.method === "POST") {
      const ua = request.headers.get("user-agent") ?? "";
      const referer = request.headers.get("referer") ?? "";

      if (BOT_PATTERNS.test(ua) || !referer) {
        return new Response(null, { status: 204 });
      }

      const body = await request.json();
      if (!body.slug) return new Response(null, { status: 400 });

      const key = `views:${body.slug}`;
      const current = parseInt((await env.PAGE_VIEWS.get(key)) ?? "0");
      await env.PAGE_VIEWS.put(key, String(current + 1));

      return new Response(null, { status: 204 });
    }

    return env.ASSETS.fetch(request);
  },
};
