import React from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';

function AboutPage(props) {
  const values = [
    {
      title: 'Safety First',
      description: 'Strict multi-tier verification and background vetting for all caregivers before onboarding.',
      icon: '🛡️'
    },
    {
      title: 'Compassionate Care',
      description: 'Every pet is treated with the gentle warmth, patience, and love they receive in their own family.',
      icon: '❤️'
    },
    {
      title: 'Transparent Trust',
      description: 'Honest upfront pricing, transparent reviews from real pet parents, and live activity tracking.',
      icon: '🌟'
    },
    {
      title: 'Community Connection',
      description: 'Connecting neighborhood pet lovers to build a supportive, dependable pet care network.',
      icon: '🏡'
    }
  ];

  return (
    <div className="pawmate-page-container py-5">
      <Container>
        {/* Page Header */}
        <div className="text-center max-w-700 mx-auto mb-5 reveal-on-scroll">
          <Badge bg="success" className="mb-3 px-3 py-2 text-uppercase letter-spacing-1">
            Our Mission & Story
          </Badge>
          <h1 className="pawmate-page-title mb-3">About PawMate</h1>
          <p className="text-muted lead fs-6">
            Building a trusted community where every pet receives loving, dependable care and every parent enjoys absolute peace of mind.
          </p>
        </div>

        {/* Story Section */}
        <Row className="g-4 mb-5 align-items-center reveal-on-scroll">
          <Col xs={12} lg={6}>
            <div className="pe-lg-4">
              <div className="pawmate-eyebrow mb-2">WHO WE ARE</div>
              <h2 className="h3 fw-bold mb-3">Born out of love for our four-legged family members.</h2>
              <p className="text-muted">
                PawMate was created to solve a universal challenge faced by pet parents: finding truly reliable, vetted, and loving care when work, travel, or daily obligations keep you away.
              </p>
              <p className="text-muted">
                We bridge the gap between dedicated pet parents and passionate, certified caregivers in your immediate neighborhood. Whether it's a brisk afternoon walk, specialized senior pet care, or cozy in-home boarding, PawMate ensures your pet is in trusted hands.
              </p>
              <div className="d-flex gap-3 pt-2">
                <Button
                  variant="success"
                  className="pawmate-btn-primary"
                  onClick={() => props.onNavigate && props.onNavigate('explore')}
                >
                  Meet Our Caregivers →
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={() => props.onNavigate && props.onNavigate('how-it-works')}
                >
                  See How It Works
                </Button>
              </div>
            </div>
          </Col>

          <Col xs={12} lg={6}>
            <Card className="p-4 bg-light border-0 rounded-4 shadow-sm">
              <h3 className="h5 fw-bold mb-3">🛡️ The PawMate Safety Guarantee</h3>
              <div className="d-flex flex-column gap-3 small text-muted">
                <div className="d-flex gap-2 align-items-start">
                  <span className="text-success fw-bold">✓</span>
                  <div><strong>100% Identity & Background Checks:</strong> National ID verification and criminal history screening.</div>
                </div>
                <div className="d-flex gap-2 align-items-start">
                  <span className="text-success fw-bold">✓</span>
                  <div><strong>Hands-on Pet Handling Assessment:</strong> Verification of past pet care experience and emergency skills.</div>
                </div>
                <div className="d-flex gap-2 align-items-start">
                  <span className="text-success fw-bold">✓</span>
                  <div><strong>24/7 Veterinary Support:</strong> Round-the-clock emergency vet line for every confirmed booking.</div>
                </div>
                <div className="d-flex gap-2 align-items-start">
                  <span className="text-success fw-bold">✓</span>
                  <div><strong>GPS & Live Check-in Reports:</strong> Real-time walk routes, photos, and time-stamped activity updates.</div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Values Grid */}
        <div className="mb-5 reveal-on-scroll">
          <div className="text-center mb-4">
            <div className="pawmate-eyebrow mb-1">CORE VALUES</div>
            <h2 className="h4 fw-bold">What drives everything we do.</h2>
          </div>
          <Row className="g-4">
            {values.map((v, idx) => (
              <Col xs={12} sm={6} lg={3} key={idx}>
                <Card className="h-100 p-4 border rounded-4 text-center">
                  <div className="fs-1 mb-2">{v.icon}</div>
                  <Card.Title as="h3" className="h6 fw-bold mb-2">{v.title}</Card.Title>
                  <Card.Text className="small text-muted mb-0">{v.description}</Card.Text>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Lab Project Details Badge */}
        <div className="text-center p-4 bg-light rounded-4 border reveal-on-scroll">
          <h4 className="h6 fw-bold mb-1">Web Computing Lab Microproject</h4>
          <p className="small text-muted mb-0">
            Developed as an academic React application exploring component hierarchy, props pipelines, React-Bootstrap integration, and asynchronous `useEffect` data fetching.
          </p>
        </div>
      </Container>
    </div>
  );
}

export default AboutPage;
