import { useState } from 'react';
import type { Professor } from '../types/professor';
import { getReviewPair } from '../utils/commentUtils';

interface ProfessorCardProps {
  professor: Professor;
  rank?: number;
}

export function ProfessorCard({ professor, rank }: ProfessorCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { best, worst } = getReviewPair(professor.comments);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-6 focus:outline-none"
      >
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            {/* Header with name and rank */}
            <div className="flex items-center gap-3 mb-2">
              {rank && (
                <span className="inline-flex items-center justify-center w-6 h-6 bg-gradient-to-br from-blue-600 to-blue-500 text-white text-xs font-semibold rounded-full">
                  {rank}
                </span>
              )}
              <div className="flex items-center gap-2 flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{professor.name}</h3>
                {professor.rateMyProfessorUrl && (
                  <a
                    href={professor.rateMyProfessorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md hover:bg-blue-100 transition-colors font-medium"
                    title="Verify on RateMyProfessors.com"
                  >
                    RMP ↗
                  </a>
                )}
              </div>
            </div>

            {/* Department info */}
            <p className="text-sm text-gray-600 mb-4">
              {professor.subject} • {professor.school}
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Rating</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold text-blue-600">{professor.rating.toFixed(1)}</span>
                  <span className="text-xs text-gray-400">/5</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{professor.ratingCount} reviews</p>
              </div>

              {professor.difficulty !== undefined && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Difficulty</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-orange-600">{professor.difficulty.toFixed(1)}</span>
                    <span className="text-xs text-gray-400">/5</span>
                  </div>
                </div>
              )}

              {professor.wouldTakeAgain !== undefined && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Would Retake</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-green-600">{professor.wouldTakeAgain}%</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Expand button */}
          <button
            className="text-gray-400 hover:text-gray-600 focus:outline-none mt-1 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            <svg
              className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="border-t border-gray-100 px-6 py-4 bg-gray-50/50 space-y-4">
          {best && (
            <div>
              <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">Positive Review</p>
              <div className="bg-white p-3 rounded-lg border border-green-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-0.5">
                    {[...Array(Math.round(best.rating))].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">{best.date}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{best.text}</p>
              </div>
            </div>
          )}

          {worst && (
            <div>
              <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">Critical Review</p>
              <div className="bg-white p-3 rounded-lg border border-orange-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-0.5">
                    {[...Array(Math.round(worst.rating))].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">{worst.date}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{worst.text}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
