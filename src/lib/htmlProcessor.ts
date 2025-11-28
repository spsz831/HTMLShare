// src/lib/htmlProcessor.ts - Enhanced HTML processing for better rendering
export class HTMLProcessor {
  /**
   * Process HTML content for optimal rendering
   */
  static processHTML(content: string): string {
    let processed = content.trim();

    // Ensure proper DOCTYPE
    if (!processed.toLowerCase().startsWith('<!doctype')) {
      processed = '<!DOCTYPE html>\n' + processed;
    }

    // Check if it's a complete HTML document
    const hasHtmlTag = /<html[\s>]/i.test(processed);
    const hasHeadTag = /<head[\s>]/i.test(processed);
    const hasBodyTag = /<body[\s>]/i.test(processed);

    if (!hasHtmlTag) {
      // Not a complete HTML document, wrap it
      processed = this.wrapPartialHTML(processed);
    } else {
      // Complete HTML document, enhance it
      processed = this.enhanceCompleteHTML(processed);
    }

    return processed;
  }

  /**
   * Wrap partial HTML content in a complete document structure
   */
  private static wrapPartialHTML(content: string): string {
    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTMLShare - 共享页面</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: #fff;
        }
        img {
            max-width: 100%;
            height: auto;
        }
        pre {
            background: #f5f5f5;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
        }
        code {
            background: #f5f5f5;
            padding: 2px 4px;
            border-radius: 3px;
        }
    </style>
</head>
<body>
${content}
</body>
</html>`;
  }

  /**
   * Enhance complete HTML document
   */
  private static enhanceCompleteHTML(content: string): string {
    let enhanced = content;

    // Add charset if missing
    if (!enhanced.toLowerCase().includes('<meta charset')) {
      const headMatch = enhanced.match(/<head[^>]*>/i);
      if (headMatch) {
        const insertPos = headMatch.index! + headMatch[0].length;
        enhanced = enhanced.slice(0, insertPos) +
          '\n    <meta charset="UTF-8">' +
          enhanced.slice(insertPos);
      }
    }

    // Add viewport if missing
    if (!enhanced.toLowerCase().includes('viewport')) {
      const headMatch = enhanced.match(/<head[^>]*>/i);
      if (headMatch) {
        const insertPos = headMatch.index! + headMatch[0].length;
        enhanced = enhanced.slice(0, insertPos) +
          '\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">' +
          enhanced.slice(insertPos);
      }
    }

    // Add basic responsive styles if no external CSS
    if (!enhanced.toLowerCase().includes('<link') && !enhanced.toLowerCase().includes('<style')) {
      const headCloseMatch = enhanced.match(/<\/head>/i);
      if (headCloseMatch) {
        const basicStyles = `
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 20px;
            background: #fff;
        }
        img {
            max-width: 100%;
            height: auto;
            display: block;
        }
        pre {
            background: #f5f5f5;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
        }
        code {
            background: #f5f5f5;
            padding: 2px 4px;
            border-radius: 3px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
    </style>`;
        enhanced = enhanced.slice(0, headCloseMatch.index!) +
          basicStyles +
          enhanced.slice(headCloseMatch.index!);
      }
    }

    return enhanced;
  }

  /**
   * Sanitize HTML while preserving layout
   */
  static sanitizeForDisplay(content: string): string {
    // More gentle sanitization for display
    let sanitized = content;

    // Remove script tags but preserve other content
    sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

    // Remove dangerous event handlers but preserve other attributes
    sanitized = sanitized.replace(/\son\w+\s*=\s*["'][^"']*["']/gi, '');
    sanitized = sanitized.replace(/\son\w+\s*=\s*[^>\s]+/gi, '');

    // Remove javascript: protocols
    sanitized = sanitized.replace(/javascript\s*:/gi, '');

    return sanitized;
  }
}