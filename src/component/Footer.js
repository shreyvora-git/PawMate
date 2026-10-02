import React from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';

function Footer(props) {
  const handleNav = (page, e) => {
    if (e) e.preventDefault();
    if (props.onNavigate) {
      props.onNavigate(page);
    }
  };

  return (
    <footer className="pawmate-footer pt-5 pb-4">
      <Container>
        <Row className="g-4 pb-5 border-bottom border-secondary-subtle">
          <Col xs={12} md={4}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="pawmate-logo-icon">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M12 2C10.9 2 10 2.9 10 4C10 5.1 10.9 6 12 6C13.1 6 14 5.1 14 4C14 2.9 13.1 2 12 2ZM7 6C5.9 6 5 6.9 5 8C5 9.1 5.9 10 7 10C8.1 10 9 9.1 9 8C9 6.9 8.1 6 7 6ZM17 6C15.9 6 15 6.9 15 8C15 9.1 15.9 10 17 10C18.1 10 19 9.1 19 8C19 6.9 18.1 6 17 6ZM12 8C9.5 8 7.3 9.4 6.1 11.5C5.4 12.8 5 14.3 5 16C5 19.3 7.7 22 11 22H13C16.3 22 19 19.3 19 16C19 14.3 18.6 12.8 17.9 11.5C16.7 9.4 14.5 8 12 8Z" />
                </svg>
              </span>
              <span className="pawmate-brand-text fs-4">PawMate</span>
            </div>
            <p className="footer-tagline text-muted mb-4">
              Curated quiet, compassionate care, and trusted companionship for every family member with paws.
            </p>
            <div className="footer-badge-pill">
              <span>🛡️ 100% Verified Pet Professionals</span>
            </div>
          </Col>

          <Col xs={6} md={2} className="offset-md-1">
            <h4 className="footer-col-title mb-3">Explore</h4>
            <ul className="list-unstyled footer-links d-flex flex-column gap-2">
              <li><a href="#explore" onClick={(e) => handleNav('explore', e)}>Home / Explore</a></li>
              <li><a href="#services" onClick={(e) => handleNav('explore', e)}>Services</a></li>
              <li><a href="#pawmates" onClick={(e) => handleNav('explore', e)}>PawMates</a></li>
              <li><a href="#plans" onClick={(e) => handleNav('plans', e)}>Routine Plans</a></li>
            </ul>
          </Col>

          <Col xs={6} md={2}>
            <h4 className="footer-col-title mb-3">Company</h4>
            <ul className="list-unstyled footer-links d-flex flex-column gap-2">
              <li><a href="#about" onClick={(e) => handleNav('about', e)}>About PawMate</a></li>
              <li><a href="#how-it-works" onClick={(e) => handleNav('how-it-works', e)}>How It Works</a></li>
              <li><a href="#explore" onClick={(e) => handleNav('explore', e)}>Book a Service</a></li>
            </ul>
          </Col>

          <Col xs={12} md={3}>
            <h4 className="footer-col-title mb-3">Peace of Mind</h4>
            <p className="small text-muted mb-3">
              Every booking includes 24/7 support, veterinary emergency coverage, and live GPS route updates.
            </p>
            <div className="d-flex gap-2">
              <Badge bg="light" text="dark" className="border p-2">🔒 Secure Guarantee</Badge>
              <Badge bg="light" text="dark" className="border p-2">⚡ Instant Booking</Badge>
            </div>
          </Col>
        </Row>

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center pt-4 small text-muted">
          <p className="mb-2 mb-md-0">
            © 2024 PawMate. Web Computing Lab Microproject.
          </p>
          <div className="d-flex gap-4">
            <a href="#about" className="text-muted text-decoration-none" onClick={(e) => handleNav('about', e)}>About Us</a>
            <a href="#how-it-works" className="text-muted text-decoration-none" onClick={(e) => handleNav('how-it-works', e)}>Safety & Process</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
