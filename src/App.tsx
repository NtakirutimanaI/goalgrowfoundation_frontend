import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import ScrollToTop from './components/ScrollToTop'
import ScrollToTopButton from './components/ScrollToTopButton'
import HomePage from './pages/HomePage'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AdminDashboard from './pages/dashboard/AdminDashboard'
import ManagerDashboard from './pages/dashboard/ManagerDashboard'
import PlayerDashboard from './pages/dashboard/PlayerDashboard'
import SponsorDashboard from './pages/dashboard/SponsorDashboard'
import UserDashboard from './pages/dashboard/UserDashboard'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ProjectsPage from './pages/ProjectsPage'
import ContactsPage from './pages/ContactsPage'
import StoryPage from './pages/club/StoryPage'
import MissionPage from './pages/club/MissionPage'
import TeamPage from './pages/club/TeamPage'
import PartnersPage from './pages/club/PartnersPage'
import CoachingPage from './pages/services/CoachingPage'
import MentorshipPage from './pages/services/MentorshipPage'
import ScholarshipsPage from './pages/services/ScholarshipsPage'
import FacilitiesPage from './pages/services/FacilitiesPage'
import NewsPage from './pages/foundation/NewsPage'
import CommunityProjectsPage from './pages/foundation/CommunityProjectsPage'
import GalleryPage from './pages/foundation/GalleryPage'
import DonatePage from './pages/foundation/DonatePage'
import EventRegistrationPage from './pages/EventRegistrationPage'

function ProtectedRoute({ children, roles }: { children: React.ReactNode; roles?: string[] }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="spinner" style={{ textAlign: "center", marginTop: "2rem" }}>
        Loading…
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function DashboardRouter() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  const routes: Record<string, React.ReactNode> = {
    admin: <AdminDashboard />,
    manager: <ManagerDashboard />,
    player: <PlayerDashboard />,
    sponsor: <SponsorDashboard />,
    user: <UserDashboard />,
  }
  return <>{routes[user.role] ?? <Navigate to="/" replace />}</>
}

export default function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <ScrollToTopButton />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Club Routes */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/about/story" element={<StoryPage />} />
        <Route path="/about/mission" element={<MissionPage />} />
        <Route path="/about/team" element={<TeamPage />} />
        <Route path="/about/partners" element={<PartnersPage />} />
        
        {/* Services Routes */}
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/coaching" element={<CoachingPage />} />
        <Route path="/services/mentorship" element={<MentorshipPage />} />
        <Route path="/services/scholarships" element={<ScholarshipsPage />} />
        <Route path="/services/facilities" element={<FacilitiesPage />} />
        
        {/* Foundation Routes */}
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/foundation/news" element={<NewsPage />} />
        <Route path="/foundation/projects" element={<CommunityProjectsPage />} />
        <Route path="/foundation/gallery" element={<GalleryPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/register/event/:slug" element={<EventRegistrationPage />} />
        
        <Route path="/contacts" element={<ContactsPage />} />

        {/* Dashboard Routes */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardRouter />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}
