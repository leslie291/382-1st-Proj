import { useProfessors } from '../hooks/useProfessors';
import { ProfessorCard } from './ProfessorCard';

export function ProfessorResults() {
  const { topRanked, isLoading, error, getProfessorById, professors } = useProfessors();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-500">Loading professors...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mx-auto max-w-7xl">
        <p className="text-red-700">Error: {error}</p>
      </div>
    );
  }

  if (professors.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mx-auto max-w-7xl">
        <p className="text-yellow-700">No professors found.</p>
      </div>
    );
  }

  if (topRanked.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mx-auto max-w-7xl">
        <p className="text-yellow-700">No results yet.</p>
      </div>
    );
  }

  return (
    <div className="py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Hand-Picked Top Professors</h2>
        <p className="text-sm text-gray-600 mb-6">
          5 professors randomly selected from UW Bothell CS department and ranked by rating.
          Click the "RMP ↗" link to verify ratings on RateMyProfessor.
        </p>

        <div className="space-y-4">
          {topRanked.map((ranking, index) => {
            const professor = getProfessorById(ranking.professorId);
            if (!professor) return null;

            return (
              <div key={ranking.professorId}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-700 text-sm font-bold rounded-full">
                    {index + 1}
                  </span>
                  <span className="text-sm text-gray-600">
                    Rating: <span className="font-semibold">{professor.rating.toFixed(1)}</span> 
                    ({professor.ratingCount} reviews)
                  </span>
                </div>
                <ProfessorCard professor={professor} />
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded">
          <p className="text-xs text-amber-800">
            <strong>📌 Note:</strong> These 5 professors were hand-picked by the course author 
            to represent a fair sample. Selection was done by randomly picking from the official 
            UW Bothell CS department and verifying on RateMyProfessor. Ranking is based on 
            overall rating and number of ratings received.
          </p>
        </div>
      </div>
    </div>
  );
}
