import { useProfessors } from '../hooks/useProfessors';
import { ProfessorCard } from './ProfessorCard';

export function ProfessorResults() {
  const { topRanked, isLoading, error, getProfessorById, professors } = useProfessors();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-center">
          <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-600">Loading professors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p className="text-red-700 font-medium">Error: {error}</p>
      </div>
    );
  }

  if (professors.length === 0) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
        <p className="text-amber-700 font-medium">No professors found.</p>
      </div>
    );
  }

  if (topRanked.length === 0) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
        <p className="text-amber-700 font-medium">No results yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Results header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Hand-Picked Professors</h2>
        <p className="text-gray-600 max-w-2xl">
          5 professors randomly selected from UW Bothell and ranked by rating. 
          Click <span className="font-medium">RMP ↗</span> to verify ratings on RateMyProfessor.
        </p>
      </div>

      {/* Professor list */}
      <div className="space-y-4">
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

      {/* Footer note */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <p className="text-sm text-blue-900 leading-relaxed">
          <span className="font-semibold">Note:</span> These 5 professors were hand-picked by the course author 
          to represent a fair sample. Selection was done by randomly picking from the official 
          UW Bothell CS department and verifying on RateMyProfessor. Ranking is based on 
          overall rating and number of ratings received.
        </p>
      </div>
    </div>
  );
}
