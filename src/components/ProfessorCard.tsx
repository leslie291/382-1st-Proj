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
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all duration-200">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-5 sm:p-6 focus:outline-none group"
      >
        <div className="flex justify-between items-start gap-3 sm:gap-4">
          <div className="flex-1 min-w-0">
            {/* Rank Badge + Name + RMP Link */}
            <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3 flex-wrap">
              {rank && (
                <div className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-600 to-blue-700 text-white text-xs sm:text-sm font-800 rounded-full flex-shrink-0 shadow-sm">
                  {rank}
                </div>
              )}
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-700 text-gray-950 truncate">{professor.name}</h3>
                {professor.rateMyProfessorUrl && (
                  <a
                    href={professor.rateMyProfessorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs bg-blue-50 text-blue-700 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-md hover:bg-blue-100 transition-colors font-700 flex-shrink-0 shadow-sm"
                    title="Verify on RateMyProfessors.com"
                  >
                    RMP ↗
                  </a>
                )}
              </div>
            </div>

            {/* Department Info */}
            <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-5 font-500">
              {professor.subject} • {professor.school}
            </p>

            {/* Stats Grid - Polished */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {/* Rating */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-50/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-blue-100/60 hover:border-blue-200 transition-colors">
                <p className="text-xs font-700 text-gray-600 uppercase tracking-wide mb-1.5">Rating</p>
                <div className="flex items-baseline gap-1 mb-1 sm:mb-1.5">
                  <span className="text-xl sm:text-2xl font-800 text-blue-700">{professor.rating.toFixed(1)}</span>
                  <span className="text-xs text-gray-500 font-600">/5</span>
                </div>
                <p className="text-xs text-gray-600 font-500">{professor.ratingCount} reviews</p>
              </div>

              {/* Difficulty */}
              {professor.difficulty !== undefined && (
                <div className="bg-gradient-to-br from-orange-50 to-orange-50/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-orange-100/60 hover:border-orange-200 transition-colors">
                  <p className="text-xs font-700 text-gray-600 uppercase tracking-wide mb-1.5">Difficulty</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl sm:text-2xl font-800 text-orange-700">{professor.difficulty.toFixed(1)}</span>
                    <span className="text-xs text-gray-500 font-600">/5</span>
                  </div>
                </div>
              )}

              {/* Would Retake */}
              {professor.wouldTakeAgain !== undefined && (
                <div className="bg-gradient-to-br from-green-50 to-green-50/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-green-100/60 hover:border-green-200 transition-colors">
                  <p className="text-xs font-700 text-gray-600 uppercase tracking-wide mb-1.5">Retake %</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl sm:text-2xl font-800 text-green-700">{professor.wouldTakeAgain}</span>
                    <span className="text-xs text-gray-500 font-600">%</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Expand Button */}
          <button
            className="text-gray-400 hover:text-gray-600 focus:outline-none flex-shrink-0 transition-colors group-hover:text-gray-500 p-1"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            <svg
              className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </button>

      {/* Expanded Reviews Section */}
      {isExpanded && (
        <div className="border-t border-gray-200 px-5 sm:px-6 py-5 sm:py-6 bg-gradient-to-b from-gray-50/50 to-white space-y-5 sm:space-y-6">
          {best && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex gap-0.5">
                  {[...Array(Math.round(best.rating))].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-xs text-green-700 font-700 uppercase tracking-wide">Positive feedback</span>
                <span className="text-xs text-gray-500 font-500">{best.date}</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed font-400">{best.text}</p>
            </div>
          )}

          {worst && (
            <div className="space-y-2 pt-2 sm:pt-3">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex gap-0.5">
                  {[...Array(Math.round(worst.rating))].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-xs text-orange-700 font-700 uppercase tracking-wide">Critical feedback</span>
                <span className="text-xs text-gray-500 font-500">{worst.date}</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed font-400">{worst.text}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
