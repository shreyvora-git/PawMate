import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, Modal } from 'react-bootstrap';

// Curated locality database across major Indian metropolitan & regional hubs
const POPULAR_INDIAN_LOCALITIES = [
  'Bandra, Mumbai',
  'Bhayandar, Mumbai',
  'Andheri, Mumbai',
  'Chembur, Mumbai',
  'Powai, Mumbai',
  'Juhu, Mumbai',
  'Dadar, Mumbai',
  'Colaba, Mumbai',
  'Borivali, Mumbai',
  'Ghatkopar, Mumbai',
  'Malad, Mumbai',
  'Thane, Maharashtra',
  'Navi Mumbai, Maharashtra',
  'Pune, Maharashtra',
  'Nashik, Maharashtra',
  'Nagpur, Maharashtra',
  'Ahmedabad, Gujarat',
  'Surat, Gujarat',
  'Vadodara, Gujarat',
  'Bengaluru, Karnataka',
  'Whitefield, Bengaluru',
  'Koramangala, Bengaluru',
  'Indiranagar, Bengaluru',
  'Delhi, NCR',
  'Gurgaon, Haryana',
  'Noida, Uttar Pradesh',
  'Hyderabad, Telangana',
  'Gachibowli, Hyderabad',
  'Chennai, Tamil Nadu',
  'Kolkata, West Bengal',
  'Jaipur, Rajasthan',
  'Lucknow, Uttar Pradesh',
  'Chandigarh, Punjab',
  'Kochi, Kerala',
  'Panaji, Goa',
  'Indore, Madhya Pradesh',
  'Bhopal, Madhya Pradesh',
  'Coimbatore, Tamil Nadu',
  'Dehradun, Uttarakhand',
  'Patna, Bihar'
];

function CaregiverServices(props) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Add form fields
  const [name, setName] = useState('');
  const [price, setPrice] = useState('₹450');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('Walking');
  const [profilePhoto, setProfilePhoto] = useState(
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80'
  );
  const [description, setDescription] = useState('');
  const [formError, setFormError] = useState('');

  // Location suggestions state
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Edit form fields
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editCategory, setEditCategory] = useState('Walking');
  const [editProfilePhoto, setEditProfilePhoto] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editLocationSuggestions, setEditLocationSuggestions] = useState([]);
  const [showEditSuggestions, setShowEditSuggestions] = useState(false);

  const servicesList = props.caregiverServices || [];

  // API-Powered Location Suggestions via useEffect & Photon / Locality Geocoder
  useEffect(() => {
    if (!location.trim() || location.trim().length < 2) {
      setLocationSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const query = location.trim().toLowerCase();
    let isCancelled = false;

    // Filter local curated database immediately
    const localMatches = POPULAR_INDIAN_LOCALITIES.filter((loc) =>
      loc.toLowerCase().includes(query)
    );

    // Call geocoding API for wider India location coverage
    const controller = new AbortController();
    fetch(
      `https://photon.komoot.io/api/?q=${encodeURIComponent(location)}&countrycode=IN&limit=5`,
      { signal: controller.signal }
    )
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isCancelled) return;
        const apiSuggestions = [];
        if (data && data.features) {
          data.features.forEach((f) => {
            const p = f.properties || {};
            const locality = p.name || p.district || p.suburb || p.city;
            const cityOrState = p.city || p.state || 'India';
            if (locality && cityOrState && locality !== cityOrState) {
              const formatted = `${locality}, ${cityOrState}`;
              if (!apiSuggestions.includes(formatted)) {
                apiSuggestions.push(formatted);
              }
            } else if (locality) {
              apiSuggestions.push(locality);
            }
          });
        }

        // Merge API suggestions with local curated list
        const merged = Array.from(new Set([...localMatches, ...apiSuggestions])).slice(0, 6);
        setLocationSuggestions(merged);
        setShowSuggestions(merged.length > 0);
      })
      .catch(() => {
        if (!isCancelled) {
          setLocationSuggestions(localMatches.slice(0, 6));
          setShowSuggestions(localMatches.length > 0);
        }
      });

    return () => {
      isCancelled = true;
      controller.abort();
    };
  }, [location]);

  // Edit form location suggestions
  useEffect(() => {
    if (!editLocation.trim() || editLocation.trim().length < 2) {
      setEditLocationSuggestions([]);
      setShowEditSuggestions(false);
      return;
    }

    const query = editLocation.trim().toLowerCase();
    const localMatches = POPULAR_INDIAN_LOCALITIES.filter((loc) =>
      loc.toLowerCase().includes(query)
    );
    setEditLocationSuggestions(localMatches.slice(0, 5));
    setShowEditSuggestions(localMatches.length > 0);
  }, [editLocation]);

  const handleSelectLocation = (selectedLoc) => {
    setLocation(selectedLoc);
    setShowSuggestions(false);
  };

  const handleSelectEditLocation = (selectedLoc) => {
    setEditLocation(selectedLoc);
    setShowEditSuggestions(false);
  };

  const handleAddServiceSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    if (!name.trim()) {
      setFormError('Please enter a service title.');
      return;
    }
    if (!location.trim()) {
      setFormError('Please select or type your general service area.');
      return;
    }
    if (!profilePhoto.trim()) {
      setFormError('Your Profile Photo URL is required for PawMate verification.');
      return;
    }

    const newSvc = {
      id: Date.now(),
      name: name.trim(),
      category: category,
      price: price.trim().startsWith('₹') ? price.trim() : `₹${price.trim()}`,
      location: location.trim(),
      description: description.trim() || 'Dedicated, loving pet care session tailored to your companion\'s specific needs.',
      image: profilePhoto.trim(),
      isAvailable: true
    };

    if (props.onAddService) {
      props.onAddService(newSvc);
    }

    setName('');
    setLocation('');
    setDescription('');
    setFormError('');
    setShowAddModal(false);
  };

  const handleOpenEdit = (svc) => {
    setEditingId(svc.id);
    setEditName(svc.name);
    setEditPrice(svc.price);
    setEditLocation(svc.location || 'Bandra, Mumbai');
    setEditCategory(svc.category || 'Walking');
    setEditProfilePhoto(svc.image || '');
    setEditDescription(svc.description || '');
    setShowEditModal(true);
  };

  const handleEditServiceSubmit = (e) => {
    e.preventDefault();
    if (!editName.trim() || !editingId) return;
    if (!editProfilePhoto.trim()) {
      alert('Profile photo URL is required.');
      return;
    }

    const updatedSvc = {
      id: editingId,
      name: editName.trim(),
      category: editCategory,
      price: editPrice.trim().startsWith('₹') ? editPrice.trim() : `₹${editPrice.trim()}`,
      location: editLocation.trim() || 'Mumbai, Maharashtra',
      description: editDescription.trim() || 'Professional pet care session.',
      image: editProfilePhoto.trim(),
      isAvailable: true
    };

    if (props.onEditService) {
      props.onEditService(updatedSvc);
    }

    setShowEditModal(false);
  };

  const handleDeleteService = (svcId) => {
    if (props.onDeleteService) {
      props.onDeleteService(svcId);
    }
  };

  return (
    <div className="pawmate-page-container py-5">
      <Container>
        {/* Header Strip */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
          <div>
            <div className="pawmate-eyebrow mb-1">SERVICE PORTFOLIO</div>
            <h1 className="pawmate-page-title mb-1">My PawMate Services</h1>
            <p className="text-muted mb-0 small">
              Manage your offered sessions ({servicesList.length} active), set custom pricing, and edit booking availability in real time.
            </p>
          </div>
          <Button
            className="pawmate-btn-primary mt-3 mt-md-0 d-inline-flex align-items-center gap-2 shadow-sm rounded-pill px-4 py-2 fw-bold"
            style={{ backgroundColor: '#1a4331', borderColor: '#1a4331' }}
            onClick={() => setShowAddModal(true)}
          >
            <span>+ Add New Service</span>
          </Button>
        </div>

        {/* Services Grid */}
        {servicesList.length > 0 ? (
          <Row className="g-4 mb-5">
            {servicesList.map((svc) => (
              <Col xs={12} md={6} lg={4} key={svc.id} className="d-flex">
                <Card className="p-4 rounded-4 border shadow-sm h-100 w-100 bg-white d-flex flex-column justify-content-between pawmate-service-item-card">
                  <div>
                    <div className="d-flex justify-content-between align-items-start mb-2 gap-2">
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={svc.image || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80'}
                          alt={svc.name}
                          className="rounded-circle object-fit-cover border"
                          width="36"
                          height="36"
                        />
                        <h2 className="h6 fw-bold mb-0 text-dark">{svc.name}</h2>
                      </div>
                      <Badge
                        className="rounded-pill px-2 py-1 small"
                        style={{
                          backgroundColor: svc.isAvailable !== false ? '#d6ebd9' : '#f3f4f6',
                          color: svc.isAvailable !== false ? '#1a4331' : '#6b7280',
                          border: svc.isAvailable !== false ? '1px solid #b7ddbd' : '1px solid #e5e7eb'
                        }}
                      >
                        {svc.isAvailable !== false ? '✓ Available' : 'Paused'}
                      </Badge>
                    </div>
                    <p className="small text-muted mb-3" style={{ minHeight: '44px' }}>
                      {svc.description}
                    </p>
                    <div className="small text-secondary mb-3 d-flex align-items-center gap-1">
                      <span>📍</span> <span>{svc.location}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-top d-flex justify-content-between align-items-center">
                    <div>
                      <span className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Rate</span>
                      <strong className="text-forest fs-5">{svc.price}</strong>
                    </div>

                    <div className="d-flex gap-1.5 align-items-center">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="rounded-pill px-2.5 py-1 small"
                        style={{ fontSize: '0.75rem' }}
                        onClick={() => handleOpenEdit(svc)}
                        title="Edit Service"
                      >
                        ✏️ Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="rounded-pill px-2.5 py-1 small"
                        style={{ fontSize: '0.75rem' }}
                        onClick={() => handleDeleteService(svc.id)}
                        title="Delete Service"
                      >
                        🗑️
                      </Button>
                      <Button
                        variant={svc.isAvailable !== false ? 'outline-secondary' : 'outline-success'}
                        size="sm"
                        className="rounded-pill px-3 py-1 fw-semibold small"
                        style={{ fontSize: '0.75rem' }}
                        onClick={() => props.onToggleAvailability && props.onToggleAvailability(svc.id)}
                      >
                        {svc.isAvailable !== false ? 'Pause' : 'Activate'}
                      </Button>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center py-5 bg-white rounded-4 border shadow-sm my-4 p-4">
            <div className="fs-1 mb-3">💼</div>
            <h2 className="h5 fw-bold mb-2">No services added yet.</h2>
            <p className="text-muted small max-w-700 mx-auto mb-4">
              Publish your dog walking, pet sitting, or grooming sessions with custom rates to start receiving booking requests from pet parents.
            </p>
            <Button
              className="pawmate-btn-primary px-4 py-2 rounded-pill fw-bold shadow-sm"
              style={{ backgroundColor: '#1a4331', borderColor: '#1a4331' }}
              onClick={() => setShowAddModal(true)}
            >
              + Add Your First Service
            </Button>
          </div>
        )}

        {/* Add Service Modal */}
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
          <Modal.Header closeButton className="border-0 pb-0">
            <Modal.Title className="h5 fw-bold text-forest">💼 Add New Care Service</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleAddServiceSubmit}>
            <Modal.Body className="py-3">
              {formError && (
                <div className="alert alert-danger py-2 small mb-3">
                  {formError}
                </div>
              )}

              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold">Service Title *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Active Dog Walking & Trail Run"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

              <div className="row g-2 mb-3">
                <div className="col-6">
                  <Form.Group>
                    <Form.Label className="small fw-bold">Price / Session *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g. ₹500"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-6">
                  <Form.Group>
                    <Form.Label className="small fw-bold">Category</Form.Label>
                    <Form.Select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="Walking">Walking 🦮</option>
                      <option value="Sitting">Sitting 🏠</option>
                      <option value="Grooming">Grooming ✂️</option>
                      <option value="Boarding">Boarding 🏨</option>
                      <option value="Training">Training 🎓</option>
                      <option value="Specialized">Specialized 🩺</option>
                    </Form.Select>
                  </Form.Group>
                </div>
              </div>

              {/* Service Area with API-Powered Locality Suggestions */}
              <Form.Group className="mb-3 position-relative">
                <Form.Label className="small fw-bold">Service Area (General Locality / City) *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type city or locality (e.g. Bandra, Mumbai or Pune)..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onFocus={() => {
                    if (locationSuggestions.length > 0) setShowSuggestions(true);
                  }}
                  autoComplete="off"
                  required
                />
                <Form.Text className="text-muted small">
                  General city or neighborhood level across India (not an exact building address).
                </Form.Text>

                {/* Suggestions Dropdown */}
                {showSuggestions && locationSuggestions.length > 0 && (
                  <div
                    className="position-absolute start-0 end-0 bg-white border rounded-3 shadow-lg z-3 mt-1 overflow-hidden"
                    style={{ maxHeight: '190px', overflowY: 'auto' }}
                  >
                    {locationSuggestions.map((suggestion, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-2 small border-bottom text-dark d-flex align-items-center gap-2"
                        style={{ cursor: 'pointer', backgroundColor: '#ffffff', transition: 'background-color 0.15s' }}
                        onMouseDown={() => handleSelectLocation(suggestion)}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f3f4f6'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; }}
                      >
                        <span className="text-muted">📍</span>
                        <strong>{suggestion}</strong>
                      </div>
                    ))}
                  </div>
                )}
              </Form.Group>

              {/* Required Profile Photo URL */}
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold">Your Profile Photo URL *</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={profilePhoto}
                  onChange={(e) => setProfilePhoto(e.target.value)}
                  required
                />
                <Form.Text className="text-muted small">
                  Required for PawMate profile verification.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label className="small fw-bold">Description & Scope</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Describe what activities and care steps are included in this session..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer className="border-0 pt-0">
              <Button variant="light" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="pawmate-btn-primary fw-bold px-4 rounded-pill"
                style={{ backgroundColor: '#1a4331', borderColor: '#1a4331' }}
              >
                Publish Service
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        {/* Edit Service Modal */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
          <Modal.Header closeButton className="border-0 pb-0">
            <Modal.Title className="h5 fw-bold text-forest">✏️ Edit Service Details</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleEditServiceSubmit}>
            <Modal.Body className="py-3">
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold">Service Title *</Form.Label>
                <Form.Control
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                />
              </Form.Group>

              <div className="row g-2 mb-3">
                <div className="col-6">
                  <Form.Group>
                    <Form.Label className="small fw-bold">Price / Session</Form.Label>
                    <Form.Control
                      type="text"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-6">
                  <Form.Group>
                    <Form.Label className="small fw-bold">Category</Form.Label>
                    <Form.Select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                    >
                      <option value="Walking">Walking 🦮</option>
                      <option value="Sitting">Sitting 🏠</option>
                      <option value="Grooming">Grooming ✂️</option>
                      <option value="Boarding">Boarding 🏨</option>
                      <option value="Training">Training 🎓</option>
                      <option value="Specialized">Specialized 🩺</option>
                    </Form.Select>
                  </Form.Group>
                </div>
              </div>

              <Form.Group className="mb-3 position-relative">
                <Form.Label className="small fw-bold">Service Area *</Form.Label>
                <Form.Control
                  type="text"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  required
                />
                {showEditSuggestions && editLocationSuggestions.length > 0 && (
                  <div
                    className="position-absolute start-0 end-0 bg-white border rounded-3 shadow-lg z-3 mt-1 overflow-hidden"
                    style={{ maxHeight: '160px', overflowY: 'auto' }}
                  >
                    {editLocationSuggestions.map((suggestion, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-2 small border-bottom text-dark"
                        style={{ cursor: 'pointer', backgroundColor: '#ffffff' }}
                        onMouseDown={() => handleSelectEditLocation(suggestion)}
                      >
                        📍 <strong>{suggestion}</strong>
                      </div>
                    ))}
                  </div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold">Your Profile Photo URL *</Form.Label>
                <Form.Control
                  type="url"
                  value={editProfilePhoto}
                  onChange={(e) => setEditProfilePhoto(e.target.value)}
                  required
                />
                <Form.Text className="text-muted small">
                  Required for PawMate profile verification.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label className="small fw-bold">Description & Scope</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer className="border-0 pt-0">
              <Button variant="light" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="pawmate-btn-primary fw-bold px-4 rounded-pill"
                style={{ backgroundColor: '#1a4331', borderColor: '#1a4331' }}
              >
                Update Service
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </div>
  );
}

export default CaregiverServices;
