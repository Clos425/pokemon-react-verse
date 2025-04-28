
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import SearchPage from "./pages/SearchPage";
import TypesPage from "./pages/TypesPage";
import ComparePage from "./pages/ComparePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/pokemon/:id" element={<DetailPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/types" element={<TypesPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <footer className="bg-gray-100 py-4 text-center text-gray-500">
            <p>Pokémon React-Verse &copy; {new Date().getFullYear()}</p>
          </footer>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
