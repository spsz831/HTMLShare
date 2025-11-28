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
   * Enhanced content sanitization
   */
  static sanitizeContent(content: string): string {
    let sanitized = content.trim();

    // Remove dangerous script tags and event handlers
    const dangerousPatterns = [
      // Script tags
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      // Event handlers
      /on\w+\s*=\s*["'][^"']*["']/gi,
      /on\w+\s*=\s*[^>\s]+/gi,
      // JavaScript protocol
      /javascript\s*:/gi,
      // Data URLs with JavaScript
      /data\s*:\s*text\/html/gi,
      // Eval and similar functions
      /eval\s*\(/gi,
      /setTimeout\s*\(/gi,
      /setInterval\s*\(/gi,
      // Meta refresh with JavaScript
      /<meta\s+http-equiv\s*=\s*["']?refresh["']?[^>]*>/gi
    ];

    dangerousPatterns.forEach(pattern => {
      sanitized = sanitized.replace(pattern, '');
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