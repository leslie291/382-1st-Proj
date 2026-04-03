import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { ProfessorProvider, useProfessors } from '../hooks/useProfessors';

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
    // Should include UW schools
    expect(result.current.schools).toContain('UW Seattle');
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

  it('returns top ranked professors', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ProfessorProvider>{children}</ProfessorProvider>
    );

    const { result } = renderHook(() => useProfessors(), { wrapper });

    expect(result.current.topRanked).toBeDefined();
    expect(Array.isArray(result.current.topRanked)).toBe(true);
    // Should have at most 5 top professors
    expect(result.current.topRanked.length).toBeLessThanOrEqual(5);
    // If there are rankings, they should be scored
    if (result.current.topRanked.length > 0) {
      expect(result.current.topRanked[0].score).toBeDefined();
    }
  });

  it('filters professors by school when selected', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ProfessorProvider>{children}</ProfessorProvider>
    );

    const { result, rerender } = renderHook(() => useProfessors(), { wrapper });

    // Initially, selectedSchool is null (All Schools)
    expect(result.current.selectedSchool).toBeNull();
    const allProfs = result.current.professors.length;
    expect(allProfs).toBeGreaterThan(0);

    // Select MIT
    result.current.selectSchool('MIT');
    rerender();

    // After selecting a school, professors should be filtered
    const mitProfs = result.current.professors;
    // All professors should be from MIT
    expect(mitProfs.every((p) => p.school === 'MIT')).toBe(true);
  });

  it('filters professors by subject when selected', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ProfessorProvider>{children}</ProfessorProvider>
    );

    const { result, rerender } = renderHook(() => useProfessors(), { wrapper });

    // Get available subjects
    const subjects = result.current.subjects;
    if (subjects.length > 0) {
      // Select first subject
      result.current.selectSubject(subjects[0]);
      rerender();

      // All professors should be from that subject
      expect(result.current.professors.every((p) => p.subject === subjects[0])).toBe(true);
    }
  });

  it('searches professors by name', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ProfessorProvider>{children}</ProfessorProvider>
    );

    const { result, rerender } = renderHook(() => useProfessors(), { wrapper });

    // Find a professor name to search for
    const allProfs = result.current.professors;
    if (allProfs.length > 0) {
      const searchName = allProfs[0].name.split(' ')[0]; // First name

      result.current.setSearchQuery(searchName);
      rerender();

      const filtered = result.current.professors;
      // All results should include the search name
      expect(filtered.every((p) => p.name.toLowerCase().includes(searchName.toLowerCase()))).toBe(true);
    }
  });

  it('combines multiple filters correctly', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ProfessorProvider>{children}</ProfessorProvider>
    );

    const { result, rerender } = renderHook(() => useProfessors(), { wrapper });

    const schools = result.current.schools;
    const subjects = result.current.subjects;

    if (schools.length > 0 && subjects.length > 0) {
      result.current.selectSchool(schools[0]);
      result.current.selectSubject(subjects[0]);
      rerender();

      const filtered = result.current.professors;
      // All results should match both school and subject
      expect(
        filtered.every((p) => p.school === schools[0] && p.subject === subjects[0])
      ).toBe(true);
    }
  });

  it('can reset filters by selecting null', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ProfessorProvider>{children}</ProfessorProvider>
    );

    const { result, rerender } = renderHook(() => useProfessors(), { wrapper });

    // Select a school
    result.current.selectSchool('MIT');
    rerender();

    // Reset by selecting null
    result.current.selectSchool(null);
    rerender();

    // Should be back to all professors
    expect(result.current.selectedSchool).toBeNull();
    expect(result.current.professors.length).toBeGreaterThan(0);
  });

  it('updates top ranked when filters change', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ProfessorProvider>{children}</ProfessorProvider>
    );

    const { result, rerender } = renderHook(() => useProfessors(), { wrapper });

    // Change school filter
    result.current.selectSchool('MIT');
    rerender();

    // Top ranked should still be defined
    expect(result.current.topRanked).toBeDefined();
    expect(Array.isArray(result.current.topRanked)).toBe(true);
  });

  it('returns correct professor by ID', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ProfessorProvider>{children}</ProfessorProvider>
    );

    const { result } = renderHook(() => useProfessors(), { wrapper });

    const allProfs = result.current.professors;
    if (allProfs.length > 0) {
      const prof = allProfs[0];
      const found = result.current.getProfessorById(prof.id);

      expect(found).toBeDefined();
      expect(found?.id).toBe(prof.id);
      expect(found?.name).toBe(prof.name);
    }
  });

  it('returns undefined for non-existent professor ID', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ProfessorProvider>{children}</ProfessorProvider>
    );

    const { result } = renderHook(() => useProfessors(), { wrapper });

    const found = result.current.getProfessorById('non-existent-id');
    expect(found).toBeUndefined();
  });

  it('provides loading and error states', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ProfessorProvider>{children}</ProfessorProvider>
    );

    const { result } = renderHook(() => useProfessors(), { wrapper });

    expect(typeof result.current.isLoading).toBe('boolean');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('maintains professor data integrity during filtering', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ProfessorProvider>{children}</ProfessorProvider>
    );

    const { result, rerender } = renderHook(() => useProfessors(), { wrapper });

    // Get total professor count
    const originalProfs = result.current.professors;
    const originalCount = originalProfs.length;

    // Apply filters
    result.current.selectSchool('MIT');
    rerender();

    // Reset filters
    result.current.selectSchool(null);
    rerender();

    // Should be back to original count
    expect(result.current.professors.length).toBeGreaterThanOrEqual(originalCount);
  });

  it('handles case-insensitive search correctly', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ProfessorProvider>{children}</ProfessorProvider>
    );

    const { result, rerender } = renderHook(() => useProfessors(), { wrapper });

    // Find a name to search with different case
    const allProfs = result.current.professors;
    if (allProfs.length > 0) {
      const name = allProfs[0].name;
      const upperCaseName = name.toUpperCase();

      result.current.setSearchQuery(upperCaseName);
      rerender();

      const filtered = result.current.professors;
      // Should find results even with different case
      expect(filtered.length).toBeGreaterThanOrEqual(1);
    }
  });
});
