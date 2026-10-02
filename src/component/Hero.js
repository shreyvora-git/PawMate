import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';

const HERO_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=900&auto=format&fit=crop&q=80',
    alt: 'Happy dogs playing outdoors'
  },
  {
    url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=900&auto=format&fit=crop&q=80',
    alt: 'Gentle Golden Retriever companion'
  },
  {
    url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=900&auto=format&fit=crop&q=80',
    alt: 'Playful cat enjoying in-home care'
  },
  {
    url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=900&auto=format&fit=crop&q=80',
    alt: 'Energized dog on a daily park walk'
  }
];

function Hero(props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotating Hero Image Slider (every 3.5 seconds)
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
    }, 3500);

    return () => clearInterval(slideTimer);
  }, []);

  const handleNavigate = (page) => {
    if (props.onNavigate) {
      props.onNavigate(page);
    }
  };

  return (
    <section className="pawmate-hero-section">
      <Container>
        <Row className="align-items-center g-5 min-vh-lg-90">
          <Col lg={6} className="z-2 reveal-on-scroll">
            <div className="pawmate-badge-pill mb-3">
              <span className="badge-check-icon">✓</span>
              <span>TRUSTED CARE. HAPPY PETS.</span>
            </div>

            <h1 className="pawmate-hero-heading mb-3">
              Your Pet Deserves the <span className="hero-accent">Right Mate.</span>{' '}
              <span className="paw-emoji">🐾</span>
            </h1>

            <p className="pawmate-hero-subtext mb-4">
              Find trusted, background-checked professionals who care for your pet with the same love, warmth, and attention as you do.
            </p>

            {/* CTA Button Group */}
            <div className="pawmate-hero-actions mb-4 d-flex flex-wrap gap-3 align-items-center">
              <Button
                type="button"
                className="pawmate-btn-cta-primary shadow-lg d-inline-flex align-items-center gap-2"
                onClick={() => handleNavigate('services')}
              >
                <span>Find a PawMate</span>
                <span className="btn-paw-icon d-inline-flex align-items-center">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="#ffffff">
                    <path d="M12 2C10.9 2 10 2.9 10 4C10 5.1 10.9 6 12 6C13.1 6 14 5.1 14 4C14 2.9 13.1 2 12 2ZM7 6C5.9 6 5 6.9 5 8C5 9.1 5.9 10 7 10C8.1 10 9 9.1 9 8C9 6.9 8.1 6 7 6ZM17 6C15.9 6 15 6.9 15 8C15 9.1 15.9 10 17 10C18.1 10 19 9.1 19 8C19 6.9 18.1 6 17 6ZM12 8C9.5 8 7.3 9.4 6.1 11.5C5.4 12.8 5 14.3 5 16C5 19.3 7.7 22 11 22H13C16.3 22 19 19.3 19 16C19 14.3 18.6 12.8 17.9 11.5C16.7 9.4 14.5 8 12 8Z" />
                  </svg>
                </span>
              </Button>

              <Button
                type="button"
                variant="outline-dark"
                className="pawmate-btn-cta-secondary d-inline-flex align-items-center gap-2"
                onClick={() => handleNavigate('plans')}
              >
                <span>Routine Plans</span>
                <span>→</span>
              </Button>
            </div>

            {/* Quick Service Category Tags */}
            <div className="d-flex flex-wrap gap-2 align-items-center mb-4">
              <span className="small text-muted fw-semibold me-1">Popular:</span>
              <button
                type="button"
                className="hero-service-tag"
                onClick={() => handleNavigate('services')}
              >
                🦮 Dog Walking
              </button>
              <button
                type="button"
                className="hero-service-tag"
                onClick={() => handleNavigate('services')}
              >
                🏠 Pet Sitting
              </button>
              <button
                type="button"
                className="hero-service-tag"
                onClick={() => handleNavigate('services')}
              >
                ✂️ Grooming
              </button>
              <button
                type="button"
                className="hero-service-tag"
                onClick={() => handleNavigate('services')}
              >
                🏨 Boarding
              </button>
            </div>

            {/* Trust Metrics Strip */}
            <Row className="g-3 pt-3 border-top border-light-subtle pawmate-trust-row">
              <Col xs={4} className="d-flex align-items-center gap-2">
                <div className="trust-icon-box bg-orange-subtle text-orange">⭐</div>
                <div>
                  <div className="trust-stat-val">4.9 ★</div>
                  <div className="trust-stat-label">Average Rating</div>
                </div>
              </Col>

              <Col xs={4} className="d-flex align-items-center gap-2">
                <div className="trust-icon-box bg-green-subtle text-green">🐾</div>
                <div>
                  <div className="trust-stat-val">2,000+</div>
                  <div className="trust-stat-label">Happy Pets</div>
                </div>
              </Col>

              <Col xs={4} className="d-flex align-items-center gap-2">
                <div className="trust-icon-box bg-forest-subtle text-forest">🛡️</div>
                <div>
                  <div className="trust-stat-val">100+</div>
                  <div className="trust-stat-label">Verified Mates</div>
                </div>
              </Col>
            </Row>
          </Col>

          {/* Hero Visual with Smooth Auto-Sliding Images */}
          <Col lg={6} className="position-relative hero-visual-container reveal-on-scroll">
            <div className="hero-shape-backdrop"></div>

            <div className="hero-image-wrapper shadow-lg position-relative overflow-hidden">
              {HERO_IMAGES.map((img, idx) => (
                <Image
                  key={idx}
                  src={img.url}
                  alt={img.alt}
                  className={`hero-main-img hero-slide-img ${idx === currentImageIndex ? 'active-slide' : 'inactive-slide'}`}
                />
              ))}

              {/* Slider Dots */}
              <div className="hero-slider-dots d-flex gap-1 justify-content-center position-absolute bottom-0 start-50 translate-middle-x mb-3 z-3">
                {HERO_IMAGES.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    className={`slider-dot-btn ${dotIdx === currentImageIndex ? 'active-dot' : ''}`}
                    onClick={() => setCurrentImageIndex(dotIdx)}
                    aria-label={`Slide to image ${dotIdx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Floating Trust Cards */}
            <div className="hero-floating-card float-card-1 anim-float-1 shadow-sm">
              <div className="float-card-icon-circle bg-light-green text-green">
                ✓
              </div>
              <div>
                <div className="float-card-title">100% Verified</div>
                <div className="float-card-subtitle">Background Checked</div>
              </div>
            </div>

            <div className="hero-floating-card float-card-2 bg-forest-dark text-white anim-float-2 shadow-sm">
              <div className="float-card-icon-circle bg-white-20 text-white">
                💚
              </div>
              <div>
                <div className="float-card-title text-white">Care You Can Trust</div>
                <div className="float-card-subtitle text-white-75">GPS Walk Tracking</div>
              </div>
            </div>

            <div className="hero-floating-card float-card-3 anim-float-3 shadow-sm">
              <div className="d-flex align-items-center gap-2 mb-1">
                <div className="float-card-icon-circle bg-orange-subtle text-orange">
                  ❤️
                </div>
                <div className="float-card-title">Loved by Parents</div>
              </div>
              <div className="d-flex align-items-center pt-1">
                <div className="avatar-stack">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="User avatar 1"
                    className="avatar-img"
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                    alt="User avatar 2"
                    className="avatar-img"
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                    alt="User avatar 3"
                    className="avatar-img"
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                    alt="User avatar 4"
                    className="avatar-img"
                  />
                </div>
                <span className="avatar-count-badge">+120</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Hero;
