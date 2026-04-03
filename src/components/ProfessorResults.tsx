import { useProfessors } from '../hooks/useProfessors';
import { ProfessorCard } from './ProfessorCard';

export function ProfessorResults() {
  const { topRanked } = useProfessors();

  if (topRanked.length === 0) {
    return (
      <div style={{
        padding: 48,
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '1.125rem', fontWeight: 700, color: '#111827', marginBottom: 8 }}>
          No professors found
        </div>
        <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Try adjusting your filters or search</p>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: 24 }}>
        Top {topRanked.length} professors
      </h2>
      
      <div className="results-container">
        {topRanked.map((professor, index) => (
          <ProfessorCard key={professor.id} professor={professor} rank={index + 1} />
        ))}
      </div>

      <div style={{
        paddingTop: 24,
        marginTop: 24,
        borderTop: '1px solid #e5e7eb',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          Ratings are based on {topRanked.reduce((sum, p) => sum + p.ratingCount, 0)} verified student reviews from RateMyProfessors.com
        </p>
      </div>
    </div>
  );
}
