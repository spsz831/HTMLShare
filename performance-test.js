// HTMLShare Performance Testing Script
const https = require('http');

async function testEndpoint(url, description) {
  return new Promise((resolve) => {
    const startTime = process.hrtime.bigint();

    const req = https.get(url, (res) => {
      let data = '';
      let firstByteTime = null;

      res.on('data', (chunk) => {
        if (!firstByteTime) {
          firstByteTime = process.hrtime.bigint();
        }
        data += chunk;
      });

      res.on('end', () => {
        const endTime = process.hrtime.bigint();
        const totalTime = Number(endTime - startTime) / 1000000; // Convert to ms
        const ttfb = firstByteTime ? Number(firstByteTime - startTime) / 1000000 : null;

        resolve({
          description,
          url,
          statusCode: res.statusCode,
          totalTime: Math.round(totalTime * 100) / 100,
          ttfb: ttfb ? Math.round(ttfb * 100) / 100 : null,
          contentLength: data.length,
          headers: res.headers
        });
      });
    });

    req.on('error', (err) => {
      resolve({
        description,
        url,
        error: err.message,
        totalTime: null
      });
    });

    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        description,
        url,
        error: 'Timeout',
        totalTime: null
      });
    });
  });
}

async function runPerformanceTests() {
  console.log('🔄 HTMLShare Performance Analysis');
  console.log('=====================================\n');

  const tests = [
    { url: 'http://localhost:3002/', description: 'Homepage Load' },
    { url: 'http://localhost:3002/api/snippets', description: 'API Health Check' },
  ];

  console.log('⏱️  Response Time Analysis:');
  console.log('----------------------------');

  for (const test of tests) {
    console.log(`Testing ${test.description}...`);
    const result = await testEndpoint(test.url, test.description);

    if (result.error) {
      console.log(`❌ ${result.description}: ${result.error}\n`);
    } else {
      console.log(`✅ ${result.description}:`);
      console.log(`   Status: ${result.statusCode}`);
      console.log(`   Total Time: ${result.totalTime}ms`);
      console.log(`   TTFB: ${result.ttfb || 'N/A'}ms`);
      console.log(`   Content Size: ${result.contentLength} bytes`);
      console.log(`   Server: ${result.headers.server || 'Next.js'}\n`);
    }

    // Wait 100ms between tests
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Multiple requests to test consistency
  console.log('📊 Load Testing (10 consecutive requests):');
  console.log('------------------------------------------');

  const loadTestResults = [];
  for (let i = 0; i < 10; i++) {
    const result = await testEndpoint('http://localhost:3002/', `Request ${i + 1}`);
    loadTestResults.push(result.totalTime);
    process.stdout.write(`${i + 1}: ${result.totalTime}ms  `);
    await new Promise(resolve => setTimeout(resolve, 50));
  }

  console.log('\n\n📈 Performance Summary:');
  console.log('------------------------');
  const validTimes = loadTestResults.filter(t => t !== null);
  if (validTimes.length > 0) {
    const avgTime = Math.round((validTimes.reduce((a, b) => a + b, 0) / validTimes.length) * 100) / 100;
    const minTime = Math.min(...validTimes);
    const maxTime = Math.max(...validTimes);

    console.log(`Average Response Time: ${avgTime}ms`);
    console.log(`Fastest Response: ${minTime}ms`);
    console.log(`Slowest Response: ${maxTime}ms`);
    console.log(`Consistency: ${validTimes.length}/10 successful requests`);

    // Performance rating
    let rating = 'Excellent';
    if (avgTime > 500) rating = 'Good';
    if (avgTime > 1000) rating = 'Fair';
    if (avgTime > 2000) rating = 'Poor';

    console.log(`Performance Rating: ${rating}`);
  }

  console.log('\n🎯 Optimization Recommendations:');
  console.log('----------------------------------');

  if (validTimes.length > 0) {
    const avgTime = validTimes.reduce((a, b) => a + b, 0) / validTimes.length;

    if (avgTime < 200) {
      console.log('✅ Excellent performance! No immediate optimizations needed.');
    } else if (avgTime < 500) {
      console.log('• Consider implementing caching for repeated requests');
      console.log('• Optimize image loading and compression');
    } else if (avgTime < 1000) {
      console.log('• Implement server-side caching');
      console.log('• Optimize database queries');
      console.log('• Consider CDN for static assets');
    } else {
      console.log('• Critical: Review database connection pooling');
      console.log('• Critical: Optimize API response times');
      console.log('• Critical: Consider implementing Redis caching');
    }
  }
}

runPerformanceTests().catch(console.error);