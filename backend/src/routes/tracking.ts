
import express from 'express';
import { TrackingService } from '../services/trackingService';

const router = express.Router();

// Get tracking info for a transfer
router.get('/:transferId', (req, res) => {
  try {
    const { transferId } = req.params;
    
    // In a real app, this would fetch from database
    // For demo, we'll generate tracking info
    const trackingInfo = TrackingService.generateTrackingInfo(transferId, 'bank');
    
    res.json(trackingInfo);
  } catch (error) {
    console.error('Tracking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update transfer status (for demo purposes)
router.put('/:transferId/status', (req, res) => {
  try {
    const { transferId } = req.params;
    const { status } = req.body;
    
    const trackingInfo = TrackingService.updateTransferStatus(transferId, status);
    
    res.json(trackingInfo);
  } catch (error) {
    console.error('Status update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export { router as trackingRoutes };
