'use client';

import { usePropertyContext } from '../context/PropertyContext';
import { PropertyProfile } from '../types/property';

export function useProperty(): {
  property: PropertyProfile | null;
  setProperty: (property: PropertyProfile | null) => void;
  isLoaded: boolean;
} {
  const { property, setProperty, isLoaded } = usePropertyContext();
  return { property, setProperty, isLoaded };
}
