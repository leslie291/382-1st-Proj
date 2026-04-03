import React from 'react';
import { DATA_LAST_UPDATED, DATA_SOURCE, SELECTION_METHOD, DATA_NOTE } from '../data/mockProfessors';

export const DataUpdateInfo: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100/50 p-6 space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-1">About This Data</h3>
        <p className="text-sm text-gray-600">{SELECTION_METHOD}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Data Source</p>
          <p className="text-sm text-gray-900">{DATA_SOURCE}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Last Updated</p>
          <p className="text-sm text-gray-900">{DATA_LAST_UPDATED}</p>
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-600 leading-relaxed">{DATA_NOTE}</p>
      </div>
    </div>
  );
};
