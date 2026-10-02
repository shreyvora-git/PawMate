import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import ServiceCard from './ServiceCard';

function ServiceSection(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedService, setSelectedService] = useState('');

  const categories = ['All', 'Walking', 'Sitting', 'Grooming', 'Boarding'];

  const filteredServices = props.services
    ? props.services.filter((service) => {
        const matchesSearch =
          service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.location.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
          selectedCategory === 'All' ||
          service.name.toLowerCase().includes(selectedCategory.toLowerCase());

        return matchesSearch && matchesCategory;
      })
    : [];

  return (
    <section id="services" className="pawmate-section pawmate-services-section">
      <Container>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 reveal-on-scroll">
          <div>
            <div className="pawmate-eyebrow mb-2">SERVICES & MARKETPLACE</div>
            <h1 className="pawmate-section-heading mb-1">Care for every kind of pet.</h1>
            <p className="text-muted mb-0 small">Explore transparent pricing, verified caregiver ratings, and instant booking options.</p>
          </div>

          <div className="mt-3 mt-md-0">
            <span className="badge bg-forest-subtle text-green px-3 py-2 rounded-pill">
              ⭐ 4.9/5 Service Satisfaction
            </span>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="pawmate-service-controls mb-4 d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3 reveal-on-scroll">
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
            <div className="pawmate-input-wrapper d-flex align-items-center flex-grow-1">
              <span className="search-input-icon">🔍</span>
              <Form.Control
                type="text"
                className="pawmate-search-input"
                placeholder="Search by service or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {selectedService && (
              <div className="pawmate-selected-banner d-flex align-items-center justify-content-between gap-2 shadow-sm">
                <span>Selected: <strong>{selectedService}</strong></span>
                <button
                  type="button"
                  className="pawmate-clear-btn"
                  onClick={() => setSelectedService('')}
                  aria-label="Clear selected service"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Services Cards Grid */}
        <Row className="g-4 reveal-on-scroll">
          {filteredServices.length > 0 ? (
            filteredServices.map((service, index) => (
              <ServiceCard
                key={index}
                name={service.name}
                price={service.price}
                location={service.location}
                description={service.description}
                image={service.image}
                icon={service.icon}
                badge={service.badge}
                isSelected={selectedService === service.name}
                onSelect={setSelectedService}
              />
            ))
          ) : (
            <Col xs={12} className="text-center py-5">
              <div className="fs-1 mb-2">🔍</div>
              <p className="text-muted mb-0">No services found matching "{searchTerm || selectedCategory}"</p>
              <Button
                variant="link"
                className="text-success mt-2"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
              >
                Reset Search Filters
              </Button>
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
}

export default ServiceSection;
