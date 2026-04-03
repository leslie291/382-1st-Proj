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
    <div>
      {/* Search Input */}
      <div className="search-input">
        <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search by professor name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Campus Filter */}
      <div className="filter-section">
        <label className="filter-label">Campus</label>
        <div className="filter-buttons">
          {schools.map((school) => (
            <button
              key={school}
              onClick={() => selectSchool(selectedSchool === school ? null : school)}
              className={`filter-button ${selectedSchool === school ? 'active' : ''}`}
            >
              {school}
            </button>
          ))}
        </div>
      </div>

      {/* Subject Filter */}
      <div className="filter-section">
        <label className="filter-label">Subject</label>
        <div className="filter-buttons">
          {subjects.map((subject) => (
            <button
              key={subject}
              onClick={() => selectSubject(selectedSubject === subject ? null : subject)}
              className={`filter-button ${selectedSubject === subject ? 'active' : ''}`}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
