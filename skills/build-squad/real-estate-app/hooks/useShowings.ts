'use client';

import { useLocalStorage } from './useLocalStorage';
import { Showing } from '../types/showing';

export function useShowings() {
  const [showings, setShowings] = useLocalStorage<Showing[]>('via_showings', []);

  const addShowing = (showing: Omit<Showing, 'id'>) => {
    const newShowing: Showing = {
      ...showing,
      id: crypto.randomUUID(),
    };
    setShowings([...showings, newShowing]);
    return newShowing;
  };

  const updateShowing = (id: string, updates: Partial<Omit<Showing, 'id'>>) => {
    setShowings(
      showings.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const removeShowing = (id: string) => {
    setShowings(showings.filter((s) => s.id !== id));
  };

  const getShowing = (id: string): Showing | undefined => {
    return showings.find((s) => s.id === id);
  };

  return {
    showings,
    addShowing,
    updateShowing,
    removeShowing,
    getShowing,
  };
}
