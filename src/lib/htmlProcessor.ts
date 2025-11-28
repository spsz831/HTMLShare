// src/lib/htmlProcessor.ts - Conservative HTML processing to preserve user styles
export class HTMLProcessor {
  /**
   * Process HTML content with minimal interference
   */
  static processHTML(content: string): string {
    let processed = content.trim();

    // Only ensure DOCTYPE for documents that don't have one
    if (!processed.toLowerCase().startsWith('<!doctype')) {
      // Check if this looks like a complete HTML document
      const hasHtmlTag = /<html[\s>]/i.test(processed);

      if (hasHtmlTag) {
        // Add DOCTYPE to complete documents only
        processed = '<!DOCTYPE html>\n' + processed;
      } else {
        // For fragments, wrap minimally
        processed = this.wrapHTMLFragment(processed);
      }
    }

    // For complete HTML documents, only add essential meta tags if missing
    if (/<html[\s>]/i.test(processed)) {
      processed = this.addEssentialMetaTags(processed);
    }

    return processed;
  }

  /**
   * Wrap HTML fragments with minimal document structure
   */
  private static wrapHTMLFragment(content: string): string {
    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTMLShare</title>
</head>
<body>
${content}
</body>
</html>`;
  }

  /**
   * Add only essential meta tags without interfering with user styles
   */
  private static addEssentialMetaTags(content: string): string {
    let enhanced = content;

    // Add charset only if missing
    if (!enhanced.toLowerCase().includes('<meta charset')) {
      const headMatch = enhanced.match(/<head[^>]*>/i);
      if (headMatch) {
        const insertPos = headMatch.index! + headMatch[0].length;
        enhanced = enhanced.slice(0, insertPos) +
          '\n    <meta charset="UTF-8">' +
          enhanced.slice(insertPos);
      }
    }

    // Add viewport only if missing
    if (!enhanced.toLowerCase().includes('viewport')) {
      const headMatch = enhanced.match(/<head[^>]*>/i);
      if (headMatch) {
        const insertPos = headMatch.index! + headMatch[0].length;
        enhanced = enhanced.slice(0, insertPos) +
          '\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">' +
          enhanced.slice(insertPos);
      }
    }

    // DO NOT add any default styles - preserve user's original styling completely

    return enhanced;
  }

  /**
   * Light sanitization that preserves layout and styles
   */
  static sanitizeForDisplay(content: string): string {
    let sanitized = content;

    // Only remove truly dangerous content
    sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    sanitized = sanitized.replace(/\son\w+\s*=\s*["'][^"']*["']/gi, '');
    sanitized = sanitized.replace(/\son\w+\s*=\s*[^>\s]+/gi, '');
    sanitized = sanitized.replace(/javascript\s*:/gi, '');

    return sanitized;
  }
}