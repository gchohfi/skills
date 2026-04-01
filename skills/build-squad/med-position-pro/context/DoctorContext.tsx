'use client';
import { createContext, useContext, ReactNode } from 'react';
import { DoctorProfile } from '@/types/doctor';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface DoctorContextType { doctor: DoctorProfile | null; setDoctor: (d: DoctorProfile) => void; clearDoctor: () => void; }

const DoctorContext = createContext<DoctorContextType>({ doctor: null, setDoctor: () => {}, clearDoctor: () => {} });

export function DoctorProvider({ children }: { children: ReactNode }) {
  const [doctor, setDoctorStorage] = useLocalStorage<DoctorProfile | null>('mpp_doctor', null);
  return (
    <DoctorContext.Provider value={{ doctor, setDoctor: setDoctorStorage, clearDoctor: () => setDoctorStorage(null) }}>
      {children}
    </DoctorContext.Provider>
  );
}

export function useDoctor() { return useContext(DoctorContext); }
