import { ProfessorProvider } from './hooks/useProfessors';
import { FilterControls } from './components/FilterControls';
import { ProfessorResults } from './components/ProfessorResults';
import { DataUpdateInfo } from './components/DataUpdateInfo';

function App() {
  return (
    <ProfessorProvider>
      <div className="min-h-screen bg-white">
        {/* Header - Premium minimalist */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6 sm:py-8">
              <div className="flex flex-col gap-1 sm:gap-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-700 text-gray-950 tracking-tight leading-tight">
                  Professor Finder
                </h1>
                <p className="text-sm sm:text-base text-gray-600 font-400">
                  Discover top-rated Computer Science professors at UW Bothell
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Data info section */}
          <section className="py-8 sm:py-10">
            <DataUpdateInfo />
          </section>

          {/* Filters section */}
          <section className="py-8 sm:py-10 border-t border-gray-200">
            <h2 className="text-base sm:text-lg font-600 text-gray-950 mb-6">Find professors</h2>
            <FilterControls />
          </section>

          {/* Results section */}
          <section className="py-10 sm:py-12 border-t border-gray-200">
            <ProfessorResults />
          </section>
        </main>

        {/* Footer - Clean and minimal */}
        <footer className="border-t border-gray-200 bg-gray-50/30 mt-12 sm:mt-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <p className="text-xs sm:text-sm text-gray-600 text-center font-400">
              Verified with RateMyProfessor.com
              <span className="mx-1.5 sm:mx-2">•</span>
              Updated 2026-04-03
            </p>
          </div>
        </footer>
      </div>
    </ProfessorProvider>
  );
}

export default App;
