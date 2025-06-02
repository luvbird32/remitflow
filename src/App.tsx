
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Header } from "@/components/layout/Header"
import { AppSidebar } from "@/components/layout/AppSidebar"
import { Toaster } from "@/components/ui/toaster"
import Index from "@/pages/Index"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                </Routes>
              </main>
            </div>
          </div>
          <Toaster />
        </SidebarProvider>
      </Router>
    </QueryClientProvider>
  )
}

export default App
