// src/lib/security.ts - Enhanced security utilities
export class SecurityService {
  /**
   * Enhanced CSP policy for user-generated content
   */
  static getCSPHeader(): string {
    // More restrictive CSP while still allowing necessary resources
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https: data:",
      "style-src 'self' 'unsafe-inline' https: data:",
      "img-src 'self' https: http: data: blob:",
      "font-src 'self' https: data:",
      "connect-src 'self' https: wss:",
      "media-src 'self' https: data:",
      "frame-src https:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests"
    ].join('; ');

    return csp;
  }

  /**
   * Enhanced content sanitization that preserves safe external scripts
   */
  static sanitizeContent(content: string): string {
    let sanitized = content.trim();

    // List of trusted CDN domains for scripts and styles
    const trustedDomains = [
      'cdn.tailwindcss.com',
      'unpkg.com',
      'cdn.jsdelivr.net',
      'cdnjs.cloudflare.com',
      'fonts.googleapis.com',
      'fonts.gstatic.com'
    ];

    // Remove dangerous inline scripts while preserving safe external ones
    // Handle both <script src="..."></script> and <script>content</script> formats
    const safeScripts: string[] = [];

    // First handle external scripts with src attribute
    const externalScriptRegex = /<script\b[^>]*src\s*=\s*["']([^"']+)["'][^>]*>[\s\S]*?<\/script>/gi;
    sanitized = sanitized.replace(externalScriptRegex, (match) => {
      const srcMatch = match.match(/src\s*=\s*["']([^"']+)["']/i);
      if (srcMatch) {
        const url = srcMatch[1];
        const isTrusted = trustedDomains.some(domain => url.includes(domain));
        if (isTrusted) {
          const placeholder = `__SAFE_SCRIPT_${safeScripts.length}__`;
          safeScripts.push(match);
          return placeholder;
        }
      }
      return ''; // Remove untrusted external scripts
    });

    // Then handle inline scripts
    const inlineScriptRegex = /<script\b(?![^>]*src\s*=)[^>]*>([\s\S]*?)<\/script>/gi;
    sanitized = sanitized.replace(inlineScriptRegex, (match, content) => {
      const scriptContent = content.trim();
      if (scriptContent.includes('tailwind.config') &&
          !scriptContent.includes('eval') &&
          !scriptContent.includes('document.') &&
          !scriptContent.includes('window.') &&
          !scriptContent.includes('fetch')) {
        const placeholder = `__SAFE_SCRIPT_${safeScripts.length}__`;
        safeScripts.push(match);
        return placeholder;
      }
      return ''; // Remove unsafe inline scripts
    });

    // Remove other dangerous patterns
    const dangerousPatterns = [
      // Event handlers
      /on\w+\s*=\s*["'][^"']*["']/gi,
      /on\w+\s*=\s*[^>\s]+/gi,
      // JavaScript protocol
      /javascript\s*:/gi,
      // Data URLs with JavaScript
      /data\s*:\s*text\/html/gi,
      // Meta refresh with JavaScript
      /<meta\s+http-equiv\s*=\s*["']?refresh["']?[^>]*>/gi
    ];

    dangerousPatterns.forEach(pattern => {
      sanitized = sanitized.replace(pattern, '');
    });

    // Restore safe scripts
    safeScripts.forEach((script, index) => {
      sanitized = sanitized.replace(`__SAFE_SCRIPT_${index}__`, script);
    });

    return sanitized;
  }

  /**
   * Basic XSS protection headers
   */
  static getSecurityHeaders(): Record<string, string> {
    return {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()'
    };
  }

  /**
   * Rate limiting check (basic implementation)
   */
  static checkRateLimit(ip: string, cache?: any): boolean {
    // This is a basic implementation
    // In production, you'd use more sophisticated rate limiting
    return true;
  }

  /**
   * Validate file upload
   */
  static validateUpload(file: File): { valid: boolean; error?: string } {
    // Check file type
    if (!file.type.includes('text/html')) {
      return { valid: false, error: 'Only HTML files are allowed' };
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return { valid: false, error: 'File too large. Maximum size is 10MB' };
    }

    return { valid: true };
  }

  /**
   * Generate nonce for inline scripts (if needed)
   */
  static generateNonce(): string {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode.apply(null, Array.from(array)));
  }
}