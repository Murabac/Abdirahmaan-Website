import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { AdminLayout } from './components/admin/AdminLayout';
import { PortfolioPage } from './pages/PortfolioPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardOverviewPage } from './pages/DashboardOverviewPage';
import { DashboardMessagesPage } from './pages/DashboardMessagesPage';
import { DashboardProjectsPage } from './pages/DashboardProjectsPage';
import { DashboardProjectFormPage } from './pages/DashboardProjectFormPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardOverviewPage />} />
            <Route path="messages" element={<DashboardMessagesPage />} />
            <Route path="projects" element={<DashboardProjectsPage />} />
            <Route path="projects/new" element={<DashboardProjectFormPage />} />
            <Route path="projects/:id/edit" element={<DashboardProjectFormPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
