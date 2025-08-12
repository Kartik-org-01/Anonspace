import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const HeroSection = () => {
  return (
    <section id="home" className="min-h-100vh d-flex align-items-center position-relative overflow-hidden">
      {/* Background Effects */}
      <div className="position-absolute top-0 start-0 w-100 h-100" 
           style={{ background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1), transparent, rgba(16, 185, 129, 0.1))' }}>
      </div>
      <div className="position-absolute animate-float rounded-circle" 
           style={{ 
             top: '5rem', 
             left: '2.5rem', 
             width: '18rem', 
             height: '18rem', 
             backgroundColor: 'rgba(124, 58, 237, 0.2)', 
             filter: 'blur(60px)' 
           }}>
      </div>
      <div className="position-absolute animate-float rounded-circle" 
           style={{ 
             bottom: '5rem', 
             right: '2.5rem', 
             width: '24rem', 
             height: '24rem', 
             backgroundColor: 'rgba(16, 185, 129, 0.2)', 
             filter: 'blur(60px)',
             animationDelay: '3s'
           }}>
      </div>

      <Container className="position-relative" style={{ zIndex: 10, paddingTop: '5rem' }}>
        <Row className="text-center animate-fadeIn">
          <Col>
            <h1 className="display-1 fw-bold mb-4 lh-sm">
              Share Your Thoughts
              <br />
              <span className="gradient-text">Anonymously</span>
            </h1>
            
            <p className="fs-4 text-secondary mb-5 mx-auto" style={{ maxWidth: '48rem' }}>
              Connect, suggest, and chat without revealing your identity. 
              Experience true freedom of expression in a secure environment.
            </p>

            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mb-5">
              <Button size="lg" className="btn-anon-accent px-4 py-3 fs-5 fw-semibold">
                Start Chatting Now
              </Button>
              <Button size="lg" variant="outline-primary" className="btn-anon-outline px-4 py-3 fs-5 fw-semibold">
                Learn More
              </Button>
            </div>

            {/* Feature Cards */}
            <Row className="g-4 justify-content-center" style={{ maxWidth: '64rem', margin: '0 auto' }}>
              <Col md={4}>
                <div className="glass-effect p-4 rounded-3 h-100" 
                     style={{ transition: 'transform 0.3s ease' }}
                     onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                     onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                  <i className="bi bi-chat-dots fs-1 text-anon-accent mb-3 d-block"></i>
                  <h5 className="fw-semibold mb-2">Anonymous Chat</h5>
                  <p className="text-secondary mb-0">Chat freely without revealing your identity</p>
                </div>
              </Col>
              
              <Col md={4}>
                <div className="glass-effect p-4 rounded-3 h-100" 
                     style={{ transition: 'transform 0.3s ease' }}
                     onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                     onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                  <i className="bi bi-shield-check fs-1 text-anon-secondary mb-3 d-block"></i>
                  <h5 className="fw-semibold mb-2">Secure & Private</h5>
                  <p className="text-secondary mb-0">End-to-end encryption keeps your data safe</p>
                </div>
              </Col>
              
              <Col md={4}>
                <div className="glass-effect p-4 rounded-3 h-100" 
                     style={{ transition: 'transform 0.3s ease' }}
                     onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                     onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                  <i className="bi bi-people fs-1 text-anon-accent mb-3 d-block"></i>
                  <h5 className="fw-semibold mb-2">Community Driven</h5>
                  <p className="text-secondary mb-0">Join thousands of anonymous users worldwide</p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
