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
    <div
      className="professor-card"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div style={{ flex: 1 }}>
          {rank && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 32,
                height: 32,
                background: '#3b82f6',
                color: 'white',
                borderRadius: '50%',
                fontWeight: 'bold',
                fontSize: '0.875rem'
              }}>
                {rank}
              </span>
              <div className="professor-name">{professor.name}</div>
              {professor.rateMyProfessorUrl && (
                <a
                  href={professor.rateMyProfessorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    fontSize: '0.75rem',
                    padding: '4px 8px',
                    background: '#dbeafe',
                    color: '#1e40af',
                    borderRadius: 4,
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  RMP ↗
                </a>
              )}
            </div>
          )}
          <div className="professor-dept">{professor.subject} • {professor.school}</div>

          <div className="stats-grid">
            <div className="stat-box" style={{ borderLeftColor: '#3b82f6' }}>
              <div className="stat-label">Rating</div>
              <div className="stat-value">{professor.rating.toFixed(1)}</div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{professor.ratingCount} reviews</div>
            </div>

            {professor.difficulty !== undefined && (
              <div className="stat-box" style={{ borderLeftColor: '#f97316' }}>
                <div className="stat-label">Difficulty</div>
                <div className="stat-value">{professor.difficulty.toFixed(1)}</div>
              </div>
            )}

            {professor.wouldTakeAgain !== undefined && (
              <div className="stat-box" style={{ borderLeftColor: '#22c55e' }}>
                <div className="stat-label">Retake %</div>
                <div className="stat-value">{professor.wouldTakeAgain}</div>
              </div>
            )}
          </div>
        </div>

        <button
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#9ca3af',
            fontSize: '1.5rem',
            padding: 8,
            transition: 'transform 0.2s',
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
        >
          ▼
        </button>
      </div>

      {isExpanded && (
        <div style={{
          borderTop: '1px solid #e5e7eb',
          paddingTop: 16,
          marginTop: 16,
        }}>
          {best && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#059669', marginBottom: 4 }}>
                ★★★★★ POSITIVE FEEDBACK • {best.date}
              </div>
              <p style={{ fontSize: '0.875rem', color: '#374151', lineHeight: 1.5 }}>{best.text}</p>
            </div>
          )}

          {worst && (
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#dc2626', marginBottom: 4 }}>
                ★★ CRITICAL FEEDBACK • {worst.date}
              </div>
              <p style={{ fontSize: '0.875rem', color: '#374151', lineHeight: 1.5 }}>{worst.text}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
