import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import Hero from './Hero';
import ServiceCard from './ServiceCard';

function ExplorePage(props) {
  const handleNavigate = (page) => {
    if (props.onNavigate) {
      props.onNavigate(page);
    }
  };

  // Show 4 featured services on homepage
  const featuredServices = (props.services && props.services.length > 0)
    ? props.services.slice(0, 4)
    : [
        {
          id: 1,
          name: 'Dog Walking',
          price: '₹300',
          location: 'Chembur, Mumbai',
          description: 'Daily active walks to keep your dog energized, social, and healthy.',
          image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&auto=format&fit=crop&q=80',
          icon: '🦮',
          badge: 'MOST POPULAR'
        },
        {
          id: 2,
          name: 'Pet Sitting',
          price: '₹600',
          location: 'Powai, Mumbai',
          description: 'Compassionate, reliable in-home care in the comfort of your home.',
          image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=80',
          icon: '🏠',
          badge: 'VERIFIED'
        },
        {
          id: 3,
          name: 'Pet Grooming',
          price: '₹850',
          location: 'Bandra, Mumbai',
          description: 'Professional bathing, styling, and brushing for a happy, clean pet.',
          image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&auto=format&fit=crop&q=80',
          icon: '✂️',
          badge: 'SPONSORED'
        },
        {
          id: 4,
          name: 'Pet Boarding',
          price: '₹1,200',
          location: 'Andheri, Mumbai',
          description: 'Safe, cozy overnight stays with round-the-clock attention and love.',
          image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&auto=format&fit=crop&q=80',
          icon: '🏨',
          badge: 'PREMIUM'
        }
      ];

  return (
    <div className="pawmate-explore-page">
      {/* Hero Section */}
      <Hero
        onFindPawMate={() => handleNavigate('services')}
        onNavigate={handleNavigate}
      />

      {/* Trust & Safety Highlights */}
      <section className="pawmate-trust-bar py-4 border-top border-bottom bg-white">
        <Container>
          <Row className="g-3 text-center align-items-center">
            <Col xs={12} sm={4}>
              <div className="d-flex align-items-center justify-content-center gap-2">
                <span className="fs-4">🛡️</span>
                <div className="text-start">
                  <strong className="d-block text-dark small">100% Background Verified</strong>
                  <span className="text-muted" style={{ fontSize: '0.75rem' }}>Government ID & police checked</span>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={4}>
              <div className="d-flex align-items-center justify-content-center gap-2">
                <span className="fs-4">🩺</span>
                <div className="text-start">
                  <strong className="d-block text-dark small">Emergency Vet Support</strong>
                  <span className="text-muted" style={{ fontSize: '0.75rem' }}>₹10,000 complimentary pet cover</span>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={4}>
              <div className="d-flex align-items-center justify-content-center gap-2">
                <span className="fs-4">📍</span>
                <div className="text-start">
                  <strong className="d-block text-dark small">Live GPS Walk Tracking</strong>
                  <span className="text-muted" style={{ fontSize: '0.75rem' }}>Real-time photo & route updates</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 4 Featured Services Section on Homepage */}
      <section id="services-featured" className="pawmate-section py-5">
        <Container>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
            <div>
              <div className="pawmate-eyebrow mb-2">FEATURED PET SERVICES</div>
              <h2 className="pawmate-section-heading mb-1">Local Pet Care Services</h2>
              <p className="text-muted mb-0 small">
                Choose daily dog walking, in-home sitting, spa grooming, and overnight boarding.
              </p>
            </div>
            <div className="mt-3 mt-md-0">
              <span className="badge bg-forest-subtle text-green px-3 py-2 rounded-pill">
                ⭐ 4.9/5 Average Service Quality
              </span>
            </div>
          </div>

          <Row className="g-4">
            {featuredServices.map((service, index) => (
              <Col xs={12} sm={6} lg={3} key={service.id || index} className="d-flex">
                <ServiceCard
                  name={service.name}
                  price={service.price}
                  location={service.location}
                  description={service.description}
                  image={service.image}
                  icon={service.icon}
                  badge={service.badge}
                  isSelected={false}
                  onSelect={() => {
                    if (props.onOpenBooking) {
                      props.onOpenBooking(service);
                    }
                  }}
                />
              </Col>
            ))}
          </Row>

          {/* Prominent, working CTA: 'Explore All Services' */}
          <div className="text-center mt-5 pt-2">
            <Card className="p-4 rounded-4 border-0 shadow-sm mx-auto max-w-700 bg-white" style={{ border: '1px solid #d6ebd9' }}>
              <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3">
                <div className="text-sm-start">
                  <h3 className="h5 fw-bold mb-1 text-forest" style={{ color: '#1a4331' }}>
                    Need specialized training, puppy care, or day care?
                  </h3>
                  <p className="text-muted small mb-0">
                    Explore our complete catalog of {props.services ? props.services.length : 14} pet-care services with verified PawMates.
                  </p>
                </div>
                <Button
                  className="pawmate-btn-primary rounded-pill px-4 py-3 fw-bold text-nowrap shadow-sm"
                  style={{ backgroundColor: '#1a4331', borderColor: '#1a4331', color: '#ffffff' }}
                  onClick={() => handleNavigate('services')}
                >
                  Explore All Services →
                </Button>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Routine Subscription Plans Preview */}
      <section className="pawmate-plans-preview py-5" style={{ backgroundColor: '#f5f3ec' }}>
        <Container>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
            <div>
              <div className="pawmate-eyebrow mb-2">RECURRING PLANS</div>
              <h2 className="pawmate-section-heading mb-1">Monthly Routine Care Packages</h2>
              <p className="text-muted mb-0 small">
                Flexible recurring plans designed for busy pet parents. Cancel or pause anytime.
              </p>
            </div>
            <Button
              variant="outline-success"
              className="mt-3 mt-md-0 rounded-pill px-4"
              onClick={() => handleNavigate('plans')}
            >
              Compare All Plans →
            </Button>
          </div>

          <Row className="g-4">
            <Col xs={12} md={4}>
              <Card className="p-4 rounded-4 border shadow-sm h-100 bg-white d-flex flex-column justify-content-between">
                <div>
                  <Badge bg="light" text="dark" className="border mb-2">ESSENTIALS</Badge>
                  <h3 className="h5 fw-bold mb-1">Basic Routine Plan</h3>
                  <div className="fs-3 fw-bold text-forest mb-2">₹999<span className="fs-6 text-muted font-monospace">/mo</span></div>
                  <p className="small text-muted mb-3">Ideal for cats and low-energy adult dogs.</p>
                  <ul className="list-unstyled small text-secondary d-flex flex-column gap-2 mb-4">
                    <li>✓ 4 Monthly Walking / Drop-In visits</li>
                    <li>✓ Photo and feeding checklist</li>
                    <li>✓ Priority weekend booking</li>
                  </ul>
                </div>
                <Button
                  variant="outline-success"
                  className="w-100 rounded-pill fw-bold"
                  onClick={() => handleNavigate('plans')}
                >
                  Select Basic Plan
                </Button>
              </Card>
            </Col>

            <Col xs={12} md={4}>
              <Card className="p-4 rounded-4 border-2 border-forest shadow-md h-100 bg-white position-relative d-flex flex-column justify-content-between" style={{ borderColor: '#1a4331' }}>
                <div className="position-absolute top-0 end-0 m-3">
                  <Badge bg="success" className="px-2 py-1">MOST POPULAR</Badge>
                </div>
                <div>
                  <Badge bg="light" text="dark" className="border mb-2">MOST ACTIVE</Badge>
                  <h3 className="h5 fw-bold mb-1">Active Routine Plan</h3>
                  <div className="fs-3 fw-bold text-forest mb-2">₹1,999<span className="fs-6 text-muted font-monospace">/mo</span></div>
                  <p className="small text-muted mb-3">Perfect for high-energy pups needing consistent runs.</p>
                  <ul className="list-unstyled small text-secondary d-flex flex-column gap-2 mb-4">
                    <li>✓ 10 Monthly Active Walk sessions</li>
                    <li>✓ GPS live route & hydration check</li>
                    <li>✓ 1 Basic Paw & Coat Grooming wash</li>
                    <li>✓ Dedicated caregiver matching</li>
                  </ul>
                </div>
                <Button
                  className="pawmate-btn-primary w-100 rounded-pill fw-bold shadow-sm"
                  style={{ backgroundColor: '#1a4331', borderColor: '#1a4331' }}
                  onClick={() => handleNavigate('plans')}
                >
                  Select Active Plan
                </Button>
              </Card>
            </Col>

            <Col xs={12} md={4}>
              <Card className="p-4 rounded-4 border shadow-sm h-100 bg-white d-flex flex-column justify-content-between">
                <div>
                  <Badge bg="light" text="dark" className="border mb-2">VIP FULL CARE</Badge>
                  <h3 className="h5 fw-bold mb-1">Complete Care Plan</h3>
                  <div className="fs-3 fw-bold text-forest mb-2">₹3,499<span className="fs-6 text-muted font-monospace">/mo</span></div>
                  <p className="small text-muted mb-3">Comprehensive all-in-one daily companionship.</p>
                  <ul className="list-unstyled small text-secondary d-flex flex-column gap-2 mb-4">
                    <li>✓ 20 Monthly Care & Walk sessions</li>
                    <li>✓ Full monthly spa & grooming package</li>
                    <li>✓ Complimentary 24/7 Vet on call</li>
                    <li>✓ Zero cancellation fees</li>
                  </ul>
                </div>
                <Button
                  variant="outline-success"
                  className="w-100 rounded-pill fw-bold"
                  onClick={() => handleNavigate('plans')}
                >
                  Select Complete Plan
                </Button>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default ExplorePage;
