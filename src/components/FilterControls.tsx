import { useProfessors } from '../hooks/useProfessors';

export function FilterControls() {
  const { schools, subjects, selectedSchool, selectedSubject, searchQuery, selectSchool, selectSubject, setSearchQuery } = useProfessors();

  return (
    <div className="space-y-6">
      {/* Search Field */}
      <div>
        <label className="block text-xs font-600 text-gray-900 uppercase tracking-wider mb-3">
          Search by Name
        </label>
        <input
          type="text"
          placeholder="e.g. Joanna Wang"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white border border-gray-900/10 text-gray-950 placeholder-gray-400 text-sm font-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
        />
      </div>

      {/* Campus Filter */}
      <div>
        <label className="block text-xs font-600 text-gray-900 uppercase tracking-wider mb-3">
          Campus
        </label>
        <div className="flex gap-3 flex-wrap">
          {schools.map((school) => (
            <button
              key={school}
              onClick={() => selectSchool(selectedSchool === school ? null : school)}
              className={`px-4 py-2 rounded-lg text-sm font-500 transition-all duration-200 ${
                selectedSchool === school
                  ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700'
                  : 'bg-white border border-gray-900/10 text-gray-700 hover:bg-gray-50/50 hover:border-gray-900/20'
              }`}
            >
              {school}
            </button>
          ))}
        </div>
      </div>

      {/* Subject Filter */}
      <div>
        <label className="block text-xs font-600 text-gray-900 uppercase tracking-wider mb-3">
          Subject
        </label>
        <div className="flex gap-3 flex-wrap">
          {subjects.map((subject) => (
            <button
              key={subject}
              onClick={() => selectSubject(selectedSubject === subject ? null : subject)}
              className={`px-4 py-2 rounded-lg text-sm font-500 transition-all duration-200 ${
                selectedSubject === subject
                  ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700'
                  : 'bg-white border border-gray-900/10 text-gray-700 hover:bg-gray-50/50 hover:border-gray-900/20'
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
