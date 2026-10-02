import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function CancelSubscriptionModal(props) {
  const [selectedReason, setSelectedReason] = useState('Not using the services enough');

  const cancellationReasons = [
    'Too expensive',
    'Not using the services enough',
    'Service not required anymore',
    'Not satisfied with the service',
    'Other'
  ];

  const handleConfirm = () => {
    if (props.onConfirmCancel) {
      props.onConfirmCancel(selectedReason);
    }
    if (props.onHide) {
      props.onHide();
    }
  };

  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="h5 fw-bold text-dark d-flex align-items-center gap-2">
          <span>⚠️</span> Cancel Care Subscription
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-3">
        <p className="text-muted small mb-3">
          We're sorry to see you go! Your routine care slots will remain active until the end of your current billing period.
        </p>

        <Form.Group className="mb-3">
          <Form.Label className="small fw-bold text-dark">
            Why are you cancelling your subscription?
          </Form.Label>
          <Form.Select
            value={selectedReason}
            onChange={(e) => setSelectedReason(e.target.value)}
            className="py-2"
          >
            {cancellationReasons.map((reason, idx) => (
              <option key={idx} value={reason}>
                {reason}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <div className="p-3 rounded-3 bg-light border small text-muted">
          💡 <strong>Tip:</strong> You can also pause or rollover unused sessions with zero fees instead of cancelling.
        </div>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button
          variant="light"
          onClick={props.onHide}
          className="border fw-semibold"
        >
          Keep Subscription
        </Button>
        <Button
          variant="danger"
          onClick={handleConfirm}
          className="fw-bold px-3 shadow-sm"
        >
          Confirm Cancellation
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CancelSubscriptionModal;
