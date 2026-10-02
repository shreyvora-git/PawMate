import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Badge, Image } from 'react-bootstrap';

function MyPetsPage(props) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Form states for adding
  const [newPetName, setNewPetName] = useState('');
  const [newPetSpecies, setNewPetSpecies] = useState('Dog');
  const [newPetBreed, setNewPetBreed] = useState('Golden Retriever');
  const [newPetAge, setNewPetAge] = useState('2 yrs');
  const [newPetPhoto, setNewPetPhoto] = useState('');
  const [newPetNotes, setNewPetNotes] = useState('');

  // Form states for editing
  const [editingPetId, setEditingPetId] = useState(null);
  const [editPetName, setEditPetName] = useState('');
  const [editPetSpecies, setEditPetSpecies] = useState('Dog');
  const [editPetBreed, setEditPetBreed] = useState('');
  const [editPetAge, setEditPetAge] = useState('');
  const [editPetPhoto, setEditPetPhoto] = useState('');
  const [editPetNotes, setEditPetNotes] = useState('');

  const [selectedPetIndex, setSelectedPetIndex] = useState(0);

  const petsList = props.pets || [];
  const safeIndex = selectedPetIndex < petsList.length ? selectedPetIndex : 0;
  const activePet = petsList[safeIndex] || null;

  const defaultDogImg = 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&auto=format&fit=crop&q=80';
  const defaultCatImg = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=80';

  const handleAddPetSubmit = (e) => {
    e.preventDefault();
    if (!newPetName.trim()) return;

    const newPetObj = {
      id: Date.now(),
      name: newPetName.trim(),
      species: newPetSpecies,
      breed: newPetBreed.trim() || (newPetSpecies === 'Cat' ? 'Domestic Shorthair' : 'Friendly Mixed Breed'),
      age: newPetAge.trim() || '1 yr',
      image: newPetPhoto.trim() || (newPetSpecies === 'Cat' ? defaultCatImg : defaultDogImg),
      notes: newPetNotes.trim() || 'Friendly and energetic companion.',
      medical: 'Vaccinated & microchipped'
    };

    if (props.onAddPet) {
      props.onAddPet(newPetObj);
    }

    setSelectedPetIndex(0);
    setNewPetName('');
    setNewPetNotes('');
    setNewPetPhoto('');
    setShowAddModal(false);
  };

  const handleOpenEditModal = (pet, e) => {
    if (e) e.stopPropagation();
    setEditingPetId(pet.id);
    setEditPetName(pet.name);
    setEditPetSpecies(pet.species || 'Dog');
    setEditPetBreed(pet.breed || '');
    setEditPetAge(pet.age || '');
    setEditPetPhoto(pet.image || '');
    setEditPetNotes(pet.notes || '');
    setShowEditModal(true);
  };

  const handleEditPetSubmit = (e) => {
    e.preventDefault();
    if (!editPetName.trim() || !editingPetId) return;

    const updatedPet = {
      id: editingPetId,
      name: editPetName.trim(),
      species: editPetSpecies,
      breed: editPetBreed.trim() || (editPetSpecies === 'Cat' ? 'Domestic Shorthair' : 'Mixed Breed'),
      age: editPetAge.trim() || '2 yrs',
      image: editPetPhoto.trim() || (editPetSpecies === 'Cat' ? defaultCatImg : defaultDogImg),
      notes: editPetNotes.trim() || 'Loving pet companion.',
      medical: 'Vaccinated & microchipped'
    };

    if (props.onEditPet) {
      props.onEditPet(updatedPet);
    }

    setShowEditModal(false);
  };

  const handleDeletePet = (petId, e) => {
    if (e) e.stopPropagation();
    if (props.onDeletePet) {
      props.onDeletePet(petId);
      setSelectedPetIndex(0);
    }
  };

  return (
    <div className="pawmate-page-container py-5">
      <Container>
        {/* Header with Add Pet CTA */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
          <div>
            <div className="pawmate-eyebrow mb-1">PET FAMILY PROFILES</div>
            <h1 className="pawmate-page-title mb-1">My Registered Pets</h1>
            <p className="text-muted mb-0 small">
              Manage your furry family members ({petsList.length} registered), care routines, and instant bookings.
            </p>
          </div>
          <Button
            variant="success"
            className="pawmate-btn-primary mt-3 mt-md-0 d-inline-flex align-items-center gap-2"
            onClick={() => setShowAddModal(true)}
          >
            <span>+ Add New Pet</span>
          </Button>
        </div>

        {petsList.length > 0 ? (
          <>
            {/* Registered Pets Grid */}
            <Row className="g-4 mb-5">
              {petsList.map((pet, idx) => (
                <Col xs={12} md={6} lg={4} key={pet.id || idx}>
                  <Card
                    className={`pawmate-pet-card h-100 p-3 ${selectedPetIndex === idx ? 'active-pet-card' : ''}`}
                    onClick={() => setSelectedPetIndex(idx)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="pet-avatar-wrap mb-3 text-center position-relative">
                      <Image
                        src={pet.image || defaultDogImg}
                        alt={pet.name}
                        className="pet-photo-thumbnail rounded-4 img-fluid"
                        style={{ height: '180px', width: '100%', objectFit: 'cover' }}
                      />
                      <Badge bg="success" className="position-absolute top-0 end-0 m-2">
                        {pet.species}
                      </Badge>
                    </div>
                    <Card.Body className="p-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <Card.Title as="h3" className="h5 fw-bold mb-0">{pet.name}</Card.Title>
                        <Badge bg="light" text="dark" className="border">{pet.age}</Badge>
                      </div>
                      <p className="small text-muted mb-2">
                        {pet.breed}
                      </p>
                      <p className="small text-secondary mb-3">
                        📝 {pet.notes}
                      </p>
                      <div className="pt-2 border-top d-flex justify-content-between align-items-center">
                        <div className="d-flex gap-1">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            className="rounded-pill px-2 py-0.5 small"
                            style={{ fontSize: '0.75rem' }}
                            onClick={(e) => handleOpenEditModal(pet, e)}
                            title="Edit Pet"
                          >
                            ✏️ Edit
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="rounded-pill px-2 py-0.5 small"
                            style={{ fontSize: '0.75rem' }}
                            onClick={(e) => handleDeletePet(pet.id, e)}
                            title="Delete Pet"
                          >
                            🗑️
                          </Button>
                        </div>

                        <Button
                          variant="outline-success"
                          size="sm"
                          className="rounded-pill px-3"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (props.onOpenBooking) {
                              props.onOpenBooking({ name: `Care for ${pet.name}`, price: '₹300' });
                            }
                          }}
                        >
                          Book Care
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Detailed Profile Showcase for Selected Pet */}
            {activePet && (
              <div className="bg-white p-4 p-md-5 rounded-4 border shadow-sm mb-4">
                <Row className="align-items-center g-4">
                  <Col xs={12} md={4} className="text-center">
                    <Image
                      src={activePet.image || defaultDogImg}
                      alt={activePet.name}
                      className="rounded-4 img-fluid shadow-sm"
                      style={{ maxHeight: '240px', objectFit: 'cover', width: '100%' }}
                    />
                  </Col>
                  <Col xs={12} md={8}>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <h2 className="h3 fw-bold mb-0">{activePet.name}'s Profile</h2>
                      <Badge bg="success">{activePet.species}</Badge>
                      <Badge bg="light" text="dark" className="border">{activePet.age}</Badge>
                    </div>
                    <p className="text-muted mb-3">
                      <strong>Breed:</strong> {activePet.breed} &nbsp;|&nbsp; <strong>Status:</strong> Active & Registered
                    </p>
                    <div className="p-3 bg-light rounded-3 mb-3 border">
                      <h4 className="h6 fw-bold mb-1">Care & Routine Notes:</h4>
                      <p className="small text-muted mb-0">{activePet.notes}</p>
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      <Button
                        variant="success"
                        className="pawmate-btn-primary btn-sm"
                        onClick={() => {
                          if (props.onOpenBooking) {
                            props.onOpenBooking({ name: `Care for ${activePet.name}`, price: '₹300' });
                          }
                        }}
                      >
                        Schedule Care for {activePet.name} 🐾
                      </Button>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="rounded-pill px-3"
                        onClick={(e) => handleOpenEditModal(activePet, e)}
                      >
                        Edit Profile
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
            )}
          </>
        ) : (
          /* Empty State for New User */
          <div className="text-center py-5 bg-white rounded-4 border shadow-sm my-4 p-4">
            <div className="fs-1 mb-3">🐶</div>
            <h2 className="h5 fw-bold mb-2">No pets added yet.</h2>
            <p className="text-muted small max-w-700 mx-auto mb-4">
              Register your dogs, cats, or other furry family members to track their breed care schedules and book certified PawMates.
            </p>
            <Button
              variant="success"
              className="pawmate-btn-primary px-4 py-2 fw-bold rounded-pill shadow-sm"
              style={{ backgroundColor: '#1a4331', borderColor: '#1a4331' }}
              onClick={() => setShowAddModal(true)}
            >
              + Add Your First Pet
            </Button>
          </div>
        )}

        {/* Add Pet Modal */}
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
          <Modal.Header closeButton className="border-0 pb-0">
            <Modal.Title className="h5 fw-bold text-forest">🐾 Register a New Pet</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleAddPetSubmit}>
            <Modal.Body className="py-3">
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold">Pet Name *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Charlie"
                  value={newPetName}
                  onChange={(e) => setNewPetName(e.target.value)}
                  required
                />
              </Form.Group>

              <div className="row g-2 mb-3">
                <div className="col-6">
                  <Form.Group>
                    <Form.Label className="small fw-bold">Species</Form.Label>
                    <Form.Select
                      value={newPetSpecies}
                      onChange={(e) => setNewPetSpecies(e.target.value)}
                    >
                      <option value="Dog">Dog 🐕</option>
                      <option value="Cat">Cat 🐈</option>
                      <option value="Other">Other 🐾</option>
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="col-6">
                  <Form.Group>
                    <Form.Label className="small fw-bold">Age</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g. 2 yrs"
                      value={newPetAge}
                      onChange={(e) => setNewPetAge(e.target.value)}
                    />
                  </Form.Group>
                </div>
              </div>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold">Breed</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Labrador, Beagle, Persian..."
                  value={newPetBreed}
                  onChange={(e) => setNewPetBreed(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold">Photo URL (Optional)</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="https://..."
                  value={newPetPhoto}
                  onChange={(e) => setNewPetPhoto(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label className="small fw-bold">Care Notes & Routine</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="e.g. Friendly with large dogs, allergic to chicken..."
                  value={newPetNotes}
                  onChange={(e) => setNewPetNotes(e.target.value)}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer className="border-0 pt-0">
              <Button variant="light" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button
                variant="success"
                type="submit"
                className="pawmate-btn-primary fw-bold px-4"
                style={{ backgroundColor: '#1a4331', borderColor: '#1a4331' }}
              >
                Save Pet
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        {/* Edit Pet Modal */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
          <Modal.Header closeButton className="border-0 pb-0">
            <Modal.Title className="h5 fw-bold text-forest">✏️ Edit Pet Details</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleEditPetSubmit}>
            <Modal.Body className="py-3">
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold">Pet Name *</Form.Label>
                <Form.Control
                  type="text"
                  value={editPetName}
                  onChange={(e) => setEditPetName(e.target.value)}
                  required
                />
              </Form.Group>

              <div className="row g-2 mb-3">
                <div className="col-6">
                  <Form.Group>
                    <Form.Label className="small fw-bold">Species</Form.Label>
                    <Form.Select
                      value={editPetSpecies}
                      onChange={(e) => setEditPetSpecies(e.target.value)}
                    >
                      <option value="Dog">Dog 🐕</option>
                      <option value="Cat">Cat 🐈</option>
                      <option value="Other">Other 🐾</option>
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="col-6">
                  <Form.Group>
                    <Form.Label className="small fw-bold">Age</Form.Label>
                    <Form.Control
                      type="text"
                      value={editPetAge}
                      onChange={(e) => setEditPetAge(e.target.value)}
                    />
                  </Form.Group>
                </div>
              </div>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold">Breed</Form.Label>
                <Form.Control
                  type="text"
                  value={editPetBreed}
                  onChange={(e) => setEditPetBreed(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold">Photo URL</Form.Label>
                <Form.Control
                  type="url"
                  value={editPetPhoto}
                  onChange={(e) => setEditPetPhoto(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label className="small fw-bold">Care Notes & Routine</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={editPetNotes}
                  onChange={(e) => setEditPetNotes(e.target.value)}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer className="border-0 pt-0">
              <Button variant="light" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
              <Button
                variant="success"
                type="submit"
                className="pawmate-btn-primary fw-bold px-4"
                style={{ backgroundColor: '#1a4331', borderColor: '#1a4331' }}
              >
                Update Pet
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </div>
  );
}

export default MyPetsPage;
