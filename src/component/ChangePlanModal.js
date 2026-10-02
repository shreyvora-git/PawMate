import React from 'react';
import { Modal, Button, Badge } from 'react-bootstrap';

function ChangePlanModal(props) {
  const currentPlan = props.currentPlan || { name: 'Active Care', price: '₹1999', unit: '/ month' };
  const newPlan = props.newPlan || { name: 'Complete Care', price: '₹3499', unit: '/ month' };

  const handleConfirmChange = () => {
    if (props.onConfirmChange) {
      props.onConfirmChange(newPlan);
    }
    if (props.onHide) {
      props.onHide();
    }
  };

  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="h5 fw-bold text-dark d-flex align-items-center gap-2">
          <span>🔄</span> You Already Have an Active Plan
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="py-3">
        <p className="text-muted small mb-3">
          Your account is currently enrolled in a monthly pet routine subscription.
        </p>

        {/* Current Plan Box */}
        <div className="p-3 rounded-3 mb-3 bg-light border">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span className="small text-muted fw-semibold">Current Active Plan:</span>
            <Badge style={{ backgroundColor: '#d6ebd9', color: '#1a4331', border: '1px solid #b7ddbd' }}>
              Active
            </Badge>
          </div>
          <div className="d-flex justify-content-between align-items-baseline">
            <strong className="h6 mb-0 text-dark">{currentPlan.name}</strong>
            <span className="text-forest fw-bold">{currentPlan.price} {currentPlan.unit}</span>
          </div>
        </div>

        {/* New Plan Selection Box */}
        <div className="p-3 rounded-3 mb-3 border" style={{ backgroundColor: '#fff9f7', borderColor: '#ffccbe' }}>
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span className="small text-danger fw-semibold">New Selected Plan:</span>
            <Badge bg="danger">Selected</Badge>
          </div>
          <div className="d-flex justify-content-between align-items-baseline">
            <strong className="h6 mb-0 text-dark">{newPlan.name}</strong>
            <span className="text-danger fw-bold">{newPlan.price} {newPlan.unit}</span>
          </div>
        </div>

        <div className="p-3 rounded-3 bg-light border small text-muted">
          ℹ️ If you choose <strong>Change Plan</strong>, your current subscription will be cancelled and replaced with the new package upon payment.
        </div>
      </Modal.Body>

      <Modal.Footer className="border-0 pt-0 d-flex justify-content-between">
        <Button
          variant="light"
          onClick={props.onHide}
          className="border fw-semibold px-3"
        >
          Keep Current Plan
        </Button>
        <Button
          type="button"
          onClick={handleConfirmChange}
          className="pawmate-btn-primary px-4 fw-bold shadow-sm"
          style={{ backgroundColor: '#1a4331', borderColor: '#1a4331', color: '#ffffff' }}
        >
          Change Plan ➔
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ChangePlanModal;
