# Create a new blog post with frontmatter scaffolding
new-post name:
    #!/usr/bin/env sh
    FILE="src/pages/posts/{{name}}.md"
    DATE=$(date +%Y-%m-%d)
    printf -- '---\nlayout: ../../layouts/post.astro\ntitle: ""\nauthor: "Darko"\ndescription: ""\nexcerpt: ""\ntags: []\nimage:\n  src:\n  alt:\npubDate: %s\nisPinned: false\n---\n\n' "$DATE" > "$FILE"
    echo "Created $FILE"

# Generate llms.txt and place it in public/
llms:
    elelem . && mv llms.txt public/llms.txt

# Generate retro versions of the site
retro:
    goback . --style 90s
    goback . --style 80s

# Export resume to PDF using headless Chromium via Puppeteer
resume-pdf output="public/resume/resume.pdf":
    node scripts/resume-to-pdf.mjs {{output}}
