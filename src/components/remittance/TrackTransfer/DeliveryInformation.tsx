
interface DeliveryInformationProps {
  estimatedDelivery: string
  actualDelivery?: string
}

export function DeliveryInformation({ estimatedDelivery, actualDelivery }: DeliveryInformationProps) {
  return (
    <div className="modern-card p-6">
      <h4 className="font-semibold mb-4 text-slate-800">Delivery Information</h4>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-slate-600">Estimated Delivery</span>
          <span className="font-medium">{estimatedDelivery}</span>
        </div>
        {actualDelivery && (
          <div className="flex justify-between">
            <span className="text-slate-600">Actual Delivery</span>
            <span className="font-medium text-green-600">
              {new Date(actualDelivery).toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
