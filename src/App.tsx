import { ProfessorProvider } from './hooks/useProfessors';
import { FilterControls } from './components/FilterControls';
import { ProfessorResults } from './components/ProfessorResults';
import { DataUpdateInfo } from './components/DataUpdateInfo';

function App() {
  return (
    <ProfessorProvider>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Header */}
        <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-gray-200/50">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex justify-between items-start gap-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                    Professor Finder
                  </span>
                </div>
                <p className="text-sm text-gray-500">Find the best CS professors at UW Bothell</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          {/* Data Info */}
          <div className="mb-12">
            <DataUpdateInfo />
          </div>

          {/* Filters */}
          <div className="mb-12">
            <FilterControls />
          </div>

          {/* Results */}
          <ProfessorResults />
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200/50 backdrop-blur-md bg-white/50 mt-20">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <p className="text-xs text-gray-500 text-center">
              Data verified from RateMyProfessor.com • Last updated 2026-04-03
            </p>
          </div>
        </footer>
      </div>
    </ProfessorProvider>
  );
}

export default App;
