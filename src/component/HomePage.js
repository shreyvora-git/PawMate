import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Hero from './Hero';

function HomePage(props) {
  const handleNavigate = (page) => {
    if (props.onNavigate) {
      props.onNavigate(page);
    }
  };

  return (
    <div className="pawmate-home-view">
      {/* Hero Section */}
      <Hero onNavigate={props.onNavigate} />

      {/* 3 Core Trust Pillars */}
      <section className="pawmate-section bg-light py-5">
        <Container>
          <Row className="g-4 text-center">
            <Col xs={12} md={4} className="reveal-on-scroll">
              <div className="p-4 bg-white rounded-4 border h-100 shadow-sm pawmate-feature-pill">
                <div className="fs-1 mb-2 feature-icon-bounce">🛡️</div>
                <h3 className="h5 fw-bold mb-2">100% Verified Caregivers</h3>
                <p className="small text-muted mb-0">Every PawMate undergoes comprehensive identity, criminal background, and pet-handling checks.</p>
              </div>
            </Col>
            <Col xs={12} md={4} className="reveal-on-scroll">
              <div className="p-4 bg-white rounded-4 border h-100 shadow-sm pawmate-feature-pill">
                <div className="fs-1 mb-2 feature-icon-bounce">📍</div>
                <h3 className="h5 fw-bold mb-2">Live GPS Route Tracking</h3>
                <p className="small text-muted mb-0">Receive real-time walk maps, photo check-ins, bathroom logs, and activity notifications.</p>
              </div>
            </Col>
            <Col xs={12} md={4} className="reveal-on-scroll">
              <div className="p-4 bg-white rounded-4 border h-100 shadow-sm pawmate-feature-pill">
                <div className="fs-1 mb-2 feature-icon-bounce">🩺</div>
                <h3 className="h5 fw-bold mb-2">24/7 Emergency Vet Line</h3>
                <p className="small text-muted mb-0">Every booking comes backed with emergency veterinary care coverage and round-the-clock support.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Quick 2-Way Marketplace Cards */}
      <section className="pawmate-section py-5">
        <Container>
          <div className="text-center max-w-700 mx-auto mb-5 reveal-on-scroll">
            <div className="pawmate-eyebrow mb-2">WHAT WE OFFER</div>
            <h2 className="pawmate-section-heading mb-2">Everything your pet needs in one place.</h2>
            <p className="text-muted small">Choose between exploring flexible care services or discovering certified local PawMates.</p>
          </div>

          <Row className="g-4">
            <Col xs={12} md={6} className="reveal-on-scroll">
              <Card className="h-100 p-4 p-md-5 rounded-4 border shadow-sm pawmate-gateway-card">
                <div className="gateway-icon mb-3">🦮</div>
                <h3 className="h4 fw-bold mb-2">Explore Pet Care Services</h3>
                <p className="text-muted mb-4">
                  From active daily dog walking and cozy pet sitting to professional grooming and boarding stays.
                </p>
                <div className="d-flex flex-wrap gap-2 mb-4">
                  <span className="badge bg-light text-dark border p-2">Dog Walking</span>
                  <span className="badge bg-light text-dark border p-2">Pet Sitting</span>
                  <span className="badge bg-light text-dark border p-2">Grooming</span>
                  <span className="badge bg-light text-dark border p-2">Boarding</span>
                </div>
                <Button
                  variant="success"
                  className="pawmate-btn-primary mt-auto align-self-start"
                  onClick={() => handleNavigate('services')}
                >
                  View All Services →
                </Button>
              </Card>
            </Col>

            <Col xs={12} md={6} className="reveal-on-scroll">
              <Card className="h-100 p-4 p-md-5 rounded-4 border shadow-sm pawmate-gateway-card">
                <div className="gateway-icon mb-3">👥</div>
                <h3 className="h4 fw-bold mb-2">Meet Certified Caregivers</h3>
                <p className="text-muted mb-4">
                  Connect with compassionate, highly rated pet sitters, walkers, and trainers in your neighborhood.
                </p>
                <div className="d-flex flex-wrap gap-2 mb-4">
                  <span className="badge bg-light text-dark border p-2">⭐ 4.9+ Ratings</span>
                  <span className="badge bg-light text-dark border p-2">CPR Certified</span>
                  <span className="badge bg-light text-dark border p-2">Verified ID</span>
                </div>
                <Button
                  variant="outline-dark"
                  className="mt-auto align-self-start fw-bold"
                  onClick={() => handleNavigate('pawmates')}
                >
                  Browse PawMate Profiles →
                </Button>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* How it Works Quick Teaser */}
      <section className="pawmate-section bg-light py-5">
        <Container>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 reveal-on-scroll">
            <div>
              <div className="pawmate-eyebrow mb-2">SIMPLE & EASY</div>
              <h2 className="pawmate-section-heading mb-0">How PawMate Works</h2>
            </div>
            <Button
              variant="outline-success"
              className="mt-3 mt-md-0 fw-semibold"
              onClick={() => handleNavigate('how-it-works')}
            >
              See Step-by-Step Guide →
            </Button>
          </div>

          <Row className="g-4">
            <Col xs={12} md={4} className="reveal-on-scroll">
              <Card className="p-4 bg-white rounded-4 border h-100 shadow-sm pawmate-step-pill">
                <div className="step-badge-num mb-2">01</div>
                <h4 className="h6 fw-bold mb-1">Choose Service & Schedule</h4>
                <p className="small text-muted mb-0">Select walking, sitting, or grooming according to your pet's routine.</p>
              </Card>
            </Col>
            <Col xs={12} md={4} className="reveal-on-scroll">
              <Card className="p-4 bg-white rounded-4 border h-100 shadow-sm pawmate-step-pill">
                <div className="step-badge-num mb-2">02</div>
                <h4 className="h6 fw-bold mb-1">Match with Verified Mate</h4>
                <p className="small text-muted mb-0">Review profiles, ratings, and schedule a free Meet & Greet.</p>
              </Card>
            </Col>
            <Col xs={12} md={4} className="reveal-on-scroll">
              <Card className="p-4 bg-white rounded-4 border h-100 shadow-sm pawmate-step-pill">
                <div className="step-badge-num mb-2">03</div>
                <h4 className="h6 fw-bold mb-1">Track Live GPS & Photos</h4>
                <p className="small text-muted mb-0">Enjoy real-time updates and peace of mind with 24/7 support.</p>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Pet Care & Breed Intelligence Banner */}
      <section className="pawmate-section py-5">
        <Container>
          <Card className="p-4 p-md-5 bg-forest-dark text-white rounded-4 border-0 shadow-lg position-relative overflow-hidden reveal-on-scroll">
            <div className="hero-shape-backdrop opacity-25"></div>
            <Row className="align-items-center g-4 position-relative z-2">
              <Col xs={12} lg={8}>
                <span className="badge bg-light text-dark px-3 py-2 mb-3 fw-bold">🐾 BREED INTELLIGENCE GUIDE</span>
                <h3 className="h2 fw-bold text-white mb-3">Personalized Daily Care Tailored To Your Dog's Breed</h3>
                <p className="text-white-75 mb-0 fs-6">
                  Select your dog's breed to discover exact exercise requirements, grooming schedules, dietary focuses, and live photo profiles powered by API data.
                </p>
              </Col>
              <Col xs={12} lg={4} className="text-lg-end">
                <Button
                  variant="light"
                  className="fw-bold px-4 py-3 shadow-sm pawmate-btn-hero-cta"
                  onClick={() => handleNavigate('pet-care')}
                >
                  Open Pet Care Guide →
                </Button>
              </Col>
            </Row>
          </Card>
        </Container>
      </section>
    </div>
  );
}

export default HomePage;
