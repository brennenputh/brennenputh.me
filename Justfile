new-post name:
  cp ./templates/content/post.md ./content/blog/{{name}}.md
  nvim ./content/blog/{{name}}.md

new-reading name:
  cp ./templates/content/reading.md ./content/reading/{{name}}.md
  nvim ./content/reading/{{name}}.md
