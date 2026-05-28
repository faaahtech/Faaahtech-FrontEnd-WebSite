import { createBrowserRouter, Navigate } from 'react-router-dom'

// Public pages
import { LoginPage } from '@/pages/public/LoginPage'
import { EnrollmentPage } from '@/pages/public/EnrollmentPage'

// Private pages
import { DashboardPage } from '@/pages/private/DashboardPage'
import { AISecretaryPage } from '@/pages/private/AISecretaryPage'
import { AgendaPage } from '@/pages/private/AgendaPage'
import { DocumentsPage } from '@/pages/private/DocumentsPage'
import { SettingsPage } from '@/pages/private/SettingsPage'

// Shared
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ProtectedRoute } from '@/components/shared/ProtectedRoute'

export const router = createBrowserRouter([
  // ─── Public routes ────────────────────────────────────────────────────────
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/cadastro',
    element: <EnrollmentPage />,
  },

  // ─── Private routes ───────────────────────────────────────────────────────
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/secretaria',
    element: (
      <ProtectedRoute>
        <AISecretaryPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/agenda',
    element: (
      <ProtectedRoute>
        <AgendaPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/documentos',
    element: (
      <ProtectedRoute>
        <DocumentsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/configuracoes',
    element: (
      <ProtectedRoute>
        <SettingsPage />
      </ProtectedRoute>
    ),
  },

  // ─── Root redirect ────────────────────────────────────────────────────────
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },

  // ─── 404 ─────────────────────────────────────────────────────────────────
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
