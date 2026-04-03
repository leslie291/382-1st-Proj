import { useProfessors } from '../hooks/useProfessors';

export function FilterControls() {
  const {
    schools,
    subjects,
    selectedSchool,
    selectedSubject,
    searchQuery,
    selectSchool,
    selectSubject,
    setSearchQuery,
  } = useProfessors();

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Search Input */}
      <div>
        <label className="block text-sm font-700 text-gray-950 mb-2.5 sm:mb-3">Search by name</label>
        <div className="relative">
          <svg className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="e.g. Munehiro Fukuda"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-950 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:border-transparent transition-all font-400 text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Campus Filter */}
      <div>
        <label className="block text-sm font-700 text-gray-950 mb-3">Campus</label>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {schools.map((school) => (
            <button
              key={school}
              onClick={() => selectSchool(selectedSchool === school ? null : school)}
              className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-600 transition-all duration-150 ${
                selectedSchool === school
                  ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50/50'
              }`}
            >
              {school}
            </button>
          ))}
        </div>
      </div>

      {/* Subject Filter */}
      <div>
        <label className="block text-sm font-700 text-gray-950 mb-3">Subject</label>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {subjects.map((subject) => (
            <button
              key={subject}
              onClick={() => selectSubject(selectedSubject === subject ? null : subject)}
              className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-600 transition-all duration-150 ${
                selectedSubject === subject
                  ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50/50'
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
