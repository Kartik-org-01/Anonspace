import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { name: 'Features', href: '#features', icon: 'bi-stars' },
      { name: 'Security', href: '#security', icon: 'bi-shield-check' },
      { name: 'Privacy', href: '#privacy', icon: 'bi-lock' },
      { name: 'Pricing', href: '#pricing', icon: 'bi-tag' }
    ],
    Company: [
      { name: 'About', href: '#about', icon: 'bi-info-circle' },
      { name: 'Blog', href: '#blog', icon: 'bi-journal' },
      { name: 'Careers', href: '#careers', icon: 'bi-briefcase' },
      { name: 'Press', href: '#press', icon: 'bi-newspaper' }
    ],
    Support: [
      { name: 'Help Center', href: '#help', icon: 'bi-question-circle' },
      { name: 'Contact', href: '#contact', icon: 'bi-envelope' },
      { name: 'Status', href: '#status', icon: 'bi-activity' },
      { name: 'Updates', href: '#updates', icon: 'bi-bell' }
    ],
    Legal: [
      { name: 'Privacy Policy', href: '#privacy', icon: 'bi-shield-lock' },
      { name: 'Terms of Service', href: '#terms', icon: 'bi-file-text' },
      { name: 'Cookie Policy', href: '#cookies', icon: 'bi-cookie' },
      { name: 'GDPR', href: '#gdpr', icon: 'bi-check-circle' }
    ]
  };

  const socialLinks = [
    { icon: 'bi-twitter', href: 'https://twitter.com', color: '#1DA1F2' },
    { icon: 'bi-github', href: 'https://github.com', color: '#333' },
    { icon: 'bi-linkedin', href: 'https://linkedin.com', color: '#0077B5' },
    { icon: 'bi-discord', href: 'https://discord.com', color: '#5865F2' },
    { icon: 'bi-telegram', href: 'https://telegram.org', color: '#0088cc' }
  ];

  return (
    <>
      <style jsx>{`
        .footer-link {
          transition: all 0.3s ease;
          position: relative;
          display: inline-block;
          padding: 0.25rem 0;
        }

        .footer-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: 0;
          left: 0;
          background: linear-gradient(90deg, var(--anon-accent), var(--anon-secondary));
          transition: width 0.3s ease;
        }

        .footer-link:hover::after {
          width: 100%;
        }

        .footer-link:hover {
          color: var(--anon-accent) !important;
          transform: translateX(5px);
        }

        .social-icon {
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(248, 250, 252, 0.1);
          border: 1px solid rgba(248, 250, 252, 0.2);
        }

        .social-icon:hover {
          transform: translateY(-3px) scale(1.1);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
          background: rgba(99, 102, 241, 0.2);
        }

        .developer-card {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(6, 182, 212, 0.1));
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 20px;
          padding: 2rem;
          margin: 2rem 0;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .developer-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2);
        }

        .developer-avatar {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, var(--anon-accent), var(--anon-secondary));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: white;
          margin-bottom: 1rem;
          animation: float 3s ease-in-out infinite;
        }

        .tech-badge {
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.3);
          color: var(--anon-accent);
          padding: 0.25rem 0.75rem;
          border-radius: 15px;
          font-size: 0.85rem;
          margin: 0.25rem;
          display: inline-block;
          transition: all 0.3s ease;
        }

        .tech-badge:hover {
          background: var(--anon-accent);
          color: white;
          transform: scale(1.05);
        }
      `}</style>

      <footer id="contact" className="py-5 section-subtle">
        <Container>
          {/* Developer Section */}
          <Row className="justify-content-center mb-5">
            <Col lg={8}>
              <div className="developer-card text-center">
                <div className="developer-avatar mx-auto">
                  <i className="bi bi-code-slash"></i>
                </div>
                <h4 className="gradient-text fw-bold mb-2">Created with ❤️ by Kartik Pant</h4>
                <p className="text-anon-light mb-3">
                  Full Stack Developer | Privacy Advocate | Open Source Enthusiast
                </p>
                <p className="text-anon-text mb-4">
                  Passionate about creating secure, anonymous platforms that protect user privacy 
                  while fostering meaningful connections. Specialized in React, Node.js, and cybersecurity.
                </p>
                
                {/* Tech Stack */}
                <div className="mb-4">
                  <h6 className="text-anon-text mb-3">Tech Stack Used:</h6>
                  <span className="tech-badge">React.js</span>
                  <span className="tech-badge">Bootstrap</span>
                  <span className="tech-badge">Node.js</span>
                  <span className="tech-badge">MongoDB</span>
                  <span className="tech-badge">Socket.io</span>
                  <span className="tech-badge">Encryption</span>
                </div>

                {/* Contact Info */}
                <div className="d-flex justify-content-center gap-3 mb-3">
                  <a href="mailto:kartik.pant.dev@gmail.com" className="social-icon text-anon-accent text-decoration-none">
                    <i className="bi bi-envelope-fill"></i>
                  </a>
                  <a href="https://github.com/kartikpant" className="social-icon text-anon-accent text-decoration-none">
                    <i className="bi bi-github"></i>
                  </a>
                  <a href="https://linkedin.com/in/kartikpant" className="social-icon text-anon-accent text-decoration-none">
                    <i className="bi bi-linkedin"></i>
                  </a>
                  <a href="https://twitter.com/kartikpant_dev" className="social-icon text-anon-accent text-decoration-none">
                    <i className="bi bi-twitter"></i>
                  </a>
                </div>
                <p className="text-anon-light small mb-0">
                  <i className="bi bi-geo-alt me-1"></i>Based in India | 
                  <i className="bi bi-clock ms-2 me-1"></i>Available for freelance projects
                </p>
              </div>
            </Col>
          </Row>

          <Row className="g-4 mb-5">
            {/* Brand Section */}
            <Col lg={4}>
              <div className="d-flex align-items-center mb-4">
                <div className="d-flex align-items-center justify-content-center bg-anon-accent rounded me-3 animate-glow" 
                     style={{ width: '50px', height: '50px' }}>
                  <i className="bi bi-eye-slash-fill text-white fs-4"></i>
                </div>
                <div>
                  <span className="fs-2 fw-bold gradient-text">AnonSpace</span>
                  <p className="text-anon-light small mb-0">Privacy-First Platform</p>
                </div>
              </div>
              <p className="text-anon-light mb-4" style={{ maxWidth: '28rem' }}>
                The premier platform for anonymous communication and suggestions. 
                Connect freely, share safely, and express yourself without limits in a secure environment.
              </p>
              
              {/* Social Links */}
              <div className="d-flex gap-3 mb-4">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.href} 
                    className="social-icon text-anon-light text-decoration-none"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className={`bi ${social.icon}`}></i>
                  </a>
                ))}
              </div>

              {/* Newsletter Signup */}
              <div className="glass-effect p-3 rounded-3">
                <h6 className="text-white mb-2">
                  <i className="bi bi-envelope me-2"></i>Stay Updated
                </h6>
                <p className="text-anon-light small mb-3">Get privacy tips and platform updates</p>
                <div className="input-group">
                  <input 
                    type="email" 
                    className="form-control form-control-subtle" 
                    placeholder="your@email.com"
                  />
                  <Button className="btn-anon-accent">
                    <i className="bi bi-send"></i>
                  </Button>
                </div>
              </div>
            </Col>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <Col md={6} lg={2} key={category}>
                <h6 className="text-white fw-semibold mb-4">
                  <i className="bi bi-folder me-2 text-anon-accent"></i>
                  {category}
                </h6>
                <ul className="list-unstyled">
                  {links.map((link) => (
                    <li key={link.name} className="mb-2">
                      <a 
                        href={link.href} 
                        className="footer-link text-anon-light text-decoration-none d-flex align-items-center"
                      >
                        <i className={`bi ${link.icon} me-2 text-anon-accent`} style={{ fontSize: '0.9rem' }}></i>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </Col>
            ))}
          </Row>

          {/* Bottom Section */}
          <hr style={{ borderColor: 'rgba(248, 250, 252, 0.1)', margin: '2rem 0' }} />
          <Row className="align-items-center">
            <Col md={6}>
              <p className="text-anon-light mb-2">
                © {currentYear} AnonSpace. All rights reserved.
              </p>
              <p className="text-anon-light small mb-0">
                <i className="bi bi-shield-check me-1 text-anon-secondary"></i>
                Built with privacy-first principles and end-to-end encryption
              </p>
            </Col>
            <Col md={6} className="text-md-end">
              <div className="d-flex align-items-center justify-content-md-end gap-4 flex-wrap">
                <div className="d-flex align-items-center gap-2">
                  <div className="d-flex align-items-center gap-1">
                    <div 
                      className="rounded-circle bg-success" 
                      style={{ width: '8px', height: '8px' }}
                    ></div>
                    <span className="text-anon-light small">All systems operational</span>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <span className="text-anon-light small">🔒 Secured by encryption</span>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <i className="bi bi-heart-fill text-danger"></i>
                  <span className="text-anon-light small">Made with love</span>
                </div>
              </div>
            </Col>
          </Row>

          {/* Back to Top Button */}
          <div className="text-center mt-4">
            <Button 
              variant="link" 
              href="#home"
              className="text-anon-accent text-decoration-none"
              style={{ transition: 'all 0.3s ease' }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-3px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <i className="bi bi-arrow-up-circle me-1"></i>
              Back to Top
            </Button>
          </div>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
