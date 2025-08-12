import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, InputGroup, Alert, Spinner, ProgressBar } from 'react-bootstrap';

const SignupModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    acceptNewsletter: false
  });
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setFormData({ 
        email: '', 
        password: '', 
        confirmPassword: '', 
        acceptTerms: false,
        acceptNewsletter: false 
      });
      setError('');
      setValidationErrors({});
      setPasswordStrength(0);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    return strength;
  };

  const getPasswordStrengthColor = (strength) => {
    if (strength < 25) return 'danger';
    if (strength < 50) return 'warning';
    if (strength < 75) return 'info';
    return 'success';
  };

  const getPasswordStrengthText = (strength) => {
    if (strength < 25) return 'Very Weak';
    if (strength < 50) return 'Weak';
    if (strength < 75) return 'Good';
    return 'Strong';
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.acceptTerms) {
      errors.acceptTerms = 'You must accept the Terms of Service';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newFormData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    };
    
    setFormData(newFormData);
    
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
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
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Signup successful:', formData);
      onClose();
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
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
            <div className="d-flex align-items-center justify-content-center bg-anon-secondary rounded-circle me-3 animate-glow" 
                 style={{ width: '50px', height: '50px' }}>
              <i className="bi bi-person-plus-fill text-white fs-5"></i>
            </div>
            <div>
              <h2 className="gradient-text mb-0 fw-bold">Join AnonSpace</h2>
              <p className="text-anon-light small mb-0">Create your anonymous account in seconds</p>
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
          <Form.Group className="mb-3">
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

          <Form.Group className="mb-3">
            <Form.Label className="text-anon-text fw-semibold mb-2">
              <i className="bi bi-lock me-2 text-anon-accent"></i>Password
            </Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a strong password"
                className={`form-control-subtle ${
                  validationErrors.password ? 'border-danger' : ''
                }`}
                style={{ borderRight: 'none' }}
                disabled={isLoading}
                autoComplete="new-password"
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
            
            {formData.password && (
              <div className="mt-2">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <small className="text-anon-text-light">Password Strength:</small>
                  <small className={`text-${getPasswordStrengthColor(passwordStrength)}`}>
                    {getPasswordStrengthText(passwordStrength)}
                  </small>
                </div>
                <ProgressBar 
                  now={passwordStrength} 
                  variant={getPasswordStrengthColor(passwordStrength)}
                  style={{ height: '4px' }}
                />
              </div>
            )}
            
            {validationErrors.password && (
              <Form.Text className="text-danger mt-1">
                <i className="bi bi-exclamation-circle me-1"></i>
                {validationErrors.password}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-anon-text fw-semibold mb-2">
              <i className="bi bi-shield-check me-2 text-anon-accent"></i>Confirm Password
            </Form.Label>
            <InputGroup>
              <Form.Control
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                className={`form-control-subtle ${
                  validationErrors.confirmPassword ? 'border-danger' : ''
                }`}
                style={{ borderRight: 'none' }}
                disabled={isLoading}
                autoComplete="new-password"
              />
              <Button
                variant="link"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="bg-anon-light border border-start-0 text-anon-text-light px-3"
                style={{ 
                  borderColor: validationErrors.confirmPassword ? '#dc3545' : 'var(--anon-border)',
                  borderRadius: '0 12px 12px 0'
                }}
                disabled={isLoading}
              >
                <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
              </Button>
            </InputGroup>
            {validationErrors.confirmPassword && (
              <Form.Text className="text-danger mt-1">
                <i className="bi bi-exclamation-circle me-1"></i>
                {validationErrors.confirmPassword}
              </Form.Text>
            )}
          </Form.Group>

          <div className="mb-3">
            <Form.Check
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleInputChange}
              label={
                <span className="text-anon-text">
                  I agree to the{' '}
                  <a href="#" className="text-anon-accent text-decoration-none fw-medium">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-anon-accent text-decoration-none fw-medium">
                    Privacy Policy
                  </a>
                </span>
              }
              className={validationErrors.acceptTerms ? 'text-danger' : ''}
              disabled={isLoading}
            />
            {validationErrors.acceptTerms && (
              <Form.Text className="text-danger mt-1">
                <i className="bi bi-exclamation-circle me-1"></i>
                {validationErrors.acceptTerms}
              </Form.Text>
            )}
          </div>

          <div className="mb-4">
            <Form.Check
              type="checkbox"
              name="acceptNewsletter"
              checked={formData.acceptNewsletter}
              onChange={handleInputChange}
              label={
                <span className="text-anon-text">
                  <i className="bi bi-envelope me-1"></i>
                  Send me updates about new features and privacy tips
                </span>
              }
              disabled={isLoading}
            />
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
                Creating Account...
              </>
            ) : (
              <>
                <i className="bi bi-person-plus me-2"></i>
                Create Account
              </>
            )}
          </Button>
        </Form>

        <hr style={{ color: 'var(--anon-border)', margin: '1.5rem 0' }} />

        <div className="text-center">
          <p className="text-anon-text mb-0">
            Already have an account?{' '}
            <Button 
              variant="link" 
              onClick={onSwitchToLogin}
              className="text-anon-accent p-0 text-decoration-none fw-semibold"
              disabled={isLoading}
            >
              Sign in here
            </Button>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SignupModal;
