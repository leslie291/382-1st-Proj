import { useProfessors } from '../hooks/useProfessors';
import { ProfessorCard } from './ProfessorCard';
import { getToughProfessors, getNewProfessors } from '../utils/rankingEngine';

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
        <p className="text-yellow-700">No professors found for your selection. Try different filters.</p>
      </div>
    );
  }

  if (topRanked.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mx-auto max-w-7xl">
        <p className="text-yellow-700">No results yet. Select filters to see top-rated professors.</p>
      </div>
    );
  }

  const toughProfessors = getToughProfessors(professors, 5);
  const newProfessors = getNewProfessors(professors, 5);

  return (
    <div className="py-6 px-4 space-y-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">⭐ Top Rated Professors</h2>

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
                    Score: <span className="font-semibold">{ranking.score.toFixed(2)}</span>
                  </span>
                </div>
                <ProfessorCard professor={professor} />
              </div>
            );
          })}
        </div>
      </div>

      {toughProfessors.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">⚠️ Tough Professors (High Difficulty, Lower Ratings)</h2>
          <p className="text-sm text-gray-600 mb-4">
            These courses are challenging. Be prepared for demanding assignments and rigorous grading.
          </p>

          <div className="space-y-4">
            {toughProfessors.map((professor, index) => (
              <div key={professor.id}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-orange-100 text-orange-700 text-sm font-bold rounded-full">
                    {index + 1}
                  </span>
                  <span className="text-sm text-gray-600">
                    Difficulty: <span className="font-semibold">{professor.difficulty}/5</span>
                  </span>
                </div>
                <ProfessorCard professor={professor} />
              </div>
            ))}
          </div>
        </div>
      )}

      {newProfessors.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ New Professors (Limited Reviews)</h2>
          <p className="text-sm text-gray-600 mb-4">
            These professors have few reviews. Ratings may change as more students provide feedback.
          </p>

          <div className="space-y-4">
            {newProfessors.map((professor, index) => (
              <div key={professor.id}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-purple-100 text-purple-700 text-sm font-bold rounded-full">
                    {index + 1}
                  </span>
                  <span className="text-sm text-gray-600">
                    Reviews: <span className="font-semibold">{professor.ratingCount}</span>
                  </span>
                </div>
                <ProfessorCard professor={professor} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
