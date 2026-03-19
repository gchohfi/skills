'use client';

import { useLocalStorage } from './useLocalStorage';
import { Offer } from '../types/offer';

export function useOffers() {
  const [offers, setOffers] = useLocalStorage<Offer[]>('via_offers', []);

  const addOffer = (offer: Omit<Offer, 'id' | 'dataCriacao'>) => {
    const newOffer: Offer = {
      ...offer,
      id: crypto.randomUUID(),
      dataCriacao: new Date().toISOString(),
    };
    setOffers([...offers, newOffer]);
    return newOffer;
  };

  const updateOffer = (id: string, updates: Partial<Omit<Offer, 'id'>>) => {
    setOffers(
      offers.map((o) => (o.id === id ? { ...o, ...updates } : o))
    );
  };

  const removeOffer = (id: string) => {
    setOffers(offers.filter((o) => o.id !== id));
  };

  const getOffer = (id: string): Offer | undefined => {
    return offers.find((o) => o.id === id);
  };

  return {
    offers,
    addOffer,
    updateOffer,
    removeOffer,
    getOffer,
  };
}
