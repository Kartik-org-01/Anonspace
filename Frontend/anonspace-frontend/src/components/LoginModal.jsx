import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, InputGroup, Alert, Spinner } from 'react-bootstrap';

const LoginModal = ({ isOpen, onClose, onSwitchToSignup }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setFormData({ email: '', password: '', rememberMe: false });
      setError('');
      setValidationErrors({});
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: ''
      });
    }
    
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (formData.email === 'demo@anonspace.com' && formData.password === 'demo123') {
        console.log('Login successful:', formData);
        onClose();
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
  };

  return (
    <Modal 
      show={isOpen} 
      onHide={onClose} 
      centered
      backdrop="static"
      contentClassName="modal-content-subtle border-0 shadow-lg"
      size="md"
    >
      <Modal.Header closeButton className="border-0 pb-2">
        <Modal.Title className="w-100 text-center">
          <div className="d-flex align-items-center justify-content-center mb-3">
            <div className="d-flex align-items-center justify-content-center bg-anon-accent rounded-circle me-3 animate-glow" 
                 style={{ width: '50px', height: '50px' }}>
              <i className="bi bi-person-fill text-white fs-5"></i>
            </div>
            <div>
              <h2 className="gradient-text mb-0 fw-bold">Welcome Back</h2>
              <p className="text-anon-light small mb-0">Sign in to continue to AnonSpace</p>
            </div>
          </div>
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="pt-2 px-4 pb-4">
        {error && (
          <Alert variant="danger" className="bg-danger bg-opacity-10 border-danger text-danger border-0 rounded-3">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-4">
            <Form.Label className="text-anon-text fw-semibold mb-2">
              <i className="bi bi-envelope me-2 text-anon-accent"></i>Email Address
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email address"
              className={`form-control-subtle ${
                validationErrors.email ? 'border-danger' : ''
              }`}
              disabled={isLoading}
              autoComplete="email"
            />
            {validationErrors.email && (
              <Form.Text className="text-danger mt-1">
                <i className="bi bi-exclamation-circle me-1"></i>
                {validationErrors.email}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="text-anon-text fw-semibold mb-2">
              <i className="bi bi-lock me-2 text-anon-accent"></i>Password
            </Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className={`form-control-subtle ${
                  validationErrors.password ? 'border-danger' : ''
                }`}
                style={{ borderRight: 'none' }}
                disabled={isLoading}
                autoComplete="current-password"
              />
              <Button
                variant="link"
                onClick={() => setShowPassword(!showPassword)}
                className="bg-anon-light border border-start-0 text-anon-text-light px-3"
                style={{ 
                  borderColor: validationErrors.password ? '#dc3545' : 'var(--anon-border)',
                  borderRadius: '0 12px 12px 0'
                }}
                disabled={isLoading}
              >
                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
              </Button>
            </InputGroup>
            {validationErrors.password && (
              <Form.Text className="text-danger mt-1">
                <i className="bi bi-exclamation-circle me-1"></i>
                {validationErrors.password}
              </Form.Text>
            )}
          </Form.Group>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <Form.Check
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              label="Remember me"
              className="text-anon-text"
              disabled={isLoading}
            />
            <Button 
              variant="link" 
              onClick={handleForgotPassword}
              className="text-anon-accent p-0 text-decoration-none fw-medium small"
              disabled={isLoading}
            >
              Forgot password?
            </Button>
          </div>

          <Button 
            type="submit" 
            className="w-100 btn-anon-accent py-3 fs-6 fw-semibold mb-3 rounded-3"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Signing in...
              </>
            ) : (
              <>
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Sign In
              </>
            )}
          </Button>

          <div className="alert alert-info bg-info bg-opacity-10 border-info text-info small text-center rounded-3">
            <i className="bi bi-info-circle me-1"></i>
            <strong>Demo:</strong> email: demo@anonspace.com | password: demo123
          </div>
        </Form>

        <hr style={{ color: 'var(--anon-border)', margin: '1.5rem 0' }} />

        <div className="text-center">
          <p className="text-anon-text mb-0">
            Don't have an account?{' '}
            <Button 
              variant="link" 
              onClick={onSwitchToSignup}
              className="text-anon-accent p-0 text-decoration-none fw-semibold"
              disabled={isLoading}
            >
              Create one now
            </Button>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
