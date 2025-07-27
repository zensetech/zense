/**
 * Pincode Utility Functions
 * 
 * This module provides utility functions for working with pincode data,
 * including search term normalization and filtering functions.
 * 
 * @module data/pincodes/utils
 */

import type { PincodeData } from './types';

/**
 * Normalizes a search term by converting to lowercase and trimming whitespace
 * 
 * @param {string} term - The search term to normalize
 * @returns {string} The normalized search term
 */
export function normalizeSearchTerm(term: string): string {
  return term.toLowerCase().trim();
}

/**
 * Checks if a pincode data item matches a search term
 * 
 * @param {PincodeData} item - The pincode data to check
 * @param {string} searchTerm - The normalized search term
 * @returns {boolean} True if the item matches the search term
 */
export function matchesPincode(item: PincodeData, searchTerm: string): boolean {
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  const matches = {
    pincode: item.pincode.includes(lowerCaseSearchTerm),
    officeName: item.officeName.toLowerCase().includes(lowerCaseSearchTerm),
    district: item.district.toLowerCase().includes(lowerCaseSearchTerm),
    state: item.state.toLowerCase().includes(lowerCaseSearchTerm),
  };
  return Object.values(matches).some(Boolean);
}

/**
 * Filters pincode data based on a search term
 * 
 * @param {PincodeData[]} pincodes - Array of pincode data to filter
 * @param {string} searchTerm - The normalized search term
 * @returns {PincodeData[]} Filtered array of matching pincode data
 */
export function filterPincodes(pincodes: PincodeData[], searchTerm: string): PincodeData[] {
  const results = pincodes
    .filter(item => matchesPincode(item, searchTerm))
    .slice(0, 30);
  return results;
}