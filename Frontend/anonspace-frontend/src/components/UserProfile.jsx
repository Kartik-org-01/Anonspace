import React, { useState } from 'react';
import { Modal, Form, Button, Badge, Row, Col } from 'react-bootstrap';

const UserProfile = ({ show, onHide, user }) => {
  const [interests, setInterests] = useState(['Fashion', 'Gardening', 'Pets', 'Technology', 'Music']);
  const [newInterest, setNewInterest] = useState('');

  const availableInterests = [
    'Technology', 'Music', 'Movies', 'Sports', 'Art', 'Travel', 'Food', 'Books',
    'Gaming', 'Photography', 'Fitness', 'Science', 'Fashion', 'Gardening', 'Pets'
  ];

  const addInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const removeInterest = (interest) => {
    setInterests(interests.filter(i => i !== interest));
  };

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      centered
      size="lg"
      contentClassName="modal-content-subtle border-0 shadow-lg"
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="gradient-text fw-bold">
          <i className="bi bi-person-circle me-2"></i>
          Profile Settings
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="px-4">
        <Row>
          <Col md={4} className="text-center mb-4">
            <div className="d-flex align-items-center justify-content-center bg-anon-accent rounded-circle mx-auto mb-3" 
                 style={{ width: '100px', height: '100px' }}>
              <i className="bi bi-person-fill text-white" style={{ fontSize: '3rem' }}></i>
            </div>
            <h5 className="text-anon-text">Anonymous User</h5>
            <p className="text-anon-light small mb-0">Member since today</p>
          </Col>
          
          <Col md={8}>
            <h6 className="text-anon-text fw-semibold mb-3">
              <i className="bi bi-heart me-2 text-anon-accent"></i>
              Your Interests
            </h6>
            
            <div className="mb-3">
              {interests.map((interest, index) => (
                <Badge 
                  key={index}
                  className="me-2 mb-2 p-2"
                  style={{ 
                    background: 'rgba(99, 102, 241, 0.2)',
                    color: 'var(--anon-accent)',
                    border: '1px solid var(--anon-accent)'
                  }}
                >
                  {interest}
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="p-0 ms-2 text-anon-accent"
                    onClick={() => removeInterest(interest)}
                  >
                    <i className="bi bi-x"></i>
                  </Button>
                </Badge>
              ))}
            </div>

            <Form.Group className="mb-3">
              <Form.Label className="text-anon-text">Add New Interest</Form.Label>
              <div className="d-flex gap-2">
                <Form.Control
                  type="text"
                  placeholder="Enter interest..."
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  className="form-control-subtle"
                  list="interests-list"
                />
                <datalist id="interests-list">
                  {availableInterests.map((interest, index) => (
                    <option key={index} value={interest} />
                  ))}
                </datalist>
                <Button 
                  className="btn-anon-accent"
                  onClick={addInterest}
                  disabled={!newInterest.trim()}
                >
                  <i className="bi bi-plus"></i>
                </Button>
              </div>
            </Form.Group>

            <h6 className="text-anon-text fw-semibold mb-3">
              <i className="bi bi-gear me-2 text-anon-secondary"></i>
              Chat Preferences
            </h6>
            
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Allow others to see my interests"
                className="text-anon-text"
                defaultChecked
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Enable typing indicators"
                className="text-anon-text"
                defaultChecked
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Auto-connect to next chat after disconnect"
                className="text-anon-text"
              />
            </Form.Group>
          </Col>
        </Row>
      </Modal.Body>
      
      <Modal.Footer className="border-0">
        <Button variant="outline-secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button className="btn-anon-accent" onClick={onHide}>
          <i className="bi bi-check-circle me-1"></i>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserProfile;
