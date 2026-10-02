import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function BookingModal(props) {
  const defaultPetName = props.pets && props.pets.length > 0 ? props.pets[0].name : '';
  const [selectedPet, setSelectedPet] = useState(defaultPetName);
  const [customPetName, setCustomPetName] = useState('');
  const [bookingDate, setBookingDate] = useState('2026-08-25');
  const [bookingTime, setBookingTime] = useState('10:00 AM');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (props.pets && props.pets.length > 0) {
      setSelectedPet(props.pets[0].name);
    }
  }, [props.pets]);

  const handleConfirm = (e) => {
    e.preventDefault();

    const target = props.bookingTarget || {};
    const isPawMate = Boolean(target.rating || target.experience || target.tags);

    const resolvedService = isPawMate ? (target.service || 'Dog Walking') : (target.name || 'Dog Walking');
    const resolvedCaregiver = isPawMate ? (target.name || 'Rahul Sharma') : 'Rahul Sharma';
    const resolvedCaregiverImage = target.image || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80';
    const resolvedPrice = target.price || '₹300';
    const resolvedPet = selectedPet || customPetName.trim() || 'My Pet';

    if (props.onConfirm) {
      props.onConfirm({
        service: resolvedService,
        caregiver: resolvedCaregiver,
        caregiverImage: resolvedCaregiverImage,
        clientName: props.currentUser?.name || 'Pet Parent',
        pet: resolvedPet,
        date: bookingDate,
        time: bookingTime,
        price: resolvedPrice,
        status: 'Pending',
        notes: notes
      });
    }
    if (props.onHide) {
      props.onHide();
    }
  };

  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="h5 fw-bold text-forest">
          📅 Book Pet Care Session
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleConfirm}>
        <Modal.Body className="py-3">
          {props.bookingTarget && (
            <div className="p-3 bg-light rounded-3 mb-3 border">
              <strong className="d-block text-forest">
                {props.bookingTarget.name}
              </strong>
              <span className="small text-muted">
                {props.bookingTarget.service || props.bookingTarget.description || 'Verified Pet Care'} • {props.bookingTarget.price}
              </span>
            </div>
          )}

          {props.pets && props.pets.length > 0 ? (
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold">Select Pet</Form.Label>
              <Form.Select
                value={selectedPet}
                onChange={(e) => setSelectedPet(e.target.value)}
                required
              >
                {props.pets.map((p, idx) => (
                  <option key={idx} value={p.name}>
                    {p.name} ({p.species} • {p.breed})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          ) : (
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold">Pet Name *</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. Bruno (or Golden Retriever)"
                value={customPetName}
                onChange={(e) => setCustomPetName(e.target.value)}
                required
              />
            </Form.Group>
          )}

          <div className="row g-2 mb-3">
            <div className="col-6">
              <Form.Group>
                <Form.Label className="small fw-bold">Session Date</Form.Label>
                <Form.Control
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-6">
              <Form.Group>
                <Form.Label className="small fw-bold">Preferred Time</Form.Label>
                <Form.Select
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                >
                  <option value="08:00 AM">08:00 AM (Morning)</option>
                  <option value="10:00 AM">10:00 AM (Morning)</option>
                  <option value="02:00 PM">02:00 PM (Afternoon)</option>
                  <option value="05:00 PM">05:00 PM (Evening)</option>
                  <option value="07:00 PM">07:00 PM (Night)</option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-2">
            <Form.Label className="small fw-bold">Special Instructions / Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="e.g. Needs leash walking only, give treat after walk..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="light" onClick={props.onHide}>
            Cancel
          </Button>
          <Button
            variant="success"
            type="submit"
            className="pawmate-btn-primary fw-bold px-4"
            style={{ backgroundColor: '#1a4331', borderColor: '#1a4331' }}
          >
            Confirm Booking Request
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default BookingModal;
