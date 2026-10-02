import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Badge, Row, Col, Spinner } from 'react-bootstrap';

function PaymentModal(props) {
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'card' | 'upi' | 'netbanking'
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('742');
  const [cardHolder, setCardHolder] = useState(props.currentUser?.name || 'Pet Parent');

  const [upiId, setUpiId] = useState(
    props.currentUser?.email ? `${props.currentUser.email.split('@')[0]}@okaxis` : 'user@okaxis'
  );
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (props.currentUser?.name) {
      setCardHolder(props.currentUser.name);
    }
    if (props.currentUser?.email) {
      setUpiId(`${props.currentUser.email.split('@')[0]}@okaxis`);
    }
  }, [props.currentUser]);

  const plan = props.plan || {
    name: 'Active Care',
    price: '₹1999',
    unit: '/ month'
  };

  const handleCompletePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate instant payment authorization
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        if (props.onPaymentSuccess) {
          props.onPaymentSuccess(props.plan ? props.plan.id : 'active');
        }
        if (props.onHide) {
          props.onHide();
        }
      }, 900);
    }, 800);
  };

  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="h5 fw-bold text-dark d-flex align-items-center gap-2">
          <span>💳</span> Secure Plan Checkout
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleCompletePayment}>
        <Modal.Body className="py-3">
          {/* Plan Summary Strip */}
          <div className="p-3 rounded-3 mb-4 d-flex justify-content-between align-items-center" style={{ backgroundColor: '#fcfbf7', border: '1px solid #e8e5de' }}>
            <div>
              <span className="small text-muted d-block">Selected Subscription</span>
              <strong className="text-forest h6 mb-0">{plan.name}</strong>
            </div>
            <div className="text-end">
              <span className="h4 fw-bold text-dark mb-0">{plan.price}</span>
              <span className="small text-muted font-monospace">{plan.unit || '/ month'}</span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <Form.Group className="mb-3">
            <Form.Label className="small fw-bold text-secondary">Choose Payment Method</Form.Label>
            <div className="d-flex gap-2">
              <Button
                type="button"
                variant={paymentMethod === 'upi' ? 'success' : 'outline-secondary'}
                size="sm"
                className="w-100 rounded-pill fw-semibold"
                onClick={() => setPaymentMethod('upi')}
                style={paymentMethod === 'upi' ? { backgroundColor: '#1a4331', borderColor: '#1a4331' } : {}}
              >
                ⚡ UPI / QR
              </Button>
              <Button
                type="button"
                variant={paymentMethod === 'card' ? 'success' : 'outline-secondary'}
                size="sm"
                className="w-100 rounded-pill fw-semibold"
                onClick={() => setPaymentMethod('card')}
                style={paymentMethod === 'card' ? { backgroundColor: '#1a4331', borderColor: '#1a4331' } : {}}
              >
                💳 Debit / Card
              </Button>
              <Button
                type="button"
                variant={paymentMethod === 'netbanking' ? 'success' : 'outline-secondary'}
                size="sm"
                className="w-100 rounded-pill fw-semibold"
                onClick={() => setPaymentMethod('netbanking')}
                style={paymentMethod === 'netbanking' ? { backgroundColor: '#1a4331', borderColor: '#1a4331' } : {}}
              >
                🏦 NetBanking
              </Button>
            </div>
          </Form.Group>

          {/* UPI Form */}
          {paymentMethod === 'upi' && (
            <div className="p-3 bg-light rounded-3 border mb-3">
              <Form.Group className="mb-2">
                <Form.Label className="small fw-bold">Virtual Payment Address (UPI ID)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. yourname@okhdfcbank"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  required
                />
              </Form.Group>
              <div className="d-flex align-items-center gap-2 mt-2">
                <Badge bg="secondary" className="small">GPay</Badge>
                <Badge bg="secondary" className="small">PhonePe</Badge>
                <Badge bg="secondary" className="small">Paytm</Badge>
                <Badge bg="secondary" className="small">BHIM</Badge>
              </div>
            </div>
          )}

          {/* Card Form */}
          {paymentMethod === 'card' && (
            <div className="p-3 bg-light rounded-3 border mb-3">
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold">Name on Card</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Cardholder full name"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold">Card Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="16-digit card number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />
              </Form.Group>

              <Row className="g-2">
                <Col xs={6}>
                  <Form.Group>
                    <Form.Label className="small fw-bold">Expiry Date</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group>
                    <Form.Label className="small fw-bold">CVV</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="3 digits"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          )}

          {/* Net Banking Form */}
          {paymentMethod === 'netbanking' && (
            <div className="p-3 bg-light rounded-3 border mb-3">
              <Form.Group>
                <Form.Label className="small fw-bold">Select Popular Bank</Form.Label>
                <Form.Select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                >
                  <option value="HDFC Bank">HDFC Bank</option>
                  <option value="ICICI Bank">ICICI Bank</option>
                  <option value="State Bank of India">State Bank of India</option>
                  <option value="Axis Bank">Axis Bank</option>
                  <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                </Form.Select>
              </Form.Group>
            </div>
          )}

          {/* Security Assurance */}
          <div className="d-flex align-items-center justify-content-center gap-2 text-muted small py-1">
            <span>🔒 256-Bit SSL Encrypted Payment</span>
            <span>•</span>
            <span>Cancel Anytime</span>
          </div>
        </Modal.Body>

        <Modal.Footer className="border-0 pt-0">
          <Button variant="light" onClick={props.onHide} disabled={isProcessing || isSuccess}>
            Cancel
          </Button>

          <Button
            type="submit"
            className="pawmate-btn-primary px-4 py-2 fw-bold rounded-pill"
            style={{ backgroundColor: '#1a4331', borderColor: '#1a4331' }}
            disabled={isProcessing || isSuccess}
          >
            {isProcessing ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                Processing Payment...
              </>
            ) : isSuccess ? (
              '✓ Payment Approved!'
            ) : (
              `Pay ${plan.price} & Activate Plan`
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default PaymentModal;
