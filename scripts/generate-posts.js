const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '../src/assets/blog');
const outputPath = path.join(__dirname, '../src/assets/blog/posts.json');

const files = fs.readdirSync(postsDir)
  .filter(file => file.endsWith('.md'))
  .map(file => {
    const slug = file.replace('.md', '');
    return { slug, title: slug.replace(/-/g, ' ').toUpperCase() };
  });

fs.writeFileSync(outputPath, JSON.stringify(files, null, 2));

console.log('✅ posts.json generated!');