import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge, Spinner } from 'react-bootstrap';
import { getAIChatResponse } from '../services/aiChatService';

function CaregiverMessages() {
  const [selectedChat, setSelectedChat] = useState('ai');
  const [messageText, setMessageText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'PawMate AI Assistant',
      text: 'Hello! I am your PawMate AI Care Assistant. Ask me anything about pet nutrition, daily walking schedules, medication tips, or care coordination!',
      time: 'Just now',
      isMe: false,
      chatId: 'ai'
    },
    {
      id: 2,
      sender: 'Shrey Vora (Bruno\'s Parent)',
      text: 'Hi Rahul! Just confirming if our 10:00 AM dog walk tomorrow is still on?',
      time: '09:15 AM',
      isMe: false,
      chatId: 'shrey'
    },
    {
      id: 3,
      sender: 'Me',
      text: 'Yes Shrey! I will be there at 10 AM sharp. Bruno and I will take the shady park trail.',
      time: '09:20 AM',
      isMe: true,
      chatId: 'shrey'
    },
    {
      id: 4,
      sender: 'Priya Mehta (Mimi\'s Parent)',
      text: 'Hello Rahul, did Mimi take her afternoon dental treat and water?',
      time: '02:40 PM',
      isMe: false,
      chatId: 'priya'
    }
  ]);

  const activeMessages = messages.filter((m) => m.chatId === selectedChat);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const cleanText = messageText.trim();
    if (!cleanText || isTyping) return;

    setErrorMessage('');

    // Append user's outgoing message
    const userMsg = {
      id: Date.now(),
      sender: 'Me',
      text: cleanText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      chatId: selectedChat
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setMessageText('');
    setIsTyping(true);

    try {
      // Call our dedicated AI service with exact user query
      const aiReply = await getAIChatResponse(cleanText, activeMessages);

      const botMsg = {
        id: Date.now() + 1,
        sender: selectedChat === 'ai' ? 'PawMate AI Assistant' : (selectedChat === 'shrey' ? 'Shrey Vora' : 'Priya Mehta'),
        text: aiReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: false,
        chatId: selectedChat
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Failed to get AI message reply:', err);
      setErrorMessage('Could not load AI reply. Please check connection.');
    } finally {
      setIsTyping(false);
    }
  };

  const getChatHeader = () => {
    switch (selectedChat) {
      case 'ai':
        return {
          title: 'PawMate AI Assistant',
          subtitle: 'Certified Pet Care AI Knowledge Base',
          badge: '🤖 AI Online'
        };
      case 'shrey':
        return {
          title: 'Shrey Vora (Parent of Bruno)',
          subtitle: 'Golden Retriever • Chembur Park Walk',
          badge: '🟢 Active Client'
        };
      case 'priya':
      default:
        return {
          title: 'Priya Mehta (Parent of Mimi)',
          subtitle: 'Persian Cat • In-Home Sitting',
          badge: '🟢 Active Client'
        };
    }
  };

  const chatInfo = getChatHeader();

  return (
    <div className="pawmate-page-container py-5">
      <Container>
        <div className="mb-4 reveal-on-scroll">
          <div className="pawmate-eyebrow mb-1">LIVE & AI ASSISTED COMMUNICATIONS</div>
          <h1 className="pawmate-page-title mb-1">Messages & Parent Updates</h1>
          <p className="text-muted small mb-0">Chat directly with pet parents and consult our PawMate AI Care Assistant for instant guidance.</p>
        </div>

        <Card className="rounded-4 border shadow-sm bg-white overflow-hidden reveal-on-scroll">
          <Row className="g-0">
            {/* Conversations Sidebar */}
            <Col xs={12} md={4} className="border-end bg-light">
              <div className="p-3 border-bottom bg-white d-flex justify-content-between align-items-center">
                <strong className="small text-muted text-uppercase letter-spacing-1">Conversations</strong>
                <Badge style={{ backgroundColor: '#d6ebd9', color: '#1a4331' }}>Live API</Badge>
              </div>
              <div className="d-flex flex-column">
                {/* AI Assistant Channel */}
                <div
                  className={`p-3 border-bottom d-flex align-items-center gap-3 transition-all ${
                    selectedChat === 'ai' ? 'bg-white border-start border-4 border-forest shadow-xs' : ''
                  }`}
                  style={{ cursor: 'pointer', backgroundColor: selectedChat === 'ai' ? '#ffffff' : 'transparent' }}
                  onClick={() => setSelectedChat('ai')}
                >
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                    style={{ width: '44px', height: '44px', backgroundColor: '#1a4331', color: '#ffffff', minWidth: '44px', fontSize: '1.2rem' }}
                  >
                    🤖
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-center">
                      <h3 className="h6 fw-bold mb-0 text-dark">PawMate AI</h3>
                      <span className="badge rounded-pill" style={{ backgroundColor: '#d6ebd9', color: '#1a4331', fontSize: '0.65rem' }}>AI</span>
                    </div>
                    <span className="small text-muted d-block">Instant pet care advice & answers</span>
                  </div>
                </div>

                {/* Shrey Vora Channel */}
                <div
                  className={`p-3 border-bottom d-flex align-items-center gap-3 transition-all ${
                    selectedChat === 'shrey' ? 'bg-white border-start border-4 border-forest shadow-xs' : ''
                  }`}
                  style={{ cursor: 'pointer', backgroundColor: selectedChat === 'shrey' ? '#ffffff' : 'transparent' }}
                  onClick={() => setSelectedChat('shrey')}
                >
                  <img
                    src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=100&auto=format&fit=crop&q=80"
                    alt="Shrey Vora"
                    className="rounded-circle object-fit-cover shadow-sm border border-2 border-forest"
                    width="44"
                    height="44"
                  />
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-center">
                      <h3 className="h6 fw-bold mb-0 text-dark">Shrey Vora</h3>
                      <span className="text-muted" style={{ fontSize: '0.7rem' }}>09:20 AM</span>
                    </div>
                    <span className="small text-muted d-block">Bruno (Golden Retriever)</span>
                  </div>
                </div>

                {/* Priya Mehta Channel */}
                <div
                  className={`p-3 border-bottom d-flex align-items-center gap-3 transition-all ${
                    selectedChat === 'priya' ? 'bg-white border-start border-4 border-forest shadow-xs' : ''
                  }`}
                  style={{ cursor: 'pointer', backgroundColor: selectedChat === 'priya' ? '#ffffff' : 'transparent' }}
                  onClick={() => setSelectedChat('priya')}
                >
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="Priya Mehta"
                    className="rounded-circle object-fit-cover shadow-sm border border-2 border-forest"
                    width="44"
                    height="44"
                  />
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-center">
                      <h3 className="h6 fw-bold mb-0 text-dark">Priya Mehta</h3>
                      <span className="text-muted" style={{ fontSize: '0.7rem' }}>02:45 PM</span>
                    </div>
                    <span className="small text-muted d-block">Mimi (Persian Cat)</span>
                  </div>
                </div>
              </div>
            </Col>

            {/* Chat Thread */}
            <Col xs={12} md={8} className="d-flex flex-column bg-white" style={{ minHeight: '480px' }}>
              <div className="p-3 border-bottom bg-light d-flex align-items-center justify-content-between">
                <div>
                  <strong className="text-dark d-block">{chatInfo.title}</strong>
                  <span className="text-muted" style={{ fontSize: '0.75rem' }}>{chatInfo.subtitle}</span>
                </div>
                <Badge style={{ backgroundColor: '#d6ebd9', color: '#1a4331', border: '1px solid #b7ddbd' }}>
                  {chatInfo.badge}
                </Badge>
              </div>

              {/* Message History */}
              <div
                className="p-4 flex-grow-1 d-flex flex-column gap-3 overflow-y-auto"
                style={{ maxHeight: '360px', backgroundColor: '#fcfbf7' }}
              >
                {activeMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`d-flex flex-column ${msg.isMe ? 'align-items-end' : 'align-items-start'}`}
                  >
                    {!msg.isMe && (
                      <span className="small fw-bold text-forest mb-1 px-1" style={{ fontSize: '0.75rem' }}>
                        {msg.sender}
                      </span>
                    )}
                    <div
                      className="p-3 rounded-4 shadow-sm"
                      style={{
                        maxWidth: '82%',
                        backgroundColor: msg.isMe ? '#1a4331' : '#ffffff',
                        color: msg.isMe ? '#ffffff' : '#111827',
                        border: msg.isMe ? '1px solid #1a4331' : '1px solid #e5e7eb',
                        fontSize: '0.9rem',
                        lineHeight: '1.55'
                      }}
                    >
                      {msg.text}
                    </div>
                    <span
                      className="text-muted mt-1 px-1"
                      style={{ fontSize: '0.72rem', color: '#6b7280' }}
                    >
                      {msg.time}
                    </span>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="d-flex align-items-center gap-2 text-muted small p-2">
                    <Spinner animation="grow" size="sm" variant="success" />
                    <span>{selectedChat === 'ai' ? 'PawMate AI is thinking...' : 'Typing...'}</span>
                  </div>
                )}

                {errorMessage && (
                  <div className="alert alert-warning py-2 px-3 small mb-0 rounded-3">
                    ⚠️ {errorMessage}
                  </div>
                )}
              </div>

              {/* Message Input Box */}
              <Form onSubmit={handleSendMessage} className="p-3 border-top bg-white d-flex gap-2">
                <Form.Control
                  type="text"
                  placeholder={selectedChat === 'ai' ? 'Ask PawMate AI any pet care or safety question...' : 'Type a message to pet parent...'}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  disabled={isTyping}
                  className="py-2"
                  style={{ borderRadius: '9999px' }}
                />
                <Button
                  type="submit"
                  disabled={isTyping || !messageText.trim()}
                  className="px-4 py-2 rounded-pill fw-bold pawmate-btn-primary shadow-sm"
                  style={{ backgroundColor: '#1a4331', borderColor: '#1a4331', color: '#ffffff' }}
                >
                  {isTyping ? 'Sending...' : 'Send ➔'}
                </Button>
              </Form>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
}

export default CaregiverMessages;
