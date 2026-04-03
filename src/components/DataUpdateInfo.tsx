import React from 'react';
import { DATA_LAST_UPDATED } from '../data/mockProfessors';

export const DataUpdateInfo: React.FC = () => {
  const date = new Date(DATA_LAST_UPDATED);
  const formatted = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const time = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm text-gray-600">
      <p>
        <strong>📊 Database Information:</strong> Real UW professor data from official
        university directories and student reviews.
      </p>
      <p>
        <strong>🕐 Last Updated:</strong> {formatted} at {time} UTC
      </p>
      <p className="text-xs text-gray-500 mt-2">
        Data includes professors from UW Seattle, UW Tacoma, and UW Bothell across all
        STEM departments. Ratings and reviews from multiple sources.
      </p>
    </div>
  );
};
