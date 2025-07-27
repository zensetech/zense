import { pincodesByState } from './pincodesByState';
import { filterPincodes } from './utils';
import type { PincodeData, SearchResult } from './types';

export function getAllPincodes(): PincodeData[] {
  return Object.values(pincodesByState).flat();
}

export function searchPincodes(query: string): SearchResult {
  try {
    if (!query?.trim() || query.length < 3) {
      return { results: [], total: 0 };
    }

    const allPincodes = getAllPincodes();
    const results = filterPincodes(allPincodes, query);

    return {
      results,
      total: results.length
    };
  } catch (error) {
    console.error('Error searching pincodes:', error);
    return { results: [], total: 0 };
  }
}