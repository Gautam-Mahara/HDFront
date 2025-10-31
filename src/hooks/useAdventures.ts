// hooks/useAdventures.ts
import { useState, useEffect } from 'react';
import type { Adventure } from '../types/adventure';
import { adventureService } from '../services/adventureService';

export const useAdventures = () => {
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAdventures = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adventureService.getAdventures();
      setAdventures(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdventures();
  }, []);

  const refetch = () => {
    fetchAdventures();
  };

  return { adventures, loading, error, refetch };
};