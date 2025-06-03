
/**
 * Transfer ID Service for generating and managing unique transfer identifiers
 * 
 * This service provides utilities for creating, validating, and extracting
 * information from transfer IDs used throughout the remittance system.
 * 
 * Transfer ID Format: TXN{timestamp}{randomString}
 * Example: TXN1734123456789abc123def
 */
export class TransferIdService {
  
  /**
   * Generates a unique transfer ID
   * 
   * The generated ID follows the pattern: TXN{timestamp}{randomString}
   * where:
   * - TXN is a fixed prefix for easy identification
   * - timestamp is the current time in milliseconds for uniqueness and ordering
   * - randomString is a 9-character alphanumeric string for additional entropy
   * 
   * @returns {string} A unique transfer ID
   * @example
   * // Returns something like: "TXN1734123456789abc123def"
   * const transferId = TransferIdService.generateId();
   */
  static generateId(): string {
    return 'TXN' + Date.now() + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Validates the format of a transfer ID
   * 
   * Checks if the provided ID matches the expected format:
   * - Starts with "TXN"
   * - Followed by 13 digits (timestamp)
   * - Followed by 9 alphanumeric characters
   * 
   * @param {string} id - The transfer ID to validate
   * @returns {boolean} True if the ID format is valid, false otherwise
   * @example
   * TransferIdService.validateId("TXN1734123456789abc123def"); // true
   * TransferIdService.validateId("INVALID123"); // false
   */
  static validateId(id: string): boolean {
    return /^TXN\d+[a-z0-9]{9}$/.test(id);
  }

  /**
   * Extracts the timestamp from a transfer ID
   * 
   * Parses the timestamp portion of a transfer ID and converts it
   * back to a Date object. This is useful for:
   * - Determining when a transfer was created
   * - Sorting transfers by creation time
   * - Audit logging and analytics
   * 
   * @param {string} id - The transfer ID to extract timestamp from
   * @returns {Date | null} The timestamp as a Date object, or null if extraction fails
   * @example
   * const date = TransferIdService.extractTimestamp("TXN1734123456789abc123def");
   * console.log(date); // Date object representing the creation time
   */
  static extractTimestamp(id: string): Date | null {
    try {
      // Remove the "TXN" prefix and extract the timestamp portion
      const timestampStr = id.replace('TXN', '').slice(0, 13);
      const timestamp = parseInt(timestampStr);
      
      // Validate that we got a valid timestamp
      if (isNaN(timestamp)) {
        return null;
      }
      
      return new Date(timestamp);
    } catch {
      return null;
    }
  }
}
