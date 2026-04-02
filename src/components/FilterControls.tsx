import { useProfessors } from '../hooks/useProfessors';

export function FilterControls() {
  const { schools, subjects, selectedSchool, selectedSubject, selectSchool, selectSubject } =
    useProfessors();

  return (
    <div className="bg-white border-b border-gray-200 p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Filters</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">School</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => selectSchool(null)}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  selectedSchool === null
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Schools
              </button>
              {schools.map(school => (
                <button
                  key={school}
                  onClick={() => selectSchool(school)}
                  className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                    selectedSchool === school
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {school}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Subject</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => selectSubject(null)}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  selectedSubject === null
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Subjects
              </button>
              {subjects.map(subject => (
                <button
                  key={subject}
                  onClick={() => selectSubject(subject)}
                  className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                    selectedSubject === subject
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
