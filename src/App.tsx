
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/hooks/useAuth"
import { ErrorBoundary } from "@/components/error/ErrorBoundary"
import { CrashReporter } from "@/utils/crashReporter"
import Index from "@/pages/Index"

/**
 * React Query client instance for data fetching and caching
 */
const queryClient = new QueryClient()

/**
 * Global error handler for the error boundary
 */
const handleGlobalError = (error: Error, errorInfo: React.ErrorInfo) => {
  CrashReporter.report('component_error', error, 'Global App Error')
}

/**
 * Main application component that sets up providers and routing
 * @returns JSX element containing the complete application structure
 */
function App() {
  return (
    <ErrorBoundary onError={handleGlobalError}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
            </Routes>
            <Toaster />
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
