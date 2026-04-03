import React from 'react';
import { DATA_LAST_UPDATED, DATA_SOURCE, SELECTION_METHOD, DATA_NOTE } from '../data/mockProfessors';

export const DataUpdateInfo: React.FC = () => {
  return (
    <div className="bg-gray-50/40 border border-gray-200 rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5">
      <div>
        <h3 className="text-sm font-600 text-gray-950 mb-1.5 sm:mb-2">About this data</h3>
        <p className="text-sm text-gray-700 leading-relaxed font-400">{SELECTION_METHOD}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-4 sm:pt-5 border-t border-gray-200">
        <div>
          <p className="text-xs font-600 text-gray-600 uppercase tracking-0.5 mb-1.5">Data Source</p>
          <p className="text-sm font-500 text-gray-950">{DATA_SOURCE}</p>
        </div>
        <div>
          <p className="text-xs font-600 text-gray-600 uppercase tracking-0.5 mb-1.5">Last Updated</p>
          <p className="text-sm font-500 text-gray-950">{DATA_LAST_UPDATED}</p>
        </div>
      </div>

      <div className="pt-4 sm:pt-5 border-t border-gray-200">
        <p className="text-xs text-gray-700 leading-relaxed font-400">{DATA_NOTE}</p>
      </div>
    </div>
  );
};
