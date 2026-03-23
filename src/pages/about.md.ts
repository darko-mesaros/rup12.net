import type { APIRoute } from 'astro';

import { aboutMarkdown } from '@/data/about';

export const GET: APIRoute = () => {
	return new Response(aboutMarkdown(), {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8'
		}
	});
};
