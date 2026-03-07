const BOT_PATTERNS = /bot|crawler|spider|crawling|headless|curl|wget|python|go-http/i;

function basicAuth(request, env) {
  const auth = request.headers.get("authorization") ?? "";
  const [scheme, encoded] = auth.split(" ");
  if (scheme !== "Basic" || !encoded) return false;
  const decoded = atob(encoded);
  const [user, pass] = decoded.split(":");
  return user === "darko" && pass === env.DASHBOARD_PASSWORD;
}

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

    if (url.pathname === "/dashboard") {
      if (!basicAuth(request, env)) {
        return new Response("Unauthorized", {
          status: 401,
          headers: { "WWW-Authenticate": 'Basic realm="Dashboard"' },
        });
      }

      const keys = await env.PAGE_VIEWS.list({ prefix: "views:" });
      const rows = await Promise.all(
        keys.keys.map(async ({ name }) => {
          const count = await env.PAGE_VIEWS.get(name);
          const slug = name.replace("views:", "");
          return `<tr><td><a href="/posts/${slug}/">${slug}</a></td><td>${count}</td></tr>`;
        })
      );
      rows.sort((a, b) => {
        const countA = parseInt(a.match(/<td>(\d+)<\/td>/)?.[1] ?? "0");
        const countB = parseInt(b.match(/<td>(\d+)<\/td>/)?.[1] ?? "0");
        return countB - countA;
      });

      const html = `<!DOCTYPE html>
<html>
<head><title>rup12.net — views</title>
<style>body{font-family:monospace;max-width:600px;margin:2rem auto}table{width:100%;border-collapse:collapse}td{padding:.4rem .8rem;border-bottom:1px solid #eee}td:last-child{text-align:right;font-weight:bold}</style>
</head>
<body>
<h2>Page Views</h2>
<table>${rows.join("")}</table>
</body></html>`;

      return new Response(html, { headers: { "content-type": "text/html" } });
    }

    return env.ASSETS.fetch(request);
  },
};
