import { useState } from 'react';
import type { Professor } from '../types/professor';
import { getReviewPair } from '../utils/commentUtils';

interface ProfessorCardProps {
  professor: Professor;
}

export function ProfessorCard({ professor }: ProfessorCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { best, worst } = getReviewPair(professor.comments);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-4 focus:outline-none"
      >
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-900">{professor.name}</h3>
              {professor.rateMyProfessorUrl && (
                <a
                  href={professor.rateMyProfessorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded hover:bg-purple-200 transition-colors"
                  title="Verify on RateMyProfessors.com"
                >
                  RMP ↗
                </a>
              )}
            </div>
            <p className="text-sm text-gray-600">{professor.subject} • {professor.school}</p>
            <p className="text-xs text-gray-500 mt-1">{professor.department}</p>
          </div>
          <button
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? '▼' : '▶'}
          </button>
        </div>

        <div className="mt-3 flex gap-4">
          <div>
            <div className="flex items-center gap-1">
              <span className="text-lg font-bold text-blue-600">{professor.rating}</span>
              <span className="text-sm text-gray-500">/5.0</span>
            </div>
            <p className="text-xs text-gray-500">{professor.ratingCount} ratings</p>
          </div>

          {professor.difficulty !== undefined && (
            <div>
              <p className="text-sm font-medium text-gray-700">Difficulty</p>
              <p className="text-sm text-gray-600">{professor.difficulty}/5</p>
            </div>
          )}

          {professor.wouldTakeAgain !== undefined && (
            <div>
              <p className="text-sm font-medium text-gray-700">Would Take Again</p>
              <p className="text-sm text-gray-600">{professor.wouldTakeAgain}%</p>
            </div>
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="space-y-4">
            {best && (
              <div>
                <h4 className="font-semibold text-sm text-gray-900 mb-2">Best Review</h4>
                <div className="bg-white p-3 rounded border-l-4 border-green-500">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-medium text-gray-700">★ {best.rating}/5</span>
                    <span className="text-xs text-gray-500">{best.date}</span>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-3">{best.text}</p>
                </div>
              </div>
            )}

            {worst && (
              <div>
                <h4 className="font-semibold text-sm text-gray-900 mb-2">Critical Feedback</h4>
                <div className="bg-white p-3 rounded border-l-4 border-orange-500">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-medium text-gray-700">★ {worst.rating}/5</span>
                    <span className="text-xs text-gray-500">{worst.date}</span>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-3">{worst.text}</p>
                </div>
              </div>
            )}

            {!best && !worst && (
              <div className="text-center py-4">
                <p className="text-sm text-gray-500">No reviews available yet</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
