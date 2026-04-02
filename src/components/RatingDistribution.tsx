import { useProfessors } from '../hooks/useProfessors';

export function RatingDistribution() {
  const { professors } = useProfessors();

  if (professors.length === 0) return null;

  // Calculate average rating and count by 0.5 increments
  const avgRating = professors.reduce((sum, p) => sum + p.rating, 0) / professors.length;
  const totalRatings = professors.reduce((sum, p) => sum + p.ratingCount, 0);

  // Distribute professors into rating buckets
  const buckets = {
    '4.5-5.0': 0,
    '4.0-4.5': 0,
    '3.5-4.0': 0,
    '3.0-3.5': 0,
  };

  professors.forEach(p => {
    if (p.rating >= 4.5) buckets['4.5-5.0']++;
    else if (p.rating >= 4.0) buckets['4.0-4.5']++;
    else if (p.rating >= 3.5) buckets['3.5-4.0']++;
    else buckets['3.0-3.5']++;
  });

  const maxCount = Math.max(...Object.values(buckets));

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-4xl mx-auto my-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="space-y-4">
            {Object.entries(buckets).map(([range, count]) => (
              <div key={range}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">{range}</span>
                  <span className="text-sm text-gray-600">{count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${(count / maxCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Average Rating</p>
              <p className="text-3xl font-bold text-blue-600">{avgRating.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Ratings</p>
              <p className="text-xl font-semibold text-gray-900">{totalRatings}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Professors</p>
              <p className="text-xl font-semibold text-gray-900">{professors.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
