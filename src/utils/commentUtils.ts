import type { Comment } from '../types/professor';

/**
 * Extract the best (highest rated) comment from a list
 */
export function getBestComment(comments: Comment[]): Comment | undefined {
  if (!comments || comments.length === 0) return undefined;
  return comments.reduce((best, current) =>
    current.rating > best.rating ? current : best
  );
}

/**
 * Extract the worst (lowest rated) comment from a list
 */
export function getWorstComment(comments: Comment[]): Comment | undefined {
  if (!comments || comments.length === 0) return undefined;
  return comments.reduce((worst, current) =>
    current.rating < worst.rating ? current : worst
  );
}

/**
 * Sanitize and normalize comment text
 * - Trim whitespace
 * - Remove extra line breaks
 * - Cap length at 500 characters
 * - Handle null/undefined gracefully
 */
export function sanitizeComment(text?: string): string {
  if (!text) return '';

  return text
    .trim()
    .replace(/\s+/g, ' ') // Normalize whitespace
    .substring(0, 500); // Cap at 500 chars
}

/**
 * Format comment for display with sanitization
 */
export function formatComment(comment: Comment | undefined): {
  text: string;
  rating: number;
  date: string;
} | null {
  if (!comment) return null;

  return {
    text: sanitizeComment(comment.text),
    rating: Math.max(1, Math.min(5, comment.rating)), // Clamp rating 1-5
    date: comment.date || 'Unknown date',
  };
}

/**
 * Get review pair (best and worst) from comments
 */
export function getReviewPair(comments: Comment[]) {
  return {
    best: formatComment(getBestComment(comments)),
    worst: formatComment(getWorstComment(comments)),
  };
}
