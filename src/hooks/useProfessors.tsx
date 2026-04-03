import { useContext } from 'react';
import { ProfessorContext, type ProfessorContextType } from '../context/ProfessorContext';

export function useProfessors(): ProfessorContextType {
  const context = useContext(ProfessorContext);
  if (!context) {
    throw new Error('useProfessors must be used within ProfessorProvider');
  }
  return context;
}
