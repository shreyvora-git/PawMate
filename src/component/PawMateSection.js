import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import PawMateCard from './PawMateCard';

function PawMateSection(props) {
  const [filterRole, setFilterRole] = useState('All');
  const [searchLocation, setSearchLocation] = useState('');

  const filterRoles = ['All', 'Dog Walker', 'Pet Sitter', 'Trainer'];

  const filteredMates = props.pawMates
    ? props.pawMates.filter((mate) => {
        const matchesRole =
          filterRole === 'All' ||
          mate.service.toLowerCase().includes(filterRole.toLowerCase());

        const matchesLocation =
          mate.location.toLowerCase().includes(searchLocation.toLowerCase()) ||
          mate.name.toLowerCase().includes(searchLocation.toLowerCase());

        return matchesRole && matchesLocation;
      })
    : [];

  return (
    <section id="pawmates" className="pawmate-section pawmate-caregivers-section">
      <Container>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 reveal-on-scroll">
          <div>
            <div className="pawmate-eyebrow mb-2">VERIFIED CAREGIVERS</div>
            <h1 className="pawmate-section-heading mb-1">
              Meet your pet's next favorite person.
            </h1>
            <p className="text-muted mb-0 small">Background-checked, CPR-certified, and highly rated pet lovers near you.</p>
          </div>

          <div className="mt-3 mt-md-0 d-flex gap-2">
            <span className="badge bg-green-subtle text-green px-3 py-2 rounded-pill">
              🛡️ 100% Background Checked
            </span>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="pawmate-service-controls mb-4 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 reveal-on-scroll">
          <div className="d-flex flex-wrap gap-2 align-items-center">
            {filterRoles.map((role) => (
              <Button
                key={role}
                variant="light"
                className={`filter-pill-btn ${filterRole === role ? 'active' : ''}`}
                onClick={() => setFilterRole(role)}
              >
                {role === 'All' ? '🌟 All Caregivers' : role}
              </Button>
            ))}
          </div>

          <div className="pawmate-input-wrapper d-flex align-items-center">
            <span className="search-input-icon">📍</span>
            <Form.Control
              type="text"
              className="pawmate-search-input"
              placeholder="Filter by caregiver name or area..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
          </div>
        </div>

        {/* Caregivers Grid */}
        <Row className="g-4 reveal-on-scroll">
          {filteredMates.length > 0 ? (
            filteredMates.map((mate, index) => (
              <PawMateCard
                key={index}
                name={mate.name}
                rating={mate.rating}
                location={mate.location}
                experience={mate.experience}
                service={mate.service}
                price={mate.price}
                tags={mate.tags}
                image={mate.image}
              />
            ))
          ) : (
            <Col xs={12} className="text-center py-5">
              <div className="fs-1 mb-2">🐾</div>
              <p className="text-muted mb-0">No caregivers found matching "{filterRole}" in "{searchLocation}".</p>
              <Button
                variant="link"
                className="text-success mt-2"
                onClick={() => {
                  setFilterRole('All');
                  setSearchLocation('');
                }}
              >
                Clear Filters
              </Button>
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
}

export default PawMateSection;
