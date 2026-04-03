import { useProfessors } from '../hooks/useProfessors';
import { ProfessorCard } from './ProfessorCard';

export function ProfessorResults() {
  const { topRanked } = useProfessors();

  if (topRanked.length === 0) {
    return (
      <div className="py-12 sm:py-16 md:py-20 text-center">
        <svg
          className="mx-auto w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mb-4 sm:mb-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 21l-4.35-4.35m0 0A7.5 7.5 0 103.5 10.5M20 21L4.35 4.35m0 0a7.5 7.5 0 1113.3 13.3"
          />
        </svg>
        <h3 className="text-base sm:text-lg font-700 text-gray-950 mb-2 sm:mb-3">No professors found</h3>
        <p className="text-sm sm:text-base text-gray-600 font-400">Try adjusting your filters or search</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-700 text-gray-950">Top {topRanked.length} professors</h2>
          <p className="text-xs sm:text-sm text-gray-600 font-400 mt-1">Ranked by quality, confidence, and difficulty</p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-blue-50 border border-blue-100 rounded-lg">
          <span className="text-blue-700 font-700 text-sm">Live results</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6">
        {topRanked.map((professor, index) => (
          <ProfessorCard key={professor.id} professor={professor} rank={index + 1} />
        ))}
      </div>

      {/* Footer note */}
      <div className="pt-6 sm:pt-8 mt-8 sm:mt-10 border-t border-gray-200">
        <p className="text-xs sm:text-sm text-gray-600 text-center font-400">
          Ratings are based on {topRanked.reduce((sum, p) => sum + p.ratingCount, 0)} verified student reviews from RateMyProfessors.com
        </p>
      </div>
    </div>
  );
}
