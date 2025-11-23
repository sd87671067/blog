const fs = require('fs');
const matter = require('gray-matter');

// 读取一篇文章
const content = fs.readFileSync('/app/content/posts/singbox-install.md', 'utf8');
const { data, content: markdown } = matter(content);

console.log('=== 文章标题 ===');
console.log(data.title);
console.log('');

console.log('=== 是否包含代码块 ===');
const hasCodeBlock = markdown.includes('```');
console.log('包含代码块:', hasCodeBlock);
console.log('');

if (hasCodeBlock) {
  console.log('=== 第一个代码块内容 ===');
  const match = markdown.match(/```[\s\S]*?```/);
  if (match) {
    console.log(match[0].substring(0, 200));
  }
  console.log('');
}

// 测试转换
function markdownToHtml(md) {
  return md.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
    const language = lang || 'bash';
    return `<div class="code-block-wrapper" data-lang="${language}"><pre><code>${code.trim()}</code></pre></div>`;
  });
}

const html = markdownToHtml(markdown);

console.log('=== 转换后是否包含 code-block-wrapper ===');
const hasWrapper = html.includes('code-block-wrapper');
console.log('包含 code-block-wrapper:', hasWrapper);
console.log('');

if (hasWrapper) {
  console.log('=== 第一个转换后的代码块 ===');
  const match = html.match(/<div class="code-block-wrapper"[\s\S]*?<\/div>/);
  if (match) {
    console.log(match[0].substring(0, 300));
  }
}
