import * as React from 'react'
import { 
  createRouter, 
  RouterProvider, 
  createRootRoute, 
  createRoute as createTanStackRoute, 
  Outlet 
} from '@tanstack/react-router'
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import About from "./pages/About";
import Archive from "./pages/Archive";
import Settings from "./pages/Settings";
import Layout from "./components/Layout";
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

// Create root route
const rootRoute = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Layout />
      </TooltipProvider>
    </QueryClientProvider>
  ),
  notFoundComponent: NotFound,
})

// Create index route
const indexRoute = createTanStackRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index,
})

const aboutRoute = createTanStackRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
})

const archiveRoute = createTanStackRoute({
  getParentRoute: () => rootRoute,
  path: '/archive',
  component: Archive,
})

const settingsRoute = createTanStackRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: Settings,
})

// Create route tree
const routeTree = rootRoute.addChildren([indexRoute, aboutRoute, archiveRoute, settingsRoute])

// Create router with proper TypeScript configuration
const router = createRouter({ 
  routeTree,
  defaultPreload: 'intent' as const,
  defaultPreloadStaleTime: 0,
})

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const App = () => <RouterProvider router={router} />

export default App;