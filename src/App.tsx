import './App.css';
import { ProfessorProvider } from './hooks/ProfessorProvider';
import { FilterControls } from './components/FilterControls';
import { ProfessorResults } from './components/ProfessorResults';
import { DataUpdateInfo } from './components/DataUpdateInfo';

function App() {
  return (
    <ProfessorProvider>
      <div className="app-container">
        {/* Header */}
        <header className="app-header">
          <h1>Professor Finder</h1>
          <p>Discover top-rated Computer Science professors at UW Bothell</p>
        </header>

        {/* Main content */}
        <main className="main-content">
          {/* Data info section */}
          <section className="section">
            <h2>About This Data</h2>
            <DataUpdateInfo />
          </section>

          {/* Filters section */}
          <section className="section">
            <h2>Find Professors</h2>
            <p>Search, filter, and compare professors</p>
            <FilterControls />
          </section>

          {/* Results section */}
          <section className="section">
            <ProfessorResults />
          </section>
        </main>

        {/* Footer */}
        <footer className="app-footer">
          <p>Data verified from RateMyProfessor.com • Last updated 2026-04-03</p>
        </footer>
      </div>
    </ProfessorProvider>
  );
}

export default App;
