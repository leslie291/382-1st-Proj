import { describe, it, expect } from 'vitest';
import type { Professor } from '../types/professor';
import { rankProfessors, calculateScore, getTopProfessors } from './rankingEngine';

describe('rankingEngine', () => {
  const createProfessor = (overrides?: Partial<Professor>): Professor => ({
    id: 'prof_1',
    name: 'Dr. Test',
    school: 'MIT',
    subject: 'Math',
    department: 'Dept',
    rating: 4.5,
    ratingCount: 50,
    difficulty: 3.0,
    wouldTakeAgain: 85,
    comments: [],
    ...overrides,
  });

  describe('calculateScore', () => {
    it('calculates score with all components', () => {
      const prof = createProfessor({
        rating: 4.8,
        ratingCount: 150,
        difficulty: 3.5,
        wouldTakeAgain: 90,
      });

      const score = calculateScore(prof);

      expect(score.professorId).toBe('prof_1');
      expect(score.score).toBeGreaterThan(0);
      expect(score.components.ratingScore).toBeGreaterThan(0);
      expect(score.components.confidenceAdjustment).toBeLessThanOrEqual(0); // Reduced or same for higher rating count
      expect(score.components.difficultyPenalty).toBeLessThan(0);
      expect(score.components.wouldTakeAgainBonus).toBeGreaterThan(0);
    });

    it('applies confidence adjustment: high confidence with many ratings', () => {
      const profHighConfidence = calculateScore(
        createProfessor({
          rating: 4.8,
          ratingCount: 150, // High confidence
        })
      );

      const profLowConfidence = calculateScore(
        createProfessor({
          rating: 4.8,
          ratingCount: 5, // Low confidence
        })
      );

      // High confidence score should be higher (less regressed to mean)
      expect(profHighConfidence.score).toBeGreaterThan(profLowConfidence.score);
    });

    it('penalizes difficulty', () => {
      const easyProf = calculateScore(
        createProfessor({
          difficulty: 1.0,
        })
      );

      const hardProf = calculateScore(
        createProfessor({
          difficulty: 5.0,
        })
      );

      // Easier professor should have higher score
      expect(easyProf.score).toBeGreaterThan(hardProf.score);
    });

    it('rewards would-take-again percentage', () => {
      const lowWTA = calculateScore(
        createProfessor({
          wouldTakeAgain: 50,
        })
      );

      const highWTA = calculateScore(
        createProfessor({
          wouldTakeAgain: 95,
        })
      );

      // Higher would-take-again should have higher score
      expect(highWTA.score).toBeGreaterThan(lowWTA.score);
    });

    it('handles missing optional fields', () => {
      const profNoOptionals = createProfessor({
        difficulty: undefined,
        wouldTakeAgain: undefined,
      });

      const score = calculateScore(profNoOptionals);

      expect(score.score).toBeGreaterThan(0);
      expect(score.components.difficultyPenalty).toBe(0);
      expect(score.components.wouldTakeAgainBonus).toBe(0);
    });

    it('ranks professors consistently', () => {
      const prof1 = calculateScore(createProfessor({ id: 'p1', rating: 4.9, ratingCount: 200 }));
      const prof2 = calculateScore(createProfessor({ id: 'p2', rating: 3.0, ratingCount: 5 }));

      // High rating with many reviews should beat low rating with few reviews
      expect(prof1.score).toBeGreaterThan(prof2.score);
    });
  });

  describe('rankProfessors', () => {
    it('returns professors sorted by score descending', () => {
      const professors = [
        createProfessor({ id: 'p1', rating: 4.0, ratingCount: 50 }),
        createProfessor({ id: 'p2', rating: 4.8, ratingCount: 100 }),
        createProfessor({ id: 'p3', rating: 3.5, ratingCount: 30 }),
      ];

      const ranked = rankProfessors(professors);

      expect(ranked[0].professorId).toBe('p2'); // Highest score first
      expect(ranked[1].professorId).toBe('p1');
      expect(ranked[2].professorId).toBe('p3');

      // Verify descending order
      for (let i = 0; i < ranked.length - 1; i++) {
        expect(ranked[i].score).toBeGreaterThanOrEqual(ranked[i + 1].score);
      }
    });

    it('handles empty list', () => {
      const ranked = rankProfessors([]);
      expect(ranked).toEqual([]);
    });

    it('handles single professor', () => {
      const prof = createProfessor();
      const ranked = rankProfessors([prof]);

      expect(ranked).toHaveLength(1);
      expect(ranked[0].professorId).toBe('prof_1');
    });
  });

  describe('getTopProfessors', () => {
    it('returns top N professors', () => {
      const rankings = [
        { professorId: 'p1', score: 4.8, components: {} },
        { professorId: 'p2', score: 4.7, components: {} },
        { professorId: 'p3', score: 4.6, components: {} },
        { professorId: 'p4', score: 4.5, components: {} },
        { professorId: 'p5', score: 4.4, components: {} },
        { professorId: 'p6', score: 4.3, components: {} },
      ] as any;

      const top5 = getTopProfessors(rankings, 5);

      expect(top5).toHaveLength(5);
      expect(top5[0].professorId).toBe('p1');
      expect(top5[4].professorId).toBe('p5');
    });

    it('returns fewer than N if list is smaller', () => {
      const rankings = [
        { professorId: 'p1', score: 4.8, components: {} },
        { professorId: 'p2', score: 4.7, components: {} },
      ] as any;

      const top5 = getTopProfessors(rankings, 5);

      expect(top5).toHaveLength(2);
    });

    it('returns empty list if input is empty', () => {
      const top5 = getTopProfessors([], 5);
      expect(top5).toEqual([]);
    });

    it('defaults to top 5', () => {
      const rankings = Array.from({ length: 10 }, (_, i) => ({
        professorId: `p${i}`,
        score: 5 - i * 0.1,
        components: {},
      })) as any;

      const top = getTopProfessors(rankings);

      expect(top).toHaveLength(5);
    });
  });

  describe('edge cases', () => {
    it('handles professor with 0 ratings', () => {
      const prof = createProfessor({
        rating: 4.5,
        ratingCount: 0,
      });

      const score = calculateScore(prof);

      // Should still calculate score, regressed heavily to mean
      expect(score.score).toBeGreaterThan(0);
      expect(score.components.confidenceAdjustment).toBeLessThan(-0.5); // Significant regression
    });

    it('handles professor with very high ratings', () => {
      const prof = createProfessor({
        rating: 5.0,
        ratingCount: 500,
        wouldTakeAgain: 100,
        difficulty: 1.0,
      });

      const score = calculateScore(prof);

      // Should have very high score
      expect(score.score).toBeGreaterThan(4.7);
    });

    it('handles professor with very low ratings', () => {
      const prof = createProfessor({
        rating: 1.0,
        ratingCount: 500,
        wouldTakeAgain: 0,
        difficulty: 5.0,
      });

      const score = calculateScore(prof);

      // Should have low score
      expect(score.score).toBeLessThan(2.0);
    });

    it('all professors with identical stats get identical scores', () => {
      const prof1 = calculateScore(createProfessor({ id: 'p1' }));
      const prof2 = calculateScore(createProfessor({ id: 'p2' }));

      expect(prof1.score).toBe(prof2.score);
    });
  });

  describe('bayesian weighting correctness', () => {
    it('5 star rating with 1 review should be lower than 4.7 star with 200 reviews', () => {
      const newProf = calculateScore(
        createProfessor({
          rating: 5.0,
          ratingCount: 1,
        })
      );

      const establishedProf = calculateScore(
        createProfessor({
          rating: 4.7,
          ratingCount: 200,
        })
      );

      // Confidence matters more than raw rating
      expect(establishedProf.score).toBeGreaterThan(newProf.score);
    });
  });
});
