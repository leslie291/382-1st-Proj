import { describe, it, expect } from 'vitest';
import type { Comment } from '../types/professor';
import {
  getBestComment,
  getWorstComment,
  sanitizeComment,
  formatComment,
  getReviewPair,
} from './commentUtils';

describe('commentUtils', () => {
  const createComment = (overrides?: Partial<Comment>): Comment => ({
    id: 'c1',
    rating: 4,
    text: 'Great professor',
    date: '2024-01-01',
    ...overrides,
  });

  describe('getBestComment', () => {
    it('returns comment with highest rating', () => {
      const comments = [
        createComment({ id: 'c1', rating: 3 }),
        createComment({ id: 'c2', rating: 5 }),
        createComment({ id: 'c3', rating: 4 }),
      ];

      const best = getBestComment(comments);

      expect(best?.id).toBe('c2');
      expect(best?.rating).toBe(5);
    });

    it('returns first if all have same rating', () => {
      const comments = [
        createComment({ id: 'c1', rating: 4 }),
        createComment({ id: 'c2', rating: 4 }),
      ];

      const best = getBestComment(comments);

      expect(best?.id).toBe('c1');
    });

    it('returns undefined for empty list', () => {
      const best = getBestComment([]);
      expect(best).toBeUndefined();
    });

    it('handles single comment', () => {
      const comment = createComment({ id: 'c1', rating: 4 });
      const best = getBestComment([comment]);

      expect(best).toEqual(comment);
    });
  });

  describe('getWorstComment', () => {
    it('returns comment with lowest rating', () => {
      const comments = [
        createComment({ id: 'c1', rating: 3 }),
        createComment({ id: 'c2', rating: 5 }),
        createComment({ id: 'c3', rating: 1 }),
      ];

      const worst = getWorstComment(comments);

      expect(worst?.id).toBe('c3');
      expect(worst?.rating).toBe(1);
    });

    it('returns undefined for empty list', () => {
      const worst = getWorstComment([]);
      expect(worst).toBeUndefined();
    });

    it('handles single comment', () => {
      const comment = createComment({ id: 'c1', rating: 2 });
      const worst = getWorstComment([comment]);

      expect(worst).toEqual(comment);
    });
  });

  describe('sanitizeComment', () => {
    it('trims whitespace', () => {
      const result = sanitizeComment('   hello world   ');
      expect(result).toBe('hello world');
    });

    it('normalizes multiple spaces', () => {
      const result = sanitizeComment('hello    world');
      expect(result).toBe('hello world');
    });

    it('caps at 500 characters', () => {
      const longText = 'a'.repeat(600);
      const result = sanitizeComment(longText);

      expect(result).toHaveLength(500);
    });

    it('returns empty string for undefined', () => {
      const result = sanitizeComment(undefined);
      expect(result).toBe('');
    });

    it('returns empty string for null', () => {
      const result = sanitizeComment(null as any);
      expect(result).toBe('');
    });

    it('removes line breaks', () => {
      const result = sanitizeComment('hello\nworld\r\ntest');
      expect(result).toBe('hello world test');
    });

    it('handles special characters', () => {
      const result = sanitizeComment('Great! Very good.');
      expect(result).toBe('Great! Very good.');
    });
  });

  describe('formatComment', () => {
    it('formats valid comment', () => {
      const comment = createComment({
        rating: 4,
        text: '  Great professor  ',
        date: '2024-01-01',
      });

      const formatted = formatComment(comment);

      expect(formatted).not.toBeNull();
      expect(formatted?.text).toBe('Great professor');
      expect(formatted?.rating).toBe(4);
      expect(formatted?.date).toBe('2024-01-01');
    });

    it('clamps rating to 1-5', () => {
      const commentHighRating = formatComment(createComment({ rating: 10 }));
      const commentNegativeRating = formatComment(createComment({ rating: -5 }));

      expect(commentHighRating?.rating).toBe(5);
      expect(commentNegativeRating?.rating).toBe(1);
    });

    it('returns null for undefined', () => {
      const result = formatComment(undefined);
      expect(result).toBeNull();
    });

    it('handles missing date', () => {
      const comment = createComment({ date: '' });
      const formatted = formatComment(comment);

      expect(formatted?.date).toBe('Unknown date');
    });

    it('sanitizes text in formatted output', () => {
      const comment = createComment({
        text: '   Great   professor   ',
      });

      const formatted = formatComment(comment);

      expect(formatted?.text).toBe('Great professor');
    });
  });

  describe('getReviewPair', () => {
    it('returns best and worst comments', () => {
      const comments = [
        createComment({ id: 'c1', rating: 3, text: 'Okay' }),
        createComment({ id: 'c2', rating: 5, text: 'Excellent' }),
        createComment({ id: 'c3', rating: 1, text: 'Terrible' }),
      ];

      const pair = getReviewPair(comments);

      expect(pair.best?.rating).toBe(5);
      expect(pair.worst?.rating).toBe(1);
      expect(pair.best?.text).toBe('Excellent');
      expect(pair.worst?.text).toBe('Terrible');
    });

    it('handles empty comments list', () => {
      const pair = getReviewPair([]);

      expect(pair.best).toBeNull();
      expect(pair.worst).toBeNull();
    });

    it('handles single comment', () => {
      const comments = [createComment({ id: 'c1', rating: 4, text: 'Good' })];

      const pair = getReviewPair(comments);

      expect(pair.best?.rating).toBe(4);
      expect(pair.worst?.rating).toBe(4); // Same comment is both best and worst
    });

    it('sanitizes both best and worst comments', () => {
      const comments = [
        createComment({ id: 'c1', rating: 5, text: '   Great   ' }),
        createComment({ id: 'c2', rating: 1, text: '   Awful   ' }),
      ];

      const pair = getReviewPair(comments);

      expect(pair.best?.text).toBe('Great');
      expect(pair.worst?.text).toBe('Awful');
    });
  });

  describe('edge cases', () => {
    it('handles comments with missing text', () => {
      const comment = createComment({ text: '' });
      const formatted = formatComment(comment);

      expect(formatted?.text).toBe('');
    });

    it('handles multiple comments with same rating', () => {
      const comments = [
        createComment({ id: 'c1', rating: 4, text: 'First' }),
        createComment({ id: 'c2', rating: 4, text: 'Second' }),
        createComment({ id: 'c3', rating: 4, text: 'Third' }),
      ];

      const pair = getReviewPair(comments);

      // Should return first of tied comments
      expect(pair.best?.text).toBe('First');
      expect(pair.worst?.text).toBe('First');
    });

    it('handles very long comment text', () => {
      const longText = 'a'.repeat(1000);
      const comment = createComment({ text: longText });

      const formatted = formatComment(comment);

      expect(formatted?.text).toHaveLength(500);
    });
  });
});
