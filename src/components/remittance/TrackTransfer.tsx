
import { TrackingHeader } from "./TrackTransfer/TrackingHeader"
import { TrackingForm } from "./TrackTransfer/TrackingForm"
import { RecentTransfers } from "./TrackTransfer/RecentTransfers"
import { DemoTrackingNumbers } from "./TrackTransfer/DemoTrackingNumbers"
import { NotFoundMessage } from "./TrackTransfer/NotFoundMessage"
import { TransferSummaryCard } from "./TrackTransfer/TransferSummaryCard"
import { TrackingTimeline } from "./TrackTransfer/TrackingTimeline"
import { DeliveryInformation } from "./TrackTransfer/DeliveryInformation"
import { ContactSupport } from "./TrackTransfer/ContactSupport"
import { useTrackTransfer } from "./TrackTransfer/useTrackTransfer"
import { getStatusIcon, getStatusColor } from "./TrackTransfer/trackingUtils"

export function TrackTransfer() {
  const {
    trackingNumber,
    setTrackingNumber,
    transferData,
    isSearching,
    notFound,
    recentTransfers,
    handleTrack
  } = useTrackTransfer()

  return (
    <div className="modern-card p-8 animate-fade-in">
      <TrackingHeader />

      <div className="space-y-6">
        <TrackingForm
          trackingNumber={trackingNumber}
          setTrackingNumber={setTrackingNumber}
          onTrack={handleTrack}
          isSearching={isSearching}
        />

        <RecentTransfers
          transfers={recentTransfers}
          onSelectTransfer={setTrackingNumber}
          getStatusColor={getStatusColor}
        />

        <DemoTrackingNumbers onSelectDemo={setTrackingNumber} />

        {notFound && <NotFoundMessage />}

        {transferData && (
          <div className="space-y-6 animate-fade-in">
            <TransferSummaryCard
              transferData={transferData}
              getStatusColor={getStatusColor}
            />

            <TrackingTimeline
              trackingSteps={transferData.trackingSteps}
              getStatusIcon={getStatusIcon}
            />

            <DeliveryInformation
              estimatedDelivery={transferData.estimatedDelivery}
              actualDelivery={transferData.actualDelivery}
            />

            <ContactSupport />
          </div>
        )}
      </div>
    </div>
  )
}
