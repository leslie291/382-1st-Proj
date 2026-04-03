import type { ReactNode } from 'react';
import { createContext } from 'react';
import type { Professor } from '../types/professor';

export interface ProfessorContextType {
  professors: Professor[];
  schools: string[];
  subjects: string[];
  selectedSchool: string | null;
  selectedSubject: string | null;
  searchQuery: string;
  topRanked: Professor[];
  isLoading: boolean;
  error: string | null;
  selectSchool: (school: string | null) => void;
  selectSubject: (subject: string | null) => void;
  setSearchQuery: (query: string) => void;
  getProfessorById: (id: string) => Professor | undefined;
}

export interface ProfessorProviderProps {
  children: ReactNode;
}

export const ProfessorContext = createContext<ProfessorContextType | undefined>(undefined);
