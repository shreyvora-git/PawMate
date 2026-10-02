import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, Modal, Image } from 'react-bootstrap';

function CaregiverProfile(props) {
  const currentUser = props.currentUser || {
    name: 'Rahul Sharma',
    location: 'Chembur, Mumbai',
    bio: 'Certified PawMate Professional • CPR & First Aid Certified'
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const [profile, setProfile] = useState({
    name: currentUser.name || 'PawMate Caregiver',
    tagline: currentUser.bio || 'Certified Dog Walker & Senior Pet Sitter',
    location: currentUser.location || 'Mumbai, Maharashtra',
    experience: '3+ years professional pet care experience',
    rating: '5.0 ★ (New Verified Pro)',
    about: currentUser.bio || 'Lifelong pet enthusiast with comprehensive CPR and first aid certification. Dedicated to providing loving, safe, and active care for your companions.',
    skills: ['CPR & First Aid Certified', 'Large Dog Handling', 'Medication Administration', 'Puppy Socialization', 'Live GPS Tracking'],
    hourlyRate: '₹350/session',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80'
  });

  const [editForm, setEditForm] = useState({ ...profile });

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setProfile({ ...editForm });
    setShowEditModal(false);
  };

  return (
    <div className="pawmate-page-container py-5">
      <Container>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 reveal-on-scroll">
          <div>
            <div className="pawmate-eyebrow mb-1">PUBLIC PAWMATE IDENTITY</div>
            <h1 className="pawmate-page-title mb-1">PawMate Profile</h1>
            <p className="text-muted small mb-0">This is how pet parents see your verification badges, rates, and services across the marketplace.</p>
          </div>
          <Button
            className="pawmate-btn-primary mt-3 mt-md-0 shadow-sm rounded-pill px-4"
            style={{ backgroundColor: '#1a4331', borderColor: '#1a4331' }}
            onClick={() => {
              setEditForm({ ...profile });
              setShowEditModal(true);
            }}
          >
            Edit Profile ✎
          </Button>
        </div>

        <Row className="g-4">
          <Col xs={12} md={4} className="reveal-on-scroll">
            <Card className="p-4 rounded-4 border shadow-sm bg-white text-center">
              <Image
                src={profile.image}
                alt={profile.name}
                className="rounded-circle object-fit-cover shadow-sm mx-auto mb-3 border border-3 border-forest"
                width="140"
                height="140"
              />
              <h2 className="h5 fw-bold mb-1 text-dark">{profile.name}</h2>
              <p className="small text-muted mb-2">{profile.tagline}</p>
              <div className="badge bg-warning text-dark px-3 py-2 rounded-pill mb-3">
                {profile.rating}
              </div>
              <p className="small text-secondary mb-3">📍 {profile.location}</p>
              <div className="p-3 bg-light rounded-3 border">
                <span className="small text-muted d-block">Starting Session Rate</span>
                <strong className="text-forest fs-5">{profile.hourlyRate}</strong>
              </div>
            </Card>
          </Col>

          <Col xs={12} md={8} className="reveal-on-scroll">
            <Card className="p-4 p-md-5 rounded-4 border shadow-sm bg-white">
              <h3 className="h6 fw-bold mb-3 text-dark">About Me & Background</h3>
              <p className="text-muted small mb-4 lh-lg">
                {profile.about}
              </p>

              <h3 className="h6 fw-bold mb-2 text-dark">Experience & Specialization</h3>
              <p className="text-muted small mb-4">
                💼 {profile.experience}
              </p>

              <h3 className="h6 fw-bold mb-3 text-dark">Verified Skills & Certifications</h3>
              <div className="d-flex flex-wrap gap-2 mb-4">
                {profile.skills.map((skill, idx) => (
                  <Badge
                    key={idx}
                    className="px-3 py-2 rounded-pill"
                    style={{ backgroundColor: '#d6ebd9', color: '#1a4331', border: '1px solid #b7ddbd' }}
                  >
                    ✓ {skill}
                  </Badge>
                ))}
              </div>

              <div className="p-3 bg-forest-subtle rounded-3 d-flex align-items-center justify-content-between border">
                <div>
                  <strong className="text-forest">Profile Status: Active & Verified</strong>
                  <span className="small text-muted d-block">Ready to receive instant booking requests in {profile.location}</span>
                </div>
                <Badge bg="success" className="px-3 py-2 rounded-pill">100% VERIFIED</Badge>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Edit Modal */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
          <Modal.Header closeButton className="border-0 pb-0">
            <Modal.Title className="h5 fw-bold text-forest">Edit Public Profile</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleEditSubmit}>
            <Modal.Body className="py-3">
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold">Full Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold">Professional Tagline</Form.Label>
                <Form.Control
                  type="text"
                  value={editForm.tagline}
                  onChange={(e) => setEditForm({ ...editForm, tagline: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold">Location</Form.Label>
                <Form.Control
                  type="text"
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold">Starting Rate</Form.Label>
                <Form.Control
                  type="text"
                  value={editForm.hourlyRate}
                  onChange={(e) => setEditForm({ ...editForm, hourlyRate: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label className="small fw-bold">About Bio</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={editForm.about}
                  onChange={(e) => setEditForm({ ...editForm, about: e.target.value })}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer className="border-0 pt-0">
              <Button variant="light" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="pawmate-btn-primary px-4 fw-bold"
                style={{ backgroundColor: '#1a4331', borderColor: '#1a4331' }}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </div>
  );
}

export default CaregiverProfile;
