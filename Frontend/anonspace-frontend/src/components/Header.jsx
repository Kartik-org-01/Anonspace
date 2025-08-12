import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';

const Header = ({ onLoginOpen, onSignupOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style jsx>{`
        .nav-link-animated {
          position: relative;
          transition: all 0.3s ease;
          padding: 0.5rem 1rem !important;
        }

        .nav-link-animated::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 50%;
          background: linear-gradient(90deg, var(--anon-accent), var(--anon-secondary));
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform: translateX(-50%);
        }

        .nav-link-animated:hover::after {
          width: 80%;
        }

        .nav-link-animated:hover {
          color: var(--anon-accent) !important;
          transform: translateY(-2px);
        }

        .btn-header {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          border-radius: 10px !important;
        }

        .btn-header::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--anon-accent), var(--anon-secondary));
          transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .btn-header:hover::after {
          width: 100%;
        }

        .btn-header:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
        }

        .dropdown-menu-custom {
          background: rgba(248, 250, 252, 0.95) !important;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(99, 102, 241, 0.2) !important;
          border-radius: 15px !important;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15) !important;
          margin-top: 0.5rem;
        }

        .dropdown-item-custom {
          color: var(--anon-text) !important;
          padding: 0.75rem 1.25rem !important;
          transition: all 0.3s ease;
          border-radius: 8px !important;
          margin: 0.25rem 0.5rem !important;
        }

        .dropdown-item-custom:hover {
          background: linear-gradient(135deg, var(--anon-accent), var(--anon-secondary)) !important;
          color: white !important;
          transform: translateX(5px);
        }

        .navbar-brand-animated {
          transition: all 0.3s ease;
        }

        .navbar-brand-animated:hover {
          transform: scale(1.05);
        }

        .logo-icon {
          transition: all 0.3s ease;
        }

        .navbar-brand-animated:hover .logo-icon {
          transform: rotate(10deg);
        }
      `}</style>

      <Navbar 
        expand="lg" 
        fixed="top" 
        className={`transition-all ${isScrolled ? 'glass-effect' : 'bg-transparent'}`}
        style={{ transition: 'all 0.3s ease' }}
      >
        <Container>
          <Navbar.Brand href="#home" className="d-flex align-items-center navbar-brand-animated">
            <div className="d-flex align-items-center justify-content-center bg-anon-accent rounded me-2 animate-glow logo-icon" 
                 style={{ width: '40px', height: '40px' }}>
              <i className="bi bi-eye-slash-fill text-white fs-5"></i>
            </div>
            <span className="fs-3 fw-bold gradient-text">AnonSpace</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link href="#home" className="text-white nav-link-animated">
                <i className="bi bi-house me-1"></i>Home
              </Nav.Link>
              
              {/* Features Dropdown */}
              <NavDropdown 
                title={<span className="text-white"><i className="bi bi-stars me-1"></i>Features</span>} 
                id="features-dropdown"
                className="nav-link-animated"
                menuVariant="light"
              >
                <div className="dropdown-menu-custom">
                  <NavDropdown.Item href="#anonymous-chat" className="dropdown-item-custom">
                    <i className="bi bi-chat-dots me-2 text-anon-accent"></i>
                    Anonymous Chat
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#security" className="dropdown-item-custom">
                    <i className="bi bi-shield-check me-2 text-anon-secondary"></i>
                    End-to-End Encryption
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#global-community" className="dropdown-item-custom">
                    <i className="bi bi-globe me-2 text-anon-accent"></i>
                    Global Community
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#mobile" className="dropdown-item-custom">
                    <i className="bi bi-phone me-2 text-anon-secondary"></i>
                    Mobile Experience
                  </NavDropdown.Item>
                </div>
              </NavDropdown>

              {/* Support Dropdown */}
              <NavDropdown 
                title={<span className="text-white"><i className="bi bi-question-circle me-1"></i>Support</span>} 
                id="support-dropdown"
                className="nav-link-animated"
                menuVariant="light"
              >
                <div className="dropdown-menu-custom">
                  <NavDropdown.Item href="#help" className="dropdown-item-custom">
                    <i className="bi bi-life-preserver me-2 text-anon-accent"></i>
                    Help Center
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#docs" className="dropdown-item-custom">
                    <i className="bi bi-book me-2 text-anon-secondary"></i>
                    Documentation
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#community" className="dropdown-item-custom">
                    <i className="bi bi-people me-2 text-anon-accent"></i>
                    Community Forum
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#contact" className="dropdown-item-custom">
                    <i className="bi bi-envelope me-2 text-anon-secondary"></i>
                    Contact Us
                  </NavDropdown.Item>
                </div>
              </NavDropdown>

              <Nav.Link href="#testimonials" className="text-white nav-link-animated">
                <i className="bi bi-star me-1"></i>Reviews
              </Nav.Link>

              {/* About Dropdown */}
              <NavDropdown 
                title={<span className="text-white"><i className="bi bi-info-circle me-1"></i>About</span>} 
                id="about-dropdown"
                className="nav-link-animated"
                menuVariant="light"
              >
                <div className="dropdown-menu-custom">
                  <NavDropdown.Item href="#our-story" className="dropdown-item-custom">
                    <i className="bi bi-heart me-2 text-anon-accent"></i>
                    Our Story
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#privacy" className="dropdown-item-custom">
                    <i className="bi bi-shield-lock me-2 text-anon-secondary"></i>
                    Privacy Policy
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#terms" className="dropdown-item-custom">
                    <i className="bi bi-file-text me-2 text-anon-accent"></i>
                    Terms of Service
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#blog" className="dropdown-item-custom">
                    <i className="bi bi-journal me-2 text-anon-secondary"></i>
                    Blog
                  </NavDropdown.Item>
                </div>
              </NavDropdown>
            </Nav>
            
            <div className="d-flex gap-2">
              <Button 
                variant="outline-primary" 
                className="btn-anon-outline btn-header"
                onClick={onLoginOpen}
              >
                <i className="bi bi-box-arrow-in-right me-1"></i>Login
              </Button>
              <Button 
                className="btn-anon-accent btn-header"
                onClick={onSignupOpen}
              >
                <i className="bi bi-person-plus me-1"></i>Sign Up
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
