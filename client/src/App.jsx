import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import MovieList from './components/movies/MovieList';
import Loading from './components/common/Loading';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading message="Loading..." />;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Layout Component
const Layout = ({ children }) => (
  <div className="min-h-screen bg-gray-50">
    <Navbar />
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout>
                    <MovieList title="All Movies & Series" />
                  </Layout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <Layout>
                    <MovieList status="wishlist" title="Wishlist" />
                  </Layout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/watched"
              element={
                <ProtectedRoute>
                  <Layout>
                    <MovieList status="watched" title="Watched" />
                  </Layout>
                </ProtectedRoute>
              }
            />
            
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
