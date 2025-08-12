import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import ChatDashboard from './components/ChatDashboard';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (userData) => {
    console.log('User logged in:', userData);
    setCurrentUser(userData);
    setIsLoggedIn(true);
    setIsLoginOpen(false);
  };

  const handleSignup = (userData) => {
    console.log('User signed up:', userData);
    setCurrentUser(userData);
    setIsLoggedIn(true);
    setIsSignupOpen(false);
  };

  const handleLogout = () => {
    console.log('User logged out');
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  // If user is logged in, show the chat dashboard
  if (isLoggedIn) {
    return (
      <ChatDashboard 
        user={currentUser}
        onLogout={handleLogout}
      />
    );
  }

  // Otherwise, show the landing page
  return (
    <div className="bg-anon-dark text-white min-h-100vh">
      <Header 
        onLoginOpen={() => setIsLoginOpen(true)}
        onSignupOpen={() => setIsSignupOpen(true)}
      />
      <LandingPage />
      <Footer />
      
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
        onSwitchToSignup={() => {
          setIsLoginOpen(false);
          setIsSignupOpen(true);
        }}
        onLogin={handleLogin}
      />
      <SignupModal 
        isOpen={isSignupOpen} 
        onClose={() => setIsSignupOpen(false)}
        onSwitchToLogin={() => {
          setIsSignupOpen(false);
          setIsLoginOpen(true);
        }}
        onSignup={handleSignup}
      />
    </div>
  );
}

export default App;
