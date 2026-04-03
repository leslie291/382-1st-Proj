import React from 'react';
import { DATA_LAST_UPDATED, DATA_SOURCE, SELECTION_METHOD, DATA_NOTE } from '../data/mockProfessors';

export const DataUpdateInfo: React.FC = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded p-4 text-sm text-gray-700 space-y-3">
      <p className="font-semibold">
        �� UW Bothell Computer Science Faculty - Hand-Picked Selection
      </p>
      
      <div className="bg-white p-3 rounded border border-blue-100">
        <p className="text-xs font-semibold text-gray-800 mb-1">Selection Method:</p>
        <p className="text-xs text-gray-600">{SELECTION_METHOD}</p>
      </div>
      
      <div className="bg-white p-3 rounded border border-blue-100">
        <p className="text-xs font-semibold text-gray-800 mb-1">Data Source:</p>
        <p className="text-xs text-gray-600">{DATA_SOURCE}</p>
      </div>
      
      <div className="bg-white p-3 rounded border border-blue-100">
        <p className="text-xs font-semibold text-gray-800 mb-1">Ranking Basis:</p>
        <p className="text-xs text-gray-600">{DATA_NOTE}</p>
      </div>
      
      <p className="text-xs text-gray-500">
        Last Updated: {DATA_LAST_UPDATED}
      </p>
    </div>
  );
};
