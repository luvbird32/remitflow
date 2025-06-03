
interface PaymentSectionHeaderProps {
  title: string
  description: string
}

export function PaymentSectionHeader({ title, description }: PaymentSectionHeaderProps) {
  return (
    <div className="space-y-2">
      <h4 className="text-lg font-bold text-slate-800">{title}</h4>
      <p className="text-slate-600">{description}</p>
    </div>
  )
}
