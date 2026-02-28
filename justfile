# Generate llms.txt and place it in public/
llms:
    elelem . && mv llms.txt public/llms.txt

# Generate retro versions of the site
retro:
    goback . --style 90s
    goback . --style 80s
