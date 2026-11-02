process.env.NEXT_EXPORT = 'true';
const { execSync } = require('child_process');

console.log('Building Next.js Static Export for GitHub Pages...');
execSync('npx next build', { stdio: 'inherit', env: { ...process.env, NEXT_EXPORT: 'true' } });
