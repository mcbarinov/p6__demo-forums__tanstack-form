import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "@tanstack/react-router"
import { QueryClientProvider } from "@tanstack/react-query"
import { TanStackDevtools } from "@tanstack/react-devtools"
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import { formDevtoolsPlugin } from "@tanstack/react-form-devtools"
import { Toaster } from "@/components/ui/sonner"
import { router, queryClient } from "./router"
import "./index.css"

const rootElement = document.getElementById("root")
if (!rootElement) throw new Error("Root element not found")

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
      <TanStackDevtools
        plugins={[
          formDevtoolsPlugin(),
          {
            name: "TanStack Query",
            render: <ReactQueryDevtoolsPanel />,
            defaultOpen: false,
          },
          {
            name: "TanStack Router",
            render: <TanStackRouterDevtoolsPanel router={router} />,
            defaultOpen: false,
          },
        ]}
      />
    </QueryClientProvider>
  </StrictMode>
)
