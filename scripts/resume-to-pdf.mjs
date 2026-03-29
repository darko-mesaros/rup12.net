#!/usr/bin/env node
import puppeteer from 'puppeteer';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const output = process.argv[2] ?? join(__dirname, '..', 'public', 'resume', 'resume.pdf');

const MIME = {
	'.html': 'text/html',
	'.css': 'text/css',
	'.js': 'text/javascript',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.svg': 'image/svg+xml',
	'.otf': 'font/otf',
	'.ttf': 'font/ttf',
	'.woff': 'font/woff',
	'.woff2': 'font/woff2'
};

// Minimal static file server over public/
const server = createServer((req, res) => {
	const safePath = req.url.split('?')[0].replace(/\.\./g, '');
	let filePath = join(publicDir, safePath);
	// Serve index.html for directory requests
	if (existsSync(filePath) && statSync(filePath).isDirectory()) {
		filePath = join(filePath, 'index.html');
	}
	if (existsSync(filePath)) {
		const ext = extname(filePath);
		res.writeHead(200, { 'Content-Type': MIME[ext] ?? 'application/octet-stream' });
		res.end(readFileSync(filePath));
	} else {
		res.writeHead(404);
		res.end('Not found');
	}
});

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const { port } = server.address();
const url = `http://127.0.0.1:${port}/resume/`;

console.log(`Serving public/ on ${url}`);

const browser = await puppeteer.launch({
	executablePath: '/usr/bin/chromium',
	args: ['--no-sandbox', '--disable-setuid-sandbox']
});

try {
	const page = await browser.newPage();

	// Force the default theme regardless of localStorage
	await page.evaluateOnNewDocument(() => {
		localStorage.setItem('resume-theme', 'default');
	});

	await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

	// Wait for fonts to actually render
	await page.evaluateHandle('document.fonts.ready');

	await page.pdf({
		path: output,
		format: 'A4',
		printBackground: false,
		margin: { top: '1.5cm', bottom: '1.5cm', left: '1.5cm', right: '1.5cm' },
		displayHeaderFooter: false
	});

	console.log(`Done -> ${output}`);
} finally {
	await browser.close();
	server.close();
}
