import React from 'react';
import { DATA_LAST_UPDATED, DATA_SOURCE, DATA_VERIFICATION_NOTE } from '../data/mockProfessors';

export const DataUpdateInfo: React.FC = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded p-4 text-sm text-gray-700">
      <p className="font-semibold mb-2">
        📊 Real UW Bothell Computer Science Faculty
      </p>
      <p className="mb-2">
        <strong>Source:</strong> {DATA_SOURCE}
      </p>
      <p className="mb-2">
        <strong>Last Updated:</strong> {DATA_LAST_UPDATED}
      </p>
      <p className="text-xs text-gray-600 bg-white p-2 rounded border border-blue-100">
        <strong>📌 Data Note:</strong> {DATA_VERIFICATION_NOTE}
      </p>
    </div>
  );
};
