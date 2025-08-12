import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      text: "AnonSpace gave me the courage to share my thoughts without fear of judgment. It's incredibly liberating!",
      author: "Anonymous User",
      role: "Mental Health Advocate"
    },
    {
      text: "The privacy features are top-notch. I finally found a platform where I can be completely honest.",
      author: "Anonymous User", 
      role: "Privacy Enthusiast"
    },
    {
      text: "Amazing community support. People here truly understand and help each other without knowing identities.",
      author: "Anonymous User",
      role: "Community Member"
    },
    {
      text: "Perfect for getting honest feedback on ideas without workplace politics getting in the way.",
      author: "Anonymous User",
      role: "Entrepreneur"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-5">
      <Container>
        <Row className="text-center mb-5 animate-fadeIn">
          <Col>
            <h2 className="display-4 fw-bold mb-4">
              What Our <span className="gradient-text">Community</span> Says
            </h2>
            <p className="fs-5 text-secondary mx-auto" style={{ maxWidth: '48rem' }}>
              Real feedback from real users who value their privacy and freedom of expression.
            </p>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="glass-effect p-5 rounded-3 position-relative">
              <div className="text-center">
                <blockquote className="fs-3 fw-light text-light mb-4 lh-base">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                
                <div className="d-flex align-items-center justify-content-center gap-3">
                  <div className="d-flex align-items-center justify-content-center bg-anon-accent rounded-circle" 
                       style={{ width: '48px', height: '48px' }}>
                    <span className="text-white fw-bold">A</span>
                  </div>
                  <div>
                    <p className="fw-semibold text-white mb-0">
                      {testimonials[currentTestimonial].author}
                    </p>
                    <p className="text-secondary mb-0">
                      {testimonials[currentTestimonial].role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <Button
                variant="link"
                onClick={prevTestimonial}
                className="position-absolute start-0 top-50 translate-middle-y text-anon-accent p-2"
                style={{ border: 'none', fontSize: '1.5rem' }}
              >
                <i className="bi bi-chevron-left"></i>
              </Button>
              
              <Button
                variant="link"
                onClick={nextTestimonial}
                className="position-absolute end-0 top-50 translate-middle-y text-anon-accent p-2"
                style={{ border: 'none', fontSize: '1.5rem' }}
              >
                <i className="bi bi-chevron-right"></i>
              </Button>
            </div>

            {/* Dots Indicator */}
            <div className="d-flex justify-content-center mt-4 gap-2">
              {testimonials.map((_, index) => (
                <Button
                  key={index}
                  variant="link"
                  onClick={() => setCurrentTestimonial(index)}
                  className={`p-0 border-0 rounded-circle ${
                    index === currentTestimonial 
                      ? 'bg-anon-accent' 
                      : 'bg-secondary'
                  }`}
                  style={{
                    width: '12px',
                    height: '12px',
                    transform: index === currentTestimonial ? 'scale(1.25)' : 'scale(1)',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TestimonialsSection;
