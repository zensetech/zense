/**
 * Pincode Data Management Module
 * 
 * This module provides functions for accessing and searching pincode data.
 * It includes utilities for retrieving all pincodes and searching through them.
 * 
 * @module data/pincodes
 */

import { pincodesByState } from './pincodesByState';
import { normalizeSearchTerm, filterPincodes } from './utils';
import type { PincodeData } from './types';

/**
 * Retrieves all available pincodes
 * 
 * @returns {PincodeData[]} Array of all pincode data
 */
export function getAllPincodes(): PincodeData[] {
  try {
    const pincodes = Object.values(pincodesByState).flat();
    return pincodes;
  } catch (error) {
    console.error('Error getting all pincodes:', error);
    return [];
  }
}

/**
 * Searches pincodes based on a query string
 * 
 * @param {string} query - Search query string
 * @returns {PincodeData[]} Array of matching pincode data
 */
export function searchPincodes(query: string): PincodeData[] {
  try {
    if (!query?.trim() || query.length < 3) {
      console.log('Invalid query, returning empty results');
      return [];
    }

    const searchTerm = normalizeSearchTerm(query);
    const allPincodes = getAllPincodes();
    
    const results = filterPincodes(allPincodes, searchTerm);
    
    return results;
  } catch (error) {
    console.error('Error searching pincodes:', error);
    return [];
  }
}