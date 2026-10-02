import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const PET_OWNER_REASONS = [
  'My plans changed',
  'Pet is no longer available',
  'Found another PawMate',
  'Service is no longer required',
  'PawMate is not available at my preferred time',
  'Price/payment issue',
  'Booked by mistake',
  'Other'
];

const PAWMATE_REASONS = [
  'I am unavailable at the scheduled time',
  'Scheduling conflict',
  'Pet is outside my service area',
  'Pet requires care I cannot provide',
  'Pet\'s needs do not match my services',
  'Emergency / personal reason',
  'Safety concern',
  'Double booking',
  'Owner provided incomplete information',
  'Other'
];

function CancelBookingModal(props) {
  const isPawMate = props.userRole === 'pawmate' || props.isPawMate;
  const activeReasons = isPawMate ? PAWMATE_REASONS : PET_OWNER_REASONS;

  const [selectedReason, setSelectedReason] = useState(activeReasons[0]);
  const [customReason, setCustomReason] = useState('');

  useEffect(() => {
    setSelectedReason(isPawMate ? PAWMATE_REASONS[0] : PET_OWNER_REASONS[0]);
  }, [isPawMate]);

  const handleConfirm = () => {
    const finalReason = selectedReason === 'Other' && customReason.trim()
      ? customReason.trim()
      : selectedReason;

    if (props.onConfirmCancel) {
      props.onConfirmCancel(props.orderId, finalReason);
    }
    if (props.onHide) {
      props.onHide();
    }
  };

  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="h5 fw-bold text-dark d-flex align-items-center gap-2">
          <span>⚠️</span> {isPawMate ? 'Decline / Cancel Booking Request' : 'Cancel Booking'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-3">
        <p className="text-muted small mb-3">
          {isPawMate
            ? 'Are you sure you want to decline or cancel this booking? The pet parent will be notified immediately.'
            : 'Are you sure you want to cancel this booking? Your PawMate will be notified immediately.'}
        </p>

        <Form.Group className="mb-3">
          <Form.Label className="small fw-bold text-dark">
            {isPawMate ? 'Select provider cancellation reason:' : 'Why are you cancelling this booking?'}
          </Form.Label>
          <Form.Select
            value={selectedReason}
            onChange={(e) => setSelectedReason(e.target.value)}
            className="py-2"
          >
            {activeReasons.map((reason, idx) => (
              <option key={idx} value={reason}>
                {reason}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {selectedReason === 'Other' && (
          <Form.Group className="mb-3">
            <Form.Label className="small fw-bold text-dark">Please specify:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Provide a brief explanation..."
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              required
            />
          </Form.Group>
        )}

        <div className="p-3 rounded-3 bg-light border small text-muted">
          {isPawMate
            ? '🛡️ Maintaining an accurate schedule ensures high placement in local marketplace searches.'
            : '🛡️ Free cancellation is available up to 2 hours before scheduled session time.'}
        </div>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button
          variant="light"
          onClick={props.onHide}
          className="border fw-semibold"
        >
          Keep Booking
        </Button>
        <Button
          variant="danger"
          onClick={handleConfirm}
          className="fw-bold px-3 shadow-sm"
        >
          {isPawMate ? 'Confirm Decline / Cancel' : 'Yes, Cancel Booking'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CancelBookingModal;
