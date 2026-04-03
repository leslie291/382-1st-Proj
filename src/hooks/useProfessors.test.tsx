import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { ProfessorProvider } from './ProfessorProvider';
import { useProfessors } from './useProfessors';

describe('ProfessorProvider & useProfessors integration', () => {
  it('provides professors data from mock data', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ProfessorProvider>{children}</ProfessorProvider>
    );

    const { result } = renderHook(() => useProfessors(), { wrapper });

    expect(result.current.professors).toBeDefined();
    expect(Array.isArray(result.current.professors)).toBe(true);
    expect(result.current.professors.length).toBeGreaterThan(0);
  });

  it('provides available schools', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ProfessorProvider>{children}</ProfessorProvider>
    );

    const { result } = renderHook(() => useProfessors(), { wrapper });

    expect(result.current.schools).toBeDefined();
    expect(Array.isArray(result.current.schools)).toBe(true);
    expect(result.current.schools.length).toBeGreaterThan(0);
    // Should include UW Bothell (from mock data)
    expect(result.current.schools).toContain('UW Bothell');
  });

  it('provides available subjects', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ProfessorProvider>{children}</ProfessorProvider>
    );

    const { result } = renderHook(() => useProfessors(), { wrapper });

    expect(result.current.subjects).toBeDefined();
    expect(Array.isArray(result.current.subjects)).toBe(true);
    expect(result.current.subjects.length).toBeGreaterThan(0);
  });

  it('returns top 5 ranked professors', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ProfessorProvider>{children}</ProfessorProvider>
    );

    const { result } = renderHook(() => useProfessors(), { wrapper });

    expect(result.current.topRanked).toBeDefined();
    expect(Array.isArray(result.current.topRanked)).toBe(true);
    // Should have at most 5 top professors
    expect(result.current.topRanked.length).toBeLessThanOrEqual(5);
    // If there are rankings, they should have professor data
    if (result.current.topRanked.length > 0) {
      expect(result.current.topRanked[0].name).toBeDefined();
      expect(result.current.topRanked[0].rating).toBeDefined();
    }
  });

  it('filters professors by school when selected', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ProfessorProvider>{children}</ProfessorProvider>
    );

    const { result, rerender } = renderHook(() => useProfessors(), { wrapper });

    // Initially all professors
    const initialCount = result.current.professors.length;

    // Select a specific school
    result.current.selectSchool('UW Bothell');
    rerender();

    // After school selection, should filter to only that school
    expect(result.current.professors.every(p => p.school === 'UW Bothell')).toBe(true);
    expect(result.current.professors.length).toBeLessThanOrEqual(initialCount);
  });

  it('filters professors by subject when selected', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ProfessorProvider>{children}</ProfessorProvider>
    );

    const { result, rerender } = renderHook(() => useProfessors(), { wrapper });

    // Get first available subject
    const subject = result.current.subjects[0];

    // Select that subject
    result.current.selectSubject(subject);
    rerender();

    // After subject selection, should filter to only that subject
    expect(result.current.professors.every(p => p.subject === subject)).toBe(true);
  });

  it('filters professors by search query', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ProfessorProvider>{children}</ProfessorProvider>
    );

    const { result, rerender } = renderHook(() => useProfessors(), { wrapper });

    // Search for a specific professor by name
    result.current.setSearchQuery('Fukuda');
    rerender();

    // After search, should only have professors matching the query
    expect(result.current.professors.every(p => 
      p.name.toLowerCase().includes('fukuda')
    )).toBe(true);
  });

  it('maintains professor data integrity during filtering', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ProfessorProvider>{children}</ProfessorProvider>
    );

    const { result, rerender } = renderHook(() => useProfessors(), { wrapper });

    result.current.selectSchool('UW Bothell');
    rerender();

    // Check that professor objects maintain all fields
    if (result.current.professors.length > 0) {
      const prof = result.current.professors[0];
      expect(prof.id).toBeDefined();
      expect(prof.name).toBeDefined();
      expect(prof.school).toBeDefined();
      expect(prof.subject).toBeDefined();
      expect(prof.rating).toBeDefined();
      expect(prof.ratingCount).toBeDefined();
    }
  });

  it('handles case-insensitive search correctly', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ProfessorProvider>{children}</ProfessorProvider>
    );

    const { result, rerender } = renderHook(() => useProfessors(), { wrapper });

    // Search with lowercase
    result.current.setSearchQuery('kim');
    rerender();
    const lowercaseResults = result.current.professors.length;

    // Search with uppercase - should be same result
    result.current.setSearchQuery('KIM');
    rerender();
    const uppercaseResults = result.current.professors.length;

    expect(lowercaseResults).toBe(uppercaseResults);
  });

  it('clears filters when selection is null', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ProfessorProvider>{children}</ProfessorProvider>
    );

    const { result, rerender } = renderHook(() => useProfessors(), { wrapper });

    const initialCount = result.current.professors.length;

    // Select school
    result.current.selectSchool('UW Bothell');
    rerender();

    // Clear selection by passing null
    result.current.selectSchool(null);
    rerender();

    // Should be back to initial count
    expect(result.current.professors.length).toBe(initialCount);
  });
});
