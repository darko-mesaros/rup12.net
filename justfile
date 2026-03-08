# Create a new blog post with frontmatter scaffolding
new-post name:
    #!/usr/bin/env sh
    FILE="src/pages/posts/{{name}}.md"
    DATE=$(date +%Y-%m-%d)
    cat > "$FILE" << EOF
---
layout: ../../layouts/post.astro
title: ""
author: "Darko"
description: ""
excerpt: ""
tags: []
image:
  src:
  alt:
pubDate: $DATE
isPinned: false
---

EOF
    echo "Created $FILE"

# Generate llms.txt and place it in public/
llms:
    elelem . && mv llms.txt public/llms.txt

# Generate retro versions of the site
retro:
    goback . --style 90s
    goback . --style 80s
