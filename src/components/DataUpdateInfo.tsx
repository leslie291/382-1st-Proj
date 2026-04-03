import React from 'react';
import { DATA_LAST_UPDATED, DATA_SOURCE, SELECTION_METHOD, DATA_NOTE } from '../data/mockProfessors';

export const DataUpdateInfo: React.FC = () => {
  return (
    <div>
      <p style={{ marginBottom: 16 }}>{SELECTION_METHOD}</p>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 16,
        paddingTop: 16,
        paddingBottom: 16,
        borderTop: '1px solid #e5e7eb',
        borderBottom: '1px solid #e5e7eb',
        marginBottom: 16
      }}>
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', marginBottom: 4 }}>
            Data Source
          </div>
          <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#111827' }}>{DATA_SOURCE}</p>
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', marginBottom: 4 }}>
            Last Updated
          </div>
          <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#111827' }}>{DATA_LAST_UPDATED}</p>
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', marginBottom: 4 }}>
            Sample Size
          </div>
          <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#111827' }}>5 professors</p>
        </div>
      </div>

      <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{DATA_NOTE}</p>
    </div>
  );
};
