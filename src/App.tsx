import { ProfessorProvider } from './hooks/ProfessorProvider';
import { FilterControls } from './components/FilterControls';
import { ProfessorResults } from './components/ProfessorResults';
import { DataUpdateInfo } from './components/DataUpdateInfo';

function App() {
  return (
    <ProfessorProvider>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6 sm:py-8">
              <div className="flex flex-col gap-1 sm:gap-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-700 text-gray-950 tracking-tight leading-tight">
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
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Data info section */}
          <section className="py-8 sm:py-10 md:py-12">
            <DataUpdateInfo />
          </section>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

          {/* Filters section */}
          <section className="py-8 sm:py-10 md:py-12">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-700 text-gray-950">Find Professors</h2>
              <p className="text-sm text-gray-600 font-400 mt-1">Search, filter, and compare professors</p>
            </div>
            <FilterControls />
          </section>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

          {/* Results section */}
          <section className="py-8 sm:py-10 md:py-12">
            <ProfessorResults />
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-100 bg-gray-50/30 mt-12 sm:mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600 text-center">
              <span className="font-500">Data verified from RateMyProfessor.com</span>
              <span className="hidden sm:inline text-gray-300">•</span>
              <span className="font-500">Last updated 2026-04-03</span>
            </div>
          </div>
        </footer>
      </div>
    </ProfessorProvider>
  );
}

export default App;
