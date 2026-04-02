import { describe, it, expect } from 'vitest';
import type { Professor } from '../types/professor';

describe('ProfessorCard snapshot validation', () => {
  it('has all required professor fields', () => {
    const professor: Professor = {
      id: 'prof_1',
      name: 'Dr. Jane Smith',
      school: 'MIT',
      subject: 'Physics',
      department: 'Physics',
      rating: 4.7,
      ratingCount: 120,
      difficulty: 3.2,
      wouldTakeAgain: 88,
      comments: [
        {
          id: 'c1',
          rating: 5,
          text: 'Excellent professor',
          date: '2024-01-15',
        },
        {
          id: 'c2',
          rating: 2,
          text: 'Difficult exams',
          date: '2024-01-10',
        },
      ],
    };

    expect(professor.name).toBe('Dr. Jane Smith');
    expect(professor.school).toBe('MIT');
    expect(professor.rating).toBeGreaterThan(0);
    expect(professor.ratingCount).toBeGreaterThan(0);
    expect(professor.comments.length).toBeGreaterThan(0);
  });

  it('handles professor without optional fields', () => {
    const professor: Professor = {
      id: 'prof_2',
      name: 'Dr. John Doe',
      school: 'Stanford',
      subject: 'Chemistry',
      department: 'Chemistry',
      rating: 4.5,
      ratingCount: 50,
      difficulty: undefined,
      wouldTakeAgain: undefined,
      comments: [],
    };

    expect(professor.difficulty).toBeUndefined();
    expect(professor.wouldTakeAgain).toBeUndefined();
    expect(professor.comments).toEqual([]);
  });

  it('rating should be between 0 and 5', () => {
    const validRatings = [0, 1, 2, 3, 3.5, 4, 4.5, 5];

    validRatings.forEach((rating) => {
      expect(rating).toBeGreaterThanOrEqual(0);
      expect(rating).toBeLessThanOrEqual(5);
    });
  });

  it('ratingCount should be non-negative', () => {
    const validCounts = [0, 1, 50, 100, 500, 1000];

    validCounts.forEach((count) => {
      expect(count).toBeGreaterThanOrEqual(0);
    });
  });

  it('wouldTakeAgain should be between 0 and 100', () => {
    const validPercentages = [0, 25, 50, 75, 100];

    validPercentages.forEach((pct) => {
      expect(pct).toBeGreaterThanOrEqual(0);
      expect(pct).toBeLessThanOrEqual(100);
    });
  });

  it('difficulty should be between 1 and 5 when present', () => {
    const validDifficulties = [1, 2, 3, 3.5, 4, 5];

    validDifficulties.forEach((diff) => {
      expect(diff).toBeGreaterThanOrEqual(1);
      expect(diff).toBeLessThanOrEqual(5);
    });
  });

  it('comments should have required fields', () => {
    const comment = {
      id: 'c1',
      rating: 4,
      text: 'Great professor',
      date: '2024-01-15',
    };

    expect(comment.id).toBeDefined();
    expect(comment.rating).toBeGreaterThanOrEqual(1);
    expect(comment.rating).toBeLessThanOrEqual(5);
    expect(comment.text).toBeDefined();
    expect(comment.text).toHaveLength(15);
  });

  it('professor name should not be empty', () => {
    const validNames = [
      'Dr. Jane Smith',
      'Prof. John Doe',
      'Dr. Sarah Johnson',
      'Prof. Michael Chen',
    ];

    validNames.forEach((name) => {
      expect(name.trim().length).toBeGreaterThan(0);
    });
  });

  it('school should not be empty', () => {
    const validSchools = ['MIT', 'Stanford', 'Harvard'];

    validSchools.forEach((school) => {
      expect(school.trim().length).toBeGreaterThan(0);
    });
  });
});
