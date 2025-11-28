// Test the security sanitization logic
const testHTML = `<!DOCTYPE html>
<html>
<head>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        beige: { 900: '#2C241B' }
                    }
                }
            }
        }
    </script>
</head>
<body>
    <h1>Test</h1>
</body>
</html>`;

// Simulate the security processing
const trustedDomains = [
  'cdn.tailwindcss.com',
  'unpkg.com',
  'cdn.jsdelivr.net',
  'cdnjs.cloudflare.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com'
];

const safeScripts = [];
let sanitized = testHTML.trim();

console.log('Original HTML:', testHTML);
console.log('\n--- Processing external scripts ---');

// First handle external scripts with src attribute
const externalScriptRegex = /<script\b[^>]*src\s*=\s*["']([^"']+)["'][^>]*>[\s\S]*?<\/script>/gi;
sanitized = sanitized.replace(externalScriptRegex, (match) => {
  console.log('Found external script:', match);
  const srcMatch = match.match(/src\s*=\s*["']([^"']+)["']/i);
  if (srcMatch) {
    const url = srcMatch[1];
    console.log('URL:', url);
    const isTrusted = trustedDomains.some(domain => url.includes(domain));
    console.log('Is trusted:', isTrusted);
    if (isTrusted) {
      const placeholder = `__SAFE_SCRIPT_${safeScripts.length}__`;
      safeScripts.push(match);
      console.log('Saved as:', placeholder);
      return placeholder;
    }
  }
  console.log('Removing untrusted script');
  return '';
});

console.log('\nAfter external script processing:', sanitized);
console.log('\n--- Processing inline scripts ---');

// Then handle inline scripts
const inlineScriptRegex = /<script\b(?![^>]*src\s*=)[^>]*>([\s\S]*?)<\/script>/gi;
sanitized = sanitized.replace(inlineScriptRegex, (match, content) => {
  console.log('Found inline script:', match);
  const scriptContent = content.trim();
  console.log('Content:', scriptContent);
  if (scriptContent.includes('tailwind.config') &&
      !scriptContent.includes('eval') &&
      !scriptContent.includes('document.') &&
      !scriptContent.includes('window.') &&
      !scriptContent.includes('fetch')) {
    const placeholder = `__SAFE_SCRIPT_${safeScripts.length}__`;
    safeScripts.push(match);
    console.log('Saved as:', placeholder);
    return placeholder;
  }
  console.log('Removing unsafe inline script');
  return '';
});

console.log('\nAfter inline script processing:', sanitized);

// Restore safe scripts
safeScripts.forEach((script, index) => {
  sanitized = sanitized.replace(`__SAFE_SCRIPT_${index}__`, script);
});

console.log('\nFinal result:', sanitized);
console.log('\nSafe scripts:', safeScripts);