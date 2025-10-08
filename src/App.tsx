import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SearchPage from "./pages/SearchPage.tsx";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home.tsx";
import ListingForm from "./pages/ListingForm.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
          {/*TODO make this page only accessible to logged in users*/}
          <Route path="/search" element={<SearchPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/listing/new" element={<ListingForm />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;