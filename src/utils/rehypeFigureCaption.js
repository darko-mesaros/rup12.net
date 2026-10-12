/**
 * rehypeFigureCaption
 * --------------------
 * A tiny, dependency-free rehype (hast) transform that upgrades a *standalone*
 * titled Markdown image into semantic figure/figcaption markup.
 *
 * Authoring stays exactly as before:
 *
 *     ![Alt text](/path/image.webp "Visible caption")
 *
 * Markdown renders a block-level image as a paragraph whose only child is the
 * `<img>`. mdast-util-to-hast maps the image's `title` onto `img.properties.title`.
 * At the hast stage we therefore look for a `<p>` whose single meaningful child
 * is an `<img>` carrying a non-empty `title`, and rewrite that paragraph into:
 *
 *     <figure>
 *       <img ... title="Visible caption">
 *       <figcaption>Visible caption</figcaption>
 *     </figure>
 *
 * Design choices (the "why"):
 *   - hast, not mdast: <figure>/<figcaption> are HTML constructs, so operating
 *     on the HTML tree is the natural fit and avoids mdast hName/hProperties
 *     gymnastics. It also lets us run *after* rehype-img-size so the <img>
 *     already carries width/height and every other property — we reuse the exact
 *     same node reference, so nothing is lost.
 *   - In-place mutation of the <p> node (change tagName -> figure, swap children)
 *     means we never need parent access, keeping the walker trivial.
 *   - The `title` attribute is intentionally KEPT on the <img>. It is harmless,
 *     aids any non-prose/feed context, and the duplicate hover tooltip is a mild
 *     cosmetic nicety rather than a semantic problem.
 *   - The caption is emitted as a hast *text* node, so hast-util-to-html escapes
 *     it correctly — no raw-HTML injection surface.
 *
 * Scope guards (requirement 4):
 *   - Untitled images are left untouched.
 *   - Inline images mixed with text (paragraph has other meaningful children)
 *     are left untouched.
 *   - Paragraphs with multiple images are left untouched.
 *   - No client-side JS is introduced.
 */

/** A text node that is only whitespace (indentation / stray newlines). */
function isWhitespaceText(node) {
	return node.type === 'text' && node.value.trim() === '';
}

/**
 * If `node` is a paragraph whose single meaningful child is an <img>, return
 * that <img> node; otherwise return null. Whitespace-only text nodes are ignored
 * so trivial formatting does not defeat the match.
 */
function soleImageChild(node) {
	if (!node || node.type !== 'element' || node.tagName !== 'p') return null;
	if (!Array.isArray(node.children)) return null;

	const meaningful = node.children.filter((child) => !isWhitespaceText(child));
	if (meaningful.length !== 1) return null;

	const only = meaningful[0];
	if (only.type === 'element' && only.tagName === 'img') return only;
	return null;
}

/** Non-empty string title on the image, or null. */
function imageTitle(img) {
	const title = img.properties && img.properties.title;
	if (typeof title === 'string' && title.trim() !== '') return title;
	return null;
}

/**
 * Rewrite a matching paragraph in place into a <figure> with a <figcaption>.
 * The <img> node is reused verbatim (all properties preserved).
 */
function wrapInFigure(node, img, title) {
	const figcaption = {
		type: 'element',
		tagName: 'figcaption',
		properties: {},
		children: [{ type: 'text', value: title }],
	};

	node.tagName = 'figure';
	node.properties = node.properties || {};
	node.children = [img, figcaption];
}

/** Depth-first walk; transform matching paragraphs as we encounter them. */
function transform(node) {
	if (!node || typeof node !== 'object') return;

	const img = soleImageChild(node);
	if (img) {
		const title = imageTitle(img);
		if (title) {
			wrapInFigure(node, img, title);
			// A <figure> cannot itself match the <p> rule, so no re-descent needed
			// for this node; its children (img, figcaption) contain no paragraphs.
			return;
		}
	}

	if (Array.isArray(node.children)) {
		for (const child of node.children) {
			transform(child);
		}
	}
}

/**
 * rehype plugin entry point. Returns the unified transformer.
 * @returns {(tree: import('hast').Root) => void}
 */
export default function rehypeFigureCaption() {
	return function transformer(tree) {
		transform(tree);
	};
}

// Exported for focused unit testing without constructing a full unified pipeline.
export { soleImageChild, imageTitle, isWhitespaceText };
