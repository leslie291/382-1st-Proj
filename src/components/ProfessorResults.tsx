import { useProfessors } from '../hooks/useProfessors';
import { ProfessorCard } from './ProfessorCard';

export function ProfessorResults() {
  const { topRanked, isLoading, error, getProfessorById, professors } = useProfessors();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12 sm:py-16">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm text-gray-600">Loading professors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50/40 border border-red-200 rounded-2xl p-4 sm:p-6 text-center">
        <p className="text-red-700 font-500 text-sm sm:text-base">Error: {error}</p>
      </div>
    );
  }

  if (professors.length === 0) {
    return (
      <div className="bg-amber-50/40 border border-amber-200 rounded-2xl p-4 sm:p-6 text-center">
        <p className="text-amber-700 font-500 text-sm sm:text-base">No professors found.</p>
      </div>
    );
  }

  if (topRanked.length === 0) {
    return (
      <div className="bg-amber-50/40 border border-amber-200 rounded-2xl p-4 sm:p-6 text-center">
        <p className="text-amber-700 font-500 text-sm sm:text-base">No results yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-700 text-gray-950 mb-2 sm:mb-3">Top Professors</h2>
        <p className="text-sm sm:text-base text-gray-700 max-w-3xl leading-relaxed font-400">
          5 professors hand-picked by the course author from UW Bothell and ranked by rating.
          Click <span className="font-600">RMP ↗</span> to verify ratings on RateMyProfessor.
        </p>
      </div>

      {/* Professor List */}
      <div className="space-y-3 sm:space-y-4">
        {topRanked.map((ranking, index) => {
          const professor = getProfessorById(ranking.professorId);
          if (!professor) return null;

          return (
            <ProfessorCard key={ranking.professorId} professor={professor} rank={index + 1} />
          );
        })}
      </div>

      {/* Footer Note */}
      <div className="bg-blue-50/40 border border-blue-200 rounded-2xl p-4 sm:p-6 mt-8 sm:mt-12">
        <p className="text-sm text-blue-900 leading-relaxed font-400">
          <span className="font-600">Selection method:</span> These 5 professors were hand-picked by the course
          author to represent a fair sample. Selection was done by randomly picking from the official UW Bothell CS
          department and verifying on RateMyProfessor. Ranking is based on overall rating and number of ratings
          received.
        </p>
      </div>
    </div>
  );
}
