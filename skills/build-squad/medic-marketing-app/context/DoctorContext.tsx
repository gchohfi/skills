'use client';

import { createContext, useContext, ReactNode } from 'react';
import { DoctorProfile } from '@/types/doctor';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface DoctorContextType {
  doctor: DoctorProfile | null;
  setDoctor: (doctor: DoctorProfile) => void;
  clearDoctor: () => void;
}

const DoctorContext = createContext<DoctorContextType>({
  doctor: null,
  setDoctor: () => {},
  clearDoctor: () => {},
});

export function DoctorProvider({ children }: { children: ReactNode }) {
  const [doctor, setDoctorStorage] = useLocalStorage<DoctorProfile | null>('medic_doctor', null);

  function setDoctor(d: DoctorProfile) {
    setDoctorStorage(d);
  }

  function clearDoctor() {
    setDoctorStorage(null);
  }

  return (
    <DoctorContext.Provider value={{ doctor, setDoctor, clearDoctor }}>
      {children}
    </DoctorContext.Provider>
  );
}

export function useDoctor() {
  return useContext(DoctorContext);
}
