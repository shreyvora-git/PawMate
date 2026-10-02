import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Badge } from 'react-bootstrap';
import ServiceCard from './ServiceCard';
import PawMateCard from './PawMateCard';

function ServicesPage(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedService, setSelectedService] = useState(null);

  const categories = ['All', 'Walking', 'Sitting', 'Grooming', 'Boarding', 'Training', 'Specialized'];

  const allServices = props.services || [];
  const allPawMates = props.pawMates || [];

  // Filter services using simple array filtering based on search and category
  const filteredServices = allServices.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      service.category === selectedCategory ||
      service.name.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  // Filter PawMates providing the selected service
  const matchingPawMates = selectedService
    ? allPawMates.filter((mate) => {
        if (!mate.services) return true;
        return mate.services.some(
          (s) =>
            s.toLowerCase().includes(selectedService.name.toLowerCase()) ||
            selectedService.name.toLowerCase().includes(s.toLowerCase())
        );
      })
    : [];

  const handleSelectService = (service) => {
    if (selectedService && selectedService.id === service.id) {
      setSelectedService(null);
    } else {
      setSelectedService(service);
      const el = document.getElementById('service-pawmates-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleDirectBookService = (service) => {
    if (props.onOpenBooking) {
      props.onOpenBooking(service);
    }
  };

  return (
    <div className="pawmate-page-container py-5">
      <Container>
        {/* Marketplace Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
          <div>
            <div className="pawmate-eyebrow mb-2">SERVICES & CAREGIVER MARKETPLACE</div>
            <h1 className="pawmate-section-heading mb-1">Explore Pet Care Services</h1>
            <p className="text-muted mb-0 small">
              Browse our complete catalog of {allServices.length} certified pet services and connect with local PawMates.
            </p>
          </div>
          <div className="mt-3 mt-md-0">
            <span className="badge bg-forest-subtle text-green px-3 py-2 rounded-pill">
              ⭐ 4.9/5 Service Satisfaction ({allPawMates.length} Verified Providers)
            </span>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="pawmate-service-controls mb-4 d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3">
          <div className="d-flex flex-wrap gap-2 align-items-center">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant="light"
                className={`filter-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'All' ? '🐾 All Services' : cat}
              </Button>
            ))}
          </div>

          <div className="d-flex align-items-center gap-3">
            <div className="pawmate-input-wrapper d-flex align-items-center flex-grow-1" style={{ minWidth: '260px' }}>
              <span className="search-input-icon">🔍</span>
              <Form.Control
                type="text"
                className="pawmate-search-input"
                placeholder="Search by service or area..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {selectedService && (
              <div className="pawmate-selected-banner d-flex align-items-center justify-content-between gap-2 shadow-sm">
                <span>Selected: <strong>{selectedService.name}</strong></span>
                <button
                  type="button"
                  className="pawmate-clear-btn"
                  onClick={() => setSelectedService(null)}
                  aria-label="Clear selected service"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Services Grid - 3 cards per row on desktop (lg=4), 2 on tablet (md=6), 1 on mobile (xs=12) */}
        <Row className="g-4 mb-5">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <Col xs={12} md={6} lg={4} key={service.id} className="d-flex">
                <div className="w-100 d-flex flex-column">
                  <ServiceCard
                    name={service.name}
                    price={service.price}
                    location={service.location}
                    description={service.description}
                    image={service.image}
                    icon={service.icon}
                    badge={service.badge}
                    isSelected={selectedService && selectedService.id === service.id}
                    onSelect={() => handleSelectService(service)}
                  />
                  <div className="mt-2 text-center">
                    <Button
                      variant={selectedService && selectedService.id === service.id ? 'success' : 'outline-success'}
                      size="sm"
                      className="rounded-pill px-3 py-1 fw-semibold small w-100 shadow-xs"
                      onClick={() => handleSelectService(service)}
                    >
                      {selectedService && selectedService.id === service.id
                        ? '✓ Viewing Available PawMates'
                        : `View PawMates for ${service.name} →`
                      }
                    </Button>
                  </div>
                </div>
              </Col>
            ))
          ) : (
            <Col xs={12} className="text-center py-5 bg-white rounded-4 border my-3">
              <div className="fs-1 mb-2">🔍</div>
              <h3 className="h6 fw-bold mb-1">No services found</h3>
              <p className="text-muted small mb-3">
                No pet services match your search for "{searchTerm || selectedCategory}".
              </p>
              <Button
                variant="light"
                className="border rounded-pill px-4 py-2 small fw-bold text-forest"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
              >
                Reset All Filters
              </Button>
            </Col>
          )}
        </Row>

        {/* Available PawMates for Selected Service Section */}
        {selectedService && (
          <div id="service-pawmates-section" className="p-4 p-md-5 bg-light rounded-4 border shadow-sm my-5">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-3 border-bottom">
              <div>
                <div className="d-inline-flex align-items-center gap-1.5 px-3 py-1 rounded-pill mb-2" style={{ backgroundColor: '#d6ebd9', color: '#1a4331' }}>
                  <span className="small fw-bold text-uppercase">🐾 Available Providers</span>
                </div>
                <h2 className="h4 fw-bold mb-1 text-dark">
                  Verified PawMates Offering "{selectedService.name}"
                </h2>
                <p className="text-muted small mb-0">
                  Select your preferred caregiver below to schedule a session starting at {selectedService.price}.
                </p>
              </div>

              <div className="mt-3 mt-md-0 d-flex gap-2">
                <Button
                  variant="outline-dark"
                  size="sm"
                  className="rounded-pill px-3 fw-bold"
                  onClick={() => setSelectedService(null)}
                >
                  ✕ Close Provider List
                </Button>
                <Button
                  className="pawmate-btn-primary rounded-pill px-4 py-2 small fw-bold shadow-sm"
                  style={{ backgroundColor: '#1a4331', borderColor: '#1a4331' }}
                  onClick={() => handleDirectBookService(selectedService)}
                >
                  Instant Book "{selectedService.name}"
                </Button>
              </div>
            </div>

            {matchingPawMates.length > 0 ? (
              <Row className="g-4">
                {matchingPawMates.map((mate) => (
                  <Col xs={12} md={6} lg={4} key={mate.id} className="d-flex">
                    <PawMateCard
                      name={mate.name}
                      rating={mate.rating}
                      location={mate.location}
                      experience={mate.experience}
                      service={mate.service}
                      price={mate.price}
                      tags={mate.tags}
                      image={mate.image}
                      isFavorite={props.favorites ? props.favorites.includes(mate.name) : false}
                      onToggleFavorite={props.onToggleFavorite}
                      onBook={() => {
                        if (props.onOpenBooking) {
                          props.onOpenBooking({
                            ...mate,
                            service: selectedService.name,
                            price: selectedService.price
                          });
                        }
                      }}
                    />
                  </Col>
                ))}
              </Row>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted small mb-3">
                  All our verified PawMates can handle customized requests for {selectedService.name}.
                </p>
                <Button
                  className="pawmate-btn-primary rounded-pill px-4 py-2 fw-bold"
                  style={{ backgroundColor: '#1a4331', borderColor: '#1a4331' }}
                  onClick={() => handleDirectBookService(selectedService)}
                >
                  Book with Top Rated Caregiver
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Routine Plans Banner */}
        <section className="mt-5">
          <div className="p-4 p-md-5 bg-forest-dark text-white rounded-4 border-0 shadow-lg position-relative overflow-hidden">
            <div className="hero-shape-backdrop opacity-25"></div>
            <Row className="align-items-center g-4 position-relative z-2">
              <Col xs={12} lg={8}>
                <Badge bg="light" text="dark" className="px-3 py-2 mb-3 fw-bold">🐾 ROUTINE CARE PLANS</Badge>
                <h3 className="h2 fw-bold text-white mb-2">Save up to 25% with Monthly Routine Care Plans</h3>
                <p className="text-white-75 mb-0 fs-6">
                  Subscribe to weekly recurring dog walks, feeding drop-ins, and grooming sessions starting at just ₹999/month.
                </p>
              </Col>
              <Col xs={12} lg={4} className="text-lg-end">
                <Button
                  variant="light"
                  className="fw-bold px-4 py-3 shadow-sm pawmate-btn-hero-cta"
                  onClick={() => props.onNavigate && props.onNavigate('plans')}
                >
                  View Subscription Plans →
                </Button>
              </Col>
            </Row>
          </div>
        </section>
      </Container>
    </div>
  );
}

export default ServicesPage;
