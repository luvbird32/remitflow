
interface DeliveryMethodHeaderProps {
  stepNumber?: number
}

export function DeliveryMethodHeader({ stepNumber = 2 }: DeliveryMethodHeaderProps) {
  return (
    <div className="flex items-center gap-3 text-sm font-semibold text-teal-600">
      <div className="step-indicator">{stepNumber}</div>
      <div>
        <h3 className="text-lg font-bold text-slate-800">How Will They Get The Money?</h3>
        <p className="text-sm text-slate-500 font-normal">Choose the best way for your recipient to receive the money</p>
      </div>
    </div>
  )
}
