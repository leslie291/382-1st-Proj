import { useState } from 'react';
import type { Professor } from '../types/professor';
import { mockProfessors } from '../data/mockProfessors';
import { rankProfessors, getTopProfessors } from '../utils/rankingEngine';
import { ProfessorContext, type ProfessorProviderProps } from '../context/ProfessorContext';

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
  const rankings = rankProfessors(filteredProfessors);
  const topRankings = getTopProfessors(rankings, 5);
  const topRanked = topRankings
    .map(ranking => mockProfessors.find(p => p.id === ranking.professorId))
    .filter((p): p is Professor => p !== undefined);

  const selectSchool = (school: string | null) => {
    setSelectedSchool(school);
  };

  const selectSubject = (subject: string | null) => {
    setSelectedSubject(subject);
  };

  const getProfessorById = (id: string) => {
    return mockProfessors.find(p => p.id === id);
  };

  const value = {
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
