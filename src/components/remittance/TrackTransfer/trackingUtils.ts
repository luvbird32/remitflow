
import { CheckCircle, Clock, Package, Truck } from "lucide-react"

/**
 * Tracking Utilities
 * 
 * A collection of utility functions and data for the transfer tracking system.
 * These utilities handle status visualization, demo data generation, and
 * tracking timeline creation for the remittance application.
 * 
 * Features:
 * - Status icon mapping for visual representation
 * - Color coding for different transfer statuses
 * - Demo data generation for testing and presentation
 * - Tracking timeline step generation
 * - Status progression logic
 */

/**
 * Maps transfer status to appropriate visual icons
 * 
 * @param status - The current transfer status
 * @returns React icon component for the given status
 */
export const getStatusIcon = (status: string) => {
  const iconMap = {
    'pending': <Clock className="h-5 w-5 text-orange-500" />,
    'processing': <Package className="h-5 w-5 text-blue-500" />,
    'in_transit': <Truck className="h-5 w-5 text-purple-500" />,
    'delivered': <CheckCircle className="h-5 w-5 text-green-500" />,
    'failed': <Clock className="h-5 w-5 text-red-500" />
  }
  return iconMap[status as keyof typeof iconMap] || iconMap.pending
}

/**
 * Maps transfer status to appropriate color classes for UI styling
 * 
 * @param status - The current transfer status
 * @returns CSS class string for styling the status
 */
export const getStatusColor = (status: string): string => {
  const colorMap = {
    'pending': 'bg-orange-100 text-orange-800 border-orange-200',
    'processing': 'bg-blue-100 text-blue-800 border-blue-200',
    'in_transit': 'bg-purple-100 text-purple-800 border-purple-200',
    'delivered': 'bg-green-100 text-green-800 border-green-200',
    'failed': 'bg-red-100 text-red-800 border-red-200'
  }
  return colorMap[status as keyof typeof colorMap] || colorMap.pending
}

/**
 * Generates realistic tracking steps based on transfer status and delivery method
 * 
 * This function creates a timeline of tracking events that would occur
 * during a real money transfer, providing users with detailed status updates.
 * 
 * @param status - Current transfer status
 * @param deliveryMethod - Method of delivery (bank, card, wallet)
 * @returns Array of tracking step objects with timestamps and descriptions
 */
export const generateTrackingSteps = (status: string, deliveryMethod: string) => {
  const now = new Date()
  const steps = []
  
  // Step 1: Transfer initiated (always present)
  steps.push({
    status: 'Transfer Initiated',
    timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'United States',
    description: 'Your transfer has been received and is being processed'
  })

  // Step 2: Verification complete (if processing or beyond)
  if (['processing', 'in_transit', 'delivered'].includes(status)) {
    steps.push({
      status: 'Verification Complete',
      timestamp: new Date(now.getTime() - 1.5 * 24 * 60 * 60 * 1000).toISOString(),
      location: 'Processing Center',
      description: 'Identity and payment verification completed successfully'
    })
  }

  // Step 3: In transit (if in_transit or delivered)
  if (['in_transit', 'delivered'].includes(status)) {
    steps.push({
      status: 'In Transit',
      timestamp: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      location: 'International Gateway',
      description: `Funds are being transferred via ${deliveryMethod} network`
    })
  }

  // Step 4: Delivered (if delivered)
  if (status === 'delivered') {
    const deliveryDescriptions = {
      bank: 'Funds deposited to recipient bank account',
      card: 'Funds loaded to recipient debit card',
      wallet: 'Funds transferred to mobile wallet'
    }
    
    steps.push({
      status: 'Delivered',
      timestamp: new Date(now.getTime() - 0.5 * 24 * 60 * 60 * 1000).toISOString(),
      location: 'Recipient Location',
      description: deliveryDescriptions[deliveryMethod as keyof typeof deliveryDescriptions] || 'Transfer completed successfully'
    })
  }

  return steps
}

/**
 * Provides demo tracking data for testing and demonstration purposes
 * 
 * This function returns predefined tracking data for specific demo
 * tracking numbers, allowing users to see how the tracking system works
 * without needing real transfer data.
 * 
 * @param trackingNumber - The tracking number to look up
 * @returns Demo tracking data object or null if not found
 */
export const getDemoData = (trackingNumber: string) => {
  const demoData = {
    'TRF001234': {
      id: 'TRF001234',
      status: 'delivered' as const,
      amount: 500,
      currency: 'USD',
      recipientName: 'Sarah Johnson',
      recipientCountry: 'GB',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedDelivery: '1-3 business days',
      actualDelivery: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      trackingSteps: generateTrackingSteps('delivered', 'bank')
    },
    'TRF005678': {
      id: 'TRF005678',
      status: 'processing' as const,
      amount: 250,
      currency: 'USD',
      recipientName: 'Michael Chen',
      recipientCountry: 'NG',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedDelivery: '2-5 business days',
      trackingSteps: generateTrackingSteps('processing', 'wallet')
    }
  }

  return demoData[trackingNumber as keyof typeof demoData] || null
}
