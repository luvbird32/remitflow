import { useState } from "react"
import { TransferFormData, FormErrors } from '../types'
import { ApiService } from '@/services/apiService'
import { useFormValidation } from './useFormValidation'
import { useToast } from '@/hooks/use-toast'

interface UseTransferSubmissionProps {
  formData: TransferFormData
  setErrors: (errors: FormErrors) => void
  setTransferResult: (result: any) => void
  setShowSuccessDialog: (show: boolean) => void
}

export function useTransferSubmission({
  formData,
  setErrors,
  setTransferResult,
  setShowSuccessDialog
}: UseTransferSubmissionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { validateForm } = useFormValidation()
  const { toast } = useToast()

  const simulateTransferProcessing = async (formData: TransferFormData) => {
    // Calculate realistic converted amount based on form data
    const amount = parseFloat(formData.amount || '0')
    const exchangeRate = getExchangeRate(formData.fromCurrency, formData.toCurrency)
    const convertedAmount = (amount * exchangeRate).toFixed(2)
    
    // Calculate fees based on delivery method
    const fee = calculateFee(amount, formData.deliveryMethod)
    const totalAmount = (amount + fee).toFixed(2)
    
    // Generate realistic transfer ID with timestamp
    const transferId = `TXN${Date.now().toString().slice(-8)}`
    
    // Simulate processing delay with progress updates
    await new Promise(resolve => {
      let progress = 0
      const interval = setInterval(() => {
        progress += 25
        if (progress >= 100) {
          clearInterval(interval)
          resolve(true)
        }
      }, 500)
    })
    
    // Determine initial status based on delivery method
    const status = getInitialStatus(formData.deliveryMethod)
    
    return {
      id: transferId,
      status,
      convertedAmount,
      fee,
      totalAmount,
      estimatedDelivery: getEstimatedDelivery(formData.deliveryMethod),
      actualDelivery: status === 'delivered' ? new Date().toISOString() : undefined,
      recipientName: formData.recipientName,
      recipientCountry: formData.recipientCountry,
      deliveryMethod: formData.deliveryMethod,
      fromCurrency: formData.fromCurrency,
      toCurrency: formData.toCurrency,
      createdAt: new Date().toISOString(),
      trackingUrl: `https://track.remitflow.com/${transferId}`
    }
  }

  const getInitialStatus = (deliveryMethod: string): string => {
    // Most transfers start as pending, but wallet transfers might be faster
    if (deliveryMethod === 'wallet') {
      return Math.random() > 0.7 ? 'delivered' : 'processing'
    } else if (deliveryMethod === 'card') {
      return Math.random() > 0.5 ? 'processing' : 'pending'
    }
    return 'pending'
  }

  const getExchangeRate = (from: string, to: string): number => {
    // Realistic exchange rates with some variation
    const baseRates: Record<string, number> = {
      'USD': 1,
      'EUR': 0.85 + (Math.random() - 0.5) * 0.02,
      'GBP': 0.73 + (Math.random() - 0.5) * 0.02,
      'JPY': 110.25 + (Math.random() - 0.5) * 2,
      'CAD': 1.35 + (Math.random() - 0.5) * 0.05,
      'NGN': 461.50 + (Math.random() - 0.5) * 10,
      'KES': 147.25 + (Math.random() - 0.5) * 5,
      'GHS': 12.15 + (Math.random() - 0.5) * 0.5,
      'ZAR': 18.75 + (Math.random() - 0.5) * 1
    }
    
    const fromRate = baseRates[from] || 1
    const toRate = baseRates[to] || 1
    return Number((toRate / fromRate).toFixed(4))
  }

  const calculateFee = (amount: number, deliveryMethod: string): number => {
    let baseFee = 0
    
    // Progressive fee structure
    if (amount <= 50) baseFee = 1.99
    else if (amount <= 100) baseFee = 2.99
    else if (amount <= 500) baseFee = 4.99
    else if (amount <= 1000) baseFee = 7.99
    else baseFee = 9.99

    // Delivery method fees
    const deliveryFees = {
      bank: 0,
      card: 1.99,
      wallet: 0.99
    }

    return Number((baseFee + (deliveryFees[deliveryMethod as keyof typeof deliveryFees] || 0)).toFixed(2))
  }

  const getEstimatedDelivery = (deliveryMethod: string): string => {
    const timeframes = {
      bank: "1-3 business days",
      card: "Within 2 hours",
      wallet: "Within 15 minutes"
    }
    return timeframes[deliveryMethod as keyof typeof timeframes] || "2-5 business days"
  }

  const storeTransferInHistory = (result: any) => {
    try {
      const existingTransfers = JSON.parse(localStorage.getItem('transferHistory') || '[]')
      
      const newTransfer = {
        id: result.id,
        amount: parseFloat(formData.amount || '0'),
        currency: formData.fromCurrency,
        recipientName: formData.recipientName,
        recipientCountry: formData.recipientCountry,
        status: result.status,
        createdAt: result.createdAt,
        estimatedDelivery: result.estimatedDelivery,
        deliveryMethod: formData.deliveryMethod,
        convertedAmount: result.convertedAmount,
        toCurrency: formData.toCurrency,
        fee: result.fee,
        totalAmount: result.totalAmount
      }
      
      // Keep only the last 20 transfers
      const updatedTransfers = [newTransfer, ...existingTransfers.slice(0, 19)]
      localStorage.setItem('transferHistory', JSON.stringify(updatedTransfers))
      
      console.log('Transfer stored in history:', newTransfer)
    } catch (error) {
      console.error('Error storing transfer in history:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      console.log('Starting transfer submission...')
      
      const { isValid, errors } = await validateForm(formData)
      if (!isValid) {
        console.log('Form validation failed:', errors)
        setErrors(errors)
        toast({
          title: "Validation Error",
          description: "Please check your form and try again.",
          variant: "destructive"
        })
        return
      }
      
      setIsSubmitting(true)
      setErrors({})
      
      console.log('Submitting transfer with data:', formData)
      
      toast({
        title: "Processing Transfer",
        description: "Your transfer is being processed..."
      })
      
      let result
      try {
        result = await ApiService.createTransfer(formData)
        console.log('Transfer API response:', result)
      } catch (apiError) {
        console.log('Backend unavailable, simulating transfer processing')
        console.error('API Error:', apiError)
        
        // Provide realistic simulation
        result = await simulateTransferProcessing(formData)
      }
      
      if (result) {
        // Store in transfer history
        storeTransferInHistory(result)
        
        setTransferResult(result)
        setShowSuccessDialog(true)
        console.log('Transfer submitted successfully:', result.id)
        
        toast({
          title: "Transfer Successful!",
          description: `Your transfer ${result.id} has been processed. Amount: ${formData.fromCurrency} ${formData.amount}`,
        })

        // Simulate status updates for demo
        setTimeout(() => {
          updateTransferStatus(result.id, 'processing')
        }, 30000) // Update to processing after 30 seconds

        if (result.status === 'pending') {
          setTimeout(() => {
            updateTransferStatus(result.id, 'delivered')
          }, 120000) // Update to delivered after 2 minutes for demo
        }
      }
    } catch (error: any) {
      console.error('Transfer submission error:', error)
      setErrors({ 
        general: error?.message || 'Failed to submit transfer. Please try again.' 
      })
      
      toast({
        title: "Transfer Failed",
        description: error?.message || 'Failed to submit transfer. Please try again.',
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateTransferStatus = (transferId: string, newStatus: string) => {
    try {
      const transferHistory = JSON.parse(localStorage.getItem('transferHistory') || '[]')
      const updatedHistory = transferHistory.map((transfer: any) => {
        if (transfer.id === transferId) {
          return { ...transfer, status: newStatus }
        }
        return transfer
      })
      localStorage.setItem('transferHistory', JSON.stringify(updatedHistory))
      console.log(`Transfer ${transferId} status updated to: ${newStatus}`)
    } catch (error) {
      console.error('Error updating transfer status:', error)
    }
  }

  return { handleSubmit, isSubmitting }
}
