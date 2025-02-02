import { createContext, useContext } from 'react';

// Create and export the context
export const PrayerContext = createContext();

// Optional: Export a custom hook for using the context
export const usePrayerContext = () => {
  const context = useContext(PrayerContext);
  if (!context) {
    throw new Error('usePrayerContext must be used within a PrayerProvider');
  }
  return context;
};