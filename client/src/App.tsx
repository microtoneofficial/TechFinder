import { Switch, Route } from "wouter"; 
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Company from "@/pages/Company";
import Footer from "../src/components/ui/Footer"; // ✅ Import

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/company/:id" component={Company} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />

        <div className="flex flex-col min-h-screen">
          
          {/* Main Content */}
          <div className="flex-grow">
            <Router />
          </div>

          {/* Footer */}
          <Footer />

        </div>

      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;