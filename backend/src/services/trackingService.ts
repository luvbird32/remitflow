
export interface TrackingInfo {
  id: string;
  status: 'pending' | 'processing' | 'in_transit' | 'delivered' | 'failed';
  createdAt: string;
  updatedAt: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  statusHistory: {
    status: string;
    timestamp: string;
    description: string;
  }[];
}

export class TrackingService {
  static generateTrackingInfo(transferId: string, deliveryMethod: string): TrackingInfo {
    const now = new Date().toISOString();
    
    return {
      id: transferId,
      status: 'pending',
      createdAt: now,
      updatedAt: now,
      estimatedDelivery: this.calculateEstimatedDelivery(deliveryMethod),
      statusHistory: [{
        status: 'pending',
        timestamp: now,
        description: 'Transfer initiated and awaiting processing'
      }]
    };
  }

  static calculateEstimatedDelivery(deliveryMethod: string): string {
    const now = new Date();
    
    switch (deliveryMethod) {
      case 'wallet':
        now.setMinutes(now.getMinutes() + 15);
        break;
      case 'card':
        now.setHours(now.getHours() + 2);
        break;
      case 'bank':
      default:
        now.setDate(now.getDate() + 2);
        break;
    }
    
    return now.toISOString();
  }

  static updateTransferStatus(transferId: string, newStatus: TrackingInfo['status']): TrackingInfo {
    const now = new Date().toISOString();
    
    const statusDescriptions = {
      pending: 'Transfer initiated and awaiting processing',
      processing: 'Transfer is being processed',
      in_transit: 'Transfer is in transit to recipient',
      delivered: 'Transfer has been delivered successfully',
      failed: 'Transfer failed - please contact support'
    };

    return {
      id: transferId,
      status: newStatus,
      createdAt: now,
      updatedAt: now,
      estimatedDelivery: now,
      statusHistory: [{
        status: newStatus,
        timestamp: now,
        description: statusDescriptions[newStatus]
      }]
    };
  }
}
