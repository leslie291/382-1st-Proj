import { useProfessors } from '../hooks/useProfessors';
import { ProfessorCard } from './ProfessorCard';

export function ProfessorResults() {
  const { topRanked, isLoading, error, getProfessorById, professors } = useProfessors();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-3 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <p className="text-sm text-gray-600 font-500">Finding professors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50/50 border border-red-900/10 rounded-2xl p-6 sm:p-8 text-center">
        <p className="text-sm text-red-700 font-600">Error loading professors</p>
        <p className="text-xs text-red-600 mt-2">{error}</p>
      </div>
    );
  }

  if (professors.length === 0) {
    return (
      <div className="bg-amber-50/50 border border-amber-900/10 rounded-2xl p-6 sm:p-8 text-center">
        <p className="text-sm text-amber-700 font-600">No professors available</p>
      </div>
    );
  }

  if (topRanked.length === 0) {
    return (
      <div className="bg-amber-50/50 border border-amber-900/10 rounded-2xl p-6 sm:p-8 text-center">
        <p className="text-sm text-amber-700 font-600">No results match your filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* Section Header */}
      <div>
        <h2 className="text-3xl sm:text-4xl font-700 text-gray-950 mb-3">
          Hand-Picked Professors
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
          5 professors randomly selected from UW Bothell. Ranked by overall rating. 
          Click <span className="font-600 text-gray-700">RMP ↗</span> to verify ratings on RateMyProfessor.
        </p>
      </div>

      {/* Professor Cards */}
      <div className="space-y-4 sm:space-y-5">
        {topRanked.map((ranking, index) => {
          const professor = getProfessorById(ranking.professorId);
          if (!professor) return null;

          return (
            <ProfessorCard 
              key={ranking.professorId} 
              professor={professor}
              rank={index + 1}
            />
          );
        })}
      </div>

      {/* Footer Note */}
      <div className="bg-blue-50/50 border border-blue-900/10 rounded-2xl p-6 sm:p-8">
        <div className="space-y-3">
          <p className="text-sm font-600 text-blue-900">About This Selection</p>
          <p className="text-sm text-blue-800 leading-relaxed">
            These 5 professors were hand-picked by the course author to represent a fair sample. 
            Selection was done by randomly picking from the official UW Bothell CS department and verifying on RateMyProfessor. 
            Ranking is based on overall rating and number of ratings received.
          </p>
        </div>
      </div>
    </div>
  );
}
