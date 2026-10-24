import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const read = (f) => readFileSync(new URL(f, import.meta.url), 'utf8');

let html = read('index.html');
const css = read('styles.css');
const dataJs = read('data.js');
const appJs = read('app.js');

html = html.replace('<link rel="stylesheet" href="styles.css">', `<style>\n${css}\n</style>`);
html = html.replace('<script src="data.js"></script>', `<script>\n${dataJs}\n</script>`);
html = html.replace('<script src="app.js"></script>', `<script>\n${appJs}\n</script>`);

if (!/name="robots"[^>]*noindex/.test(html)) {
  throw new Error('Нет meta robots noindex — сборка остановлена');
}
if (!html.includes('Демо-концепт, не официальный сайт, удалим по первой просьбе')) {
  throw new Error('Нет демо-плашки — сборка остановлена');
}

mkdirSync(new URL('dist/', import.meta.url), { recursive: true });
writeFileSync(new URL('dist/index.html', import.meta.url), html);
console.log('dist/index.html —', (Buffer.byteLength(html) / 1024).toFixed(1), 'KB');