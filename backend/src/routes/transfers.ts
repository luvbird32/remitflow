
import express from 'express';
import { TransferService } from '../services/transferService';
import { TransferRequest, TransferResponse } from '../types/transfer';

const router = express.Router();

// In-memory storage for demo (replace with database in production)
const transfers: Map<string, TransferRequest> = new Map();

// Create a new transfer
router.post('/', async (req, res) => {
  try {
    const transferData: TransferRequest = req.body;
    
    // Validate transfer data
    const validationErrors = TransferService.validateTransfer(transferData);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }

    // Generate transfer ID and process
    const transferId = TransferService.generateTransferId();
    const convertedAmount = TransferService.calculateConvertedAmount(
      transferData.amount, 
      transferData.fromCurrency, 
      transferData.toCurrency
    );
    const fee = TransferService.calculateFee(transferData.amount, transferData.deliveryMethod);
    const totalAmount = (parseFloat(transferData.amount) + fee).toFixed(2);
    const estimatedDelivery = TransferService.getEstimatedDelivery(transferData.deliveryMethod);

    // Store transfer
    const transfer: TransferRequest = {
      ...transferData,
      id: transferId,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    transfers.set(transferId, transfer);

    // Simulate processing delay
    setTimeout(() => {
      const storedTransfer = transfers.get(transferId);
      if (storedTransfer) {
        storedTransfer.status = 'completed';
        storedTransfer.updatedAt = new Date().toISOString();
        transfers.set(transferId, storedTransfer);
      }
    }, 2000);

    const response: TransferResponse = {
      id: transferId,
      status: 'pending',
      convertedAmount,
      fee,
      totalAmount,
      estimatedDelivery
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Transfer creation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get transfer by ID
router.get('/:id', (req, res) => {
  const transfer = transfers.get(req.params.id);
  if (!transfer) {
    return res.status(404).json({ error: 'Transfer not found' });
  }
  res.json(transfer);
});

// Get all transfers (for demo purposes)
router.get('/', (req, res) => {
  const allTransfers = Array.from(transfers.values());
  res.json(allTransfers);
});

// Calculate transfer preview
router.post('/preview', (req, res) => {
  try {
    const { amount, fromCurrency, toCurrency, deliveryMethod } = req.body;
    
    if (!amount || !fromCurrency || !toCurrency || !deliveryMethod) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const convertedAmount = TransferService.calculateConvertedAmount(amount, fromCurrency, toCurrency);
    const fee = TransferService.calculateFee(amount, deliveryMethod);
    const totalAmount = (parseFloat(amount) + fee).toFixed(2);
    const estimatedDelivery = TransferService.getEstimatedDelivery(deliveryMethod);

    res.json({
      convertedAmount,
      fee,
      totalAmount,
      estimatedDelivery
    });
  } catch (error) {
    console.error('Preview calculation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export { router as transferRoutes };
