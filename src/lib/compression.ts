// src/lib/compression.ts - Content compression utilities
import * as pako from 'pako';

export class CompressionService {
  /**
   * Compress content using gzip
   */
  static compress(content: string): string {
    try {
      const compressed = pako.gzip(content);
      return btoa(String.fromCharCode(...compressed));
    } catch (error) {
      console.error('Compression failed:', error);
      return content; // Return original if compression fails
    }
  }

  /**
   * Decompress content
   */
  static decompress(compressedContent: string): string {
    try {
      const binaryString = atob(compressedContent);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const decompressed = pako.ungzip(bytes, { to: 'string' });
      return decompressed;
    } catch (error) {
      console.error('Decompression failed:', error);
      return compressedContent; // Return as-is if decompression fails
    }
  }

  /**
   * Calculate compression ratio
   */
  static getCompressionRatio(original: string, compressed: string): number {
    return (compressed.length / original.length) * 100;
  }

  /**
   * Check if content should be compressed (based on size and type)
   */
  static shouldCompress(content: string): boolean {
    // Compress if content is larger than 1KB
    return content.length > 1024;
  }

  /**
   * Smart compression - only compress if beneficial
   */
  static smartCompress(content: string): { content: string; compressed: boolean } {
    if (!this.shouldCompress(content)) {
      return { content, compressed: false };
    }

    const compressed = this.compress(content);
    const ratio = this.getCompressionRatio(content, compressed);

    // Only use compression if we save at least 10%
    if (ratio < 90) {
      return { content: compressed, compressed: true };
    }

    return { content, compressed: false };
  }
}