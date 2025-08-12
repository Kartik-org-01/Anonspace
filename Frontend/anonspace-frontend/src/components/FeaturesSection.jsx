import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FeaturesSection = () => {
  const features = [
    {
      icon: "bi-eye-slash",
      title: "Complete Anonymity",
      description: "Your identity remains completely hidden. No registration required, no personal data collected."
    },
    {
      icon: "bi-lock-fill",
      title: "End-to-End Encryption",
      description: "Military-grade encryption ensures your conversations stay private and secure."
    },
    {
      icon: "bi-globe",
      title: "Global Community",
      description: "Connect with people from around the world without geographical boundaries."
    },
    {
      icon: "bi-phone",
      title: "Mobile Responsive",
      description: "Perfect experience across all devices - desktop, tablet, and mobile."
    },
    {
      icon: "bi-lightning-fill",
      title: "Real-time Messaging",
      description: "Instant message delivery with real-time notifications and responses."
    },
    {
      icon: "bi-heart-fill",
      title: "Mental Health Safe",
      description: "Designed with mental health in mind, providing a judgment-free space."
    }
  ];

  return (
    <section id="features" className="py-5" style={{ backgroundColor: 'rgba(26, 26, 27, 0.3)' }}>
      <Container>
        <Row className="text-center mb-5 animate-fadeIn">
          <Col>
            <h2 className="display-4 fw-bold mb-4">
              Why Choose <span className="gradient-text">AnonSpace</span>
            </h2>
            <p className="fs-5 text-secondary mx-auto" style={{ maxWidth: '48rem' }}>
              Built with privacy-first principles and cutting-edge technology to ensure 
              your anonymity while fostering meaningful connections.
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          {features.map((feature, index) => (
            <Col lg={4} md={6} key={index}>
              <div 
                className="glass-effect p-4 rounded-3 h-100" 
                style={{ 
                  transition: 'all 0.3s ease',
                  animationDelay: `${index * 0.1}s`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.querySelector('i').style.color = 'var(--anon-secondary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.querySelector('i').style.color = 'var(--anon-accent)';
                }}
              >
                <i className={`bi ${feature.icon} fs-1 text-anon-accent mb-3 d-block`} 
                   style={{ transition: 'color 0.3s ease' }}></i>
                <h5 className="fw-semibold mb-3 text-white">{feature.title}</h5>
                <p className="text-secondary mb-0 lh-base">{feature.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FeaturesSection;
