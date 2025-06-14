import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BookProvider } from './context/BookContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import BookDetailPage from './pages/BookDetailPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

function App() {
  return (
    <AuthProvider>
      <BookProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/books/:id" element={<BookDetailPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </BookProvider>
    </AuthProvider>
  );
}

export default App;