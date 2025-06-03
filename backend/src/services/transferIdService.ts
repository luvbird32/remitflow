
export class TransferIdService {
  static generateId(): string {
    return 'TXN' + Date.now() + Math.random().toString(36).substr(2, 9);
  }

  static validateId(id: string): boolean {
    return /^TXN\d+[a-z0-9]{9}$/.test(id);
  }

  static extractTimestamp(id: string): Date | null {
    try {
      const timestampStr = id.replace('TXN', '').slice(0, 13);
      const timestamp = parseInt(timestampStr);
      return new Date(timestamp);
    } catch {
      return null;
    }
  }
}
