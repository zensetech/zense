/**
 * Pincode Type Definitions
 * 
 * This module defines the TypeScript types used throughout the pincode
 * search functionality.
 * 
 * @module data/pincodes/types
 */

/**
 * Represents a single pincode entry with its associated data
 */
export interface PincodeData {
  /** The 6-digit pincode */
  pincode: string;
  /** Name of the post office or area */
  officeName: string;
  /** District where the pincode is located */
  district: string;
  /** State where the pincode is located */
  state: string;
}

/**
 * Represents the result of a pincode search operation
 */
export interface SearchResult {
  /** Array of matching pincode data */
  results: PincodeData[];
  /** Total number of matches found */
  total: number;
}