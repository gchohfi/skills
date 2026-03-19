'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { PropertyProfile } from '../types/property';

const STORAGE_KEY = 'via_property';

interface PropertyContextValue {
  property: PropertyProfile | null;
  setProperty: (property: PropertyProfile | null) => void;
  isLoaded: boolean;
}

const PropertyContext = createContext<PropertyContextValue>({
  property: null,
  setProperty: () => {},
  isLoaded: false,
});

export function PropertyProvider({ children }: { children: React.ReactNode }) {
  const [property, setPropertyState] = useState<PropertyProfile | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setPropertyState(JSON.parse(stored));
      }
    } catch {
      // ignore parse errors
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const setProperty = (value: PropertyProfile | null) => {
    setPropertyState(value);
    try {
      if (value === null) {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
      }
    } catch {
      // ignore storage errors
    }
  };

  return (
    <PropertyContext.Provider value={{ property, setProperty, isLoaded }}>
      {children}
    </PropertyContext.Provider>
  );
}

export function usePropertyContext(): PropertyContextValue {
  return useContext(PropertyContext);
}
