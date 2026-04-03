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
    <div className="group bg-white rounded-2xl border border-gray-900/10 shadow-sm hover:shadow-md hover:border-gray-900/20 transition-all duration-300">
      {/* Header Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-6 sm:p-8 focus:outline-none"
      >
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 min-w-0">
            {/* Title Row with Rank & Name */}
            <div className="flex items-start gap-3 mb-2">
              {rank && (
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-700 flex-shrink-0">
                  {rank}
                </span>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg sm:text-xl font-700 text-gray-950">{professor.name}</h3>
                  {professor.rateMyProfessorUrl && (
                    <a
                      href={professor.rateMyProfessorUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs font-600 text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md hover:bg-blue-100 transition-colors"
                      title="Verify on RateMyProfessors.com"
                    >
                      RMP ↗
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Department Info */}
            <p className="text-sm text-gray-600 mb-5">
              {professor.subject} • {professor.school}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {/* Rating */}
              <div className="space-y-1.5">
                <p className="text-xs font-600 text-gray-500 uppercase tracking-wider">Rating</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-700 text-blue-600">
                    {professor.rating.toFixed(1)}
                  </span>
                  <span className="text-xs text-gray-400 font-500">/5</span>
                </div>
                <p className="text-xs text-gray-500 font-500">{professor.ratingCount} reviews</p>
              </div>

              {/* Difficulty */}
              {professor.difficulty !== undefined && (
                <div className="space-y-1.5">
                  <p className="text-xs font-600 text-gray-500 uppercase tracking-wider">Difficulty</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-700 text-orange-600">
                      {professor.difficulty.toFixed(1)}
                    </span>
                    <span className="text-xs text-gray-400 font-500">/5</span>
                  </div>
                  <p className="text-xs text-gray-500 font-500">Challenge level</p>
                </div>
              )}

              {/* Would Retake */}
              {professor.wouldTakeAgain !== undefined && (
                <div className="space-y-1.5">
                  <p className="text-xs font-600 text-gray-500 uppercase tracking-wider">Retake</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-700 text-green-600">
                      {professor.wouldTakeAgain}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 font-500">Would take again</p>
                </div>
              )}
            </div>
          </div>

          {/* Expand Icon */}
          <button
            className="text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0 mt-1"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            <svg
              className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </button>

      {/* Expanded Review Section */}
      {isExpanded && (
        <div className="border-t border-gray-900/10 px-6 sm:px-8 py-6 sm:py-8 bg-gray-50/50 space-y-6">
          {/* Positive Review */}
          {best && (
            <div className="space-y-2">
              <p className="text-xs font-700 text-gray-700 uppercase tracking-wider">Positive Review</p>
              <div className="bg-white p-4 rounded-xl border border-green-900/10 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {[...Array(Math.round(best.rating))].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-sm">★</span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">{best.date}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed font-400">{best.text}</p>
              </div>
            </div>
          )}

          {/* Critical Review */}
          {worst && (
            <div className="space-y-2">
              <p className="text-xs font-700 text-gray-700 uppercase tracking-wider">Critical Review</p>
              <div className="bg-white p-4 rounded-xl border border-orange-900/10 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {[...Array(Math.round(worst.rating))].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-sm">★</span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">{worst.date}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed font-400">{worst.text}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
