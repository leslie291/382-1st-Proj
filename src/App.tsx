import { ProfessorProvider } from './hooks/useProfessors';
import { FilterControls } from './components/FilterControls';
import { ProfessorResults } from './components/ProfessorResults';
import { DataUpdateInfo } from './components/DataUpdateInfo';

function App() {
  return (
    <ProfessorProvider>
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-900/5 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6 sm:py-8">
              <div className="space-y-1">
                <h1 className="text-5xl sm:text-6xl font-700 text-gray-950 tracking-tight">
                  Professor Finder
                </h1>
                <p className="text-lg text-gray-500">
                  Discover top-rated Computer Science professors at UW Bothell
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Data Info */}
            <section className="pt-12 sm:pt-16 pb-8">
              <DataUpdateInfo />
            </section>

            {/* Filters */}
            <section className="pt-8 sm:pt-12 pb-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-sm font-600 text-gray-900 uppercase tracking-wide mb-6">
                    Find Professors
                  </h2>
                  <FilterControls />
                </div>
              </div>
            </section>

            {/* Results */}
            <section className="py-12 sm:py-16">
              <ProfessorResults />
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-900/5 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="text-center space-y-3">
              <p className="text-sm text-gray-600">
                Data verified from <span className="font-500">RateMyProfessor.com</span>
              </p>
              <p className="text-xs text-gray-500">
                Last updated: April 3, 2026
              </p>
            </div>
          </div>
        </footer>
      </div>
    </ProfessorProvider>
  );
}

export default App;
