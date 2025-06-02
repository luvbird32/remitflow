
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, DollarSign, AlertCircle, CheckCircle, MapPin, CreditCard, ArrowDown, Clock } from "lucide-react"

interface Currency {
  code: string
  name: string
  symbol: string
  rate: number
}

interface Country {
  code: string
  name: string
  currency: string
  flag: string
  deliveryMethods: string[]
}

const currencies: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$", rate: 1 },
  { code: "EUR", name: "Euro", symbol: "€", rate: 0.85 },
  { code: "GBP", name: "British Pound", symbol: "£", rate: 0.73 },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", rate: 110.25 },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", rate: 1.35 },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦", rate: 461.50 },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh", rate: 147.25 },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "₵", rate: 12.15 },
  { code: "ZAR", name: "South African Rand", symbol: "R", rate: 18.75 }
]

const countries: Country[] = [
  { code: "US", name: "United States", currency: "USD", flag: "🇺🇸", deliveryMethods: ["bank", "card"] },
  { code: "GB", name: "United Kingdom", currency: "GBP", flag: "🇬🇧", deliveryMethods: ["bank", "card"] },
  { code: "NG", name: "Nigeria", currency: "NGN", flag: "🇳🇬", deliveryMethods: ["bank", "card", "mobile"] },
  { code: "KE", name: "Kenya", currency: "KES", flag: "🇰🇪", deliveryMethods: ["bank", "card", "mobile"] },
  { code: "GH", name: "Ghana", currency: "GHS", flag: "🇬🇭", deliveryMethods: ["bank", "card", "mobile"] },
  { code: "ZA", name: "South Africa", currency: "ZAR", flag: "🇿🇦", deliveryMethods: ["bank", "card"] },
  { code: "CA", name: "Canada", currency: "CAD", flag: "🇨🇦", deliveryMethods: ["bank", "card"] },
  { code: "JP", name: "Japan", currency: "JPY", flag: "🇯🇵", deliveryMethods: ["bank", "card"] }
]

const deliveryMethodLabels = {
  bank: "Bank Transfer",
  card: "Debit Card",
  mobile: "Mobile Money"
}

const deliveryTimeframes = {
  bank: "1-3 business days",
  card: "1-2 hours", 
  mobile: "Within minutes"
}

export function TransferForm() {
  const [amount, setAmount] = useState("")
  const [recipientEmail, setRecipientEmail] = useState("")
  const [recipientCountry, setRecipientCountry] = useState("")
  const [deliveryMethod, setDeliveryMethod] = useState("")
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const selectedCountry = countries.find(c => c.code === recipientCountry)
  
  // Auto-update currency when country changes
  const handleCountryChange = (countryCode: string) => {
    setRecipientCountry(countryCode)
    const country = countries.find(c => c.code === countryCode)
    if (country) {
      setToCurrency(country.currency)
      setDeliveryMethod("") // Reset delivery method when country changes
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    
    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = "Please enter a valid amount"
    } else if (parseFloat(amount) < 1) {
      newErrors.amount = "Minimum transfer amount is $1"
    } else if (parseFloat(amount) > 10000) {
      newErrors.amount = "Maximum transfer amount is $10,000"
    }
    
    if (!recipientEmail) {
      newErrors.recipientEmail = "Recipient email is required"
    } else if (!/\S+@\S+\.\S+/.test(recipientEmail)) {
      newErrors.recipientEmail = "Please enter a valid email address"
    }

    if (!recipientCountry) {
      newErrors.recipientCountry = "Please select recipient country"
    }

    if (!deliveryMethod) {
      newErrors.deliveryMethod = "Please select delivery method"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateConvertedAmount = () => {
    if (!amount) return 0
    const fromRate = currencies.find(c => c.code === fromCurrency)?.rate || 1
    const toRate = currencies.find(c => c.code === toCurrency)?.rate || 1
    return (parseFloat(amount) / fromRate * toRate).toFixed(2)
  }

  const calculateFee = () => {
    if (!amount) return 0
    const transferAmount = parseFloat(amount)
    let baseFee = 0
    if (transferAmount <= 100) baseFee = 2.99
    else if (transferAmount <= 500) baseFee = 4.99
    else baseFee = 7.99

    // Add delivery method fee
    const deliveryFees = {
      bank: 0,
      card: 1.99,
      mobile: 0.99
    }
    
    return baseFee + (deliveryFees[deliveryMethod as keyof typeof deliveryFees] || 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log("Transfer submitted:", { 
      amount, 
      recipientEmail,
      recipientCountry,
      deliveryMethod,
      fromCurrency, 
      toCurrency,
      convertedAmount: calculateConvertedAmount(),
      fee: calculateFee()
    })
    
    setIsSubmitting(false)
    // Reset form on success
    setAmount("")
    setRecipientEmail("")
    setRecipientCountry("")
    setDeliveryMethod("")
    setErrors({})
  }

  const fromCurrencyData = currencies.find(c => c.code === fromCurrency)
  const toCurrencyData = currencies.find(c => c.code === toCurrency)
  const showStep2 = amount && recipientCountry
  const showStep3 = showStep2 && deliveryMethod

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Send Money
        </CardTitle>
        <CardDescription>
          Send money quickly and securely to anyone, anywhere
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Step 1: Amount and Destination */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">1</div>
              Amount & Destination
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {/* Amount */}
              <div>
                <label htmlFor="amount" className="block text-sm font-medium mb-2">
                  You Send
                </label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className={errors.amount ? "border-red-500" : ""}
                      step="0.01"
                      min="0"
                    />
                    {errors.amount && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.amount}
                      </p>
                    )}
                  </div>
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Recipient Country */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <MapPin className="h-4 w-4 inline mr-1" />
                  Recipient Country
                </label>
                <Select value={recipientCountry} onValueChange={handleCountryChange}>
                  <SelectTrigger className={errors.recipientCountry ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        <span className="flex items-center gap-2">
                          <span>{country.flag}</span>
                          <span>{country.name}</span>
                          <span className="text-gray-500">({country.currency})</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.recipientCountry && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.recipientCountry}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Step 2: Delivery Method */}
          {showStep2 && (
            <>
              <div className="flex items-center justify-center">
                <ArrowDown className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">2</div>
                  Choose Delivery Method
                </div>
                
                <div className="grid gap-3">
                  {selectedCountry?.deliveryMethods.map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setDeliveryMethod(method)}
                      className={`p-4 border rounded-lg text-left transition-all hover:border-blue-300 ${
                        deliveryMethod === method 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="font-medium">
                              {deliveryMethodLabels[method as keyof typeof deliveryMethodLabels]}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {deliveryTimeframes[method as keyof typeof deliveryTimeframes]}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm font-medium">
                          {method === 'bank' ? 'Free' : 
                           method === 'card' ? '+$1.99' : '+$0.99'}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                
                {errors.deliveryMethod && (
                  <p className="text-red-500 text-xs flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.deliveryMethod}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Step 3: Review & Recipient */}
          {showStep3 && (
            <>
              <div className="flex items-center justify-center">
                <ArrowDown className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">3</div>
                  Review & Complete
                </div>

                {/* Exchange Rate Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border border-blue-200">
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-700">
                          {fromCurrencyData?.symbol}{amount}
                        </div>
                        <div className="text-sm text-blue-600">{fromCurrency}</div>
                      </div>
                      <ArrowRight className="h-6 w-6 text-blue-500" />
                      <div className="text-left">
                        <div className="text-2xl font-bold text-green-700">
                          {toCurrencyData?.symbol}{calculateConvertedAmount()}
                        </div>
                        <div className="text-sm text-green-600">{toCurrency}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-blue-200">
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Exchange Rate</div>
                        <div className="font-medium">1 {fromCurrency} = {toCurrencyData?.rate} {toCurrency}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Transfer Fee</div>
                        <div className="font-medium">${calculateFee().toFixed(2)}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Delivery Time</div>
                        <div className="font-medium">{deliveryTimeframes[deliveryMethod as keyof typeof deliveryTimeframes]}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Method Confirmation */}
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-blue-900">
                        {deliveryMethodLabels[deliveryMethod as keyof typeof deliveryMethodLabels]}
                      </div>
                      <div className="text-sm text-blue-600">
                        to {selectedCountry?.flag} {selectedCountry?.name}
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    {deliveryTimeframes[deliveryMethod as keyof typeof deliveryTimeframes]}
                  </Badge>
                </div>

                {/* Recipient Email */}
                <div>
                  <label htmlFor="recipient" className="block text-sm font-medium mb-2">
                    Recipient Email
                  </label>
                  <Input
                    id="recipient"
                    type="email"
                    placeholder="recipient@example.com"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    className={errors.recipientEmail ? "border-red-500" : ""}
                  />
                  {errors.recipientEmail && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.recipientEmail}
                    </p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-base" 
                  disabled={isSubmitting || !amount || !recipientEmail || !recipientCountry || !deliveryMethod}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing Transfer...
                    </>
                  ) : (
                    <>
                      Send {fromCurrencyData?.symbol}{amount} • {toCurrencyData?.symbol}{calculateConvertedAmount()} arrives
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
