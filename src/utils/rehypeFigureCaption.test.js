/**
 * Tests for rehypeFigureCaption using Node's built-in test runner.
 *
 *   node --test src/utils/rehypeFigureCaption.test.js
 *
 * We assert against hand-built hast trees rather than running a full unified
 * pipeline. The plugin is a pure tree transform, so minimal hast fixtures give
 * precise, dependency-free coverage of the exact structures Markdown produces.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import rehypeFigureCaption from './rehypeFigureCaption.js';

const transform = rehypeFigureCaption();

/** hast <img> element with the given properties. */
function img(properties) {
	return { type: 'element', tagName: 'img', properties, children: [] };
}

/** hast <p> wrapping arbitrary children. */
function paragraph(...children) {
	return { type: 'element', tagName: 'p', properties: {}, children };
}

/** A hast root wrapping body nodes. */
function root(...children) {
	return { type: 'root', children };
}

function text(value) {
	return { type: 'text', value };
}

test('titled standalone image becomes figure + figcaption', () => {
	const image = img({
		src: '/post-content/x/pic.webp',
		alt: 'Alt text',
		title: 'Visible caption',
		width: 800,
		height: 600,
	});
	const tree = root(paragraph(image));

	transform(tree);

	const figure = tree.children[0];
	assert.equal(figure.tagName, 'figure', 'paragraph is rewritten to <figure>');
	assert.equal(figure.children.length, 2);

	const [outImg, figcaption] = figure.children;
	// Same node reference reused -> all properties (incl. width/height) preserved.
	assert.equal(outImg, image, 'the original <img> node is reused verbatim');
	assert.equal(outImg.properties.width, 800);
	assert.equal(outImg.properties.height, 600);
	assert.equal(outImg.properties.title, 'Visible caption', 'title attribute kept');

	assert.equal(figcaption.tagName, 'figcaption');
	assert.deepEqual(figcaption.children, [text('Visible caption')]);
});

test('whitespace around the image does not defeat the match', () => {
	const image = img({ src: '/a.webp', alt: 'a', title: 'Cap' });
	const tree = root(paragraph(text('\n  '), image, text('\n')));

	transform(tree);

	assert.equal(tree.children[0].tagName, 'figure');
	assert.equal(tree.children[0].children[1].tagName, 'figcaption');
});

test('untitled standalone image is left unchanged', () => {
	const image = img({ src: '/a.webp', alt: 'a' });
	const tree = root(paragraph(image));

	transform(tree);

	assert.equal(tree.children[0].tagName, 'p', 'still a paragraph');
	assert.equal(tree.children[0].children[0], image);
});

test('image with empty / whitespace-only title is left unchanged', () => {
	for (const title of ['', '   ']) {
		const image = img({ src: '/a.webp', alt: 'a', title });
		const tree = root(paragraph(image));

		transform(tree);

		assert.equal(tree.children[0].tagName, 'p', `title=${JSON.stringify(title)} stays a <p>`);
	}
});

test('inline image mixed with text is left unchanged', () => {
	const image = img({ src: '/a.webp', alt: 'a', title: 'Cap' });
	const tree = root(paragraph(text('Here is '), image, text(' inline.')));

	transform(tree);

	assert.equal(tree.children[0].tagName, 'p', 'mixed-content paragraph is not wrapped');
	assert.equal(tree.children[0].children.length, 3);
});

test('multiple images in one paragraph are left unchanged', () => {
	const a = img({ src: '/a.webp', alt: 'a', title: 'A' });
	const b = img({ src: '/b.webp', alt: 'b', title: 'B' });
	const tree = root(paragraph(a, text(' '), b));

	transform(tree);

	assert.equal(tree.children[0].tagName, 'p');
	assert.equal(tree.children[0].children.length, 3);
});

test('nested titled image (e.g. inside a blockquote) is still converted', () => {
	const image = img({ src: '/a.webp', alt: 'a', title: 'Deep cap' });
	const tree = root({
		type: 'element',
		tagName: 'blockquote',
		properties: {},
		children: [paragraph(image)],
	});

	transform(tree);

	const figure = tree.children[0].children[0];
	assert.equal(figure.tagName, 'figure');
	assert.equal(figure.children[1].children[0].value, 'Deep cap');
});

test('a non-image paragraph is untouched', () => {
	const tree = root(paragraph(text('Just prose.')));
	transform(tree);
	assert.equal(tree.children[0].tagName, 'p');
	assert.deepEqual(tree.children[0].children, [text('Just prose.')]);
});
