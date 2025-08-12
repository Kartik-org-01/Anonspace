import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, InputGroup, Badge, Modal } from 'react-bootstrap';
// Remove these imports - we'll implement everything in this single component
// import ChatSidebar from './ChatSidebar';
// import ChatWindow from './ChatWindow';
// import UserProfile from './UserProfile';

const ChatDashboard = ({ user, onLogout }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [userInterests, setUserInterests] = useState(['Fashion', 'Gardening', 'Pets']);
  const [selectedGender, setSelectedGender] = useState('Both');
  const [onlineUsers, setOnlineUsers] = useState(1247);

  // Chat functionality state
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [partnerConnected, setPartnerConnected] = useState(false);

  const startChat = () => {
    setIsMatching(true);
    
    // Simulate matching process
    setTimeout(() => {
      setIsMatching(false);
      setPartnerConnected(true);
      setSelectedChat({ id: 1, partner: 'Anonymous Stranger' });
      setMessages([
        {
          id: 1,
          text: "Hey! How are you doing?",
          sender: 'stranger',
          timestamp: new Date()
        }
      ]);
    }, 3000);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && partnerConnected) {
      const newMessage = {
        id: Date.now(),
        text: message,
        sender: 'you',
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Simulate stranger response
      setTimeout(() => setIsTyping(true), 1000);
      setTimeout(() => {
        setIsTyping(false);
        const strangerMessage = {
          id: Date.now() + 1,
          text: "That's interesting! Tell me more about that.",
          sender: 'stranger',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, strangerMessage]);
      }, 3000);
    }
  };

  const disconnectChat = () => {
    setPartnerConnected(false);
    setSelectedChat(null);
    setMessages([]);
  };

  const renderChatWindow = () => (
    <div className="main-chat-area h-100 d-flex flex-column">
      {/* Chat Header */}
      <div className="chat-header">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center justify-content-center bg-anon-secondary rounded-circle me-3" 
                 style={{ width: '40px', height: '40px' }}>
              <i className="bi bi-person-fill text-white"></i>
            </div>
            <div>
              <h6 className="text-white mb-0">Anonymous Stranger</h6>
              <div className="connection-status">
                <i className="bi bi-circle-fill me-1" style={{ fontSize: '0.6rem' }}></i>
                {partnerConnected ? 'Connected' : 'Disconnected'}
              </div>
            </div>
          </div>
          
          <Button 
            variant="outline-danger" 
            size="sm"
            onClick={disconnectChat}
          >
            <i className="bi bi-telephone-x me-1"></i>
            Disconnect
          </Button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="chat-messages flex-grow-1 overflow-auto p-3">
        {messages.map((msg) => (
          <div key={msg.id} className="d-flex mb-3">
            <div className={`message-bubble ${msg.sender === 'you' ? 'message-you ms-auto' : 'message-stranger'}`}>
              <div>{msg.text}</div>
              <div className="message-time text-end">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="d-flex mb-3">
            <div className="typing-indicator">
              <div className="typing-dots">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="chat-input-area">
        <Form onSubmit={sendMessage}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="message-input"
              disabled={!partnerConnected}
            />
            <Button 
              type="submit" 
              className="send-btn"
              disabled={!message.trim() || !partnerConnected}
            >
              <i className="bi bi-send-fill"></i>
            </Button>
          </InputGroup>
        </Form>
      </div>
    </div>
  );

  const renderWelcomeScreen = () => (
    <div className="d-flex align-items-center justify-content-center h-100 p-4">
      <div className="text-center">
        <div className="d-flex align-items-center justify-content-center bg-anon-accent rounded-circle mx-auto mb-4 animate-float" 
             style={{ width: '120px', height: '120px' }}>
          <i className="bi bi-chat-dots text-white" style={{ fontSize: '3rem' }}></i>
        </div>
        <h3 className="gradient-text fw-bold mb-3">Welcome to AnonSpace</h3>
        <p className="text-anon-light mb-4 fs-5">
          Connect with people around the world anonymously and safely
        </p>
        
        {/* Feature Cards */}
        <Row className="g-3 mt-4">
          <Col md={4}>
            <div className="feature-card">
              <i className="bi bi-shield-check fs-1 text-anon-secondary mb-3"></i>
              <h6 className="text-white mb-2">100% Anonymous</h6>
              <p className="text-anon-light small mb-0">
                Your identity stays completely hidden
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="feature-card">
              <i className="bi bi-lightning-charge fs-1 text-anon-accent mb-3"></i>
              <h6 className="text-white mb-2">Instant Matching</h6>
              <p className="text-anon-light small mb-0">
                Get connected with someone in seconds
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="feature-card">
              <i className="bi bi-globe fs-1 text-anon-secondary mb-3"></i>
              <h6 className="text-white mb-2">Global Community</h6>
              <p className="text-anon-light small mb-0">
                Chat with people from around the world
              </p>
            </div>
          </Col>
        </Row>

        <p className="text-anon-light mt-4">
          <i className="bi bi-arrow-left me-2"></i>
          Click "Start Text Chat" to begin your anonymous conversation
        </p>
      </div>
    </div>
  );

  return (
    <>
      <style jsx>{`
        .chat-dashboard {
          height: 100vh;
          background: linear-gradient(135deg, #1a1d23 0%, #2a2d35 100%);
          overflow: hidden;
        }

        .sidebar-section {
          background: rgba(248, 250, 252, 0.05);
          border-right: 1px solid rgba(248, 250, 252, 0.1);
          height: 100vh;
          backdrop-filter: blur(10px);
        }

        .main-chat-area {
          background: rgba(248, 250, 252, 0.02);
          height: 100vh;
        }

        .interests-section {
          background: rgba(248, 250, 252, 0.05);
          border-radius: 15px;
          padding: 1rem;
          margin-bottom: 1rem;
          border: 1px solid rgba(99, 102, 241, 0.2);
        }

        .interest-tag {
          background: rgba(99, 102, 241, 0.2);
          color: var(--anon-accent);
          border: 1px solid var(--anon-accent);
          padding: 0.25rem 0.75rem;
          border-radius: 15px;
          font-size: 0.85rem;
          margin: 0.25rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .interest-tag:hover {
          background: var(--anon-accent);
          color: white;
          transform: scale(1.05);
        }

        .gender-filter {
          background: rgba(248, 250, 252, 0.05);
          border-radius: 15px;
          padding: 1rem;
          margin-bottom: 1rem;
          border: 1px solid rgba(6, 182, 212, 0.2);
        }

        .gender-option {
          background: rgba(248, 250, 252, 0.1);
          border: 2px solid rgba(248, 250, 252, 0.2);
          color: var(--anon-text-light);
          padding: 0.75rem 1rem;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
          margin: 0.25rem;
        }

        .gender-option.active {
          background: linear-gradient(135deg, var(--anon-accent), var(--anon-secondary));
          border-color: var(--anon-accent);
          color: white;
        }

        .gender-option:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
        }

        .start-chat-btn {
          background: linear-gradient(135deg, var(--anon-secondary), var(--anon-accent));
          border: none;
          color: white;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(6, 182, 212, 0.3);
        }

        .start-chat-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(6, 182, 212, 0.4);
        }

        .start-chat-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .online-counter {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          border: 1px solid #10b981;
        }

        .matching-animation {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        .header-dashboard {
          background: rgba(248, 250, 252, 0.08);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(248, 250, 252, 0.1);
          padding: 1rem 0;
        }

        .welcome-section {
          background: rgba(248, 250, 252, 0.05);
          border-radius: 20px;
          padding: 2rem;
          margin-bottom: 2rem;
          border: 1px solid rgba(99, 102, 241, 0.2);
          text-align: center;
        }

        .feature-card {
          background: rgba(248, 250, 252, 0.05);
          border: 1px solid rgba(248, 250, 252, 0.1);
          border-radius: 15px;
          padding: 1.5rem;
          height: 100%;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(99, 102, 241, 0.2);
          border-color: var(--anon-accent);
        }

        .chat-header {
          background: rgba(248, 250, 252, 0.08);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(248, 250, 252, 0.1);
          padding: 1rem;
        }

        .chat-messages {
          background: rgba(248, 250, 252, 0.02);
        }

        .message-bubble {
          max-width: 70%;
          padding: 0.75rem 1rem;
          border-radius: 18px;
          margin-bottom: 0.5rem;
          word-wrap: break-word;
        }

        .message-you {
          background: linear-gradient(135deg, var(--anon-accent), var(--anon-secondary));
          color: white;
          border-bottom-right-radius: 6px;
        }

        .message-stranger {
          background: rgba(248, 250, 252, 0.1);
          color: var(--anon-text-light);
          border: 1px solid rgba(248, 250, 252, 0.2);
          border-bottom-left-radius: 6px;
        }

        .message-time {
          font-size: 0.7rem;
          opacity: 0.7;
          margin-top: 0.25rem;
        }

        .typing-indicator {
          background: rgba(248, 250, 252, 0.1);
          border: 1px solid rgba(248, 250, 252, 0.2);
          padding: 1rem;
          border-radius: 18px;
          margin-bottom: 0.5rem;
          max-width: 70px;
        }

        .typing-dots {
          display: flex;
          gap: 4px;
        }

        .typing-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--anon-accent);
          animation: typing 1.4s infinite ease-in-out;
        }

        .typing-dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-10px);
          }
        }

        .chat-input-area {
          background: rgba(248, 250, 252, 0.08);
          backdrop-filter: blur(10px);
          border-top: 1px solid rgba(248, 250, 252, 0.1);
          padding: 1rem;
        }

        .message-input {
          background: rgba(248, 250, 252, 0.1) !important;
          border: 2px solid rgba(248, 250, 252, 0.2) !important;
          color: var(--anon-text-light) !important;
          border-radius: 25px !important;
          padding: 0.75rem 1rem !important;
        }

        .message-input:focus {
          background: rgba(248, 250, 252, 0.15) !important;
          border-color: var(--anon-accent) !important;
          box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.15) !important;
        }

        .send-btn {
          background: linear-gradient(135deg, var(--anon-accent), var(--anon-secondary)) !important;
          border: none !important;
          border-radius: 50% !important;
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .connection-status {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
          padding: 0.25rem 0.75rem;
          border-radius: 15px;
          font-size: 0.8rem;
          border: 1px solid #10b981;
        }
      `}</style>

      <div className="chat-dashboard">
        {/* Header */}
        <div className="header-dashboard">
          <Container fluid>
            <Row className="align-items-center">
              <Col md={3}>
                <div className="d-flex align-items-center">
                  <div className="d-flex align-items-center justify-content-center bg-anon-accent rounded me-2 animate-glow" 
                       style={{ width: '35px', height: '35px' }}>
                    <i className="bi bi-eye-slash-fill text-white"></i>
                  </div>
                  <span className="fs-4 fw-bold gradient-text">AnonSpace</span>
                </div>
              </Col>
              <Col md={6} className="text-center">
                <div className="online-counter d-inline-block">
                  <i className="bi bi-circle-fill me-1" style={{ fontSize: '0.7rem' }}></i>
                  {onlineUsers.toLocaleString()} users online
                </div>
              </Col>
              <Col md={3} className="text-end">
                <Button 
                  variant="link" 
                  onClick={() => setShowUserProfile(true)}
                  className="text-anon-accent me-3"
                >
                  <i className="bi bi-person-circle fs-4"></i>
                </Button>
                <Button 
                  variant="outline-danger" 
                  onClick={onLogout}
                  size="sm"
                >
                  <i className="bi bi-box-arrow-right me-1"></i>Logout
                </Button>
              </Col>
            </Row>
          </Container>
        </div>

        <Container fluid className="h-100">
          <Row className="h-100">
            {/* Sidebar */}
            <Col md={3} className="sidebar-section p-0">
              <div className="p-3 h-100">
                {/* Welcome Section */}
                <div className="welcome-section">
                  <div className="d-flex align-items-center justify-content-center bg-anon-secondary rounded-circle mx-auto mb-3" 
                       style={{ width: '60px', height: '60px' }}>
                    <i className="bi bi-chat-heart-fill text-white fs-3"></i>
                  </div>
                  <h5 className="gradient-text fw-bold mb-2">Ready to Connect?</h5>
                  <p className="text-anon-light small mb-0">
                    Find someone to chat with anonymously and safely
                  </p>
                </div>

                {/* Your Interests */}
                <div className="interests-section">
                  <h6 className="text-white fw-semibold mb-3">
                    <i className="bi bi-heart me-2 text-anon-accent"></i>
                    Your Interests
                  </h6>
                  <div className="d-flex flex-wrap">
                    {userInterests.map((interest, index) => (
                      <span key={index} className="interest-tag">
                        {interest}
                      </span>
                    ))}
                  </div>
                  <Button 
                    variant="link" 
                    className="text-anon-accent p-0 mt-2 small"
                    onClick={() => setShowUserProfile(true)}
                  >
                    <i className="bi bi-plus-circle me-1"></i>
                    Manage interests
                  </Button>
                </div>

                {/* Gender Filter */}
                <div className="gender-filter">
                  <h6 className="text-white fw-semibold mb-3">
                    <i className="bi bi-funnel me-2 text-anon-secondary"></i>
                    Gender Filter
                  </h6>
                  <div className="d-flex flex-column gap-2">
                    {['Male', 'Female', 'Both'].map((gender) => (
                      <div 
                        key={gender}
                        className={`gender-option ${selectedGender === gender ? 'active' : ''}`}
                        onClick={() => setSelectedGender(gender)}
                      >
                        <i className={`bi bi-${gender === 'Male' ? 'person-standing' : gender === 'Female' ? 'person-standing-dress' : 'people'} me-2`}></i>
                        {gender}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Start Chat Button */}
                <Button 
                  className={`start-chat-btn w-100 ${isMatching ? 'matching-animation' : ''}`}
                  onClick={startChat}
                  disabled={isMatching}
                >
                  {isMatching ? (
                    <>
                      <div className="spinner-border spinner-border-sm me-2" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      Finding match...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-play-circle me-2"></i>
                      Start Text Chat
                    </>
                  )}
                </Button>
              </div>
            </Col>

            {/* Main Chat Area */}
            <Col md={9} className="p-0">
              {selectedChat ? renderChatWindow() : renderWelcomeScreen()}
            </Col>
          </Row>
        </Container>

        {/* Simple User Profile Modal */}
        <Modal 
          show={showUserProfile}
          onHide={() => setShowUserProfile(false)}
          centered
          contentClassName="modal-content-subtle border-0 shadow-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title className="gradient-text">Profile Settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <div className="d-flex align-items-center justify-content-center bg-anon-accent rounded-circle mx-auto mb-3" 
                   style={{ width: '80px', height: '80px' }}>
                <i className="bi bi-person-fill text-white" style={{ fontSize: '2rem' }}></i>
              </div>
              <h5 className="text-anon-text">Anonymous User</h5>
              <p className="text-anon-light">Manage your chat preferences here</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowUserProfile(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ChatDashboard;
