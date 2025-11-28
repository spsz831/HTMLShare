#!/usr/bin/env node
/**
 * Performance and functionality test script
 * Tests the new Astro + D1 architecture against key metrics
 */

import fetch from 'node-fetch';
import fs from 'fs';

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';
const TEST_HTML = `<!DOCTYPE html>
<html>
<head>
    <title>Performance Test</title>
    <style>
        .card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <div class="card">
        <h1>Test Page</h1>
        <p>This tests the card class support and direct rendering.</p>
        <script>
            console.log('Script execution test:', new Date());
        </script>
    </div>
</body>
</html>`;

async function runTests() {
  console.log('🧪 Starting HTMLShare Astro Tests...');
  console.log(`🌐 Testing against: ${BASE_URL}`);

  const results = [];

  try {
    // Test 1: Homepage Load
    console.log('\n📄 Test 1: Homepage Load');
    const start1 = performance.now();
    const homeResponse = await fetch(BASE_URL);
    const end1 = performance.now();

    const homeStatus = homeResponse.ok;
    const homeTime = end1 - start1;

    console.log(`   Status: ${homeStatus ? '✅' : '❌'} (${homeResponse.status})`);
    console.log(`   Load Time: ${homeTime.toFixed(2)}ms`);

    results.push({
      test: 'Homepage Load',
      status: homeStatus,
      time: homeTime,
      target: '< 500ms'
    });

    // Test 2: Create Page API
    console.log('\n🔗 Test 2: Create Page API');
    const start2 = performance.now();

    const createResponse = await fetch(`${BASE_URL}/api/pages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: 'Performance Test Page',
        content: TEST_HTML,
        description: 'Testing card class and performance'
      })
    });

    const end2 = performance.now();
    const createData = await createResponse.json();
    const createTime = end2 - start2;

    console.log(`   Status: ${createResponse.ok ? '✅' : '❌'} (${createResponse.status})`);
    console.log(`   API Time: ${createTime.toFixed(2)}ms`);

    if (createData.success) {
      console.log(`   Generated URL: /view/${createData.data.url_id}`);
    }

    results.push({
      test: 'Create Page API',
      status: createResponse.ok && createData.success,
      time: createTime,
      target: '< 1000ms',
      url_id: createData.success ? createData.data.url_id : null
    });

    // Test 3: Direct HTML Rendering
    if (createData.success && createData.data.url_id) {
      console.log('\n🎨 Test 3: Direct HTML Rendering');
      const viewUrl = `${BASE_URL}/view/${createData.data.url_id}`;
      const start3 = performance.now();

      const viewResponse = await fetch(viewUrl);
      const end3 = performance.now();
      const viewContent = await viewResponse.text();
      const viewTime = end3 - start3;

      const hasCardClass = viewContent.includes('class="card"');
      const hasStyles = viewContent.includes('.card {');
      const hasScript = viewContent.includes('<script>');

      console.log(`   Status: ${viewResponse.ok ? '✅' : '❌'} (${viewResponse.status})`);
      console.log(`   Render Time: ${viewTime.toFixed(2)}ms`);
      console.log(`   Card Class: ${hasCardClass ? '✅' : '❌'}`);
      console.log(`   CSS Styles: ${hasStyles ? '✅' : '❌'}`);
      console.log(`   JavaScript: ${hasScript ? '✅' : '❌'}`);

      results.push({
        test: 'Direct HTML Rendering',
        status: viewResponse.ok && hasCardClass && hasStyles,
        time: viewTime,
        target: '< 200ms',
        features: {
          cardClass: hasCardClass,
          styles: hasStyles,
          javascript: hasScript
        }
      });
    }

    // Test 4: Get Page Info API
    if (createData.success && createData.data.url_id) {
      console.log('\n📊 Test 4: Get Page Info API');
      const start4 = performance.now();

      const infoResponse = await fetch(`${BASE_URL}/api/pages/${createData.data.url_id}`);
      const end4 = performance.now();
      const infoData = await infoResponse.json();
      const infoTime = end4 - start4;

      console.log(`   Status: ${infoResponse.ok ? '✅' : '❌'} (${infoResponse.status})`);
      console.log(`   API Time: ${infoTime.toFixed(2)}ms`);
      console.log(`   View Count: ${infoData.success ? infoData.data.view_count : 'N/A'}`);

      results.push({
        test: 'Get Page Info API',
        status: infoResponse.ok && infoData.success,
        time: infoTime,
        target: '< 300ms'
      });
    }

  } catch (error) {
    console.error('❌ Test Error:', error.message);
  }

  // Test Summary
  console.log('\n📋 Test Summary:');
  console.log('='.repeat(60));

  let allPassed = true;
  for (const result of results) {
    const status = result.status ? '✅ PASS' : '❌ FAIL';
    const time = `${result.time.toFixed(2)}ms`;
    const target = result.target;

    console.log(`${result.test.padEnd(25)} ${status} ${time.padStart(8)} (target: ${target})`);

    if (!result.status) allPassed = false;
  }

  console.log('='.repeat(60));
  console.log(`Overall Result: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);

  // Performance Analysis
  const avgTime = results.reduce((sum, r) => sum + r.time, 0) / results.length;
  console.log(`Average Response Time: ${avgTime.toFixed(2)}ms`);

  if (avgTime < 300) {
    console.log('🚀 Performance: EXCELLENT');
  } else if (avgTime < 500) {
    console.log('⚡ Performance: GOOD');
  } else {
    console.log('⚠️ Performance: NEEDS IMPROVEMENT');
  }

  // Save results
  const reportData = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    results: results,
    summary: {
      allPassed,
      averageTime: avgTime,
      totalTests: results.length,
      passedTests: results.filter(r => r.status).length
    }
  };

  fs.writeFileSync('test-results.json', JSON.stringify(reportData, null, 2));
  console.log('\n💾 Results saved to: test-results.json');
}

// Run tests
runTests().catch(console.error);