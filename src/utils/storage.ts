/**
 * Safe localStorage wrapper that handles SecurityError gracefully
 */
export class SafeStorage {
  private static isAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  static getItem(key: string): string | null {
    if (!this.isAvailable()) {
      console.warn('localStorage is not available, returning null for key:', key);
      return null;
    }
    
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  }

  static setItem(key: string, value: string): boolean {
    if (!this.isAvailable()) {
      console.warn('localStorage is not available, cannot set key:', key);
      return false;
    }
    
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      return false;
    }
  }

  static removeItem(key: string): boolean {
    if (!this.isAvailable()) {
      console.warn('localStorage is not available, cannot remove key:', key);
      return false;
    }
    
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  }
}