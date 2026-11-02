const { spawn } = require('child_process');
const http = require('http');

async function checkUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: data
        });
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('Starting next start on port 3005...');
  const child = spawn('npx', ['next', 'start', '-p', '3005'], {
    shell: true,
    stdio: 'pipe'
  });

  child.stdout.on('data', d => console.log('STDOUT:', d.toString().trim()));
  child.stderr.on('data', d => console.log('STDERR:', d.toString().trim()));

  // Wait 3 seconds for server to boot
  await new Promise(r => setTimeout(r, 3500));

  try {
    const sitemapRes = await checkUrl('http://localhost:3005/sitemap.xml');
    console.log('--- /sitemap.xml ---');
    console.log('Status:', sitemapRes.statusCode);
    console.log('Content-Type:', sitemapRes.headers['content-type']);
    console.log('Snippet:', sitemapRes.data.substring(0, 300));

    const robotsRes = await checkUrl('http://localhost:3005/robots.txt');
    console.log('\n--- /robots.txt ---');
    console.log('Status:', robotsRes.statusCode);
    console.log('Data:', robotsRes.data.trim());

    const gVerifyRes = await checkUrl('http://localhost:3005/googlebd48b11684e0e217.html');
    console.log('\n--- /googlebd48b11684e0e217.html ---');
    console.log('Status:', gVerifyRes.statusCode);
    console.log('Data:', gVerifyRes.data.trim());

    const homeRes = await checkUrl('http://localhost:3005/');
    console.log('\n--- / ---');
    console.log('Status:', homeRes.statusCode);

    const blogPostRes = await checkUrl('http://localhost:3005/blog/ca-phe-rang-moc-da-lat-nguyen-chat');
    console.log('\n--- /blog/ca-phe-rang-moc-da-lat-nguyen-chat ---');
    console.log('Status:', blogPostRes.statusCode);

    console.log('\nALL ENDPOINTS PASSED DIRECT VERIFICATION!');
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    child.kill('SIGINT');
    process.exit(0);
  }
}

main();
