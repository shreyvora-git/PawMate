import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';

function HowItWorksPage(props) {
  const steps = [
    {
      number: '01',
      title: 'Choose a Service',
      description: 'Select dog walking, in-home pet sitting, grooming, or boarding tailored to your pet’s exact routine and schedule.',
      icon: '🦮',
      badge: 'Step 1'
    },
    {
      number: '02',
      title: 'Meet Verified PawMates',
      description: 'Browse local background-checked caregivers. Compare experience, community reviews, special skills, and transparent pricing.',
      icon: '🛡️',
      badge: 'Step 2'
    },
    {
      number: '03',
      title: 'Free Meet & Greet',
      description: 'Schedule a quick consultation to ensure your pet is happy, comfortable, and excited with their chosen PawMate.',
      icon: '🤝',
      badge: 'Step 3'
    },
    {
      number: '04',
      title: 'Live Tracking & Photo Updates',
      description: 'Enjoy peace of mind with GPS walk tracking, detailed potty & meal logs, real-time photo check-ins, and 24/7 support.',
      icon: '📱',
      badge: 'Step 4'
    }
  ];

  const faqs = [
    {
      q: 'How are PawMates verified?',
      a: 'Every caregiver passes a 5-step background verification, identity check, experience assessment, and reference check.'
    },
    {
      q: 'What happens in an emergency?',
      a: 'Every booking made through PawMate includes 24/7 dedicated support and emergency veterinary assistance coverage.'
    },
    {
      q: 'Can I cancel or reschedule a booking?',
      a: 'Yes, cancellations made at least 24 hours before the scheduled session receive a full 100% refund.'
    }
  ];

  return (
    <div className="pawmate-page-container py-5">
      <Container>
        {/* Page Header */}
        <div className="text-center max-w-700 mx-auto mb-5 reveal-on-scroll">
          <Badge bg="success" className="mb-3 px-3 py-2 text-uppercase letter-spacing-1">
            Simple 4-Step Process
          </Badge>
          <h1 className="pawmate-page-title mb-3">How PawMate Works</h1>
          <p className="text-muted lead fs-6">
            We make finding compassionate, trusted, and verified care for your furry family members as simple as a few clicks.
          </p>
        </div>

        {/* Steps Grid */}
        <Row className="g-4 mb-5 reveal-on-scroll">
          {steps.map((step, idx) => (
            <Col xs={12} md={6} lg={3} key={idx}>
              <Card className="pawmate-step-card h-100 p-4 position-relative">
                <div className="step-number-watermark">{step.number}</div>
                <div className="step-icon-box mb-3">{step.icon}</div>
                <Badge bg="light" text="dark" className="border align-self-start mb-2">
                  {step.badge}
                </Badge>
                <Card.Title as="h3" className="step-title h5 mb-2">{step.title}</Card.Title>
                <Card.Text className="step-desc small text-muted mb-0">
                  {step.description}
                </Card.Text>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Owner vs Caregiver Tabs/Section */}
        <Row className="g-4 mb-5 align-items-stretch reveal-on-scroll">
          <Col xs={12} md={6}>
            <Card className="pawmate-info-card h-100 p-4 bg-light border-0">
              <h3 className="h5 fw-bold mb-3 d-flex align-items-center gap-2">
                <span>🐾</span> For Pet Parents
              </h3>
              <ul className="list-unstyled d-flex flex-column gap-2 text-muted small mb-4">
                <li>✓ Instant matching with nearby verified pet sitters and walkers</li>
                <li>✓ Live photo & video check-ins during every session</li>
                <li>✓ GPS walk route mapping and real-time activity updates</li>
                <li>✓ Safe, transparent pricing with zero hidden fees</li>
              </ul>
              <Button
                variant="success"
                className="mt-auto align-self-start pawmate-btn-primary"
                onClick={() => props.onNavigate && props.onNavigate('explore')}
              >
                Explore Services →
              </Button>
            </Card>
          </Col>

          <Col xs={12} md={6}>
            <Card className="pawmate-info-card h-100 p-4 bg-light border-0">
              <h3 className="h5 fw-bold mb-3 d-flex align-items-center gap-2">
                <span>💼</span> For Pet Caregivers
              </h3>
              <ul className="list-unstyled d-flex flex-column gap-2 text-muted small mb-4">
                <li>✓ Set your own schedule, service rates, and working locations</li>
                <li>✓ Direct connection with loving pet parents in your neighborhood</li>
                <li>✓ 24/7 dedicated platform support and pet safety training resources</li>
                <li>✓ Build a verified profile with client reviews and badges</li>
              </ul>
              <Button
                variant="outline-dark"
                className="mt-auto align-self-start"
                onClick={() => props.onNavigate && props.onNavigate('about')}
              >
                Learn More About Us →
              </Button>
            </Card>
          </Col>
        </Row>

        {/* FAQs */}
        <div className="pawmate-faq-section bg-white p-4 p-md-5 rounded-4 border reveal-on-scroll">
          <h2 className="h4 fw-bold text-center mb-4">Frequently Asked Questions</h2>
          <Row className="g-4">
            {faqs.map((faq, idx) => (
              <Col xs={12} md={4} key={idx}>
                <h3 className="h6 fw-bold mb-2">❓ {faq.q}</h3>
                <p className="small text-muted mb-0">{faq.a}</p>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default HowItWorksPage;
