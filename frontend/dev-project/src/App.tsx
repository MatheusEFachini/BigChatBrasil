import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClienteListPage from "./pages/Cliente/ClienteListPage";
import HomePage from "./pages/HomePage";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/ui/app-sidebar";
import { AlertDialogProvider } from "./components/ui/alert-dialog-provider";
import { Toaster } from "./components/ui/toaster";

export function App() {
  return (
    <AlertDialogProvider>
      <SidebarProvider>
        <AppSidebar />
        <BrowserRouter>
          <SidebarTrigger />
          <Toaster />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/clientes"
              element={<ClienteListPage />}
            />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </AlertDialogProvider>
  );
}
