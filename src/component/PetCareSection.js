import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Badge, Image, Button } from 'react-bootstrap';

const BREED_DATA = {
  retriever: {
    name: 'Golden Retriever',
    apiSlug: 'retriever/golden',
    temperament: 'Intelligent, Friendly, Devoted',
    lifeSpan: '10 - 12 Years',
    size: 'Large (25 - 34 kg)',
    exercise: 'High (60-90 min daily walks & active play)',
    grooming: 'Moderate (Brush 2-3 times a week)',
    nutrition: 'High-protein diet with joint support'
  },
  labrador: {
    name: 'Labrador Retriever',
    apiSlug: 'labrador',
    temperament: 'Outgoing, Even-tempered, Gentle',
    lifeSpan: '11 - 13 Years',
    size: 'Large (27 - 36 kg)',
    exercise: 'High (Daily swimming, fetch & brisk walking)',
    grooming: 'Low to Moderate (Weekly brushing)',
    nutrition: 'Portion-controlled balanced meal'
  },
  beagle: {
    name: 'Beagle',
    apiSlug: 'beagle',
    temperament: 'Curious, Merry, Energetic',
    lifeSpan: '12 - 15 Years',
    size: 'Medium (9 - 11 kg)',
    exercise: 'Moderate (45-60 min daily scent walks)',
    grooming: 'Low (Weekly brushing)',
    nutrition: 'Weight management focused diet'
  },
  poodle: {
    name: 'Poodle (Standard)',
    apiSlug: 'poodle/standard',
    temperament: 'Alert, Active, Highly Trainable',
    lifeSpan: '12 - 15 Years',
    size: 'Medium-Large (20 - 32 kg)',
    exercise: 'Moderate to High (Daily mental & physical tasks)',
    grooming: 'High (Professional clip every 4-6 weeks)',
    nutrition: 'Nutrient-rich, coat-enhancing diet'
  },
  germanshepherd: {
    name: 'German Shepherd',
    apiSlug: 'germanshepherd',
    temperament: 'Confident, Courageous, Loyal',
    lifeSpan: '9 - 13 Years',
    size: 'Large (30 - 40 kg)',
    exercise: 'High (Agility, obedience training & runs)',
    grooming: 'Moderate (Regular de-shedding brushing)',
    nutrition: 'High energy diet for working breeds'
  }
};

function PetCareSection(props) {
  const [selectedBreedKey, setSelectedBreedKey] = useState('retriever');
  const [breedImage, setBreedImage] = useState(
    'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&auto=format&fit=crop&q=80'
  );
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const currentBreed = BREED_DATA[selectedBreedKey] || BREED_DATA.retriever;

  // State-dependent useEffect: triggers whenever selectedBreedKey changes
  useEffect(() => {
    setIsLoadingImage(true);
    const apiEndpoint = `https://dog.ceo/api/breed/${currentBreed.apiSlug}/images/random`;

    fetch(apiEndpoint)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.status === 'success' && data.message) {
          setBreedImage(data.message);
        }
        setIsLoadingImage(false);
      })
      .catch((err) => {
        console.log('Breed image API fallback:', err);
        setIsLoadingImage(false);
      });
  }, [selectedBreedKey, currentBreed.apiSlug]);

  return (
    <section id="pet-care" className="pawmate-section pawmate-petcare-section py-5">
      <Container>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 reveal-on-scroll">
          <div>
            <div className="pawmate-eyebrow mb-2">PET PROFILE & BREED GUIDE</div>
            <h1 className="pawmate-section-heading mb-1">
              Personalized care for your pet's breed.
            </h1>
            <p className="text-muted mb-0 small">Dynamic breed intelligence powered by Dog API data with custom care guidance.</p>
          </div>
          <div className="mt-3 mt-md-0 d-flex align-items-center gap-2">
            <Form.Label className="mb-0 fw-semibold text-muted small">Select Breed:</Form.Label>
            <Form.Select
              value={selectedBreedKey}
              onChange={(e) => setSelectedBreedKey(e.target.value)}
              className="pawmate-breed-select shadow-sm"
              aria-label="Select breed for pet care details"
            >
              <option value="retriever">Golden Retriever</option>
              <option value="labrador">Labrador</option>
              <option value="beagle">Beagle</option>
              <option value="poodle">Poodle</option>
              <option value="germanshepherd">German Shepherd</option>
            </Form.Select>
          </div>
        </div>

        {/* Quick Breed Selector Buttons */}
        <div className="d-flex flex-wrap gap-2 mb-4 reveal-on-scroll">
          {Object.keys(BREED_DATA).map((bKey) => (
            <Button
              key={bKey}
              variant="light"
              className={`filter-pill-btn ${selectedBreedKey === bKey ? 'active' : ''}`}
              onClick={() => setSelectedBreedKey(bKey)}
            >
              🐕 {BREED_DATA[bKey].name}
            </Button>
          ))}
        </div>

        <Row className="g-4 align-items-stretch reveal-on-scroll">
          {/* Pet Profile Card */}
          <Col xs={12} lg={4}>
            <Card className="pawmate-profile-card h-100 p-3 shadow-sm">
              <div className="position-relative pet-breed-image-wrap mb-3 text-center">
                {isLoadingImage ? (
                  <div className="pet-image-loading d-flex align-items-center justify-content-center text-muted">
                    <span className="spinner-border spinner-border-sm me-2 text-forest" role="status"></span>
                    Loading photo...
                  </div>
                ) : (
                  <Image
                    src={breedImage}
                    alt={currentBreed.name}
                    className="pet-breed-photo img-fluid rounded anim-fade"
                  />
                )}
                <Badge bg="success" className="position-absolute top-0 start-0 m-2 shadow-sm">
                  Active Pet Profile
                </Badge>
              </div>

              <Card.Body className="p-2 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <Card.Title as="h3" className="profile-name mb-0">Bruno</Card.Title>
                    <span className="badge bg-light text-dark border">3 Years Old</span>
                  </div>
                  <p className="profile-subtitle mb-2 text-muted">
                    {currentBreed.name} • Healthy & Active
                  </p>
                  <p className="small text-secondary mb-3">
                    📍 Mumbai, Maharashtra
                  </p>
                  <div className="border-top pt-2">
                    <div className="small mb-1"><strong>Temperament:</strong> {currentBreed.temperament}</div>
                    <div className="small mb-1"><strong>Expected Lifespan:</strong> {currentBreed.lifeSpan}</div>
                    <div className="small"><strong>Typical Size:</strong> {currentBreed.size}</div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Breed Care Insights Card */}
          <Col xs={12} lg={8}>
            <Card className="pawmate-care-card h-100 p-4 shadow-sm">
              <h3 className="h4 fw-bold mb-3 d-flex align-items-center gap-2">
                <span>📋</span> Recommended Daily Care for {currentBreed.name}
              </h3>
              <p className="text-muted mb-4">
                Tailored care guidelines to help you and your PawMate caregiver provide the best health, stimulation, and happiness.
              </p>

              <Row className="g-3">
                <Col xs={12} md={4}>
                  <div className="care-tip-box p-3 rounded h-100 pawmate-feature-pill">
                    <div className="care-tip-icon mb-2">🏃‍♂️</div>
                    <h4 className="h6 fw-bold mb-1">Exercise Routine</h4>
                    <p className="small text-muted mb-0">{currentBreed.exercise}</p>
                  </div>
                </Col>

                <Col xs={12} md={4}>
                  <div className="care-tip-box p-3 rounded h-100 pawmate-feature-pill">
                    <div className="care-tip-icon mb-2">✂️</div>
                    <h4 className="h6 fw-bold mb-1">Grooming & Hygiene</h4>
                    <p className="small text-muted mb-0">{currentBreed.grooming}</p>
                  </div>
                </Col>

                <Col xs={12} md={4}>
                  <div className="care-tip-box p-3 rounded h-100 pawmate-feature-pill">
                    <div className="care-tip-icon mb-2">🥗</div>
                    <h4 className="h6 fw-bold mb-1">Diet & Nutrition</h4>
                    <p className="small text-muted mb-0">{currentBreed.nutrition}</p>
                  </div>
                </Col>
              </Row>

              <div className="care-cta-banner mt-4 p-3 rounded d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 shadow-sm">
                <div>
                  <strong className="d-block text-forest-dark">Looking for a verified mate for your {currentBreed.name}?</strong>
                  <span className="small text-muted">All PawMates are trained in breed-specific handling and first aid.</span>
                </div>
                <Button
                  variant="success"
                  className="btn-sm pawmate-btn-primary text-nowrap"
                  onClick={() => props.onNavigate && props.onNavigate('services')}
                >
                  Book Care Now
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default PetCareSection;
