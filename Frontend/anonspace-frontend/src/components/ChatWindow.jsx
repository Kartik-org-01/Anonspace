import React, { useState, useEffect, useRef } from 'react';
import { Card, Form, Button, InputGroup, Badge, Dropdown } from 'react-bootstrap';

const ChatWindow = ({ chat, onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey! How are you doing?",
      sender: 'stranger',
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: 2,
      text: "Hi there! I'm doing great, thanks for asking. How about you?",
      sender: 'you',
      timestamp: new Date(Date.now() - 240000)
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [partnerConnected, setPartnerConnected] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        text: message,
        sender: 'you',
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Simulate stranger typing
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
    onClose();
  };

  return (
    <>
      <style jsx>{`
        .chat-window {
          height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .chat-header {
          background: rgba(248, 250, 252, 0.08);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(248, 250, 252, 0.1);
          padding: 1rem;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
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
          margin-left: auto;
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

      <div className="chat-window">
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
            
            <div className="d-flex align-items-center gap-2">
              <Dropdown>
                <Dropdown.Toggle 
                  variant="link" 
                  className="text-anon-accent p-0 border-0"
                  style={{ boxShadow: 'none' }}
                >
                  <i className="bi bi-three-dots-vertical fs-5"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-custom">
                  <Dropdown.Item className="dropdown-item-custom">
                    <i className="bi bi-flag me-2"></i>Report User
                  </Dropdown.Item>
                  <Dropdown.Item className="dropdown-item-custom">
                    <i className="bi bi-volume-mute me-2"></i>Mute Chat
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              
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
        </div>

        {/* Chat Messages */}
        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className="d-flex mb-3">
              <div className={`message-bubble ${msg.sender === 'you' ? 'message-you' : 'message-stranger'}`}>
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
          <div ref={messagesEndRef} />
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
          
          {!partnerConnected && (
            <div className="text-center mt-2">
              <small className="text-anon-light">
                <i className="bi bi-exclamation-triangle me-1"></i>
                Partner disconnected. Start a new chat to continue.
              </small>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatWindow;
