import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';
import type { Professor, RankingScore } from '../types/professor';
import { mockProfessors } from '../data/mockProfessors';
import { rankProfessors, getTopProfessors } from '../utils/rankingEngine';

interface ProfessorContextType {
  professors: Professor[];
  schools: string[];
  subjects: string[];
  selectedSchool: string | null;
  selectedSubject: string | null;
  searchQuery: string;
  topRanked: RankingScore[];
  isLoading: boolean;
  error: string | null;
  selectSchool: (school: string | null) => void;
  selectSubject: (subject: string | null) => void;
  setSearchQuery: (query: string) => void;
  getProfessorById: (id: string) => Professor | undefined;
}

const ProfessorContext = createContext<ProfessorContextType | undefined>(undefined);

interface ProfessorProviderProps {
  children: ReactNode;
}

export function ProfessorProvider({ children }: ProfessorProviderProps) {
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);

  // Extract unique schools and subjects from mock data
  const schools = Array.from(new Set(mockProfessors.map(p => p.school)));
  const subjects = Array.from(new Set(mockProfessors.map(p => p.subject)));

  // Filter professors based on selections and search query
  const filteredProfessors = mockProfessors.filter(prof => {
    if (selectedSchool && prof.school !== selectedSchool) return false;
    if (selectedSubject && prof.subject !== selectedSubject) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!prof.name.toLowerCase().includes(query)) return false;
    }
    return true;
  });

  // Rank and get top professors
  const topRanked = getTopProfessors(rankProfessors(filteredProfessors), 5);

  const selectSchool = (school: string | null) => {
    setSelectedSchool(school);
  };

  const selectSubject = (subject: string | null) => {
    setSelectedSubject(subject);
  };

  const getProfessorById = (id: string) => {
    return mockProfessors.find(p => p.id === id);
  };

  const value: ProfessorContextType = {
    professors: filteredProfessors,
    schools,
    subjects,
    selectedSchool,
    selectedSubject,
    searchQuery,
    topRanked,
    isLoading,
    error,
    selectSchool,
    selectSubject,
    setSearchQuery,
    getProfessorById,
  };

  return (
    <ProfessorContext.Provider value={value}>
      {children}
    </ProfessorContext.Provider>
  );
}

export function useProfessors() {
  const context = useContext(ProfessorContext);
  if (!context) {
    throw new Error('useProfessors must be used within ProfessorProvider');
  }
  return context;
}
