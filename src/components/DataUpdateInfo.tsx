import React from 'react';
import { DATA_LAST_UPDATED, DATA_SOURCE, SELECTION_METHOD, DATA_NOTE } from '../data/mockProfessors';

export const DataUpdateInfo: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-900/10 p-8 sm:p-10">
      <div className="space-y-6">
        {/* Title */}
        <div>
          <h3 className="text-base font-600 text-gray-950 mb-2">About This Data</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{SELECTION_METHOD}</p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-6 border-t border-gray-900/10">
          <div>
            <p className="text-xs font-600 text-gray-500 uppercase tracking-wider mb-2">
              Source
            </p>
            <p className="text-sm font-500 text-gray-950">{DATA_SOURCE}</p>
          </div>
          <div>
            <p className="text-xs font-600 text-gray-500 uppercase tracking-wider mb-2">
              Updated
            </p>
            <p className="text-sm font-500 text-gray-950">{DATA_LAST_UPDATED}</p>
          </div>
          <div>
            <p className="text-xs font-600 text-gray-500 uppercase tracking-wider mb-2">
              Professors
            </p>
            <p className="text-sm font-500 text-gray-950">5 Hand-Picked</p>
          </div>
        </div>

        {/* Note */}
        <div className="pt-4 border-t border-gray-900/10">
          <p className="text-xs text-gray-600 leading-relaxed">{DATA_NOTE}</p>
        </div>
      </div>
    </div>
  );
};
