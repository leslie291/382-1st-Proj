import { useProfessors } from '../hooks/useProfessors';

export function FilterControls() {
  const { schools, subjects, selectedSchool, selectedSubject, searchQuery, selectSchool, selectSubject, setSearchQuery } = useProfessors();

  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
          Search Professor
        </label>
        <input
          type="text"
          placeholder="Type a name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      {/* School Selector */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
          Campus
        </label>
        <div className="flex gap-2 flex-wrap">
          {schools.map((school) => (
            <button
              key={school}
              onClick={() => selectSchool(selectedSchool === school ? null : school)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedSchool === school
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {school}
            </button>
          ))}
        </div>
      </div>

      {/* Subject Selector */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
          Subject
        </label>
        <div className="flex gap-2 flex-wrap">
          {subjects.map((subject) => (
            <button
              key={subject}
              onClick={() => selectSubject(selectedSubject === subject ? null : subject)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedSubject === subject
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
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
