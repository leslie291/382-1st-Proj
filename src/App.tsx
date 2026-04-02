import { ProfessorProvider } from './hooks/useProfessors';
import { FilterControls } from './components/FilterControls';
import { ProfessorResults } from './components/ProfessorResults';
import { RatingDistribution } from './components/RatingDistribution';
import { HowRankingsWork } from './components/HowRankingsWork';

function App() {
  return (
    <ProfessorProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">STEM Professor Finder</h1>
              <p className="text-gray-600 mt-1">Find top-rated professors by school and subject</p>
            </div>
            <div className="mt-1">
              <HowRankingsWork />
            </div>
          </div>
        </header>

        <FilterControls />

        <main>
          <RatingDistribution />
          <ProfessorResults />
        </main>

        <footer className="bg-white border-t border-gray-200 py-6 mt-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-sm text-gray-600">
              STEM Professor Finder • Powered by student reviews and intelligent ranking
            </p>
          </div>
        </footer>
      </div>
    </ProfessorProvider>
  );
}

export default App;
