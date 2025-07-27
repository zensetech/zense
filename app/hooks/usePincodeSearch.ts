/**
 * Custom hook for pincode search functionality
 * 
 * This hook provides real-time search capabilities for pincodes, including
 * debounced search, loading states, and error handling.
 * 
 * @module hooks/usePincodeSearch
 */

import { useState, useEffect } from 'react';
import { searchPincodes } from '@/app/data/pincodes/search';
import type { PincodeData } from '@/app/data/pincodes/types';

interface UsePincodeSearchResult {
  results: PincodeData[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook for searching pincodes with debounced input
 * 
 * @param {string} query - Search query string
 * @returns {UsePincodeSearchResult} Search results, loading state, and error state
 * 
 * @example
 * ```tsx
 * const { results, isLoading, error } = usePincodeSearch(searchQuery);
 * ```
 */
export function usePincodeSearch(query: string): UsePincodeSearchResult {
  const [results, setResults] = useState<PincodeData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const DEBOUNCE_MS = 300;

    const fetchResults = () => {
      if (query.length < 3) {
        setResults([]);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const { results } = searchPincodes(query);
        
        if (isMounted) {
          setResults(results);
        }
      } catch (err) {
        console.error('Search error:', err);
        if (isMounted) {
          setError('Failed to fetch results');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    const timeoutId = setTimeout(fetchResults, DEBOUNCE_MS);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [query]);

  return { results, isLoading, error };
}