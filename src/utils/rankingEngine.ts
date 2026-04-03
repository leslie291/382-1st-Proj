import type { Professor, RankingScore } from '../types/professor';

/**
 * Confidence-aware ranking algorithm that avoids small-sample bias.
 * 
 * Scoring considers:
 * 1. Base rating (0-5)
 * 2. Confidence adjustment based on rating count (more ratings = more confident)
 * 3. Difficulty penalty (higher difficulty lowers score slightly)
 * 4. Would-take-again bonus (percentage boost)
 * 
 * The algorithm uses Bayesian confidence weighting: assume a prior of 3.5 stars
 * for all professors, then blend with actual data. More data points = more weight
 * on actual rating, fewer data points = more regression to mean (3.5).
 */

const CONFIDENCE_THRESHOLD = 30; // ratings count below which we apply strong confidence penalty
const ASSUMED_PRIOR_RATING = 3.5;
const MIN_CONFIDENCE_WEIGHT = 0.3; // Minimum confidence when very few ratings

export function rankProfessors(professors: Professor[]): RankingScore[] {
  return professors
    .map(prof => calculateScore(prof))
    .sort((a, b) => b.score - a.score); // Sort descending (higher is better)
}

export function calculateScore(professor: Professor): RankingScore {
  const ratingScore = calculateConfidenceAdjustedRating(
    professor.rating,
    professor.ratingCount
  );

  const difficultyPenalty = calculateDifficultyPenalty(professor.difficulty);
  const wouldTakeAgainBonus = calculateWouldTakeAgainBonus(professor.wouldTakeAgain);

  const finalScore = ratingScore + difficultyPenalty + wouldTakeAgainBonus;

  return {
    professorId: professor.id,
    score: finalScore,
    components: {
      ratingScore,
      confidenceAdjustment: ratingScore - professor.rating,
      difficultyPenalty,
      wouldTakeAgainBonus,
    },
  };
}

/**
 * Confidence-adjusted rating using Bayesian weighting.
 * 
 * With few ratings: blend toward ASSUMED_PRIOR_RATING (3.5)
 * With many ratings: trust the actual rating more
 */
function calculateConfidenceAdjustedRating(rating: number, ratingCount: number): number {
  const confidence = Math.min(1, ratingCount / CONFIDENCE_THRESHOLD);
  const confidenceWeight = MIN_CONFIDENCE_WEIGHT + (1 - MIN_CONFIDENCE_WEIGHT) * confidence;

  return rating * confidenceWeight + ASSUMED_PRIOR_RATING * (1 - confidenceWeight);
}

/**
 * Light difficulty penalty: each 1 point on difficulty scale (0-5)
 * reduces score by ~0.05 points. So a 5.0 difficulty still only -0.25 penalty.
 */
function calculateDifficultyPenalty(difficulty?: number): number {
  if (!difficulty || difficulty === 0) return 0;
  return -(difficulty * 0.05);
}

/**
 * Would-take-again bonus: each 10% increases score by ~0.02.
 * 100% would take again = +0.2, 50% = +0.1, 0% = 0.
 */
function calculateWouldTakeAgainBonus(wouldTakeAgain?: number): number {
  if (!wouldTakeAgain) return 0;
  return (wouldTakeAgain / 100) * 0.2;
}

/**
 * Get top N professors from a ranked list
 */
export function getTopProfessors(rankings: RankingScore[], topN: number = 5): RankingScore[] {
  return rankings.slice(0, topN);
}

/**
 * Get tough professors: high difficulty, lower ratings
 * These are challenging courses that students should be aware of
 */
export function getToughProfessors(professors: Professor[], topN: number = 5): Professor[] {
  // Filter professors with difficulty >= 4.0 and rating < 4.2
  const tough = professors.filter(
    (p) => p.difficulty !== undefined && p.difficulty >= 4.0 && p.rating < 4.2
  );

  // Sort by difficulty (descending) as primary, then by rating (ascending)
  return tough
    .sort((a, b) => {
      const diffDiff = (b.difficulty || 0) - (a.difficulty || 0);
      if (diffDiff !== 0) return diffDiff;
      return a.rating - b.rating;
    })
    .slice(0, topN);
}

/**
 * Get new professors: very few ratings (uncertain)
 * These are new or less-reviewed professors where students should use caution
 */
export function getNewProfessors(professors: Professor[], topN: number = 5): Professor[] {
  // Filter professors with very few ratings (< 10)
  const newProfs = professors.filter((p) => p.ratingCount < 10);

  // Sort by rating count (ascending) then by rating (descending)
  return newProfs
    .sort((a, b) => {
      if (a.ratingCount !== b.ratingCount) {
        return a.ratingCount - b.ratingCount;
      }
      return b.rating - a.rating;
    })
    .slice(0, topN);
}
